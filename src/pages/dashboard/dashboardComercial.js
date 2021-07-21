/*!

=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Bar, Line } from "react-chartjs-2";
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
import { barChart_1 } from "./chartsOptions";

export default function ComercialDashboard() {
  document.body.classList.add("white-content");

  const [isLoading, setIsLoading] = useState(true);
  const [bigChart, setBigChart] = useState();
  const [bigChartData, setBigChartData] = useState("data1");
  const [horas, setHoras] = useState();
  const [mes, setMes] = useState();
  const [vlrDesps, setVlrDesps] = useState();
  const [vlrHrs, setVlrHrs] = useState();
  const [chartHrsData, setChartHrsData] = useState();
  const [chartDespData, setChartDespData] = useState();
  const [chartRecebData, setChartRecebData] = useState();
  const { id } = store.getState().auth.user;

  useEffect(() => {
    const createCharts = () => {
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
                data: chartHrsData
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
                data: chartDespData
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
                data: chartRecebData
              }
            ]
          };
        },
        options: chart_1_2_3_options
      };
      setBigChart(chartExample1);
    };
    createCharts();
  }, [chartDespData, chartHrsData, chartRecebData]);
  useEffect(() => {
    const loadData = async () => {
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
        setMes(month);
        setHoras(hrs.data);
        setVlrDesps(normalizeCurrency(desps.data));
        setVlrHrs(normalizeCalcCurrency(vlrHrs.data + desps.data));
        setChartHrsData(
          resultPeriodo.data.map(d => {
            return d.totalHrs / 60;
          })
        );
        setChartDespData(
          resultPeriodo.data.map(d => {
            return d.totalDesp / 100;
          })
        );
        setChartRecebData(
          resultPeriodo.data.map(d => {
            return d.totalReceb / 100;
          })
        );
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const setBgChartData = name => {
    setBigChartData(name);
  };

  return (
    <>
      {isLoading ? (
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
                              active: bigChartData === "data1"
                            })}
                            onClick={() => setBgChartData("data1")}
                          >
                            <input defaultChecked name="options" type="radio" />
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
                              active: bigChartData === "data2"
                            })}
                            onClick={() => setBgChartData("data2")}
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
                              active: bigChartData === "data3"
                            })}
                            onClick={() => setBgChartData("data3")}
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
                        data={bigChart[bigChartData]}
                        options={bigChart.options}
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
                          <Schedule style={{ marginTop: 7 }} fontSize="large" />
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p
                            style={{ textTransform: "capitalize" }}
                            className="card-category"
                          >
                            horas {mes}
                          </p>
                          <CardTitle tag="h3">{horas}</CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <Link to={`tabelas/apontamentos/horas/${id}`}>
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
                            despesas {mes}
                          </p>
                          <CardTitle tag="h3">{vlrDesps}</CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <Link to={`tabelas/apontamentos/despesas/${id}`}>
                        <i className="tim-icons icon-sound-wave" /> Ver despesas
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
                            a Receber {mes}
                          </p>
                          <CardTitle tag="h3">{vlrHrs}</CardTitle>
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
                      FUPs do dia
                    </Link>
                    <CardTitle
                      tag="h4"
                      style={{ color: "orange", fontSize: 20 }}
                    >
                      <i className="tim-icons icon-send text-info" />{" "}
                      {/* {normalizeCurrency(state.parcsState.totalPendente)} */}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={barChart_1.data(
                          ["campanha1", "camp002", "Aidera0001", "Totvs2021"],
                          [10, 15, 20, 25]
                        )}
                        options={barChart_1.options}
                        onElementsClick={elems => {
                          // if required to build the URL, you can
                          // get datasetIndex and value index from an `elem`:
                          if (elems.length > 0) {
                            console.log(elems);
                            console.log(
                              `${elems[0]._datasetIndex}, ${elems[0]._index}`
                            );
                          }
                          // and then redirect to the target page:
                          // window.location = "https://example.com";
                        }}
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
