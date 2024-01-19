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
import { IHistory, IHistoryProps } from '@csnvt/types';
import { HistoryService } from '@csnvt/services/api/history/HistoryService';

import { Pagination } from '../../../sections';
import Preloader from '../../../components/Preloader';

const History: React.FC<IHistoryProps> = ({
  hitIMO,
  hitShips,
  setHitIMO,
  setHitShips,
}) => {
  const [hitText, setHitText] = useState('');
  const [message, setMessage] = useState('');

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalHit, setModalHit] = useState(false);

  const [searchParams] = useSearchParams();
  const { imo } = useParams<'imo'>();
  const navigate = useNavigate();

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina')) || 1;
  }, [searchParams]);

  const { control, setValue, handleSubmit } = useForm<IHistory>({
    defaultValues: {
      id: null,
      historic: '',
      ships_imo: Number(imo),
    },
  });

  const onSubmit = async (data: IHistory) => {
    setLoading(true);
    setModalHit(false);

    if (data.id === null) {
      const result = await HistoryService.create(data);
      if (result instanceof Error) {
        setMessage(result.message);
        setTimeout(() => {
          navigate('/adm/ships');
        }, 5000);
      } else {
        setHistory([...history, data]);
        setLoading(false);
      }
    } else {
      const result = await HistoryService.update(data.id, data);
      if (result instanceof Error) {
        setMessage(result.message);
        setTimeout(() => {
          navigate('/adm/ships');
        }, 5000);
      } else {
        setHistory([
          ...history.filter((item: any) => item.id !== data.id),
          data,
        ]);

        setLoading(false);
      }
    }
  };

  const handleNew = () => {
    setModalHit(true);
    setHitText('');

    setValue('id', null);
    setValue('historic', '');
  };

  const handleEdit = (historic: string, id: string) => {
    setModalHit(true);

    setValue('id', Number(id));
    setValue('historic', historic);
  };

  const handlePage = (page: number) => {
    setLoading(true);
    HistoryService.getAll(Number(imo), page).then(result => {
      setLoading(false);

      if (result instanceof Error) {
        console.error(result.message);
      } else {
        setHistory(result.data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setHitShips(searchParams.get('ships') || '');
    setHitIMO(searchParams.get('imo') || '');

    HistoryService.getByShipImo(Number(imo)).then(
      (hitresult: any) => {
        if (hitresult instanceof Error) {
          setMessage(hitresult.message);
          setTimeout(() => {
            navigate('/adm/ships');
          }, 5000);
        } else {
          setHistory(hitresult);
          setModalHit(false);
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
        data-bs-target="#modalHistory"
        onClick={() => handleNew()}
        className="btn btn-primary btn-sm"
      >
        Adicionar Historico
      </button>
      {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}
      {history.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">IMO</th>
              <th scope="col">Historico</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {history.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td scope="row">{item.id}</td>
                  <td scope="row">{item.ships_imo}</td>
                  <td>{item.historic.slice(0, 150)}...</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-info"
                      onClick={() =>
                        handleEdit(item.historic, item.id)
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
            {history.length > 0 && (
              <tr>
                <td colSpan={5}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(
                      history.length / Environment.LINE_LIMIT,
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

      {/*- Modal History -*/}
      {modalHit && (
        <Modal
          size="lg"
          show={modalHit}
          data-keyboard="false"
          data-backdrop="static"
          onHide={() => setModalHit(false)}
          aria-labelledby="modalHistoryLabel"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <h5 id="modalHistoryLabel">
                Historico - {hitShips} - IMO {hitIMO}
              </h5>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    {hitText !== '' && (
                      <Controller
                        name="id"
                        control={control}
                        render={({ field }) => (
                          <input {...field} type="hidden" />
                        )}
                      />
                    )}

                    <Controller
                      name="historic"
                      control={control}
                      render={({ field }) => (
                        <textarea
                          rows={10}
                          {...field}
                          id="historic"
                          className="form-control"
                          placeholder="Informe o historico do navio"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setModalHit(false)}
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

export default History;
