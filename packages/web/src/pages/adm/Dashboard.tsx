import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDebounce } from '@csnvt/hooks';
import { ILoggedUser } from '@csnvt/types';
import { Environment } from '@csnvt/environment';
import { UsersService } from '@csnvt/services/api/users/UsersService';
import { ShipsService } from '@csnvt/services/api/ships/ShipsService';

import Headers from '../../components/Headers';
import Preloader from '../../components/Preloader';
import { LayoutBase, ToolbarList } from '../../sections';

const Dashboard: React.FC<ILoggedUser> = ({ data }) => {
  const { debounce } = useDebounce();
  const [error, setError] = useState('');

  const [user, setUser] = useState({ data });
  const [loading, setLoading] = useState(true);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalShips, setTotalShips] = useState(0);

  const [accessToken, setAccessToken] = useState('');

  const loggedUser = JSON.parse(user.data as string);

  useEffect(() => {
    document.title = 'Dashboard | CSNVT';

    const accessToken = localStorage.getItem(
      Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN,
    );

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }

    debounce(() => {
      UsersService.getAll(1).then(result => {
        setLoading(false);

        if (result instanceof Error) {
          setError(result.message);
        } else {
          setTotalUsers(result.totalCount);
        }
      });

      ShipsService.getAll(1).then(result => {
        setLoading(false);
        if (result instanceof Error) {
          setError(result.message);
        } else {
          setTotalShips(result.totalCount);
        }
      });
    });
  }, [setLoading, setAccessToken]);

  return (
    <>
      <Headers
        user={loggedUser}
        setUser={setUser}
        token={accessToken}
      />
      <main id="top" className="main" style={{ height: '94vh' }}>
        {loading && <Preloader />}
        <LayoutBase
          title="Dashboard"
          loggedUser={loggedUser}
          toolbar={<ToolbarList option="dashboard" />}
        >
          <div className="row px-3">
            <div className="col-12">
              <div className="cards row">
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        {totalUsers}
                      </h5>
                      <p className="card-text">
                        Total de Usuários
                      </p>
                      <Link
                        to="/adm/users"
                        className="btn btn-primary"
                      >
                        Ver mais
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        {totalShips}
                      </h5>
                      <p className="card-text">
                        Total de Navios
                      </p>
                      <Link
                        to="/adm/ships"
                        className="btn btn-primary"
                      >
                        Ver mais
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutBase>
      </main>
    </>
  );
};

export default Dashboard;
