import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import {
  Controller,
  useFieldArray,
  useForm,
} from 'react-hook-form';

import History from '../History/History';
import Information from '../Information/Information';

import Headers from '../../../components/Headers';
import Preloader from '../../../components/Preloader';
import { LayoutBase, ToolbarList } from '../../../sections';

import { useDebounce } from '@csnvt/hooks';
import { Environment } from '@csnvt/environment';

import {
  ILoggedUser,
  IShipsOwner,
  IShipsProps,
} from '@csnvt/types';

import { ShipsService } from '@csnvt/services/api/ships/ShipsService';
import { ShipsOwnersService } from '@csnvt/services/api/ships/ShipsOwnersService';

const ShipsView: React.FC<ILoggedUser> = ({ data }) => {
  const [accessToken, setAccessToken] = useState('');
  const [linkEmail, setLinkEmail] = useState('');
  const [linkSite, setLinkSite] = useState('');

  const [hitShips, setHitShips] = useState('');
  const [hitIMO, setHitIMO] = useState('');

  const [infoShips, setInfoShips] = useState('');
  const [infoIMO, setInfoIMO] = useState('');

  let [idShip, setIdShip] = useState('');

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({ data });

  const { imo } = useParams<'imo'>();
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const loggedUser = JSON.parse(user.data as string);

  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<IShipsProps>({
    mode: 'onChange',
    defaultValues: {
      imo: null,
      name: '',
      email: '',
      phone: '',
      link: '',
      ships_owners: [
        {
          name: '',
          email: '',
          phone: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ships_owners',
    rules: { required: 'Adicione um armador' },
  });

  useEffect(() => {
    document.title = 'Editar Usuários | CSNVT';
    const accessToken = localStorage.getItem(
      Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN,
    );

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }

    debounce(() => {
      ShipsService.getEditById(Number(imo)).then(result => {
        setLoading(false);
        if (result instanceof Error) {
          setTimeout(() => {
            navigate('/adm/ships');
          }, 5000);
        } else {
          setValue('imo', result.imo);
          setValue('name', result.name);
          setValue('email', result.email);
          setValue('phone', result.phone);
          setValue('link', result.link);

          setLinkSite(result.link);
          setLinkEmail(result.email);

          setHitShips(result.name);
          setHitIMO(result.imo.toString());

          setInfoShips(result.name);
          setInfoIMO(result.imo.toString());

          /*- returns all ship-owners records related to the ship -*/
          ShipsOwnersService.getByShipImo(Number(imo)).then(
            (result: IShipsOwner) => {
              if (result instanceof Error) {
                setTimeout(() => {
                  navigate('/adm/ships');
                }, 5000);
              } else {
                remove(result.id);

                if (Array.isArray(result)) {
                  result.map((item: IShipsOwner) => {
                    append({
                      id: item.id,
                      name: item.name,
                      email: item.email,
                      phone: item.phone,
                      ships_imo: item.ships_imo,
                    });
                  });
                }
                setLoading(false);
              }
            },
          );
        }
      });
    });

    setIdShip('');
  }, []);

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
          subTitle="Visualizar Navio"
          loggedUser={loggedUser}
          toolbar={<ToolbarList option="ships" />}
        >
          <div className="row px-3">
            <div className="col-12">
              <div className="row">
                <div className="col-2">
                  <label className="form-label">IMO</label>
                  <input
                    disabled
                    type="text"
                    {...register('imo')}
                    className="form-control"
                  />
                </div>
                <div className="col-4">
                  <label className="form-label">Nome</label>
                  <input
                    disabled
                    type="text"
                    {...register('name')}
                    className="form-control"
                  />
                </div>
                <div className="col-3">
                  <label className="form-label">E-mail</label>
                  <div className="input-group">
                    <a
                      className="input-group-text"
                      href={`mailto:${linkEmail}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <i className="bi bi-envelope-at" />
                    </a>
                    <input
                      disabled
                      type="text"
                      {...register('email')}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-3">
                  <label className="form-label">Telefone</label>
                  <input
                    disabled
                    type="text"
                    {...register('phone')}
                    className="form-control"
                  />
                </div>
                {fields.length > 0 && (
                  <div className="col-md-12 mt-3 mb-1">
                    <label className="form-label">
                      Armadores
                    </label>
                    <div className="card mt-1 mb-1">
                      <div className="card-body pt-3 pb-2">
                        {fields.map(({ id }, index: number) => {
                          return (
                            <div
                              id={id}
                              key={id}
                              className="row rowShipOwner"
                            >
                              <Controller
                                control={control}
                                name={
                                  `ships_owners[${index}].id` as never
                                }
                                render={({ field }) => {
                                  idShip = field.value;
                                  return (
                                    <input
                                      {...field}
                                      type="hidden"
                                      id={field.value}
                                      value={field.value}
                                    />
                                  );
                                }}
                              />
                              <Controller
                                control={control}
                                name={
                                  `ships_owners[${index}].name` as never
                                }
                                render={({ field }) => (
                                  <div className="mb-3 col-4">
                                    <input
                                      {...field}
                                      type="text"
                                      disabled={true}
                                      placeholder="Nome"
                                      className="form-control"
                                    />
                                  </div>
                                )}
                              />
                              <Controller
                                control={control}
                                name={
                                  `ships_owners[${index}].email` as never
                                }
                                render={({ field }) => (
                                  <div className="mb-3 col-4">
                                    <div className="input-group">
                                      <a
                                        className="input-group-text"
                                        href={`mailto:${field.value}`}
                                        style={{
                                          textDecoration: 'none',
                                        }}
                                      >
                                        <i className="bi bi-envelope-at" />
                                      </a>
                                      <input
                                        {...field}
                                        type="text"
                                        disabled={true}
                                        placeholder="E-mail"
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                )}
                              />
                              <Controller
                                control={control}
                                name={
                                  `ships_owners[${index}].phone` as never
                                }
                                render={({ field }) => (
                                  <div className="mb-3 col-4">
                                    <input
                                      {...field}
                                      type="text"
                                      disabled={true}
                                      placeholder="Telefone"
                                      className="form-control"
                                    />
                                  </div>
                                )}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                <div className="col-12">
                  <label className="form-label">Link</label>
                  <div className="input-group">
                    <a
                      href={linkSite}
                      className="input-group-text"
                      style={{ textDecoration: 'none' }}
                    >
                      <i className="bi bi-link-45deg" />
                    </a>
                    <input
                      disabled
                      type="text"
                      {...register('link')}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-md-12 mt-3 mb-1">
                  <nav>
                    <div
                      id="nav-tab"
                      role="tablist"
                      className="nav nav-tabs"
                    >
                      <button
                        role="tab"
                        type="button"
                        id="nav-hist-tab"
                        data-bs-toggle="tab"
                        aria-selected="true"
                        aria-controls="nav-hist"
                        className="nav-link active"
                        data-bs-target="#nav-hist"
                      >
                        Historicos
                      </button>
                      <button
                        role="tab"
                        type="button"
                        id="nav-info-tab"
                        className="nav-link"
                        data-bs-toggle="tab"
                        aria-selected="false"
                        aria-controls="nav-info"
                        data-bs-target="#nav-info"
                      >
                        Informações
                      </button>
                    </div>
                  </nav>
                  <div
                    id="nav-tabContent"
                    className="tab-content"
                  >
                    <div
                      id="nav-hist"
                      role="tabpanel"
                      aria-labelledby="nav-hist-tab"
                      className="tab-pane fade show active"
                    >
                      <div className="col-12 mt-3">
                        <History
                          hitIMO={hitIMO}
                          hitShips={hitShips}
                          setHitIMO={setHitIMO}
                          setHitShips={setHitShips}
                        />
                      </div>
                    </div>
                    <div
                      id="nav-info"
                      role="tabpanel"
                      className="tab-pane fade"
                      aria-labelledby="nav-info-tab"
                    >
                      <div className="col-12 mt-3">
                        <Information
                          infoIMO={infoIMO}
                          infoShips={infoShips}
                          setInfoIMO={setInfoIMO}
                          setInfoShips={setInfoShips}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/adm/ships')}
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </LayoutBase>
      </main>
    </>
  );
};

export default ShipsView;
