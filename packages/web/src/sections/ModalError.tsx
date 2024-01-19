import React from 'react';
import { Modal } from 'react-bootstrap';
import { ModalErrorProps } from '@csnvt/types';

const ModalError: React.FC<ModalErrorProps> = ({
  title,
  error,
  message,
  setError,
}) => {
  return (
    <Modal
      centered
      show={error}
      data-keyboard="false"
      data-backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>&nbsp;</p>
        <p>{message}</p>
        <p>&nbsp;</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setError(false)}
        >
          Fechar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalError;
