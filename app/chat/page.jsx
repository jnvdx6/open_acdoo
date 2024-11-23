"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Send, Search, Settings, ArrowLeft, Sparkles, Globe, Building, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Badge } from "@/components/ui/badge";

const vibrantOrange = "#FF6B35";

const SearchInput = ({ query, setQuery, handleSearch, showOptions, setShowOptions }) => (
  <div className="space-y-4">
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Haz una pregunta o inicia una investigación..."
        className="pl-10 w-full text-lg p-6"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
    </div>
    <Button onClick={handleSearch} size="lg" style={{backgroundColor: vibrantOrange}} className="w-full text-white">
      Buscar
    </Button>
    <AdvancedOptions showOptions={showOptions} setShowOptions={setShowOptions} />
  </div>
);


const AdvancedOptions = ({ showOptions, setShowOptions }) => (
  <Popover open={showOptions} onOpenChange={setShowOptions}>
    <PopoverTrigger asChild>
      <Button variant="outline" className="w-full">
        <Settings className="mr-2 h-4 w-4" /> Opciones Avanzadas
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-80">
      <AdvancedOptionsContent />
    </PopoverContent>
  </Popover>
);

const AdvancedOptionsContent = () => {
  const [target, setTarget] = useState('');
  const [modelSettings, setModelSettings] = useState({
    creativity: 50,
    detailLevel: 50,
    useHistoricalData: true
  });

  return (
    <div className="space-y-4">
      <Select onValueChange={setTarget}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona objetivo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="personas">Personas</SelectItem>
          <SelectItem value="leyes">Leyes</SelectItem>
          <SelectItem value="entidades">Entidades</SelectItem>
          <SelectItem value="partidos">Partidos Políticos</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center justify-between">
        <span>Usar datos históricos</span>
        <Switch
          checked={modelSettings.useHistoricalData}
          onCheckedChange={(checked) => setModelSettings(prev => ({ ...prev, useHistoricalData: checked }))}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm">Creatividad: {modelSettings.creativity}%</label>
        <Slider
          value={[modelSettings.creativity]}
          onValueChange={(value) => setModelSettings(prev => ({ ...prev, creativity: value[0] }))}
          max={100}
          step={1}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm">Nivel de detalle: {modelSettings.detailLevel}%</label>
        <Slider
          value={[modelSettings.detailLevel]}
          onValueChange={(value) => setModelSettings(prev => ({ ...prev, detailLevel: value[0] }))}
          max={100}
          step={1}
        />
      </div>
    </div>
  );
};

const SearchResults = ({ searchResults, setShowResults }) => (
  <div className="h-full overflow-hidden">
    <div className="flex items-center justify-between py-2 px-4  border-b">
      <Button variant="ghost" onClick={() => setShowResults(false)} className="flex items-center !pl-0">
        <ArrowLeft className="mr-2 h-4 w-4" /> Nueva búsqueda
      </Button>
      <h2 className="text-xl font-bold">Resultados</h2>
    </div>
    <ScrollArea className="h-[calc(100vh-10rem)] px-4 py-2">
      <AnimatePresence>
        {searchResults.map((result, index) => (
          <SearchResultItem key={index} result={result} />
        ))}
      </AnimatePresence>
    </ScrollArea>
  </div>
);

const SearchResultItem = ({ result }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-4"
  >
    {result.type === 'query' && <QueryResult content={result.content} />}
    {result.type === 'ai-response' && <AIResponse content={result.content} />}
    {result.type === 'source' && <SourceResult {...result} />}
    {result.type === 'entity' && <EntityResult {...result} />}
    {result.type === 'person' && <PersonResult {...result} />}
  </motion.div>
);

const QueryResult = ({ content }) => (
  <div className="bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 p-3 rounded-lg inline-block">
    <Search className="inline-block mr-2 h-4 w-4" style={{color: vibrantOrange}} />
    {content}
  </div>
);

