import React from 'react'

// react-bootstrap components
import {
    Tabs,
    Button,
    Card,
    Form,
    Tab,
    Nav,
    Container,
    Row,
    Col,
} from 'react-bootstrap'
import uuid from 'uuid'
import { UIStore } from '../utils/UIStore'
import ConfirmationAlert from '../components/Modals/ConfirmationAlert'
import SaleTabContent from '../components/Tabs/SaleTabContent'
import CheckOnScreen from '../utils/ComponentMountObserver'
import SearchSaleProductModal from '../components/Modals/SearchSaleProductModal'

function Sales() {
    const tabList = UIStore.useState((s) => s.tabList)
    const currentTabKey = UIStore.useState((s) => s.currentTabKey)
    const [closingTabId, setClosingTabId] = React.useState(null)
    const salesScreenRef = React.useRef()
    const isSalesScreenVisible = CheckOnScreen(salesScreenRef)

    const [searchProductRequested, setSearchProductRequested] =
        React.useState(false)

    function addNewSaleTab() {
        var uuidkey = uuid()
        var newTab = {
            id: uuidkey,
            name: 'Sale',
            content: <SaleTabContent tabId={uuidkey} />,
        }

        UIStore.update((s) => {
            s.tabList = [...tabList, newTab]
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

    function finishSearch() {
        console.log('Closing search modal')
        setSearchProductRequested(false)
    }

    function searchForItemManually() {
        //console.log('is on sales screen? ' + isSalesScreenVisible)

        // TODO: Check if we are in Sales screen..

        // if (isSalesScreenVisible === true) {
        console.log('CTRL+1 Captured!!')
        setSearchProductRequested(true)
        // }
    }

    React.useEffect(() => {
        // Add the Ctrl+1 Shortcut for search items
        document.addEventListener('keydown', function (event) {
            if (event.ctrlKey && event.key === '1') {
                searchForItemManually()
            }
        })
        console.log('CTRL+1 Lister added')
    }, [])

    return (
        <>
            <Container fluid>
                <Card ref={salesScreenRef}>
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
                {searchProductRequested && (
                    <SearchSaleProductModal
                        onOkFunc={finishSearch}
                    ></SearchSaleProductModal>
                )}
            </Container>
        </>
    )
}

export default Sales
