import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { events } from '../../mockData';

export default function EventTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Lugar</TableHead>
          <TableHead>Descripción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.titulo}</TableCell>
            <TableCell>{event.fecha}</TableCell>
            <TableCell>{event.lugar}</TableCell>
            <TableCell>{event.descripcion}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}