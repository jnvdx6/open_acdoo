import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Users, 
  Building, 
  FileText, 
  Gavel, 
  Calendar, 
  Newspaper, 
  Share2, 
  AlertTriangle, 
  Search, 
  Settings,
  BookOpen,
  Link as LinkIcon,
  MessageSquare,
  Gift,
  UserCheck,
  FileSpreadsheet,
  AlertOctagon
} from "lucide-react";
import Link from 'next/link';
import { fetchTableStats } from './databaseStatsService';

const vibrantOrange = "#FF6B35";

const TableCard = ({ tableName, title, description, icon: Icon, stats, explorable }) => (
  <Card className="h-full flex flex-col">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Icon style={{color: vibrantOrange}} />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">{description}</p>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(stats).map(([key, value]) => (
          <Badge key={key} variant="secondary" className="justify-between">
            {key}: <span className="font-bold">{value.toLocaleString()}</span>
          </Badge>
        ))}
      </div>
    </CardContent>
    {explorable && (
      <CardFooter>
        <Link href={`/database/${tableName}`} className="w-full">
          <Button className="w-full" style={{backgroundColor: vibrantOrange}}>
            Explorar
          </Button>
        </Link>
      </CardFooter>
    )}
  </Card>
);

const TableSection = ({ tables }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {tables.map((table) => (
      <TableCard key={table.tableName} {...table} />
    ))}
  </div>
);

