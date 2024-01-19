import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section>
      <div className="container">
        <div className="text-center mb-7" id="about">
          <h3 className="fs-2 fs-md-3">About Us</h3>
          <hr
            className="short"
            data-zanim-xs='{"from":{"opacity":0,"width":0},"to":{"opacity":1,"width":"4.20873rem"},"duration":0.8}'
            data-zanim-trigger="scroll"
          />
        </div>
        <div className="row">
          <div className="col-lg-6 pe-lg-3">
            <img
              className="rounded-3 img-fluid"
              src="assets/img/about.svg"
              alt="about"
            />
          </div>
          <div
            className="col-lg-6 px-lg-5 mt-6 mt-lg-0"
            data-zanim-timeline="{}"
            data-zanim-trigger="scroll"
          >
            <div className="overflow-hidden">
              <div
                className="px-4 px-sm-0"
                data-zanim-xs='{"delay":0}'
              >
                <h5 className="fs-0 fs-lg-1">
                  <span
                    className="fas fa-comment-dots fs-1 me-2"
                    data-fa-transform="flip-h"
                  ></span>
                  Why Choose Clean Sea
                </h5>
                <p className="mt-3">
                  Clean Sea Company is a marine environmental
                  organization that specializes in the collection
                  of oily waste from vessels. Our mission is to
                  reduce the negative impact of human activities
                  on the oceans and coastal areas and to protect
                  the marine environment from the harmful effects
                  of oil pollution.
                </p>
                <p>
                  We are committed to working with ship owners,
                  operators, and governments to promote the
                  responsible use of our oceans and to reduce the
                  risk of oil pollution. We also collaborate with
                  universities, research institutions, and other
                  organizations to find new and innovative
                  solutions to tackle the issue of marine oil
                  pollution.
                </p>
                <p>
                  Our services are available 24/7 and we are
                  equipped to handle emergency spill response in
                  case of an oil spill. Our goal is to minimize
                  the damage caused by oil pollution and to
                  prevent it from spreading to other areas. We
                  have a team of highly trained professionals who
                  are dedicated to collecting oily waste from
                  ships and other vessels in a safe, efficient,
                  and environmentally responsible manner.
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div
            className="col-sm-6 col-lg-4 mt-3 mt-lg-0 px-4 px-sm-3"
            data-zanim-timeline="{}"
            data-zanim-trigger="scroll"
          >
            <h5 data-zanim-xs='{"delay":0}'>
              <span className="text-primary me-3 fas fa-users"></span>
              Awesome Team
            </h5>
            <p
              className="mt-3 pe-3 pe-lg-5"
              data-zanim-xs='{"delay":0.1}'
            >
              We are able to hear about your needs, looking
              forward to find the best solution for your
              requirements.
            </p>
          </div>
          <div
            className="col-sm-6 col-lg-4 mt-3 mt-lg-0 px-4 px-sm-3"
            data-zanim-timeline="{}"
            data-zanim-trigger="scroll"
          >
            <h5 data-zanim-xs='{"delay":0}'>
              <span className="text-primary me-3 fas fa-comments"></span>
              Excellent Support
            </h5>
            <p
              className="mt-3 pe-3 pe-lg-5"
              data-zanim-xs='{"delay":0.1}'
            >
              We are ready to support you 24/7 and offer a quick
              response for any situation or emergency.
            </p>
          </div>
          <div
            className="col-sm-6 col-lg-4 mt-3 mt-lg-0 px-4 px-sm-3"
            data-zanim-timeline="{}"
            data-zanim-trigger="scroll"
          >
            <h5 data-zanim-xs='{"delay":0}'>
              <span className="text-primary me-3 fas fa-bolt"></span>
              Faster Performance
            </h5>
            <p
              className="mt-3 pe-3 pe-lg-5"
              data-zanim-xs='{"delay":0.1}'
            >
              We develop a systematic well-ordered collection
              process, from service order through removal
              operation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
