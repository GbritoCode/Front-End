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
  CardTitle,
  Label,
  Form,
  Input,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { CliRecDespRequest } from "~/store/modules/Cliente/actions";
import { Link, useParams } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import {normalizeCnpj,normalizeCurrency} from 'normalize'

export default function CliRecDespCadastro() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const stateSchema = {
    clienteId: { value: "", error: "", message: "" },
    recDespId: { value: "", error: "", message: "" },
    tipoCobranca: { value: "", error: "", message: "" },
    valorRec: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);
  const [data, setData] = useState({});
  const [data1, setData1] = useState([]);
  const id = useParams();

  useEffect(() => {
    async function loadData() {
      const response = await axios(`http://localhost:51314/cliente/${id.id}`);
      const response1 = await axios(`http://localhost:51314/rec_desp/`);
      setData(response.data);
      setData1(response1.data);
      setValues((prevState) => ({
        ...prevState,
        clienteId: { value: response.data.id },
      }));
    }

    loadData();
  }, []);

  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

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
          [name]: { value:normalizeCurrency( target) },
        }));
        break
      case "text":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: target },
        }));
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    var aux = Object.entries(values);
    const tamanho = aux.length;

    for (let i = 0; i < tamanho; i++) {
      if (!(aux[i][1].error === "has-danger")) {
        var valid = true;
      } else {
        var valid = false;
        break;
      }
    }
    for (let j = 0; j < tamanho; j++) {
      if (aux[j][1].value !== "") {
        var filled = true;
      } else {
        var filled = false;
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
        CliRecDespRequest(
          values.clienteId.value,
          values.recDespId.value,
          values.tipoCobranca.value,
          valorRecdb
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
    <>
      <div className="rna-container">
        <NotificationAlert ref={notifyElment} />
      </div>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
              <Link to={`/tabelas/cliente/rec_desp/${values.clienteId.value}`}>
                  <Button
                      style={{
                        float: "right",
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}
                      color="secundary"
                      size="small"
                      className="text-left"
                    >
                      <i
                        className="tim-icons icon-double-left"
                        style={{
                          paddingBottom: 4,
                          paddingRight: 5,
                        }}
                        size="large"
                      />{" "}
                      Voltar
                    </Button>
                  </Link>
                <CardTitle tag="h4">Receita e Despesa de Cliente</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <label>Cliente</label>
                  <FormGroup className={`has-label ${values.clienteId.error}`}>
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
                      <option value={data.id}>
                        {" "}
                         {data.nomeAbv} - {normalizeCnpj(data.CNPJ)}
                      </option>
                    </Input>
                    {values.clienteId.error === "has-danger" ? (
                      <label className="error">
                        {values.clienteId.message}
                      </label>
                    ) : null}
                  </FormGroup>
                  <label>Receita ou Despesa</label>
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
                          {data1.map((recDespId) => (
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
                  <Button
                    style={{ marginTop: 35 }}
                    className="form"
                    color="info"
                    type="submit"
                  >
                    Enviar
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
