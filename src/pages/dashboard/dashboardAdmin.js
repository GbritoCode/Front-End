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
import React, { useState, useEffect } from "react";
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
import { AttachFileOutlined, AttachMoney, Schedule } from "@material-ui/icons";

import { store } from "~/store";

// core components
// import { chart_1_2_3_options } from "~/variables/charts";
import api from "~/services/api";
import { normalizeCurrency } from "~/normalize";
import history from "~/services/history";
import { bigChartsAdmin } from "~/components/charts/bigChart";

export default function AdminDashboard() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const [isLoading, setIsLoading] = useState(true);
  const [bigChartData, setbigChartData] = useState("hrs");
  const [chartHrsData, setChartHrsData] = useState(null);
  const [chartDespData, setChartDespData] = useState(null);
  const [chartRecebData, setChartRecebData] = useState(null);
  const [horas, setHoras] = useState(null);
  const [mes, setMes] = useState(null);
  const [vlrDesps, setVlrDesps] = useState(null);
  const [vlrHrs, setVlrHrs] = useState(null);
  const { id } = store.getState().auth.user;

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
        const vlrHrsDb = await api.get(`colab/${idColab}/?vlrHrMes=true`);

        const resultPeriodo = await api.get(`resultPeriodo/${idColab}`);

        const month = date.toLocaleString("default", { month: "long" });

        setMes(month);
        setHoras(hrs.data);
        setVlrDesps(normalizeCurrency(desps.data));
        setVlrHrs(normalizeCurrency(vlrHrsDb.data * 100 + desps.data));
        setChartHrsData(
          resultPeriodo.data.map(d => {
            return Math.trunc(d.totalHrs / 60);
          })
        );
        setChartDespData(
          resultPeriodo.data.map(d => {
            return d.totalDesp / 100;
          })
        );
        setChartRecebData(
          resultPeriodo.data.map(d => {
            return d.totalReceb;
          })
        );
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  const setBgChartData = name => {
    setbigChartData(name);
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
                              active: bigChartData === "hrs"
                            })}
                            onClick={() => setBgChartData("hrs")}
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
                            onClick={() => setBgChartData("desp")}
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
                            onClick={() => setBgChartData("receb")}
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
                          // eslint-disable-next-line no-nested-ternary
                          bigChartData === "hrs"
                            ? bigChartsAdmin.chartHrs(chartHrsData)
                            : bigChartData === "desps"
                            ? bigChartsAdmin.chartDesp(chartDespData)
                            : bigChartsAdmin.chartReceb(chartRecebData)
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
                      <Link to={`tabelas/apontamentos/despesas/${id}/`}>
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
          </div>
        </>
      )}
    </>
  );
}
