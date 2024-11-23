"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Search,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/navigation';

const ValueDisplay = ({ value, type }) => {
  if (!value && value !== 0) return '-';

  if (type === 'progress') {
    return (
      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5">
        <div
          className="bg-[#FF6B35] h-2.5 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  }
  
  if (type === 'warning') {
    return value > 0 ? (
      <Badge variant="destructive">{value}</Badge>
    ) : (
      <Badge variant="secondary">{value}</Badge>
    );
  }

  if (type === 'money') {
    return new Intl.NumberFormat('es-ES', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(value);
  }

  if (type === 'date') {
    return new Date(value).toLocaleDateString('es-ES');
  }

  return value;
};

const AdvancedDataTable = ({ 
  title,
  tableName,
  columns = [],
  filters = [],
  initialData = [],
  initialTotalCount = 0
}) => {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: itemsPerPage.toString(),
        search: debouncedSearchTerm,
        filters: JSON.stringify(activeFilters)
      });

      const response = await fetch(`/api/${tableName}?${queryParams}`);
      const result = await response.json();

      if (!response.ok) throw new Error(result.error);

      setData(result.data);
      setTotalCount(result.totalCount);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [tableName, currentPage, itemsPerPage, debouncedSearchTerm, activeFilters]);

  useEffect(() => {
    if (debouncedSearchTerm || Object.keys(activeFilters).length > 0 || currentPage > 1) {
      fetchData();
    }
  }, [fetchData, debouncedSearchTerm]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleClearFilters = () => {
    setActiveFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleViewDetail = (id) => {
    router.push(`/database/${tableName}/${id}`);
  };

  return (
    <Card className="w-full py-4">
      <CardContent>
        <div className="flex flex-col space-y-4">
          {/* Search and Filters Controls */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-500" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Select 
                value={String(itemsPerPage)} 
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 por página</SelectItem>
                  <SelectItem value="10">10 por página</SelectItem>
                  <SelectItem value="20">20 por página</SelectItem>
                  <SelectItem value="50">50 por página</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                {filters.map((filter) => (
                  <div key={filter.key} className="space-y-2">
                    <label className="text-sm font-medium">{filter.label}</label>
                    <Select
                      value={activeFilters[filter.key] || ''}
                      onValueChange={(value) => {
                        setActiveFilters(prev => ({...prev, [filter.key]: value}));
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todos</SelectItem>
                        {filter.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={handleClearFilters}
                  size="sm"
                >
                  Limpiar filtros
                </Button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B35]"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8 text-red-500">
              Error al cargar los datos: {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && data.length === 0 && (
            <div className="text-center py-8 text-neutral-500">
              No se encontraron resultados
            </div>
          )}

          {/* Table */}
          {!loading && !error && data.length > 0 && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead key={column.key}>{column.label}</TableHead>
                    ))}
                    <TableHead className="w-32">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow 
                      key={item.id || index}
                      className="cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      onClick={() => handleViewDetail(item.id)}
                    >
                      {columns.map((column) => (
                        <TableCell key={column.key}>
                          <ValueDisplay 
                            value={item[column.key]} 
                            type={column.type}
                          />
                        </TableCell>
                      ))}
                      <TableCell>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation(); // Previene que el click se propague a la fila
                            handleViewDetail(item.id);
                          }}
                          className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
                          size="sm"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && data.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, totalCount)} de {totalCount} resultados
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedDataTable;