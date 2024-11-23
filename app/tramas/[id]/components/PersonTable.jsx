import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { persons } from '../../mockData';

export default function PersonTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Organización</TableHead>
          <TableHead>Rol en la trama</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {persons.map((person) => (
          <TableRow key={person.id}>
            <TableCell>{person.nombre}</TableCell>
            <TableCell>{person.cargo}</TableCell>
            <TableCell>{person.organizacion}</TableCell>
            <TableCell>{person.rol}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}