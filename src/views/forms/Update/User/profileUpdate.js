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
  Label,
  Input,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { updateProfile } from "~/store/modules/user/actions";
import api from "~/services/api";
import { store } from "~/store";

/* eslint-disable eqeqeq */
function ProfileUpdate() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { CPF } = store.getState().auth.user.Colab;
  const ColabId = store.getState().auth.user.Colab.id;
  const { id } = store.getState().auth.user;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const stateSchema = {
    nome: { value: "", error: "", message: "" },
    email: { value: "", error: "", message: "" },
    aniver: { value: "", error: "", message: "" }
  };
  const optionalSchema = {
    senhaAntiga: { value: "", error: "", message: "" },
    senha: { value: "", error: "", message: "" },
    confirmSenha: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);
  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/users/${id}`);

      setValues(prevState => ({
        ...prevState,
        nome: { value: response.data.nome },
        email: { value: response.data.email },
        aniver: { value: response.data.aniver }
      }));

      setIsLoading(false);
    }
    loadData();
  }, [id]);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePassword1Visiblity = () => {
    setPasswordShown1(!passwordShown1);
  };
  const togglePassword2Visiblity = () => {
    setPasswordShown2(!passwordShown2);
  };
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const handleChange = (event, name, type) => {
    event.persist();
    const target = event.target.value;
    switch (type) {
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
    if (
      !(
        optional.senha.value &&
        optional.senhaAntiga.value &&
        optional.confirmSenha.value
      )
    ) {
      if (valid && filled) {
        dispatch(
          updateProfile(
            id,
            values.nome.value,
            values.email.value,
            values.aniver.value
          )
        );
        return;
      }
    }
    if (valid && filled) {
      dispatch(
        updateProfile(
          id,
          values.nome.value,
          values.email.value,
          values.aniver.value,
          ColabId,
          CPF,
          optional.senhaAntiga.value,
          optional.senha.value,
          optional.confirmSenha.value
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
                    <CardTitle tag="h4">Edição de Usuário</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <Label>Nome</Label>
                          <FormGroup
                            className={`has-label ${values.nome.error}`}
                          >
                            <Input
                              disabled
                              name="nome"
                              type="text"
                              onChange={event =>
                                handleChange(event, "nome", "text")
                              }
                              value={values.nome.value}
                            />
                            {values.nome.error === "has-danger" ? (
                              <Label className="error">
                                {values.nome.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Email</Label>
                          <FormGroup
                            className={`has-label ${values.email.error}`}
                          >
                            <Input
                              disabled
                              name="email"
                              type="text"
                              onChange={event =>
                                handleChange(event, "email", "text")
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
                        <Col md="4">
                          <Label>Aniversário</Label>
                          <FormGroup
                            className={`has-label ${values.aniver.error}`}
                          >
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
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Senha Atual</Label>
                          <FormGroup
                            className={`has-label ${optional.senhaAntiga.error}`}
                          >
                            <Input
                              onMouseEnter={togglePassword2Visiblity}
                              onMouseLeave={togglePassword2Visiblity}
                              name="senhaAntiga"
                              type={passwordShown2 ? "text" : "password"}
                              onChange={event =>
                                handleChange(event, "senhaAntiga", "optional")
                              }
                              value={optional.senhaAntiga.value}
                            />
                            {optional.senhaAntiga.error === "has-danger" ? (
                              <Label className="error">
                                {optional.senhaAntiga.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Nova Senha</Label>
                          <FormGroup
                            className={`has-label ${optional.senha.error}`}
                          >
                            <Input
                              onMouseEnter={togglePasswordVisiblity}
                              onMouseLeave={togglePasswordVisiblity}
                              name="senha"
                              type={passwordShown ? "text" : "password"}
                              onChange={event =>
                                handleChange(event, "senha", "optional")
                              }
                              value={optional.senha.value}
                            />
                            {optional.senha.error === "has-danger" ? (
                              <Label className="error">
                                {optional.senha.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Confirmar Senha</Label>
                          <FormGroup
                            className={`has-label ${optional.confirmSenha.error}`}
                          >
                            <Input
                              onMouseEnter={togglePassword1Visiblity}
                              onMouseLeave={togglePassword1Visiblity}
                              name="confirmSenha"
                              type={passwordShown1 ? "text" : "password"}
                              onChange={event =>
                                handleChange(event, "confirmSenha", "optional")
                              }
                              value={optional.confirmSenha.value}
                            />
                            {optional.confirmSenha.error === "has-danger" ? (
                              <Label className="error">
                                {optional.confirmSenha.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Link to="/dashboard">
                        <Button
                          style={{
                            paddingLeft: 32,
                            paddingRight: 33
                          }}
                          color="secundary"
                          size="small"
                          className="form"
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
export default ProfileUpdate;
