import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { navbarLinks } from "../constant/constant";
import montserrat from '@/helpers/common';
import { useMenu } from '../hooks/hooks';
export  interface TabletNavbarProps {
    useMenu: ReturnType<typeof useMenu>;
  }
const TabletNavbar: React.FC<TabletNavbarProps> = ({ useMenu }) => {
    const { closeMenu, menuRef } = useMenu;

    return (
        <div className='fixed top-0 right-0 h-full w-60 bg-secondary p-4 z-10' ref={menuRef}>
            <button className="close-button" onClick={closeMenu}>
                <Image
                    src='/assets/icon/close.svg'
                    width={30}
                    height={30}
                    alt='close-icon'
                    className='mt-4'
                />
            </button>
            <ul className='text-small text-white my-4'>
                {navbarLinks[0].links.map((link) => (
                    <li key={link.title} className='mb-4'>
                        <Link href={link.url}>
                            <div className='flex'>
                                <Image
                                    src={link.icon}
                                    width={22}
                                    height={22}
                                    alt="icon"
                                />
                                <span className={`${montserrat.variable} font-mont ml-2 text-base`}>{link.title}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TabletNavbar;
