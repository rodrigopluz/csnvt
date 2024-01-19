import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Environment } from '@csnvt/environment';

import '../assets/css/user.css';
import '../assets/css/style.css';
import '../assets/css/theme.css';
import '../vendors/loaders.css/loaders.min.css';
import '../vendors/swiper/swiper-bundle.min.css';
import '../vendors/hamburgers/hamburgers.min.css';

import Preloader from '../components/Preloader';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

import Buttons from '../components/Buttons';
import Ports from '../components/Ports';

import dataPorts from '../helpers/dataPorts';

const Locations: React.FC = () => {
  const location = useLocation();
  const lastHash = useRef('');

  const [filter, setFilter] = useState(dataPorts);
  const menuFilter = [...new Set(dataPorts.map(port => port))];

  const filterPort = category => {
    const newPort = dataPorts.filter(port => {
      return port.category === category;
    });

    setFilter(newPort);
  };

  useEffect(() => {
    document.title = 'Clean Sea - Locations';

    if (location.hash === lastHash.current) {
      return;
    }

    lastHash.current = location.hash;
    const element = document.getElementById(
      location.hash.slice(1),
    );

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

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
  }, [location]);

  return (
    <>
      <Headers />
      <Menu />
      <main className="main" id="top">
        {/* <Preloader /> */}
        <section className="bg-200" id="portsbr">
          <div className="text-center mb-6">
            <h3 className="fs-2 fs-md-3">All Ports Assisted</h3>
            <hr
              className="short"
              data-zanim-xs='{"from":{"opacity":0,"width":0},"to":{"opacity":1,"width":"4.20873rem"},"duration":0.8}'
              data-zanim-trigger="scroll"
            />
          </div>
          <section id="portfolio" className="section-bg">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <Buttons
                    setFilter={setFilter}
                    filterPort={filterPort}
                    menuFilter={menuFilter}
                  />
                </div>
              </div>
              <Ports filter={filter} />
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Locations;
