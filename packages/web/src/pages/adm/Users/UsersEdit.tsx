import 'bootstrap-icons/font/bootstrap-icons.css';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';

import Headers from '../../../components/Headers';
import Preloader from '../../../components/Preloader';
import {
  LayoutBase,
  ModalError,
  ToolbarList,
} from '../../../sections';

import { useDebounce } from '@csnvt/hooks';
import { ILoggedUser } from '@csnvt/types';
import { Environment } from '@csnvt/environment';
import { UsersService } from '@csnvt/services/api/users/UsersService';

const formValidation = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email().required('E-mail é obrigatório'),
  perfil: yup.string().required('Perfil é obrigatório'),
  status: yup.string().required('Status é obrigatório'),
});

const UsersEdit: React.FC<ILoggedUser> = ({ data }) => {
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);

  const [message, setMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [user, setUser] = useState({ data });

  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const { debounce } = useDebounce();

  const loggedUser = JSON.parse(user.data as string);

  const {
    register,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      perfil: '',
      status: '',
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
        UsersService.updateById(Number(id), data).then(
          response => {
            setLoading(false);

            if (response instanceof Error) {
              setErrorModal(true);
              setErrorMessage(response.message);
            } else {
              navigate('/adm/users');
            }
          },
        );
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
      UsersService.getById(Number(id)).then(result => {
        setLoading(false);

        if (result instanceof Error) {
          setAlert(true);
          setMessage(result.message);

          setTimeout(() => {
            navigate('/adm/users');
          }, 5000);
        } else {
          setValue('name', result.name);
          setValue('email', result.email);
          setValue('perfil', result.perfil === 1 ? '1' : '2');
          setValue('status', result.status === 1 ? '1' : '2');
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
          title="Usuários"
          subTitle="Editar Usuário"
          loggedUser={loggedUser}
          toolbar={<ToolbarList option="users" />}
        >
          <div className="row px-3">
            {alert && (
              <div
                className="col-12 alert alert-danger"
                role="alert"
              >
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

export default UsersEdit;
