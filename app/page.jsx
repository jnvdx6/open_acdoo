"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AlertTriangle, Search, Shield, TrendingUp, Scale, Users, ExternalLink } from "lucide-react";
import HeroSection from "@/components/HeroSection";

// Definimos un color naranja más vibrante
const vibrantOrange = "rgb(255, 107, 53)"; // Este es el color #FF6B35 en formato RGB

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 pb-8">
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <FeaturesSection />
      <LatestReportsSection />
      <AISection />
      <MethodologySection />
      <FAQSection />
      <CallToActionSection />
    </div>
  );
}

function AboutSection() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-neutral-800 dark:text-neutral-100">Sobre ACostaDeOtros</h2>
      <p className="text-lg mb-6 text-neutral-600 dark:text-neutral-300">
        ACostaDeOtros es una plataforma independiente dedicada a la investigación y exposición del mal uso de fondos públicos. 
        Nuestro objetivo es fomentar la <span className="text-primary-500">transparencia y la responsabilidad</span> en la gestión de recursos estatales, 
        utilizando tecnología avanzada y el poder de la ciudadanía para detectar y prevenir la corrupción.
      </p>
      <p className="text-lg mb-6 text-neutral-600 dark:text-neutral-300">
        Somos una organización apolítica, comprometida con la <span className="text-primary-500">objetividad y la imparcialidad</span>. 
        Nuestras investigaciones se basan en datos y hechos verificables, no en opiniones o afiliaciones políticas.
      </p>
    </section>
  );
}

