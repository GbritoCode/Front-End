/*!

=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// react plugin for creating vector maps

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
import { AttachMoney, Schedule } from "@material-ui/icons";

import { store } from "~/store";

// core components
// import { chart_1_2_3_options } from "~/variables/charts";
import api from "~/services/api";
import { normalizeCalcCurrency, normalizeCurrency } from "~/normalize";
import history from "~/services/history";

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bigChartData: "data1",
      horas: null,
      mes: null,
      vlrDesps: null,
      vlrHrs: null
    };
  }

  componentDidMount() {
    // --------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.createCharts();
    this.loadData();
  }

  createCharts = () => {
    const chart_1_2_3_options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ],
        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ]
      }
    };

    const chartExample1 = {
      data1: canvas => {
        const ctx = canvas.getContext("2d");

        const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); // blue colors

        return {
          labels: [
            "JAN",
            "FEV",
            "MAR",
            "ABR",
            "MAI",
            "JUN",
            "JUL",
            "AGO",
            "SET",
            "OUT",
            "NOV",
            "DEZ"
          ],
          datasets: [
            {
              label: "Horas",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.state.chartHrsData
            }
          ]
        };
      },
      data2: canvas => {
        const ctx = canvas.getContext("2d");

        const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); // blue colors

        return {
          labels: [
            "JAN",
            "FEV",
            "MAR",
            "ABR",
            "MAI",
            "JUN",
            "JUL",
            "AGO",
            "SET",
            "OUT",
            "NOV",
            "DEZ"
          ],
          datasets: [
            {
              label: "Despesas",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.state.chartDespData
            }
          ]
        };
      },
      data3: canvas => {
        const ctx = canvas.getContext("2d");

        const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); // blue colors

        return {
          labels: [
            "JAN",
            "FEV",
            "MAR",
            "ABR",
            "MAI",
            "JUN",
            "JUL",
            "AGO",
            "SET",
            "OUT",
            "NOV",
            "DEZ"
          ],
          datasets: [
            {
              label: "Recebido",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.state.chartRecebData
            }
          ]
        };
      },
      options: chart_1_2_3_options
    };
    this.setState({ chartExample1 });
  };

  loadData = async () => {
    const date = new Date();
    history.push(0);
    if (store.getState().auth.user.Colab) {
      const idColab = store.getState().auth.user.Colab.id;
      const hrs = await api.get(`horas/${idColab}/?total=${true}&tipo=month`);
      const desps = await api.get(
        `despesas/${idColab}/?total=${true}&tipo=month`
      );
      const vlrHrs = await api.get(`colab/${idColab}/?vlrHrMes=true`);

      const resultPeriodo = await api.get(`resultPeriodo/${idColab}`);

      const month = date.toLocaleString("default", { month: "long" });
      this.setState({
        mes: month,
        horas: hrs.data,
        vlrDesps: normalizeCurrency(desps.data),
        vlrHrs: normalizeCalcCurrency(vlrHrs.data + desps.data),
        isLoading: false,
        chartHrsData: resultPeriodo.data.map(d => {
          return Math.trunc(d.totalHrs / 60);
        }),
        chartDespData: resultPeriodo.data.map(d => {
          return d.totalDesp / 100;
        }),
        chartRecebData: resultPeriodo.data.map(d => {
          return d.totalReceb / 100;
        })
      });
    }
  };

  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };

  render() {
    const { id } = store.getState().auth.user;
    return (
      <>
        {this.state.isLoading ? (
          <>
            <div className="content" />
          </>
        ) : (
          <>
            <div className="content">
              <Row>
                <Col xs="12">
                  <Card className="card-chart">
                    <CardHeader>
                      <Row>
                        <Col className="text-left" sm="6">
                          <CardTitle tag="h2">Histórico</CardTitle>
                        </Col>
                        <Col sm="6">
                          <ButtonGroup
                            className="btn-group-toggle float-right"
                            data-toggle="buttons"
                          >
                            <Button
                              color="info"
                              id="0"
                              size="sm"
                              tag="label"
                              className={classNames("btn-simple", {
                                active: this.state.bigChartData === "data1"
                              })}
                              onClick={() => this.setBgChartData("data1")}
                            >
                              <input
                                defaultChecked
                                name="options"
                                type="radio"
                              />
                              <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                Horas
                              </span>
                              <span className="d-block d-sm-none">
                                <i className="tim-icons icon-single-02" />
                              </span>
                            </Button>
                            <Button
                              color="info"
                              id="1"
                              size="sm"
                              tag="label"
                              className={classNames("btn-simple", {
                                active: this.state.bigChartData === "data2"
                              })}
                              onClick={() => this.setBgChartData("data2")}
                            >
                              <input name="options" type="radio" />
                              <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                Despesas
                              </span>
                              <span className="d-block d-sm-none">
                                <i className="tim-icons icon-gift-2" />
                              </span>
                            </Button>
                            <Button
                              color="info"
                              id="2"
                              size="sm"
                              tag="label"
                              className={classNames("btn-simple", {
                                active: this.state.bigChartData === "data3"
                              })}
                              onClick={() => this.setBgChartData("data3")}
                            >
                              <input name="options" type="radio" />
                              <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                À receber
                              </span>
                              <span className="d-block d-sm-none">
                                <i className="tim-icons icon-tap-02" />
                              </span>
                            </Button>
                          </ButtonGroup>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Line
                          data={
                            this.state.chartExample1[this.state.bigChartData]
                          }
                          options={this.state.chartExample1.options}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" md="6">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <Col xs="5">
                          <div className="info-icon text-center icon-warning">
                            <Schedule
                              style={{ marginTop: 7 }}
                              fontSize="large"
                            />
                          </div>
                        </Col>
                        <Col xs="7">
                          <div className="numbers">
                            <p
                              style={{ textTransform: "capitalize" }}
                              className="card-category"
                            >
                              horas {this.state.mes}
                            </p>
                            <CardTitle tag="h3">{this.state.horas}</CardTitle>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        <Link to={`tabelas/apontamentos/horas/${id}/`}>
                          <i className="tim-icons icon-refresh-01" /> Ver horas
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col lg="4" md="6">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <Col xs="5">
                          <div className="info-icon text-center icon-primary">
                            <AttachMoney
                              style={{ marginTop: 7 }}
                              fontSize="large"
                            />
                          </div>
                        </Col>
                        <Col xs="7">
                          <div className="numbers">
                            <p
                              style={{ textTransform: "capitalize" }}
                              className="card-category"
                            >
                              despesas {this.state.mes}
                            </p>
                            <CardTitle tag="h3">
                              {this.state.vlrDesps}
                            </CardTitle>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        <Link to={`tabelas/apontamentos/despesas/${id}/`}>
                          <i className="tim-icons icon-sound-wave" /> Ver
                          despesas
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col lg="4" md="6">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <Col xs="5">
                          <div className="info-icon text-center icon-success">
                            <i className="tim-icons icon-single-02" />
                          </div>
                        </Col>
                        <Col xs="7">
                          <div className="numbers">
                            <p
                              style={{ textTransform: "capitalize" }}
                              className="card-category"
                            >
                              {" "}
                              a Receber {this.state.mes}
                            </p>
                            <CardTitle tag="h3">{this.state.vlrHrs}</CardTitle>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        <i className="tim-icons icon-trophy" /> Solicitar
                        Adiantamento
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </div>
          </>
        )}
      </>
    );
  }
}
export default AdminDashboard;
