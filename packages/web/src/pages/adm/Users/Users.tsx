import 'bootstrap-icons/font/bootstrap-icons.css';
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
import { ILoggedUser } from '@csnvt/types';
import { Environment } from '@csnvt/environment';

import {
  IListUser,
  UsersService,
} from '@csnvt/services/api/users/UsersService';

const Users: React.FC<ILoggedUser> = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [filter, setFilter] = useState('');
  const [user, setUser] = useState({ data });
  const [accessToken, setAccessToken] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListUser[]>([]);
  const loggedUser = JSON.parse(user.data as string);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina')) || 1;
  }, [searchParams]);

  const handeSeach = () => {
    setLoading(true);
    const search = document.getElementById(
      'form1',
    ) as HTMLInputElement;

    UsersService.getByName(search.value, pagina).then(result => {
      if (result instanceof Error) {
        console.error(result.message);
      } else {
        setRows(result);
        setFilter(search.value);
        setTotalCount(result.length);
        setLoading(false);
      }
    });
  };

  const handleClear = () => {
    setLoading(true);
    const search = document.getElementById(
      'form1',
    ) as HTMLInputElement;

    search.value = '';
    setFilter('');
    setSearchParams(
      { busca: '', pagina: '1' },
      { replace: true },
    );

    UsersService.getAll(1, '').then(result => {
      if (result instanceof Error) {
        console.error(result.message);
      } else {
        setRows(result.data);
        setTotalCount(result.totalCount);
        setLoading(false);
      }
    });
  };

  const handlePage = (page: number) => {
    setLoading(true);
    UsersService.getAll(page).then(result => {
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
    document.title = 'Usuários | CSNVT';

    const accessToken = localStorage.getItem(
      Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN,
    );

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }

    debounce(() => {
      if (Environment.PROFILE_ADM == loggedUser.perfil) {
        UsersService.getAll(pagina).then(result => {
          setLoading(false);

          if (result instanceof Error) {
            console.error(result.message);
          } else {
            setRows(result.data);
            setTotalCount(result.totalCount);
          }
        });
      } else {
        UsersService.getById(loggedUser.id).then(result => {
          setLoading(false);
          const data = [result as IListUser, ...rows];
          if (result instanceof Error) {
            console.error(result.message);
          } else {
            setRows(data);
            setTotalCount(data.length);
          }
        });
      }
    });
  }, [setLoading, setAccessToken, pagina, busca]);

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
          title="Usuários"
          loggedUser={loggedUser}
          rota="/adm/users/create"
          toolbar={<ToolbarList option="users" />}
        >
          <div className="row px-3">
            {loggedUser.perfil == Environment.PROFILE_ADM && (
              <div className="col-12 input-group">
                <div
                  className="form-outline col-11"
                  data-mdb-input-init
                >
                  <input
                    id="form1"
                    type="search"
                    className="form-control"
                    style={{ width: '100%' }}
                    placeholder="Pesquisar pelo nome do usuário"
                  />
                </div>
                {filter != '' ? (
                  <button
                    className="btn btn-secondary col-1"
                    onClick={() => handleClear()}
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary col-1"
                    onClick={() => handeSeach()}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                )}
              </div>
            )}
            <div className="px-4 pt-5">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Perfil</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <th scope="row">{row.id}</th>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>
                        {row.perfil == 1 ? 'Admin' : 'Usuário'}
                      </td>
                      <td>
                        {row.status == 1 ? 'Ativo' : 'Inativo'}
                      </td>
                      <td className="text-xl-end">
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() =>
                            navigate(`/adm/users/${row.id}`)
                          }
                        >
                          <i className="bi bi-pencil-square" />
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
                      <td colSpan={6}>
                        <Preloader />
                      </td>
                    </tr>
                  )}
                  {totalCount > 0 &&
                    totalCount > Environment.LINE_LIMIT && (
                      <tr>
                        <td colSpan={6}>
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

export default Users;
