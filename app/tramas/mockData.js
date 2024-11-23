// Caso Gürtel Mock Data

export const investigations = [
    {
      id: '1',
      titulo: 'Caso Gürtel - Primera Época',
      descripcion: 'Investigación sobre una red de corrupción política vinculada al Partido Popular en España.',
      estado: 'concluida',
      fecha_inicio: '2009-02-06',
      fecha_fin: '2018-05-24',
      investigador_principal: 'Juez Pablo Ruz'
    },
    // Otras investigaciones podrían añadirse aquí
  ];
  
  export const persons = [
    {
      id: '1',
      nombre: 'Francisco Correa',
      alias: 'Don Vito',
      cargo: 'Empresario',
      organizacion: 'Grupo empresarial de Francisco Correa',
      fechaNacimiento: '1955-03-25', // Fecha aproximada
      lugarNacimiento: 'Madrid', // Lugar aproximado
      rol: 'Cabecilla de la trama'
    },
    {
      id: '2',
      nombre: 'Luis Bárcenas',
      cargo: 'Ex tesorero',
      organizacion: 'Partido Popular',
      fechaNacimiento: '1957-03-22',
      lugarNacimiento: 'León',
      rol: 'Financiación ilegal del partido'
    },
    {
      id: '3',
      nombre: 'Pablo Crespo',
      cargo: 'Número dos',
      organizacion: 'Grupo empresarial de Francisco Correa',
      fechaNacimiento: '1960-03-23', // Fecha aproximada
      lugarNacimiento: 'Pontevedra',
      rol: 'Coordinador de actividades ilícitas'
    },
    {
      id: '4',
      nombre: 'Guillermo Ortega',
      cargo: 'Ex alcalde de Majadahonda',
      organizacion: 'Ayuntamiento de Majadahonda',
      fechaNacimiento: '1960-01-01', // Fecha ficticia
      lugarNacimiento: 'Majadahonda', // Lugar aproximado
      rol: 'Adjudicación irregular de contratos'
    },
    {
      id: '5',
      nombre: 'Alberto López Viejo',
      cargo: 'Ex consejero madrileño',
      organizacion: 'Comunidad de Madrid',
      fechaNacimiento: '1962-01-01', // Fecha ficticia
      lugarNacimiento: 'Madrid', // Lugar aproximado
      rol: 'Adjudicación irregular de contratos'
    },
    {
      id: '6',
      nombre: 'Jesús Sepúlveda',
      cargo: 'Ex alcalde de Pozuelo',
      organizacion: 'Ayuntamiento de Pozuelo',
      fechaNacimiento: '1958-01-01', // Fecha ficticia
      lugarNacimiento: 'Pozuelo', // Lugar aproximado
      rol: 'Adjudicación irregular de contratos'
    },
    {
      id: '7',
      nombre: 'Rosalía Iglesias',
      cargo: 'Esposa de Luis Bárcenas',
      organizacion: 'N/A',
      fechaNacimiento: '1960-01-01', // Fecha ficticia
      lugarNacimiento: 'Madrid', // Lugar aproximado
      rol: 'Colaboración en el blanqueo de capitales'
    },
  ];
  
  export const organizations = [
    {
      id: '1',
      nombre: 'Partido Popular',
      tipo: 'Partido político',
      sector: 'Política',
      rol: 'Beneficiario de actividades ilícitas'
    },
    {
      id: '2',
      nombre: 'Grupo empresarial de Francisco Correa',
      tipo: 'Empresa privada',
      sector: 'Varios',
      rol: 'Centro de operaciones de la trama'
    },
    {
      id: '3',
      nombre: 'Ayuntamiento de Majadahonda',
      tipo: 'Administración pública',
      sector: 'Gobierno local',
      rol: 'Escenario de actividades ilícitas'
    },
    {
      id: '4',
      nombre: 'Ayuntamiento de Pozuelo',
      tipo: 'Administración pública',
      sector: 'Gobierno local',
      rol: 'Escenario de actividades ilícitas'
    },
    {
      id: '5',
      nombre: 'Comunidad de Madrid',
      tipo: 'Administración pública',
      sector: 'Gobierno autonómico',
      rol: 'Escenario de actividades ilícitas'
    },
  ];
  
  export const events = [
    {
      id: '1',
      titulo: 'Operación Gürtel',
      fecha: '2009-02-06',
      lugar: 'Varias localidades de España',
      descripcion: 'Inicio de la investigación judicial y primeras detenciones'
    },
    {
      id: '2',
      titulo: 'Inicio del juicio',
      fecha: '2016-10-04',
      lugar: 'Audiencia Nacional, Madrid',
      descripcion: 'Comienza el juicio por la primera época de actividades de la trama Gürtel (1999-2005)'
    },
    {
      id: '3',
      titulo: 'Sentencia principal',
      fecha: '2018-05-24',
      lugar: 'Audiencia Nacional, Madrid',
      descripcion: 'Se dicta sentencia condenatoria para los principales acusados'
    },
  ];
  
  export const documents = [
    {
      id: '1',
      titulo: 'Sentencia del caso Gürtel - Primera Época',
      tipo: 'Sentencia judicial',
      fecha: '2018-05-24',
      autor: 'Audiencia Nacional',
      descripcion: 'Sentencia condenatoria de la Audiencia Nacional sobre la primera época de la trama Gürtel'
    },
  ];
  
  export const relationships = [
    {
      id: '1',
      source: '1', // Francisco Correa
      target: '2', // Luis Bárcenas
      type: 'Colaboración',
      description: 'Cooperación en la financiación ilegal del PP'
    },
    {
      id: '2',
      source: '1', // Francisco Correa
      target: '2', // Grupo empresarial de Francisco Correa
      type: 'Dirige',
      description: 'Correa es el líder del grupo empresarial'
    },
    {
      id: '3',
      source: '2', // Luis Bárcenas
      target: '1', // Partido Popular
      type: 'Tesorero',
      description: 'Bárcenas era el tesorero del PP'
    },
    {
      id: '4',
      source: '4', // Guillermo Ortega
      target: '3', // Ayuntamiento de Majadahonda
      type: 'Alcalde',
      description: 'Ortega era alcalde de Majadahonda'
    },
    {
      id: '5',
      source: '5', // Alberto López Viejo
      target: '5', // Comunidad de Madrid
      type: 'Consejero',
      description: 'López Viejo era consejero de la Comunidad de Madrid'
    },
    {
      id: '6',
      source: '6', // Jesús Sepúlveda
      target: '4', // Ayuntamiento de Pozuelo
      type: 'Alcalde',
      description: 'Sepúlveda era alcalde de Pozuelo'
    },
    {
      id: '7',
      source: '2', // Luis Bárcenas
      target: '7', // Rosalía Iglesias
      type: 'Cónyuge',
      description: 'Bárcenas e Iglesias están casados'
    },
  ];
  
  export const flowNodes = [
    { 
      id: '1', 
      type: 'person',
      position: { x: 0, y: 0 }, 
      data: { 
        label: 'Francisco Correa',
        role: 'Cabecilla de la trama',
        organization: 'Grupo empresarial Correa',
        description: 'Líder de la trama Gürtel'
      }
    },
    { 
      id: '2', 
      type: 'person',
      position: { x: 300, y: 0 }, 
      data: { 
        label: 'Luis Bárcenas',
        role: 'Ex tesorero',
        organization: 'Partido Popular',
        description: 'Implicado en la financiación ilegal del partido'
      }
    },
    { 
      id: '3', 
      type: 'politicalParty',
      position: { x: 150, y: 150 }, 
      data: { 
        label: 'Partido Popular',
        ideology: 'Centro-derecha',
        description: 'Partido político implicado en la trama'
      }
    },
    { 
      id: '4', 
      type: 'organization',
      position: { x: 450, y: 150 }, 
      data: { 
        label: 'Grupo empresarial Correa',
        type: 'Empresa privada',
        sector: 'Varios',
        description: 'Red de empresas utilizadas para canalizar fondos ilegales'
      }
    },
  ];
  
  export const flowEdges = [
    { id: 'e1-2', source: '1', target: '2', type: 'custom', data: { label: 'Colabora' } },
    { id: 'e1-4', source: '1', target: '4', type: 'custom', data: { label: 'Dirige' } },
    { id: 'e2-3', source: '2', target: '3', type: 'custom', data: { label: 'Tesorero' } },
  ];