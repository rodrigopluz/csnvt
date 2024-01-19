import React from 'react';

const CheckNumbers: React.FC = () => {
  return (
    <section>
      <div
        className="bg-holder overlay overlay-elixir"
        style={{
          backgroundImage: 'url(assets/img/numbers.jpg)',
        }}
      />
      <div className="container">
        <div className="d-flex">
          <span className="me-3">
            <img
              alt="checkmark"
              src="./assets/img/check.svg"
              style={{ width: '55px' }}
            />
          </span>
          <div className="flex-1">
            <h2 className="text-secondary fs-3 fs-lg-4">
              Check our numbers,
              <br />
              <span className="text-white">
                many services, none incidents.
              </span>
            </h2>
            <div className="row mt-4 pe-lg-10">
              <div
                className="overflow-hidden col-md-3"
                data-zanim-timeline="{}"
                data-zanim-trigger="scroll"
              >
                <div
                  className="fs-3 fs-lg-4 mb-0 fw-bold text-white mt-lg-5 mt-3 lh-xs"
                  data-zanim-xs='{"delay":0.1}'
                  data-countup='{"endValue":8127}'
                >
                  8127
                </div>
                <h6
                  className="fs-0 text-white"
                  data-zanim-xs='{"delay":0.2}'
                >
                  Tons of Oily Residues
                </h6>
              </div>
              <div
                className="overflow-hidden col col-lg-3"
                data-zanim-timeline="{}"
                data-zanim-trigger="scroll"
              >
                <div
                  className="fs-3 fs-lg-4 mb-0 fw-bold text-white mt-lg-5 mt-3 lh-xs"
                  data-zanim-xs='{"delay":0.1}'
                  data-countup='{"endValue":1234}'
                >
                  234
                </div>
                <h6
                  className="fs-0 text-white"
                  data-zanim-xs='{"delay":0.2}'
                >
                  Tons of Garbage
                </h6>
              </div>
              <div className="w-100 d-flex d-lg-none" />
              <div
                className="overflow-hidden col-md-3"
                data-zanim-timeline="{}"
                data-zanim-trigger="scroll"
              >
                <div
                  className="fs-3 fs-lg-4 mb-0 fw-bold text-white mt-lg-5 mt-3 lh-xs"
                  data-zanim-xs='{"delay":0.1}'
                  data-countup='{"endValue":28}'
                >
                  28
                </div>
                <h6
                  className="fs-0 text-white"
                  data-zanim-xs='{"delay":0.2}'
                >
                  Ports in Brazil
                </h6>
              </div>
              <div
                className="overflow-hidden col col-lg-3"
                data-zanim-timeline="{}"
                data-zanim-trigger="scroll"
              >
                <div
                  className="fs-3 fs-lg-4 mb-0 fw-bold text-white mt-lg-5 mt-3 lh-xs"
                  data-zanim-xs='{"delay":0.1}'
                  data-countup='{"endValue":647}'
                >
                  647
                </div>
                <h6
                  className="fs-0 text-white"
                  data-zanim-xs='{"delay":0.2}'
                >
                  Satisfied Clients
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckNumbers;
