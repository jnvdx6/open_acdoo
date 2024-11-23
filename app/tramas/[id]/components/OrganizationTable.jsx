import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { organizations } from '../../mockData';

export default function OrganizationTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Sector</TableHead>
          <TableHead>Rol en la trama</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map((org) => (
          <TableRow key={org.id}>
            <TableCell>{org.nombre}</TableCell>
            <TableCell>{org.tipo}</TableCell>
            <TableCell>{org.sector}</TableCell>
            <TableCell>{org.rol}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}