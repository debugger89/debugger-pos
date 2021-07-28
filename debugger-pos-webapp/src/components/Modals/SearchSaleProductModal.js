import React from 'react'

import { Modal, Row, Button, Col, FormControl, Form } from 'react-bootstrap'

import BootstrapTable from 'react-bootstrap-table-next'
import { FetchAllProductsPromise } from '../../utils/FetchAllProductsPromise'
import { showAlert } from '../../components/Modals/NotificationAlerts'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import { ProductSearchBar } from '../Search/ProductSearchBar'

function SearchSaleProductModal({ onOkFunc }) {
    const [modalShow, setModalShow] = React.useState(true)

    const [productList, setProductList] = React.useState([])

    const columns = [
        {
            dataField: 'prodbarcode',
            text: 'Product Barcode',
            headerStyle: () => {
                return { width: '20%' }
            },
        },
        {
            dataField: 'prodname',
            text: 'Product Name',
            headerStyle: () => {
                return { width: '50%' }
            },
        },
        {
            dataField: 'sellprice',
            text: 'Price/Unit',
            headerStyle: () => {
                return { width: '15%' }
            },
            searchable: false,
        },
        {
            dataField: 'remainingstock',
            text: 'Remaining Stock Units',
            headerStyle: () => {
                return { width: '10%' }
            },
            searchable: false,
        },
    ]

    function getAllProducts() {
        FetchAllProductsPromise()
            .then((response) => {
                console.log('Response from DB : ' + JSON.stringify(response))
                setProductList(response)
            })
            .catch((err) => {
                showAlert(
                    'Error occurred while trying to fetch data from database. Error : ' +
                        err,
                    'error'
                )
            })
    }

    React.useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
            <Modal
                show={modalShow}
                onHide={() => {
                    setModalShow(false)
                    onOkFunc()
                }}
                size="xl"
                dialogClassName="product-search-dialog"
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
                                keyField="stockid"
                                data={productList}
                                columns={columns}
                                selectRow={{ mode: 'checkbox' }}
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
                    <Button size="sm" onClick={onOkFunc}>
                        Close Search
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SearchSaleProductModal
