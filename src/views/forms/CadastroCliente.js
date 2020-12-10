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
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { normalizeCnpj } from "~/normalize";
import { store } from "~/store";
import { ClienteRequest } from "~/store/modules/Cliente/actions";

/* eslint-disable eqeqeq */
export default function CadastroCliente() {
  // --------- colocando no modo claro do template
  const { prospect } = useParams();
  const jsonpAdapter = require("axios-jsonp");
  document.body.classList.add("white-content");
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cnpj: { value: "", error: "", message: "" },
    rzSoc: { value: "", error: "", message: "" },
    nomeAbv: { value: "", error: "", message: "" },
    representante: { value: "", error: "", message: "" },
    tipoComiss: { value: "", error: "", message: "" }
  };
  const optionalSchema = {
    fantasia: { value: "", error: "", message: "" }
  };
  const [optional, setOptional] = useState(optionalSchema);
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      const response = await axios(`http://localhost:5140/empresa/${empresa}`);
      const response1 = await axios(`http://localhost:5140/tipoComiss/`);
      const response2 = await axios(`http://localhost:5140/representante/`);
      setData1(response1.data);
      setData2(response2.data);
      setData(response.data);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id }
      }));
    }
    loadData();
  }, []);

  let options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj == "") return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999"
    )
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }

  async function cnpjRequest(value) {
    const currentValue = value.replace(/[^\d]/g, "");
    const response = await axios({
      url: `https://www.receitaws.com.br/v1/cnpj/${currentValue}`,
      adapter: jsonpAdapter
    });
    if (response.data.status === "ERROR") {
      setValues(prevState => ({
        ...prevState,
        cnpj: {
          error: "has-danger",
          message: "Insira um CNPJ válido"
        }
      }));
      options = {
        place: "tr",
        message: (
          <div>
            <div>O CNPJ é inválido e foi recusado pela receita federal</div>
          </div>
        ),
        type: "danger",
        icon: "tim-icons icon-alert-circle-exc",
        autoDismiss: 7
      };
      notify();
    } else {
      setValues(prevState => ({
        ...prevState,
        rzSoc: { value: response.data.nome }
      }));
      setOptional(prevState => ({
        ...prevState,
        fantasia: { value: response.data.fantasia }
      }));
    }
  }

  const renderCnpjState = value => {
    if (!validarCNPJ(value)) {
      setValues(prevState => ({
        ...prevState,
        cnpj: {
          error: "has-danger",
          message: "Insira um CNPJ válido"
        }
      }));
    } else {
      setValues(prevState => ({
        ...prevState,
        cnpj: { value, error: "has-success", message: "" }
      }));
    }
  };
  const verifyNumber = value => {
    const numberRex = new RegExp("^[0-9]+$");
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

      case "cnpj":
        setValues(prevState => ({
          ...prevState,
          cnpj: { value: normalizeCnpj(target) }
        }));
        break;
      case "optional":
        setOptional(prevState => ({
          ...prevState,
          [name]: { value: target }
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

  const handleSubmit = evt => {
    evt.preventDefault();
    const aux = Object.entries(values);
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
      const cnpjdb = values.cnpj.value.replace(/[^\d]+/g, "");
      dispatch(
        ClienteRequest(
          cnpjdb,
          values.nomeAbv.value,
          values.rzSoc.value,
          optional.fantasia.value,
          values.representante.value,
          values.tipoComiss.value,
          values.empresaId.value,
          prospect
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
      <div className="rna-container">
        <NotificationAlert ref={notifyElment} />
      </div>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cliente</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Label>Empresa</Label>
                  <FormGroup className={`has-label ${values.empresaId.error}`}>
                    <Input
                      disabled
                      name="EmpresaId"
                      type="select"
                      onChange={event =>
                        handleChange(event, "empresaId", "text")
                      }
                      value={values.empresaId.value}
                    >
                      {" "}
                      <option value={1}>
                        {" "}
                        {data.nome} - {normalizeCnpj(data.idFederal)}
                      </option>
                    </Input>
                    {values.empresaId.error === "has-danger" ? (
                      <Label className="error">
                        {values.empresaId.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                  <Row>
                    <Col md="4">
                      <Label>CNPJ</Label>
                      <FormGroup className={`has-label ${values.cnpj.error}`}>
                        <Input
                          maxLength={18}
                          name="cnpj"
                          type="text"
                          onChange={event =>
                            handleChange(event, "cnpj", "cnpj")
                          }
                          value={values.cnpj.value}
                          onBlur={e => {
                            const { value } = e.target;
                            renderCnpjState(value);
                            cnpjRequest(value);
                          }}
                        />

                        {values.cnpj.error === "has-danger" ? (
                          <Label className="error">{values.cnpj.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Razão Social</Label>
                      <FormGroup className={`has-label ${values.rzSoc.error}`}>
                        <Input
                          disabled
                          id="rzSoc"
                          name="rzSoc"
                          type="text"
                          onChange={event =>
                            handleChange(event, "rzSoc", "text")
                          }
                          value={values.rzSoc.value}
                        />
                        {values.rzSoc.error === "has-danger" ? (
                          <Label className="error">
                            {values.rzSoc.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Nome Fanasia</Label>
                      <FormGroup
                        className={`has-label ${optional.fantasia.error}`}
                      >
                        <Input
                          disabled
                          onChange={event =>
                            handleChange(event, "fantasia", "optional")
                          }
                          value={optional.fantasia.value}
                          name="nomeAbv"
                          type="text"
                        />
                        {optional.fantasia.error === "has-danger" ? (
                          <Label className="error">
                            {optional.fantasia.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <Label>Nome Abreviado</Label>
                      <FormGroup
                        className={`has-label ${values.nomeAbv.error}`}
                      >
                        <Input
                          name="name_abv"
                          type="text"
                          onChange={event =>
                            handleChange(event, "nomeAbv", "text")
                          }
                          value={values.nomeAbv.value}
                        />
                        {values.nomeAbv.error === "has-danger" ? (
                          <Label className="error">
                            {values.nomeAbv.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Representante</Label>
                      <FormGroup
                        className={`has-label ${values.representante.error}`}
                      >
                        <Input
                          name="representante"
                          type="select"
                          onChange={event =>
                            handleChange(event, "representante", "text")
                          }
                          value={values.representante.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o representante{" "}
                          </option>
                          {data2.map(representante => (
                            <option value={representante.id}>
                              {" "}
                              {representante.nome}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.representante.error === "has-danger" ? (
                          <Label className="error">
                            {values.representante.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Tipo Comissão</Label>
                      <FormGroup
                        className={`has-label ${values.tipoComiss.error}`}
                      >
                        <Input
                          name="tipoComiss"
                          type="select"
                          onChange={event =>
                            handleChange(event, "tipoComiss", "text")
                          }
                          value={values.tipoComiss.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o tipo de comissão{" "}
                          </option>
                          {data1.map(tipoComiss => (
                            <option value={tipoComiss.id}>
                              {" "}
                              {tipoComiss.id} - {tipoComiss.desc}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.tipoComiss.error === "has-danger" ? (
                          <Label className="error">
                            {values.tipoComiss.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Link to="/tabelas/cliente/cliente">
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
  );
}
