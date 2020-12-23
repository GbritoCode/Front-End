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
import React, { useRef, useState, useEffect } from "react";

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
import { empresaRequest } from "~/store/modules/general/actions";
import api from "~/services/api";

/* eslint-disable eqeqeq */
export default function WizardCadastro() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const jsonpAdapter = require("axios-jsonp");

  const stateSchema = {
    cnpj: { value: "", error: "", message: "" },
    nome: { value: "", error: "", message: "" },
    license: { value: "", error: "", message: "" },
    userId: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);

  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/users`);
      setData(response.data);
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

  const normalizeInput = value => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, "");
    const cvLength = currentValue.length;

    if (cvLength < 3) return currentValue;
    if (cvLength < 6)
      return `${currentValue.slice(0, 2)}.${currentValue.slice(2)}`;
    if (cvLength < 9)
      return `${currentValue.slice(0, 2)}.${currentValue.slice(
        2,
        5
      )}.${currentValue.slice(5)}`;
    if (cvLength < 13)
      return `${currentValue.slice(0, 2)}.${currentValue.slice(
        2,
        5
      )}.${currentValue.slice(5, 8)}/${currentValue.slice(8)}`;
    return `${currentValue.slice(0, 2)}.${currentValue.slice(
      2,
      5
    )}.${currentValue.slice(5, 8)}/${currentValue.slice(
      8,
      12
    )}-${currentValue.slice(12, 14)}`;
  };

  const renderCnpjState = value => {
    if (!validarCNPJ(value)) {
      setValues(prevState => ({
        ...prevState,
        cnpj: { error: "has-danger", message: "Insira um CNPJ válido" }
      }));
    } else {
      setValues(prevState => ({
        ...prevState,
        cnpj: { value, error: "has-success", message: "" }
      }));
    }
  };

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
      case "cnpj":
        setValues(prevState => ({
          ...prevState,
          cnpj: { value: normalizeInput(target) }
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
        nome: { value: response.data.nome }
      }));
    }
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
      var cnpjdb = values.cnpj.value.replace(/[^\d]+/g, "");
      const first = true;
      dispatch(
        empresaRequest(
          cnpjdb,
          values.nome.value,
          values.license.value,
          values.userId.value,
          first
        )
      );
      api
        .get("/empresa")
        .then(results => {})
        .catch(error => {});
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
        <div className="mr-auto ml-auto col-md-10">
          <div
            className="text-center card-header"
            style={{ backgroundColor: "#f5f6fa", borderBottomWidth: 0 }}
          >
            <h3 className="card-title">Bem Vindo!</h3>
            <h4 className="description">
              Esse é o primeiro login dessa aplicação, cadastre alguns dados
              necessários.
            </h4>
          </div>
          <Card>
            <CardHeader>
              <CardTitle style={{ textAlign: "center" }} tag="h4">
                Cadastre a sua Empresa
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="6">
                    <Label>CNPJ</Label>
                    <FormGroup className={`has-label ${values.cnpj.error}`}>
                      <Input
                        name="idFederal"
                        type="text"
                        onChange={event => handleChange(event, "cnpj", "cnpj")}
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
                  <Col md="6">
                    <Label>Nome</Label>
                    <FormGroup className={`has-label ${values.nome.error}`}>
                      <Input
                        name="nome"
                        type="text"
                        onChange={event => handleChange(event, "nome", "text")}
                        value={values.nome.value}
                      />
                      {values.nome.error === "has-danger" ? (
                        <Label className="error">{values.nome.message}</Label>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Label>License</Label>
                    <FormGroup className={`has-label ${values.license.error}`}>
                      <Input
                        name="license"
                        type="text"
                        onChange={event =>
                          handleChange(event, "license", "text")
                        }
                        value={values.license.value}
                      />
                      {values.license.error === "has-danger" ? (
                        <Label className="error">
                          {values.license.message}
                        </Label>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <Label>Usuário</Label>
                    <FormGroup className={`has-label ${values.userId.error}`}>
                      <Input
                        name="UserId"
                        type="select"
                        onChange={event =>
                          handleChange(event, "userId", "text")
                        }
                        value={values.userId.value}
                      >
                        {" "}
                        <option disabled value="">
                          {" "}
                          Selecione o usuário{" "}
                        </option>
                        {data.map(user => (
                          <option key={user.id} value={user.id}>
                            {" "}
                            {user.name} - {user.email}{" "}
                          </option>
                        ))}
                      </Input>{" "}
                      {values.userId.error === "has-danger" ? (
                        <Label className="error">{values.userId.message}</Label>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
                <Button
                  style={{
                    paddingLeft: 29,
                    paddingRight: 30,
                    float: "right"
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
        </div>
      </div>
    </>
  );
}
