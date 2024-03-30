import React from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

function Header({ OpenSidebar }) {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
  
      </div>
      <div className="header-right">
       <a className="profile" href=""><BsPersonCircle className="icon-profile" /></a> 
      </div>
    </header>
  );
}

export default Header;
