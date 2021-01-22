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
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { normalizeCnpj, normalizeFone } from "~/normalize";
import { CliContUpdate } from "~/store/modules/Cliente/actions";
import api from "~/services/api";

export default function CliContUpdatee() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { id } = useParams();
  const stateSchema = {
    ClienteId: { value: "", error: "", message: "" },
    nome: { value: "", error: "", message: "" },
    cel: { value: "", error: "", message: "" },
    fone: { value: "", error: "", message: "" },
    skype: { value: "", error: "", message: "" },
    email: { value: "", error: "", message: "" },
    aniver: { value: "", error: "", message: "" },
    tipoConta: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  const [data1, setData1] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await api.get(`/cliente/cont/1/${id}`);
      const response1 = await api.get(`/cliente/${response.data.ClienteId}`);
      setData1(response1.data);

      setValues(prevState => ({
        ...prevState,
        ClienteId: { value: response.data.ClienteId }
      }));
      setValues(prevState => ({
        ...prevState,
        nome: { value: response.data.nome }
      }));
      setValues(prevState => ({
        ...prevState,
        cel: { value: response.data.cel }
      }));
      setValues(prevState => ({
        ...prevState,
        fone: { value: response.data.fone }
      }));
      setValues(prevState => ({
        ...prevState,
        aniver: { value: response.data.aniver }
      }));
      setValues(prevState => ({
        ...prevState,
        tipoConta: { value: response.data.tipoConta }
      }));
      setValues(prevState => ({
        ...prevState,
        skype: { value: response.data.skype }
      }));
      setValues(prevState => ({
        ...prevState,
        email: { value: response.data.email }
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
  const query = new URLSearchParams(useLocation().search);
  const prospect = query.get("prospect");

  function checkProsp(param, aux) {
    switch (aux) {
      case "title":
        switch (param) {
          case "false":
            return "Edição de Contato Cliente";
          case "true":
            return "Edição de Contato Prospect";
          default:
            break;
        }
        break;
      case "backButton":
        return (
          <>
            <Link
              to={`/tabelas/cliente/cont/${values.ClienteId.value}/?prospect=${prospect}`}
            >
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
          </>
        );
      default:
        break;
    }
  }

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
      dispatch(
        CliContUpdate(
          id,
          values.ClienteId.value,
          values.nome.value,
          values.cel.value,
          values.fone.value,
          values.skype.value,
          values.email.value,
          values.aniver.value,
          values.tipoConta.value,
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
      {isLoading ? (
        <div />
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
                      {checkProsp(prospect, "title")}
                    </CardTitle>{" "}
                  </CardHeader>
                  <CardBody>
                    <Form id="RegisterValidation" onSubmit={handleSubmit}>
                      <Label>Cliente</Label>
                      <FormGroup
                        className={`has-label ${values.ClienteId.error}`}
                      >
                        <Input
                          disabled
                          onChange={event =>
                            handleChange(event, "ClienteId", "text")
                          }
                          value={values.ClienteId.value}
                          name="ClienteId"
                          type="select"
                        >
                          <option disabled value="">
                            {" "}
                            Selecione o Cliente{" "}
                          </option>{" "}
                          <option value={data1.id}>
                            {" "}
                            {data1.nomeAbv} - {normalizeCnpj(data1.CNPJ)}
                          </option>
                        </Input>
                        {values.ClienteId.error === "has-danger" ? (
                          <Label className="error">
                            {values.ClienteId.message}
                          </Label>
                        ) : null}
                      </FormGroup>
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
                      <Row>
                        <Col md="3">
                          <Label>Celular</Label>
                          <FormGroup
                            className={`has-label ${values.cel.error}`}
                          >
                            <Input
                              name="cel"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "cel", "text")
                              }
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
                              <Label className="error">
                                {values.cel.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <Label>Telefone</Label>
                          <FormGroup
                            className={`has-label ${values.fone.error}`}
                          >
                            <Input
                              name="fone"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "fone", "text")
                              }
                              onBlur={e => {
                                const { value } = e.target;
                                setValues(prevState => ({
                                  ...prevState,
                                  fone: { value: normalizeFone(value) }
                                }));
                              }}
                              value={values.fone.value}
                            />
                            {values.fone.error === "has-danger" ? (
                              <Label className="error">
                                {values.fone.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup
                            className={`has-label ${values.aniver.error}`}
                          >
                            <Label>Aniversário </Label>
                            <Input
                              name="aniver"
                              type="date"
                              onChange={event =>
                                handleChange(event, "aniver", "text")
                              }
                              value={values.aniver.value}
                            />
                            {values.aniver.error === "has-danger" ? (
                              <Label className="error">
                                {values.aniver.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <Label>Tipo de Contato</Label>
                          <FormGroup
                            className={`has-label ${values.tipoConta.error}`}
                          >
                            <Input
                              name="tipoConta"
                              type="select"
                              onChange={event =>
                                handleChange(event, "tipoConta", "text")
                              }
                              value={values.tipoConta.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione o tipo de contato{" "}
                              </option>
                              <option value={1}>Normal</option>
                              <option value={2}>Nota Fiscal</option>
                            </Input>
                            {values.tipoConta.error === "has-danger" ? (
                              <Label className="error">
                                {values.tipoConta.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Label>Skype</Label>
                          <FormGroup
                            className={`has-label ${values.skype.error}`}
                          >
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
                        <Col md="6">
                          <Label>Email</Label>
                          <FormGroup
                            className={`has-label ${values.email.error}`}
                          >
                            <Input
                              name="email"
                              type="email"
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
                      {checkProsp(prospect, "backButton")}
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
