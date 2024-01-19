import React from 'react';

const Services: React.FC = () => {
  return (
    <section>
      <div className="container-xxl service py-2" id="services">
        <div className="container">
          <div className="text-center mb-7" id="">
            <h3 className="fs-2 fs-md-3">Our Services</h3>
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
            <div className="col-lg-4">
              <div className="nav nav-pills d-flex justify-content-between w-100 h-100 me-4">
                <button
                  className="nav-link w-100 d-flex align-items-center text-start border p-4 mb-4 active"
                  data-bs-toggle="pill"
                  data-bs-target="#tab-pane-1"
                  type="button"
                >
                  <h5 className="m-0">
                    <i className="fa fa-bars text-primary me-3"></i>
                    Sludge Collection
                  </h5>
                </button>
                <button
                  className="nav-link w-100 d-flex align-items-center text-start border p-4 mb-4"
                  data-bs-toggle="pill"
                  data-bs-target="#tab-pane-2"
                  type="button"
                >
                  <h5 className="m-0">
                    <i className="fa fa-bars text-primary me-3"></i>
                    Garbage Removal
                  </h5>
                </button>
                <button
                  className="nav-link w-100 d-flex align-items-center text-start border p-4 mb-4"
                  data-bs-toggle="pill"
                  data-bs-target="#tab-pane-3"
                  type="button"
                >
                  <h5 className="m-0">
                    <i className="fa fa-bars text-primary me-3"></i>
                    Slop Wash Removal
                  </h5>
                </button>
                <button
                  className="nav-link w-100 d-flex align-items-center text-start border p-4 mb-4"
                  data-bs-toggle="pill"
                  data-bs-target="#tab-pane-4"
                  type="button"
                >
                  <h5 className="m-0">
                    <i className="fa fa-bars text-primary me-3"></i>
                    Off Spec Oil Removal
                  </h5>
                </button>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="tab-content w-100">
                <div
                  className="tab-pane fade show active"
                  id="tab-pane-1"
                >
                  <div className="row g-4">
                    <div
                      className="col-md-6"
                      style={{ minHeight: '350px' }}
                    >
                      <div className="position-relative h-100">
                        <img
                          className="position rounded w-100 h-100"
                          src="./assets/img/sludgetruck.png"
                          style={{ objectFit: 'cover' }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-4">Sludge Collection</h3>
                      <p className="mb-4">
                        We offer a safe and fast removal of oily
                        residues, following environmental rules
                        and good pratice standards accordind to
                        IMO regulation, including the issuance of
                        relevant MARPOL Removal Certificates.
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Certified Hoses
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Experienced Team
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        24/7 Assistance
                      </p>
                      <a
                        href="#"
                        className="btn btn-primary py-3 px-5 mt-3"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-pane-2">
                  <div className="row g-4">
                    <div
                      className="col-md-6"
                      style={{ minHeight: '350px' }}
                    >
                      <div className="position-relative h-100">
                        <img
                          className="position rounded w-100 h-100"
                          src="./assets/img/garbagetruck.png"
                          style={{ objectFit: 'cover' }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-4">Garbage Removal</h3>
                      <p className="mb-4">
                        We collect all types of garbage from
                        vessels, once legal regulation may difer
                        according to each port destination,
                        service restrictions may apply, we are
                        ready to guide you accordingly.
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Segregation
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Recycling
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Final Destination
                      </p>
                      <a
                        href="#"
                        className="btn btn-primary py-3 px-5 mt-3"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-pane-3">
                  <div className="row g-4">
                    <div
                      className="col-md-6"
                      style={{ minHeight: '350px' }}
                    >
                      <div className="position-relative h-100">
                        <img
                          className="position rounded w-100 h-100"
                          src="./assets/img/slop.png"
                          style={{ objectFit: 'cover' }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-4">Slop Wash Removal</h3>
                      <p className="mb-4">
                        Between cargos may be necessary to wash
                        up tanks to ensure will have no
                        contamination of products. We collect and
                        proceed with full necessary treatment in
                        final destination unity.
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Safe Service
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Competitive Price
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        MARPOL Certification
                      </p>
                      <a
                        href="#"
                        className="btn btn-primary py-3 px-5 mt-3"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-pane-4">
                  <div className="row g-4">
                    <div
                      className="col-md-6"
                      style={{ minHeight: '350px' }}
                    >
                      <div className="position-relative h-100">
                        <img
                          className="position rounded w-100 h-100"
                          src="./assets/img/barge.png"
                          style={{ objectFit: 'cover' }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-4">
                        Off-Spec Oil Removal
                      </h3>
                      <p className="mb-4">
                        In many cases vessel receive bunkering
                        with product that was not on
                        especification to be used in your vessel,
                        we procced with the collection and
                        recycling of this product protecting the
                        environment.
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Certified Hoses
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        MARPOL Accordance
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>
                        Best Rate Guaranteed
                      </p>
                      <a
                        href="#"
                        className="btn btn-primary py-3 px-5 mt-3"
                      >
                        Read More
                      </a>
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

export default Services;
