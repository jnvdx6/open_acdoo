"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, AlertTriangle, BookOpen, RotateCw, Loader } from "lucide-react";
import Image from 'next/image'

const vibrantOrange = "#FF6B35";

function NewsCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <Card className={`h-full overflow-hidden flex flex-col relative ${isFlipped ? 'bg-blue-100' : ''}`}>
      <div className="relative h-48">
        <Image
          src={item.imagen || 'https://picsum.photos/seed/1/640/360'}
          alt={item.titulo}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-0 right-0 m-2">
          <Badge className="bg-blue-500 hover:bg-blue-600">
            {item.categoria}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <BookOpen style={{color: vibrantOrange}} size={20} className='min-w-10' />
          {item.titulo}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {isFlipped ? (
          <div>
            <p><strong>Análisis de Sesgo:</strong> {item.analisis_sesgo}</p>
            <p><strong>Fact Checking Score:</strong> {item.fact_checking_score}/10</p>
            <p><strong>Riesgo de Corrupción:</strong> {item.riesgo_corrupcion}</p>
            <p><strong>Impacto Estimado:</strong> {item.impacto_estimado}</p>
          </div>
        ) : (
          <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3">{item.descripcion}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-xs sm:text-sm text-neutral-500">
          Fecha: {format(new Date(item.fecha_publicacion), 'dd/MM/yyyy', { locale: es })}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleFlip}
          className="ml-2 z-10"
        >
          <RotateCw size={16} className="mr-1" />
          {isFlipped ? 'Ver Noticia' : 'Ver Análisis AI'}
        </Button>
      </CardFooter>
    </Card>
  );
}

function NewsCardSkeleton() {
    return (
      <Card className="h-full overflow-hidden flex flex-col relative animate-pulse">
        <div className="relative h-48 bg-gray-300"></div>
        <CardHeader>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
        </CardFooter>
      </Card>
    );
  }
  
  export default function NewsGalleryClient({ 
    initialNews, 
    initialCategories, 
    totalCount, 
    currentPage, 
    pageSize,
    currentCategory,
    searchTerm
  }) {
    const [news, setNews] = useState(initialNews);
    const [categories] = useState(initialCategories);
    const [loading, setLoading] = useState(false);
    const [localCurrentCategory, setLocalCurrentCategory] = useState(currentCategory);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
    const [localTotalCount, setLocalTotalCount] = useState(totalCount);
    const [hasInteracted, setHasInteracted] = useState(false);
    const router = useRouter();
  
    const fetchNews = useCallback(async (category, search, page) => {
      setLoading(true);
      const response = await fetch(`/api/news?category=${category}&search=${search}&page=${page}&pageSize=${pageSize}`);
      const data = await response.json();
      setNews(data.news);
      setLocalTotalCount(data.totalCount);
      setLoading(false);
  
      // Update URL without reloading the page
      router.push(`/noticias?category=${category}&search=${search}&page=${page}`, undefined, { shallow: true });
    }, [pageSize, router]);
  
    const handleCategoryChange = (category) => {
      setLocalCurrentCategory(category);
      setLocalCurrentPage(1);
      setHasInteracted(true);
      fetchNews(category, localSearchTerm, 1);
    };
  
    const handleSearch = (event) => {
      event.preventDefault();
      const searchValue = event.target.search.value;
      setLocalSearchTerm(searchValue);
      setLocalCurrentPage(1);
      setHasInteracted(true);
      fetchNews(localCurrentCategory, searchValue, 1);
    };
  
    const handlePageChange = (page) => {
      setLocalCurrentPage(page);
      setHasInteracted(true);
      fetchNews(localCurrentCategory, localSearchTerm, page);
    };
  
    const totalPages = Math.ceil(localTotalCount / pageSize);
  
    return (
      <div className="container mx-auto px-4 py-8 min-h-[80vh]">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-neutral-800 dark:text-neutral-100">Últimas Noticias</h1>
        
        <div className="mb-8 flex flex-col gap-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              name="search"
              placeholder="Buscar noticias..."
              defaultValue={localSearchTerm}
              className="pl-10 w-full"
            />
            <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <Search size={20} />
            </button>
          </form>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button 
                key={category}
                onClick={() => handleCategoryChange(category)}
                variant={localCurrentCategory === category ? 'default' : 'outline'}
                style={localCurrentCategory === category ? {backgroundColor: vibrantOrange, color: 'white'} : {}}
                className="px-3 py-1 text-sm"
              >
                {category === 'all' ? 'Todas' : category}
              </Button>
            ))}
          </div>
        </div>
  
        {loading ? (
          <>
            <div className="text-center mb-8">
              <Loader className="animate-spin h-8 w-8 mx-auto" style={{ color: vibrantOrange }} />
              <p className="mt-2 text-neutral-600 dark:text-neutral-300">Cargando noticias...</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(pageSize).fill(0).map((_, index) => (
                <NewsCardSkeleton key={index} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <Link href={`/noticias/${item.id}`} key={item.id} passHref>
                  <div className="cursor-pointer">
                    <NewsCard item={item} />
                  </div>
                </Link>
              ))}
            </div>
            
            {news.length === 0 && (
              <div className="text-center mt-12">
                <AlertTriangle size={48} className="mx-auto mb-4" style={{color: vibrantOrange}} />
                <p className="text-lg sm:text-xl font-semibold text-neutral-600 dark:text-neutral-300">No se encontraron noticias</p>
                <p className="text-sm sm:text-base text-neutral-500">Intenta ajustar tus filtros de búsqueda</p>
              </div>
            )}
  
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    variant={localCurrentPage === page ? 'default' : 'outline'}
                    style={localCurrentPage === page ? {backgroundColor: vibrantOrange, color: 'white'} : {}}
                  >
                    {page}
                  </Button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  }