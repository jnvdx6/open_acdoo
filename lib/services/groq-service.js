import { groq } from '../groq';
import { SYSTEM_PROMPTS, USER_PROMPTS } from '../constants/prompts';
import { truncateText } from '../utils/text';

const OLLAMA_BASE_URL = 'https://leonardai0.tailb5368.ts.net/api';
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000;
const MAX_CONCURRENT_REQUESTS = 2; // Nueva constante para controlar la concurrencia

// Flag para forzar el uso de Ollama
const FORCE_OLLAMA = false;

// Configuración de modelos de Ollama
const OLLAMA_MODELS = {
    LEGAL: 'ALIENTELLIGENCE/attorney2',
    GENERAL: 'llama3.1:70b',
    FAST: 'llama3.1:70b',
    EMBEDDINGS: 'nomic-embed-text'
};

// Cache para el estado de Groq
let isGroqAvailable = true;
let lastGroqCheck = 0;
const GROQ_CACHE_TTL = 5 * 60 * 1000; // 5 minutos

// Implementación del limitador de concurrencia
class ConcurrencyLimiter {
    constructor(maxConcurrent) {
        this.maxConcurrent = maxConcurrent;
        this.running = 0;
        this.queue = [];
    }

    async execute(fn) {
        if (this.running >= this.maxConcurrent) {
            await new Promise(resolve => this.queue.push(resolve));
        }
        this.running++;

        try {
            return await fn();
        } finally {
            this.running--;
            if (this.queue.length > 0) {
                const next = this.queue.shift();
                next();
            }
        }
    }
}

export class AIService {
    static limiter = new ConcurrencyLimiter(MAX_CONCURRENT_REQUESTS);

    static async checkGroqAvailability() {
        // Si FORCE_OLLAMA está activado, siempre retornamos false
        if (FORCE_OLLAMA) {
            console.log('🔧 Flag FORCE_OLLAMA activado: Usando Ollama forzadamente');
            return false;
        }

        console.log('🔍 Verificando disponibilidad de Groq...');
        const now = Date.now();

        if (now - lastGroqCheck < GROQ_CACHE_TTL) {
            console.log(`📋 Usando estado cacheado de Groq: ${isGroqAvailable ? 'Disponible' : 'No disponible'}`);
            return isGroqAvailable;
        }

        try {
            await groq.chat.completions.create({
                messages: [{ role: "user", content: "test" }],
                model: "llama-3.1-70b-versatile",
                max_tokens: 1
            });

            isGroqAvailable = true;
        } catch (error) {
            console.warn('❌ Verificación de Groq falló:', error);
            isGroqAvailable = false;

            if (error.status === 429) {
                const retryAfter = parseInt(error.headers?.['retry-after'] || '3600');
                lastGroqCheck = now + (retryAfter * 1000);
                return false;
            }
        }

        lastGroqCheck = now;
        return isGroqAvailable;
    }

    static async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static async retryWithBackoff(operation, retryCount = 0) {
        try {
            return await operation();
        } catch (error) {
            if (retryCount >= RETRY_ATTEMPTS) {
                throw error;
            }

            const delayTime = RETRY_DELAY * Math.pow(2, retryCount);
            await this.delay(delayTime);

            return this.retryWithBackoff(operation, retryCount + 1);
        }
    }

    static async requestAI(document, metadata, promptType, documentType = 'boe') {
        return this.limiter.execute(async () => {
            const config = this.getConfig(document, metadata, promptType, documentType);

            if (FORCE_OLLAMA) {
                return await this.requestOllama(config);
            }

            const useGroq = await this.checkGroqAvailability();

            if (useGroq) {
                try {
                    return await this.requestGroq(config);
                } catch (error) {
                    return await this.requestOllama(config);
                }
            } else {
                return await this.requestOllama(config);
            }
        });
    }

    static async requestParallel(document, metadata, documentType = 'boe') {
        console.log(`🚀 Iniciando procesamiento paralelo para documento tipo: ${documentType}`);

        const useGroq = FORCE_OLLAMA ? false : await this.checkGroqAvailability();
        const promptTypes = ['analysis', 'keywords', 'entities', 'kpi', 'content', 'fullAnalysis'];
        
        const processingPromises = promptTypes.map(async (type) => {
            try {
                return await this.limiter.execute(async () => {
                    const config = this.getConfig(document, metadata, type, documentType);
                    let result;

                    if (FORCE_OLLAMA) {
                        result = await this.retryWithBackoff(() => this.requestOllama(config));
                    } else if (useGroq) {
                        try {
                            result = await this.requestGroq(config);
                        } catch (error) {
                            result = await this.retryWithBackoff(() => this.requestOllama(config));
                        }
                    } else {
                        result = await this.retryWithBackoff(() => this.requestOllama(config));
                    }

                    return { type, result };
                });
            } catch (error) {
                console.error(`❌ Error procesando ${type}:`, error);
                return { 
                    type, 
                    result: type.includes('json') ? {} : '' 
                };
            }
        });

        const results = await Promise.allSettled(processingPromises);

        return results.reduce((acc, result) => {
            if (result.status === 'fulfilled') {
                acc[result.value.type] = result.value.result;
            } else {
                console.error(`❌ Error en procesamiento:`, result.reason);
                acc[result.value?.type || 'unknown'] = result.value?.type?.includes('json') ? {} : '';
            }
            return acc;
        }, {});
    }

