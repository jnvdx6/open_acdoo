export const SEARCH_TYPES = {
    QUERY: 'query',
    AI_RESPONSE: 'ai-response',
    SOURCE: 'source',
    ENTITY: 'entity',
    PERSON: 'person'
  };
  
  export const RELEVANCE_LEVELS = {
    HIGH: 'Alta',
    MEDIUM: 'Media',
    LOW: 'Baja'
  };
  
  export const SEARCH_CATEGORIES = {
    PERSONAS: 'personas',
    LEYES: 'leyes',
    ENTIDADES: 'entidades',
    PARTIDOS: 'partidos'
  };
  
  export const ANIMATION_VARIANTS = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };
  
  export const API_ENDPOINTS = {
    SEARCH: '/api/search',
    SUGGESTIONS: '/api/suggestions',
    ENTITIES: '/api/entities',
    PERSONS: '/api/persons'
  };
  
  export const UI_CONSTANTS = {
    COLORS: {
      PRIMARY: '#FF6B35',
      PRIMARY_HOVER: '#ff8555',
      ERROR: '#ef4444',
      SUCCESS: '#22c55e',
      WARNING: '#f59e0b'
    },
    BREAKPOINTS: {
      SM: '640px',
      MD: '768px',
      LG: '1024px',
      XL: '1280px'
    }
  };