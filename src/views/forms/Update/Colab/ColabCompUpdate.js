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
  FormGroup,
  Form,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { normalizeCpf, normalizeCurrency } from "~/normalize";
import { ColabCompUpdate } from "~/store/modules/Colab/actions";
import api from "~/services/api";

function ColabCompUpdatee() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const { id } = useParams();
  const [data1, setData1] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const stateSchema = {
    ColabId: { value: "", error: "", message: "" },
    nivel: { value: "", error: "", message: "" },
    tipoValor: { value: "", error: "", message: "" },
    valor: { value: "", error: "", message: "" },
    dataInic: { value: "", error: "", message: "" },
    dataFim: { value: "", error: "", message: "" },
    tipoAtend: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/colab/comp/1/${id}`);
      const response1 = await api.get(`/colab/${response.data.ColabId}`);
      setData1(response1.data);

      setValues(prevState => ({
        ...prevState,
        ColabId: { value: response.data.ColabId },
        nivel: { value: response.data.nivel },
        tipoValor: { value: response.data.tipoValor },
        valor: {
          value: normalizeCurrency(JSON.stringify(response.data.valor))
        },
        dataInic: { value: response.data.dataInic },
        dataFim: { value: response.data.dataFim },
        tipoAtend: { value: response.data.tipoAtend }
      }));

      setIsLoading(false);
    }
    loadData();
  }, [id]);

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
      case "currency":
        setValues(prevState => ({
          ...prevState,
          [name]: { value: normalizeCurrency(target) }
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
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

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
      var valordb = values.valor.value.replace(/[^\d]+/g, "");
      dispatch(
        ColabCompUpdate(
          id,
          values.ColabId.value,
          values.nivel.value,
          values.tipoValor.value,
          valordb,
          values.dataInic.value,
          values.dataFim.value,
          values.tipoAtend.value
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
                    <h3 style={{ marginBottom: 0 }}>
                      Edição de Complemento de Colaborador
                    </h3>
                    <p style={{ fontSize: 11 }}>{data1.nome}</p>
                    <p style={{ fontSize: 11 }}>{normalizeCpf(data1.CPF)}</p>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          {" "}
                          <Label>Nível</Label>
                          <FormGroup
                            className={`has-label ${values.nivel.error}`}
                          >
                            <Input
                              name="nivel"
                              type="select"
                              onChange={event =>
                                handleChange(event, "nivel", "text")
                              }
                              value={values.nivel.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione o nível{" "}
                              </option>
                              <option value={1}>Trainee</option>
                              <option value={2}>Júnior</option>
                              <option value={3}>Pleno</option>
                              <option value={4}>Sênior</option>
                            </Input>
                            {values.nivel.error === "has-danger" ? (
                              <Label className="error">
                                {values.nivel.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <Label>Tipo de valor</Label>
                          <FormGroup
                            className={`has-label ${values.tipoValor.error}`}
                          >
                            <Input
                              name="tipoValor"
                              type="select"
                              onChange={event =>
                                handleChange(event, "tipoValor", "text")
                              }
                              value={values.tipoValor.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione o tipo de valor{" "}
                              </option>
                              <option value={1}>Por Hora</option>
                              <option value={2}>Fixo</option>
                            </Input>
                            {values.tipoValor.error === "has-danger" ? (
                              <Label className="error">
                                {values.tipoValor.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <Label>Valor</Label>
                          <FormGroup
                            className={`has-label ${values.valor.error}`}
                          >
                            <Input
                              name="valor"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "valor", "currency")
                              }
                              value={values.valor.value}
                            />
                            {values.valor.error === "has-danger" ? (
                              <Label className="error">
                                {values.valor.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          {" "}
                          <Label>Data Inicial</Label>
                          <FormGroup
                            className={`has-label ${values.dataInic.error}`}
                          >
                            <Input
                              name="dataInic"
                              type="date"
                              onChange={event =>
                                handleChange(event, "dataInic", "text")
                              }
                              value={values.dataInic.value}
                            />
                            {values.dataInic.error === "has-danger" ? (
                              <Label className="error">
                                {values.dataInic.message}
                              </Label>
                            ) : null}{" "}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <Label>Data Final</Label>
                          <FormGroup
                            className={`has-label ${values.dataFim.error}`}
                          >
                            <Input
                              name="dataFim"
                              type="date"
                              onChange={event =>
                                handleChange(event, "dataFim", "text")
                              }
                              value={values.dataFim.value}
                            />
                            {values.dataFim.error === "has-danger" ? (
                              <Label className="error">
                                {values.dataFim.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Tipo de Atendimento</Label>
                          <FormGroup
                            className={`has-label ${values.tipoAtend.error}`}
                          >
                            <Input
                              name="tipoAtend"
                              type="select"
                              onChange={event =>
                                handleChange(event, "tipoAtend", "text")
                              }
                              value={values.tipoAtend.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione o tipo de atendimento{" "}
                              </option>
                              <option value={1}>Consultoria</option>
                              <option value={2}>Tecnologia</option>
                              <option value={3}>Desenvolvimento</option>
                              <option value={4}>Complementar</option>
                            </Input>
                            {values.tipoAtend.error === "has-danger" ? (
                              <Label className="error">
                                {values.tipoAtend.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Link to="/tables/colab/comp/1">
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
      )}
    </>
  );
}
export default ColabCompUpdatee;
