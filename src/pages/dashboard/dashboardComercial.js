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
import { Bar } from "react-chartjs-2";
// react plugin for creating vector maps

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Input
} from "reactstrap";

import { Link } from "react-router-dom";
import {
  AttachMoney,
  Check,
  Close,
  DateRangeOutlined,
  Schedule
} from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import { getDaysInMonth } from "date-fns";
import { store } from "~/store";

// core components
// import { chart_1_2_3_options } from "~/variables/charts";
import api from "~/services/api";
import { barChart_1 } from "./chartsOptions";
import history from "~/services/history";
import { Footer, Header } from "~/components/Modal/modalStyles";
import Modal from "~/components/Modal/modalLarge";

export default function ComercialDashboard() {
  document.body.classList.add("white-content");

  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [setBigChart] = useState();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [chartHrsData, setChartHrsData] = useState();
  const [chartDespData, setChartDespData] = useState();
  const [chartRecebData, setChartRecebData] = useState();
  const [miniChartData, setMiniChartData] = useState();
  const [date, month, year] = new Date().toLocaleDateString("pt-BR").split("/");
  const lastDayMonth = getDaysInMonth(new Date(year, month - 1, date));
  const [dataForTable, setDataForTable] = useState({
    campId: 0,
    inicDate: `${year}-${month}-01`,
    endDate: `${year}-${month}-${lastDayMonth}`
  });
  const [dataForGraph] = useState({
    red: 0,
    yellow: 0,
    green: 0,
    reset: true
  });

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
  }, [chartDespData, chartHrsData, chartRecebData, setBigChart]);
  useEffect(() => {
    const loadData = async () => {
      if (store.getState().auth.user.Colab) {
        const idColab = store.getState().auth.user.Colab.id;

        const response = await api.get("/campanha");

        const resultPeriodo = await api.get(`resultPeriodo/${idColab}`);

        let array = [];

        const active = [];
        for (let i = 0; i < response.data.length; i += 1) {
          active[i] = {
            data: response.data[i].FollowUps,
            camp: response.data[i].id
          };
        }
        for (let k = 0; k < active.length; k += 1) {
          // eslint-disable-next-line no-loop-func
          active[k].data = active[k].data.filter(arr => {
            if (!array.includes(arr.ClienteId)) {
              array.push(arr.ClienteId);
              return true;
            }
            return false;
          });
          array = [];
        }
        setData2(active);

        setData(response.data);
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
  }, [dataForTable.campId]);

  // const setBgChartData = name => {
  //   setBigChartData(name);
  // };

  const handleFilterChange = async (camp, dataInic, dataFim) => {
    if (!dataForGraph.reset) {
      dataForGraph.red = 0;
      dataForGraph.yellow = 0;
      dataForGraph.green = 0;
      dataForGraph.reset = false;
    }
    for (let j = 0; j < data2.length; j += 1) {
      if (data2[j].camp === parseInt(camp, 10)) {
        for (let i = 0; i < data2[j].data.length; i += 1) {
          console.log(data2[j].data[i].distanceFromToday);
          switch (true) {
            case data2[j].data[i].distanceFromToday <= 0:
              dataForGraph.red += 1;
              dataForGraph.reset = false;
              break;
            case data2[j].data[i].distanceFromToday > 0 &&
              data2[j].data[i].distanceFromToday <= 4:
              dataForGraph.yellow += 1;
              dataForGraph.reset = false;
              break;
            case data2[j].data[i].distanceFromToday >= 5:
              dataForGraph.green += 1;
              dataForGraph.reset = false;
              break;
            case data2[j].data[i].distanceFromToday === "--":
              return "--";
            default:
          }
        }
      }
    }
    setDataForTable({ campId: camp, inicDate: dataInic, endDate: dataFim });
    await api
      .get(
        `comercialDash/?camp=${camp}&dataInic=${dataInic}&dataFim=${dataFim}`
      )
      .then(result => setMiniChartData(result.data));
  };
  console.log(dataForGraph);
  return (
    <>
      {isLoading ? (
        <>
          <div className="content" />
        </>
      ) : (
        <>
          <div className="content">
            <Modal
              style={{ width: "50%" }}
              onClose={() => {
                setIsOpen(false);
              }}
              open={isOpen}
            >
              <Header>
                {" "}
                <Tooltip title="Fechar">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Close fontSize="large" />
                  </Button>
                </Tooltip>
                <Tooltip title="Ok">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Check fontSize="large" />
                  </Button>
                </Tooltip>
                <h4 className="modalHeader">Campanhas</h4>
              </Header>

              <Row>
                <Col sm="4">
                  <Input
                    type="select"
                    id="camp"
                    onChangeCapture={e => {
                      handleFilterChange(
                        e.target.value,
                        document.getElementById("dataInic").value
                          ? document.getElementById("dataInic").value
                          : dataForTable.inicDate,
                        document.getElementById("dataFim").value
                          ? document.getElementById("dataFim").value
                          : dataForTable.endDate
                      );
                    }}
                  >
                    <option disabled value="">
                      {" "}
                      Selecione uma campanha
                    </option>
                    {data.map((camp, index) => (
                      <option key={index} value={camp.id}>
                        {camp.cod} - {camp.desc}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col sm="4">
                  <Input
                    type="date"
                    id="dataInic"
                    defaultValue={dataForTable.inicDate}
                    onBlur={e => {
                      handleFilterChange(
                        document.getElementById("camp").value
                          ? document.getElementById("camp").value
                          : 1,
                        e.target.value,
                        document.getElementById("dataFim").value
                          ? document.getElementById("dataFim").value
                          : "2030-12-31"
                      );
                    }}
                  />
                </Col>
                <Col sm="4">
                  <Input
                    type="date"
                    id="dataFim"
                    defaultValue={dataForTable.endDate}
                    onBlur={e => {
                      handleFilterChange(
                        document.getElementById("camp").value
                          ? document.getElementById("camp").value
                          : 1,
                        document.getElementById("dataInic").value
                          ? document.getElementById("dataInic").value
                          : "1969-01-01",
                        e.target.value
                      );
                    }}
                  />
                </Col>
              </Row>

              <Footer />
            </Modal>

            <Row>
              <Col xs="12">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-left" sm="12">
                        <Tooltip title="Filtrar">
                          <Button
                            style={{
                              float: "right",
                              padding: 0
                            }}
                            onClick={() => {
                              setIsOpen(true);
                            }}
                            size="sm"
                            className={classNames("btn-icon btn-link like")}
                          >
                            <DateRangeOutlined />
                          </Button>
                        </Tooltip>
                        <CardTitle tag="h2">Histórico</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  {/* <CardBody>
                    <div className="chart-area">
                      <Line
                        data={bigChart[bigChartData]}
                        options={bigChart.options}
                      />
                    </div>
                  </CardBody> */}
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
                            Empresas Incluídas
                          </p>
                          <CardTitle tag="h3">
                            {miniChartData
                              ? miniChartData.cliJoinedCamp.count
                              : 0}
                          </CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <Link
                        to={`tabelas/comercial/empresas/${dataForTable.campId}/${dataForTable.inicDate}/${dataForTable.endDate}`}
                      >
                        <i className="tim-icons icon-refresh-01" /> Ver Empresas
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
                            Follow Ups
                          </p>
                          <CardTitle tag="h3">
                            {miniChartData ? miniChartData.Fups.count : 0}
                          </CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <Link
                        to={`tabelas/comercial/FUPs/${dataForTable.campId}/${dataForTable.inicDate}/${dataForTable.endDate}`}
                      >
                        <i className="tim-icons icon-sound-wave" /> Ver Follow
                        Ups
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
                            Empresas Finalizadas
                          </p>
                          <CardTitle tag="h3">
                            {miniChartData
                              ? miniChartData.finalizedFups.count
                              : 0}
                          </CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <Link
                        to={`tabelas/comercial/empresasFinalizadas/${dataForTable.campId}/${dataForTable.inicDate}/${dataForTable.endDate}`}
                      >
                        <i className="tim-icons icon-trophy" /> Ver Empresas
                      </Link>{" "}
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
                          ["red", "yellow", "green"],
                          [
                            dataForGraph.red,
                            dataForGraph.yellow,
                            dataForGraph.green
                          ]
                        )}
                        options={barChart_1.options}
                        onElementsClick={elems => {
                          // if required to build the URL, you can
                          // get datasetIndex and value index from an `elem`:
                          if (elems.length > 0) {
                            console.log(elems[0]._model.label);
                            return history.push(
                              `/tabelas/comercial/FUPs/${elems[0]._model.label}`
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
