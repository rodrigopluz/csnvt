import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-primary text-center py-4">
      <div className="container">
        <div className="row align-items-top opacity-85 text-white mt-md-3">
          <div className="col-sm-3 text-sm-start mt-md-0">
            <a href="/" className="mb-3">
              <img
                src="assets/img/logocs-light.svg"
                alt="logo"
              />
            </a>
            <br />
            <a
              className="btn btn-light rounded-pill mt-4"
              href="https://web.whatsapp.com/send?phone=5547992149466"
            >
              <p
                className="fs-0 lh-lg mb-0 fw-semi-thin"
                style={{ textAlign: 'center' }}
              >
                <i className="fab fa-whatsapp w3-spi"></i>
                &nbsp;Whatsapp
              </p>
            </a>
          </div>
          <div className="col-sm-6 mt-3 mt-sm-0">
            <p
              className="lh-lg mb-0 fw-semi-thin"
              style={{ textAlign: 'center' }}
            >
              Head Office Landline: +55 47 20335009
            </p>
            <p
              className="lh-lg mb-0 fw-semi-thin"
              style={{ textAlign: 'center' }}
            >
              Email: operations@cleansea.com.br
            </p>
            <p
              className="lh-lg mb-0 fw-semi-thin"
              style={{ textAlign: 'center' }}
            >
              Website: www.cleansea.com.br
            </p>
            <p
              className="lh-lg mb-0 fw-semi-thin"
              style={{ textAlign: 'center' }}
            >
              Address: Av. Joao Sacavem, 571 - Unit 1002 -
              Navegantes/SC
            </p>
            <h6 className="fs-0">.</h6>
            <p
              className="fs-0 lh-lg mb-0 fw-semi-thin"
              style={{ textAlign: 'center' }}
            >
              <i className="fa fa-recycle w3-spin"></i> Help the
              environment, reduce, reuse, recycle!
            </p>
            <h6 className="fs--2">.</h6>
            <h6 className="fs--2">.</h6>
            <p className="lh-lg mb-0 fw-semi-thin">
              &copy; Copyright 2023 Clean Sea Co.
            </p>
          </div>
          <div className="col-sm-3 text-sm-start">
            <p
              className="fs-0 lh-lg mb-0 fw-semi-thin"
              style={{ textAlign: 'center' }}
            >
              <i className="fab fa-weixin"></i> WeChat:
            </p>
            <div className="col-sm-5 text-sm-start mt-md-0 mt-3">
              <a href="/">
                <p className="text-white"></p>
                <img
                  src="assets/img/qrfe.svg"
                  className="img-fluid"
                  data-zanim-xs="{}"
                  alt="partnerco"
                />
              </a>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
