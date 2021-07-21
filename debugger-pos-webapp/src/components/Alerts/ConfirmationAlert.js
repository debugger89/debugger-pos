import React, { Component } from "react";

import { Modal, Badge, Button,  } from "react-bootstrap";

function ConfirmationAlert({ title, message, onOkFunc, onCancelFunc }) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
    onOkFunc();
  };
  const handleCancel = () => {
    setShow(false);
    onCancelFunc();
  };
  //const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={true}
        onHide={handleCancel}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-fill pull-right"
            variant="warning"
            onClick={handleClose}
          >
            Ok
          </Button>
          <Button
            className="btn-fill pull-right"
            variant="primary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationAlert;
