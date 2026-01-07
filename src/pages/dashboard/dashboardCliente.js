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
import React, { useCallback, useEffect, useState } from "react";
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
  Table,
  Input,
  Label
} from "reactstrap";

import { Link } from "react-router-dom";
import {
  Add,
  AttachFileOutlined,
  AttachMoney,
  Check,
  Close,
  DateRangeOutlined,
  Schedule
} from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import { store } from "~/store";

// core components
import api from "~/services/api";
import { normalizeCalcCurrency, normalizeCurrency } from "~/normalize";
import { bigChartsAdmin } from "~/components/charts/bigChart";
import { barCharts } from "./chartsOptions";
import { Footer, Header } from "~/components/Modal/modalStyles";
import Modal from "~/components/Modal/modalLarge";
import { monthsGlobal, baseYearGlobal } from "~/generalVar";

export default function DashboardCliente() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const [todaysDate, todaysMonth, todaysYear] = new Date()
    .toLocaleDateString("pt-BR")
    .split("/");

  const [clientName, setClientName] = useState("");
  const [mainClient] = useState(store.getState().auth.user.mainClient);
  const [allowedClients] = useState(store.getState().auth.user.allowedClients);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [bigChartData, setbigChartData] = useState("hrs");
  const [chartHrsData, setChartHrsData] = useState(null);
  const [chartDespData, setChartDespData] = useState(null);
  const [chartRecebData, setChartRecebData] = useState(null);
  const [horas, setHoras] = useState(null);
  const [actualDateLong, setActualDateLongs] = useState({
    month: monthsGlobal[todaysMonth - 1].full,
    year: todaysYear
  });
  const [vlrDesps, setVlrDesps] = useState(null);
  const [vlrHrs, setVlrHrs] = useState(null);
  const [graphData, setGraphData] = useState({
    oportsGraph: {
      oportsTotal: 0,
      oportsArray: []
    }
  });
  const [tableData, setTableData] = useState([]);
  const [clienteData, setClienteData] = useState([]);

  const [filterForm, setFilterForm] = useState({
    actualClientId: mainClient,
    yearsFilter: [],
    year: todaysYear,
    month: todaysMonth
  });

  const loadData = useCallback(async () => {
    const { actualClientId, month,year } = filterForm;

    if (store.getState().auth.user.Colab) {
      const clienteDash = await api.get(`clienteDash/?cliId=${actualClientId}`);
      const hrs = await api.get(
        `horas/dash/cliente/pacote/${actualClientId}/${month}/${year}`
      );
      const desps = await api.get(
        `despesas/dash/cliente/${actualClientId}/${month}/${year}`
      );
      const vlrHrsDb = await api.get(
        `cliente/dash/vlr-horas/${actualClientId}/${month}/${year}`
      );
      const resultPeriodoGerencial = await api.get(`resultPeriodoGerencial`);

      setHoras(hrs.data);
      setVlrDesps(normalizeCurrency(desps.data));
      setVlrHrs(normalizeCalcCurrency(vlrHrsDb.data.debt + desps.data));
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
      setGraphData(prevState => ({
        ...prevState,
        oportsGraph: clienteDash.data.oportsGraph
      }));
      setTableData(clienteDash.data.oportsForTable);
      setClientName(clienteDash.data.clientName);
      setIsLoading(false);

      setActualDateLongs({
        month: monthsGlobal[filterForm.month - 1].full,
        year: filterForm.year
      });
    }
  }, [filterForm]);

  useEffect(() => {
    loadData(filterForm.actualClientId);
  }, [filterForm, loadData]);

  useEffect(() => {
    const firstLoad = async () => {
      const yearsFilter = [];
      for (let i = 0; i <= todaysYear - baseYearGlobal; i++) {
        yearsFilter.push(baseYearGlobal + i);
      }
      const clienteDash = await api.get(`clienteDash/`);

      setFilterForm(prevState => ({
        ...prevState,
        yearsFilter
      }));
      setClienteData(
        clienteDash.data.cli.filter(el => {
          return allowedClients.includes(`${el.id}`);
        })
      );
    };
    firstLoad();
    loadData(mainClient);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedClients, mainClient, todaysYear]);

  const handleFilterChange = async (event, field) => {
    event.persist();
    setFilterForm(prevState => ({
      ...prevState,
      [field]: event.target.value
    }));
    console.log(filterForm);
  };

  const checkColor = percentHrs => {
    if (percentHrs < 90) {
      return null;
    }
    if (percentHrs <= 100) {
      return "yellow";
    }
    return "red";
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
            <Modal
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
                <h4 className="modalHeader">Filtrar</h4>
              </Header>

              <Row>
                <Col sm="4">
                  <Label>Cliente</Label>
                  <Input
                    type="select"
                    id="camp"
                    onChangeCapture={event =>
                      handleFilterChange(event, "actualClientId")
                    }
                    value={filterForm.actualClientId}
                  >
                    <option disabled value="">
                      {" "}
                      Selecione um Cliente
                    </option>
                    {clienteData.map((cli, index) => (
                      <option key={index} value={cli.id}>
                        {cli.nomeAbv} - {cli.rzSoc}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col id="mesCol" sm="4">
                  <Label>Mes</Label>
                  <Input
                    type="select"
                    id="mes"
                    value={filterForm.month}
                    onChangeCapture={event =>
                      handleFilterChange(event, "month")
                    }
                  >
                    {monthsGlobal.map((monthGlobal, idx) => {
                      return (
                        <option key={idx} value={monthGlobal.numberParsed}>
                          {monthGlobal.full}{" "}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
                <Col id="anoCol" sm="4">
                  <Label>Ano</Label>
                  <Input
                    type="select"
                    id="ano"
                    value={filterForm.year}
                    onChangeCapture={event => handleFilterChange(event, "year")}
                  >
                    {filterForm.yearsFilter.map((el, idx) => (
                      <option key={idx} value={el}>
                        {el}{" "}
                      </option>
                    ))}
                  </Input>
                </Col>
              </Row>

              <Footer />
            </Modal>
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

                    <CardTitle style={{ marginBottom: 0 }} tag="h3">
                      {clientName} - {actualDateLong.month} -{" "}
                      {actualDateLong.year}
                    </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
            </Card>
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
                          {/* <Button
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
                          </Button> */}
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
                          ["Aberta", "Cotada", "Aprovada"],
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
                            horas pacote {actualDateLong.month}
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
                            despesas {actualDateLong.month}
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
                            a Pagar {actualDateLong.month}
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
                      Projetos em Andamento
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table style={{ maxHeight: "2rem" }} responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Código</th>
                          <th>Descrição</th>
                          <th>Cliente</th>
                          <th>% Conclusão Atual</th>
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
                                        {oport.percentComplete}%
                                      </span>
                                      <Progress
                                        bar
                                        max="100"
                                        value={oport.percentComplete}
                                        color={checkColor(
                                          oport.percentComplete
                                        )}
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
