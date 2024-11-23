import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, HelpCircle } from "lucide-react";
import { Globe } from "@/components/Globe";
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Link from 'next/link';

function HeroSection() {
  const { theme } = useTheme();

  return (
    <section className="relative py-8 sm:py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-8">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-[#FF6B35] leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              ACostaDeOtros
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-700 dark:text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Transparencia y rendición de cuentas potenciadas por IA avanzada.
              Desenmascarando la corrupción con tecnología de vanguardia.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                size="lg"
                className={`
                  ${theme === 'dark'
                    ? 'bg-[#FF6B35] hover:bg-[#ff6b35db] text-gray-900'
                    : 'bg-[#FF6B35] hover:bg-[#ff6b35db] text-white'}
                  text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto
                `}
              >
                Explora el futuro <ArrowRight className="ml-2 hidden sm:inline" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white dark:bg-neutral-800 rounded-lg p-4 sm:p-5 shadow-lg border border-gray-200 dark:border-neutral-700 hover:border-[#FF6B35] transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-3">
                <svg width="40" height="40" viewBox="0 0 647 622" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10">
                  <motion.path
                    d="M247.105 18H541.367C587.205 18 624.365 55.1184 624.365 100.906V545.585M128.268 18H422.53C468.368 18 505.528 55.1184 505.528 100.906V545.585M0 18H294.262C340.101 18 377.259 55.1184 377.259 100.906V545.585M399.895 604H105.633C59.7945 604 22.6356 566.882 22.6356 521.094V76.4148M518.732 604H224.47C178.632 604 141.472 566.882 141.472 521.094V76.4148M647 604H352.738C306.899 604 269.741 566.882 269.741 521.094V76.4148"
                    stroke="#E32E2E"
                    strokeWidth="35"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Respaldado por ZerodAI</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Tecnología avanzada para ciberseguridad</p>
                </div>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                ZerodAI aporta su tecnología de IA y recursos para potenciar ACDOO.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="https://zerodai.com" passHref>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center bg-[#FF6B35] hover:bg-[#FF8C61] text-white text-sm font-bold py-2 px-4 sm:px-5 rounded-full transition-all duration-300"
                  >
                    <span>Visitar ZerodAI</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </motion.div>
                </Link>
                <Link href="/zerodai-acdoo" passHref>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center border border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white text-sm font-bold py-2 px-3 sm:px-4 rounded transition-all duration-300"
                  >
                    <span>Cómo ayuda a ACDOO</span>
                    <HelpCircle className="ml-2 h-4 w-4" />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            <motion.div 
              className="aspect-square max-w-[300px] sm:max-w-[400px] lg:max-w-[600px] mx-auto transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Globe />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;