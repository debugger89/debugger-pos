import React, { useRef, useCallback } from 'react';
// import PrintReceipt from '../../utils/PrinterWorker'

import { Modal, Row, Button, Col, Form } from 'react-bootstrap';
import ReceiptPreview from '../Receipt/ReceiptPreview';
import { showAlert } from '../Modals/NotificationAlerts';
import { toast, ToastContainer } from 'react-toastify';

import {
  prepareReceiptForPrint,
  printReceipt,
} from '../../utils/PrinterWorker';
import { UIStore } from '../../utils/UIStore';
import { InsertNewSaleDataPromise } from '../../utils/InsertNewSaleDataPromise';

// const { ipcRenderer } = require('electron');

function PaySaleModal({ onOkFunc, tabId, onCancelFunc, saleTotal }) {
  const [modalShow, setModalShow] = React.useState(true);
  const [receivedAmount, setReceivedAmount] = React.useState(0);
  const saleContent = UIStore.useState((s) => s.saleContent);

  const handleClose = () => {
    setModalShow(false);
    onCancelFunc();
  };

  function handlePrint() {
    let currentRows = saleContent.get(tabId);

    console.log('Before Print :: saleContents : ' + JSON.stringify(currentRows));
    console.log('Before Print :: saleTotal : ' + saleTotal);

    InsertNewSaleDataPromise(currentRows, saleTotal)
      .then((response) => {
        console.log('Response from DB : ' + JSON.stringify(response));
        showAlert('Sale info saved successfully!', 'success', 'PaySaleModal');
      })
      .then(() => {
        let printData = prepareReceiptForPrint(currentRows);
        printReceipt(printData);
      })
      .catch((err) => {
        showAlert(
          'Error occurred while trying to update the database. Error : ' + err,
          'error',
          'PaySaleModal'
        );
      });
  }

  return (
    <>
      <Modal show={modalShow} onHide={handleClose} size="xl">
        <ToastContainer
          enableMultiContainer
          containerId={'PaySaleModal'}
          position={toast.POSITION.TOP_RIGHT}
        />
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
                      {'Rs. ' + parseFloat(saleTotal).toFixed(2)}
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
                        onFocus={(e) => e.target.select()}
                        onChange={(e) =>
                          setReceivedAmount(
                            e.target.value >= 0
                              ? e.target.value
                              : parseFloat(e.target.value).toFixed(2)
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
                          parseFloat(receivedAmount - saleTotal).toFixed(2)}
                      </h1>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md="6" className="border-left">
              <ReceiptPreview
                saleContent={saleContent.get(tabId)}
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
                onClick={(e) => handlePrint()}
              >
                <i className="fas fa-print"></i>
                {'  Print Receipt'}
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PaySaleModal;
