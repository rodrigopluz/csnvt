import React from 'react';
import { Link } from 'react-router-dom';

const BannerContact: React.FC = () => {
  return (
    <section>
      <div
        className="bg-holder overlay"
        style={{
          backgroundImage: 'url(assets/img/contactphoto.jpg)',
          backgroundPosition: 'center bottom',
        }}
      />
      <div className="container">
        <div className="row pt-6" data-inertia='{"weight":1.5}'>
          <div
            className="col-md-8 text-white"
            data-zanim-timeline="{}"
            data-zanim-trigger="scroll"
          >
            <div className="overflow-hidden">
              <h1
                className="text-white fs-4 fs-md-5 mb-0 lh-1"
                data-zanim-xs='{"delay":0}'
              >
                Contact Us
              </h1>
              <div
                className="nav"
                aria-label="breadcrumb"
                role="navigation"
                data-zanim-xs='{"delay":0.1}'
              >
                <ol className="breadcrumb fs-1 ps-0 fw-bold">
                  <li className="breadcrumb-item">
                    <Link className="text-white" to="/">
                      Home
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                  >
                    Contact
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerContact;
