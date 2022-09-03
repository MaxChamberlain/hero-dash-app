import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import OptionsDropdown from "./OptionsDropdown";
const logo = require("../assets/images/logo.png");

export default function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9] }}
        className="h-12 bg-slate-900 fixed top-0 left-0 right-0 flex justify-center z-[9999]"
      >
        <Link to='/home'>
          <img src={logo} alt="logo" className="w-12 fixed top-0 left-2 cursor-pointer" />
        </Link>
        <svg className='w-12 h-12 fixed top-1 right-2 cursor-pointer' onClick={() => setNavbarOpen(was => !was)}>
          <motion.line x1="10" y1="10" x2="35" y2="10" stroke="white" strokeWidth="4" strokeLinecap="round"
            animate={{ rotate: navbarOpen ? -45 : 0, y: navbarOpen ? 10 : 0 }}
          />
          <motion.line x1="10" y1="20" x2="35" y2="20" stroke="white" strokeWidth="4" strokeLinecap="round"
            animate={{ opacity: navbarOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.line x1="10" y1="30" x2="35" y2="30" stroke="white" strokeWidth="4" strokeLinecap="round"
            animate={{ rotate: navbarOpen ? 45 : 0, y: navbarOpen ? -10 : 0 }}
          />
        </svg>
        {navbarOpen && <OptionsDropdown />}
      </motion.div>
      <div className='h-13'></div>
    </>
  );
}