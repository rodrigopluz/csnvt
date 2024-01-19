import React from 'react';

const Welcome: React.FC = () => {
  return (
    <section className="bg-100 text-center">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-10 col-md-6">
            <h3 className="fs-2 fs-lg-3">
              Welcome to Clean Sea
            </h3>
            <p>
              <b>We match your needs</b>
            </p>
            <hr
              className="short"
              data-zanim-xs='{"from":{"opacity":0,"width":0},"to":{"opacity":1,"width":"4.20873rem"},"duration":0.8}'
              data-zanim-trigger="scroll"
            />
            <p className="px-lg-3 mt-3">
              Our company was created to
              <b>improve recycling</b> management and bring
              <b>smart solutions</b> for Ship owners to achive
              <b>better results</b> in a safe and easy way,
              <b>minimizing Costs</b> and risks of pollution,
              working with <b>expertise and efficiency</b> in
              every operation.
            </p>
          </div>

          <div className="row mt-4 mt-md-5">
            <div
              className="col-sm-6 col-lg-3 mt-4"
              data-zanim-timeline="{}"
              data-zanim-trigger="scroll"
            >
              <div
                className="ring-icon mx-auto"
                data-zanim-xs='{"delay":0}'
              >
                <span className="fas fa-recycle"></span>
              </div>
              <h5 className="mt-4" data-zanim-xs='{"delay":0.1}'>
                Residues Collection
              </h5>
              <p
                className="mb-0 mt-3 px-3"
                data-zanim-xs='{"delay":0.2}'
              >
                Solution for every necessity related problems,
                readily <br />
                and skillfully.
              </p>
            </div>
            <div
              className="col-sm-6 col-lg-3 mt-4"
              data-zanim-timeline="{}"
              data-zanim-trigger="scroll"
            >
              <div
                className="ring-icon mx-auto"
                data-zanim-xs='{"delay":0}'
              >
                <span className="far fa-bell"></span>
              </div>
              <h5 className="mt-4" data-zanim-xs='{"delay":0.1}'>
                Risk Management
              </h5>
              <p
                className="mb-0 mt-3 px-3"
                data-zanim-xs='{"delay":0.2}'
              >
                Calculate every possible risk in each operation,
                take <br />
                control over them.
              </p>
            </div>
            <div
              className="col-sm-6 col-lg-3 mt-4"
              data-zanim-timeline="{}"
              data-zanim-trigger="scroll"
            >
              <div
                className="ring-icon mx-auto"
                data-zanim-xs='{"delay":0}'
              >
                <span className="far fa-lightbulb"></span>
              </div>
              <h5 className="mt-4" data-zanim-xs='{"delay":0.1}'>
                Logistics Solutions
              </h5>
              <p
                className="mb-0 mt-3 px-3"
                data-zanim-xs='{"delay":0.2}'
              >
                Get the shortest way to
                <br />
                reach destination, reduce costs and risks for
                you.
              </p>
            </div>
            <div
              className="col-sm-6 col-lg-3 mt-4"
              data-zanim-timeline="{}"
              data-zanim-trigger="scroll"
            >
              <div
                className="ring-icon mx-auto"
                data-zanim-xs='{"delay":0}'
              >
                <span className="fas fa-headset"></span>
              </div>
              <h5 className="mt-4" data-zanim-xs='{"delay":0.1}'>
                Recycling Consulting
              </h5>
              <p
                className="mb-0 mt-3 px-3"
                data-zanim-xs='{"delay":0.2}'
              >
                Being prepred for any situation, always safely
                and timely.
              </p>
            </div>
          </div>
          <div className="row mt-4 mt-md-5"></div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
