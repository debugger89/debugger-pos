import React from 'react';

import { Modal, Row, Button, Col, FormControl, Form } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import { FetchAllProductsPromise } from '../../utils/FetchAllProductsPromise';
import { showAlert } from './NotificationAlerts';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import { ProductSearchBar } from '../Search/ProductSearchBar';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { FetchSaleItemsPromise } from '../../utils/FetchSaleItemsPromise';

function SearchSaleResultModal({ saleid, onCancelFunc }) {
  // const [modalShow, setModalShow] = React.useState(true)

  const [productList, setProductList] = React.useState([]);

  const [show, setShow] = React.useState(true);

  var selectedProduct = React.useRef();

  const columns = [
    {
      dataField: 'prodname',
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

  function getSaleItems() {
    FetchSaleItemsPromise({ saleid: saleid })
      .then((response) => {
        console.log('Sales Items from DB : ' + JSON.stringify(response));
        setProductList(response);
      })
      .catch((err) => {
        showAlert(
          'Error occurred while trying to fetch data from database. Error : ' +
            err,
          'error'
        );
      });
  }

  React.useEffect(() => {
    getSaleItems();
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          //setModalShow(false)
          //onOkFunc()
        }}
        size="xl"
        // dialogClassName="product-search-dialog"
      >
        <Modal.Body>
          <BootstrapTable
            keyField="id_sale_items"
            data={productList}
            columns={columns}
            tabIndexCell
          />
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col md="12">
              <Button
                //size="sm"
                variant="primary"
                onClick={onCancelFunc}
              >
                Close Search
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchSaleResultModal;
