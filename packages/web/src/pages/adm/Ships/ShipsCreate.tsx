import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

import {
  Controller,
  useFieldArray,
  useForm,
} from 'react-hook-form';

import * as yup from 'yup';

import Headers from '../../../components/Headers';
import Preloader from '../../../components/Preloader';
import { LayoutBase, ToolbarList } from '../../../sections';

import { Environment } from '@csnvt/environment';

import {
  ILoggedUser,
  IShipsOwner,
  IShipsProps,
} from '@csnvt/types';

import { ShipsService } from '@csnvt/services/api/ships/ShipsService';
import { ShipsOwnersService } from '@csnvt/services/api/ships/ShipsOwnersService';

const formValidation = yup.object().shape({
  imo: yup.number().required('IMO é obrigatório'),
  name: yup.string().required('Nome é obrigatório'),
});

const ShipsCreate: React.FC<ILoggedUser> = ({ data }) => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({ data });
  const [accessToken, setAccessToken] = useState('');

  const navigate = useNavigate();

  const loggedUser = JSON.parse(user.data as string);

  const {
    control,
    register,
    setError,
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
      ships_owners: [] as any,
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
        setLoading(false);
        ShipsService.create(dataShip).then(response => {
          if (response instanceof Error) {
            console.error(response.message);
          } else {
            data.ships_owners.forEach(
              (shipOwner: IShipsOwner) => {
                const dataShipOwner = {
                  name: shipOwner.name,
                  email: shipOwner.email,
                  phone: shipOwner.phone,
                  ships_imo: response,
                };

                ShipsOwnersService.create(dataShipOwner).then(
                  res => {
                    console.log(res);

                    if (res instanceof Error) {
                      console.error(res.message);
                    } else {
                      navigate('/adm/ships');
                    }
                  },
                );
              },
            );
          }
        });
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

  useEffect(() => {
    document.title = 'Novo Navio | CSNVT';
    const accessToken = localStorage.getItem(
      Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN,
    );

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
          subTitle="Novo Navio"
          loggedUser={loggedUser}
          toolbar={<ToolbarList option="ships" />}
        >
          <div className="row px-3">
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
                        ships_imo: null,
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
                              className="row rowShipOwner"
                              id={`${index}`}
                              key={id}
                            >
                              <Controller
                                control={control}
                                name={
                                  `ships_owners[${index}].nameOwner` as any
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
                                  `ships_owners[${index}].emailOwner` as any
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
                                  `ships_owners[${index}].phoneOwner` as any
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

export default ShipsCreate;
