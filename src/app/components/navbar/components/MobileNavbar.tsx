import { useState } from 'react';
import { mobileNavbarLinks } from "../constant/constant";
import montserrat from '@/helpers/common';
import Link from 'next/link';
export interface MobileNavbarLink {
    icon: string;
    title: string;
    url: string;
  }
const MobileNavbar = () => {
    const [activeLink, setActiveLink] = useState<string>('/home');

    const handleLinkClick = (url: string) => {
        setActiveLink(url);
    };
    return (
        <div className='fixed -bottom-2 left-0 w-full bg-secondary p-4 z-10 border-t-2 border-solid border-gray-600 lg:hidden md:hidden'>
            <ul className='flex justify-between mx-4'>
                {mobileNavbarLinks.map((link: MobileNavbarLink) => (
                    <li key={link.title} className={`text-white ${link.url === activeLink ? 'active' : 'inactive'}`}>
                        <Link href={link.url}>
                            <div
                                className='flex flex-col items-center cursor-pointer'
                                onClick={() => handleLinkClick(link.url)}
                            >
                                <img src={link.icon} width={22} height={22} alt='icon' />
                                <span className={`${montserrat.variable} font-mont mt-2 text-sm font-semibold`}>
                                    {link.title}
                                </span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            <style jsx>{`
            .active {
              color: white;
            }
            .inactive {
              color: gray;
            }
          `}</style>
        </div>
    )
}

export default MobileNavbar