    static getConfig(document, metadata, promptType, documentType) {

        let truncatedDocument = document

        const prefix = documentType.toUpperCase();

        
        const configs = {
            analysis: {
                messages: [
                    { role: "system", content: SYSTEM_PROMPTS[`${prefix}_ANALYSIS`] },
                    { role: "user", content: USER_PROMPTS[`${prefix}_ANALYSIS`](metadata, truncatedDocument) }
                ],
                responseFormat: null,
                ollamaModel: OLLAMA_MODELS.FAST
            },
            keywords: {
                messages: [
                    { role: "system", content: SYSTEM_PROMPTS[`${prefix}_KEYWORDS`] },
                    { role: "user", content: USER_PROMPTS[`${prefix}_KEYWORDS`](metadata, truncatedDocument) }
                ],
                responseFormat: { type: "json_object" },
                ollamaModel: OLLAMA_MODELS.FAST
            },
            entities: {
                messages: [
                    { role: "system", content: SYSTEM_PROMPTS[`${prefix}_ENTITIES`] },
                    { role: "user", content: USER_PROMPTS[`${prefix}_ENTITIES`](metadata, truncatedDocument) }
                ],
                responseFormat: { type: "json_object" },
                ollamaModel: OLLAMA_MODELS.FAST
            },
            kpi: {
                messages: [
                    { role: "system", content: SYSTEM_PROMPTS[`${prefix}_KPI`] },
                    { role: "user", content: USER_PROMPTS[`${prefix}_KPI`](metadata, truncatedDocument) }
                ],
                responseFormat: { type: "json_object" },
                ollamaModel: OLLAMA_MODELS.FAST
            },
            content: {
                messages: [
                    { role: "system", content: SYSTEM_PROMPTS[`${prefix}_CONTENT`] },
                    { role: "user", content: USER_PROMPTS[`${prefix}_CONTENT`](metadata, truncatedDocument) }
                ],
                responseFormat: null,
                ollamaModel: OLLAMA_MODELS.FAST
            },
            fullAnalysis: {
                messages: [
                    { role: "system", content: SYSTEM_PROMPTS[`${prefix}_FULL_ANALYSIS`] },
                    { role: "user", content: USER_PROMPTS[`${prefix}_FULL_ANALYSIS`](metadata, truncatedDocument) }
                ],
                responseFormat: { type: "json_object" },
                ollamaModel: OLLAMA_MODELS.FAST
            }
        };

        if (!configs[promptType]) {
            throw new Error(`Invalid prompt type: ${promptType}`);
        }

        return configs[promptType];
    }

    static async requestGroq(config) {
        const response = await groq.chat.completions.create({
            messages: config.messages,
            model: "llama-3.1-70b-versatile",
            temperature: 0,
            max_tokens: 8000,
            top_p: 1,
            stream: false,
            response_format: config.responseFormat
        });

        const content = response.choices[0].message.content;

        if (config.responseFormat) {
            try {
                return JSON.parse(content);
            } catch (error) {
                console.error('❌ Error parseando JSON de Groq:', error);
                throw error;
            }
        }

        return content;
    }

    static async requestOllama(config) {
        const response = await fetch(`${OLLAMA_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: config.ollamaModel,
                messages: config.messages,
                stream: false,
                temperature: 0,
                ...(config.responseFormat && { format: "json" })
            })
        });

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.statusText}`);
        }

        const data = await response.json();
        let content = data.message?.content || data.response || '';

        if (config.responseFormat) {
            try {
                return JSON.parse(content);
            } catch (error) {
                console.error('❌ Error parseando JSON de Ollama:', error);
                return {};
            }
        }

        return content;
    }

    static async getEmbeddings(text) {
        return this.limiter.execute(async () => {
            const response = await fetch(`${OLLAMA_BASE_URL}/embeddings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: OLLAMA_MODELS.EMBEDDINGS,
                    prompt: text
                })
            });

            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.statusText}`);
            }

            const data = await response.json();
            return data.embedding;
        });
    }
}