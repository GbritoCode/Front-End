/* eslint-disable no-nested-ternary */
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
  Col,
  Progress,
  Table
} from "reactstrap";

import { Link } from "react-router-dom";
import {
  Add,
  AttachFileOutlined,
  AttachMoney,
  Schedule
} from "@material-ui/icons";
import { store } from "~/store";

// core components
import api from "~/services/api";
import { normalizeCalcCurrency, normalizeCurrency } from "~/normalize";
import { bigChartsAdmin } from "~/components/charts/bigChart";
import { barCharts } from "./chartsOptions";

export default function DashboardGerencial() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const today = new Date();
  const [isLoading, setIsLoading] = useState(true);
  const [bigChartData, setbigChartData] = useState("hrs");
  const [chartHrsData, setChartHrsData] = useState(null);
  const [chartDespData, setChartDespData] = useState(null);
  const [chartRecebData, setChartRecebData] = useState(null);
  const [horas, setHoras] = useState(null);
  const [mes] = useState(today.toLocaleString("default", { month: "long" }));
  const [vlrDesps, setVlrDesps] = useState(null);
  const [vlrHrs, setVlrHrs] = useState(null);
  const [graphData, setGraphData] = useState({
    oportsGraph: {
      oportsTotal: 0,
      oportsArray: []
    }
  });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (store.getState().auth.user.Colab) {
        const gerencialDash = await api.get("gerencialDash");
        const hrs = await api.get(`horas/?total=${true}&tipo=gerencial`);
        const desps = await api.get(`despesas/?total=${true}&tipo=gerencial`);
        const vlrHrsDb = await api.get(`colab/?vlrHrMes=true&tipo=gerencial`);
        const resultPeriodoGerencial = await api.get(`resultPeriodoGerencial`);
        setGraphData(prevState => ({
          ...prevState,
          oportsGraph: gerencialDash.data.oportsGraph
        }));
        setTableData(gerencialDash.data.oportsForTable);
        setHoras(hrs.data);
        setVlrDesps(normalizeCurrency(desps.data));
        setVlrHrs(normalizeCalcCurrency(vlrHrsDb.data + desps.data));
        setChartHrsData(
          resultPeriodoGerencial.data.map(d => {
            return Math.trunc(d.totalHrs / 60);
          })
        );
        setChartDespData(
          resultPeriodoGerencial.data.map(d => {
            return d.totalDesp / 100;
          })
        );
        setChartRecebData(
          resultPeriodoGerencial.data.map(d => {
            return d.totalReceb;
          })
        );
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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
              <Col xs="8">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-left" sm="6">
                        <CardTitle style={{ color: "#ba54f5" }} tag="h3">
                          Histórico
                        </CardTitle>
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
                              active: bigChartData === "hrs"
                            })}
                            onClick={() => setbigChartData("hrs")}
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
                              active: bigChartData === "desp"
                            })}
                            onClick={() => setbigChartData("desp")}
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
                              active: bigChartData === "receb"
                            })}
                            onClick={() => setbigChartData("receb")}
                          >
                            <input name="options" type="radio" />
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              À pagar
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
                          bigChartData === "hrs"
                            ? bigChartsAdmin.chartHrs(chartHrsData)
                            : bigChartData === "desp"
                            ? bigChartsAdmin.chartDesp(chartDespData)
                            : bigChartData === "receb"
                            ? bigChartsAdmin.chartReceb(chartRecebData)
                            : null
                        }
                        options={bigChartsAdmin.chartOptions}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="4">
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle style={{ color: "#ba54f5" }} tag="h3">
                      Oportunidades
                      <Link
                        style={{ float: "right" }}
                        to="cadastro/oportunidade/oport"
                      >
                        <Add style={{ marginBottom: "7.5px" }} />
                      </Link>
                      <p style={{ float: "right" }}>
                        {" "}
                        {graphData.oportsGraph.oportsTotal}{" "}
                      </p>
                      {/* <i className="tim-icons icon-shape-star text-info" />{" "}
                      {graphData.oportsGraph.oportsTotal} */}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={barCharts.greenBarChart(
                          ["Aberta", "Cot Baixa", "Cot Méd", "Cot Alta"],
                          graphData.oportsGraph.oportsArray
                        )}
                        options={barCharts.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs="5">
                        <div className="info-icon text-center icon-warning">
                          <Schedule
                            style={{ marginTop: 7, color: "white" }}
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
                      <Link to="tabelas/apontamentos/gerencial/horas/">
                        <i className="tim-icons icon-refresh-01" /> Ver horas
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs="5">
                        <div className="info-icon text-center icon-primary">
                          <AttachFileOutlined
                            style={{ marginTop: 7, color: "white" }}
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
                      <Link to="tabelas/apontamentos/gerencial/despesas/">
                        <i className="tim-icons icon-sound-wave" /> Ver despesas
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs="5">
                        <div className="info-icon text-center icon-info">
                          <AttachMoney
                            style={{ marginTop: 7, color: "white" }}
                            fontSize="large"
                          />{" "}
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p
                            style={{ textTransform: "capitalize" }}
                            className="card-category"
                          >
                            {" "}
                            a Pagar {mes}
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
              <Col lg="8" md="6">
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#ba54f5" }} tag="h3">
                      Painel
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table style={{ maxHeight: "1rem" }} responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Código</th>
                          <th>Descrição</th>
                          <th>Cliente</th>
                          <th>Horas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map(oport => {
                          return (
                            <>
                              <tr>
                                <td>{oport.cod}</td>
                                <td>{oport.desc}</td>
                                <td>{oport.Cliente.sigla}</td>
                                <td className="text-center">
                                  <div className="progress-container progress-sm">
                                    <Progress multi>
                                      <span className="progress-value">
                                        {oport.percentHrs}%
                                      </span>
                                      <Progress
                                        bar
                                        max="100"
                                        value={oport.percentHrs}
                                      />
                                    </Progress>
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </Table>
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
