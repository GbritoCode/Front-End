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
import { Bar, Doughnut } from "react-chartjs-2";
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
  Check,
  Close,
  DateRangeOutlined,
  DomainDisabled,
  HeadsetMic
} from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import { getDaysInMonth, isAfter, isBefore, isToday, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import { store } from "~/store";

// core components
// import { chart_1_2_3_options } from "~/variables/charts";
import api from "~/services/api";
import { barChart_1, doughnutChart_1 } from "./chartsOptions";
import history from "~/services/history";
import { Footer, Header } from "~/components/Modal/modalStyles";
import Modal from "~/components/Modal/modalLarge";
import { normalizeDate, pt_brDateToEUADate } from "~/normalize";
import { comercialDashFilterFields } from "~/store/modules/keepingFields/actions";

export default function ComercialDashboard() {
  document.body.classList.add("white-content");
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [campData, setCampData] = useState([]);
  const [dashFields, setDashFields] = useState({});
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [miniChartData, setMiniChartData] = useState();
  const [date, month, year] = new Date().toLocaleDateString("pt-BR").split("/");
  const lastDayMonth = getDaysInMonth(new Date(year, month - 1, date));
  const [dataForTable, setDataForTable] = useState({
    campId: "",
    inicDate: `${year}-${month}-01`,
    endDate: `${year}-${month}-${lastDayMonth}`
  });
  const [dataForGraph, setDataForGraph] = useState({
    red: 0,
    yellow: 0,
    green: 0,
    reset: true
  });
  const [cliStatusGraph, setCliStatusGraph] = useState({
    reuniao: 0,
    orcamento: 0,
    efetiv: 0,
    reset: true
  });
  const [dataForDoughnut, setDataForDoughnut] = useState({
    reset: true
  });
  // useEffect(() => {
  //   const createCharts = () => {
  //     const chart_1_2_3_options = {
  //       maintainAspectRatio: false,
  //       legend: {
  //         display: false
  //       },
  //       tooltips: {
  //         backgroundColor: "#f5f5f5",
  //         titleFontColor: "#333",
  //         bodyFontColor: "#666",
  //         bodySpacing: 4,
  //         xPadding: 12,
  //         mode: "nearest",
  //         intersect: 0,
  //         position: "nearest"
  //       },
  //       responsive: true,
  //       scales: {
  //         yAxes: [
  //           {
  //             barPercentage: 1.6,
  //             gridLines: {
  //               drawBorder: false,
  //               color: "rgba(29,140,248,0.0)",
  //               zeroLineColor: "transparent"
  //             },
  //             ticks: {
  //               suggestedMin: 60,
  //               suggestedMax: 125,
  //               padding: 20,
  //               fontColor: "#9a9a9a"
  //             }
  //           }
  //         ],
  //         xAxes: [
  //           {
  //             barPercentage: 1.6,
  //             gridLines: {
  //               drawBorder: false,
  //               color: "rgba(29,140,248,0.1)",
  //               zeroLineColor: "transparent"
  //             },
  //             ticks: {
  //               padding: 20,
  //               fontColor: "#9a9a9a"
  //             }
  //           }
  //         ]
  //       }
  //     };

  //     const chartExample1 = {
  //       data1: canvas => {
  //         const ctx = canvas.getContext("2d");

  //         const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  //         gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
  //         gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
  //         gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); // blue colors

  //         return {
  //           labels: [
  //             "JAN",
  //             "FEV",
  //             "MAR",
  //             "ABR",
  //             "MAI",
  //             "JUN",
  //             "JUL",
  //             "AGO",
  //             "SET",
  //             "OUT",
  //             "NOV",
  //             "DEZ"
  //           ],
  //           datasets: [
  //             {
  //               label: "Horas",
  //               fill: true,
  //               backgroundColor: gradientStroke,
  //               borderColor: "#1f8ef1",
  //               borderWidth: 2,
  //               borderDash: [],
  //               borderDashOffset: 0.0,
  //               pointBackgroundColor: "#1f8ef1",
  //               pointBorderColor: "rgba(255,255,255,0)",
  //               pointHoverBackgroundColor: "#1f8ef1",
  //               pointBorderWidth: 20,
  //               pointHoverRadius: 4,
  //               pointHoverBorderWidth: 15,
  //               pointRadius: 4,
  //               data: chartHrsData
  //             }
  //           ]
  //         };
  //       },
  //       data2: canvas => {
  //         const ctx = canvas.getContext("2d");

  //         const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  //         gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
  //         gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
  //         gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); // blue colors

  //         return {
  //           labels: [
  //             "JAN",
  //             "FEV",
  //             "MAR",
  //             "ABR",
  //             "MAI",
  //             "JUN",
  //             "JUL",
  //             "AGO",
  //             "SET",
  //             "OUT",
  //             "NOV",
  //             "DEZ"
  //           ],
  //           datasets: [
  //             {
  //               label: "Despesas",
  //               fill: true,
  //               backgroundColor: gradientStroke,
  //               borderColor: "#1f8ef1",
  //               borderWidth: 2,
  //               borderDash: [],
  //               borderDashOffset: 0.0,
  //               pointBackgroundColor: "#1f8ef1",
  //               pointBorderColor: "rgba(255,255,255,0)",
  //               pointHoverBackgroundColor: "#1f8ef1",
  //               pointBorderWidth: 20,
  //               pointHoverRadius: 4,
  //               pointHoverBorderWidth: 15,
  //               pointRadius: 4,
  //               data: chartDespData
  //             }
  //           ]
  //         };
  //       },
  //       data3: canvas => {
  //         const ctx = canvas.getContext("2d");

  //         const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  //         gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
  //         gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
  //         gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); // blue colors

  //         return {
  //           labels: [
  //             "JAN",
  //             "FEV",
  //             "MAR",
  //             "ABR",
  //             "MAI",
  //             "JUN",
  //             "JUL",
  //             "AGO",
  //             "SET",
  //             "OUT",
  //             "NOV",
  //             "DEZ"
  //           ],
  //           datasets: [
  //             {
  //               label: "Recebido",
  //               fill: true,
  //               backgroundColor: gradientStroke,
  //               borderColor: "#1f8ef1",
  //               borderWidth: 2,
  //               borderDash: [],
  //               borderDashOffset: 0.0,
  //               pointBackgroundColor: "#1f8ef1",
  //               pointBorderColor: "rgba(255,255,255,0)",
  //               pointHoverBackgroundColor: "#1f8ef1",
  //               pointBorderWidth: 20,
  //               pointHoverRadius: 4,
  //               pointHoverBorderWidth: 15,
  //               pointRadius: 4,
  //               data: chartRecebData
  //             }
  //           ]
  //         };
  //       },
  //       options: chart_1_2_3_options
  //     };
  //     setBigChart(chartExample1);
  //   };
  //   createCharts();
  // }, [chartDespData, chartHrsData, chartRecebData, setBigChart]);
  useEffect(() => {
    const loadData = async () => {
      const { Colab } = store.getState().auth.user;
      if (Colab) {
        const response = await api.get("/campanha");
        setData(
          response.data.filter(
            arr =>
              (isAfter(
                new Date(),
                parseISO(pt_brDateToEUADate(arr.dataInic))
              ) ||
                isToday(parseISO(pt_brDateToEUADate(arr.dataFim)))) &&
              isBefore(new Date(), parseISO(pt_brDateToEUADate(arr.dataFim)))
          )
        );
        const dashFieldsAux = {};
        let array = [];

        const active = [];
        for (let i = 0; i < response.data.length; i += 1) {
          active[i] = {
            data: response.data[i].FollowUps,
            camp: response.data[i].id
          };
          dashFieldsAux[response.data[i].id] = response.data[i].dashFields;
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
        setDashFields({ ...dashFieldsAux });
        setIsLoading(false);
      }
    };
    loadData();
  }, []);
  const handleFilterChange = async (camp, dataInic, dataFim) => {
    if (!dataForGraph.reset) {
      dataForGraph.red = 0;
      dataForGraph.yellow = 0;
      dataForGraph.green = 0;
      dataForGraph.reset = false;
    }
    if (!dataForDoughnut.reset) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in dataForDoughnut) {
        if (dataForDoughnut.hasOwnProperty(key)) {
          console.log(dataForDoughnut[key]);
          delete dataForDoughnut[key];
        }
      }
      dataForDoughnut.reset = true;
    }
    if (!cliStatusGraph.reset) {
      cliStatusGraph.reuniao = 0;
      cliStatusGraph.orcamento = 0;
      cliStatusGraph.efetiv = 0;
      cliStatusGraph.reset = false;
    }
    const aux = data.filter(arr => arr.id === parseInt(camp, 10));

    setCampData({
      cod: aux[0].cod,
      desc: aux[0].desc,
      dataInic,
      dataFim
    });

    for (let j = 0; j < data2.length; j += 1) {
      if (data2[j].camp === parseInt(camp, 10)) {
        for (let i = 0; i < data2[j].data.length; i += 1) {
          switch (true) {
            case data2[j].data[i].distanceFromToday <= 0 &&
              data2[j].data[i].proxPasso !== 10:
              dataForGraph.red += 1;
              dataForGraph.reset = false;
              break;
            case data2[j].data[i].distanceFromToday > 0 &&
              data2[j].data[i].distanceFromToday <= 4 &&
              data2[j].data[i].proxPasso !== 10:
              dataForGraph.yellow += 1;
              dataForGraph.reset = false;
              break;
            case data2[j].data[i].distanceFromToday >= 5 &&
              data2[j].data[i].proxPasso !== 10:
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
      .then(result => {
        for (let i = 0; i < result.data.finalizedFups.rows.length; i += 1) {
          if (result.data.finalizedFups.rows[i].CamposDinamicosProspect) {
            if (
              !dataForDoughnut[
                result.data.finalizedFups.rows[i].CamposDinamicosProspect.valor
              ]
            ) {
              dataForDoughnut[
                result.data.finalizedFups.rows[i].CamposDinamicosProspect.valor
              ] = 1;
              dataForDoughnut.reset = false;
            } else {
              dataForDoughnut[
                result.data.finalizedFups.rows[i].CamposDinamicosProspect.valor
              ] += 1;
              dataForDoughnut.reset = false;
            }
          }
        }
        const newDataInic = new Date(dataInic);
        const newDataFim = new Date(dataFim);
        for (let i = 0; i < result.data.cliStatusPassing.rows.length; i += 1) {
          if (result.data.cliStatusPassing.rows[i].reuniaoAgend !== null) {
            if (
              newDataInic <=
              new Date(result.data.cliStatusPassing.rows[i].reuniaoAgend) <=
              newDataFim
            ) {
              cliStatusGraph.reuniao += 1;
              cliStatusGraph.reset = false;
            }
          }
          if (result.data.cliStatusPassing.rows[i].orcamentoSolict !== null) {
            if (
              newDataInic <=
              new Date(result.data.cliStatusPassing.rows[i].orcamentoSolict) <=
              newDataFim
            ) {
              cliStatusGraph.orcamento += 1;
              cliStatusGraph.reset = false;
            }
          }
          if (result.data.cliStatusPassing.rows[i].efetivacao !== null) {
            if (
              newDataInic <=
              new Date(result.data.cliStatusPassing.rows[i].efetivacao) <=
              newDataFim
            ) {
              cliStatusGraph.efetiv = 1;
              cliStatusGraph.reset = false;
            }
          }
        }
        setMiniChartData(result.data);
      });
    dispatch(
      comercialDashFilterFields({
        camp: aux[0].id,
        inicDate: dataInic,
        endDate: dataFim,
        dataForDoughnut: { ...dataForDoughnut },
        cliStatusGraph: { ...cliStatusGraph }
      })
    );
  };

  useEffect(() => {
    async function teste() {
      const { comercialDash } = store.getState().field;
      if (comercialDash.camp) {
        const aux = data.filter(arr => arr.id === comercialDash.camp);
        setCampData({
          cod: aux.length > 0 ? aux[0].cod : null,
          desc: aux.length > 0 ? aux[0].desc : null,
          dataInic: comercialDash.inicDate,
          dataFim: comercialDash.endDate
        });

        for (let j = 0; j < data2.length; j += 1) {
          if (data2[j].camp === parseInt(comercialDash.camp, 10)) {
            for (let i = 0; i < data2[j].data.length; i += 1) {
              switch (true) {
                case data2[j].data[i].distanceFromToday <= 0 &&
                  data2[j].data[i].proxPasso !== 10:
                  setDataForGraph(prevState => ({
                    ...prevState,
                    red: prevState.red + 1,
                    reset: false
                  }));
                  break;
                case data2[j].data[i].distanceFromToday > 0 &&
                  data2[j].data[i].distanceFromToday <= 4 &&
                  data2[j].data[i].proxPasso !== 10:
                  setDataForGraph(prevState => ({
                    ...prevState,
                    yellow: prevState.yellow + 1,
                    reset: false
                  }));
                  break;
                case data2[j].data[i].distanceFromToday >= 5 &&
                  data2[j].data[i].proxPasso !== 10:
                  setDataForGraph(prevState => ({
                    ...prevState,
                    green: prevState.green + 1,
                    reset: false
                  }));
                  break;
                case data2[j].data[i].distanceFromToday === "--":
                  return "--";
                default:
              }
            }
          }
        }
        setDataForTable({
          campId: comercialDash.camp,
          inicDate: comercialDash.inicDate,
          endDate: comercialDash.endDate
        });
        setDataForDoughnut({ ...comercialDash.dataForDoughnut });
        setCliStatusGraph({ ...comercialDash.cliStatusGraph });
        await api
          .get(
            `comercialDash/?camp=${comercialDash.camp}&dataInic=${comercialDash.inicDate}&dataFim=${comercialDash.endDate}`
          )
          .then(result => {
            setMiniChartData(result.data);
          });
      }
    }
    teste();
  }, [data, data2]);
  // const setBgChartData = name => {
  //   setBigChartData(name);
  // };

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
                    defaultValue={dataForTable.campId}
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
                    onChangeCapture={e => {
                      handleFilterChange(
                        document.getElementById("camp").value
                          ? document.getElementById("camp").value
                          : dataForTable.campId,
                        e.target.value,
                        document.getElementById("dataFim").value
                          ? document.getElementById("dataFim").value
                          : dataForTable.endDate
                      );
                    }}
                  />
                </Col>
                <Col sm="4">
                  <Input
                    type="date"
                    id="dataFim"
                    defaultValue={dataForTable.endDate}
                    onChangeCapture={e => {
                      handleFilterChange(
                        document.getElementById("camp").value
                          ? document.getElementById("camp").value
                          : dataForTable.campId,
                        document.getElementById("dataInic").value
                          ? document.getElementById("dataInic").value
                          : dataForTable.inicDate,
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

                        <CardTitle style={{ marginBottom: 0 }} tag="h3">
                          {campData.desc ? campData.desc : "--"}
                        </CardTitle>
                        {/* <p style={{ fontSize: 14 }}>
                        </p> */}
                        <p style={{ fontSize: 14 }}>
                          {campData.dataInic
                            ? normalizeDate(campData.dataInic)
                            : "--"}{" "}
                          -{" "}
                          {campData.dataFim
                            ? normalizeDate(campData.dataFim)
                            : "--"}
                        </p>
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
            </Row>
            <Row>
              <Col
                hidden={
                  dashFields[dataForTable.campId]
                    ? dashFields[dataForTable.campId].search("StatusCli") === -1
                    : false
                }
                lg="8"
              >
                <Card className=" /*card-chart">
                  <CardHeader>
                    <p style={{ color: "#808080" }} className="card-category">
                      Evolução Funil
                    </p>
                    <CardTitle
                      tag="h4"
                      style={{ color: "orange", fontSize: 20 }}
                    >
                      <i className="tim-icons icon-send text-info" />{" "}
                    </CardTitle>
                  </CardHeader>
                  <CardBody style={{ padding: "1.45%" }}>
                    <div className="chart-area">
                      <Bar
                        data={barChart_1.data(
                          [
                            "Qualificados",
                            "Informados",
                            "Ativados",
                            "Efetivados"
                          ],
                          [
                            miniChartData
                              ? miniChartData.cliJoinedCamp.rows.length
                              : 0,
                            cliStatusGraph.reuniao,
                            cliStatusGraph.orcamento,
                            cliStatusGraph.efetiv
                          ]
                        )}
                        options={barChart_1.options}
                        onElementsClick={elems => {
                          // if required to build the URL, you can
                          // get datasetIndex and value index from an `elem`:
                          if (elems.length > 0) {
                            console.log(elems[0]._model.label);
                            return history.push(
                              `/tabelas/comercial/FUPs/${dataForTable.campId}/${elems[0]._model.label}`
                            );
                          }
                        }}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              {/* <Col
                hidden={
                  dashFields[dataForTable.campId]
                    ? dashFields[dataForTable.campId].search("EmpIncluida") ===
                      -1
                    : false
                }
                lg="4"
                md="6"
              >
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs="5">
                        <div className="info-icon text-center icon-warning">
                          <Business
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
                            Empresas Incluídas
                          </p>
                          <CardTitle tag="h3">
                            {miniChartData
                              ? miniChartData.cliJoinedCamp.rows.length
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
              </Col> */}
              <Col md="4" sm="6">
                <Card
                  hidden={
                    dashFields[dataForTable.campId]
                      ? dashFields[dataForTable.campId].search("FupsTot") === -1
                      : false
                  }
                  className="card-stats"
                  style={{ marginBottom: "2%" }}
                >
                  <CardBody style={{ paddingBottom: "1.5%" }}>
                    <Row>
                      <Col xs="5">
                        <div className="info-icon text-center icon-primary">
                          <HeadsetMic
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
                            Follow Ups
                          </p>
                          <CardTitle tag="h3">
                            {miniChartData ? miniChartData.Fups.rows.length : 0}
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
                <Card
                  hidden={
                    dashFields[dataForTable.campId]
                      ? dashFields[dataForTable.campId].search("EmpFin") === -1
                      : false
                  }
                  className="card-stats"
                >
                  <CardBody style={{ paddingBottom: "1.5%" }}>
                    <Row>
                      <Col xs="5">
                        <div className="info-icon text-center icon-info">
                          <DomainDisabled
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
                            Empresas Finalizadas
                          </p>
                          <CardTitle tag="h3">
                            {miniChartData
                              ? miniChartData.finalizedFups.rows.length
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
              <Col
                hidden={
                  dashFields[dataForTable.campId]
                    ? dashFields[dataForTable.campId].search("FupsProx") === -1
                    : false
                }
                lg="4"
              >
                <Card className=" /*card-chart">
                  <CardHeader>
                    <p style={{ color: "#808080" }} className="card-category">
                      FUPs
                    </p>
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
                          ["Urgente", "Em Breve", "Distante"],
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
                              `/tabelas/comercial/FUPs/${dataForTable.campId}/${elems[0]._model.label}`
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
              {/* <Col
                hidden={
                  dashFields[dataForTable.campId]
                    ? dashFields[dataForTable.campId].search("StatusCli") === -1
                    : false
                }
                lg="4"
              >
                <Card className=" /*card-chart">
                  <CardHeader>
                    <p style={{ color: "#808080" }} className="card-category">
                      Status
                    </p>
                    <CardTitle
                      tag="h4"
                      style={{ color: "orange", fontSize: 20 }}
                    >
                      <i className="tim-icons icon-send text-info" />{" "}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={barChart_1.data(
                          ["Reunião Agendada", "Orçamento", "Efetivado"],
                          [
                            cliStatusGraph.reuniao,
                            cliStatusGraph.orcamento,
                            cliStatusGraph.efetiv
                          ]
                        )}
                        options={barChart_1.options}
                        onElementsClick={elems => {
                          // if required to build the URL, you can
                          // get datasetIndex and value index from an `elem`:
                          if (elems.length > 0) {
                            console.log(elems[0]._model.label);
                            return history.push(
                              `/tabelas/comercial/FUPs/${dataForTable.campId}/${elems[0]._model.label}`
                            );
                          }
                        }}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col> */}
              <Col
                hidden={
                  dashFields[dataForTable.campId]
                    ? dashFields[dataForTable.campId].search("FinsMotivo") ===
                      -1
                    : false
                }
                lg="4"
              >
                <Card className=" /*card-chart">
                  <CardHeader>
                    <p style={{ color: "#808080" }} className="card-category">
                      Finalizados Por Motivo
                    </p>
                    <CardTitle
                      tag="h4"
                      style={{ color: "orange", fontSize: 20 }}
                    >
                      <i className="tim-icons icon-simple-remove text-info" />{" "}
                      {/* {normalizeCurrency(state.parcsState.totalPendente)} */}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Doughnut
                        data={doughnutChart_1.data(
                          Object.keys(dataForDoughnut).filter(
                            arr => arr !== "reset"
                          ),
                          Object.values(dataForDoughnut).filter(
                            arr => arr !== false && arr !== true
                          )
                        )}
                        options={doughnutChart_1.options}
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
