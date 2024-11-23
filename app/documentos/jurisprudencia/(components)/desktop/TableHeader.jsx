import { Button } from "@/components/ui/button";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, Calendar, Tags } from 'lucide-react';

export const SentencesTableHeader = ({ onSort, sortConfig }) => (
    <TableHeader>
        <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[100px]">
                <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center gap-1 -ml-4 font-medium"
                    onClick={() => onSort('fecha_sentencia')}
                >
                    <Calendar className="h-4 w-4" />
                    Fecha
                    <ArrowUpDown className="h-3 w-3" />
                </Button>
            </TableHead>
            <TableHead className="min-w-[300px]">
                <Button 
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 -ml-4 font-medium"
                    onClick={() => onSort('titulo')}
                >
                    Título / Tribunal
                    <ArrowUpDown className="h-3 w-3" />
                </Button>
            </TableHead>
            <TableHead className="w-[250px]">
                <Button 
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 -ml-4 font-medium"
                    onClick={() => onSort('probabilidad_delito')}
                >
                    Métricas
                    <ArrowUpDown className="h-3 w-3" />
                </Button>
            </TableHead>
            <TableHead className="min-w-[200px]">
                <Button 
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 -ml-4 font-medium"
                    onClick={() => onSort('palabras_clave')}
                >
                    <Tags className="h-4 w-4" />
                    Palabras Clave
                    <ArrowUpDown className="h-3 w-3" />
                </Button>
            </TableHead>
            <TableHead className="w-[100px] text-right">Acciones</TableHead>
        </TableRow>
    </TableHeader>
);