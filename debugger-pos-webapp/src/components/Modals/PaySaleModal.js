import React, { useRef } from 'react'
// import PrintReceipt from '../../utils/PrinterWorker'

import { Modal, Row, Button, Col, Form } from 'react-bootstrap'
import ReceiptPreview from '../Receipt/ReceiptPreview'
import { useReactToPrint } from 'react-to-print'

function PaySaleModal({ onOkFunc, tabId, onCancelFunc, saleTotal }) {
    const [modalShow, setModalShow] = React.useState(true)
    const [receivedAmount, setReceivedAmount] = React.useState(0)
    const handleClose = () => {
        setModalShow(false)
        onCancelFunc()
    }

    const handlePrint = useReactToPrint({
        content: () => billPreviewRef.current,
    })

    const billPreviewRef = useRef()

    return (
        // <>
        //     <Modal show={true}>
        //         <Modal.Body>SSSSSS SSS SS</Modal.Body>
        //     </Modal>
        // </>
        <>
            <Modal show={modalShow} onHide={handleClose} size="xl">
                <Modal.Body>
                    <Row>
                        <Col md="6">
                            <div className="bill-preview-container">
                                <Row>
                                    <Col md="12">
                                        <h4 className="payment-modal-payment-balance">
                                            Total Sale Amount:
                                        </h4>
                                        <h2 className="payment-modal-payment-balance">
                                            {'Rs. ' + saleTotal}
                                        </h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <Form.Group controlId="validationCustom01">
                                            <label>Received Amount</label>
                                            <Form.Control
                                                placeholder="Received"
                                                type="text"
                                                autoFocus
                                                value={receivedAmount}
                                                onFocus={(e) =>
                                                    e.target.select()
                                                }
                                                onChange={(e) =>
                                                    setReceivedAmount(
                                                        e.target.value >= 0
                                                            ? e.target.value
                                                            : parseFloat(
                                                                  e.target.value
                                                              )
                                                    )
                                                }
                                            ></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <Form.Group controlId="validationCustom01">
                                            <h4 className="payment-modal-payment-balance">
                                                Balance:
                                            </h4>
                                            <h1 className="payment-modal-payment-balance">
                                                {'Rs. ' +
                                                    (receivedAmount -
                                                        saleTotal)}
                                            </h1>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col md="6" className="border-left">
                            <ReceiptPreview
                                ref={billPreviewRef}
                                invoiceNumber="12345687"
                            ></ReceiptPreview>
                        </Col>
                    </Row>

                    <Row>
                        <br />
                    </Row>

                    <Row>
                        <Col className="center-col">
                            <Button
                                variant="secondary"
                                // size="sm"
                                onClick={handleClose}
                            >
                                {'  Cancel'}
                            </Button>
                        </Col>

                        <Col className="center-col">
                            <Button
                                variant="primary"
                                // size="sm"
                                //onClick={(e) => PrintReceipt()}
                                onClick={handlePrint}
                            >
                                <i className="fas fa-print"></i>
                                {'  Print Receipt'}
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PaySaleModal
