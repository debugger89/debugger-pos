import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import { ProductSearchBarDuplicateBarcode } from '../Search/ProductSearchBarDuplicateBarcode';

import { Modal, Row, Button, Col } from 'react-bootstrap';
// import PosPrinter from

function DuplicateBarcodeSelectionModal({
  onOkFunc,
  onCancelFunc,
  tabId,
  productList,
}) {
  const [modalShow, setModalShow] = React.useState(true);
  const handleClose = () => {
    setModalShow(false);
    onCancelFunc();
  };
  var selectedProduct = React.useRef();

  const columns = [
    {
      dataField: 'prodname',
      text: 'Product Name',
      headerStyle: () => {
        return { width: '70%' };
      },
    },
    {
      dataField: 'sellprice',
      text: 'Price/Unit',
      headerStyle: () => {
        return { width: '30%' };
      },
    },
  ];

  function selectProductToAdd() {
    let addRequested = selectedProduct.selectionContext.selected;
    let allAddingRows = productList.filter((e) =>
      addRequested.includes(e.stockid)
    );
    // console.log('Selected to be added : ' + JSON.stringify(allAddingRows))
    onOkFunc(allAddingRows);
  }

  return (
    <>
      <Modal show={modalShow} size="xl" onHide={handleClose}>
        <Modal.Body>
          <Row>
            <Col md="12">
              <h2>Duplicate Product Barcode</h2>
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
                        <ProductSearchBarDuplicateBarcode
                          {...props.searchProps}
                        ></ProductSearchBarDuplicateBarcode>
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
                onClick={handleClose}
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

export default DuplicateBarcodeSelectionModal;
