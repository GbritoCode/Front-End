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
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { Link, useParams } from "react-router-dom";
import { normalizeFone } from "~/normalize";
import { CliContRequest } from "~/store/modules/Cliente/actions";

export default function CliContCadastro() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const [data, setData] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const stateSchema = {
    ClienteId: { value: "", error: "", message: "" },
    nome: { value: "", error: "", message: "" },
    cel: { value: "", error: "", message: "" },
    fone: { value: "", error: "", message: "" },
    skype: { value: "", error: "", message: "" },
    email: { value: "", error: "", message: "" },
    tipoConta: { value: "", error: "", message: "" }
  };
  const optionalSchema = {
    aniver: { value: null, error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);

  useEffect(() => {
    async function loadData() {
      const response = await axios(`http://localhost:5140/cliente/${id}`);
      setData(response.data);
      setValues(prevState => ({
        ...prevState,
        ClienteId: { value: response.data.id }
      }));
    }
    loadData();
  }, [id]);

  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
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
      var celdb = values.cel.value.replace(/[^\d]+/g, "");
      var fonedb = values.fone.value.replace(/[^\d]+/g, "");
      dispatch(
        CliContRequest(
          values.ClienteId.value,
          values.nome.value,
          celdb,
          fonedb,
          values.skype.value,
          values.email.value,
          optional.aniver.value,
          values.tipoConta.value
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
                <CardTitle tag="h4">Contato do cliente</CardTitle>
              </CardHeader>
              <CardBody>
                <Form id="RegisterValidation" onSubmit={handleSubmit}>
                  <Label>Cliente</Label>
                  <FormGroup className={`has-label ${values.ClienteId.error}`}>
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
                      <option value={data.id}>
                        {" "}
                        {data.nomeAbv} - {data.CNPJ}
                      </option>
                    </Input>
                    {values.ClienteId.error === "has-danger" ? (
                      <Label className="error">
                        {values.ClienteId.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                  <Row>
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
                      <Label>Celular</Label>
                      <FormGroup className={`has-label ${values.cel.error}`}>
                        <Input
                          minLength={10}
                          maxLength={11}
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
                      <Label>Telefone</Label>
                      <FormGroup className={`has-label ${values.fone.error}`}>
                        <Input
                          minLength={10}
                          maxLength={11}
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
                          <Label className="error">{values.fone.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <FormGroup
                        className={`has-label ${optional.aniver.error}`}
                      >
                        <Label>Aniversário </Label>
                        <Input
                          name="aniver"
                          type="date"
                          onChange={event =>
                            handleChange(event, "aniver", "optional")
                          }
                          value={optional.aniver.value}
                        />
                        {optional.aniver.error === "has-danger" ? (
                          <Label className="error">
                            {optional.aniver.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>tipo de Contato</Label>
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
                    <Col md="4">
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
                  </Row>
                  <Row>
                    <Col md="4">
                      <Label>Email</Label>
                      <FormGroup className={`has-label ${values.email.error}`}>
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
                  <Link to={`/tabelas/cliente/cont/${values.ClienteId.value}`}>
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
