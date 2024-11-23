'use client';

// components/sentencias/SentencesTable.jsx
import React, { useState, useEffect } from 'react';
import { Table } from "@/components/ui/table";
import { SentencesTableHeader } from './desktop/TableHeader';
import { SentenceTableRow } from './desktop/TableRow';
import { MobileSentenceCard } from './mobile/MobileSentenceCard';
import { useMediaQuery } from '@/hooks/use-media-query';

export function SentencesTable({ 
    sentences, 
    isLoading,
    onSort,
    sortConfig 
}) {
    const [expandedRows, setExpandedRows] = useState(new Set());
    const isMobile = useMediaQuery("(max-width: 768px)");

    const toggleRowExpanded = (id) => {
        setExpandedRows(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="w-full space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div 
                        key={i} 
                        className="w-full h-20 bg-muted animate-pulse rounded-md" 
                    />
                ))}
            </div>
        );
    }

    // Mobile view
    if (isMobile) {
        return (
            <div className="space-y-4">
                {sentences.map((sentence) => (
                    <MobileSentenceCard 
                        key={sentence.id} 
                        sentence={sentence} 
                    />
                ))}
            </div>
        );
    }

    // Desktop view
    return (
        <div className="w-full border rounded-md">
            <Table>
                <SentencesTableHeader 
                    onSort={onSort}
                    sortConfig={sortConfig}
                />
                <tbody>
                    {sentences.map((sentence) => (
                        <SentenceTableRow
                            key={sentence.id}
                            sentence={sentence}
                            expanded={expandedRows.has(sentence.id)}
                            onToggleExpand={() => toggleRowExpanded(sentence.id)}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}