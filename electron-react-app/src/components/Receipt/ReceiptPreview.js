import React, { useRef } from 'react';
import { Row, Button, Col, Form } from 'react-bootstrap';
import Moment from 'react-moment';

const ReceiptPreview = React.forwardRef((props, ref) => (
  <div className="bill-preview-container" ref={ref}>
    <div id="invoice-preview">
      <center id="top">
        <img
          className="logo"
          alt="M&M Super"
          // src={require('../../assets/img/M_M Logo.png')}
          src={require('../../assets/img/M_M Logo.png').default}
        ></img>
        <div className="info">
          <h5>M&M Family Super</h5>
        </div>
        <Row>
          <Col md="12">
            <Row>
              <Col md="5">
                <p className="bill-meta-info">{'Invoice Date : '}</p>
              </Col>
              <Col md="7">
                <p className="bill-meta-info">
                  <Moment format="YYYY/MM/DD hh:mm A">{new Date()}</Moment>
                </p>
              </Col>
            </Row>
          </Col>
          <Col md="12">
            <Row>
              <Col md="3">
                <p className="bill-meta-info-header">Item</p>
              </Col>
              <Col md="3">
                <p className="bill-meta-info-header">U/Price</p>
              </Col>
              <Col md="3">
                <p className="bill-meta-info-header">Qty</p>
              </Col>
              <Col md="3">
                <p className="bill-meta-info-header">Price</p>
              </Col>
            </Row>
          </Col>
          <Col md="12">
            {props.saleContent.map((item, index) => {
              return (
                <div>
                  <Row>
                    <Col md="12">
                      <p className="bill-item-info">{item.name}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3"></Col>
                    <Col md="3">
                      <p className="bill-item-info">
                        {parseFloat(item.unitprice).toFixed(2)}
                      </p>
                    </Col>
                    <Col md="3">
                      <p className="bill-item-info">{item.units}</p>
                    </Col>
                    <Col md="3">
                      <p className="bill-item-info">
                        {parseFloat(item.price).toFixed(2)}
                      </p>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md="12">
            <p className="bill-summary-info">
              {'Number of Items : ' + props.saleContent.length}
            </p>
          </Col>
        </Row>
        <hr></hr>
      </center>
    </div>
  </div>
));

export default ReceiptPreview;