const AIResponse = ({ content }) => (
  <Card className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100">
    <CardContent className="p-4">
      <Sparkles className="inline-block mr-2 h-4 w-4" style={{color: vibrantOrange}} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </CardContent>
  </Card>
);

const SourceResult = ({ title, url, snippet }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center mb-2">
        <Globe className="mr-2 h-4 w-4" style={{color: vibrantOrange}} />
        <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
          {title}
        </a>
      </div>
      <p className="text-sm">{snippet}</p>
    </CardContent>
  </Card>
);

const EntityResult = ({ name, type, description, relevance }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center mb-2">
        <Building className="mr-2 h-4 w-4" style={{color: vibrantOrange}} />
        <span className="font-medium">{name}</span>
      </div>
      <Badge className="mb-2">{type}</Badge>
      <p className="text-sm"><strong>Descripción:</strong> {description}</p>
      <p className="text-sm"><strong>Relevancia:</strong> {relevance}</p>
    </CardContent>
  </Card>
);

const PersonResult = ({ name, role, organization, relevance }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center mb-2">
        <User className="mr-2 h-4 w-4" style={{color: vibrantOrange}} />
        <span className="font-medium">{name}</span>
      </div>
      <Badge className="mb-2">{role}</Badge>
      <p className="text-sm"><strong>Organización:</strong> {organization}</p>
      <p className="text-sm"><strong>Relevancia:</strong> {relevance}</p>
    </CardContent>
  </Card>
);

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="flex space-x-2 w-full p-4 bg-background border-t">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Haz una pregunta de seguimiento..."
        className="flex-grow"
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <Button onClick={handleSend} size="icon" style={{backgroundColor: vibrantOrange}}>
        <Send className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
};

export default function EnhancedAISearchInterface() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const height = window.innerHeight - containerRef.current.offsetTop;
        setContainerHeight(height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleSearch = async () => {
    if (query.trim() === '') return;
    const results = await getSearchResults(query);
    setSearchResults(results);
    setShowResults(true);
  };

  const handleFollowUp = async (followUpQuery) => {
    const newResults = await getSearchResults(followUpQuery);
    setSearchResults(prevResults => [...prevResults, ...newResults]);
  };

  const getSearchResults = async (query) => {
    // Simulated search and AI response
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { type: 'query', content: query },
      { type: 'ai-response', content: `# Análisis sobre "${query}"\n\n## Resumen\nAquí va un resumen del análisis...\n\n## Detalles\n- Punto 1\n- Punto 2\n- Punto 3\n\n## Conclusión\nEsta es la conclusión del análisis...` },
      { type: 'source', title: 'Fuente 1', url: 'https://ejemplo.com/1', snippet: 'Extracto relevante de la fuente 1...' },
      { type: 'source', title: 'Fuente 2', url: 'https://ejemplo.com/2', snippet: 'Extracto relevante de la fuente 2...' },
      { type: 'entity', name: 'Entidad Ejemplo', type: 'Organización', description: 'Breve descripción de la entidad...', relevance: 'Alta' },
      { type: 'person', name: 'Persona Ejemplo', role: 'CEO', organization: 'Empresa Ejemplo', relevance: 'Media' },
    ];
  };

  return (
    <div 
      ref={containerRef}
      className="flex flex-col relative"
      style={{ height: `${containerHeight}px` }}
    >
      <div className="flex-grow overflow-hidden">
        <AnimatePresence>
          {!showResults ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="h-full flex flex-col justify-center items-center p-4"
            >
              <Card className="w-full max-w-3xl">
                <CardContent className="space-y-4 p-6">
                  <SearchInput
                    query={query}
                    setQuery={setQuery}
                    handleSearch={handleSearch}
                    showOptions={showOptions}
                    setShowOptions={setShowOptions}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <SearchResults
                searchResults={searchResults}
                setShowResults={setShowResults}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {showResults && (
        <div className="absolute bottom-0 left-0 right-0">
          <ChatInput onSend={handleFollowUp} />
        </div>
      )}
    </div>
  );
}
