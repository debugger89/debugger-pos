import React from 'react'

import { Container, Row, Button, Col, Card } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import { UIStore } from '../../utils/UIStore'
import uuid from 'uuid'

const { Map } = require('immutable')

function SaleTabContent({ tabId }) {
    const [show, setShow] = React.useState(false)
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        style: { backgroundColor: '#9ac8e281' },
    }

    var node = React.useRef()

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

    const products = [
        {
            id: 1,
            name: 'marie',
            price: 100,
            unitprice: 100,
            units: 2,
        },
        {
            id: 2,
            name: 'sugar',
            price: 100,
            unitprice: 200,
            units: 3,
        },
    ]

    function addNewRow() {
        var emptyRowData = {
            id: uuid(),
            name: 'Custom',
            unitprice: 0,
            units: 1,
            price: 100,
        }
        var defaultRows = {
            [tabId]: [emptyRowData],
        }
        console.log('A: ' + JSON.stringify(saleContent))
        var currentRows = saleContent.get(tabId)
        console.log('B: ' + JSON.stringify(currentRows))
        if (currentRows === undefined) {
            UIStore.update((s) => {
                s.saleContent = Map(defaultRows)
            })
        } else {
            currentRows = [...currentRows, emptyRowData]
            UIStore.update((s) => {
                s.saleContent = s.saleContent.set(tabId, currentRows)
            })
        }
    }

    function deleteSelectedRow() {
        let removeRequested = node.selectionContext.selected
        console.log(removeRequested)
        let allRows = saleContent.get(tabId)
        if (allRows !== undefined) {
            allRows = allRows.filter((e) => !removeRequested.includes(e.id))
            UIStore.update((s) => {
                s.saleContent = s.saleContent.set(tabId, allRows)
            })
        }
    }

    return (
        <>
            <Container fluid>
                {/* <p>{JSON.stringify(saleContent.get(tabId))}</p> */}
                <BootstrapTable
                    keyField="id"
                    data={saleContent.get(tabId) ? saleContent.get(tabId) : []}
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
                    <Col md="3">
                        <Row>
                            <Col md="6">
                                <Button
                                    className="btn-outline-danger"
                                    variant="danger"
                                    size="sm"
                                    onClick={(e) => deleteSelectedRow()}
                                >
                                    Delete Row
                                </Button>
                            </Col>
                            <Col md="6">
                                <Button
                                    className="btn-fill pull-right"
                                    variant="primary"
                                    size="sm"
                                    onClick={(e) => addNewRow()}
                                >
                                    New Row
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SaleTabContent
