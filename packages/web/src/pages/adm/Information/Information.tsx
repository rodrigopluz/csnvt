import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal } from 'react-bootstrap';

import {
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { Environment } from '@csnvt/environment';
import { IInformations, IInformationProps } from '@csnvt/types';
import { InformationService } from '@csnvt/services/api/informations/InformationService';

import { Pagination } from '../../../sections';
import Preloader from '../../../components/Preloader';

const Information: React.FC<IInformationProps> = ({
  infoIMO,
  infoShips,
  setInfoIMO,
  setInfoShips,
}) => {
  const [infoText, setInfoText] = useState('');
  const [message, setMessage] = useState('');

  const [information, setInformation] = useState([]);
  const [modalInfo, setModalInfo] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const { imo } = useParams<'imo'>();
  const navigate = useNavigate();

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina')) || 1;
  }, [searchParams]);

  const { control, setValue, handleSubmit } =
    useForm<IInformations>({
      defaultValues: {
        id: null,
        info: '',
        datainfo: '',
        ships_imo: Number(imo),
      },
    });

  const onSubmit = async (data: IInformations) => {
    setLoading(true);
    setModalInfo(false);

    if (data.id === null) {
      const result = await InformationService.create(data);
      if (result instanceof Error) {
        setMessage(result.message);
        setTimeout(() => {
          navigate('/adm/ships');
        }, 5000);
      } else {
        setInformation([...information, data]);
        setLoading(false);
      }
    } else {
      const result = await InformationService.update(
        data.id,
        data,
      );
      if (result instanceof Error) {
        setMessage(result.message);
        setTimeout(() => {
          navigate('/adm/ships');
        }, 5000);
      } else {
        setInformation([
          ...information.filter(
            (item: any) => item.id !== data.id,
          ),
          data,
        ]);

        setLoading(false);
      }
    }
  };

  const handleNew = () => {
    setModalInfo(true);
    setInfoText('');

    setValue('id', null);
    setValue('info', '');
    setValue('datainfo', '');
  };

  const handleEdit = (
    info: string,
    datainfo: string,
    id: string,
  ) => {
    setModalInfo(true);

    setValue('id', Number(id));
    setValue('info', info);
    setValue('datainfo', datainfo);
  };

  const handlePage = (page: number) => {
    setLoading(true);
    InformationService.getAll(Number(imo), page).then(result => {
      setLoading(false);

      if (result instanceof Error) {
        console.error(result.message);
      } else {
        setInformation(result.data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setInfoShips(searchParams.get('ships') || '');
    setInfoIMO(searchParams.get('imo') || '');

    InformationService.getByShipImo(Number(imo)).then(
      (result: any) => {
        if (result instanceof Error) {
          setMessage(result.message);
          setTimeout(() => {
            navigate('/adm/ships');
          }, 5000);
        } else {
          setInformation(result);
          setModalInfo(false);
          setLoading(false);
        }
      },
    );
  }, []);

  return (
    <>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#modalInfo"
        onClick={() => handleNew()}
        className="btn btn-primary btn-sm"
      >
        Adicionar Informações
      </button>
      {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}
      {information.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">IMO</th>
              <th scope="col">Info</th>
              <th scope="col">Data Info</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {information.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td scope="row">{item.id}</td>
                  <td scope="row">{item.ships_imo}</td>
                  <td>{item.info.slice(0, 250)}...</td>
                  <td>{item.datainfo.slice(0, 250)}...</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-info"
                      onClick={() =>
                        handleEdit(
                          item.info,
                          item.datainfo,
                          item.id,
                        )
                      }
                    >
                      <i className="bi bi-pencil-square" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {loading && (
              <tr>
                <td colSpan={5}>
                  <Preloader />
                </td>
              </tr>
            )}
            {information.length > 0 && (
              <tr>
                <td colSpan={5}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(
                      information.length /
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
      )}

      {/*- Modal Information -*/}
      {modalInfo && (
        <Modal
          size="lg"
          show={modalInfo}
          data-keyboard="false"
          data-backdrop="static"
          onHide={() => setModalInfo(false)}
          aria-labelledby="modalInformationLabel"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <h5 id="modalInformationLabel">
                Informações - {infoShips} - IMO {infoIMO}
              </h5>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    {infoText !== '' && (
                      <Controller
                        name="id"
                        control={control}
                        render={({ field }) => (
                          <input {...field} type="hidden" />
                        )}
                      />
                    )}
                    <div className="mb-2">
                      <Controller
                        name="info"
                        control={control}
                        render={({ field }) => (
                          <textarea
                            rows={10}
                            {...field}
                            id="info"
                            className="form-control"
                            placeholder="Informe as informações"
                          />
                        )}
                      />
                    </div>
                    <div className="mt-3">
                      <Controller
                        name="datainfo"
                        control={control}
                        render={({ field }) => (
                          <textarea
                            rows={10}
                            {...field}
                            id="datainfo"
                            className="form-control"
                            placeholder="Informe Data informações"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setModalInfo(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Salvar
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Information;
