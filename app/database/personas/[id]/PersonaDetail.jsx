"use client";

import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    User,
    Building,
    GiftIcon,
    Vote,
    AlertTriangle,
    Globe,
    ArrowLeft,
    MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import ShareButton from '@/components/ShareButton';
import { ScrollArea } from "@/components/ui/scroll-area";

const KPICard = ({ label, value, description, colorClass = "bg-blue-600" }) => (
    <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">
                {label}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-center gap-2">
                <div className="text-lg sm:text-2xl font-bold">{value}</div>
                <div className={`w-full h-2 rounded-full bg-neutral-200`}>
                    <div
                        className={`h-2 rounded-full ${colorClass}`}
                        style={{ width: `${value}%` }}
                    />
                </div>
            </div>
            <CardDescription className="mt-2 text-xs sm:text-sm">
                {description}
            </CardDescription>
        </CardContent>
    </Card>
);

// Componente para mostrar datos en formato móvil
const DataRow = ({ label, value }) => (
    <div className="py-2 border-b last:border-b-0">
        <div className="text-sm font-medium text-gray-500">{label}</div>
        <div className="mt-1">{value}</div>
    </div>
);

// Componente para la vista móvil de las tablas
const MobileTableView = ({ data, columns }) => (
    <div className="space-y-4">
        {data?.map((item, index) => (
            <Card key={index}>
                <CardContent className="p-4">
                    {columns.map((column, colIndex) => (
                        <DataRow
                            key={colIndex}
                            label={column.header}
                            value={column.cell(item)}
                        />
                    ))}
                </CardContent>
            </Card>
        ))}
    </div>
);

