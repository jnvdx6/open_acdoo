"use client"
import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight,
  RotateCw,
  Download,
} from "lucide-react";
import {ContentOutline} from "./ContentOutline"
import {DocumentChat} from "./DocumentChat"

const WORDS_PER_PAGE = 500; // Ajusta según necesidades

const LegalDocumentViewer = ({ content }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  
  // Dividir el contenido en secciones basadas en headers principales
  const pages = useMemo(() => {
    const sections = content.split(/(?=\*\*[^*]+\*\*\n={2,})/);
    return sections.filter(section => section.trim());
  }, [content]);
  
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));

  const scrollToHeader = (index) => {
    const element = document.getElementById(`header-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const CustomH1 = ({ children }) => (
    <h1 className="text-2xl font-bold mb-4 text-[#2C3E50] dark:text-white border-b-2 border-[#FF6B35] pb-2">
      {children}
    </h1>
  );

  const CustomH2 = ({ children }) => (
    <h2 className="text-xl font-semibold mb-3 text-[#2C3E50] dark:text-white border-b border-neutral-300 dark:border-neutral-700 pb-2">
      {children}
    </h2>
  );

  const CustomH3 = ({ children }) => (
    <h3 className="text-lg font-medium mb-2 text-[#2C3E50] dark:text-white">
      {children}
    </h3>
  );
  
  return (
    <div className="flex flex-col space-y-4">
      {/* Toolbar */}
      <Card className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm w-16 text-center">{zoom}%</span>
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Slider 
            className="w-32" 
            value={[zoom]} 
            min={50} 
            max={200} 
            step={10} 
            onValueChange={([value]) => setZoom(value)} 
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="hover:text-[#FF6B35]">
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="hover:text-[#FF6B35]">
            <Download className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="hover:text-[#FF6B35]">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl h-[90vh]">
              <DialogHeader>
                <DialogTitle>Documento Legal</DialogTitle>
              </DialogHeader>
              <div className="flex h-full">
                <div className="flex-1 overflow-hidden pr-4">
                  <ScrollArea className="h-full">
                    <div className="p-8">
                      <ReactMarkdown
                        components={{
                          h1: CustomH1,
                          h2: CustomH2,
                          h3: CustomH3,
                          p: ({ children }) => <p className="mb-4 text-justify leading-relaxed">{children}</p>,
                          strong: ({ children }) => <strong className="font-semibold text-[#FF6B35]">{children}</strong>,
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-[#FF6B35] pl-4 italic my-4 bg-neutral-50 dark:bg-neutral-800 py-2">
                              {children}
                            </blockquote>
                          ),
                        }}
                      >
                        {pages[currentPage - 1]}
                      </ReactMarkdown>
                    </div>
                  </ScrollArea>
                </div>
                
                <div className="w-96 border-l border-neutral-200 dark:border-neutral-800 pl-4 flex flex-col">
                  <ContentOutline 
                    content={content}
                    onNavigate={scrollToHeader}
                  />
                  <div className="mt-4 flex-1">
                    <DocumentChat />
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="hover:text-[#FF6B35]"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Página {currentPage} de {pages.length}
          </span>
          <Button 
            variant="outline" 
            size="icon"
            disabled={currentPage === pages.length}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="hover:text-[#FF6B35]"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
      
      {/* Document Viewer */}
      <Card className="relative bg-white dark:bg-neutral-900 p-8 min-h-[600px]">
        <ScrollArea className="h-[600px]">
          <div className="mx-auto max-w-4xl">
            <ReactMarkdown
              components={{
                h1: CustomH1,
                h2: CustomH2,
                h3: CustomH3,
                p: ({ children }) => <p className="mb-4 text-justify leading-relaxed">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-[#FF6B35]">{children}</strong>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#FF6B35] pl-4 italic my-4 bg-neutral-50 dark:bg-neutral-800 py-2">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {pages[currentPage - 1]}
            </ReactMarkdown>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default LegalDocumentViewer;