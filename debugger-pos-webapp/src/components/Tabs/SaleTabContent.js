import React from 'react'

import { Container, Row, Button, Col, InputGroup, Form } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import { UIStore } from '../../utils/UIStore'
import uuid from 'uuid'
import SearchSaleProductModal from '../Modals/SearchSaleProductModal'

function SaleTabContent({ tabId }) {
    const [searchProductRequested, setSearchProductRequested] =
        React.useState(false)

    var node = React.useRef()

    const currentTabKey = UIStore.useState((s) => s.currentTabKey)

    const columns = [
        {
            dataField: 'name',
            text: 'Product Name',
            headerStyle: () => {
                return { width: '50%' }
            },
        },
        {
            dataField: 'units',
            text: 'Units',
            headerStyle: () => {
                return { width: '10%' }
            },
        },
        {
            dataField: 'unitprice',
            text: 'Price/Unit',
            headerStyle: () => {
                return { width: '15%' }
            },
        },
        {
            dataField: 'price',
            text: 'Price',
            headerStyle: () => {
                return { width: '20%' }
            },
        },
    ]

    const saleContent = UIStore.useState((s) => s.saleContent)

    function addNewRow() {
        var emptyRowData = {
            id: uuid(),
            name: 'Custom',
            unitprice: 0,
            units: 1,
            price: 100,
        }

        //console.log('A: ' + JSON.stringify(saleContent))
        var currentRows = saleContent.get(currentTabKey)
        //console.log('B: ' + JSON.stringify(currentRows))
        if (currentRows === undefined) {
            UIStore.update((s) => {
                s.saleContent = s.saleContent.set(currentTabKey, [emptyRowData])
            })
        } else {
            currentRows = [...currentRows, emptyRowData]
            UIStore.update((s) => {
                s.saleContent = s.saleContent.set(currentTabKey, currentRows)
            })
        }
    }

    function deleteSelectedRow() {
        let removeRequested = node.selectionContext.selected
        console.log(removeRequested)
        let allRows = saleContent.get(currentTabKey)
        if (allRows !== undefined) {
            allRows = allRows.filter((e) => !removeRequested.includes(e.id))
            UIStore.update((s) => {
                s.saleContent = s.saleContent.set(currentTabKey, allRows)
            })
        }
    }

    function finishSearch() {
        //console.log('Closing search modal')
        setSearchProductRequested(false)
    }

    function searchForItemManually() {
        // console.log(
        //     'CTRL+1 Captured in ' + tabId + ' Current tab is : ' + currentTabKey
        // )
        if (tabId === currentTabKey) {
            // console.log('CTRL+1 Captured in ' + tabId)
            setSearchProductRequested(true)
        }
    }

    React.useEffect(() => {
        // Add the Ctrl+1 Shortcut for search items
        document.addEventListener('keydown', function (event) {
            if (event.ctrlKey && event.key === '1') {
                searchForItemManually()
            }
        })
        // console.log('CTRL+1 Lister added')
    }, [])

    return (
        <>
            <Container fluid>
                {/* <p>{JSON.stringify(saleContent.get(tabId))}</p> */}
                <BootstrapTable
                    keyField="id"
                    data={
                        saleContent.get(currentTabKey)
                            ? saleContent.get(currentTabKey)
                            : []
                    }
                    columns={columns}
                    selectRow={{ mode: 'checkbox' }}
                    tabIndexCell
                    cellEdit={cellEditFactory({
                        mode: 'click',
                        autoSelectText: true,
                        blurToSave: true,
                    })}
                    ref={(n) => (node = n)}
                />
                <br />
                <br />

                <Row>
                    <Col md="6">
                        <Row>
                            <Col md="4">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={(e) => deleteSelectedRow()}
                                >
                                    <i className="fas fa-minus-circle"></i>
                                    {' Delete Row'}
                                </Button>
                            </Col>
                            <Col md="4">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={(e) => addNewRow()}
                                >
                                    <i className="fas fa-plus-circle"></i>{' '}
                                    {' Add New Row'}
                                </Button>
                            </Col>
                            <Col md="4">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={(e) => searchForItemManually()}
                                >
                                    <i className="fas fa-search-plus"></i>
                                    {' Search Item'}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {searchProductRequested && (
                    <SearchSaleProductModal
                        onOkFunc={finishSearch}
                    ></SearchSaleProductModal>
                )}
            </Container>
        </>
    )
}

export default SaleTabContent
