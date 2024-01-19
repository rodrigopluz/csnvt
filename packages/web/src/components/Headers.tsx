import React from 'react';
import { Link } from 'react-router-dom';

import { IHeadersProps } from '@csnvt/types';
import { Environment } from '@csnvt/environment';

const Headers: React.FC<IHeadersProps> = ({
  token,
  user,
  setUser,
}) => {
  const logout = () => {
    localStorage.removeItem(Environment.LOCAL_STORAGE_USER);
    localStorage.removeItem(
      Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN,
    );

    setUser(undefined);

    return (window.location.href = '/');
  };

  return (
    <div
      className="bg-primary py-3 d-none d-sm-block text-white fw-bold"
      id="start"
    >
      <div className="container">
        {token ? (
          <div
            className="row d-sm-flex align-items-center gx-4"
            style={{ flexWrap: 'nowrap' }}
          >
            <div className="col-auto d-none d-lg-block fs--1">
              <i className="fas fa-map-marker-alt text-secondary me-2" />
              <a>Nationwide Assistence.</a>
            </div>
            <div className="d-sm-flex" style={{ gap: 25 }}>
              <div className="col-auto fs--1">
                <Link
                  className="ms-2 fs--1 d-inline text-white fw-bold"
                  to="tel:2123865575"
                >
                  <i className="fas fa-phone-alt text-secondary" />
                  &nbsp; Head Office: +55 4720335009
                </Link>
              </div>
              <div className="col-auto fs--1">
                <Link
                  className="ms-2 fs--1 d-inline text-white fw-bold"
                  to="tel:2123865575"
                >
                  <i className="fas fa-phone-alt text-secondary" />
                  &nbsp; Commercial Dept: +55 47992149466
                </Link>
              </div>
              <div className="col-auto fs--1">
                <Link
                  className="ms-2 fs--1 d-inline text-white fw-bold"
                  to="tel:2123865575"
                >
                  <i className="fas fa-phone-alt text-secondary" />
                  &nbsp; Operations Dept: +55 47992800227
                </Link>
              </div>
            </div>
            <div className="col-auto d-sm-flex align-items-center">
              {user && (
                <>
                  <i className="fas fa-user text-secondary" />
                  <span className="ms-2 fs--1 d-inline text-white fw-bold">
                    {user.name}
                  </span>
                </>
              )}
              <Link
                className="ms-2 d-inline text-white fw-bold"
                style={{ cursor: 'pointer' }}
                onClick={() => logout()}
                to=""
              >
                <i className="fas fa-sign-out-alt text-secondary" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="row align-items-center gx-4">
            <div className="col-auto d-none d-lg-block fs--1">
              <a>
                <i className="fas fa-map-marker-alt text-secondary me-2" />
                Nationwide Assistence.
              </a>
            </div>
            <div className="col-auto ms-md-auto order-md-3 d-none d-sm-flex fs--1 align-items-center">
              <a>
                <i className="fas fa-clock text-secondary me-2" />
                24/7 Online
              </a>
            </div>
            <div className="col-auto fs--1">
              <Link
                className="ms-2 fs--1 d-inline text-white fw-bold"
                to="tel:2123865575"
              >
                <i className="fas fa-phone-alt text-secondary" />
                &nbsp; Head Office: +55 4720335009
              </Link>
            </div>
            <div className="col-auto fs--1">
              <Link
                className="ms-2 fs--1 d-inline text-white fw-bold"
                to="tel:2123865575"
              >
                <i className="fas fa-phone-alt text-secondary" />
                &nbsp; Commercial Dept: +55 47992149466
              </Link>
            </div>
            <div className="col-auto fs--1">
              <Link
                className="ms-2 fs--1 d-inline text-white fw-bold"
                to="tel:2123865575"
              >
                <i className="fas fa-phone-alt text-secondary" />
                &nbsp; Operations Dept: +55 47992800227
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Headers;
