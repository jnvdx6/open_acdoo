import React from 'react';
import { Badge } from "@/components/ui/badge";

export default function InvestigationHeader({ investigation }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{investigation.titulo}</h1>
      <p className="mt-2">{investigation.descripcion}</p>
      <div className="mt-4 flex items-center gap-4">
        <Badge className={
          investigation.estado === 'en_curso' ? 'bg-blue-500' :
          investigation.estado === 'concluida' ? 'bg-green-500' : 'bg-gray-500'
        }>
          {investigation.estado}
        </Badge>
        <p>Inicio: {investigation.fecha_inicio}</p>
        {investigation.fecha_fin && <p>Fin: {investigation.fecha_fin}</p>}
        <p>Investigador principal: {investigation.investigador_principal}</p>
      </div>
    </div>
  );
}