"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Check if the link is active
  const isActive = (path) => {
    if (!mounted) return false;
    return pathname === path;
  };

  return (
    <div className={`header bg-white ${scrolled ? 'shadow-md' : ''}  w-full z-50 transition-shadow duration-300`}>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex justify-between items-center'>
          <div className='flex-shrink-0'>
            <Link href='/'>
              <Image
                src="/Logo.png"
                width={150}
                height={40}
                alt="Arulneri Healcare Logo"
                className="img-fluid"
              />
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className='lg:hidden'>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='p-2 text-gray-700 hover:text-blue-600 focus:outline-none'
            >
              <Menu size={24} />
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-6'>
            <ul className='flex space-x-8 text-lg font-medium items-center'>
              <li>
                <Link 
                  href='/' 
                  className={`hover:text-blue-600 link-underline-opacity-0 nav-link nav-menus  transition duration-300 relative pb-1 
                    ${isActive('/') ? 'text-blue-600 after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0' : 'text-gray-700'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href='/our-program' 
                  className={`hover:text-blue-600 nav-link nav-menus transition duration-300 relative pb-1 
                    ${isActive('/programs') ? 'text-blue-600 after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0' : 'text-gray-700'}`}
                >
                  Our Programs
                </Link>
              </li>
              <li>
                <Link 
                  href='/about' 
                  className={`hover:text-blue-600 nav-link nav-menus transition duration-300 relative pb-1 
                    ${isActive('/about') ? 'text-blue-600 after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0' : 'text-gray-700'}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href='/testimonials' 
                  className={`hover:text-blue-600 nav-link nav-menus transition duration-300 relative pb-1 
                    ${isActive('/testimonials') ? 'text-blue-600 after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0' : 'text-gray-700'}`}
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link 
                  href='/contact' 
                  className='px-6 py-2 bg-blue-600 appointment nav-menus text-decoration-none text-white rounded-full hover:bg-blue-700 transition duration-300 font-medium'
                >
                  Appointment
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className='lg:hidden mt-4 pb-4 border-t border-gray-200'>
            <ul className='space-y-4 pt-4'>
              <li>
                <Link 
                  href='/' 
                  className={`block px-4 py-2 text-lg nav-menus font-medium hover:text-blue-600 transition duration-300
                    ${isActive('/') ? 'text-blue-600 border-l-4 border-blue-600 pl-3' : 'text-gray-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href='/programs' 
                  className={`block px-4 py-2 text-lg nav-menus font-medium hover:text-blue-600 transition duration-300
                    ${isActive('/programs') ? 'text-blue-600 border-l-4 border-blue-600 pl-3' : 'text-gray-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Programs
                </Link>
              </li>
              <li>
                <Link 
                  href='/about' 
                  className={`block px-4 py-2 text-lg nav-menus font-medium hover:text-blue-600 transition duration-300
                    ${isActive('/about') ? 'text-blue-600 border-l-4 border-blue-600 pl-3' : 'text-gray-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href='/testimonial' 
                  className={`block px-4 py-2 text-lg nav-menus font-medium hover:text-blue-600 transition duration-300
                    ${isActive('/testimonial') ? 'text-blue-600 border-l-4 border-blue-600 pl-3' : 'text-gray-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </Link>
              </li>
              <li className='px-4 pt-2'>
                <Link 
                  href='/contact' 
                  className='block w-full text-center nav-menus px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 font-medium'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Appointment
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}