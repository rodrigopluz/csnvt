import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Environment } from '@csnvt/environment';
import { IToolbarListProps } from '@csnvt/types';

const ToolbarList: React.FC<IToolbarListProps> = ({
  option,
}) => {
  useEffect(() => {
    const list = document.querySelectorAll('.list-group-item');
    list.forEach(item => {
      if (item.getAttribute('aria-controls') === option) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem(Environment.LOCAL_STORAGE_USER);
    localStorage.removeItem(
      Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN,
    );

    return (window.location.href = '/');
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <nav
        className="navbar navbar-expand-lg"
        style={{
          gap: '70px',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <div className="col-12 px-3 text-lg-center">
          <img
            alt="logo"
            width="100%"
            height="auto"
            src="../../../assets/img/logocs-dark.svg"
          />
        </div>
        <div className="col-12">
          <div
            id="list-tab"
            role="tablist"
            className="list-group list-group-flush"
          >
            <Link
              className="list-group-item list-group-item-action"
              aria-controls="dashboard"
              data-toggle="list"
              to={'/adm/dashboard'}
              role="tab"
            >
              Dashboard
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              aria-controls="users"
              data-toggle="list"
              to={'/adm/users'}
              role="tab"
            >
              Usuários
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              aria-controls="ships"
              data-toggle="list"
              to={'/adm/ships'}
              role="tab"
            >
              Navios
            </Link>
          </div>
        </div>
      </nav>

      <div className="col-12 px-3 text-lg-center">
        <Link
          className="btn btn-primary"
          onClick={() => logout()}
          to="#"
        >
          Sair
        </Link>
      </div>
    </div>
  );
};

export default ToolbarList;
