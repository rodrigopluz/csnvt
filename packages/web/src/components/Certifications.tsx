import React from 'react';

const Certifications: React.FC = () => {
  return (
    <div className="bg-200 py-6" id="certifications">
      <div className="container">
        <div className="text-center" id="benefits">
          <h3 className="fs-2 fs-md-3">Certifications</h3>
          <hr
            className="short"
            data-zanim-xs='{"from":{"opacity":0,"width":0},"to":{"opacity":1,"width":"4.20873rem"},"duration":0.8}'
            data-zanim-trigger="scroll"
          />
        </div>
        <div
          className="row align-items-center"
          data-zanim-timeline="{}"
          data-zanim-trigger="scroll"
        >
          <div className="col-4 col-md-2 my-3 overflow-hidden">
            <img
              className="img-fluid"
              src="./assets/img/partner/imo.svg"
              alt="partnerco"
              data-zanim-xs="{}"
            />
          </div>
          <div className="col-4 col-md-2 my-3 overflow-hidden">
            <img
              className="img-fluid"
              src="./assets/img/partner/anvisa.svg"
              alt="tvc"
              data-zanim-xs="{}"
            />
          </div>
          <div className="col-4 col-md-2 my-3 overflow-hidden">
            <img
              className="img-fluid"
              src="./assets/img/partner/srf.svg"
              alt="arcade"
              data-zanim-xs="{}"
            />
          </div>
          <div className="col-4 col-md-2 my-3 overflow-hidden">
            <img
              className="img-fluid"
              src="./assets/img/partner/ibama.svg"
              alt="bearbrand"
              data-zanim-xs="{}"
            />
          </div>
          <div className="col-4 col-md-2 my-3 overflow-hidden">
            <img
              className="img-fluid"
              src="./assets/img/partner/anp.svg"
              alt="fast brothers"
              data-zanim-xs="{}"
            />
          </div>
          <div className="col-4 col-md-2 my-3 overflow-hidden">
            <img
              className="img-fluid"
              src="./assets/img/partner/antt.svg"
              alt="harculis beards"
              data-zanim-xs="{}"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
