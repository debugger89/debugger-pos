import React from 'react';

import { Container, Row, Button, Col, Modal, Form } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { UIStore } from '../../utils/UIStore';
import uuid from 'uuid';
import SearchSaleProductModal from '../Modals/SearchSaleProductModal';
import PaySaleModal from '../Modals/PaySaleModal';

import useScanDetection from 'use-scan-detection';
import { FetchBarcodeProductPromise } from '../../utils/FetchBarcodeProductPromise';
import DuplicateBarcodeSelectionModal from '../Modals/DuplicateBarcodeSelectionModal';

function SaleTabContent({ tabId }) {
  const [searchProductRequested, setSearchProductRequested] = React.useState(
    false
  );

  const [paymentRequested, setPaymentRequested] = React.useState(false);
  const [selectDuplicateItem, setSelectDuplicateItem] = React.useState(false);
  const [duplicatedProductItems, setDuplicatedProductItems] = React.useState(
    []
  );

  var selectedRows = React.useRef();
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const currentTabKey = UIStore.useState((s) => s.currentTabKey);

  const columns = [
    {
      dataField: 'name',
      text: 'Product Name',
      headerStyle: () => {
        return { width: '50%' };
      },
      footer: '',
    },
    {
      dataField: 'units',
      text: 'Units',
      headerStyle: () => {
        return { width: '10%' };
      },
      footer: '',
    },
    {
      dataField: 'unitprice',
      text: 'Price/Unit',
      headerStyle: () => {
        return { width: '15%' };
      },
      footer: 'Total :',
    },
    {
      dataField: 'price',
      text: 'Price',
      headerStyle: () => {
        return { width: '20%' };
      },
      footer: (columnData) =>
        columnData.reduce((acc, item) => parseFloat(acc) + parseFloat(item), 0),
      footerStyle: {
        backgroundColor: '#81c784',
      },
    },
  ];

  const saleContent = UIStore.useState((s) => s.saleContent);

  function addNewRow() {
    var emptyRowData = {
      id: uuid(),
      productid : -1,
      name: 'Custom',
      unitprice: 0,
      units: 1,
      price: 0,
    };

    //console.log('A: ' + JSON.stringify(saleContent))
    var currentRows = saleContent.get(currentTabKey);
    //console.log('B: ' + JSON.stringify(currentRows))
    if (currentRows === undefined) {
      UIStore.update((s) => {
        s.saleContent = s.saleContent.set(currentTabKey, [emptyRowData]);
      });
    } else {
      currentRows = [...currentRows, emptyRowData];
      UIStore.update((s) => {
        s.saleContent = s.saleContent.set(currentTabKey, currentRows);
      });
    }
  }

  function deleteSelectedRow() {
    let removeRequested = selectedRows.selectionContext.selected;
    console.log(removeRequested);
    let allRows = saleContent.get(currentTabKey);
    if (allRows !== undefined) {
      allRows = allRows.filter((e) => !removeRequested.includes(e.id));
      UIStore.update((s) => {
        s.saleContent = s.saleContent.set(currentTabKey, allRows);
      });
    }
  }

  function finishSearch(selectedItemsToAdd) {
    console.log('Incoming Items:: ' + JSON.stringify(selectedItemsToAdd));
    console.log('Existing Items:: ' + JSON.stringify(saleContent));

    let newProdArr =
      saleContent.get(currentTabKey) === undefined
        ? []
        : saleContent.get(currentTabKey);

    for (var i = 0; i < selectedItemsToAdd.length; i++) {
      var newProdAdded = {
        id: uuid(),
        productid : selectedItemsToAdd[i].productid,
        name: selectedItemsToAdd[i].prodname,
        unitprice: selectedItemsToAdd[i].sellprice,
        units: 1,
        price: parseFloat(selectedItemsToAdd[i].sellprice) * 1,
      };
      newProdArr = [...newProdArr, newProdAdded];
    }

    console.log('Updated Items:: ' + JSON.stringify(newProdArr));

    UIStore.update((s) => {
      s.saleContent = s.saleContent.set(currentTabKey, newProdArr);
    });
    setSearchProductRequested(false);
    setSelectDuplicateItem(false);
  }

  function cancelSearch() {
    setSearchProductRequested(false);
    setSelectDuplicateItem(false);
  }

  function searchForItemManually() {
    console.log(
      'CTRL+1 Captured in ' + tabId + ' Current tab is : ' + currentTabKey
    );
    if (tabId === currentTabKey) {
      console.log('Opening the modal from ' + tabId);
      setSearchProductRequested(true);
    }
  }

  function cellValueEdited(oldValue, newValue, row, column) {
    row.price = row.unitprice * row.units;
    console.log(
      'SALE COntent : ' + JSON.stringify(saleContent.get(currentTabKey))
    );
    let updatedSaleContent = [];
    for (let i = 0; i < saleContent.get(currentTabKey).length; i++) {
      let id = saleContent.get(currentTabKey)[i];
      if (id === row.id) {
        updatedSaleContent = [...updatedSaleContent, row];
      } else {
        updatedSaleContent = [
          ...updatedSaleContent,
          saleContent.get(currentTabKey)[i],
        ];
      }
    }
    console.log('Updated SALE Content : ' + JSON.stringify(updatedSaleContent));

    UIStore.update((s) => {
      s.saleContent = s.saleContent.set(currentTabKey, updatedSaleContent);
    });
    forceUpdate();
  }

  function calculateSaleTotal() {
    let saleRows = saleContent.get(currentTabKey);
    let grandTotal = 0;
    if (saleRows) {
      saleRows.forEach((row, i) => (grandTotal += row.price));
    }

    return grandTotal;
  }

  useScanDetection({
    onComplete: (code) => {
      console.log('BARCODE EURAKA!!! : ' + code);
    },
  });

  function addNewThroughBarcode(barcode) {
    console.log('Calling the DB for barcode');
    FetchBarcodeProductPromise({ prodbarcode: barcode })
      .then((response) => {
        console.log('Response from DB : ' + JSON.stringify(response));
        if (response.length === 1) {
          console.log('Only 1 barcode is found in db. COUNT : ');
          finishSearch(response);
        } else if (response.length === 0) {
          console.log(
            'Less than 1 barcode is found in db. COUNT : ' + response.length
          );
        } else {
          console.log(
            'More than 1 barcode is found in db. COUNT : ' + response.length
          );
          setSelectDuplicateItem(true);
          setDuplicatedProductItems(response);
        }
      })
      .catch((err) => {
        console.log('ERROR from DB : ' + JSON.stringify(err));
        // showAlert(
        //     'Error occurred while trying to fetch data from database. Error : ' +
        //         err,
        //     'error'
        // )
      });
  }

  React.useEffect(() => {
    // Add the Ctrl+1 Shortcut for search items
    document.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.key === '1') {
        searchForItemManually();
      }
    });
    // console.log('CTRL+1 Lister added')
  }, []);

  return (
    <>
      <Container fluid>
        {/* <p>{JSON.stringify(saleContent.get(tabId))}</p> */}
        <BootstrapTable
          keyField="id"
          data={
            saleContent.get(currentTabKey) ? saleContent.get(currentTabKey) : []
          }
          columns={columns}
          selectRow={{ mode: 'checkbox' }}
          tabIndexCell
          cellEdit={cellEditFactory({
            mode: 'click',
            autoSelectText: true,
            blurToSave: true,
            afterSaveCell: (oldValue, newValue, row, column) => {
              cellValueEdited(oldValue, newValue, row, column);
            },
          })}
          ref={(n) => (selectedRows = n)}
        />
        <br />
        <br />

        <Row>
          <Col md="6">
            <Row>
              <Col md="4">
                <Button
                  variant="danger"
                  //size="sm"
                  onClick={(e) => deleteSelectedRow()}
                >
                  <i className="fas fa-minus-circle"></i>
                  {' Delete Row'}
                </Button>
              </Col>
              <Col md="4">
                <Button
                  variant="primary"
                  //size="sm"
                  onClick={(e) => addNewRow()}
                >
                  <i className="fas fa-plus-circle"></i> {' Add Empty'}
                </Button>
              </Col>
              <Col md="4">
                <Button
                  variant="primary"
                  //size="sm"
                  onClick={(e) => searchForItemManually()}
                >
                  <i className="fas fa-search-plus"></i>
                  {' Search Item'}
                </Button>
              </Col>
            </Row>
          </Col>
          <Col md="6" className="sale-screen-pay-col">
            <Button
              variant="warning"
              className="btn-fill pull-right"
              onClick={(e) => addNewThroughBarcode('1234')}
            >
              MIMIC BARCODE
            </Button>
            <Button
              variant="success"
              className="btn-fill pull-right"
              onClick={(e) => setPaymentRequested(true)}
            >
              <i className="fas fa-money-check-alt"></i>
              {' Pay'}
            </Button>
          </Col>
        </Row>
        {searchProductRequested && (
          <SearchSaleProductModal
            onOkFunc={finishSearch}
            onCancelFunc={cancelSearch}
            tabId={tabId}
          ></SearchSaleProductModal>
        )}

        {paymentRequested && (
          <PaySaleModal
            onOkFunc={finishSearch}
            onCancelFunc={(e) => setPaymentRequested(false)}
            tabId={tabId}
            saleTotal={calculateSaleTotal()}
          ></PaySaleModal>
        )}
        {selectDuplicateItem && (
          <DuplicateBarcodeSelectionModal
            onOkFunc={finishSearch}
            onCancelFunc={cancelSearch}
            tabId={tabId}
            productList={duplicatedProductItems}
          ></DuplicateBarcodeSelectionModal>
        )}
      </Container>
    </>
  );
}

export default SaleTabContent;
