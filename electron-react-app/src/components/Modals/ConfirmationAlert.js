import React, { Component } from 'react'

import { Modal, Row, Button, Col } from 'react-bootstrap'

function ConfirmationAlert({ title, message, onOkFunc, onCancelFunc }) {
    const [show, setShow] = React.useState(true)

    const handleClose = () => {
        setShow(false)
        onOkFunc()
    }
    const handleCancel = () => {
        setShow(false)
        onCancelFunc()
    }
    //const handleShow = () => setShow(true);

    return (
        <>
            <Modal
                show={show}
                onHide={handleCancel}
                backdrop="static"
                keyboard={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Col md="6">
                            <Button
                                // className="btn btn-outline-danger"
                                variant="danger"
                                onClick={handleClose}
                            >
                                Proceed
                            </Button>
                        </Col>

                        <Col md="6">
                            <Button
                                // className="btn-fill pull-right"
                                variant="dark"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConfirmationAlert
