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
import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef
} from "react";

// reactstrap components
import {
  Card,
  CardBody,
  Label,
  Form,
  Input,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { normalizeFone } from "~/normalize";

const CliContCadastro = forwardRef((props, ref) => {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const [isLoading, setIsLoading] = useState(true);
  const stateSchema = {
    nome: { value: "", error: "", message: "" },
    cel: { value: "", error: "", message: "" },
    fone: { value: "", error: "", message: "" },
    email: { value: "", error: "", message: "" },
    cargo: { value: "", error: "", message: "" },
    skype: { value: "", error: "", message: "", optional: true },
    linkedin: { value: "", error: "", message: "", optional: true },
    aniver: { value: null, error: "", message: "", optional: true },
    ramal: { value: "", error: "", message: "", optional: true }
  };

  const [values, setValues] = useState(stateSchema);
  const [finalState, setFinalState] = useState();

  useEffect(() => {
    async function loadData() {
      setIsLoading(false);
    }
    loadData();
  }, []);

  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (value === "") {
      return true;
    }
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
      case "optionalNumber":
        if (verifyNumber(target)) {
          setValues(prevState => ({
            ...prevState,
            [name]: { value: target, error: "has-success", optional: true }
          }));
        } else {
          setValues(prevState => ({
            ...prevState,
            [name]: {
              value: target,
              error: "has-danger",
              message: "Insira um número válido",
              optional: true
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
        setValues(prevState => ({
          ...prevState,
          [name]: { value: target, optional: true }
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
  console.log(values);
  const isValidated = () => {
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
      if (!aux[j][1].optional === true) {
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
    }

    if (valid && filled) {
      values.cel.value = values.cel.value.replace(/[^\d]+/g, "");
      values.fone.value = values.fone.value.replace(/[^\d]+/g, "");
      setFinalState({
        nome: values.nome.value,
        cel: values.cel.value,
        fone: values.fone.value,
        skype: values.skype.value,
        email: values.email.value,
        aniver: values.aniver.value,
        linkedin: values.linkedin.value,
        cargo: values.cargo.value,
        ramal: values.ramal.value
      });
      return true;
    }
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
  };

  useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    state: finalState
  }));

  return (
    <>
      {isLoading ? (
        <>
          <div className="content" />
        </>
      ) : (
        <>
          <div className="rna-container">
            <NotificationAlert ref={notifyElment} />
          </div>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardBody>
                    <Form id="RegisterValidation">
                      <Row>
                        <Col md="4">
                          <Label>Nome</Label>
                          <FormGroup
                            className={`has-label ${values.nome.error}`}
                          >
                            <Input
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
                          <Label>Cargo</Label>
                          <FormGroup
                            className={`has-label ${values.cargo.error}`}
                          >
                            <Input
                              name="cargo"
                              type="text"
                              onChange={event =>
                                handleChange(event, "cargo", "text")
                              }
                              value={values.cargo.value}
                            />
                            {values.cargo.error === "has-danger" ? (
                              <Label className="error">
                                {values.cargo.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Celular</Label>
                          <FormGroup
                            className={`has-label ${values.cel.error}`}
                          >
                            <Input
                              minLength={10}
                              maxLength={11}
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
                      </Row>

                      <Row>
                        <Col md="4">
                          <Label>Telefone</Label>
                          <FormGroup
                            className={`has-label ${values.fone.error}`}
                          >
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
                              <Label className="error">
                                {values.fone.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Ramal</Label>
                          <FormGroup
                            className={`has-label ${values.ramal.error}`}
                          >
                            <Input
                              name="ramal"
                              type="text"
                              onChange={event =>
                                handleChange(event, "ramal", "optionalNumber")
                              }
                              value={values.ramal.value}
                            />
                            {values.ramal.error === "has-danger" ? (
                              <Label className="error">
                                {values.ramal.message}
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
                        <Col md="4">
                          <Label>Skype</Label>
                          <FormGroup
                            className={`has-label ${values.skype.error}`}
                          >
                            <Input
                              name="skype"
                              type="text"
                              onChange={event =>
                                handleChange(event, "skype", "optional")
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
                          <Label>Linkedin</Label>
                          <FormGroup
                            className={`has-label ${values.linkedin.error}`}
                          >
                            <Input
                              name="linkedin"
                              type="linkedin"
                              onChange={event =>
                                handleChange(event, "linkedin", "optional")
                              }
                              value={values.linkedin.value}
                            />
                            {values.linkedin.error === "has-danger" ? (
                              <Label className="error">
                                {values.linkedin.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup
                            className={`has-label ${values.aniver.error}`}
                          >
                            <Label>Aniversário </Label>
                            <Input
                              name="aniver"
                              type="date"
                              onChange={event =>
                                handleChange(event, "aniver", "optional")
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
});

export default CliContCadastro;