export default function PersonaDetail({ persona }) {
    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/database/personas/${persona.id}`;

    const getInitials = (name, surname) => {
        const firstInitial = name ? name.charAt(0) : '';
        const secondInitial = surname ? surname.charAt(0) : '';
        return (firstInitial + secondInitial).toUpperCase();
    };

    const cargoColumns = [
        { header: "Organización", cell: (row) => row.organizacion.nombre },
        { header: "Cargo", cell: (row) => row.cargo },
        {
            header: "Fecha Inicio",
            cell: (row) => new Date(row.fecha_inicio).toLocaleDateString()
        },
        {
            header: "Fecha Fin",
            cell: (row) => row.fecha_fin ? new Date(row.fecha_fin).toLocaleDateString() : "Actual"
        }
    ];

    const subvencionColumns = [
        { header: "Código", cell: (row) => row.codigo_subvencion },
        {
            header: "Monto",
            cell: (row) => new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR'
            }).format(row.monto)
        },
        {
            header: "Fecha",
            cell: (row) => new Date(row.fecha_concesion).toLocaleDateString()
        },
        {
            header: "Estado",
            cell: (row) => (
                <Badge variant={
                    row.estado === 'concedida' ? 'success' :
                        row.estado === 'justificada' ? 'default' :
                            'secondary'
                }>
                    {row.estado}
                </Badge>
            )
        }
    ];

    // Nuevas definiciones de columnas para las pestañas adicionales
    const votacionColumns = [
        {
            header: "Fecha",
            cell: (row) => new Date(row.fecha).toLocaleDateString()
        },
        {
            header: "Tema",
            cell: (row) => row.tema
        },
        {
            header: "Órgano",
            cell: (row) => row.organo
        },
        {
            header: "Voto",
            cell: (row) => (
                <Badge variant={
                    row.voto === 'favor' ? 'success' :
                        row.voto === 'contra' ? 'destructive' :
                            'secondary'
                }>
                    {row.voto === 'favor' ? 'A favor' :
                        row.voto === 'contra' ? 'En contra' :
                            'Abstención'}
                </Badge>
            )
        }
    ];

    const conflictosColumns = [
        {
            header: "Tipo",
            cell: (row) => (
                <Badge variant={
                    row.tipo === 'intereses' ? 'warning' :
                        row.tipo === 'incompatibilidad' ? 'destructive' :
                            'secondary'
                }>
                    {row.tipo === 'intereses' ? 'Conflicto de intereses' :
                        row.tipo === 'incompatibilidad' ? 'Incompatibilidad' :
                            'Otro'}
                </Badge>
            )
        },
        {
            header: "Descripción",
            cell: (row) => row.descripcion
        },
        {
            header: "Fecha Inicio",
            cell: (row) => new Date(row.fecha_inicio).toLocaleDateString()
        },
        {
            header: "Estado",
            cell: (row) => (
                <Badge variant={
                    row.estado === 'resuelto' ? 'success' :
                        row.estado === 'en_proceso' ? 'warning' :
                            'destructive'
                }>
                    {row.estado === 'resuelto' ? 'Resuelto' :
                        row.estado === 'en_proceso' ? 'En proceso' :
                            'Sin resolver'}
                </Badge>
            )
        }
    ];

    const redesColumns = [
        {
            header: "Red Social",
            cell: (row) => (
                <div className="flex items-center gap-2">
                    {row.red === 'twitter' ? <Twitter className="w-4 h-4 text-blue-400" /> :
                        row.red === 'facebook' ? <Facebook className="w-4 h-4 text-blue-600" /> :
                            row.red === 'instagram' ? <Instagram className="w-4 h-4 text-pink-600" /> :
                                row.red === 'linkedin' ? <Linkedin className="w-4 h-4 text-blue-700" /> :
                                    <Globe className="w-4 h-4 text-gray-500" />}
                    <span className="capitalize">{row.red}</span>
                </div>
            )
        },
        {
            header: "Usuario",
            cell: (row) => row.usuario
        },
        {
            header: "Seguidores",
            cell: (row) => new Intl.NumberFormat('es-ES').format(row.seguidores)
        },
        {
            header: "Enlace",
            cell: (row) => (
                <Link
                    href={row.url}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                >
                    <span className="hidden sm:inline">Visitar perfil</span>
                    <span className="sm:hidden">Ver</span>
                    <ExternalLink className="w-4 h-4" />
                </Link>
            )
        }
    ];


    return (
        <div className="container mx-auto p-4 space-y-4">
            {/* Header con botones */}
            <div className="flex justify-between items-center gap-2">
                <Link href="/database/personas">
                    <Button variant="outline" size="sm" className="h-9">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Volver al listado</span>
                        <span className="sm:hidden">Volver</span>
                    </Button>
                </Link>
                <ShareButton shareUrl={shareUrl} />
            </div>

            {/* Información principal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center shrink-0">
                                    {persona.foto ? (
                                        <>
                                            <Image
                                                src={persona.foto}
                                                alt={`Foto de ${persona.nombre}`}
                                                fill
                                                className="object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                            <div className="hidden absolute inset-0 items-center justify-center bg-neutral-100 text-neutral-600 text-base sm:text-lg font-semibold">
                                                {getInitials(persona.nombre, persona.apellidos)}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-600 text-base sm:text-lg font-semibold">
                                            {getInitials(persona.nombre, persona.apellidos)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <CardTitle className="text-xl sm:text-2xl">
                                        {persona.nombre} {persona.apellidos}
                                    </CardTitle>
                                    <CardDescription className="text-sm sm:text-base">
                                        {persona.profesion}
                                    </CardDescription>
                                </div>
                            </div>
                            <Badge variant={persona.es_politico ? "default" : "secondary"}>
                                {persona.es_politico ? "Político" : "No Político"}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <DataRow
                                label="Cargo Actual"
                                value={persona.cargo_actual || "No especificado"}
                            />
                            <DataRow
                                label="Partido Político"
                                value={persona.partido_politico || "No afiliado"}
                            />
                            <DataRow
                                label="Nacionalidad"
                                value={persona.nacionalidad}
                            />
                            <DataRow
                                label="Fecha de Nacimiento"
                                value={new Date(persona.fecha_nacimiento).toLocaleDateString()}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className={
                    persona.casos_judiciales_abiertos > 0
                        ? "border-red-200 dark:border-red-900 bg-red-50/80 dark:bg-red-900/20"
                        : "border-green-200 dark:border-green-900 bg-green-50/80 dark:bg-green-900/20"
                }>
                    <CardHeader>
                        <CardTitle className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100">
                            Estado Legal
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200">
                                Casos Abiertos
                            </span>
                            <Badge
                                variant={persona.casos_judiciales_abiertos > 0 ? "destructive" : "default"}
                                className={
                                    persona.casos_judiciales_abiertos > 0
                                        ? "bg-red-500 dark:bg-red-900 hover:bg-red-600 dark:hover:bg-red-800"
                                        : "bg-green-500 dark:bg-green-900 hover:bg-green-600 dark:hover:bg-green-800"
                                }
                            >
                                {persona.casos_judiciales_abiertos}
                            </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200">
                                Sentencias Firmes
                            </span>
                            <Badge
                                variant={persona.sentencias_firmes > 0 ? "destructive" : "default"}
                                className={
                                    persona.sentencias_firmes > 0
                                        ? "bg-red-500 dark:bg-red-900 hover:bg-red-600 dark:hover:bg-red-800"
                                        : "bg-green-500 dark:bg-green-900 hover:bg-green-600 dark:hover:bg-green-800"
                                }
                            >
                                {persona.sentencias_firmes}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <KPICard
                    label="Transparencia"
                    value={persona.kpi_transparencia}
                    description="Índice de transparencia en declaraciones y actividades"
                    colorClass="bg-blue-600"
                />
                <KPICard
                    label="Integridad"
                    value={persona.kpi_integridad}
                    description="Evaluación de conducta ética y profesional"
                    colorClass="bg-green-600"
                />
                <KPICard
                    label="Eficacia"
                    value={persona.kpi_eficacia}
                    description="Medición de resultados y cumplimiento"
                    colorClass="bg-purple-600"
                />
            </div>

            {/* Tabs con scroll horizontal en móvil */}
            <Tabs defaultValue="cargos" className="w-full">
                <ScrollArea className="w-full">
                    <TabsList className="w-full inline-flex h-auto p-1">
                        <TabsTrigger value="cargos" className="h-9 px-2 sm:px-4">
                            <Building className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Cargos</span>
                        </TabsTrigger>
                        <TabsTrigger value="subvenciones" className="h-9 px-2 sm:px-4">
                            <GiftIcon className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Subvenciones</span>
                        </TabsTrigger>
                        <TabsTrigger value="votaciones" className="h-9 px-2 sm:px-4">
                            <Vote className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Votaciones</span>
                        </TabsTrigger>
                        <TabsTrigger value="conflictos" className="h-9 px-2 sm:px-4">
                            <AlertTriangle className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Conflictos</span>
                        </TabsTrigger>
                        <TabsTrigger value="redes" className="h-9 px-2 sm:px-4">
                            <Globe className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Redes Sociales</span>
                        </TabsTrigger>
                    </TabsList>
                </ScrollArea>

                <TabsContent value="cargos" className="mt-4">
                    <div className="hidden sm:block">
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {cargoColumns.map((col, index) => (
                                            <TableHead key={index}>{col.header}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {persona.cargos_directivos?.map((cargo, index) => (
                                        <TableRow key={index}>
                                            {cargoColumns.map((col, colIndex) => (
                                                <TableCell key={colIndex}>
                                                    {col.cell(cargo)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                    {(!persona.cargos_directivos || persona.cargos_directivos.length === 0) && (
                                        <TableRow>
                                            <TableCell colSpan={cargoColumns.length} className="text-center text-gray-500">
                                                No hay registros de cargos disponibles
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                    <div className="sm:hidden">
                        {persona.cargos_directivos && persona.cargos_directivos.length > 0 ? (
                            <MobileTableView
                                data={persona.cargos_directivos}
                                columns={cargoColumns}
                            />
                        ) : (
                            <Card>
                                <CardContent className="text-center text-gray-500 py-6">
                                    No hay registros de cargos disponibles
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="subvenciones" className="mt-4">
                    <div className="hidden sm:block">
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {subvencionColumns.map((col, index) => (
                                            <TableHead key={index}>{col.header}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {persona.subvenciones_recibidas?.map((subvencion, index) => (
                                        <TableRow key={index}>
                                            {subvencionColumns.map((col, colIndex) => (
                                                <TableCell key={colIndex}>
                                                    {col.cell(subvencion)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                    {(!persona.subvenciones_recibidas || persona.subvenciones_recibidas.length === 0) && (
                                        <TableRow>
                                            <TableCell colSpan={subvencionColumns.length} className="text-center text-gray-500">
                                                No hay registros de subvenciones disponibles
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                    <div className="sm:hidden">
                        {persona.subvenciones_recibidas && persona.subvenciones_recibidas.length > 0 ? (
                            <MobileTableView
                                data={persona.subvenciones_recibidas}
                                columns={subvencionColumns}
                            />
                        ) : (
                            <Card>
                                <CardContent className="text-center text-gray-500 py-6">
                                    No hay registros de subvenciones disponibles
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="votaciones" className="mt-4">
                    <div className="hidden sm:block">
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {votacionColumns.map((col, index) => (
                                            <TableHead key={index}>{col.header}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {persona.votaciones?.map((votacion, index) => (
                                        <TableRow key={index}>
                                            {votacionColumns.map((col, colIndex) => (
                                                <TableCell key={colIndex}>
                                                    {col.cell(votacion)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                    {(!persona.votaciones || persona.votaciones.length === 0) && (
                                        <TableRow>
                                            <TableCell colSpan={votacionColumns.length} className="text-center text-gray-500">
                                                No hay registros de votaciones disponibles
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                    <div className="sm:hidden">
                        {persona.votaciones && persona.votaciones.length > 0 ? (
                            <MobileTableView
                                data={persona.votaciones}
                                columns={votacionColumns}
                            />
                        ) : (
                            <Card>
                                <CardContent className="text-center text-gray-500 py-6">
                                    No hay registros de votaciones disponibles
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="conflictos" className="mt-4">
                    <div className="hidden sm:block">
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {conflictosColumns.map((col, index) => (
                                            <TableHead key={index}>{col.header}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {persona.conflictos?.map((conflicto, index) => (
                                        <TableRow key={index}>
                                            {conflictosColumns.map((col, colIndex) => (
                                                <TableCell key={colIndex}>
                                                    {col.cell(conflicto)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                    {(!persona.conflictos || persona.conflictos.length === 0) && (
                                        <TableRow>
                                            <TableCell colSpan={conflictosColumns.length} className="text-center text-gray-500">
                                                No hay conflictos registrados
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                    <div className="sm:hidden">
                        {persona.conflictos && persona.conflictos.length > 0 ? (
                            <MobileTableView
                                data={persona.conflictos}
                                columns={conflictosColumns}
                            />
                        ) : (
                            <Card>
                                <CardContent className="text-center text-gray-500 py-6">
                                    No hay conflictos registrados
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="redes" className="mt-4">
                    <div className="hidden sm:block">
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {redesColumns.map((col, index) => (
                                            <TableHead key={index}>{col.header}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {persona.redes_sociales?.map((red, index) => (
                                        <TableRow key={index}>
                                            {redesColumns.map((col, colIndex) => (
                                                <TableCell key={colIndex}>
                                                    {col.cell(red)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                    {(!persona.redes_sociales || persona.redes_sociales.length === 0) && (
                                        <TableRow>
                                            <TableCell colSpan={redesColumns.length} className="text-center text-gray-500">
                                                No hay redes sociales registradas
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                    <div className="sm:hidden">
                        {persona.redes_sociales && persona.redes_sociales.length > 0 ? (
                            <MobileTableView
                                data={persona.redes_sociales}
                                columns={redesColumns}
                            />
                        ) : (
                            <Card>
                                <CardContent className="text-center text-gray-500 py-6">
                                    No hay redes sociales registradas
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}