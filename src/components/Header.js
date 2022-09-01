import React from "react";
import { Link } from "react-router-dom";
const logo = require("../assets/images/logo.png");

export default function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <div className="h-12 bg-slate-900 fixed top-0 left-0 right-0">
        <Link to='/home'>
          <img src={logo} alt="logo" className="w-6 fixed top-1 left-3 cursor-pointer" />
          <div className="fixed top-6 left-2 cursor-pointer text-white font-mono" >Home</div>
        </Link>
      </div>
      <div className='h-13'></div>
    </>
  );
}