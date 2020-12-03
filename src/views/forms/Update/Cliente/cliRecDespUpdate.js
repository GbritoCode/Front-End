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
import React, { useRef, Fragment, useEffect, useState, useCallback } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { cliRecDespUpdate } from "~/store/modules/Cliente/actions";
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import { normalizeCnpj, normalizeCurrency } from "normalize";

export default function CliRecDespUpdatee() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

const id = useParams()  
const stateSchema = {
    clienteId: { value: "", error: "", message: "" },
    recDespId: { value: "", error: "", message: "" },
    tipoCobranca: { value: "", error: "", message: "" },
    valorRec: { value: "", error: "", message: "" },
    dataFim: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(
        `http://localhost:51314/cliente/rec_desp/1/${id}`
      );
      const response1 = await axios(
        `http://localhost:51314/cliente/${response.data.ClienteId}`
      );
      const response2 = await axios(`http://localhost:51314/rec_desp/?rec=true`);

      setData1(response1.data);
      setData2(response2.data);

      setValues((prevState) => ({
        ...prevState,
        clienteId: { value: response.data.ClienteId },
      }));
      setValues((prevState) => ({
        ...prevState,
        recDespId: { value: response.data.recDespId },
      }));
      setValues((prevState) => ({
        ...prevState,
        tipoCobranca: { value: response.data.tipoCobranca },
      }));
      setValues((prevState) => ({
        ...prevState,
        valorRec: { value: normalizeCurrency(JSON.stringify(response.data.valorRec)) },
      }));
      setValues((prevState) => ({
        ...prevState,
        dataFim: { value: response.data.dataFim },
      }));
      setIsLoading(false);
    }
    loadData();
  }, [id]);

  const verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };


  const handleChange = (event, name, type) => {
    event.persist();
    let target = event.target.value;
    switch (type) {
      case "number":
        if (verifyNumber(target)) {
          setValues((prevState) => ({
            ...prevState,
            [name]: { value: target, error: "has-success" },
          }));
        } else {
          setValues((prevState) => ({
            ...prevState,
            [name]: {
              value: target,
              error: "has-danger",
              message: "Insira um número válido",
            },
          }));
        }
        break;
      case "currency":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: normalizeCurrency(target) },
        }));
        break
      case "text":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: target },
        }));
        break
        default:
      }
  };
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    var aux = Object.entries(values);
    const tamanho = aux.length;

    for (let i = 0; i < tamanho; i++) {
      if (!(aux[i][1].error === "has-danger")) {
        var valid = true;
      } else {
        valid = false
        break;
      }
    }
    for (let j = 0; j < tamanho; j++) {
      if (aux[j][1].value !== "") {
        var filled = true;
      } else {
        filled = false
        setValues((prevState) => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" },
        }));
        break;
      }
    }

    if (valid && filled) {
      var valorRecdb = values.valorRec.value.replace(/[^\d]+/g, "");

      dispatch(
        cliRecDespUpdate(
          id,
          values.clienteId.value,
          values.recDespId.value,
          values.tipoCobranca.value,
          valorRecdb,
          values.dataFim.value,
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
        autoDismiss: 7,
      };
      notify();
    }
  };
  return (
    <Fragment>
      {isLoading ? (
        <div></div>
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
                      <CardTitle tag="h4">
                        Edição de Receita do Cliente
                    </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit={handleSubmit}>
                      <label>Cliente</label>
                        <FormGroup
                          className={`has-label ${values.clienteId.error}`}
                        >
                          <Input
                            disabled
                            onChange={(event) =>
                              handleChange(event, "clienteId", "text")
                            }
                            value={values.clienteId.value}
                            name="ClienteId"
                            type="select"
                          >
                            <option disabled value="">
                              {" "}
                            Selecione o Cliente{" "}
                            </option>{" "}
                            <option value={data1.id}>
                              {" "}
                              {data1.nomeAbv} -{" "}
                              {normalizeCnpj(data1.CNPJ)}
                            </option>
                          </Input>
                          {values.clienteId.error === "has-danger" ? (
                            <label className="error">
                              {values.clienteId.message}
                            </label>
                          ) : null}
                        </FormGroup>
                        <label>Receita</label>
                        <FormGroup
                          className={`has-label ${values.recDespId.error}`}
                        >
                          <Input
                            name="recDespId"
                            type="select"
                            onChange={(event) =>
                              handleChange(event, "recDespId", "text")
                            }
                            value={values.recDespId.value}
                          >
                            {" "}
                            <option disabled value="">
                              {" "}
                            Selecione a receita ou despesa{" "}
                            </option>
                            {data2.map((recDespId) => (
                              <option value={recDespId.id}>
                                {" "}
                                {recDespId.id} - {recDespId.desc}{" "}
                              </option>
                            ))}
                          </Input>
                          {values.recDespId.error === "has-danger" ? (
                            <label className="error">
                              {values.recDespId.message}
                            </label>
                          ) : null}
                        </FormGroup>
                        <label>Tipo de Cobrança</label>
                        <FormGroup
                          className={`has-label ${values.tipoCobranca.error}`}
                        >
                          <Input
                            name="tipoCobranca"
                            type="select"
                            onChange={(event) =>
                              handleChange(event, "tipoCobranca", "text")
                            }
                            value={values.tipoCobranca.value}
                          >
                            <option disabled value="">
                              {" "}
                            Selecione o tipo de cobrança{" "}
                            </option>
                            <option value={1}>Por Hora</option>
                            <option value={2}>Por Projeto</option>
                            <option value={3}>Por Dia</option>
                            <option value={4}>Por Quilometro</option>
                            <option value={5}>Por Refeição</option>
                            <option value={6}>Por Pacote</option>
                          </Input>
                          {values.tipoCobranca.error === "has-danger" ? (
                            <label className="error">
                              {values.tipoCobranca.message}
                            </label>
                          ) : null}
                        </FormGroup>
                        <label>Valor da Receita</label>
                        <FormGroup
                          className={`has-label ${values.valorRec.error}`}
                        >
                          <Input
                            name="valorRec"
                            type="numeric"
                            onChange={(event) =>
                              handleChange(event, "valorRec", "currency")
                            }
                            value={values.valorRec.value}
                          />{" "}
                          {values.valorRec.error === "has-danger" ? (
                            <label className="error">
                              {values.valorRec.message}
                            </label>
                          ) : null}
                        </FormGroup>
                        <Label>Data Final</Label>
                        <FormGroup className={`has-label ${values.dataFim.error}`}>
                          <Input
                            name="dataFim"
                            type="date"
                            onChange={(event) =>
                              handleChange(event, "dataFim", "text")
                            }
                            value={values.dataFim.value}
                          />
                          {values.dataFim.error === "has-danger" ? (
                            <label className="error">{values.dataFim.message}</label>
                          ) : null}
                        </FormGroup>
                        <Link to={`/tabelas/cliente/rec_desp/${values.clienteId.value}`}>
                          <Button
                            style={{
                              paddingLeft: 32,
                              paddingRight: 33,
                            }}
                            color="secundary"
                            size="small"
                            className="text-left"
                          >
                            <i
                              className="tim-icons icon-double-left"
                              style={{
                                paddingBottom: 4,
                                paddingRight: 1,
                              }}
                              size="large"
                            />{" "}
                      Voltar
                    </Button>
                        </Link>
                        <Button
                          style={{
                            paddingLeft: 29,
                            paddingRight: 30,
                          }}
                          className="form"
                          color="info"
                          type="submit"
                        >
                          Enviar{" "}
                          <i className="tim-icons icon-send"
                            style={{
                              paddingBottom: 4,
                              paddingLeft: 3,
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
    </Fragment>
  );
}