function ValuesSection() {
  const values = [
    { icon: <Scale style={{color: '#FF6B35'}} />, title: "Imparcialidad", description: "Nuestro enfoque es apolítico y basado en hechos" },
    { icon: <Shield style={{color: '#FF6B35'}} />, title: "Integridad", description: "Mantenemos los más altos estándares éticos en nuestro trabajo" },
    { icon: <Users style={{color: '#FF6B35'}} />, title: "Colaboración", description: "Trabajamos con ciudadanos, expertos y organizaciones afines" },
    { icon: <ExternalLink style={{color: '#FF6B35'}} />, title: "Transparencia", description: "Nuestros métodos y fuentes son siempre verificables" },
  ];

  return (
    <section className="py-12 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-neutral-800 dark:text-neutral-100">Nuestros Valores</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => (
          <Card key={index} className="bg-white dark:bg-neutral-800" style={{borderTop: '4px solid #FF6B35'}}>
            <CardHeader>
              <CardTitle className="flex items-center text-neutral-800 dark:text-neutral-100">
                {React.cloneElement(value.icon, { className: "mr-2 h-6 w-6" })}
                {value.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-neutral-600 dark:text-neutral-300">{value.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function LatestReportsSection() {
  const reports = [
    { title: "Contrato sospechoso en el Ministerio X", amount: "€10M", date: "15/10/2024" },
    { title: "Irregularidades en licitación municipal", amount: "€5M", date: "12/10/2024" },
    { title: "Sobrecoste en proyecto de infraestructura", amount: "€50M", date: "08/10/2024" },
  ];

  return (
    <section className="py-12 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-neutral-800 dark:text-neutral-100">Últimos Casos Destapados</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-neutral-800 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr style={{backgroundColor: '#FF6B35', color: 'white'}}>
              <th className="p-3 text-left">Caso</th>
              <th className="p-3 text-left">Monto</th>
              <th className="p-3 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-orange-50 dark:hover:bg-orange-900/10">
                <td className="p-3 text-neutral-700 dark:text-neutral-300">{report.title}</td>
                <td className="p-3 font-bold" style={{color: '#FF6B35'}}>{report.amount}</td>
                <td className="p-3 text-neutral-600 dark:text-neutral-400">{report.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-6">
        <Button variant="outline" style={{color: '#FF6B35', borderColor: '#FF6B35'}} className="hover:bg-orange-50 dark:hover:bg-orange-900/10">
          Ver todos los casos <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

function CallToActionSection() {
  return (
    <section className="py-12 rounded-lg text-center" style={{backgroundColor: '#FF6B35'}}>
      <h2 className="text-3xl font-bold mb-4 text-white">Únete a la lucha contra la corrupción</h2>
      <p className="text-xl mb-8 text-white">Tu voz puede marcar la diferencia. Denuncia de forma segura y anónima.</p>
      <Button size="lg" className="bg-white hover:bg-orange-100" style={{color: '#FF6B35'}}>
        Hacer una denuncia
      </Button>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: <AlertTriangle style={{color: '#FF6B35'}} />, title: "Denuncias Anónimas", description: "Plataforma segura para informantes" },
    { icon: <Search style={{color: '#FF6B35'}} />, title: "Análisis de Datos", description: "IA que detecta patrones de corrupción" },
    { icon: <Shield style={{color: '#FF6B35'}} />, title: "Transparencia Total", description: "Información verificada y accesible" },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-neutral-800 dark:text-neutral-100">Nuestras Armas contra la Corrupción</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-t-2" style={{borderColor: '#FF6B35'}}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{color: '#FF6B35'}}>
                {React.cloneElement(feature.icon, { className: "mr-2 h-6 w-6" })}
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-neutral-600 dark:text-neutral-300">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function AISection() {
  return (
    <section className="py-12 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">IA: Nuestro Detective Incansable</h2>
            <p className="text-lg mb-6 text-neutral-600 dark:text-neutral-300">
              Utilizamos inteligencia artificial de vanguardia para analizar miles de documentos, 
              transacciones y contratos, detectando anomalías que podrían pasar desapercibidas al ojo humano.
            </p>
            <Button variant="default" style={{backgroundColor: '#FF6B35', color: 'white'}} className="hover:bg-opacity-90">
              Conoce nuestra tecnología <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Card className="w-64 h-64 flex items-center justify-center" style={{backgroundColor: 'rgba(255, 107, 53, 0.1)'}}>
              <CardContent>
                <TrendingUp size={100} style={{color: '#FF6B35'}} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodologySection() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-neutral-800 dark:text-neutral-100">Nuestra Metodología</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {['Recopilación de Datos', 'Análisis Imparcial', 'Verificación', 'Transparencia Total'].map((title, index) => (
          <div key={index} className="border-l-4 pl-4" style={{borderColor: '#FF6B35'}}>
            <h3 className="text-2xl font-semibold mb-4" style={{color: '#FF6B35'}}>{title}</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              {index === 0 && "Utilizamos técnicas avanzadas de web scraping y análisis de documentos públicos para recopilar información de múltiples fuentes gubernamentales y no gubernamentales."}
              {index === 1 && "Nuestros algoritmos de IA analizan los datos de forma objetiva, buscando patrones y anomalías sin influencia de sesgos humanos o afiliaciones políticas."}
              {index === 2 && "Cada hallazgo es rigurosamente verificado por nuestro equipo de expertos antes de ser publicado, asegurando la precisión y relevancia de la información."}
              {index === 3 && "Publicamos nuestras metodologías, fuentes de datos y procesos de análisis, permitiendo la revisión y validación independiente de nuestros hallazgos."}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "¿Cómo garantizan la imparcialidad en sus investigaciones?",
      answer: "Nuestro enfoque se basa en datos y hechos verificables, no en opiniones. Utilizamos IA para el análisis inicial, reduciendo el sesgo humano, y nuestro equipo de revisión incluye expertos de diversas áreas y perspectivas."
    },
    {
      question: "¿Cómo protegen a los informantes?",
      answer: "Utilizamos tecnología de encriptación de punta a punta y permitimos denuncias anónimas. Nunca recopilamos información personal a menos que el informante elija proporcionarla."
    },
    {
      question: "¿Cómo se financia ACostaDeOtros?",
      answer: "Nos financiamos exclusivamente a través de donaciones privadas y subvenciones de fundaciones comprometidas con la transparencia. No aceptamos fondos de gobiernos o partidos políticos para mantener nuestra independencia."
    }
  ];

  return (
    <section className="py-12 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-neutral-800 dark:text-neutral-100">Preguntas Frecuentes</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow border-l-4" style={{borderColor: '#FF6B35'}}>
            <h3 className="text-xl font-semibold mb-2" style={{color: '#FF6B35'}}>{faq.question}</h3>
            <p className="text-neutral-600 dark:text-neutral-300">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
