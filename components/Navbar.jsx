import NavbarClient from './NavbarClient'

const navItems = [
  { href: '/documentos', label: 'Documentos' },
  /* { href: '/statistics', label: 'Estadísticas' }, */
  { href: '/tramas', label: 'Tramas' },
  { href: '/chat', label: 'Chat' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/database', label: 'Base de Datos' },
  { href: '/info', label: 'Info' },
]

export default function NavbarServer() {
  return <NavbarClient navItems={navItems} />
}