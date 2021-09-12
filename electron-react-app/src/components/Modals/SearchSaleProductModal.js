import React from 'react';

import { Modal, Row, Button, Col, FormControl, Form } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import { FetchAllProductsPromise } from '../../utils/FetchAllProductsPromise';
import { showAlert } from '../../components/Modals/NotificationAlerts';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import { ProductSearchBar } from '../Search/ProductSearchBar';
import { toast, ToastContainer } from 'react-toastify';
import paginationFactory from 'react-bootstrap-table2-paginator';

function SearchSaleProductModal({ onOkFunc, tabId, onCancelFunc }) {


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

  const paginationOptions = {
    sizePerPageList: [
      {
        text: '10',
        value: 10,
      },
      {
        text: '20',
        value: 20,
      },
      {
        text: '30',
        value: 30,
      },
    ],
  };

  const rowDoubleClickEvent = {
    onDoubleClick: (e, row, rowIndex) => {
      // console.log('Double clicked on Row : ' + JSON.stringify(row));
      // setSelectedSale(row);
      // setShowSelectedSale(true);
      selectProductToAdd();
    },
  };

  function getAllProducts() {
    FetchAllProductsPromise()
      .then((response) => {
        // console.log('Response from DB AllProducts: ' + JSON.stringify(response))
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
      addRequested.includes(e.uuid)
    );
    console.log('Selected to be added : ' + JSON.stringify(allAddingRows))
    onOkFunc(allAddingRows);
  }

  React.useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Modal
        show={true}
        onHide={onCancelFunc}
        size="xl"
        centered
        aria-labelledby="contained-modal-title-vcenter"
        // dialogClassName="product-search-dialog"
      >
        <Modal.Body>

          <Row>
            <Col md="12">
              <h2>Search Product</h2>
            </Col>
          </Row>

          <Row>
            <Col>
              <ToolkitProvider
                keyField="uuid"
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
                          pagination={paginationFactory(paginationOptions)}
                          {...props.baseProps}
                          striped
                          hover
                          condensed
                          selectRow={{
                            mode: 'radio',
                            clickToSelect: true,
                          }}
                          ref={(n) => (selectedProduct = n)}
                          rowEvents={rowDoubleClickEvent}
                        ></BootstrapTable>
                      </Col>
                    </Row>
                  </div>
                )}
              </ToolkitProvider>
            </Col>
          </Row>
          <ToastContainer
            enableMultiContainer
            containerId={'SearchSaleProductModal'}
            position={toast.POSITION.TOP_RIGHT}
          />
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
