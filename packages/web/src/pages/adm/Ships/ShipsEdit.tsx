import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import {
  Controller,
  useFieldArray,
  useForm,
} from 'react-hook-form';

import * as yup from 'yup';

import Headers from '../../../components/Headers';
import Preloader from '../../../components/Preloader';
import { LayoutBase, ToolbarList } from '../../../sections';

import { useDebounce } from '@csnvt/hooks';
import { Environment } from '@csnvt/environment';
import { ILoggedUser, IShipsProps } from '@csnvt/types';

import { ShipsService } from '@csnvt/services/api/ships/ShipsService';
import { ShipsOwnersService } from '@csnvt/services/api/ships/ShipsOwnersService';

const formValidation = yup.object().shape({
  imo: yup.number().required('IMO é obrigatório'),
  name: yup.string().required('Nome é obrigatório'),
});

const ShipsEdit: React.FC<ILoggedUser> = ({ data }) => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({ data });
  const [accessToken, setAccessToken] = useState('');

  let [idShip, setIdShip] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState(false);

  const { imo } = useParams<'imo'>();

  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const loggedUser = JSON.parse(user.data as string);

  const {
    control,
    register,
    setError,
    setValue,
    handleSubmit,
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

  const onSubmit = async (data: IShipsProps) => {
    setLoading(true);

    const dataShip = {
      imo: data.imo,
      name: data.name,
      email: data.email,
      phone: data.phone,
      link: data.link,
    };

    formValidation
      .validate(data)
      .then(() => {
        ShipsService.updateById(Number(imo), dataShip).then(
          response => {
            if (response instanceof Error) {
              console.error(response.message);
            } else {
              data.ships_owners.forEach((shipOwner: any) => {
                if (shipOwner.id === null) {
                  /*- CREATE SHPIS-OWNERS -*/
                  const dataShipOwner = {
                    name: shipOwner.name,
                    email: shipOwner.email,
                    phone: shipOwner.phone,
                    ships_imo: Number(imo),
                  };

                  ShipsOwnersService.create(dataShipOwner).then(
                    result => {
                      if (result instanceof Error) {
                        console.error(result.message);
                      } else {
                        navigate('/adm/ships');
                      }
                    },
                  );
                } else {
                  /*- UPDATE SHPIS-OWNERS -*/
                  const dataShipOwner = {
                    id: shipOwner.id,
                    name: shipOwner.name,
                    email: shipOwner.email,
                    phone: shipOwner.phone,
                    ships_imo: Number(imo),
                  };

                  ShipsOwnersService.updateById(
                    Number(imo),
                    Number(shipOwner.id),
                    dataShipOwner,
                  ).then(result => {
                    if (result instanceof Error) {
                      console.error(result.message);
                    } else {
                      navigate('/adm/ships');
                    }
                  });
                }

                setLoading(false);
              });
            }
          },
        );
      })
      .catch((errors: yup.ValidationError) => {
        console.error(errors);
        errors.inner.forEach(error => {
          setError(error.path?.toString() as any, {
            type: 'manual',
            message: error.message,
          });
        });

        setLoading(false);
      });
  };

  const onRemove = async (id: string) => {
    ShipsOwnersService.deleteById(Number(id)).then(result => {
      if (result instanceof Error) {
        console.error(result.message);
      } else {
        console.log('onRemove', id);
      }
    });
  };

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
        if (result instanceof Error) {
          setAlert(true);
          setMessage(result.message);
          setTimeout(() => {
            navigate('/adm/ships');
          }, 5000);
        } else {
          setValue('imo', result.imo);
          setValue('name', result.name);
          setValue('email', result.email);
          setValue('phone', result.phone);
          setValue('link', result.link);

          ShipsOwnersService.getByShipImo(Number(imo)).then(
            (result: any) => {
              if (result instanceof Error) {
                setMessage(result.message);
                setTimeout(() => {
                  navigate('/adm/ships');
                }, 5000);
              } else {
                remove(result);

                result.map((item: any) => {
                  append({
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    phone: item.phone,
                    ships_imo: item.ships_imo,
                  });
                });
                setLoading(false);
              }
            },
          );
        }
      });
    });
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
          subTitle="Editar Navio"
          loggedUser={loggedUser}
          toolbar={<ToolbarList option="ships" />}
        >
          <div className="row px-3">
            {alert && (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            )}
            <form
              className="text-start mt-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="imo" className="form-label">
                      IMO
                    </label>
                    <input
                      id="imo"
                      type="number"
                      {...register('imo')}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Navio
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="phone"
                      className="form-label"
                    >
                      Telefone
                    </label>
                    <input
                      id="phone"
                      type="text"
                      {...register('phone')}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-12 mt-1 mb-1">
                  <button
                    type="button"
                    className="btn btn-light form-label"
                    onClick={() =>
                      append({
                        id: null,
                        name: '',
                        email: '',
                        phone: '',
                        ships_imo: Number(imo),
                      })
                    }
                  >
                    Adicionar Armadores
                  </button>
                  {fields.length > 0 && (
                    <div className="card mt-1 mb-3">
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
                                  <div className="mb-3 col-3">
                                    <input
                                      {...field}
                                      type="text"
                                      placeholder="E-mail"
                                      className="form-control"
                                    />
                                  </div>
                                )}
                              />
                              <Controller
                                control={control}
                                name={
                                  `ships_owners[${index}].phone` as never
                                }
                                render={({ field }) => (
                                  <div className="mb-3 col-3">
                                    <input
                                      {...field}
                                      type="text"
                                      placeholder="Telefone"
                                      className="form-control"
                                    />
                                  </div>
                                )}
                              />
                              <div className="mb-3 col-2">
                                <button
                                  type="button"
                                  className="btn btn-danger col-12"
                                  onClick={() => {
                                    remove(index);
                                    onRemove(idShip);
                                  }}
                                >
                                  Remover
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="link" className="form-label">
                      Link
                    </label>
                    <input
                      id="link"
                      type="text"
                      {...register('link')}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Salvar
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => navigate('/adm/ships')}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </LayoutBase>
      </main>
    </>
  );
};

export default ShipsEdit;
