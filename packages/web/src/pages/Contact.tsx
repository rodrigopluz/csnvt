import React, { useEffect, useState } from 'react';
import { Environment } from '@csnvt/environment';

import '../assets/css/user.css';
import '../assets/css/theme.css';
import '../vendors/prism/prism.css';
import '../vendors/loaders.css/loaders.min.css';
import '../vendors/hamburgers/hamburgers.min.css';

import BannerContact from '../components/BannerContact';
import Preloader from '../components/Preloader';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

const Contact: React.FC = () => {
  useEffect(() => {
    document.title = 'Clean Sea - Contact';

    const BigPicture = document.createElement('script');
    BigPicture.src = 'src/vendors/bigpicture/BigPicture.js';
    document.body.appendChild(BigPicture);

    const Swiper = document.createElement('script');
    Swiper.src = 'src/vendors/swiper/swiper-bundle.min.js';
    document.body.appendChild(Swiper);

    const Is = document.createElement('script');
    Is.src = 'src/vendors/is/is.min.js';
    document.body.appendChild(Is);

    const Popper = document.createElement('script');
    Popper.src = 'src/vendors/popper/popper.min.js';
    document.body.appendChild(Popper);

    const CountUp = document.createElement('script');
    CountUp.src = 'src/vendors/countup/countUp.umd.js';
    document.body.appendChild(CountUp);

    const Gsap = document.createElement('script');
    Gsap.src = 'src/vendors/gsap/gsap.js';
    document.body.appendChild(Gsap);

    const CustomEase = document.createElement('script');
    CustomEase.src = 'src/vendors/gsap/customEase.js';
    document.body.appendChild(CustomEase);

    const ImagesLoaded = document.createElement('script');
    ImagesLoaded.src =
      'src/vendors/imagesloaded/imagesloaded.pkgd.min.js';
    document.body.appendChild(ImagesLoaded);

    const Lodash = document.createElement('script');
    Lodash.src = 'src/vendors/lodash/lodash.min.js';
    document.body.appendChild(Lodash);

    const Theme = document.createElement('script');
    Theme.src = 'src/assets/js/theme.js';
    document.body.appendChild(Theme);

    localStorage.removeItem(Environment.LOCAL_STORAGE_USER);
    localStorage.removeItem(
      Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN,
    );

    return () => {
      document.body.removeChild(BigPicture);
      document.body.removeChild(Swiper);
      document.body.removeChild(Is);
      document.body.removeChild(Popper);
      document.body.removeChild(CountUp);
      document.body.removeChild(Gsap);
      document.body.removeChild(CustomEase);
      document.body.removeChild(ImagesLoaded);
      document.body.removeChild(Lodash);
      document.body.removeChild(Theme);
    };
  }, []);

  return (
    <>
      <Headers />
      <Menu />
      <BannerContact />
      <main className="main" id="top">
        <Preloader />
        <section className="bg-100">
          <div className="container">
            <div className="row align-items-stretch justify-content-center mb-4">
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div className="card h-100">
                  <div className="card-body px-5">
                    <h5 className="mb-3">
                      Comercial Department
                    </h5>
                    <p
                      className="mb-0 text-1100"
                      style={{ textAlign: 'center' }}
                    >
                      <span className="fas fa-envelope" />{' '}
                      operations@cleansea.com.br
                      <span className="fas fa-phone-alt" /> +55
                      47 99214.9466
                      <br />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div className="card h-100">
                  <div className="card-body px-5">
                    <h5
                      className="mb-3"
                      style={{ textAlign: 'center' }}
                    >
                      Head Office
                    </h5>
                    <p
                      className="mb-0 text-1100"
                      style={{ textAlign: 'center' }}
                    >
                      <span className="fas fa-map-marker-alt" />{' '}
                      Av. Joao Sacavem, 571,
                      <br />
                      Unity 1002, Brazil <br />
                      <span className="fas fa-phone-alt" />
                      +55 47 2033.5009
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div className="card h-100">
                  <div className="card-body px-5">
                    <h5 className="mb-3">
                      Operations Department
                    </h5>
                    <p
                      className="mb-0 text-1100"
                      style={{ textAlign: 'center' }}
                    >
                      <span className="fas fa-envelope" />{' '}
                      operations@cleansea.com.br
                      <span className="fas fa-phone-alt" /> +55
                      47 99280.0227
                      <br />
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <br />
              </div>
              <div className="col-lg-3 mb-4 mb-lg-0">
                <div className="card h-100">
                  <div className="card-body px-5">
                    <h5
                      className="mb-3"
                      style={{ textAlign: 'center' }}
                    >
                      Whatsapp
                    </h5>
                    <p
                      className="mb-0 text-1100"
                      style={{ textAlign: 'center' }}
                    >
                      Connect us using the QR-Code
                    </p>

                    <div>
                      <br />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        className="img-fluid"
                        src="assets/img/QRWP.png"
                        alt="partnerco"
                        data-zanim-xs="{}"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 mb-4 mb-lg-0">
                <div className="card h-100">
                  <div className="card-body px-5">
                    <h5
                      className="mb-3"
                      style={{ textAlign: 'center' }}
                    >
                      WeChat
                    </h5>
                    <p
                      className="mb-0 text-1100"
                      style={{ textAlign: 'center' }}
                    >
                      Connect us using the QR-Code
                    </p>

                    <div>
                      <br />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        className="img-fluid"
                        src="assets/img/QRWC.png"
                        alt="partnerco"
                        data-zanim-xs="{}"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <br />
              </div>

              <div className="card mb-4">
                <div className="card-body p-5 h-100">
                  <div
                    className="googlemap"
                    data-gmap="data-gmap"
                    data-latlng="-26.901174970055084, -48.648047273786794"
                    data-scrollwheel="false"
                    data-icon="assets/img/map-marker.png"
                    data-zoom="13"
                    data-theme="Tripitty"
                  >
                    <div className="marker-content py-3">
                      <h5>Clean Sea</h5>
                      <p className="mb-0">
                        With the Head Office located in
                        Navegantes Port,
                        <br />
                        Serving in all main brasilian ports.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary">
                <div
                  id="contact-section-form"
                  className="card-body h-100 p-5"
                >
                  <h5 className="text-white">
                    <span>Send us an email:</span>
                  </h5>
                  <form id="contact-form">
                    <div className="mb-4">
                      <input
                        className="form-control bg-white"
                        placeholder="Your Name"
                        type="text"
                        id="name"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="form-control bg-white"
                        placeholder="Your Phone"
                        type="text"
                        id="phone"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="form-control bg-white"
                        placeholder="Your Email"
                        type="email"
                        id="email"
                      />
                    </div>
                    <div className="mb-4">
                      <textarea
                        className="form-control bg-white"
                        placeholder="Message..."
                        id="message"
                        rows={11}
                      ></textarea>
                    </div>
                    <button
                      className="btn btn-md-lg btn-secondary"
                      type="submit"
                    >
                      <span className="color-white fw-600">
                        Send Now
                      </span>
                    </button>
                  </form>
                </div>
                <div
                  id="contact-section-return"
                  style={{ display: 'none' }}
                  className="card-body h-100 p-5"
                >
                  <h5 className="text-white text-center">
                    <span>
                      Your message was received, we will answer
                      asap. Thanks for your contact!
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
