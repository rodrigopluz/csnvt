import React from 'react';
import { Link } from 'react-router-dom';

const Locations: React.FC = () => {
  return (
    <section>
      <div className="container-xxl service py-5" id="">
        <div className="container">
          <div className="text-center mb-7" id="">
            <h3 className="fs-2 fs-md-3">Our Locations</h3>
            <hr
              className="short"
              data-zanim-xs='{"from":{"opacity":0,"width":0},"to":{"opacity":1,"width":"4.20873rem"},"duration":0.8}'
              data-zanim-trigger="scroll"
            />
          </div>
          <div
            className="row g-3 wow fadeInUp"
            data-wow-delay="0.3s"
          >
            <div className="col-lg-18">
              <div className="tab-content w-150">
                <div
                  className="tab-pane fade show active"
                  id="tab-pane-1"
                >
                  <div className="row g-4">
                    <div className="col-md-4">
                      <h3 className="mb-4" id="ports">
                        Main Ports Assisted
                      </h3>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Santos
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Rio Grande
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Paranagua
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Sao Francisco
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Vitoria
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Itaqui
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Rio de Janeiro
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Imbituba
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Salvador
                      </p>
                      <Link
                        className="btn btn-primary py-3 px-5 mt-3"
                        to="/locations#portsbr"
                      >
                        Check All Ports
                      </Link>
                    </div>
                    <div className="col-md-8">
                      <div className="col-10">
                        <div className="side-bar-map">
                          <div className="row">
                            <div className="col-lg-18">
                              <div id="map">
                                <iframe
                                  src="https://www.google.com/maps/d/u/0/embed?mid=1MsGKCRrfrBTdW11Pm1HNBDSyCIDb5bs&ehbc=2E312F"
                                  width="100%"
                                  height="550px"
                                  style={{
                                    border: 0,
                                    borderRadius: '23px',
                                  }}
                                  allowFullScreen={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Locations;
