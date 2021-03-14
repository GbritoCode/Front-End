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
  Form,
  Input,
  Label,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { normalizeCnpj, normalizeCurrency } from "~/normalize";
import { cliRecDespUpdate } from "~/store/modules/Cliente/actions";
import api from "~/services/api";

export default function CliRecDespUpdatee() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { id } = useParams();
  const stateSchema = {
    ClienteId: { value: "", error: "", message: "" },
    RecDespId: { value: "", error: "", message: "" },
    tipoCobranca: { value: "", error: "", message: "" },
    valorRec: { value: "", error: "", message: "" },
    dataFim: { value: "", error: "", message: "" },
    dataInic: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await api.get(`/cliente/rec_desp/1/${id}`);
      const response1 = await api.get(`/cliente/${response.data.ClienteId}`);
      const response2 = await api.get(`/rec_desp/?rec=true`);

      setData1(response1.data);
      setData2(response2.data);

      setValues(prevState => ({
        ...prevState,
        ClienteId: { value: response.data.ClienteId },
        RecDespId: { value: response.data.RecDespId },
        tipoCobranca: { value: response.data.tipoCobranca },
        valorRec: {
          value: normalizeCurrency(JSON.stringify(response.data.valorRec))
        },
        dataInic: { value: response.data.dataInic },
        dataFim: { value: response.data.dataFim }
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
      var valorRecdb = values.valorRec.value.replace(/[^\d]+/g, "");

      dispatch(
        cliRecDespUpdate(
          id,
          values.ClienteId.value,
          values.RecDespId.value,
          values.tipoCobranca.value,
          valorRecdb,
          values.dataInic.value,
          values.dataFim.value
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
                    <h3 style={{ marginBottom: 0 }}>Receita do Cliente</h3>
                    <p style={{ fontSize: 11 }}>{data1.rzSoc}</p>
                    <p style={{ fontSize: 11 }}>{normalizeCnpj(data1.CNPJ)}</p>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <Label>Receita</Label>
                          <FormGroup
                            className={`has-label ${values.RecDespId.error}`}
                          >
                            <Input
                              name="RecDespId"
                              type="select"
                              onChange={event =>
                                handleChange(event, "RecDespId", "text")
                              }
                              value={values.RecDespId.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione a receita ou despesa{" "}
                              </option>
                              {data2.map(RecDespId => (
                                <option value={RecDespId.id}>
                                  {" "}
                                  {RecDespId.id} - {RecDespId.desc}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.RecDespId.error === "has-danger" ? (
                              <Label className="error">
                                {values.RecDespId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Tipo de Cobrança</Label>
                          <FormGroup
                            className={`has-label ${values.tipoCobranca.error}`}
                          >
                            <Input
                              name="tipoCobranca"
                              type="select"
                              onChange={event =>
                                handleChange(event, "tipoCobranca", "text")
                              }
                              value={values.tipoCobranca.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione o tipo de cobrança{" "}
                              </option>
                              <option value={1}>Por Hora</option>
                              <option value={3}>Por Dia</option>
                              <option value={4}>Por Quilometro</option>
                              <option value={5}>Por Refeição</option>
                              <option value={6}>Por Pacote</option>
                            </Input>
                            {values.tipoCobranca.error === "has-danger" ? (
                              <Label className="error">
                                {values.tipoCobranca.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Valor da Receita</Label>
                          <FormGroup
                            className={`has-label ${values.valorRec.error}`}
                          >
                            <Input
                              name="valorRec"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "valorRec", "currency")
                              }
                              value={values.valorRec.value}
                            />{" "}
                            {values.valorRec.error === "has-danger" ? (
                              <Label className="error">
                                {values.valorRec.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Data Inicial</Label>
                          <FormGroup
                            className={`has-label ${values.dataInic.error}`}
                          >
                            <Input
                              name="dataInic"
                              type="date"
                              onChange={event =>
                                handleChange(event, "dataInic", "text")
                              }
                              value={values.dataInic.value}
                            />
                            {values.dataInic.error === "has-danger" ? (
                              <Label className="error">
                                {values.dataInic.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Data Final</Label>
                          <FormGroup
                            className={`has-label ${values.dataFim.error}`}
                          >
                            <Input
                              name="dataFim"
                              type="date"
                              onChange={event =>
                                handleChange(event, "dataFim", "text")
                              }
                              value={values.dataFim.value}
                            />
                            {values.dataFim.error === "has-danger" ? (
                              <Label className="error">
                                {values.dataFim.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4" />
                      </Row>

                      <Link
                        to={`/tabelas/cliente/rec_desp/${values.ClienteId.value}`}
                      >
                        <Button
                          style={{
                            paddingLeft: 32,
                            paddingRight: 33
                          }}
                          color="secundary"
                          size="small"
                          className="text-left"
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
