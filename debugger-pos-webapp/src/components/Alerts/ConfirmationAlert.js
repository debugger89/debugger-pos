/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, { Component } from "react";

import { Modal, Badge, Button, Form } from "react-bootstrap";

import sideBarImage1 from "../../assets/img/sidebar-1.jpg";
import sideBarImage2 from "../../assets/img/sidebar-2.jpg";
import sideBarImage3 from "../../assets/img/sidebar-3.jpg";
import sideBarImage4 from "../../assets/img/sidebar-4.jpg";

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
