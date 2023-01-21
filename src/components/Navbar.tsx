import Link from 'next/link';
import React, { useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import Button from './Button';
import { FunctionComponent } from "react";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const [theme, setTheme] = useState("light");

  return (
    <nav
      className="bg-dmlm-white z-30 top-0 fixed md:py-4 shadow-md w-full border-b border-gray-200
    dark:bg-dm-dark-blue dark:border-gray-800"
    >
      <div className="flex justify-between pl-8 md:px-32">
        <Link href="/" className="flex">
          <span
            className="self-center text-sm md:text-xl font-nunito-bold text-lm-very-dark-blue
           whitespace-nowrap cursor-pointer dark:text-dmlm-white"
          >
            Where in the world?
          </span>
        </Link>
        <div className="mt-2 md:-mr-9">
          <Button
            text={theme === "light" ? "Light Mode" : "Dark Mode"}
            flat={true}
            theme={theme}
            icon={
              theme === "light" ? (
                <HiOutlineSun size={18} />
              ) : (
                <HiOutlineMoon size={18} />
              )
            }
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar