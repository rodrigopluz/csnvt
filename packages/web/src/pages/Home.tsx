import React, { useEffect, useState } from 'react';
import { Environment } from '@csnvt/environment';

import '../assets/css/user.css';
import '../assets/css/theme.css';
import '../vendors/loaders.css/loaders.min.css';
import '../vendors/swiper/swiper-bundle.min.css';
import '../vendors/hamburgers/hamburgers.min.css';

import Menu from '../components/Menu';
import Banner from '../components/Banner';
import Headers from '../components/Headers';
import Preloader from '../components/Preloader';
import Footer from '../components/Footer';
import Welcome from '../components/Welcome';
import Services from '../components/Services';
import Message from '../components/Message';
import Locations from '../components/Locations';
import CheckNumbers from '../components/CheckNumbers';
import AboutUs from '../components/AboutUs';
import Certifications from '../components/Certifications';
import Benefits from '../components/Benefits';
import Articles from '../components/Articles';

const Home: React.FC = () => {
  const [messageOne, setMessageOne] = useState({
    one: '',
    two: '',
  });

  const [messageTwo, setMessageTwo] = useState({
    one: '',
    two: '',
  });

  useEffect(() => {
    setMessageOne({
      one: 'If you have any query related to services...',
      two: 'we are available 24/7',
    });

    setMessageTwo({
      one: 'Do you still need more information about?',
      two: 'Contact us anytime.',
    });

    // const BigPicture = document.createElement('script');
    // BigPicture.src = 'src/vendors/bigpicture/BigPicture.js';
    // document.body.appendChild(BigPicture);

    // const Swiper = document.createElement('script');
    // Swiper.src = 'src/vendors/swiper/swiper-bundle.min.js';
    // document.body.appendChild(Swiper);

    // const Is = document.createElement('script');
    // Is.src = 'src/vendors/is/is.min.js';
    // document.body.appendChild(Is);

    // const Popper = document.createElement('script');
    // Popper.src = 'src/vendors/popper/popper.min.js';
    // document.body.appendChild(Popper);

    // const CountUp = document.createElement('script');
    // CountUp.src = 'src/vendors/countup/countUp.umd.js';
    // document.body.appendChild(CountUp);

    // const Gsap = document.createElement('script');
    // Gsap.src = 'src/vendors/gsap/gsap.js';
    // document.body.appendChild(Gsap);

    // const CustomEase = document.createElement('script');
    // CustomEase.src = 'src/vendors/gsap/customEase.js';
    // document.body.appendChild(CustomEase);

    // const ImagesLoaded = document.createElement('script');
    // ImagesLoaded.src =
    //   'src/vendors/imagesloaded/imagesloaded.pkgd.min.js';
    // document.body.appendChild(ImagesLoaded);

    // const Lodash = document.createElement('script');
    // Lodash.src = 'src/vendors/lodash/lodash.min.js';
    // document.body.appendChild(Lodash);

    // const Theme = document.createElement('script');
    // Theme.src = 'src/assets/js/theme.js';
    // document.body.appendChild(Theme);

    localStorage.removeItem(Environment.LOCAL_STORAGE_USER);
    localStorage.removeItem(
      Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN,
    );

    return () => {
      // document.body.removeChild(BigPicture);
      // document.body.removeChild(Swiper);
      // document.body.removeChild(Is);
      // document.body.removeChild(Popper);
      // document.body.removeChild(CountUp);
      // document.body.removeChild(Gsap);
      // document.body.removeChild(CustomEase);
      // document.body.removeChild(ImagesLoaded);
      // document.body.removeChild(Lodash);
      // document.body.removeChild(Theme);
    };
  }, []);

  return (
    <>
      <Headers />
      <Menu />
      <main className="main" id="top">
        {/* <Preloader /> */}
        <Banner />
        <Welcome />
        <Services />
        <Message
          message={messageOne.one}
          submessage={messageOne.two}
        />
        <Locations />
        <CheckNumbers />
        <AboutUs />
        <Certifications />
        <Benefits />
        <Message
          message={messageTwo.one}
          submessage={messageTwo.two}
        />
        <Articles />
      </main>
      <Footer />
    </>
  );
};

export default Home;
