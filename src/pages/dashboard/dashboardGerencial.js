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
import { Line, Bar } from "react-chartjs-2";
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
import { chartExample1 } from "~/variables/charts";
import api from "~/services/api";
import { normalizeCalcCurrency, normalizeCurrency } from "~/normalize";
import history from "~/services/history";

class DashboardGerencial extends React.Component {
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
    const parcChartOptions = {
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
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 6,
              padding: 1,
              fontColor: "#9e9e9e"
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    };

    const parcPendenteChart = {
      data: canvas => {
        const ctx = canvas.getContext("2d");

        const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); // purple colors

        return {
          labels: this.state.parcsState.parcLabelsPendente,
          datasets: [
            {
              label: "Parcelas",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "#ff6600",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: this.state.parcsState.parcPendente
            }
          ]
        };
      },
      options: parcChartOptions
    };
    const parcAtrasadaChart = {
      data: canvas => {
        const ctx = canvas.getContext("2d");

        const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); // purple colors

        return {
          labels: this.state.parcsState.parcLabelsAtrasada,
          datasets: [
            {
              label: "Parcelas",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "#ff0000",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: this.state.parcsState.parcAtrasada
            }
          ]
        };
      },
      options: parcChartOptions
    };
    const parcAbertaChart = {
      data: canvas => {
        const ctx = canvas.getContext("2d");

        const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); // purple colors

        return {
          labels: this.state.parcsState.parcLabelsAberta,
          datasets: [
            {
              label: "Parcelas",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "#009933",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: this.state.parcsState.parcAberta
            }
          ]
        };
      },
      options: parcChartOptions
    };

    this.setState({ parcPendenteChart, parcAtrasadaChart, parcAbertaChart });
  };

  loadData = async () => {
    history.push(0);
    if (store.getState().auth.user.Colab) {
      const hrs = await api.get(`horas/?total=${true}&tipo=gerencial`);
      const desps = await api.get(`despesas/?total=${true}&tipo=gerencial`);
      const vlrHrs = await api.get(`colab/?vlrHrMes=true&tipo=gerencial`);
      const parcs = await api.get(`parcela/?chartData=true&tipo=gerencial`);
      const date = new Date();
      const month = date.toLocaleString("default", { month: "long" });
      const parcsState = {
        parcPendente: parcs.data.parcPendente,
        parcAtrasada: parcs.data.parcAtrasada,
        parcAberta: parcs.data.parcAberta,
        parcLabelsPendente: parcs.data.labelsPendente,
        parcLabelsAtrasada: parcs.data.labelsAtrasada,
        parcLabelsAberta: parcs.data.labelsAberta,
        totalPendente: parcs.data.totalPendente,
        totalAtrasada: parcs.data.totalAtrasada,
        totalAberta: parcs.data.totalAberta
      };
      this.setState({
        mes: month,
        horas: hrs.data,
        vlrDesps: normalizeCurrency(desps.data),
        vlrHrs: normalizeCalcCurrency(vlrHrs.data + desps.data),
        parcsState,
        isLoading: false
      });
    }
  };

  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };

  render() {
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
                          data={chartExample1[this.state.bigChartData]}
                          options={chartExample1.options}
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
                        <Link to="tabelas/apontamentos/gerencial/horas/">
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
                        <Link to="tabelas/apontamentos/gerencial/despesas/">
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
                              a Pagar {this.state.mes}
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
              <Row>
                <Col lg="4">
                  <Card className=" /*card-chart">
                    <CardHeader>
                      <Link to="tabelas/parcela/pendentes/?fromDash=true">
                        Parcelas Pendentes
                      </Link>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-send text-info" />{" "}
                        {normalizeCurrency(this.state.parcsState.totalPendente)}
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Bar
                          data={this.state.parcPendenteChart.data}
                          options={this.state.parcPendenteChart.options}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className=" /*card-chart">
                    <CardHeader>
                      <Link to="tabelas/parcela/atrasadas/?fromDash=true">
                        Parcelas Atrasadas
                      </Link>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-alert-circle-exc text-info" />{" "}
                        {normalizeCurrency(this.state.parcsState.totalAtrasada)}
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Bar
                          data={this.state.parcAtrasadaChart.data}
                          options={this.state.parcAtrasadaChart.options}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className=" /*card-chart">
                    <CardHeader>
                      <Link to="tabelas/parcela/abertas/?fromDash=true">
                        Parcelas Abertas
                      </Link>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-tag text-info" />{" "}
                        {normalizeCurrency(this.state.parcsState.totalAberta)}
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Bar
                          data={this.state.parcAbertaChart.data}
                          options={this.state.parcAbertaChart.options}
                        />
                      </div>
                    </CardBody>
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
export default DashboardGerencial;
