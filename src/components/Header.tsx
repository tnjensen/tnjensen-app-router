"use client"

import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { useOutsideClick } from "../hooks/useOutsideClick";
import Link from "next/link";

export default function Header() {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const showMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  useOutsideClick(menuRef, () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  });

  return (
    <header className="px-4">
      <div className="header-content flex justify-between place-items-center max-w-7xl mx-auto">
        <Link href={"/"}>
          <img src={"/images/me_elvehavn.jpg"} alt='Logo' width={50} height={50} className='rounded-full w-8 h-8 md:w-10 md:h-10 object-cover my-2' />
        </Link>
        <FaBars id="menu-button" className="sm:hidden cursor-pointer fixed right-6 top-4 text-xl" onClick={showMenu} />
        {isMenuOpen ? (
          <div ref={menuRef}>
            <nav className="dropdown absolute top-12 right-4 z-50 bg-[var(--white)] border border-[var(--light-grey)] rounded-md p-4">
              <ul className="flex-col">
                <li className="py-1">
                  <Link href="/" className={path === "/" ? "active" : ""} onClick={closeMenu}>
                    Home
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="/projects" className={path === "/projects" ? "active" : ""} onClick={closeMenu}>
                    Projects
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="/about" className={path === "/about" ? "active" : ""} onClick={closeMenu}>
                    About
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="/contact" className={path === "/contact" ? "active" : ""} onClick={closeMenu}>
                    Contact
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="/blog" className={path === "/blog" ? "active" : ""} onClick={closeMenu}>
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <nav className="visible flex justify-center place-items-center">
            <ul className="sm:flex hidden gap-2 justify-center mt-12 mb-4 mr-2 sm:mt-1 align-center">
              <li className="py-1">
                <Link href="/" className={path === "/" ? "active" : ""}>
                  Home
                </Link>
              </li>
              <li className="py-1">
                <Link href="/projects" className={path === "/projects" ? "active" : ""}>
                  Projects
                </Link>
              </li>
              <li className="py-1">
                <Link href="/about" className={path === "/about" ? "active" : ""}>
                  About
                </Link>
              </li>
              <li className="py-1">
                <Link href="/contact" className={path === "/contact" ? "active" : ""}>
                  Contact
                </Link>
              </li>
              <li className="py-1">
                <Link href="/blog" className={path === "/blog" ? "active" : ""}>
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}