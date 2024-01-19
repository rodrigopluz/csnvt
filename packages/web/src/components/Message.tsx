import React from 'react';
import { IMessageProps } from '@csnvt/types';

const Message: React.FC<IMessageProps> = ({
  message,
  submessage,
}) => {
  return (
    <section className="bg-primary py-6 text-center text-md-start">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md">
            <h4 className="text-white mb-0">
              {message}
              <br className="d-md-none" />
              &nbsp;
              {submessage}
            </h4>
          </div>
          <div className="col-md-auto mt-md-0 mt-4">
            <a
              className="btn btn-light rounded-pill"
              href="contact.html"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Message;
