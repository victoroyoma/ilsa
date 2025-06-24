import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  logoUrl: string;
}
export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  logoUrl
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [{
    name: 'Home',
    path: '/',
    id: 'home'
  }, {
    name: 'About',
    path: '/about',
    id: 'about'
  }, {
    name: 'Speakers',
    path: '/speakers',
    id: 'speakers'
  }, {
    name: 'Logistics',
    path: '/logistics',
    id: 'logistics'
  }, {
    name: 'Tickets',
    path: '/tickets',
    id: 'tickets'
  },
{
    name: 'Contact Us',
    path: '/contact',
    id: 'contact'
}];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" onClick={() => setActivePage('home')} className="flex items-center space-x-2">
          <img 
            src={logoUrl} 
            alt="ILSA 2025" 
            className="h-12 w-auto"
          />
        </Link>
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => <Link key={link.id} to={link.path} onClick={() => setActivePage(link.id)} className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${activePage === link.id ? 'text-amber-400' : 'text-white/80 hover:text-white'}`}>
              {link.name}
              {activePage === link.id && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-500 rounded-full"></span>}
            </Link>)}
        </div>
        {/* Mobile menu button */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white">
          {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md py-4 border-t border-white/10 animate-fadeIn">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navLinks.map(link => <Link key={link.id} to={link.path} onClick={() => {
          setActivePage(link.id);
          setIsMobileMenuOpen(false);
        }} className={`py-2 px-4 rounded-md transition-colors duration-200 ${activePage === link.id ? 'bg-amber-500/10 text-amber-400' : 'text-white/80 hover:bg-white/5 hover:text-white'}`}>
                {link.name}
              </Link>)}
          </div>
        </div>}
    </nav>;
};