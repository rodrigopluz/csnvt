import React from 'react';

const Articles: React.FC = () => {
  return (
    <section className="bg-100">
      <div className="container">
        <div className="text-center mb-6">
          <h3 className="fs-2 fs-md-3">Articles</h3>
          <hr
            className="short"
            data-zanim-xs='{"from":{"opacity":0,"width":0},"to":{"opacity":1,"width":"4.20873rem"},"duration":0.8}'
            data-zanim-trigger="scroll"
          />
        </div>
        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="card">
              <a href="news/news-sludgecollection.html">
                <img
                  className="card-img-top"
                  src="./assets/newsphoto/sludgeremoval.jpeg"
                  alt="Featured Image"
                />
              </a>
              <div
                className="card-body"
                data-zanim-timeline="{}"
                data-zanim-trigger="scroll"
              >
                <div className="overflow-hidden">
                  <a href="news/news-sludgecollection.html">
                    <h5 data-zanim-xs='{"delay":0}'>
                      Importance of Sludge Collection and Good
                      Pratices
                    </h5>
                  </a>
                </div>
                <div className="overflow-hidden">
                  <p
                    className="text-500"
                    data-zanim-xs='{"delay":0.1}'
                  >
                    By Clean sea Team
                  </p>
                </div>
                <div className="overflow-hidden">
                  <p
                    className="mt-3"
                    data-zanim-xs='{"delay":0.2}'
                  >
                    Sludge is a byproduct of ships` engine and
                    fuel systems, and it needs to be properly
                    collected and disposed of to prevent
                    environmental pollution...
                  </p>
                </div>
                <div className="overflow-hidden">
                  <div
                    className="d-inline-block"
                    data-zanim-xs='{"delay":0.3}'
                  >
                    <a
                      className="d-flex align-items-center"
                      href="news/news-sludgecollection.html"
                    >
                      Learn More
                      <div
                        className="overflow-hidden ms-2"
                        data-zanim-xs='{"from":{"opacity":0,"x":-30},"to":{"opacity":1,"x":0},"delay":0.8}'
                      >
                        <span
                          className="d-inline-block fw-medium"
                          style={{ fontSize: 'xx-large' }}
                        >
                          &rarr;
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card">
              <a href="news/news-garbagesegregation.html">
                <img
                  className="card-img-top"
                  src="./assets/newsphoto/garbagesegregation2.jpg"
                  alt="Featured Image"
                />
              </a>
              <div
                className="card-body"
                data-zanim-timeline="{}"
                data-zanim-trigger="scroll"
              >
                <div className="overflow-hidden">
                  <a href="news/news-garbagesegregation.html">
                    <h5 data-zanim-xs='{"delay":0}'>
                      Necessity for Segregation of Solid Wastes
                    </h5>
                  </a>
                </div>
                <div className="overflow-hidden">
                  <p
                    className="text-500"
                    data-zanim-xs='{"delay":0.1}'
                  >
                    By Clean Sea Team
                  </p>
                </div>
                <div className="overflow-hidden">
                  <p
                    className="mt-3"
                    data-zanim-xs='{"delay":0.2}'
                  >
                    Garbage removal is an essential aspect of
                    ensuring that our oceans and waterways are
                    clean and free from pollution its
                    segregation...
                  </p>
                </div>
                <div className="overflow-hidden">
                  <div
                    className="d-inline-block"
                    data-zanim-xs='{"delay":0.3}'
                  >
                    <a
                      className="d-flex align-items-center"
                      href="news/news-garbagesegregation.html"
                    >
                      Learn More
                      <div
                        className="overflow-hidden ms-2"
                        data-zanim-xs='{"from":{"opacity":0,"x":-30},"to":{"opacity":1,"x":0},"delay":0.8}'
                      >
                        <span
                          className="d-inline-block fw-medium"
                          style={{ fontSize: 'xx-large' }}
                        >
                          &rarr;
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card">
              <a href="news/news-sloptreatment.html">
                <img
                  className="card-img-top"
                  src="./assets/newsphoto/sloptreatment2.JPG"
                  alt="Featured Image"
                />
              </a>
              <div
                className="card-body"
                data-zanim-timeline="{}"
                data-zanim-trigger="scroll"
              >
                <div className="overflow-hidden">
                  <a href="news/news-sloptreatment.html">
                    <h5 data-zanim-xs='{"delay":0}'>
                      Cargo Residuals Slops Handling and
                      Treatment
                    </h5>
                  </a>
                </div>
                <div className="overflow-hidden">
                  <p
                    className="text-500"
                    data-zanim-xs='{"delay":0.1}'
                  >
                    By Clean Sea Team
                  </p>
                </div>
                <div className="overflow-hidden">
                  <p
                    className="mt-3"
                    data-zanim-xs='{"delay":0.2}'
                  >
                    Slops are residual liquids that are left in
                    tanks after they have been cleaned. These
                    slops can contain large a variety of
                    substances...
                  </p>
                </div>
                <div className="overflow-hidden">
                  <div
                    className="d-inline-block"
                    data-zanim-xs='{"delay":0.3}'
                  >
                    <a
                      className="d-flex align-items-center"
                      href="news/news-sloptreatment.html"
                    >
                      Learn More
                      <div
                        className="overflow-hidden ms-2"
                        data-zanim-xs='{"from":{"opacity":0,"x":-30},"to":{"opacity":1,"x":0},"delay":0.8}'
                      >
                        <span
                          className="d-inline-block fw-medium"
                          style={{ fontSize: 'xx-large' }}
                        >
                          &rarr;
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;
