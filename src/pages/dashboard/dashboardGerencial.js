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
  UncontrolledTooltip,
  Table
} from "reactstrap";

import { Link } from "react-router-dom";
import { AttachFileOutlined, AttachMoney, Schedule } from "@material-ui/icons";
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
            return d.totalReceb / 100;
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
              </Col>
              <Col lg="4" md="6">
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
              </Col>
              <Col lg="4" md="6">
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
            </Row>
            <Row>
              <Col lg="4">
                <Card className=" /*card-chart">
                  <CardHeader>
                    <Link to="cadastro/oportunidade/oport">Oportunidades</Link>
                    <CardTitle
                      tag="h3"
                      style={{ color: "green", fontSize: 20 }}
                    >
                      <i className="tim-icons icon-shape-star text-info" />{" "}
                      {graphData.oportsGraph.oportsTotal}
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
              <Col lg="8">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h3" style={{ fontSize: 15 }}>
                      Oportunidades
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th className="text-center">#</th>
                          <th>Name</th>
                          <th>Job Position</th>
                          <th>Milestone</th>
                          <th className="text-right">Salary</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center">
                            <div className="photo">
                              {/* <img
                                alt="..."
                                src={require("assets/img/tania.jpg").default}
                              /> */}
                            </div>
                          </td>
                          <td>Tania Mike</td>
                          <td>Develop</td>
                          <td className="text-center">
                            <div className="progress-container progress-sm">
                              <Progress multi>
                                <span className="progress-value">25%</span>
                                <Progress bar max="100" value="25" />
                              </Progress>
                            </div>
                          </td>
                          <td className="text-right">€ 99,225</td>
                          <td className="text-right">
                            <Button
                              className="btn-link btn-icon btn-neutral"
                              color="success"
                              id="tooltip618296632"
                              size="sm"
                              title="Refresh"
                              type="button"
                            >
                              <i className="tim-icons icon-refresh-01" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip618296632"
                            >
                              Tooltip on top
                            </UncontrolledTooltip>
                            <Button
                              className="btn-link btn-icon btn-neutral"
                              color="danger"
                              id="tooltip707467505"
                              size="sm"
                              title="Delete"
                              type="button"
                            >
                              <i className="tim-icons icon-simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip707467505"
                            >
                              Tooltip on top
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">
                            <div className="photo">
                              {/* <img
                                alt="..."
                                src={require("assets/img/emilyz.jpg").default}
                              /> */}
                            </div>
                          </td>
                          <td>Manuela Rico</td>
                          <td>Manager</td>
                          <td className="text-center">
                            <div className="progress-container progress-sm">
                              <Progress multi>
                                <span className="progress-value">15%</span>
                                <Progress bar max="100" value="15" />
                              </Progress>
                            </div>
                          </td>
                          <td className="text-right">€ 99,201</td>
                          <td className="text-right">
                            <Button
                              className="btn-link btn-icon"
                              color="success"
                              id="tooltip30547133"
                              size="sm"
                              title="Refresh"
                              type="button"
                            >
                              <i className="tim-icons icon-refresh-01" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip30547133"
                            >
                              Tooltip on top
                            </UncontrolledTooltip>
                            <Button
                              className="btn-link btn-icon"
                              color="danger"
                              id="tooltip156899243"
                              size="sm"
                              title="Delete"
                              type="button"
                            >
                              <i className="tim-icons icon-simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip156899243"
                            >
                              Tooltip on top
                            </UncontrolledTooltip>
                          </td>
                        </tr>
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
