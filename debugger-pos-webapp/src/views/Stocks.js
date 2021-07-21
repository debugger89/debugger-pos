import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Table,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import ConfirmationAlert from "../components/Alerts/ConfirmationAlert";
import { DBConnector } from "../utils/DBConnector";

var remote;

function Stocks() {
  const [productBarcode, setProductBarcode] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [purchasePrice, setPurchasePrice] = React.useState("");
  const [sellPrice, setSellPrice] = React.useState("");
  const [availableUnits, setAvailableUnits] = React.useState("");
  const [clearRequested, setClearRequested] = React.useState(false);

  const [conn,setConn] = React.useState(undefined); 

  function clearProductInformation() {
    setClearRequested(true);
  }
  function clearProductFields(proceed) {
    if (proceed) {
      console.log(productBarcode);
      setAvailableUnits("");
      setProductBarcode("");
      setProductName("");
      setPurchasePrice("");
      setSellPrice("");
    }
  }

  function confirmClear() {
    console.log("OK Closing!!!");
    clearProductFields(true);
    setClearRequested(false);
  }
  function cancelClear() {
    console.log("Cancel Closing!!!");
    clearProductFields(false);
    setClearRequested(false);
  }

  function connection(){
    var mysql      = remote.require('mysql');
    var connection = mysql.createPool({
      host     : 'localhost',
      user     : 'root',
      password : '1qaz2wsx@',
      database : 'debuggerpos'
    });
    
    connection.getConnection(function(err, connection) {
      // connected! (unless `err` is set)
    });
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
    });
    
    connection.end();
  }

  function saveProduct(){
    console.log("Saving...")
    connection()
    //var c = DBConnector();
    console.log("Connected...")
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Search Stocks</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="12">
                    <Form>
                      <Row>
                        <Col className="px-1" md="12">
                          <Form.Group>
                            <label>PRODUCT BARCODE</label>
                            <Form.Control
                              placeholder="Barcode"
                              type="text"
                              autoFocus
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="12">
                          <Form.Group>
                            <label>PRODUCT NAME</label>
                            <Form.Control
                              placeholder="Product name"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </Col>

                  <Col md="12">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-info">
                          <td>
                            dawew rerewr erewr ewr werwe rew rew r ewrwerrewr
                            rerr rwerwe{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            dawew rerewr erewr ewr werwe rew rew r ewrwerrewr
                            rerr rwerwe{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            dawew rerewr erewr ewr werwe rew rew r ewrwerrewr
                            rerr rwerwe{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            dawew rerewr erewr ewr werwe rew rew r ewrwerrewr
                            rerr rwerwe{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            dawew rerewr erewr ewr werwe rew rew r ewrwerrewr
                            rerr rwerwe{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            dawew rerewr erewr ewr werwe rew rew r ewrwerrewr
                            rerr rwerwe{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            dawew rerewr erewr ewr werwe rew rew r ewrwerrewr
                            rerr rwerwe{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            dawew rerewr erewr ewr werwe rew rew r ewrwerrewr
                            rerr rwerwe{" "}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add/Edit Stocks</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="6">
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          clearProductInformation();
                        }}
                      >
                        <div className="add-stock-icon">
                          <p>
                            <i class="fas fa-plus-circle"></i>
                            {" Add New Product"}
                          </p>
                        </div>
                      </a>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>
                          Product Barcode{" "}
                          <label className="text-danger">*</label>
                        </label>
                        <Form.Control
                          placeholder="Barcode"
                          type="text"
                          value={productBarcode}
                          required="true"
                          onChange={(e) => setProductBarcode(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>
                          Product Name <label className="text-danger">*</label>
                        </label>
                        <Form.Control
                          placeholder="Product Name"
                          type="text"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          required="true"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>
                          Purchase Price per unit{" "}
                          <label className="text-danger">*</label>
                        </label>
                        <Form.Control
                          type="number"
                          required="true"
                          value={purchasePrice}
                          onChange={(e) => setPurchasePrice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>
                          Sell Price per unit{" "}
                          <label className="text-danger">*</label>
                        </label>
                        <Form.Control
                          type="number"
                          required="true"
                          value={sellPrice}
                          onChange={(e) => setSellPrice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>
                          Available Stock Units{" "}
                          <label className="text-danger">*</label>
                        </label>
                        <Form.Control
                          type="number"
                          required="true"
                          value={availableUnits}
                          onChange={(e) => setAvailableUnits(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className="btn-fill pull-right"
                    //type="submit"
                    variant="warning"
                    size="sm"
                    onClick={(e) => saveProduct()}
                  >
                    Save Product
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {clearRequested && (
          <ConfirmationAlert
            title="Confirmation!"
            message="Do you want to clear the form?"
            onOkFunc={confirmClear}
            onCancelFunc={cancelClear}
          ></ConfirmationAlert>
        )}
      </Container>
    </>
  );
}

export default Stocks;
