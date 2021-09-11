import React from 'react';

import { Modal, Row, Button, Col, FormControl, Form } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import { FetchAllProductsPromise } from '../../utils/FetchAllProductsPromise';
import { showAlert } from '../../components/Modals/NotificationAlerts';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import { ProductSearchBar } from '../Search/ProductSearchBar';
import { toast, ToastContainer } from 'react-toastify';

function SearchSaleProductModal({ onOkFunc, tabId, onCancelFunc }) {
  // const [modalShow, setModalShow] = React.useState(true)

  const [productList, setProductList] = React.useState([]);

  var selectedProduct = React.useRef();

  const columns = [
    {
      dataField: 'prodbarcode',
      text: 'Product Barcode',
      headerStyle: () => {
        return { width: '20%' };
      },
    },
    {
      dataField: 'prodname',
      text: 'Product Name',
      headerStyle: () => {
        return { width: '50%' };
      },
    },
    {
      dataField: 'sellprice',
      text: 'Price/Unit',
      headerStyle: () => {
        return { width: '15%' };
      },
      searchable: false,
    },
    {
      dataField: 'remainingstock',
      text: 'Remaining Stock Units',
      headerStyle: () => {
        return { width: '10%' };
      },
      searchable: false,
    },
  ];

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
          'SearchSaleProductModal'
        );
      });
  }

  function selectProductToAdd() {
    let addRequested = selectedProduct.selectionContext.selected;
    let allAddingRows = productList.filter((e) =>
      addRequested.includes(e.stockid)
    );
    // console.log('Selected to be added : ' + JSON.stringify(allAddingRows))
    onOkFunc(allAddingRows);
  }

  React.useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Modal
        show={true}
        onHide={() => {
          //setModalShow(false)
          //onOkFunc()
        }}
        size="xl"
        // dialogClassName="product-search-dialog"
      >
        <ToastContainer
          enableMultiContainer
          containerId={'SearchSaleProductModal'}
          position={toast.POSITION.TOP_RIGHT}
        />
        <Modal.Body>
          <Row>
            <Col md="12">
              <h2>Search Product</h2>
            </Col>
          </Row>

          <Row>
            <Col>
              <ToolkitProvider
                keyField="stockid"
                data={productList}
                columns={columns}
                search
              >
                {(props) => (
                  <div>
                    <Row>
                      <Col>
                        <ProductSearchBar
                          {...props.searchProps}
                        ></ProductSearchBar>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BootstrapTable
                          {...props.baseProps}
                          striped
                          hover
                          condensed
                          selectRow={{
                            mode: 'radio',
                            clickToSelect: true,
                          }}
                          ref={(n) => (selectedProduct = n)}
                        ></BootstrapTable>
                      </Col>
                    </Row>
                  </div>
                )}
              </ToolkitProvider>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <Button
                //size="sm"
                variant="secondary"
                onClick={onCancelFunc}
              >
                Close Search
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                //size="sm"
                variant="primary"
                onClick={(e) => selectProductToAdd()}
              >
                Add Selected
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchSaleProductModal;
