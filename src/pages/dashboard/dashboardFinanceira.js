/* eslint-disable no-nested-ternary */
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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Input,
  Label
} from "reactstrap";

import { Link } from "react-router-dom";
import {
  AccountBalanceWalletOutlined,
  Add,
  AttachMoney,
  Check,
  Close,
  DateRangeOutlined,
  MoneyOff
} from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import { format, getDaysInMonth } from "date-fns";
// import { useDispatch } from "react-redux";
import pt from "date-fns/locale/pt-BR";

// core components
// import { chart_1_2_3_options } from "~/variables/charts";
import api from "~/services/api";
import { bigChartLines, barCharts } from "./chartsOptions";
import { Footer, Header } from "~/components/Modal/modalStyles";
import Modal from "~/components/Modal/modalLarge";
import {
  normalizeCalcCurrency,
  normalizeCurrency,
  normalizeCurrencyDb
} from "~/normalize";
import { labelsDashFinanc, monthsGlobal } from "~/generalVar";
// import { comercialDashFilterFields } from "~/store/modules/keepingFields/actions";

export default function FinanceiraDashboard() {
  document.body.classList.add("white-content");
  // const dispatch = useDispatch();

  const [date, month, year] = new Date().toLocaleDateString("pt-BR").split("/");
  var lastDayMonth = getDaysInMonth(new Date(year, month - 1, date));

  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  console.log(lastDayMonth);
  const [label, setLabel] = useState(
    lastDayMonth === 30
      ? labelsDashFinanc.month30
      : lastDayMonth === 28
      ? labelsDashFinanc.month28
      : lastDayMonth === 29
      ? labelsDashFinanc.month29
      : labelsDashFinanc.month31
  );
  const [data3, setData3] = useState([]);
  const [miniChartData, setMiniChartData] = useState();
  const [dataForGraph, setDataForGraph] = useState({
    visao: "mensal",
    mes: month,
    ano: year,
    particao: "geral",
    inicDate: `${year}-${month}-01`,
    endDate: `${year}-${month}-${lastDayMonth}`
  });

  const [parcsState, setParcsState] = useState({
    parcPendente: null,
    parcAtrasada: null,
    parcAberta: null,
    parcLabelsPendente: null,
    parcLabelsAtrasada: null,
    parcLabelsAberta: null,
    totalPendente: null,
    totalAtrasada: null,
    totalAberta: null
  });

  const [header, setHeader] = useState({
    visao: format(new Date(), "LLLL", { locale: pt }),
    particao: "Geral"
  });

  useEffect(() => {
    const loadData = async () => {
      const response3 = await api.get(
        `/financeiraDash_mensal/?mes=${month}&part=geral`
      );
      setData3(response3.data);
      setMiniChartData(response3.data);
      const response4 = await api.get(`parcela/?chartData=true&tipo=gerencial`);

      setParcsState({
        parcPendente: response4.data.parcPendente,
        parcAtrasada: response4.data.parcAtrasada,
        parcAberta: response4.data.parcAberta,
        parcLabelsPendente: response4.data.labelsPendente,
        parcLabelsAtrasada: response4.data.labelsAtrasada,
        parcLabelsAberta: response4.data.labelsAberta,
        totalPendente: response4.data.totalPendente,
        totalAtrasada: response4.data.totalAtrasada,
        totalAberta: response4.data.totalAberta
      });
    };
    loadData();
    setIsLoading(false);
  }, [month]);

  const handleFilterChange = async (visao, mes, ano, part) => {
    if (visao === "anual") {
      const response3 = await api.get(
        `/financeiraDash_anual/?ano=${ano}&part=${part}`
      );
      setData3(response3.data);
      setMiniChartData(response3.data);
    } else if (visao === "mensal") {
      const response3 = await api.get(
        `/financeiraDash_mensal/?mes=${mes}&part=${part}`
      );
      setData3(response3.data);
      setMiniChartData(response3.data);
    }
  };

  const createLabels = (type, division, lastDay) => {
    console.log(type, division, lastDay);
    switch (type) {
      case "mensal":
        switch (division) {
          case "geral":
            if (lastDay === 31) {
              setLabel(labelsDashFinanc.month31);
              return;
            }
            if (lastDay === 28) {
              setLabel(labelsDashFinanc.month28);
              return;
            }
            if (lastDay === 29) {
              setLabel(labelsDashFinanc.month29);
              return;
            }
            setLabel(labelsDashFinanc.month30);
            break;
          case "1q":
            setLabel(labelsDashFinanc.month1Q);
            break;
          case "2q":
            if (lastDay === 31) {
              setLabel(labelsDashFinanc.month2Q31);
            }
            if (lastDay === 28) {
              setLabel(labelsDashFinanc.month2Q28);
              return;
            }
            if (lastDay === 29) {
              setLabel(labelsDashFinanc.month2Q29);
              return;
            }
            setLabel(labelsDashFinanc.month2Q30);
            break;
          default:
            break;
        }
        break;
      case "anual":
        switch (division) {
          case "geral":
            setLabel(labelsDashFinanc.yearly);
            break;
          case "1sem":
            setLabel(labelsDashFinanc.yearly1S);
            break;
          case "2sem":
            setLabel(labelsDashFinanc.yearly2S);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };
  console.log(parcsState);
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
                <h4 className="modalHeader">Filtro</h4>
              </Header>

              <Row>
                <Col sm="4">
                  <Label>Visão</Label>
                  <Input
                    type="select"
                    id="visao"
                    value={dataForGraph.visao}
                    onChangeCapture={e => {
                      const { value } = e.target;
                      createLabels(value, dataForGraph.particao, lastDayMonth);

                      setDataForGraph(prevState => ({
                        ...prevState,
                        visao: value
                      }));
                      handleFilterChange(
                        value,
                        dataForGraph.mes,
                        dataForGraph.ano,
                        dataForGraph.particao
                      );

                      value === "anual" &&
                        setHeader(prevState => ({
                          ...prevState,
                          visao: dataForGraph.ano
                        }));

                      value === "mensal" &&
                        setHeader(prevState => ({
                          ...prevState,
                          visao: monthsGlobal[dataForGraph.mes - 1].full
                        }));
                    }}
                  >
                    <option key={1} value="mensal">
                      Mensal
                    </option>
                    <option key={2} value="anual">
                      Anual
                    </option>
                  </Input>
                </Col>
                <Col hidden={dataForGraph.visao === "anual"} id="mesCol" sm="4">
                  <Label>Mes</Label>
                  <Input
                    type="select"
                    id="mes"
                    value={dataForGraph.mes}
                    onChangeCapture={e => {
                      const { value } = e.target;
                      lastDayMonth = getDaysInMonth(
                        new Date(year, value - 1, date)
                      );
                      createLabels(
                        "mensal",
                        dataForGraph.particao,
                        lastDayMonth
                      );
                      setDataForGraph(prevState => ({
                        ...prevState,
                        mes: value
                      }));
                      handleFilterChange(
                        dataForGraph.visao,
                        value,
                        dataForGraph.ano,
                        dataForGraph.particao
                      );
                      setHeader(prevState => ({
                        ...prevState,
                        visao: monthsGlobal[value - 1].full
                      }));
                    }}
                  >
                    {monthsGlobal.map((monthGlobal, idx) => {
                      return (
                        <option key={idx} value={monthGlobal.number}>
                          {monthGlobal.full}{" "}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
                <Col
                  hidden={dataForGraph.visao === "mensal"}
                  id="anoCol"
                  sm="4"
                >
                  <Label>Ano</Label>
                  <Input
                    type="select"
                    id="ano"
                    value={dataForGraph.ano}
                    onChangeCapture={e => {
                      const { value } = e.target;
                      setDataForGraph(prevState => ({
                        ...prevState,
                        ano: value
                      }));
                      handleFilterChange(
                        dataForGraph.visao,
                        dataForGraph.mes,
                        value,
                        dataForGraph.particao
                      );
                      setHeader(prevState => ({
                        ...prevState,
                        visao: value
                      }));
                    }}
                  >
                    <option key={2020} value={2020}>
                      2020
                    </option>
                    <option key={2021} value={2021}>
                      2021
                    </option>
                    <option key={2022} value={2022}>
                      2022
                    </option>
                    <option key={2023} value={2023}>
                      2023
                    </option>
                  </Input>
                </Col>
                <Col sm="4">
                  <Label>Partição</Label>
                  <Input
                    type="select"
                    id="particao"
                    value={dataForGraph.particao}
                    onChangeCapture={e => {
                      const { value } = e.target;
                      setDataForGraph(prevState => ({
                        ...prevState,
                        particao: value
                      }));
                      createLabels(dataForGraph.visao, value, lastDayMonth);
                      handleFilterChange(
                        dataForGraph.visao,
                        dataForGraph.mes,
                        dataForGraph.ano,
                        value
                      );
                      setHeader(prevState => ({
                        ...prevState,
                        particao: value
                      }));
                    }}
                  >
                    <option key={1} value="geral">
                      Geral
                    </option>
                    <option
                      hidden={dataForGraph.visao === "anual"}
                      key={2}
                      value="1q"
                    >
                      1ª Quinzena
                    </option>
                    <option
                      hidden={dataForGraph.visao === "anual"}
                      key={3}
                      value="2q"
                    >
                      2ª Quinzena
                    </option>
                    <option
                      hidden={dataForGraph.visao === "mensal"}
                      key={4}
                      value="1sem"
                    >
                      1º Semestre
                    </option>
                    <option
                      hidden={dataForGraph.visao === "mensal"}
                      key={5}
                      value="2sem"
                    >
                      2º Semestre
                    </option>
                  </Input>
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

                        <CardTitle
                          style={{
                            marginBottom: 0,
                            textTransform: "capitalize"
                          }}
                          tag="h3"
                        >
                          {header.visao}
                        </CardTitle>
                        <p style={{ fontSize: 14 }}>{header.particao}</p>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Card className="card-chart">
                  <CardHeader>
                    <Link to="/cadastro/comercial/movCaixa">
                      <Tooltip
                        title="Novo Movimento"
                        placement="top"
                        interactive
                      >
                        <Button
                          style={{
                            float: "right",
                            paddingBottom: "15px"
                          }}
                          className={classNames("btn-icon btn-link like")}
                        >
                          <Add fontSize="md" />
                        </Button>
                      </Tooltip>{" "}
                    </Link>
                    <p
                      style={{ color: "#808080", paddingTop: "5px" }}
                      className="card-category"
                    >
                      Fluxo de Caixa
                    </p>
                  </CardHeader>{" "}
                  <CardBody>
                    <div className="chart-area">
                      <Line
                        data={bigChartLines.data(
                          data3.arraySaldo,
                          data3.arraySaldoPrev,
                          data3.arrayDesp,
                          data3.arrayRec,
                          label
                        )}
                        options={bigChartLines.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row />
            <Row>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs="5">
                        <div
                          style={{
                            backgroundImage:
                              "linear-gradient(to bottom left, #5CC23F, #5CC23F)"
                          }}
                          className="info-icon text-center"
                        >
                          <AttachMoney
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
                            Receita {header.visao}
                          </p>
                          <CardTitle tag="h3">
                            {miniChartData
                              ? normalizeCurrencyDb(miniChartData.somaRec)
                              : normalizeCurrencyDb(0)}
                          </CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    {/* <hr /> */}
                    {/* <div className="stats">
                      <Link
                        to={`tabelas/comercial/empresas/${dataForGraph.campId}/${dataForGraph.inicDate}/${dataForGraph.endDate}/created`}
                      >
                        <i className="tim-icons icon-refresh-01" /> Ver Empresas
                      </Link>
                    </div> */}
                  </CardFooter>
                </Card>
              </Col>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs="5">
                        <div
                          style={{
                            backgroundImage:
                              "linear-gradient(to bottom left, #F00501, #F00501)"
                          }}
                          className="info-icon text-center"
                        >
                          <MoneyOff
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
                            Despesa {header.visao}{" "}
                          </p>
                          <CardTitle tag="h3">
                            {miniChartData
                              ? normalizeCalcCurrency(miniChartData.somaDesp)
                              : normalizeCurrencyDb(0)}
                          </CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    {/* <hr />
                    <div className="stats">
                      <Link
                        to={`tabelas/comercial/FUPs/${dataForGraph.campId}/${dataForGraph.inicDate}/${dataForGraph.endDate}`}
                      >
                        <i className="tim-icons icon-sound-wave" /> Ver Follow
                        Ups
                      </Link>
                    </div> */}
                  </CardFooter>
                </Card>
              </Col>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs="5">
                        <div
                          style={{
                            backgroundImage:
                              "linear-gradient(to bottom left, #2DA9FC, #2DA9FC)"
                          }}
                          className="info-icon text-center"
                        >
                          <AccountBalanceWalletOutlined
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
                            {" "}
                            Saldo {header.visao}
                          </p>
                          <CardTitle tag="h3">
                            {miniChartData
                              ? normalizeCalcCurrency(miniChartData.somaSaldo)
                              : normalizeCurrencyDb(0)}
                          </CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    {/* <hr /> */}
                    {/* <div className="stats">
                      <Link
                        to={`tabelas/comercial/empresasFinalizadas/${dataForGraph.campId}/${dataForGraph.inicDate}/${dataForGraph.endDate}`}
                      >
                        <i className="tim-icons icon-trophy" /> Ver Empresas
                      </Link>{" "}
                    </div> */}
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
                    <CardTitle
                      tag="h4"
                      style={{ color: "orange", fontSize: 20 }}
                    >
                      <i className="tim-icons icon-send text-info" />{" "}
                      {normalizeCurrency(parcsState.totalPendente)}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={barCharts.orangeBarChart(
                          parcsState.parcLabelsPendente,
                          parcsState.parcPendente
                        )}
                        options={barCharts.options}
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
                    <CardTitle
                      tag="h3"
                      style={{ color: "green", fontSize: 20 }}
                    >
                      <i className="tim-icons icon-tag text-info" />{" "}
                      {normalizeCurrency(parcsState.totalAberta)}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={barCharts.greenBarChart(
                          parcsState.parcLabelsAberta,
                          parcsState.parcAberta
                        )}
                        options={barCharts.options}
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
                    <CardTitle tag="h3" style={{ color: "red", fontSize: 20 }}>
                      <i className="tim-icons icon-shape-star text-info" />{" "}
                      {normalizeCurrency(parcsState.totalAtrasada)}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={barCharts.redBarChart(
                          parcsState.parcLabelsAtrasada,
                          parcsState.parcAtrasada
                        )}
                        options={barCharts.options}
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
