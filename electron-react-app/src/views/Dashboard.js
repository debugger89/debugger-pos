import React from 'react';
import ChartistGraph from 'react-chartist';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FetchSalesStatsPromise } from '../utils/FetchSalesStatsPromise';
import { showAlert } from '../components/Modals/NotificationAlerts';
import { FetchFilteredSalesPromise } from '../utils/FetchFilteredSalesPromise';
import { toast, ToastContainer } from 'react-toastify';

function Dashboard() {
  const [fromDate, setFromDate] = React.useState(getFormattedDate(new Date()));
  const [toDate, setToDate] = React.useState(getFormattedDate(new Date()));
  const [totalRevenue, setTotalRevenue] = React.useState(0);

  const [totalSaleAmount, setTotalSaleAmount] = React.useState(0);
  const [totalCustomers, setTotalCustomers] = React.useState(0);
  const [totalItemCount, setTotalItemCount] = React.useState(0);
  const [totalPurchaseCost, setTotalPurchaseCost] = React.useState(0);

  const [maxSaleAmount, setMaxSaleAmount] = React.useState(0);

  const [salesChartData, setSalesChartData] = React.useState({
    labels: [],
    series: [],
  });

  function getFormattedDate(myDate) {
    var myDateString;
    myDateString =
      myDate.getFullYear() +
      '-' +
      ('0' + (myDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + myDate.getDate()).slice(-2);
    // console.log('Curr Date : ' + myDateString);
    return myDateString;
  }

  function getDashbardDataAndCalculate(fromDateValue, toDateValue) {
    console.log(
      'Dahboard data promose paramss : ' + fromDateValue + ' | ' + toDateValue
    );

    FetchSalesStatsPromise({ fromDate: fromDateValue, toDate: toDateValue })
      .then((response) => {
        console.log('Response from DB Stats : ' + JSON.stringify(response));
        calculateRevenueAndOthers(response);
      })
      .catch((err) => {
        showAlert(
          'Error occurred while trying to fetch data from database. Error : ' +
            err,
          'error',
          'Dashboard'
        );
      });
  }

  function calculateRevenueAndOthers(stats) {
    var totalRevenue = 0;
    var totalPurchaseCost = 0;
    var totalSaleAmount = 0;
    var sales = new Set();
    var totalItemCount = 0;
    for (var i = 0; i < stats.length; i++) {
      var item = stats[i];
      var itemRevenue = item.unitprice - item.purchasecost;

      //increment revenue, cost
      totalRevenue += itemRevenue;
      totalPurchaseCost += item.purchasecost;

      totalSaleAmount = totalSaleAmount + item.price;
      sales.add(item.saleid);
      totalItemCount++;
    }
    setTotalSaleAmount(totalSaleAmount);
    setTotalRevenue(totalRevenue);
    setTotalCustomers(sales.size);
    setTotalItemCount(totalItemCount);
    setTotalPurchaseCost(totalPurchaseCost);

    buildSalesTimeChartData(stats, fromDate, toDate);
  }

  function buildSalesTimeChartData(stats, fromDateValue, toDateValue) {
    FetchFilteredSalesPromise({ fromDate: fromDateValue, toDate: toDateValue })
      .then((response) => {
        let salesChartData = {
          labels: [],
          series: [],
        };

        let isSameDay = fromDateValue === toDateValue ? true : false;
        let seriesData = [];
        response.forEach((element) => {
          if (element.saletotal != null) {
            let saleDateValue = element.saledate;
            let xAxis = isSameDay
              ? saleDateValue.split('T')[1].split('.')[0]
              : saleDateValue.split('T')[0];

            salesChartData.labels.push(xAxis);
            seriesData.push(element.saletotal);
          }
        });
        setMaxSaleAmount(Math.max(...seriesData));
        console.log('MAx Sale Amount : ' + Math.max(...seriesData));
        salesChartData.series.push(seriesData);
        console.log(
          'Completed Data For Charts : ' + JSON.stringify(salesChartData)
        );
        setSalesChartData(salesChartData);

        // calculateRevenueAndOthers(response);
      })
      .catch((err) => {
        showAlert(
          'Error occurred while trying to fetch data from database. Error : ' +
            err,
          'error',
          'Dashboard'
        );
      });
  }

  React.useEffect(() => {
    getDashbardDataAndCalculate(fromDate, toDate);
  }, []);

  return (
    <>
      <Container fluid>
        <ToastContainer
          enableMultiContainer
          containerId={'Dashboard'}
          position={toast.POSITION.TOP_RIGHT}
        />
        <Row>
          <Col md="4">
            <h3 className="dashboard-filter-header">Generate Report For</h3>
          </Col>
          <Col md="3">
            <Form.Control
              type="date"
              value={fromDate}
              onChange={(e) => {
                let selectedDate = e.target.value;

                console.log('From Date : ' + selectedDate);
                setFromDate(selectedDate);
              }}
            ></Form.Control>
          </Col>
          <Col md="3">
            <Form.Control
              type="date"
              value={toDate}
              onChange={(e) => {
                let selectedDate = e.target.value;
                console.log('To Date  ' + selectedDate);
                setToDate(selectedDate);
              }}
            ></Form.Control>
          </Col>
          <Col md="2">
            <Button
              variant="warning"
              onClick={(e) => getDashbardDataAndCalculate(fromDate, toDate)}
            >
              <div className="icon-big text-center icon-warning">
                <i className="nc-icon nc-refresh-02 text-warning dashboard-filter-header-button"></i>
              </div>
            </Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md="12">
            <h3>Statistics at a Glance</h3>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Sale Amount</p>
                      <Card.Title as="h4">
                        {'LKR ' + totalSaleAmount}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Today
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <Card.Title as="h4">{'LKR ' + totalRevenue}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Today
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-satisfied text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number Of Customers</p>
                      <Card.Title as="h4">{totalCustomers}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Today
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-app text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number Of Items</p>
                      <Card.Title as="h4">{totalItemCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Today
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Sales Across Time</Card.Title>
                <p className="card-category">
                  {fromDate === toDate ? "Today's Sales" : 'Sales Across Dates'}
                </p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={salesChartData}
                    type="Bar"
                    options={{
                      low: 0,
                      high: maxSaleAmount,
                      showArea: false,
                      height: '245px',
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        'screen and (max-width: 640px)',
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  {' Sale Amount'}
                </div>
                <hr></hr>
                {/* <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div> */}
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Revenue Percentage</Card.Title>
                <p className="card-category">Revenue Calculated for Sales </p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: [
                        Math.round(
                          (totalPurchaseCost / totalSaleAmount) * 100
                        ) + '%',
                        Math.round(
                          100 - (totalPurchaseCost / totalSaleAmount) * 100
                        ) + '%',
                      ],
                      series: [
                        (totalPurchaseCost / totalSaleAmount) * 100,
                        100 - (totalPurchaseCost / totalSaleAmount) * 100,
                      ],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-danger"></i>
                  Revenue <i className="fas fa-circle text-info"></i>
                  Cost
                </div>
                <hr></hr>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">2017 Sales</Card.Title>
                <p className="card-category">All products including Taxes</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'Mai',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                      ],
                      series: [
                        [
                          542,
                          443,
                          320,
                          780,
                          553,
                          453,
                          326,
                          434,
                          568,
                          610,
                          756,
                          895,
                        ],
                        [
                          412,
                          243,
                          280,
                          580,
                          453,
                          353,
                          300,
                          364,
                          368,
                          410,
                          636,
                          695,
                        ],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: '245px',
                    }}
                    responsiveOptions={[
                      [
                        'screen and (max-width: 640px)',
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Tesla Model S <i className="fas fa-circle text-danger"></i>
                  BMW 5 Series
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Tasks</Card.Title>
                <p className="card-category">Backend development</p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Sign contract for "What are conference organizers
                          afraid of?"
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-488980961">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-506045838">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-537440761">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-21130535">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Flooded: One year later, assessing what was lost and
                          what was found when a ravaging rain swept through
                          metro Detroit
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-577232198">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-773861645">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Create 4 Invisible User Experiences you Never Knew
                          About
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-422471719">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-829164576">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Read "Following makes Medium better"</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-160575228">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-922981635">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                disabled
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Unfollow 5 enemies from twitter</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-938342127">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-119603706">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </>
  );
}

export default Dashboard;
