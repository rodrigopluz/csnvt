import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  return (
    <div className="sticky-top navbar-elixir">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <Link className="navbar-brand" to="/">
            <img src="./assets/img/logocs-dark.svg" alt="logo" />
          </Link>
          <button
            className="navbar-toggler p-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#primaryNavbarCollapse"
            aria-controls="primaryNavbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="hamburger hamburger--emphatic">
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="primaryNavbarCollapse"
          >
            <ul className="navbar-nav py-3 py-lg-0 mt-1 mb-2 my-lg-0 ms-lg-n1">
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#start"
                  role="button"
                >
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#services"
                  role="button"
                >
                  Services
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#ports"
                  role="button"
                >
                  Locations
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#about"
                  role="button"
                >
                  About
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#certifications"
                  role="button"
                >
                  Certifications
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#benefits"
                  role="button"
                >
                  Benefits
                </a>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link"
                  to="/contact"
                  role="button"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <Link
              className="btn btn-outline-primary rounded-pill btn-sm border-2 d-block d-lg-inline-block ms-auto my-3 my-lg-0"
              // target="_blank"
              to="/login"
            >
              Login
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
