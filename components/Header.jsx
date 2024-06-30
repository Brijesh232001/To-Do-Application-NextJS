
"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { CgMenu, CgCloseO } from 'react-icons/cg';

const Header = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <header className="text-black body-font sticky top-0 z-50 bg-white" style={{ height: '140px' }}>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center relative">
        <Link href="/">
          <Image src="/Marketminds_Logo(1).png" width={150} height={150} />
        </Link>
        
        <div className="absolute top-4 right-4 md:hidden">
          {isMobileMenuOpen ? (
            <CgCloseO className="text-black cursor-pointer" onClick={toggleMobileMenu} style={{ fontSize: '24px' }} />
          ) : (
            <CgMenu className="text-black cursor-pointer" onClick={toggleMobileMenu} style={{ fontSize: '24px' }} />
          )}
        </div>
        <nav className={`md:ml-auto flex flex-wrap items-center text-base justify-center md:justify-end ${isMobileMenuOpen ? 'flex-col absolute top-full right-0 w-full bg-blue-100 p-5' : 'hidden md:flex'}`}>
          <Link className="mr-6 mb-4 md:mb-0 hover:text-blue-400 hover:underline hover:font-bold" href="/" onClick={closeMobileMenu}>
            Home
          </Link>
          <Link className="mr-6 mb-4 md:mb-0 hover:text-blue-400 hover:underline hover:font-bold" href="#how-it-works" onClick={closeMobileMenu}>
            How It Works
          </Link>
          <Link className="mr-6 mb-4 md:mb-0 hover:text-blue-400 hover:underline hover:font-bold" href="#faq" onClick={closeMobileMenu}>
            FAQs
          </Link>
          <Link className="mr-6 mb-4 md:mb-0 hover:text-blue-400 hover:underline hover:font-bold" href="#contact" onClick={closeMobileMenu}>
            Contact Us
          </Link>
          {session ? (
            <>
              <Link className="mr-6 mb-4 md:mb-0 hover:text-blue-400 hover:underline hover:font-bold" href="/dashboard" onClick={closeMobileMenu}>
                Dashboard
              </Link>
              <div className='relative'>
                <div className="profile" onClick={toggleDropdown}>
                  {/* Your profile image */}
                  
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="flex flex-col">
                    {session?.user?.name && (
                      <li className="px-4 py-2 text-blue-400 font-bold">{session.user.name}</li>
                    )}
                    <Link href="/profile">
                      <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">Your Profile</li>
                    </Link>
                    <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer" onClick={() => {signOut(); closeMobileMenu();}}>Logout</li>
                  </ul>
                  </div>
                )}
                {isMobileMenuOpen && (
                    <div className="absolute top-4 right-4 md:hidden">
                      <CgCloseO className="text-black cursor-pointer" onClick={toggleMobileMenu} style={{ fontSize: '24px' }} />
                    </div>
                  )}
              </div>
              
              {/* <button className="bg-blue-400 hover:bg-white hover:border border-blue-400 hover:text-blue-400 text-white rounded-lg font-bold cursor-pointer px-6 py-2 mr-10" onClick={() => {signOut(); closeMobileMenu();}}>
                Logout
              </button> */}
            </>
            
          ) : (
            <>
              <Link className="mr-6 mb-4 md:mb-0 hover:text-blue-400 hover:underline hover:font-bold" href="/login" onClick={closeMobileMenu}>
                Login
              </Link>
              <Link href="/registerr">
                <button className="bg-blue-400 hover:bg-white hover:border border-blue-400 hover:text-blue-400 text-white rounded-lg font-bold cursor-pointer px-6 py-2 mr-10" onClick={closeMobileMenu}>
                  Register
                </button>
              </Link>
            </>
          )}
        </nav>
        {isMobileMenuOpen && (
          <div className="absolute top-4 right-4 md:hidden">
            <CgCloseO className="text-black cursor-pointer" onClick={toggleMobileMenu} style={{ fontSize: '24px' }} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
