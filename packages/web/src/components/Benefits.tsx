import React from 'react';

const Benefits: React.FC = () => {
  return (
    <section>
      <div className="container">
        <div className="text-center">
          <h3 className="fs-2 fs-md-3">Our Benefits</h3>
          <hr
            className="short"
            data-zanim-xs='{"from":{"opacity":0,"width":0},"to":{"opacity":1,"width":"4.20873rem"},"duration":0.8}'
            data-zanim-trigger="scroll"
          />
        </div>
        <div className="row">
          <div
            className="col-md-6 col-lg-4 mt-4"
            data-zanim-timeline="{}"
            data-zanim-trigger="scroll"
            id="benefits"
          >
            <div className="px-3 py-4 px-lg-4">
              <div className="overflow-hidden">
                <span
                  className="text-primary me-3 far fa-newspaper fa-3x"
                  data-zanim-xs='{"delay":0}'
                />
              </div>
              <div className="overflow-hidden">
                <h5
                  className="mt-3"
                  data-zanim-xs='{"delay":0.1}'
                >
                  Marpol Certificate
                </h5>
              </div>
              <div className="overflow-hidden">
                <p
                  className="mb-0"
                  data-zanim-xs='{"delay":0.2}'
                >
                  We issue collection certificates in accordance
                  with MARPOL regulations and standards
                  recognised worldwide.
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-md-6 col-lg-4 mt-4"
            data-zanim-timeline="{}"
            data-zanim-trigger="scroll"
          >
            <div className="px-3 py-4 px-lg-4">
              <div className="overflow-hidden">
                <span
                  className="text-primary me-3 far fa-share-square fa-3x"
                  data-zanim-xs='{"delay":0}'
                />
              </div>
              <div className="overflow-hidden">
                <h5
                  className="mt-3"
                  data-zanim-xs='{"delay":0.1}'
                >
                  Transfer Pumps
                </h5>
              </div>
              <div className="overflow-hidden">
                <p
                  className="mb-0"
                  data-zanim-xs='{"delay":0.2}'
                >
                  We offer the facility of pneumatic pumps to
                  speed up operations and minimizing spills
                  risks.
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-md-6 col-lg-4 mt-4"
            data-zanim-timeline="{}"
            data-zanim-trigger="scroll"
          >
            <div className="px-3 py-4 px-lg-4">
              <div className="overflow-hidden">
                <span
                  className="text-primary me-3 fas fa-handshake fa-3x"
                  data-zanim-xs='{"delay":0}'
                />
              </div>
              <div className="overflow-hidden">
                <h5
                  className="mt-3"
                  data-zanim-xs='{"delay":0.1}'
                >
                  Insurance Provided
                </h5>
              </div>
              <div className="overflow-hidden">
                <p
                  className="mb-0"
                  data-zanim-xs='{"delay":0.2}'
                >
                  All our operations are covered by ensurance,
                  promoting reliability and protecting from any
                  claims .
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-md-6 col-lg-4 mt-4"
            data-zanim-timeline="{}"
            data-zanim-trigger="scroll"
          >
            <div className="px-3 py-4 px-lg-4">
              <div className="overflow-hidden">
                <span
                  className="text-primary me-3 fas fa-award fa-3x"
                  data-zanim-xs='{"delay":0}'
                />
              </div>
              <div className="overflow-hidden">
                <h5
                  className="mt-3"
                  data-zanim-xs='{"delay":0.1}'
                >
                  Certified Hoses
                </h5>
              </div>
              <div className="overflow-hidden">
                <p
                  className="mb-0"
                  data-zanim-xs='{"delay":0.2}'
                >
                  Our hoses, flanges and connections are
                  frequently subjected to hydrostatic tests and
                  duly certificated .
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-md-6 col-lg-4 mt-4"
            data-zanim-timeline="{}"
            data-zanim-trigger="scroll"
          >
            <div className="px-3 py-4 px-lg-4">
              <div className="overflow-hidden">
                <span
                  className="text-primary me-3 fas fa-project-diagram fa-3x"
                  data-zanim-xs='{"delay":0}'
                />
              </div>
              <div className="overflow-hidden">
                <h5
                  className="mt-3"
                  data-zanim-xs='{"delay":0.1}'
                >
                  Contention Barrier
                </h5>
              </div>
              <div className="overflow-hidden">
                <p
                  className="mb-0"
                  data-zanim-xs='{"delay":0.2}'
                >
                  We offer contention barrier in accordance to
                  the local regulations applied for services
                  performed.
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-md-6 col-lg-4 mt-4"
            data-zanim-timeline="{}"
            data-zanim-trigger="scroll"
          >
            <div className="px-3 py-4 px-lg-4">
              <div className="overflow-hidden">
                <span
                  className="text-primary me-3 fas fa-truck-moving fa-3x"
                  data-zanim-xs='{"delay":0}'
                />
              </div>
              <div className="overflow-hidden">
                <h5
                  className="mt-3"
                  data-zanim-xs='{"delay":0.1}'
                >
                  Inspected Trucks
                </h5>
              </div>
              <div className="overflow-hidden">
                <p
                  className="mb-0"
                  data-zanim-xs='{"delay":0.2}'
                >
                  Trucks and barges are constantly monitored and
                  inspected under the strictest safety criteria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
