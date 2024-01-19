import 'bootstrap-icons/font/bootstrap-icons.css';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Headers from '../../../components/Headers';
import Preloader from '../../../components/Preloader';

import {
  LayoutBase,
  ModalError,
  ToolbarList,
} from '../../../sections';

import { ILoggedUser } from '@csnvt/types';
import { Environment } from '@csnvt/environment';
import { UsersService } from '@csnvt/services/api/users/UsersService';

const formValidation = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email().required('E-mail é obrigatório'),
  perfil: yup.string().required('Perfil é obrigatório'),
  status: yup.string().required('Status é obrigatório'),
  password: yup.string().required('Senha é obrigatório'),
});

const UsersCreate: React.FC<ILoggedUser> = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState({ data });

  const navigate = useNavigate();

  const loggedUser = JSON.parse(user.data as string);

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      perfil: '',
      status: '',
      password: '',
    },
    resolver: yupResolver(formValidation),
  });

  const handlePassword = () => {
    const password = document.getElementById(
      'password',
    ) as HTMLInputElement;

    if (password.type === 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }

    const passIcon = document.getElementById(
      'pass-icon',
    ) as HTMLInputElement;

    if (passIcon.className === 'bi bi-eye') {
      passIcon.className = 'bi bi-eye-slash';
    } else {
      passIcon.className = 'bi bi-eye';
    }
  };

  const handlePasswordConfirm = () => {
    const password = document.getElementById(
      'password-confirm',
    ) as HTMLInputElement;

    if (password.type === 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }

    const passIcon = document.getElementById(
      'pass-icon-confirm',
    ) as HTMLInputElement;

    if (passIcon.className === 'bi bi-eye') {
      passIcon.className = 'bi bi-eye-slash';
    } else {
      passIcon.className = 'bi bi-eye';
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    formValidation
      .validate(data)
      .then(() => {
        UsersService.create(data).then(response => {
          setLoading(false);

          if (response instanceof Error) {
            setErrorModal(true);
            setErrorMessage(response.message);
          } else {
            navigate('/adm/users');
          }
        });
      })
      .catch((errors: yup.ValidationError) => {
        errors.inner.forEach(error => {
          if (error.path === 'name') {
            setError('name', {
              type: 'manual',
              message: error.message,
            });
          } else if (error.path === 'email') {
            setError('email', {
              type: 'manual',
              message: error.message,
            });
          } else if (error.path === 'perfil') {
            setError('perfil', {
              type: 'manual',
              message: error.message,
            });
          } else if (error.path === 'status') {
            setError('status', {
              type: 'manual',
              message: error.message,
            });
          }
        });

        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = 'Novo Usuários | CSNVT';
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
          title="Usuários"
          subTitle="Novo Usuário"
          loggedUser={loggedUser}
          toolbar={<ToolbarList option="users" />}
        >
          <div className="row px-3">
            <form
              className="text-start mt-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nome
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      {...register('name', { required: true })}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name.message}
                      </div>
                    )}
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
                      className="form-control"
                      {...register('email', { required: true })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="perfil"
                      className="form-label"
                    >
                      Perfil
                    </label>
                    <select
                      id="perfil"
                      className="form-select"
                      {...register('perfil', { required: true })}
                    >
                      <option value="">Selecione</option>
                      <option value="1">Admin</option>
                      <option value="2">Usuário</option>
                    </select>
                    {errors.perfil && (
                      <div className="invalid-feedback">
                        {errors.perfil.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="status"
                      className="form-label"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      className="form-select"
                      {...register('status', { required: true })}
                    >
                      <option value="">Selecione</option>
                      <option value="1">Ativo</option>
                      <option value="2">Inativo</option>
                    </select>
                    {errors.status && (
                      <div className="invalid-feedback">
                        {errors.status.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label"
                    >
                      Senha
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                      }}
                    >
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        {...register('password', {
                          required: true,
                        })}
                      />
                      <i
                        id="pass-icon"
                        className="bi bi-eye"
                        onClick={() => handlePassword()}
                        style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          right: '20px',
                        }}
                      />
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label"
                    >
                      Confirmar Senha
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                      }}
                    >
                      <input
                        type="password"
                        id="password-confirm"
                        className="form-control"
                        {...register('password', {
                          required: true,
                        })}
                      />
                      <i
                        id="pass-icon-confirm"
                        className="bi bi-eye"
                        onClick={() => handlePasswordConfirm()}
                        style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          right: '20px',
                        }}
                      />
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
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
                    onClick={() => navigate('/adm/users')}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </LayoutBase>

        {errorModal && (
          <ModalError
            title="Erro ao editar usuário"
            setError={setErrorModal}
            message={errorMessage}
            error={errorModal}
          />
        )}
      </main>
    </>
  );
};

export default UsersCreate;
