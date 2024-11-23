import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { documents } from '../../mockData';

export default function DocumentTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Autor</TableHead>
          <TableHead>Descripción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell>{doc.titulo}</TableCell>
            <TableCell>{doc.tipo}</TableCell>
            <TableCell>{doc.fecha}</TableCell>
            <TableCell>{doc.autor}</TableCell>
            <TableCell>{doc.descripcion}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}