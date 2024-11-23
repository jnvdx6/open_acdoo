"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Twitter, Instagram, Mail, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

function Footer() {
  const pathname = usePathname();
  
  // Si la ruta comienza con '/chat', no renderizamos el footer
  if (pathname.startsWith('/chat')) {
    return null;
  }

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 pt-16 pb-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">ACostaDeOtros</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Transparencia y rendición de cuentas en el uso de fondos públicos.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Secciones</h3>
            <ul className="space-y-2">
              {['Inicio', 'Noticias', 'BOE', 'Tramas', 'Chat', 'Info'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                <Mail className="h-4 w-4 mr-2" />
                info@acostadeotros.org
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <a key={index} href="#" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Donaciones</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Ayúdanos a mantener nuestra independencia y continuar nuestra labor.
            </p>
            <Button variant="outline" className="mb-2 w-full justify-between text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800">
              Transferencia Bancaria
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" className="w-full justify-between text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800">
              Donar con Crypto
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} ACostaDeOtros. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;