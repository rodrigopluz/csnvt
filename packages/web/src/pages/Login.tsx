import axios from 'axios';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Environment } from '@csnvt/environment';

import Preloader from '../components/Preloader';
import { Loader } from '../sections';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

const Login: React.FC = () => {
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState({});

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    document.title = 'Clean Sea - Login';

    const BigPicture = document.createElement('script');
    BigPicture.src = 'src/vendors/bigpicture/BigPicture.js';
    document.body.appendChild(BigPicture);

    const Swiper = document.createElement('script');
    Swiper.src = 'src/vendors/swiper/swiper-bundle.min.js';
    document.body.appendChild(Swiper);

    const Is = document.createElement('script');
    Is.src = 'src/vendors/is/is.min.js';
    document.body.appendChild(Is);

    const Popper = document.createElement('script');
    Popper.src = 'src/vendors/popper/popper.min.js';
    document.body.appendChild(Popper);

    const CountUp = document.createElement('script');
    CountUp.src = 'src/vendors/countup/countUp.umd.js';
    document.body.appendChild(CountUp);

    const Gsap = document.createElement('script');
    Gsap.src = 'src/vendors/gsap/gsap.js';
    document.body.appendChild(Gsap);

    const CustomEase = document.createElement('script');
    CustomEase.src = 'src/vendors/gsap/customEase.js';
    document.body.appendChild(CustomEase);

    const ImagesLoaded = document.createElement('script');
    ImagesLoaded.src =
      'src/vendors/imagesloaded/imagesloaded.pkgd.min.js';
    document.body.appendChild(ImagesLoaded);

    const Lodash = document.createElement('script');
    Lodash.src = 'src/vendors/lodash/lodash.min.js';
    document.body.appendChild(Lodash);

    const Theme = document.createElement('script');
    Theme.src = 'src/assets/js/theme.js';
    document.body.appendChild(Theme);

    return () => {
      document.body.removeChild(BigPicture);
      document.body.removeChild(Swiper);
      document.body.removeChild(Is);
      document.body.removeChild(Popper);
      document.body.removeChild(CountUp);
      document.body.removeChild(Gsap);
      document.body.removeChild(CustomEase);
      document.body.removeChild(ImagesLoaded);
      document.body.removeChild(Lodash);
      document.body.removeChild(Theme);
    };
  }, [accessToken]);

  const onSubmit = async (data: {}) => {
    setLoading(true);

    loginSchema
      .validate({ ...data }, { abortEarly: false })
      .then(form_data => {
        axios
          .post(`${Environment.URL_BASE}/login`, form_data)
          .then(res => {
            if (res.status === 200) {
              localStorage.setItem(
                Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN,
                JSON.stringify(res.data.accessToken),
              );

              localStorage.setItem(
                Environment.LOCAL_STORAGE_USER,
                JSON.stringify(res.data.user),
              );

              setAccessToken(
                JSON.stringify(res.data.accessToken),
              );

              setUser(res.data.user);
              window.location.href = '/adm/dashboard';
            }
          })
          .catch(() => {
            setErrorModal(true);
            setLoading(false);
          });
      })
      .catch((errors: yup.ValidationError) => {
        errors.inner.forEach(error => {
          if (error.path === 'email') {
            setError('email', {
              type: 'manual',
              message: error.message,
            });
          } else if (error.path === 'password') {
            setError('password', {
              type: 'manual',
              message: error.message,
            });
          }
        });
        setLoading(false);
      });
  };

  return (
    <main className="main" id="top">
      <Preloader />
      <section className="text-center py-0">
        <div
          className="bg-holder overlay overlay-2"
          style={{
            backgroundImage: 'url(assets/img/locbkgphoto2.jpeg)',
          }}
        />

        <div className="container">
          <div className="row min-vh-100 align-items-center">
            <div
              className="col-md-8 col-lg-5 mx-auto"
              data-zanim-trigger="scroll"
            >
              <div
                className="mb-5"
                data-zanim-xs='{"delay":0,"duration":1}'
              >
                <Link to="/">
                  <img
                    src="assets/img/logocs-light.svg"
                    alt="logo"
                  />
                </Link>
              </div>
              <div
                className="card"
                data-zanim-xs='{"delay":0.1,"duration":1}'
              >
                <div className="card-body p-md-5">
                  <h4 className="text-uppercase fs-0 fs-md-1">
                    Login with Clean Sea
                  </h4>
                  <form
                    className="text-start mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="row align-items-center">
                      <div className="col-12">
                        <div className="input-group">
                          <div className="input-group-text bg-100">
                            <span className="far fa-user"></span>
                          </div>
                          <input
                            type="text"
                            placeholder="E-mail"
                            className="form-control"
                            aria-label="Text input with dropdown button"
                            {...register('email', {
                              required: true,
                            })}
                          />
                        </div>
                        {errors.email && (
                          <div className="invalid-feedback">
                            {errors.email.message}
                          </div>
                        )}
                      </div>
                      <div className="col-12 mt-2 mt-sm-4">
                        <div className="input-group">
                          <div className="input-group-text bg-100">
                            <span className="fas fa-lock"></span>
                          </div>
                          <input
                            type="Password"
                            placeholder="Password"
                            className="form-control"
                            aria-label="Text input with dropdown button"
                            {...register('password', {
                              required: true,
                            })}
                          />
                        </div>
                        {errors.password && (
                          <div className="invalid-feedback">
                            {errors.password.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row align-items-center mt-3">
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            id="rememberMe"
                            type="checkbox"
                            value=""
                          />
                          <label
                            className="form-check-label text-500"
                            htmlFor="rememberMe"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <div className="col-6 mt-2 mt-sm-3">
                        <button
                          className="btn btn-primary w-100"
                          data-target="#myModal"
                          data-toggle="modal"
                          type="submit"
                          id="myBtn"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {errorModal && (
        <Modal
          centered
          show={errorModal}
          data-keyboard="false"
          data-backdrop="static"
          // onHide={() => setErrorModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Unauthorized access</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>&nbsp;</p>
            <p>Sorry, user not found. Please contact support.</p>
            <p>&nbsp;</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setErrorModal(false)}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {loading && <Loader />}
    </main>
  );
};

export default Login;