export default async function DatabaseExplorer() {
  const dbStats = await fetchTableStats();

  const mainTables = [
    {
      tableName: "personas",
      title: "Personas",
      description: "Información sobre individuos relevantes en la esfera pública.",
      icon: Users,
      stats: { 
        "Total": dbStats.personas.total,
        "Políticos": dbStats.personas.politicos,
        "Con casos": dbStats.personas.casos_abiertos 
      },
      explorable: true
    },
    {
      tableName: "organizaciones",
      title: "Organizaciones",
      description: "Datos de empresas, ONGs e instituciones públicas.",
      icon: Building,
      stats: { 
        "Total": dbStats.organizaciones.total,
        "Empresas": dbStats.organizaciones.empresas,
        "ONGs": dbStats.organizaciones.ongs 
      },
      explorable: true
    },
    {
      tableName: "contrataciones-publicas",
      title: "Contrataciones Públicas",
      description: "Registro de contratos otorgados por entidades públicas.",
      icon: FileText,
      stats: { 
        "Total": dbStats.contrataciones_publicas.total,
        "En proceso": dbStats.contrataciones_publicas.en_proceso,
        "Ejecutados": dbStats.contrataciones_publicas.ejecutados 
      },
      explorable: true
    },
    {
      tableName: "subvenciones",
      title: "Subvenciones",
      description: "Ayudas y subvenciones otorgadas por organismos públicos.",
      icon: Gift,
      stats: { 
        "Total": dbStats.subvenciones.total,
        "Concedidas": dbStats.subvenciones.concedidas,
        "Justificadas": dbStats.subvenciones.justificadas 
      },
      explorable: true
    },
    {
      tableName: "votaciones-leyes",
      title: "Votaciones y Leyes",
      description: "Registro de votaciones parlamentarias y leyes aprobadas.",
      icon: Gavel,
      stats: { 
        "Votaciones": dbStats.votaciones_leyes.votaciones,
        "Aprobadas": dbStats.votaciones_leyes.aprobadas,
        "En proceso": dbStats.votaciones_leyes.en_proceso 
      },
      explorable: true
    },
    {
      tableName: "eventos-reuniones",
      title: "Eventos y Reuniones",
      description: "Agenda de eventos políticos y reuniones importantes.",
      icon: Calendar,
      stats: { 
        "Total": dbStats.eventos_reuniones.total,
        "Reuniones": dbStats.eventos_reuniones.reuniones,
        "Conferencias": dbStats.eventos_reuniones.conferencias 
      },
      explorable: false
    },
    {
      tableName: "medios-comunicacion",
      title: "Medios de Comunicación",
      description: "Información sobre medios de comunicación y su cobertura.",
      icon: Newspaper,
      stats: { 
        "Total": dbStats.medios_comunicacion.total,
        "Periódicos": dbStats.medios_comunicacion.periodicos,
        "Digitales": dbStats.medios_comunicacion.digitales 
      },
      explorable: false
    },
    {
      tableName: "noticias-articulos",
      title: "Noticias y Artículos",
      description: "Cobertura mediática y análisis de sesgo.",
      icon: BookOpen,
      stats: { 
        "Total": dbStats.noticias_articulos.total,
        "Este mes": dbStats.noticias_articulos.este_mes,
        "Fact-checked": dbStats.noticias_articulos.verificadas 
      },
      explorable: false
    },
    {
      tableName: "redes-sociales",
      title: "Redes Sociales",
      description: "Presencia en redes sociales de personas y organizaciones.",
      icon: LinkIcon,
      stats: { 
        "Perfiles": dbStats.redes_sociales.total,
        "Personas": dbStats.redes_sociales.personas,
        "Organizaciones": dbStats.redes_sociales.organizaciones 
      },
      explorable: false
    },
    {
      tableName: "relaciones-entidades",
      title: "Relaciones entre Entidades",
      description: "Conexiones entre personas, organizaciones y eventos.",
      icon: Share2,
      stats: { 
        "Total": dbStats.relaciones_entidades.total,
        "Entre personas": dbStats.relaciones_entidades.entre_personas,
        "Persona-Org": dbStats.relaciones_entidades.persona_org 
      },
      explorable: false
    }
  ];

  const secondaryTables = [
    {
      tableName: "usuarios",
      title: "Usuarios",
      description: "Gestión de usuarios de la plataforma ACDOO.",
      icon: Users,
      stats: { 
        "Total": dbStats.usuarios_privados.total,
        "Activos": dbStats.usuarios_privados.activos,
        "Admins": dbStats.usuarios_privados.administradores 
      },
      explorable: false
    },
    {
      tableName: "denuncias",
      title: "Denuncias",
      description: "Sistema de denuncias y alertas de la plataforma.",
      icon: AlertTriangle,
      stats: { 
        "Total": dbStats.denuncias.total,
        "Pendientes": dbStats.denuncias.pendientes,
        "Verificadas": dbStats.denuncias.verificadas 
      },
      explorable: false
    },
    {
      tableName: "documentos-denuncias",
      title: "Documentos de Denuncias",
      description: "Archivos adjuntos a denuncias.",
      icon: FileSpreadsheet,
      stats: { 
        "Total": dbStats.documentos_denuncias.total,
        "Este mes": dbStats.documentos_denuncias.este_mes
      },
      explorable: false
    },
    {
      tableName: "donaciones",
      title: "Donaciones",
      description: "Registro de donaciones a la plataforma.",
      icon: Gift,
      stats: { 
        "Total": dbStats.donaciones.total,
        "Monto": dbStats.donaciones.monto_total,
        "Este mes": dbStats.donaciones.este_mes 
      },
      explorable: false
    },
    {
      tableName: "investigaciones",
      title: "Investigaciones",
      description: "Seguimiento de investigaciones en curso de ACDOO.",
      icon: Search,
      stats: { 
        "Total": dbStats.investigaciones.total,
        "En curso": dbStats.investigaciones.en_curso,
        "Concluidas": dbStats.investigaciones.concluidas 
      },
      explorable: true
    },
    {
      tableName: "equipo-investigacion",
      title: "Equipo de Investigación",
      description: "Miembros de equipos de investigación.",
      icon: UserCheck,
      stats: { 
        "Investigadores": dbStats.equipo_investigacion.total,
        "Activos": dbStats.equipo_investigacion.activos 
      },
      explorable: false
    },
    {
      tableName: "conflictos-interes",
      title: "Conflictos de Interés",
      description: "Registro de conflictos de interés identificados.",
      icon: AlertOctagon,
      stats: { 
        "Total": dbStats.conflictos_interes.total,
        "Activos": dbStats.conflictos_interes.activos,
        "Resueltos": dbStats.conflictos_interes.resueltos 
      },
      explorable: false
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: vibrantOrange }}>
        Explorador de Base de Datos
      </h1>
      
      <Tabs defaultValue="main" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="main" 
            className="data-[state=active]:bg-orange-200 data-[state=active]:text-orange-900"
          >
            Tablas Principales
          </TabsTrigger>
          <TabsTrigger 
            value="secondary" 
            className="data-[state=active]:bg-orange-200 data-[state=active]:text-orange-900"
          >
            Tablas de Funcionamiento ACDOO
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="main">
          <TableSection tables={mainTables} />
        </TabsContent>
        
        <TabsContent value="secondary">
          <TableSection tables={secondaryTables} />
        </TabsContent>
      </Tabs>
    </div>
  );
}