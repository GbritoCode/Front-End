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
  Col,
  FormText
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { parcelaUpdate } from "~/store/modules/oportunidades/actions";
import { normalizeCurrency, normalizeCalcCurrency } from "~/normalize";
import api from "~/services/api";
import history from "~/services/history";

/* eslint-disable eqeqeq */
export default function ParcelaUpdate() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  // eslint-disable-next-line no-extend-native
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState();
  const [data1, setData1] = useState();
  const [data3, setData3] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();
  const [date, month, year] = today.toLocaleDateString("pt-BR").split("/");
  // const dtVenc = today
  const stateSchema = {
    OportunidadeId: { value: "", error: "", message: "" },
    parcela: { value: "", error: "", message: "" },
    vlrParcela: { value: "", error: "", message: "" },
    dtEmissao: { value: `${year}-${month}-${date}`, error: "", message: "" },
    dtVencimento: {
      value: "",
      error: "",
      message: ""
    },
    notaFiscal: { value: "", error: "", message: "" }
  };
  const optionalSchema = {
    pedidoCliente: { value: "Não informado", error: "", message: "" },
    situacao: { value: "", error: "", message: "" },
    dtLiquidacao: { value: "", error: "", message: "" },
    vlrPago: { value: "", error: "", message: "" },
    saldo: { value: "", error: "", message: "" }
  };
  const [file, setFile] = useState();
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);

  const query = new URLSearchParams(useLocation().search);
  const fromDash = query.get("fromDash");

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/parcela/aux/${id}`);
      const response1 = await api.get(
        `/oportunidade/${response.data.OportunidadeId}`
      );
      const response2 = await api.get(
        `/cliente/complem/${response1.data.ClienteId}`
      );
      const response3 = await api.get(
        `/condPgmto/${response2.data.CondPgmtoId}`
      );
      setData(response.data);
      setData1(response1.data);
      setData3(response3.data);
      const [dateVenc, monthVenc, yearVenc] = new Date()
        .addDays(data3.diasPrazo)
        .toLocaleDateString("pt-BR")
        .split("/");
      setValues(prevState => ({
        ...prevState,
        OportunidadeId: { value: response.data.OportunidadeId },
        parcela: { value: response.data.parcela },
        vlrParcela: {
          value: normalizeCalcCurrency(response.data.vlrParcela)
        },
        dtVencimento: {
          value:
            response.data.dtVencimento || `${yearVenc}-${monthVenc}-${dateVenc}`
        },
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
      if (normalizeCurrency(JSON.stringify(response.data.saldo)) === "0,00") {
        setOptional(prevState => ({
          ...prevState,
          saldo: { value: normalizeCalcCurrency(response.data.vlrParcela) }
        }));
      }
      setIsLoading(false);
    }
    loadData();
  }, [data3.diasPrazo, id]);
  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
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

  const handleSubmit = async evt => {
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

      const formData = new FormData();

      formData.append("file", file);
      await api.post(
        `/files/oport/cotacao/?parcelaId=${data.id}&tipo=parcela&situacao=fatura&table=parcela`,
        formData
      );
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
          2,
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
                    <h3 style={{ marginBottom: 0 }}>Nota Fiscal</h3>
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
                              autoFocus
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
                          <FormGroup style={{ marginBottom: 25 }} check>
                            <Input
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
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Label>Anexo</Label>
                          <Input
                            placeholder="Arraste ou selecione um arquivo"
                            type="file"
                            name="file"
                            onChange={e => {
                              setFile(e.target.files[0]);
                            }}
                          />
                          <FormText
                            style={{ marginBottom: 10, marginTop: 10 }}
                            color="muted"
                          >
                            Selecione ou arraste e solte um anexo
                          </FormText>
                        </Col>
                      </Row>
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
