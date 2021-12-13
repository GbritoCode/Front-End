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
import { normalizeCalcCurrency, normalizeCurrency } from "~/normalize";
import history from "~/services/history";

export default function AdminDashboard() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const [isLoading, setIsLoading] = useState(true);
  const [bigChartData, setbigChartData] = useState("hrs");
  const [horas, setHoras] = useState(null);
  const [mes, setMes] = useState(null);
  const [VlrDesps, setVlrDesps] = useState(null);
  const [VlrHrs, setVlrHrs] = useState(null);
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
    loadData();
  }, []);

  const setBgChartData = name => {
    setbigChartData({
      bigChartData: name
    });
  };

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
                        data={this.state.chartExample1[this.state.bigChartData]}
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
                            despesas {this.state.mes}
                          </p>
                          <CardTitle tag="h3">{this.state.vlrDesps}</CardTitle>
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
