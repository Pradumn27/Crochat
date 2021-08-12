import React from "react";
import "./Footer.css";
  
const Footer = () => {
  return (
    <div className="box">
      <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Pradumn Kumar | All rights reserved 
          </p>
        </div>
    </div>
  )};
export default Footer;