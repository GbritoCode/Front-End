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
import React, { useRef, Fragment, useEffect, useState } from "react";

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
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { EmpresaUpdate } from "~/store/modules/general/actions";
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import axios from "axios";

/*eslint-disable eqeqeq*/
function EmpresaUpdatee() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data1, setData1] = useState([]);
  const stateSchema = {
    cnpj: { value: "", error: "", message: "" },
    nome: { value: "", error: "", message: "" },
    license: { value: "", error: "", message: "" },
    userId: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);
  useEffect(() => {
    async function loadData() {
      const response = await axios(`http://localhost:51314/empresa/${id}`);
      const response1 = await axios(`http://localhost:51314/users`);

      setData1(response1.data);
      setValues((prevState) => ({
        ...prevState,
        cnpj: { value: response.data.idFederal },
      }));
      setValues((prevState) => ({
        ...prevState,
        nome: { value: response.data.nome },
      }));
      setValues((prevState) => ({
        ...prevState,
        license: { value: response.data.license },
      }));
      setValues((prevState) => ({
        ...prevState,
        userId: { value: response.data.UserId },
      }));

      setIsLoading(false);
    }
    loadData();
  }, [id]);
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

  const normalizeInput = (value) => {
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

  const renderCnpjState = (value) => {
    if (!validarCNPJ(value)) {
      setValues((prevState) => ({
        ...prevState,
        cnpj: { error: "has-danger", message: "Insira um CNPJ válido" },
      }));
    } else {
      setValues((prevState) => ({
        ...prevState,
        cnpj: { error: "has-success", message: "" },
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
          cnpj: { value: normalizeInput(target) },
        }));
        break;
      case "text":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: target },
        }));
        break
        default:
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
      var cnpjdb = values.cnpj.value.replace(/[^\d]+/g, "");
      dispatch(
        EmpresaUpdate(
          id,
          cnpjdb,
          values.nome.value,
          values.license.value,
          values.userId.value
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
                      <CardTitle tag="h4">Edição de Empresa</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit={handleSubmit}>
                      <label>CNPJ</label>
                        <FormGroup className={`has-label ${values.cnpj.error}`}>
                          <Input
                            name="idFederal"
                            type="text"
                            onChange={(event) =>
                              handleChange(event, "cnpj", "cnpj")
                            }
                            value={values.cnpj.value}
                            onBlur={(e) => {
                              let value = e.target.value;
                              renderCnpjState(value);
                            }}
                          />
                          {values.cnpj.error === "has-danger" ? (
                            <label className="error">{values.cnpj.message}</label>
                          ) : null}
                        </FormGroup>

                        <label>Nome</label>
                        <FormGroup className={`has-label ${values.nome.error}`}>
                          <Input
                            name="nome"
                            type="text"
                            onChange={(event) =>
                              handleChange(event, "nome", "text")
                            }
                            value={values.nome.value}
                          />
                          {values.nome.error === "has-danger" ? (
                            <label className="error">{values.nome.message}</label>
                          ) : null}
                        </FormGroup>

                        <label>License</label>
                        <FormGroup
                          className={`has-label ${values.license.error}`}
                        >
                          <Input
                            name="license"
                            type="text"
                            onChange={(event) =>
                              handleChange(event, "license", "text")
                            }
                            value={values.license.value}
                          />
                          {values.license.error === "has-danger" ? (
                            <label className="error">
                              {values.license.message}
                            </label>
                          ) : null}
                        </FormGroup>

                        <label>Usuário</label>
                        <FormGroup className={`has-label ${values.userId.error}`}>
                          <Input
                            name="UserId"
                            type="select"
                            onChange={(event) =>
                              handleChange(event, "userId", "text")
                            }
                            value={values.userId.value}
                          >
                            {" "}
                            <option disabled value="">
                              {" "}
                            Selecione o usuário{" "}
                            </option>
                            {data1.map((user) => (
                              <option key={user.id} value={user.id}>
                                {" "}
                                {user.name}, {user.email}{" "}
                              </option>
                            ))}
                          </Input>{" "}
                          {values.userId.error === "has-danger" ? (
                            <label className="error">
                              {values.userId.message}
                            </label>
                          ) : null}
                        </FormGroup>

                        <Link to={`/tabelas/general/empresa`}>
                          <Button
                            style={{
                              paddingLeft: 32,
                              paddingRight: 33,
                            }}
                            color="secundary"
                            size="small"
                            className="form"
                          >
                            <i className="tim-icons icon-double-left"
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
export default EmpresaUpdatee;
