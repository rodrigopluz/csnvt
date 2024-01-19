import React from 'react';

const Banner: React.FC = () => {
  return (
    <section
      className="text-white py-0"
      data-zanim-timeline="{}"
      data-zanim-trigger="scroll"
    >
      <div
        className="bg-holder"
        style={{
          backgroundImage: 'url(./assets/img/video-1.jpg)',
        }}
      >
        <video
          loop={true}
          muted={true}
          autoPlay={true}
          playsInline={true}
          className="bg-video"
        >
          <source
            src="./assets/videos/morning-routine/videocss.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="container">
        <div
          className="row min-vh-100 py-8 align-items-center"
          data-inertia='{"weight":1.5}'
        >
          <div className="col-sm-9 col-lg-8">
            <div className="overflow-hidden">
              <h1
                className="text-white fs-4 fs-md-5"
                data-zanim-xs='{"delay":0.5}'
              >
                Environment Solutions
              </h1>
            </div>
            <div className="overflow-hidden">
              <p
                className="text-primary text-white mt-4 mb-5 fs-1 fs-md-2 lh-xs"
                data-zanim-xs='{"delay":0.6}'
              >
                Focused on maritime residues recycling, helping
                clients finding solutions in port services.
              </p>
            </div>
            <div className="overflow-hidden">
              <div data-zanim-xs='{"delay":0.7}'>
                <a
                  className="btn btn-primary me-3 mt-3"
                  href="#services"
                >
                  Services
                  <span className="fas fa-chevron-right ms-2"></span>
                </a>
                <a
                  className="btn btn-secondary mt-3"
                  href="#ports"
                >
                  Ports
                  <span className="fas fa-chevron-right ms-2"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
