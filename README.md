# AcostaDeOtros (ACDOO)

## Descripción
AcostaDeOtros es una plataforma digital innovadora diseñada para promover la transparencia y combatir la corrupción mediante el análisis de documentos públicos y la participación ciudadana. Utilizando inteligencia artificial avanzada, ACDOO permite a los ciudadanos acceder, analizar y monitorear millones de documentos oficiales, incluyendo:

- Boletín Oficial del Estado (BOE)
- Documentos de Jurisprudencia
- Contratos públicos
- Licitaciones gubernamentales
- Presupuestos públicos
- Declaraciones patrimoniales

## Tecnologías Utilizadas
- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Shadcn/ui

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/jnvdx666/AcostaDeOtros.git
cd AcostaDeOtros
```

2. Instalar dependencias:
```bash
yarn install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.local
# Editar .env.local con tus configuraciones
```

4. Iniciar el servidor de desarrollo:
```bash
yarn dev
```

## Estructura del Proyecto
```
AcostaDeOtros/
├── app/                    # Aplicación principal Next.js
├── components/            # Componentes reutilizables
├── hooks/                 # Custom hooks de React
├── lib/                   # Bibliotecas y utilidades
├── utils/                 
│   └── supabase/         # Configuración y utilidades de Supabase
├── .gitignore            # Configuración de Git
├── README.md             # Documentación principal
├── components.json       # Configuración de componentes
├── next.config.mjs       # Configuración de Next.js
├── package.json          # Dependencias y scripts
├── postcss.config.mjs    # Configuración de PostCSS
├── tailwind.config.ts    # Configuración de Tailwind CSS
├── tsconfig.json         # Configuración de TypeScript
└── yarn.lock             # Versiones bloqueadas de dependencias
```

## Características Principales
- Acceso a una base de datos masiva de documentos oficiales
- Sistema de análisis mediante IA para detectar patrones de corrupción
- Plataforma de denuncias ciudadanas
- Verificación automática de datos
- Sistema de alertas temprana sobre posibles irregularidades
- Análisis predictivo de riesgos de corrupción
- Interfaz intuitiva para búsqueda y análisis de documentos
- Sistema de anonimización para proteger a denunciantes

## Scripts Disponibles

```bash
# Desarrollo
yarn dev

# Construcción
yarn build

# Inicio en producción
yarn start

# Linting
yarn lint
```

## Principios del Proyecto

### 1. Transparencia y Responsabilidad
- Fomentar una gestión pública abierta y accesible
- Permitir el monitoreo ciudadano del uso de recursos públicos

### 2. Igualdad ante la Ley
- Garantizar un tratamiento justo e imparcial
- Facilitar investigaciones del Ministerio Público

### 3. Protección de Derechos Civiles
- Defender la libertad de expresión
- Proteger a los denunciantes

### 4. Uso Ético de la Tecnología
- Implementar IA responsable
- Respetar la privacidad de los usuarios

### 5. Participación Ciudadana Activa
- Empoderar a los ciudadanos como vigilantes
- Fomentar la participación en la toma de decisiones

## Seguridad
Para reportar vulnerabilidades: jon@zerodai.com

## Contribución
1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abre un Pull Request

## Licencia
Este proyecto está licenciado bajo la AGPL-3.0 con Commons Clause - ver el archivo [LICENSE](LICENSE) para más detalles.

La Commons Clause añadida a la AGPL-3.0 significa que puedes:
- ✅ Usar el software para fines no comerciales
- ✅ Modificar el código
- ✅ Distribuir el código modificado (bajo los mismos términos)
- ✅ Estudiar y analizar el código
- ❌ Vender el software o servicios comerciales basados en él sin autorización

Para uso comercial, contactar: jon@zerodai.com

## Patrocinadores y Financiación

### Patrocinador Principal:

Este proyecto ha sido posible gracias al apoyo sustancial de [zerodai.com](https://zerodai.com), empresa centrada en soluciones de ciberseguridad basadas en inteligencia artificial. 

En colaboración con el creador del repositorio, zerodai.com ha asumido la totalidad de los costes iniciales del proyecto, incluyendo:
- Poder de cómputo para el análisis de documentos
- Infraestructura de servidores
- Costes de desarrollo inicial
- Gastos operativos actuales
- Recursos técnicos y humanos


## Contacto
- Email: jon@zerodai.com

---
Construyendo una sociedad más transparente y justa