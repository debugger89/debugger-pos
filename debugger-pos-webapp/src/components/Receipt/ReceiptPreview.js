import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { Row, Button, Col, Form } from 'react-bootstrap'
import Moment from 'react-moment'

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
                                <p className="bill-meta-info">
                                    {'Invoice Date : '}
                                </p>
                            </Col>
                            <Col md="7">
                                <p className="bill-meta-info">
                                    <Moment format="YYYY/MM/DD hh:mm A">
                                        {new Date()}
                                    </Moment>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="12">
                        <Row>
                            <Col md="5">
                                <p className="bill-meta-info">
                                    {'Invoice # : '}
                                </p>
                            </Col>
                            <Col md="7">
                                <p className="bill-meta-info">
                                    {props.invoiceNumber}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr></hr>
            </center>
        </div>
    </div>
))

export default ReceiptPreview
