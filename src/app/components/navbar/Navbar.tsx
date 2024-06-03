"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMenu } from './hooks/hooks';
import montserrat from '@/helpers/common';

import MobileNavbar from './components/MobileNavbar';
import TabletNavbar from './components/TabletNavbar';
import { navbarLinks } from './constant/constant';
export interface NavbarProps {
  hideMobileMenu?: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ hideMobileMenu = false }) => {
  const menu = useMenu();

  return (
    <div className='relative'>
      <nav className='lg:flex justify-between items-center bg-primary-color  py-2 px-12 border-b border-solid border-gray-600 gap-4 hidden md:block'>
        <div className='flex-1 flex items-center justify-between gap-10'>
          <div className='pl-2 '>
            <Link href='/'>
              <Image
                src='/assets/icon/library.svg'
                width={150}
                height={70}
                alt='ctt-logo'
              />
            </Link>
          </div>
          <div className='xl:flex hidden text-small gap-6 pr-5'>
            {navbarLinks[0].links.map((link) => (
              <li key={link.title} className='text-white list-none'>
                <Link href={link.url}>
                  <div className='flex'>
                    <Image
                      src={link.icon}
                      width={22}
                      height={22}
                      alt='icon'
                    />
                    <span className={`${montserrat.variable} font-mont ml-2 font-normal text-bse`}>{link.title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </div>
          <div className='xl:hidden block cursor-pointer' onClick={menu.toggleMenu}>
            <Image
              src='/assets/icon/hamburger.png'
              width={24}
              height={24}
              alt='menu-icon'
            />
          </div>
        </div>
      </nav>

      {/* tablet menu */}
      {menu.menuOpen && <TabletNavbar useMenu={menu} />}

      {/* different mobile menu */}
      {!hideMobileMenu && (
        <MobileNavbar />
      )}
    </div>
  );
};

export default Navbar;
