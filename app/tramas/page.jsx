// app/investigations/page.jsx
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { investigations } from './mockData';
import Image from 'next/image'

// Definimos el color naranja vibrante
const vibrantOrange = "#FF6B35";

// Función para obtener la imagen de la investigación
function getInvestigationImage(id) {
  if (id === '1') { // Asumimos que el ID 1 es para el caso Gürtel
    return "https://www.publico.es/files/module_big_mobile/files/crop/uploads/2019/03/13/5c88e968b5586.r_1602683103696.0-0-640-360.jpg";
  }
  // Para otras investigaciones, usamos un placeholder
  return `https://picsum.photos/seed/${id}/640/360`;
}

export default function InvestigationGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredInvestigations = investigations.filter(inv => 
    inv.titulo.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'all' || inv.estado === filterStatus)
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-6 text-center text-neutral-800 dark:text-neutral-100">Investigaciones en Curso</h1>
      
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Buscar investigaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setFilterStatus('all')}
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            style={filterStatus === 'all' ? {backgroundColor: vibrantOrange, color: 'white'} : {}}
          >
            Todos
          </Button>
          <Button 
            onClick={() => setFilterStatus('en_curso')}
            variant={filterStatus === 'en_curso' ? 'default' : 'outline'}
            style={filterStatus === 'en_curso' ? {backgroundColor: vibrantOrange, color: 'white'} : {}}
          >
            En Curso
          </Button>
          <Button 
            onClick={() => setFilterStatus('concluida')}
            variant={filterStatus === 'concluida' ? 'default' : 'outline'}
            style={filterStatus === 'concluida' ? {backgroundColor: vibrantOrange, color: 'white'} : {}}
          >
            Concluidas
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvestigations.map((investigation) => (
          <Link href={`/tramas/${investigation.id}`} key={investigation.id}>
            <Card className="h-full overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={getInvestigationImage(investigation.id)}
                  alt={investigation.titulo}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-0 right-0 m-2">
                  <Badge className={
                    investigation.estado === 'en_curso' 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  }>
                    {investigation.estado === 'en_curso' ? 'En Curso' : 'Concluida'}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {investigation.estado === 'en_curso' ? (
                    <Clock style={{color: vibrantOrange}} size={24} />
                  ) : (
                    <CheckCircle style={{color: vibrantOrange}} size={24} />
                  )}
                  {investigation.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">{investigation.descripcion}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="text-sm text-neutral-500">Inicio: {investigation.fecha_inicio}</p>
                {investigation.fecha_fin && <p className="text-sm text-neutral-500">Fin: {investigation.fecha_fin}</p>}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      
      {filteredInvestigations.length === 0 && (
        <div className="text-center mt-12">
          <AlertTriangle size={48} className="mx-auto mb-4" style={{color: vibrantOrange}} />
          <p className="text-xl font-semibold text-neutral-600 dark:text-neutral-300">No se encontraron investigaciones</p>
          <p className="text-neutral-500">Intenta ajustar tus filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
}