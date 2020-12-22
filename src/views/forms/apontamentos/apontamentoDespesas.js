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
  Form,
  Label,
  Input,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { Link, useParams } from "react-router-dom";
import { despesaRequest } from "~/store/modules/oportunidades/actions";
import { store } from "~/store";
import { normalizeCurrency } from "~/normalize";

export default function DespesaCadastro() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { id } = useParams();
  const dispatch = useDispatch();
  const [data1, setData1] = useState({});
  const [date, month, year] = new Date().toLocaleDateString("pt-BR").split("/");
  var options = {};
  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const optionalSchema = {
    desc: { value: "", error: "", message: "" }
  };
  const stateSchema = {
    OportunidadeId: { value: "", error: "", message: "" },
    ColabId: { value: "", error: "", message: "" },
    dataDespesa: {
      value: `${year}-${month}-${date}`,
      error: "",
      message: ""
    },
    tipoDespesa: { value: "", error: "", message: "" },
    valorDespesa: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);

  useEffect(() => {
    const { email } = store.getState().auth.user;
    async function loadData() {
      const response1 = await axios(`http://localhost:5140/oportunidade/${id}`);
      const response2 = await axios(
        `http://localhost:5140/colab/?email=${email}`
      );
      setData1(response1.data);
      setValues(prevState => ({
        ...prevState,
        OportunidadeId: { value: response1.data.id },
        ColabId: { value: response2.data.id }
      }));
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
      var valorDespesadb = values.valorDespesa.value.replace(/[.,]+/g, "");
      dispatch(
        despesaRequest(
          values.OportunidadeId.value,
          values.ColabId.value,
          values.dataDespesa.value,
          values.tipoDespesa.value,
          valorDespesadb,
          optional.desc.value
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
                <CardTitle tag="h4">Despesa</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="8">
                      <Label>Oportunidade</Label>
                      <FormGroup
                        className={`has-label ${values.OportunidadeId.error}`}
                      >
                        <Input
                          disabled
                          name="OportunidadeId"
                          onChange={event =>
                            handleChange(event, "OportunidadeId", "text")
                          }
                          value={values.OportunidadeId.value}
                          type="select"
                        >
                          <option disabled value="">
                            {" "}
                            Selecione a Oportunidade{" "}
                          </option>{" "}
                          <option value={data1.id}>
                            {" "}
                            {data1.cod} - {data1.desc}
                          </option>
                        </Input>

                        {values.OportunidadeId.error === "has-danger" ? (
                          <Label className="error">
                            {values.OportunidadeId.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Data da Despesa</Label>
                      <FormGroup
                        className={`has-label ${values.dataDespesa.error}`}
                      >
                        <Input
                          name="dataDespesa"
                          type="date"
                          onChange={event =>
                            handleChange(event, "dataDespesa", "text")
                          }
                          value={values.dataDespesa.value}
                        />
                        {values.dataDespesa.error === "has-danger" ? (
                          <Label className="error">
                            {values.dataDespesa.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <Label>Tipo da Despesa</Label>
                      <FormGroup
                        className={`has-label ${values.tipoDespesa.error}`}
                      >
                        <Input
                          name="tipoDespesa"
                          type="select"
                          onChange={event => {
                            handleChange(event, "tipoDespesa", "text");
                          }}
                          value={values.tipoDespesa.value}
                        >
                          <option disabled value="">
                            {" "}
                            Selecione o tipo da despesa{" "}
                          </option>
                          <option value={1}>Alimentação</option>
                          <option value={2}>Deslocamento</option>
                          <option value={3}>Hospedagem</option>
                          <option value={4}>Passagem</option>
                          <option value={5}>Pedágio</option>
                          <option value={6}>Estacionamento</option>
                        </Input>
                        {values.tipoDespesa.error === "has-danger" ? (
                          <Label className="error">
                            {values.tipoDespesa.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Valor da Despesa </Label>
                      <FormGroup
                        className={`has-label ${values.valorDespesa.error}`}
                      >
                        <Input
                          name="valorDespesa"
                          type="text"
                          onChange={event =>
                            handleChange(event, "valorDespesa", "currency")
                          }
                          value={values.valorDespesa.value}
                        />
                        {values.valorDespesa.error === "has-danger" ? (
                          <Label className="error">
                            {values.valorDespesa.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Label>Descrição</Label>
                      <FormGroup className={`has-label ${optional.desc.error}`}>
                        <Input
                          name="desc"
                          type="textarea"
                          onChange={event =>
                            handleChange(event, "desc", "optional")
                          }
                          value={optional.desc.value}
                        />
                        {optional.desc.error === "has-danger" ? (
                          <Label className="error">
                            {optional.desc.message}
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
                  <Link to={`/tabelas/oportunidade/recurso/${data1.id}`}>
                    <Button
                      style={{
                        paddingLeft: 32,
                        paddingRight: 33,
                        float: "left"
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
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
