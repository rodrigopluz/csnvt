/* eslint-disable react/prop-types */
import React from 'react';
import BigPicture from 'bigpicture';
import { IPortProps } from '@csnvt/types';

const Ports: React.FC<IPortProps> = ({ filter }) => {
  const openVideo = (event: any, video: any) => {
    BigPicture({
      el: event.target,
      ytSrc: video,
      dimensions: [1280, 720],
    });
  };

  return (
    <div className="row portfolio-container" id="gallery">
      {filter.map(port => {
        return (
          <div
            key={port.id}
            className={`col-lg-12 col-md-6 portfolio-item ${port.category} align-items-center`}
          >
            <div className="portfolio-wrap">
              <figure>
                <img src={port.image} className="" alt="" />
                <a
                  href={`${port.image}`}
                  className="link-preview"
                  title="Preview"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="ion ion-eye"></i>
                </a>
              </figure>
              <div
                className="portfolio-info"
                style={{
                  gap: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <h4>
                  <a href="#">{port.name}</a>
                </h4>
                <a
                  className="btn-primary btn"
                  href={`${port.link}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Port Authority Website
                </a>
                <button
                  className="btn btn-primary"
                  onClick={event => {
                    event.preventDefault();
                    openVideo(event, port.video);
                  }}
                >
                  Video Information
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Ports;
