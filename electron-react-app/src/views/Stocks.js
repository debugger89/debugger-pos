import React from 'react';

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Table,
  Container,
  Row,
  Col,
  InputGroup,
} from 'react-bootstrap';
import ConfirmationAlert from '../components/Modals/ConfirmationAlert';
import { InsertNewProductsPromise } from '../utils/InsertNewProductsPromise';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showAlert } from '../components/Modals/NotificationAlerts';
import { FetchAllProductsPromise } from '../utils/FetchAllProductsPromise';
import { UpdateStocksPromise } from '../utils/UpdateStocksPromise';

function Stocks() {
  const [productBarcode, setProductBarcode] = React.useState('');
  const [productName, setProductName] = React.useState('');
  const [purchasePrice, setPurchasePrice] = React.useState('');
  const [sellPrice, setSellPrice] = React.useState('');
  const [availableUnits, setAvailableUnits] = React.useState('');
  const [clearRequested, setClearRequested] = React.useState(false);
  const [purchaseDate, setPurchaseDate] = React.useState(
    new Date().toISOString().split('T')[0]
  );

  const [validated, setValidated] = React.useState(false);
  const [productList, setProductList] = React.useState([]);
  const [currentSelectedProduct, setCurrentSelectedProduct] = React.useState(
    null
  );

  const [searchProductBarcode, setSearchProductBarcode] = React.useState('');
  const [searchProductName, setSearchProductName] = React.useState('');

  function clearProductInformation() {
    setClearRequested(true);
  }
  function clearProductFields(proceed) {
    if (proceed) {
      console.log(productBarcode);
      setAvailableUnits('');
      setProductBarcode('');
      setProductName('');
      setPurchasePrice('');
      setSellPrice('');
      setPurchaseDate(new Date().toISOString().split('T')[0]);
      setCurrentSelectedProduct(null);
      getAllProducts();
    }
  }

  function confirmClear() {
    console.log('OK Closing!!!');
    clearProductFields(true);
    setClearRequested(false);
  }
  function cancelClear() {
    console.log('Cancel Closing!!!');
    clearProductFields(false);
    setClearRequested(false);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (currentSelectedProduct == null) {
        // this is a new product
        saveProduct();
      } else {
        //this is an existing product update
        updateProduct();
      }

      event.preventDefault();
    }

    setValidated(true);
  };

  function updateProduct() {
    var data = {};
    data.prodid = currentSelectedProduct.prodid;
    data.prodname = productName;
    data.prodbarcode = productBarcode;
    data.purchasecost = purchasePrice;
    data.sellprice = sellPrice;

    var stockdata = {};
    if (currentSelectedProduct.stockid != null) {
      stockdata.stockid = currentSelectedProduct.stockid;
    }
    stockdata.quantity = availableUnits;
    stockdata.purchasedate = purchaseDate;
    stockdata.productid = currentSelectedProduct.prodid;

    InsertNewProductsPromise(data)
      .then((response) => {
        // console.log('Response from DB : ' + JSON.stringify(response))
        showAlert('Product updated successfully!', 'success', 'Stocks');
      })
      .then(() => {
        UpdateStocksPromise(stockdata)
          .then((response) => {
            showAlert('Stock updated successfully!', 'success', 'Stocks');
          })
          .then(() => {
            getAllProducts();
          })
          .catch((err) => {
            showAlert(
              'Error occurred while trying to update the database. Error : ' +
                err,
              'error',
              'Stocks'
            );
          });
      })
      .catch((err) => {
        showAlert(
          'Error occurred while trying to update the database. Error : ' + err,
          'error',
          'Stocks'
        );
      });
  }

  function saveProduct() {
    var data = {};
    data.prodname = productName;
    data.prodbarcode = productBarcode;
    data.purchasecost = purchasePrice;
    data.sellprice = sellPrice;

    InsertNewProductsPromise(data)
      .then((response) => {
        // console.log('Response from DB : ' + JSON.stringify(response))
        showAlert('Product added successfully!', 'success', 'Stocks');
      })
      .then(() => {
        getAllProducts();
      })
      .catch((err) => {
        showAlert(
          'Error occurred while trying to insert data to database. Error : ' +
            err,
          'error',
          'Stocks'
        );
      });
  }

  function getAllProducts() {
    FetchAllProductsPromise()
      .then((response) => {
        // console.log('Response from DB : ' + JSON.stringify(response))
        setProductList(response);
      })
      .catch((err) => {
        showAlert(
          'Error occurred while trying to fetch data from database. Error : ' +
            err,
          'error',
          'Stocks'
        );
      });
  }

  function selectExistingProductRow(prodid) {
    let obj = productList.find((o, i) => {
      if (o.prodid === prodid) {
        productList[i].isSelected = true;
        setCurrentSelectedProduct(productList[i]);
        setProductBarcode(productList[i].prodbarcode);
        setProductName(productList[i].prodname);
        setPurchasePrice(productList[i].purchasecost);
        setSellPrice(productList[i].sellprice);
        setAvailableUnits(
          productList[i].quantity ? productList[i].quantity : ''
        );

        setPurchaseDate(
          productList[i].purchasedate
            ? productList[i].purchasedate.split('T')[0]
            : ''
        );
        console.log('ROW purchase date ' + productList[i].purchasedate);
      } else {
        productList[i].isSelected = false;
      }
    });
    console.log('Selected Row : ' + JSON.stringify(obj));
  }

  function searchForProduct() {
    console.log(
      'searchProductBarcode, searchProductName : ' +
        searchProductBarcode +
        ', ' +
        searchProductName
    );
    FetchAllProductsPromise()
      .then((response) => {
        setProductList(response);
        return response;
      })
      .then((response) => {
        var filteredList = [];
        if (searchProductBarcode && !searchProductName) {
          // search by barcode
          response.find((o, i) => {
            if (o.prodbarcode === searchProductBarcode) {
              filteredList.push(o);
            }
          });
        } else if (!searchProductBarcode && searchProductName) {
          // search by name
          response.find((o, i) => {
            if (
              o.prodname.toLowerCase().includes(searchProductName.toLowerCase())
            ) {
              filteredList.push(o);
            }
          });
        } else if (!searchProductBarcode && !searchProductName) {
          console.log('both empty. reset : ' + JSON.stringify(response));
          setProductList(productList);
        }
        setProductList(filteredList);
      })
      .catch((err) => {
        showAlert(
          'Error occurred while trying to fetch data from database. Error : ' +
            err,
          'error',
          'Stocks'
        );
      });
  }

  React.useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <ToastContainer
        enableMultiContainer
        containerId={'Stocks'}
        position={toast.POSITION.TOP_RIGHT}
      />
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
                        <Col md="12">
                          <a
                            href="/"
                            onClick={(e) => {
                              e.preventDefault();
                              getAllProducts();
                            }}
                          >
                            <div className="add-stock-icon">
                              <p>
                                <i className="fas fa-undo-alt"></i>
                                {' Reset Search'}
                              </p>
                            </div>
                          </a>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-1" md="12">
                          <Form.Group>
                            <label>PRODUCT BARCODE</label>
                            <Form.Control
                              placeholder="Barcode"
                              type="text"
                              autoFocus
                              value={searchProductBarcode}
                              onChange={(e) => {
                                setSearchProductBarcode(e.target.value);
                                setSearchProductName('');
                              }}
                              onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                  searchForProduct();
                                }
                              }}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="12">
                          <Form.Group>
                            <label>PRODUCT NAME</label>
                            <Form.Control
                              placeholder="Product name"
                              type="text"
                              value={searchProductName}
                              onChange={(e) => {
                                setSearchProductName(e.target.value);
                                setSearchProductBarcode('');
                              }}
                              onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                  searchForProduct();
                                }
                              }}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </Col>

                  <Col md="12">
                    <div className="scrollable-div">
                      <Table className="table-hover table-striped">
                        <thead>
                          <tr>
                            <th className="border-0">Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productList.map((product, index) => {
                            return (
                              <tr
                                key={index}
                                className={
                                  product.isSelected === true ? 'bg-info' : null
                                }
                                onClick={() =>
                                  selectExistingProductRow(product.prodid)
                                }
                              >
                                <td>
                                  {product.prodname +
                                    ' | ' +
                                    product.sellprice +
                                    ' LKR'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
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
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                            <i className="fas fa-plus-circle"></i>
                            {' Add New Product'}
                          </p>
                        </div>
                      </a>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="validationCustom01">
                        <label>
                          Product Barcode{' '}
                          <label className="text-danger">*</label>
                        </label>
                        <Form.Control
                          placeholder="Barcode"
                          type="text"
                          value={productBarcode}
                          required
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
                          required={true}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>
                          Purchase Price per unit{' '}
                          <label className="text-danger">*</label>
                        </label>
                        <Form.Control
                          type="number"
                          required={true}
                          value={purchasePrice}
                          onChange={(e) => setPurchasePrice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>
                          Sell Price per unit{' '}
                          <label className="text-danger">*</label>
                        </label>
                        <Form.Control
                          type="number"
                          required={true}
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
                          Available Stock Units{' '}
                          <label className="text-danger">*</label>
                        </label>
                        <Form.Control
                          type="number"
                          required={true}
                          value={availableUnits}
                          onChange={(e) => setAvailableUnits(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Purchase Date</label>
                        <Form.Control
                          type="date"
                          value={purchaseDate}
                          onChange={(e) => {
                            console.log('Purchase Date : ' + e.target.value);
                            setPurchaseDate(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="warning"
                    size="sm"
                    // onClick={(e) => saveProduct()}
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
            title="Confirmation?"
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
