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
  Form,
  Label,
  Input,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { Link } from "react-router-dom";
import { normalizeFone, normalizeCpf } from "~/normalize";
import { store } from "~/store";
import { colabRequest } from "~/store/modules/Colab/actions";
import api from "~/services/api";
import TagsInput from "~/components/Tags/TagsInput";

/* eslint-disable eqeqeq */
export default function ColabCadastro() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const [tagsinput, settagsinput] = useState([]);

  const [string, setString] = useState("");
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cpf: { value: "", error: "", message: "" },
    fornecId: { value: "", error: "", message: "" },
    nome: { value: "", error: "", message: "" },
    dtAdmiss: { value: "", error: "", message: "" },
    cel: { value: "", error: "", message: "" },
    PerfilUser: { value: "", error: "", message: "" },
    skype: { value: "", error: "", message: "" },
    email: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      const response = await api.get(`/empresa/${empresa}`);
      const response1 = await api.get(`/fornec`);
      const response2 = await api.get(`/perfil`);
      setData1(response1.data);
      setData2(response2.data);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id }
      }));
    }
    loadData();
  }, []);

  const handleTagsinput = value => {
    setString(`${value}`);
    settagsinput(value);
  };

  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf == "") return false;
    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;

    for (var i = 1; i <= 9; i++)
      Soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10), 10)) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11), 10)) return false;
    return true;
  }

  const renderCpfState = value => {
    if (!validarCPF(value)) {
      setValues(prevState => ({
        ...prevState,
        cpf: { error: "has-danger", message: "Insira um cpf válido" }
      }));
    } else {
      setValues(prevState => ({
        ...prevState,
        cpf: { value, error: "has-success", message: "" }
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

  const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
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
      case "email":
        if (verifyEmail(target)) {
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
              message: "Insira um E-mail válido"
            }
          }));
        }
        break;
      case "cpf":
        setValues(prevState => ({
          ...prevState,
          cpf: { value: normalizeCpf(target) }
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
      var cpfdb = values.cpf.value.replace(/[^\d]+/g, "");
      var celdb = values.cel.value.replace(/[^\d]+/g, "");
      const first = false;

      dispatch(
        colabRequest(
          cpfdb,
          values.fornecId.value,
          values.empresaId.value,
          values.nome.value,
          values.dtAdmiss.value,
          celdb,
          values.PerfilUser.value,
          values.skype.value,
          values.email.value,
          string,
          first,
          values.PerfilUser.value
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
                <CardTitle tag="h4">Colaborador</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="4">
                      <Label>CPF</Label>
                      <FormGroup className={`has-label ${values.cpf.error}`}>
                        <Input
                          maxLength={18}
                          name="cpf"
                          type="text"
                          onChange={event => handleChange(event, "cpf", "cpf")}
                          value={values.cpf.value}
                          onBlur={e => {
                            const { value } = e.target;
                            renderCpfState(value);
                          }}
                        />
                        {values.cpf.error === "has-danger" ? (
                          <Label className="error">{values.cpf.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Nome</Label>
                      <FormGroup className={`has-label ${values.nome.error}`}>
                        <Input
                          name="nome"
                          type="text"
                          onChange={event =>
                            handleChange(event, "nome", "text")
                          }
                          value={values.nome.value}
                        />
                        {values.nome.error === "has-danger" ? (
                          <Label className="error">{values.nome.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Data de Adimissão</Label>
                      <FormGroup
                        className={`has-label ${values.dtAdmiss.error}`}
                      >
                        <Input
                          name="dtAdmiss"
                          type="date"
                          onChange={event =>
                            handleChange(event, "dtAdmiss", "text")
                          }
                          value={values.dtAdmiss.value}
                        />
                        {values.dtAdmiss.error === "has-danger" ? (
                          <Label className="error">
                            {values.dtAdmiss.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      {" "}
                      <Label>Celular</Label>
                      <FormGroup className={`has-label ${values.cel.error}`}>
                        <Input
                          maxLength={11}
                          minLength={10}
                          name="cel"
                          type="numeric"
                          onChange={event => handleChange(event, "cel", "text")}
                          onBlur={e => {
                            const { value } = e.target;
                            setValues(prevState => ({
                              ...prevState,
                              cel: { value: normalizeFone(value) }
                            }));
                          }}
                          value={values.cel.value}
                        />
                        {values.cel.error === "has-danger" ? (
                          <Label className="error">{values.cel.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Fornecedor</Label>
                      <FormGroup
                        className={`has-label ${values.fornecId.error}`}
                      >
                        <Input
                          name="FornecId"
                          type="select"
                          onChange={event =>
                            handleChange(event, "fornecId", "text")
                          }
                          value={values.fornecId.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o fornecedor{" "}
                          </option>
                          {data1.map(fornec => (
                            <option value={fornec.id}>
                              {fornec.nomeConta} - {fornec.nome}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.fornecId.error === "has-danger" ? (
                          <Label className="error">
                            {values.fornecId.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {" "}
                      <Label>Perfil</Label>
                      <FormGroup
                        className={`has-label ${values.PerfilUser.error}`}
                      >
                        <Input
                          name="FornecId"
                          type="select"
                          onChange={event =>
                            handleChange(event, "PerfilUser", "text")
                          }
                          value={values.PerfilUser.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o perfil{" "}
                          </option>
                          {data2.map(perfil => (
                            <option value={perfil.id}>
                              {perfil.cod} - {perfil.desc}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.PerfilUser.error === "has-danger" ? (
                          <Label className="error">
                            {values.PerfilUser.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      {" "}
                      <Label>Skype</Label>
                      <FormGroup className={`has-label ${values.skype.error}`}>
                        <Input
                          name="skype"
                          type="text"
                          onChange={event =>
                            handleChange(event, "skype", "text")
                          }
                          value={values.skype.value}
                        />
                        {values.skype.error === "has-danger" ? (
                          <Label className="error">
                            {values.skype.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Email</Label>
                      <FormGroup className={`has-label ${values.email.error}`}>
                        <Input
                          name="email"
                          type="text"
                          onChange={event =>
                            handleChange(event, "email", "email")
                          }
                          value={values.email.value}
                        />
                        {values.email.error === "has-danger" ? (
                          <Label className="error">
                            {values.email.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      {" "}
                      <Label>Especialidade</Label>
                      <FormGroup claclassName="has-label">
                        <TagsInput
                          onChange={handleTagsinput}
                          tagProps={{
                            className: "react-tagsinput-tag "
                          }}
                          value={tagsinput}
                        />
                      </FormGroup>
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
                  <Link to="/tabelas/colab">
                    <Button
                      style={{
                        paddingLeft: 32,
                        paddingRight: 33,
                        float: "left"
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
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
