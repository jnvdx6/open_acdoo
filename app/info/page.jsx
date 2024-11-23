'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AlertTriangle, Shield, Users, Github, ExternalLink, Code2, GitFork } from "lucide-react";
import { motion } from "framer-motion";

export default function Info() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section with Gradient Background */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#FF6B35] via-[#FF8C61] to-[#FFB08A] py-20">
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Pacto de Gobernabilidad ACDOO
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Empoderando a la ciudadanía en la lucha contra la corrupción y el mal uso de fondos públicos
            </p>
          </motion.div>
        </div>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-800">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              <motion.div variants={item} className="prose dark:prose-invert max-w-none">
                <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                  Frente a los recientes y antiguos escándalos de corrupción en España, como los casos "Casal Sánchez", "caso Koldo" y "trama Gürtel", la sociedad española ha perdido la confianza en un gobierno que se percibe cada vez más grande y alejado de su función esencial: servir a la población. Este descrédito se manifiesta en la percepción de que las instituciones crecen en tamaño (un leviatán) pero pierden capacidad de acción efectiva.
                </p>
              </motion.div>

              <motion.div variants={item} className="grid md:grid-cols-3 gap-6">
                <Card className="bg-white dark:bg-neutral-800 border-none shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
                  <div className="h-1.5 bg-[#FF6B35]" />
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#FF6B35] text-lg">
                      <AlertTriangle className="mr-3 h-5 w-5" />
                      Denuncias Anónimas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-neutral-600 dark:text-neutral-300 text-sm">
                      Canal seguro y confidencial para denunciar irregularidades, protegiendo siempre el anonimato de los informantes.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-neutral-800 border-none shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
                  <div className="h-1.5 bg-[#FF6B35]" />
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#FF6B35] text-lg">
                      <Shield className="mr-3 h-5 w-5" />
                      Integridad
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-neutral-600 dark:text-neutral-300 text-sm">
                      Investigaciones basadas en hechos verificables, manteniendo los más altos estándares éticos y objetividad.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-neutral-800 border-none shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
                  <div className="h-1.5 bg-[#FF6B35]" />
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#FF6B35] text-lg">
                      <Users className="mr-3 h-5 w-5" />
                      Colaboración
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-neutral-600 dark:text-neutral-300 text-sm">
                      Trabajo conjunto con ciudadanos y expertos para fortalecer la participación en la lucha anticorrupción.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item} className="space-y-8">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">Principios Fundamentales</h2>
                  <ul className="list-disc pl-6 space-y-4 text-base text-neutral-700 dark:text-neutral-300">
                    <li>Transparencia y Responsabilidad: Fomentar una gestión pública abierta y accesible, donde los ciudadanos puedan monitorear y evaluar el uso de los recursos y la actuación de los funcionarios.</li>
                    <li>Igualdad ante la Ley: Garantizar que todos los ciudadanos, independientemente de su posición social o económica, estén sujetos a las mismas leyes y normativas.</li>
                    <li>Protección de los Derechos Civiles: Defender los derechos y libertades fundamentales de todos los ciudadanos.</li>
                    <li>Uso Ético de la Tecnología: Implementar herramientas de inteligencia artificial respetando la privacidad y los derechos individuales.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4 text-neutral-800 dark:text-neutral-100">Rol de la Inteligencia Artificial</h2>
                  <p className="text-base text-neutral-700 dark:text-neutral-300">
                    La inteligencia artificial jugará un papel crucial en el funcionamiento de esta plataforma, permitiendo el procesamiento de denuncias, verificación de datos, detección de patrones de corrupción y análisis predictivo para prevenir futuros casos de corrupción.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#FF6B35]/10 via-[#FF8C61]/10 to-[#FFB08A]/10 p-8 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 text-[#FF6B35]">Conclusión</h3>
                  <p className="text-base text-neutral-700 dark:text-neutral-300">
                    El Pacto de Gobernabilidad ACDOO es una propuesta ambiciosa que busca transformar la manera en que se denuncian y combaten la corrupción y la malversación de fondos públicos en España. Respaldado por los avances en inteligencia artificial, su meta es empoderar a los ciudadanos y garantizar que la información fluya libremente.
                  </p>
                </div>
              </motion.div>

              {/* Enhanced Open Source Section */}
              <motion.div variants={item} className="mt-12">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-white">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <Code2 className="h-12 w-12 text-[#FF6B35]" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold flex items-center">
                        Proyecto Open Source
                        <GitFork className="ml-2 h-5 w-5 text-[#FF6B35]" />
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        ACDOO es un proyecto de código abierto que cree en la transparencia y la colaboración. Todo nuestro código está disponible públicamente, permitiendo a la comunidad revisar, contribuir y mejorar la plataforma. Juntos podemos construir una herramienta más robusta y efectiva en la lucha contra la corrupción.
                      </p>
                      <div className="flex items-center space-x-4">
                        <a 
                          href="https://github.com/ACostaDeOtros" 
                          className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-[#FF6B35] rounded-full hover:bg-[#FF8C61] transition-colors duration-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Contribuye en GitHub
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
