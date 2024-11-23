'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, FileText, File, Loader, BrainCircuit, Search, Gavel } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import MarkdownContent from '../(components)/markdown-content';
import LegalDocumentViewer from '../(components)/LegalDocumentViewer';
import { createClient } from '@/utils/supabase/client';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const UnanalyzedContent = ({ sentence, onAnalyze }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      const response = await fetch('/api/analyze-jurisprudencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roj: sentence.roj,
          ecli: sentence.ecli
        }),
      });

      if (!response.ok) throw new Error('Error en el análisis');

      const data = await response.json();
      onAnalyze(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-full">
              <BrainCircuit className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Sentencia pendiente de análisis
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
              Esta sentencia aún no ha sido analizada por nuestro sistema de IA.
              Puede iniciar el análisis para obtener información detallada sobre su contenido.
            </p>
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-[#FF6B35] hover:bg-[#FF8C61] text-white"
            >
              {isAnalyzing ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Analizando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Iniciar análisis
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                El análisis incluirá
              </h4>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Identificación de delitos
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Análisis de evidencias
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Evaluación de fundamentación
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Impacto jurisprudencial
                </li>
              </ul>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Tiempo estimado
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                El análisis puede tardar entre 1 y 3 minutos, dependiendo de la complejidad de la sentencia.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function SentenceDetailClient({ sentence: initialSentence }) {
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [analyzedSentence, setAnalyzedSentence] = useState(initialSentence);
  const supabase = createClient();

  const fetchSentence = async (sentenceId) => {
    try {
      const { data, error } = await supabase
        .from('sentencias_judiciales')
        .select('*')
        .eq('id', sentenceId)
        .single();

      if (error) throw error;
      if (data) {
        setAnalyzedSentence(data);
      }
    } catch (error) {
      console.error('Error fetching sentence:', error);
    }
  };

  const handleAnalysisComplete = async (analyzedData) => {
    await fetchSentence(analyzedSentence.id);
  };

  const renderListOrEmpty = (items, renderItem) => {

    console.log("Items", items)

    if (!items || items.length === 0 || items == {} || items == null) {
      return <p className="text-neutral-500">No hay información disponible</p>
    }
    return (
      <ul className="list-disc pl-5">
        {items.map((item, index) => (
          <li key={index}>{renderItem(item)}</li>
        ))}
      </ul>
    )
  }

  if (!analyzedSentence.analyzed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            {analyzedSentence.titulo || 'Título no disponible'}
          </CardTitle>
          <div className="text-sm text-neutral-500 dark:text-neutral-300 space-y-1">
            <div>ROJ: {analyzedSentence.roj} | ECLI: {analyzedSentence.ecli}</div>
            <div>Fecha: {format(new Date(analyzedSentence.fecha_sentencia), "d 'de' MMMM 'de' yyyy", { locale: es })}</div>
            <div>Tribunal: {analyzedSentence.tribunal_responsable}</div>
          </div>
        </CardHeader>
        <CardContent>
          <UnanalyzedContent
            sentence={analyzedSentence}
            onAnalyze={handleAnalysisComplete}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          {analyzedSentence.titulo}
        </CardTitle>
        <div className="text-sm text-neutral-500 dark:text-neutral-300 space-y-1">
          <div>ROJ: {analyzedSentence.roj} | ECLI: {analyzedSentence.ecli}</div>
          <div>Fecha: {format(new Date(analyzedSentence.fecha_sentencia), "d 'de' MMMM 'de' yyyy", { locale: es })}</div>
          <div>Tribunal: {analyzedSentence.tribunal_responsable}</div>
          <div>Ponente: {analyzedSentence.ponente}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <LegalDocumentViewer content={analyzedSentence.contenido} />
          </div>
          <Collapsible open={isAnalysisOpen} onOpenChange={setIsAnalysisOpen} className="mb-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-neutral-100 dark:bg-neutral-800 rounded">
              <h3 className="text-lg font-semibold text-[#FF6B35]">Análisis IA</h3>
              {isAnalysisOpen ? <ChevronUp /> : <ChevronDown />}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <MarkdownContent
                content={analyzedSentence.analisis_ia || 'Análisis no disponible'}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Palabras clave</h3>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(analyzedSentence.palabras_clave) && analyzedSentence.palabras_clave.map((palabra, index) => (
              <Badge key={index} variant="secondary">{palabra}</Badge>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Entidades mencionadas</h3>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(analyzedSentence.entidades_mencionadas) && analyzedSentence.entidades_mencionadas.map((entidad, index) => (
              <Badge key={index} variant="outline">{entidad}</Badge>
            ))}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#FF6B35]">Métrica</TableHead>
              <TableHead className="text-[#FF6B35]">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Probabilidad de delito</TableCell>
              <TableCell>{analyzedSentence.kpi_fundamentacion || 'No disponible'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>KPI Complejidad</TableCell>
              <TableCell>{analyzedSentence.kpi_complejidad || 'No disponible'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Índice de innovación</TableCell>
              <TableCell>{analyzedSentence.indice_innovacion || 'No disponible'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Impacto social</TableCell>
              <TableCell>{analyzedSentence.kpi_impacto_social || 'No disponible'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Precedentes</TableCell>
              <TableCell>{analyzedSentence.kpi_precedentes || 'No disponible'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Monto involucrado</TableCell>
              <TableCell>
                {analyzedSentence.monto_involucrado
                  ? analyzedSentence.monto_involucrado.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                  })
                  : 'No disponible'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Argumentos principales</h3>
            {renderListOrEmpty(analyzedSentence.argumentos_principales, (argumento) => argumento)}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Leyes relacionadas</h3>
            {renderListOrEmpty(analyzedSentence.leyes_relacionadas, (ley) => ley)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Jurisprudencia citada</h3>
            {renderListOrEmpty(analyzedSentence.jurisprudencia_citada, (jurisprudencia) => (
              <div>
                <strong>{jurisprudencia.referencia}</strong>: {jurisprudencia.relevancia}
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Doctrina aplicada</h3>
            {renderListOrEmpty(analyzedSentence.doctrina_aplicada, (doctrina) => doctrina)}
          </div>
        </div>

        {analyzedSentence.votos_particulares && Object.keys(analyzedSentence.votos_particulares).length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Votos particulares</h3>
            <div className="space-y-4">
              {Object.entries(analyzedSentence.votos_particulares).map(([magistrado, voto], index) => (
                <Card key={index} className="p-4">
                  <h4 className="font-semibold">{magistrado}</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                    {voto}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Evidencias mencionadas</h3>
          {renderListOrEmpty(analyzedSentence.evidencias_mencionadas, (evidencia) => (
            <div className="mb-2">
              <strong>{evidencia.tipo}</strong>: {evidencia.descripcion}
              {evidencia.relevancia && (
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Relevancia: {evidencia.relevancia}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Impacto en precedentes</h3>
          {renderListOrEmpty(analyzedSentence.impacto_precedentes, (impacto) => (
            <div className="mb-2">
              <div>{impacto}</div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-[#FF6B35]">Información técnica</h3>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Tiempo de tramitación</TableCell>
                <TableCell>
                  {analyzedSentence.tiempo_tramitacion
                    ? `${analyzedSentence.tiempo_tramitacion} días`
                    : 'No disponible'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Costas procesales</TableCell>
                <TableCell>
                  {analyzedSentence.costas_procesales
                    ? analyzedSentence.costas_procesales.toLocaleString('es-ES', {
                      style: 'currency',
                      currency: 'EUR'
                    })
                    : 'No disponible'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Recursos presentados</TableCell>
                <TableCell>{analyzedSentence.recursos_presentados || 'No disponible'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cantidad de pruebas</TableCell>
                <TableCell>{analyzedSentence.cantidad_pruebas || 'No disponible'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Fecha hechos</TableCell>
                <TableCell>
                  {analyzedSentence.fecha_hechos
                    ? format(new Date(analyzedSentence.fecha_hechos), "d 'de' MMMM 'de' yyyy", { locale: es })
                    : 'No disponible'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Fecha denuncia</TableCell>
                <TableCell>
                  {analyzedSentence.fecha_denuncia
                    ? format(new Date(analyzedSentence.fecha_denuncia), "d 'de' MMMM 'de' yyyy", { locale: es })
                    : 'No disponible'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Versión del modelo</TableCell>
                <TableCell>{analyzedSentence.version_modelo == "llama-3.1-70b-versatile" ? "OpenLEX I 70B (ACDOO)" : "Hola" || 'No disponible'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Última actualización</TableCell>
                <TableCell>
                  {analyzedSentence.updated_at
                    ? format(new Date(analyzedSentence.updated_at), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })
                    : 'No disponible'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {analyzedSentence.patron_delictivo && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                Patrón delictivo identificado
              </h4>
              <p className="text-red-700 dark:text-red-300">
                {analyzedSentence.patron_delictivo}
              </p>
              {analyzedSentence.riesgo_reincidencia && (
                <div className="mt-2">
                  <span className="font-medium text-red-600 dark:text-red-400">
                    Riesgo de reincidencia: {analyzedSentence.riesgo_reincidencia}%
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

      </CardContent>
    </Card>
  );
}