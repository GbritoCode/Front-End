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
import React, { useRef, useEffect, useState } from "react";

// reactstrap components
import classNames from "classnames";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { GetApp } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import { normalizeCurrency, normalizeCalcCurrency } from "~/normalize";
import { cotacaoUpdate } from "~/store/modules/oportunidades/actions";
import api from "~/services/api";

/* eslint-disable eqeqeq */
function CotacaoUpdate() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState();
  const [data1, setData1] = useState({ nome: undefined });
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState();
  const [disabledField, setDisabledField] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    OportunidadeId: { value: "", error: "", message: "" },
    probVend: { value: "", error: "", message: "" },
    tipoCobranca: { value: "", error: "", message: "" },
    hrsPrevst: { value: "", error: "", message: "" },
    vlrProp: { value: "", error: "", message: "" },
    vlrDesc: { value: "", error: "", message: "" },
    vlrLiq: { value: "", error: "", message: "" },
    recLiq: { value: "", error: "", message: "" },
    prevLucro: { value: "", error: "", message: "" },
    numParcelas: { value: "", error: "", message: "" },
    motivo: { value: "", error: "", message: "" }
  };
  const optionalSchema = {
    desc: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);
  const imposto = 14 / 100;
  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/cotacao/aux/${id}`);
      setData(response.data);

      if (response.data === null) {
        setIsLoading(false);
      } else {
        const response1 = await api.get(`/empresa/${response.data.EmpresaId}`);
        const response2 = await api.get(
          `/oportunidade/${response.data.OportunidadeId}`
        );
        setData1(response1.data);
        setData2(response2.data);
        setDisabledField(response2.data.fase >= 5);
        setValues(prevState => ({
          ...prevState,
          empresaId: { value: response.data.EmpresaId },
          OportunidadeId: { value: response.data.OportunidadeId },
          probVend: { value: response.data.probVend },
          tipoCobranca: { value: response.data.tipoCobranca },
          hrsPrevst: { value: response.data.hrsPrevst },
          vlrProp: {
            value: normalizeCalcCurrency(JSON.stringify(response.data.vlrProp))
          },
          vlrDesc: {
            value: normalizeCurrency(JSON.stringify(response.data.vlrDesc))
          },
          vlrLiq: {
            value: normalizeCalcCurrency(JSON.stringify(response.data.vlrLiq))
          },
          recLiq: {
            value: normalizeCalcCurrency(JSON.stringify(response.data.recLiq))
          },
          prevLucro: {
            value: normalizeCalcCurrency(
              JSON.stringify(response.data.prevLucro)
            )
          },
          numParcelas: { value: response.data.numParcelas },
          motivo: { value: response.data.motivo }
        }));
        setOptional(prevState => ({
          ...prevState,
          desc: { value: response.data.desc }
        }));
        setIsLoading(false);
      }
    }
    loadData();
  }, [id]);
  const downloadFile = async () => {
    for (const file of data.CotacaoFiles) {
      const url = `${process.env.REACT_APP_API_URL}/download/oport/download/${file.id}/?table=cotacao`;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file", "");
      document.body.appendChild(link);
      link.click();

      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(500);
    }
  };

  function getCliData(cobranca) {
    api
      .get(`/cliente/rec_desp/${data1.ClienteId}/?cobranca=${cobranca}`)
      .then(result => {
        setData3(result.data);
      });
  }

  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const checkOrcamento = () => {
    if (values.motivo.value == "1") {
      return true;
    }
  };
  const checkDesc = () => {
    if (values.motivo.value == "2") {
      return true;
    }
  };
  const checkEscopo = () => {
    if (values.motivo.value == "3") {
      return true;
    }
  };

  const descontoChange = descont => {
    const value = descont.replace(/[.,]+/g, "");
    const vHr = data2.valorRec;
    var prop = document.getElementsByName("hrsPrevst")[0].value * vHr;
    const hr = document.getElementsByName("hrsPrevst")[0].value;
    const vLiq = prop - value;
    const rLiq = vLiq - vLiq * imposto;
    const lucro = rLiq - hr * 6000;
    setValues(prevState => ({
      ...prevState,
      vlrLiq: { value: normalizeCalcCurrency(JSON.stringify(vLiq)) }
    }));
    setValues(prevState => ({
      ...prevState,
      recLiq: { value: normalizeCalcCurrency(JSON.stringify(rLiq)) }
    }));
    setValues(prevState => ({
      ...prevState,
      prevLucro: { value: normalizeCalcCurrency(JSON.stringify(lucro)) }
    }));
  };
  const handleChange = (event, name, type) => {
    event.persist();
    const target = event.target.value;
    switch (type) {
      case "number":
        if (verifyNumber(target)) {
          setValues(prevState => ({
            ...prevState,
            [name]: { value: target, error: "has-success" }
          }));
        } else {
          setValues(prevState => ({
            ...prevState,
            [name]: {
              value: target,
              error: "has-danger",
              message: "Insira um número válido"
            }
          }));
        }
        break;
      case "optional":
        setOptional(prevState => ({
          ...prevState,
          [name]: { value: target }
        }));
        break;
      case "currency":
        setValues(prevState => ({
          ...prevState,
          [name]: { value: normalizeCurrency(target) }
        }));
        break;
      case "text":
        setValues(prevState => ({
          ...prevState,
          [name]: { value: target }
        }));
        break;
      default:
    }
  };
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    var aux = Object.entries(values);
    const tamanho = aux.length;

    for (let i = 0; i < tamanho; i++) {
      if (!(aux[i][1].error === "has-danger")) {
        var valid = true;
      } else {
        valid = false;
        break;
      }
    }
    for (let j = 0; j < tamanho; j++) {
      if (aux[j][1].value !== "") {
        var filled = true;
      } else {
        filled = false;
        setValues(prevState => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" }
        }));
        break;
      }
    }

    if (valid && filled) {
      var vlrPropdb = values.vlrProp.value.replace(/[^\d]+/g, "");
      var vlrDescdb = values.vlrDesc.value.replace(/[^\d]+/g, "");
      var vlrLiqdb = values.vlrLiq.value.replace(/[^\d]+/g, "");
      var recLiqdb = values.recLiq.value.replace(/[^\d]+/g, "");
      var prevLucrodb = values.prevLucro.value.replace(/[^\d]+/g, "");

      dispatch(
        cotacaoUpdate(
          id,
          values.empresaId.value,
          values.OportunidadeId.value,
          values.probVend.value,
          values.tipoCobranca.value,
          values.hrsPrevst.value,
          vlrPropdb,
          vlrDescdb,
          vlrLiqdb,
          recLiqdb,
          prevLucrodb,
          values.numParcelas.value,
          values.motivo.value,
          optional.desc.value
        )
      );
    } else {
      options = {
        place: "tr",
        message: (
          <div>
            <div>Ops! Há algo errado</div>
          </div>
        ),
        type: "danger",
        icon: "tim-icons icon-alert-circle-exc",
        autoDismiss: 7
      };
      notify();
    }
  };
  return (
    <>
      {isLoading ? (
        <div />
      ) : (
        <>
          <div className="rna-container">
            <NotificationAlert ref={notifyElment} />
          </div>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <Tooltip
                      title="Download do Arquivo Anexado"
                      placement="top"
                      interactive
                    >
                      <Button
                        style={{ float: "right" }}
                        color="default"
                        size="sm"
                        onClick={() => downloadFile()}
                        className={classNames("btn-icon btn-link like")}
                      >
                        <GetApp />
                      </Button>
                    </Tooltip>

                    <h3 style={{ marginBottom: 0 }}>Cotação</h3>
                    <p style={{ fontSize: 11 }}>
                      {data2.cod} | {data2.desc}
                    </p>
                    <p style={{ fontSize: 11 }}>{data2.Cliente.nomeAbv}</p>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          {" "}
                          <Label>Probabilidade de Venda</Label>
                          <FormGroup
                            className={`has-label ${values.probVend.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="probVend"
                              type="select"
                              onChange={event =>
                                handleChange(event, "probVend", "text")
                              }
                              value={values.probVend.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione a Probabilidade de venda{" "}
                              </option>
                              <option value={1}>Alta</option>
                              <option value={2}>Média</option>
                              <option value={3}>Baixa</option>
                            </Input>
                            {values.probVend.error === "has-danger" ? (
                              <Label className="error">
                                {values.probVend.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <Label>Tipo de Cobrança</Label>
                          <FormGroup
                            className={`has-label ${values.tipoCobranca.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="tipoCobranca"
                              type="select"
                              onChange={event =>
                                handleChange(event, "tipoCobranca", "text")
                              }
                              onChangeCapture={e => {
                                getCliData(e.target.value);
                              }}
                              value={values.tipoCobranca.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione o tipo de cobrança{" "}
                              </option>
                              <option value={1}>Por Hora</option>
                              <option value={2}>Por Projeto</option>
                            </Input>
                            {values.tipoCobranca.error === "has-danger" ? (
                              <Label className="error">
                                {values.tipoCobranca.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Horas Previstas</Label>
                          <FormGroup
                            className={`has-label ${values.hrsPrevst.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="hrsPrevst"
                              type="numeric"
                              onChange={event => {
                                handleChange(event, "hrsPrevst", "number");
                                setValues(prevState => ({
                                  ...prevState,
                                  vlrProp: {
                                    value: normalizeCurrency(
                                      JSON.stringify(
                                        event.target.value * data3.valorRec
                                      )
                                    )
                                  }
                                }));
                                descontoChange(
                                  document.getElementsByName("vlrDesc")[0].value
                                );
                              }}
                              value={values.hrsPrevst.value}
                            />
                            {values.hrsPrevst.error === "has-danger" ? (
                              <Label className="error">
                                {values.hrsPrevst.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          {" "}
                          <Label>Valor da Proposta</Label>
                          <FormGroup
                            className={`has-label ${values.vlrProp.error}`}
                          >
                            <Input
                              disabled
                              name="vlrProp"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "vlrProp", "currency")
                              }
                              value={values.vlrProp.value}
                            />
                            {values.vlrProp.error === "has-danger" ? (
                              <Label className="error">
                                {values.vlrProp.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Valor Desconto</Label>
                          <FormGroup
                            className={`has-label ${values.vlrDesc.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="vlrDesc"
                              type="text"
                              onChange={event => {
                                handleChange(event, "vlrDesc", "currency");
                                descontoChange(event.target.value);
                              }}
                              value={values.vlrDesc.value}
                            />
                            {values.vlrDesc.error === "has-danger" ? (
                              <Label className="error">
                                {values.vlrDesc.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <Label>Valor Líquido</Label>
                          <FormGroup
                            className={`has-label ${values.vlrLiq.error}`}
                          >
                            <Input
                              disabled
                              name="vlrLiq"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "vlrLiq", "currency")
                              }
                              value={values.vlrLiq.value}
                            />
                            {values.vlrLiq.error === "has-danger" ? (
                              <Label className="error">
                                {values.vlrLiq.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Previsão de Lucro</Label>
                          <FormGroup
                            className={`has-label ${values.prevLucro.error}`}
                          >
                            <Input
                              disabled
                              name="prevLucro"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "prevLucro", "currency")
                              }
                              value={values.prevLucro.value}
                            />
                            {values.prevLucro.error === "has-danger" ? (
                              <Label className="error">
                                {values.prevLucro.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Número de Parcelas</Label>
                          <FormGroup
                            className={`has-label ${values.numParcelas.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="numParcelas"
                              type="select"
                              onChange={event =>
                                handleChange(event, "numParcelas", "text")
                              }
                              value={values.numParcelas.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione a quantidade de parcelas{" "}
                              </option>{" "}
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                              <option value={9}>9</option>
                              <option value={10}>10</option>
                              <option value={11}>11</option>
                              <option value={12}>12</option>
                            </Input>
                            {values.numParcelas.error === "has-danger" ? (
                              <Label className="error">
                                {values.numParcelas.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Motivo Orçamento/Revisão</Label>
                          <FormGroup check>
                            <Label check>
                              <Input
                                disabled={disabledField}
                                checked={checkOrcamento(values)}
                                name="motivo"
                                type="radio"
                                onChange={event =>
                                  handleChange(event, "motivo", "text")
                                }
                                value={1}
                              />{" "}
                              Orçamento
                            </Label>
                            <Label check>
                              <Input
                                disabled={disabledField}
                                checked={checkDesc(values)}
                                name="motivo"
                                type="radio"
                                onChange={event =>
                                  handleChange(event, "motivo", "text")
                                }
                                value={2}
                              />
                              Desconto
                            </Label>
                            <Label check>
                              <Input
                                disabled={disabledField}
                                checked={checkEscopo(values)}
                                name="motivo"
                                type="radio"
                                onChange={event =>
                                  handleChange(event, "motivo", "text")
                                }
                                value={3}
                              />
                              Escopo
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Label>Descrição</Label>
                          <FormGroup
                            className={`has-label ${optional.desc.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="desc"
                              type="textarea"
                              onChange={event =>
                                handleChange(event, "desc", "optional")
                              }
                              value={optional.desc.value}
                            />
                            {optional.desc.error === "has-danger" ? (
                              <Label className="error">
                                {optional.desc.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Link to={`/tabelas/oportunidade/cotacao/${data2.id}`}>
                        <Button
                          style={{
                            paddingLeft: 32,
                            paddingRight: 33
                          }}
                          color="secundary"
                          size="small"
                          className="form"
                        >
                          <i
                            className="tim-icons icon-double-left"
                            style={{
                              paddingBottom: 4,
                              paddingRight: 1
                            }}
                            size="large"
                          />{" "}
                          Voltar
                        </Button>
                      </Link>
                      {data2.fase >= 5 ? (
                        <></>
                      ) : (
                        <Button
                          style={{
                            paddingLeft: 29,
                            paddingRight: 30
                          }}
                          className="form"
                          color="info"
                          type="submit"
                        >
                          Enviar{" "}
                          <i
                            className="tim-icons icon-send"
                            style={{
                              paddingBottom: 4,
                              paddingLeft: 3
                            }}
                            size="large"
                          />
                        </Button>
                      )}
                    </Form>
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
export default CotacaoUpdate;
