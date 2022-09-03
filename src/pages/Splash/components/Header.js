import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const logo = require("../../../assets/images/logo.png");

export default function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9] }}
        className="h-12 bg-slate-900 fixed top-0 left-0 right-0 flex md:justify-center"
      >
        <div className='flex items-end'>
            <img src={logo} alt="logo" className="w-12" />
            <div className='ml-2'>ViDash</div>
        </div>
        <div className='fixed top-1.5 right-6 flex'>
          <Link to='/register?id=new'>
            <div className='text-lg rounded px-1 py-0.5 cursor-pointer' style={{ border: '1px solid #ff8000' }} onMouseEnter={e => e.target.style.backgroundColor='#ff8000'} onMouseLeave={e => e.target.style.backgroundColor='transparent'} >Register</div>
          </Link>
          <Link to='/login'>
            <div className='text-lg rounded  px-1 py-0.5 ml-2 cursor-pointer' style={{ backgroundColor: '#ff8000' }}>Login</div>
          </Link>
        </div>
      </motion.div>
      <div className='h-13'></div>
    </>
  );
}