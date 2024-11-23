import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles, Globe, Building, User, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

const vibrantOrange = "#FF6B35";

const QueryResult = ({ content }) => (
  <div className="bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-lg p-4 shadow-sm">
    <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
      <Search className="h-4 w-4" style={{color: vibrantOrange}} />
      <span className="font-medium">Búsqueda realizada:</span>
    </div>
    <p className="mt-2 text-neutral-800 dark:text-neutral-200">{content}</p>
  </div>
);

const AIResponse = ({ content }) => (
  <Card className="bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
    <CardContent className="p-4 space-y-4">
      <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
        <Sparkles className="h-4 w-4" style={{color: vibrantOrange}} />
        <span className="font-medium">Análisis IA</span>
      </div>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </CardContent>
  </Card>
);

const SourceResult = ({ title, url, snippet }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="h-4 w-4" style={{color: vibrantOrange}} />
        <Link 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-medium hover:text-[#FF6B35] transition-colors flex items-center gap-1 dark:text-neutral-200"
        >
          {title}
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
      <p className="text-neutral-600 dark:text-neutral-400">{snippet}</p>
    </CardContent>
  </Card>
);

const EntityResult = ({ name, type, description, relevance }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4" style={{color: vibrantOrange}} />
          <span className="font-medium dark:text-neutral-200">{name}</span>
        </div>
        <Badge 
          variant="outline" 
          className="border-blue-200 text-blue-700 dark:border-blue-900 dark:text-blue-400"
        >
          {type}
        </Badge>
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 mb-2">{description}</p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-500 dark:text-neutral-500">Relevancia:</span>
        <Badge 
          variant="secondary"
          className={
            relevance === 'Alta' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400' :
            relevance === 'Media' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-400' :
            'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
          }
        >
          {relevance}
        </Badge>
      </div>
    </CardContent>
  </Card>
);

const PersonResult = ({ name, role, organization, relevance }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" style={{color: vibrantOrange}} />
          <span className="font-medium dark:text-neutral-200">{name}</span>
        </div>
        <Badge 
          variant="outline" 
          className="border-purple-200 text-purple-700 dark:border-purple-900 dark:text-purple-400"
        >
          {role}
        </Badge>
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 mb-2">
        <span className="font-medium">Organización:</span> {organization}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-500 dark:text-neutral-500">Relevancia:</span>
        <Badge 
          variant="secondary"
          className={
            relevance === 'Alta' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400' :
            relevance === 'Media' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-400' :
            'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
          }
        >
          {relevance}
        </Badge>
      </div>
    </CardContent>
  </Card>
);

export default function SearchResultItem({ result }) {
  switch (result.type) {
    case 'query':
      return <QueryResult {...result} />;
    case 'ai-response':
      return <AIResponse {...result} />;
    case 'source':
      return <SourceResult {...result} />;
    case 'entity':
      return <EntityResult {...result} />;
    case 'person':
      return <PersonResult {...result} />;
    default:
      return null;
  }
}