import React from 'react';
// react-bootstrap components
import { Col, Container, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import { SalesSearchBar } from '../components/Search/SalesSearchBar';
import { FetchAllSalesPromise } from '../utils/FetchAllSalesPromise';
import paginationFactory from 'react-bootstrap-table2-paginator';
import SearchSaleResultModal from '../components/Modals/SearchSaleResultModal';
import { showAlert } from '../components/Modals/NotificationAlerts';
import { toast, ToastContainer } from 'react-toastify';

function SalesHistory() {
  const [salesList, setSalesList] = React.useState([]);
  const [showSelectedSale, setShowSelectedSale] = React.useState(false);
  const [selectedSale, setSelectedSale] = React.useState(null);

  function closeSaleSummary() {
    setShowSelectedSale(false);
  }

  const rowDoubleClickEvent = {
    onDoubleClick: (e, row, rowIndex) => {
      console.log('Double clicked on Row : ' + JSON.stringify(row));
      setSelectedSale(row);
      setShowSelectedSale(true);
    },
  };

  const paginationOptions = {
    sizePerPageList: [
      {
        text: '20',
        value: 20,
      },
      {
        text: '40',
        value: 60,
      },
      {
        text: '60',
        value: 60,
      },
    ],
  };

  const columns = [
    {
      dataField: 'saleid',
      text: 'Sale ID',
      headerStyle: () => {
        return { width: '30%' };
      },
    },
    {
      dataField: 'saledate',
      text: 'Sale Date',
      headerStyle: () => {
        return { width: '30%' };
      },
      formatter: (cell) => {
        let dateObj = new Date(cell).toString();
        dateObj = dateObj.split('GMT')[0];
        return `${dateObj}`;
      },
    },
    {
      dataField: 'saletotal',
      text: 'Sale Amount',
      headerStyle: () => {
        return { width: '40%' };
      },
    },
  ];

  function getAllSales() {
    FetchAllSalesPromise()
      .then((response) => {
        console.log(
          'Formatted Response from DB Sales : ' + JSON.stringify(response)
        );
        setSalesList(response);
      })
      .catch((err) => {
        showAlert(
          'Error occurred while trying to fetch data from database. Error : ' +
            err,
          'error',
          'SalesHistory'
        );
      });
  }

  React.useEffect(() => {
    getAllSales();
  }, []);

  return (
    <>
      <Container fluid>
        <ToastContainer
          enableMultiContainer
          containerId={'SalesHistory'}
          position={toast.POSITION.TOP_RIGHT}
        />
        <Row>
          <Col md="12">
            <h2>Search Sales</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <ToolkitProvider
              keyField="saleid"
              data={salesList}
              columns={columns}
              search
            >
              {(props) => (
                <div>
                  <Row>
                    <Col>
                      <SalesSearchBar {...props.searchProps}></SalesSearchBar>
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
                        rowEvents={rowDoubleClickEvent}
                      ></BootstrapTable>
                    </Col>
                  </Row>
                </div>
              )}
            </ToolkitProvider>
          </Col>
        </Row>
        {showSelectedSale && (
          <SearchSaleResultModal
            onCancelFunc={closeSaleSummary}
            saleid={selectedSale.saleid}
          ></SearchSaleResultModal>
        )}
      </Container>
    </>
  );
}

export default SalesHistory;
