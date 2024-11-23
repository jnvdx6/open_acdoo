// app/investigations/[id]/page.jsx
'use client'

import React, { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Expand, Minimize, Download, Share2, Info } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

import InvestigationHeader from './components/InvestigationHeader';
import RelationshipGraph from './components/RelationshipGraph';
import PersonTable from './components/PersonTable';
import OrganizationTable from './components/OrganizationTable';
import EventTable from './components/EventTable';
import DocumentTable from './components/DocumentTable';

import { investigations, flowNodes, flowEdges } from '../mockData';

const vibrantOrange = "#FF6B35";

export default function InvestigationDetail({ params }) {
  const investigation = investigations.find(inv => inv.id === params.id);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isGraphExpanded, setIsGraphExpanded] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  if (!investigation) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">Investigación no encontrada</h1>
        <p className="mt-4">Lo sentimos, la investigación que buscas no está disponible.</p>
      </div>
    );
  }

  const handleNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const toggleGraphExpansion = () => {
    setIsGraphExpanded(!isGraphExpanded);
  };

  return (
    <div className="container mx-auto p-4">
      <InvestigationHeader investigation={investigation} />
      
      <Card className="relative mt-6">
        <CardHeader className="absolute top-0 flex flex-row items-center justify-between w-full z-10">
          <CardTitle className="text-2xl font-bold text-[#FF6B35]">Red de Relaciones</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={toggleGraphExpansion}>
              {isGraphExpanded ? <Minimize size={20} /> : <Expand size={20} />}
            </Button>
            <Button variant="outline" size="icon">
              <Download size={20} />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 size={20} />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIsLegendOpen(!isLegendOpen)}>
              <Info size={20} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className={`p-0 transition-all duration-300 ease-in-out ${isGraphExpanded ? 'h-[80vh]' : 'h-[50vh]'}`}>
          <RelationshipGraph 
            nodes={flowNodes} 
            edges={flowEdges} 
            onNodeClick={handleNodeClick}
          />
        </CardContent>
      </Card>

      <Collapsible open={isLegendOpen} onOpenChange={setIsLegendOpen} className="mt-4">
        <CollapsibleContent>
          <Card>
            <CardContent className="pt-4">
              <h3 className="font-bold mb-2 text-[#FF6B35]">Leyenda</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-100 border border-blue-500 rounded mr-2"></div>
                  <span>Persona</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-100 border border-green-500 rounded mr-2"></div>
                  <span>Organización</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-100 border border-yellow-500 rounded mr-2"></div>
                  <span>Evento</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-100 border border-red-500 rounded mr-2"></div>
                  <span>Documento</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {selectedNode && (
        <Card className="mt-4">
          <CardContent>
            <h3 className="text-lg font-semibold text-[#FF6B35]">{selectedNode.data.label}</h3>
            <p className="text-neutral-600 dark:text-neutral-300">{selectedNode.data.description || 'No hay información adicional disponible.'}</p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="personas" className="mt-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="personas">Personas</TabsTrigger>
          <TabsTrigger value="organizaciones">Organizaciones</TabsTrigger>
          <TabsTrigger value="eventos">Eventos</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>
        <TabsContent value="personas">
          <PersonTable investigation={investigation} />
        </TabsContent>
        <TabsContent value="organizaciones">
          <OrganizationTable investigation={investigation} />
        </TabsContent>
        <TabsContent value="eventos">
          <EventTable investigation={investigation} />
        </TabsContent>
        <TabsContent value="documentos">
          <DocumentTable investigation={investigation} />
        </TabsContent>
      </Tabs>
    </div>
  );
}