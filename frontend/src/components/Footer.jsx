import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 fixed-bottom">
      <div className="container">
        <div className="row mx-auto w-50 w-sm-25">
          <p className="col-12 col-sm-6">
            <Link to="https://en.wikipedia.org/wiki/Terms_of_service" target="_blank">Terms of Use</Link>
          </p>
          <p className="col-12 col-sm-6">
            <Link to="https://en.wikipedia.org/wiki/Privacy_policy" target="_blank">Privacy Policy</Link>
          </p>
        </div>
        <div className="row text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Sebastián Ramírez. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;