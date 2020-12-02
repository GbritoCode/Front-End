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
import { ClienteRequest } from "~/store/modules/Cliente/actions";
import { store } from "~/store";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import { normalizeCnpj } from "normalize.js";
import { Link, useParams } from "react-router-dom";

export default function CadastroCliente() {
  //--------- colocando no modo claro do template
  const { prospect } = useParams()
  let jsonpAdapter = require("axios-jsonp");
  document.body.classList.add("white-content");
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const empresa = store.getState().auth.empresa;
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cnpj: { value: "", error: "", message: "" },
    rzSoc: { value: "", error: "", message: "" },
    nomeAbv: { value: "", error: "", message: "" },
    representante: { value: "", error: "", message: "" },
    tipoComiss: { value: "", error: "", message: "" },
  };
  const optionalSchema = {
    fantasia: { value: "", error: "", message: "" },
  }
  const [optional, setOptional] = useState(optionalSchema);
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:51314/empresa/${empresa}`);
      const response1 = await axios(`http://localhost:51314/tipoComiss/`);
      const response2 = await axios(`http://localhost:51314/representante/`);
      setData1(response1.data);
      setData2(response2.data);
      setData(response.data);
      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response.data.id },
      }));

      setIsLoading(false);
    }
    loadData();
  }, []);

  var options = {};

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
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
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
      adapter: jsonpAdapter,
    });
    if (response.data.status === "ERROR") {
      setValues((prevState) => ({
        ...prevState,
        cnpj: {
          error: "has-danger",
          message: "Insira um CNPJ válido",
        },
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
        autoDismiss: 7,
      };
      notify();
    } else {
      setValues((prevState) => ({
        ...prevState,
        rzSoc: { value: response.data.nome },
      }));
      setOptional((prevState) => ({
        ...prevState,
        fantasia: { value: response.data.fantasia },
      }));
    }
  }

  const renderCnpjState = (value) => {
    if (!validarCNPJ(value)) {
      setValues((prevState) => ({
        ...prevState,
        cnpj: {
          error: "has-danger",
          message: "Insira um CNPJ válido",
        },
      }));
    } else {
      setValues((prevState) => ({
        ...prevState,
        cnpj: { value: value, error: "has-success", message: "" },
      }));
    }
  };
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

      case "cnpj":
        setValues((prevState) => ({
          ...prevState,
          cnpj: { value: normalizeCnpj(target) },
        }));
        break;
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
      var cnpjdb = values.cnpj.value.replace(/[^\d]+/g, "");
      dispatch(
        ClienteRequest(
          cnpjdb,
          values.nomeAbv.value,
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
                <CardTitle tag="h4">Cliente</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Label>Empresa</Label>
                  <FormGroup className={`has-label ${values.empresaId.error}`}>
                    <Input
                      disabled={true}
                      name="EmpresaId"
                      type="select"
                      onChange={(event) =>
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
                      <label className="error">
                        {values.empresaId.message}
                      </label>
                    ) : null}
                  </FormGroup>
                  <label>CNPJ</label>
                  <FormGroup className={`has-label ${values.cnpj.error}`}>
                    <Input
                      maxLength={18}
                      name="cnpj"
                      type="text"
                      onChange={(event) => handleChange(event, "cnpj", "cnpj")}
                      value={values.cnpj.value}
                      onBlur={(e) => {
                        let value = e.target.value;
                        renderCnpjState(value);
                        cnpjRequest(value);
                      }}
                    />

                    {values.cnpj.error === "has-danger" ? (
                      <label className="error">{values.cnpj.message}</label>
                    ) : null}
                  </FormGroup>
                  <label>Razão Social</label>
                  <FormGroup className={`has-label ${values.rzSoc.error}`}>
                    <Input
                      disabled
                      id="rzSoc"
                      name="rzSoc"
                      type="text"
                      onChange={(event) =>
                        handleChange(event, "rzSoc", "text")
                      }
                      value={values.rzSoc.value}
                    />
                    {values.rzSoc.error === "has-danger" ? (
                      <label className="error">
                        {values.rzSoc.message}
                      </label>
                    ) : null}
                  </FormGroup>
                  <label>Nome Fanasia</label>
                  <FormGroup
                    className={`has-label ${optional.fantasia.error}`}
                  >
                    <Input
                      disabled
                      onChange={(event) =>
                        handleChange(event, "fantasia", "optional")
                      }
                      value={optional.fantasia.value}
                      name="nomeAbv"
                      type="text"
                    />
                    {optional.fantasia.error === "has-danger" ? (
                      <label className="error">
                        {optional.fantasia.message}
                      </label>
                    ) : null}
                  </FormGroup>
                  <Label>Nome Abreviado</Label>
                  <FormGroup className={`has-label ${values.nomeAbv.error}`}>
                    <Input
                      name="name_abv"
                      type="text"
                      onChange={(event) =>
                        handleChange(event, "nomeAbv", "text")
                      }
                      value={values.nomeAbv.value}
                    />
                    {values.nomeAbv.error === "has-danger" ? (
                      <label className="error">{values.nomeAbv.message}</label>
                    ) : null}
                  </FormGroup>
                  <Row>
                    <Col md="6">
                      {" "}
                      <Label>Representante</Label>
                      <FormGroup
                        className={`has-label ${values.representante.error}`}
                      >
                        <Input
                          name="representante"
                          type="select"
                          onChange={(event) =>
                            handleChange(event, "representante", "text")
                          }
                          value={values.representante.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o representante{" "}
                          </option>
                          {data2.map((representante) => (
                            <option value={representante.id}>
                              {" "}
                              {representante.nome}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.representante.error === "has-danger" ? (
                          <label className="error">
                            {values.representante.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <Label>Tipo Comissão</Label>
                      <FormGroup
                        className={`has-label ${values.tipoComiss.error}`}
                      >
                        <Input
                          name="tipoComiss"
                          type="select"
                          onChange={(event) =>
                            handleChange(event, "tipoComiss", "text")
                          }
                          value={values.tipoComiss.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o tipo de comissão{" "}
                          </option>
                          {data1.map((tipoComiss) => (
                            <option value={tipoComiss.id}>
                              {" "}
                              {tipoComiss.id} - {tipoComiss.desc}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.tipoComiss.error === "has-danger" ? (
                          <label className="error">
                            {values.tipoComiss.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Link to={"/tabelas/cliente/cliente"}>
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
  );
}
