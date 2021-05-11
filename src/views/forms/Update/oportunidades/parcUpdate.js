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
import { useParams, useLocation } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { Tooltip } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import { normalizeCurrency, normalizeCalcCurrency } from "~/normalize";
import { parcelaUpdate } from "~/store/modules/oportunidades/actions";
import api from "~/services/api";
import history from "~/services/history";

/* eslint-disable eqeqeq */
export default function ParcelaUpdate() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const { id } = useParams();
  const [disabledField, setDisabledField] = useState();
  const [data, setData] = useState();
  const [data1, setData1] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [date, month, year] = new Date().toLocaleDateString("pt-BR").split("/");
  const stateSchema = {
    OportunidadeId: { value: "", error: "", message: "" },
    parcela: { value: "", error: "", message: "" },
    vlrParcela: { value: "", error: "", message: "" },
    dtEmissao: { value: "", error: "", message: "" },
    dtVencimento: { value: "", error: "", message: "" },
    notaFiscal: { value: "", error: "", message: "" }
  };
  const optionalSchema = {
    pedidoCliente: { value: "", error: "", message: "" },
    situacao: { value: "", error: "", message: "" },
    dtLiquidacao: {
      value: `${year}-${month}-${date}`,
      error: "",
      message: ""
    },
    vlrPago: { value: "", error: "", message: "" },
    saldo: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);

  const query = new URLSearchParams(useLocation().search);
  const fromDash = query.get("fromDash");

  const downloadFile = async () => {
    for (const file of data.ParcelaFiles) {
      const url = `${process.env.REACT_APP_API_URL}/download/oport/download/${file.id}/?table=parcelas`;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file", "");
      document.body.appendChild(link);
      link.click();

      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(500);
    }
  };

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/parcela/aux/${id}`);
      const response1 = await api.get(
        `/oportunidade/${response.data.OportunidadeId}`
      );
      setDisabledField(response1.data.fase >= 5 && response.data.situacao >= 4);
      setData(response.data);
      setData1(response1.data);
      setValues(prevState => ({
        ...prevState,
        OportunidadeId: { value: response.data.OportunidadeId },
        parcela: { value: response.data.parcela },
        vlrParcela: {
          value: normalizeCalcCurrency(response.data.vlrParcela)
        },
        dtEmissao: { value: response.data.dtEmissao },
        dtVencimento: { value: response.data.dtVencimento },
        notaFiscal: { value: response.data.notaFiscal }
      }));
      setOptional(prevState => ({
        ...prevState,
        pedidoCliente: { value: response.data.pedidoCliente },
        situacao: { value: response.data.situacao },
        dtLiquidacao: { value: response.data.dtLiquidacao },
        vlrPago: {
          value: normalizeCurrency(JSON.stringify(response.data.vlrPago))
        },
        saldo: { value: normalizeCurrency(JSON.stringify(response.data.saldo)) }
      }));
      setIsLoading(false);
    }
    loadData();
  }, [id]);

  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const valorPagoChange = value => {
    const vPago = value.replace(/[.,]+/g, "");
    var parc = document
      .getElementsByName("vlrParcela")[0]
      .value.replace(/[.,]+/g, "");
    const saldo = parc - vPago;
    if (vPago - parc > 0) {
      setOptional(prevState => ({
        ...prevState,
        vlrPago: {
          error: "has-danger",
          message: "O valor pago não pode ser maior do que a parcela"
        }
      }));
      return;
    }
    setOptional(prevState => ({
      ...prevState,
      saldo: { value: normalizeCalcCurrency(saldo) }
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
      case "currencyOpt":
        setOptional(prevState => ({
          ...prevState,
          [name]: { value: normalizeCurrency(target) }
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
      var vlrParceladb = values.vlrParcela.value.replace(/[^\d]+/g, "");
      var vlrPagodb = optional.vlrPago.value.replace(/[^\d]+/g, "");
      var saldodb = optional.saldo.value.replace(/[^\d]+/g, "");
      const status = !!fromDash;

      dispatch(
        parcelaUpdate(
          id,
          values.OportunidadeId.value,
          values.parcela.value,
          vlrParceladb,
          values.dtEmissao.value,
          values.dtVencimento.value,
          values.notaFiscal.value,
          optional.pedidoCliente.value,
          optional.situacao.value,
          optional.dtLiquidacao.value,
          vlrPagodb,
          saldodb,
          status
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
        <>
          <div className="content" />
        </>
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
                    <h3 style={{ marginBottom: 0 }}>Liquidação de Parcela</h3>
                    <p style={{ fontSize: 11 }}>
                      {data1.cod} | {data1.desc}
                    </p>
                    <p style={{ fontSize: 11 }}>{data1.Cliente.nomeAbv}</p>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          {" "}
                          <Label>Parcela</Label>
                          <FormGroup
                            className={`has-label ${values.parcela.error}`}
                          >
                            <Input
                              disabled
                              name="parcela"
                              type="text"
                              onChange={event =>
                                handleChange(event, "parcela", "number")
                              }
                              value={values.parcela.value}
                            />
                            {values.parcela.error === "has-danger" ? (
                              <Label className="error">
                                {values.parcela.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <Label>Valor da Parcela</Label>
                          <FormGroup
                            className={`has-label ${values.vlrParcela.error}`}
                          >
                            <Input
                              disabled
                              name="vlrParcela"
                              type="text"
                              onChange={event =>
                                handleChange(event, "vlrParcela", "currency")
                              }
                              value={values.vlrParcela.value}
                            />

                            {values.vlrParcela.error === "has-danger" ? (
                              <Label className="error">
                                {values.vlrParcela.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <Label>Data da Emissão</Label>
                          <FormGroup
                            className={`has-label ${values.dtEmissao.error}`}
                          >
                            <Input
                              disabled
                              name="dtEmissao"
                              type="date"
                              onChange={event =>
                                handleChange(event, "dtEmissao", "text")
                              }
                              value={values.dtEmissao.value}
                            />
                            {values.dtEmissao.error === "has-danger" ? (
                              <Label className="error">
                                {values.dtEmissao.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="4">
                          <Label>Data de Vencimento</Label>
                          <FormGroup
                            className={`has-label ${values.dtVencimento.error}`}
                          >
                            <Input
                              disabled
                              name="dtVencimento"
                              type="date"
                              onChange={event =>
                                handleChange(event, "dtVencimento", "text")
                              }
                              value={values.dtVencimento.value}
                            />
                            {values.dtVencimento.error === "has-danger" ? (
                              <Label className="error">
                                {values.dtVencimento.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Nota Fiscal</Label>
                          <FormGroup
                            className={`has-label ${values.notaFiscal.error}`}
                          >
                            <Input
                              disabled
                              name="notaFiscal"
                              type="text"
                              onChange={event =>
                                handleChange(event, "notaFiscal", "text")
                              }
                              value={values.notaFiscal.value}
                            />
                            {values.notaFiscal.error === "has-danger" ? (
                              <Label className="error">
                                {values.notaFiscal.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Pedido Cliente</Label>
                          <FormGroup
                            className={`has-label ${optional.pedidoCliente.error}`}
                          >
                            <Input
                              disabled
                              name="pedidoCliente"
                              type="text"
                              onChange={event => {
                                handleChange(
                                  event,
                                  "pedidoCliente",
                                  "optional"
                                );
                              }}
                              value={optional.pedidoCliente.value}
                            />
                            {optional.pedidoCliente.error === "has-danger" ? (
                              <Label className="error">
                                {optional.pedidoCliente.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Situação</Label>
                          <FormGroup
                            className={`has-label ${optional.situacao.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="situacao"
                              type="select"
                              onChange={event =>
                                handleChange(event, "situacao", "optional")
                              }
                              value={optional.situacao.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione situação{" "}
                              </option>{" "}
                              <option value={1}>Pendente</option>
                              <option value={2}>Aberta</option>
                              <option value={3}>Parcial</option>
                              <option value={4}>Liquidada</option>
                            </Input>
                            {optional.situacao.error === "has-danger" ? (
                              <Label className="error">
                                {optional.situacao.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Data Liquidação</Label>
                          <FormGroup
                            className={`has-label ${optional.dtLiquidacao.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="dtLiquidacao"
                              type="date"
                              onChange={event => {
                                handleChange(event, "dtLiquidacao", "optional");
                              }}
                              value={optional.dtLiquidacao.value}
                            />
                            {optional.dtLiquidacao.error === "has-danger" ? (
                              <Label className="error">
                                {optional.dtLiquidacao.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Valor Pago</Label>
                          <FormGroup
                            className={`has-label ${optional.vlrPago.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="vlrPago"
                              type="text"
                              onChange={event => {
                                handleChange(event, "vlrPago", "currencyOpt");
                                valorPagoChange(event.target.value);
                              }}
                              value={optional.vlrPago.value}
                            />
                            {optional.vlrPago.error === "has-danger" ? (
                              <Label className="error">
                                {optional.vlrPago.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Saldo</Label>
                          <FormGroup
                            className={`has-label ${optional.saldo.error}`}
                          >
                            <Input
                              disabled
                              name="saldo"
                              type="text"
                              onChange={event => {
                                handleChange(event, "saldo", "currencyOpt");
                              }}
                              value={optional.saldo.value}
                            />
                            {optional.saldo.error === "has-danger" ? (
                              <Label className="error">
                                {optional.saldo.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      {disabledField ? (
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
                      <Button
                        style={{
                          paddingLeft: 32,
                          paddingRight: 33,
                          float: "left"
                        }}
                        color="secundary"
                        size="small"
                        className="form"
                        onClick={() => {
                          history.goBack();
                        }}
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
