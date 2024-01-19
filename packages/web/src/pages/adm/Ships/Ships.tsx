import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Headers from '../../../components/Headers';
import Preloader from '../../../components/Preloader';

import {
  LayoutBase,
  Pagination,
  ToolbarList,
} from '../../../sections';

import { useDebounce } from '@csnvt/hooks';
import { Environment } from '@csnvt/environment';
import { ILoggedUser, IShips } from '@csnvt/types';

import { ShipsService } from '@csnvt/services/api/ships/ShipsService';

const Ships: React.FC<ILoggedUser> = ({ data }) => {
  const [accessToken, setAccessToken] = useState('');
  const [filterImo, setFilterImo] = useState('');
  const [filterShip, setFilterShip] = useState('');

  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ data });

  const [searchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IShips[]>([]);
  const loggedUser = JSON.parse(user.data as string);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina')) || 1;
  }, [searchParams]);

  const handeSeach = () => {
    setLoading(true);
    const searchIMO = document.getElementById(
      'imo',
    ) as HTMLInputElement;

    const searchShip = document.getElementById(
      'ship_name',
    ) as HTMLInputElement;

    ShipsService.getByFilter(
      Number(searchIMO.value),
      searchShip.value,
      pagina,
    ).then(result => {
      if (result instanceof Error) {
        console.error(result.message);
      } else {
        setRows(result);
        setFilterImo(searchIMO.value);
        setFilterShip(searchShip.value);

        setTotalCount(result.length);
        setLoading(false);
      }
    });
  };

  const handleClear = () => {
    setLoading(true);
    const searchIMO = document.getElementById(
      'imo',
    ) as HTMLInputElement;

    const searchShip = document.getElementById(
      'ship_name',
    ) as HTMLInputElement;

    searchIMO.value = '';
    searchShip.value = '';

    ShipsService.getAll(1).then(result => {
      if (result instanceof Error) {
        console.error(result.message);
      } else {
        setRows(result.data);
        setTotalCount(result.totalCount);
        setLoading(false);

        setFilterImo('');
        setFilterShip('');
      }
    });
  };

  const handlePage = (page: number) => {
    setLoading(true);
    ShipsService.getAll(page).then(result => {
      setLoading(false);

      if (result instanceof Error) {
        console.error(result.message);
      } else {
        setRows(result.data);
        setTotalCount(result.totalCount);

        setLoading(false);
      }
    });
  };

  useEffect(() => {
    document.title = 'Navios | CSNVT';

    const accessToken = localStorage.getItem(
      Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN,
    );

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }

    debounce(() => {
      ShipsService.getAll(pagina).then(result => {
        setLoading(false);

        if (result instanceof Error) {
          console.error(result.message);
        } else {
          setRows(result.data);
          setTotalCount(result.totalCount);

          setLoading(false);
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
          title="Navios"
          loggedUser={loggedUser}
          rota="/adm/ships/create"
          toolbar={<ToolbarList option="ships" />}
        >
          <div className="row px-3">
            <div
              className="col-12 input-group"
              style={{ display: 'flex', gap: '20px' }}
            >
              <div className="form-outline col-5">
                <input
                  id="imo"
                  type="search"
                  className="form-control"
                  style={{ width: '100%' }}
                  placeholder="Pesquisar pelo IMO"
                />
              </div>
              <div className="form-outline col-5">
                <input
                  id="ship_name"
                  type="search"
                  className="form-control"
                  style={{ width: '100%' }}
                  placeholder="Pesquisar pelo nome do navio"
                />
              </div>
              {filterImo != '' || filterShip != '' ? (
                <button
                  onClick={() => handleClear()}
                  className="btn btn-secondary col-1"
                >
                  <i className="bi bi-x-circle"></i>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handeSeach()}
                  className="btn btn-primary col-1"
                >
                  <i className="bi bi-search"></i>
                </button>
              )}
            </div>

            <div className="px-4 pt-5">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Telefone</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <th scope="row">{row.imo}</th>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.phone}</td>
                      <td className="text-xl-end">
                        {loggedUser.perfil ==
                          Environment.PROFILE_ADM && (
                          <button
                            title="Editar"
                            className="btn btn-sm btn-primary me-2"
                            onClick={() =>
                              navigate(
                                `/adm/ships/edit/${row.imo}`,
                              )
                            }
                          >
                            <i className="bi bi-pencil-square" />
                          </button>
                        )}
                        <button
                          title="Visualizar"
                          className="btn btn-sm btn-info"
                          onClick={() =>
                            navigate(
                              `/adm/ships/view/${row.imo}`,
                            )
                          }
                        >
                          <i className="bi bi-file-earmark-text" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {totalCount == 0 && !loading && (
                  <caption>{Environment.EMPTY_LISTING}</caption>
                )}
                <tfoot>
                  {loading && (
                    <tr>
                      <td colSpan={5}>
                        <Preloader />
                      </td>
                    </tr>
                  )}
                  {totalCount > 0 &&
                    totalCount > Environment.LINE_LIMIT && (
                      <tr>
                        <td colSpan={5}>
                          <Pagination
                            page={pagina}
                            count={Math.ceil(
                              totalCount /
                                Environment.LINE_LIMIT,
                            )}
                            onChange={(newPage: number) => {
                              handlePage(newPage);
                            }}
                          />
                        </td>
                      </tr>
                    )}
                </tfoot>
              </table>
            </div>
          </div>
        </LayoutBase>
      </main>
    </>
  );
};

export default Ships;
