import React from 'react'

// react-bootstrap components
import { Tabs, Card, Tab, Container } from 'react-bootstrap'
import uuid from 'uuid'
import { UIStore } from '../utils/UIStore'
import ConfirmationAlert from '../components/Modals/ConfirmationAlert'
import SaleTabContent from '../components/Tabs/SaleTabContent'

function Sales() {
    const tabList = UIStore.useState((s) => s.tabList)
    const currentTabKey = UIStore.useState((s) => s.currentTabKey)
    const [closingTabId, setClosingTabId] = React.useState(null)

    const saleContent = UIStore.useState((s) => s.saleContent)

    function addNewSaleTab() {
        var uuidkey = uuid()
        console.log('Created Tab ' + uuidkey)
        var newTab = {
            id: uuidkey,
            name: 'Sale',
            content: <SaleTabContent tabId={uuidkey} />,
        }
        //console.log('Current Tabs ' + JSON.stringify(tabList))
        console.log('Current Sales : ' + JSON.stringify(saleContent))
        UIStore.update((s) => {
            s.tabList = [...tabList, newTab]
            //s.currentTabKey = uuidkey
        })
        UIStore.update((s) => {
            s.currentTabKey = uuidkey
        })
    }

    function closeTab(tabId) {
        setClosingTabId(tabId)
    }

    function confirmClose() {
        console.log('OK Closing!!!')
        console.log('Remove Tab : ' + closingTabId)
        var filtered = tabList.filter((tab) => tab.id !== closingTabId)
        console.log('Filtered tabs : ' + JSON.stringify(filtered))
        UIStore.update((s) => {
            s.tabList = filtered
        })
        setClosingTabId(null)
    }
    function cancelClear() {
        console.log('Cancel Closing!!!')
        setClosingTabId(null)
    }

    return (
        <>
            <Container fluid>
                <Card>
                    {/* {isSalesScreenVisible && <p>Im visible </p>} */}
                    <Card.Header>
                        <a
                            href="/"
                            onClick={(e) => {
                                e.preventDefault()
                                addNewSaleTab()
                            }}
                        >
                            <div className="add-stock-icon">
                                <p>
                                    <i className="fas fa-plus-circle"></i>
                                    {' New Sale'}
                                </p>
                            </div>
                        </a>
                    </Card.Header>
                    <Card.Body>
                        <Tabs
                            activeKey={currentTabKey}
                            id="uncontrolled-tab-example"
                            className="mb-3"
                            onSelect={(k) =>
                                UIStore.update((s) => {
                                    s.currentTabKey = k
                                })
                            }
                        >
                            {tabList.map((tab, index) => {
                                return (
                                    <Tab
                                        key={index}
                                        eventKey={tab.id}
                                        title={
                                            <p>
                                                {tab.name + ' ' + index + '  '}
                                                <i
                                                    className="fas fa-times sale-tab-close-btn"
                                                    onClick={() =>
                                                        closeTab(tab.id)
                                                    }
                                                ></i>
                                            </p>
                                        }
                                    >
                                        {tab.content}
                                    </Tab>
                                )
                            })}
                        </Tabs>
                    </Card.Body>
                </Card>
                {closingTabId && (
                    <ConfirmationAlert
                        title="Confirmation?"
                        message="Do you really want to cancel this sale?"
                        onOkFunc={confirmClose}
                        onCancelFunc={cancelClear}
                    ></ConfirmationAlert>
                )}
            </Container>
        </>
    )
}

export default Sales
