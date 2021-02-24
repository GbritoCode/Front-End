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
  Label,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { RecDespUpdate } from "~/store/modules/general/actions";
import api from "~/services/api";

/* eslint-disable eqeqeq */
function RecDespUpdatee() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const { id } = useParams();
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" },
    recDesp: { value: "", error: "", message: "" },
    tipoItem: { value: "", error: "", message: "" },
    ContaContabilId: { value: "", error: "", message: "" },
    CentroCustoId: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/rec_desp/${id}`);
      const response2 = await api.get(`/contaContabil/`);
      const response3 = await api.get(`/centroCusto/`);
      setData2(response2.data);
      setData3(response3.data);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.EmpresaId },
        desc: { value: response.data.desc },
        recDesp: { value: response.data.recDesp },
        tipoItem: { value: response.data.tipoItem },
        ContaContabilId: { value: response.data.ContaContabilId },
        CentroCustoId: { value: response.data.CentroCustoId }
      }));

      setIsLoading(false);
    }
    loadData();
  }, [id]);

  const handleChange = (event, name, type) => {
    event.persist();
    const target = event.target.value;
    switch (type) {
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
  const recDespChange = value => {
    if (value === "Rec") {
      setValues(prevState => ({
        ...prevState,
        CentroCustoId: { value: 1 }
      }));
      document.getElementsByName("CentroCustoId")[0].disabled = true;
    }
    if (value === "Desp") {
      setValues(prevState => ({
        ...prevState,
        CentroCustoId: { value: "" }
      }));
      document.getElementsByName("CentroCustoId")[0].disabled = false;
    }
  };

  const checkRec = () => {
    if (values.recDesp.value === "Rec") {
      return true;
    }
  };

  const checkDesp = () => {
    if (values.recDesp.value === "Desp") {
      return true;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    var aux = Object.entries(values);
    const tamanho = aux.length;

    if (values.recDesp.value === "Desp" && values.CentroCustoId.value === "1") {
      setValues(prevState => ({
        ...prevState,
        CentroCustoId: {
          error: "has-danger",
          message: "Centros de custo de despesas não podem ser 0"
        }
      }));
      var validateCentCusto = false;
    } else {
      validateCentCusto = true;
    }

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

    if (valid && filled && validateCentCusto) {
      dispatch(
        RecDespUpdate(
          id,
          values.empresaId.value,
          values.desc.value,
          values.recDesp.value,
          values.tipoItem.value,
          values.ContaContabilId.value,
          values.CentroCustoId.value
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
                  <CardHeader>
                    <CardTitle tag="h4">Receita e Despesa</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <Label>Categoria</Label>
                          <FormGroup
                            check
                            className={`has-label ${values.recDesp.error}`}
                            onChangeCapture={e => recDespChange(e.target.value)}
                          >
                            <Label check>
                              <Input
                                checked={checkRec(values)}
                                name="rec/desp"
                                type="radio"
                                onChange={event =>
                                  handleChange(event, "recDesp", "text")
                                }
                                value="Rec"
                              />
                              Receita
                            </Label>
                            <Label check>
                              <Input
                                checked={checkDesp(values)}
                                name="rec/desp"
                                type="radio"
                                onChange={event =>
                                  handleChange(event, "recDesp", "text")
                                }
                                value="Desp"
                              />
                              Despesa
                            </Label>
                            {values.recDesp.error === "has-danger" ? (
                              <Label className="error">
                                {values.recDesp.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Tipo</Label>
                          <FormGroup
                            className={`has-label ${values.tipoItem.error}`}
                          >
                            <Input
                              name="tipoItem"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "tipoItem", "text")
                              }
                              value={values.tipoItem.value}
                            />
                            {values.tipoItem.error === "has-danger" ? (
                              <Label className="error">
                                {values.tipoItem.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Descrição</Label>
                          <FormGroup
                            className={`has-label ${values.desc.error}`}
                          >
                            <Input
                              name="license"
                              type="text"
                              onChange={event =>
                                handleChange(event, "desc", "text")
                              }
                              value={values.desc.value}
                            />
                            {values.desc.error === "has-danger" ? (
                              <Label className="error">
                                {values.desc.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Conta Contábil</Label>
                          <FormGroup
                            className={`has-label ${values.ContaContabilId.error}`}
                          >
                            <Input
                              name="ContaContabilId"
                              type="select"
                              onChange={event =>
                                handleChange(event, "ContaContabilId", "text")
                              }
                              value={values.ContaContabilId.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione a Conta Contábil{" "}
                              </option>
                              {data2.map(contContabil => (
                                <option
                                  key={contContabil.id}
                                  value={contContabil.id}
                                >
                                  {" "}
                                  {contContabil.cod} - {contContabil.desc}{" "}
                                </option>
                              ))}
                            </Input>{" "}
                            {values.ContaContabilId.error === "has-danger" ? (
                              <Label className="error">
                                {values.ContaContabilId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Centro de Custo</Label>
                          <FormGroup
                            className={`has-label ${values.CentroCustoId.error}`}
                          >
                            <Input
                              name="CentroCustoId"
                              type="select"
                              onChange={event =>
                                handleChange(event, "CentroCustoId", "text")
                              }
                              value={values.CentroCustoId.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o Centro de Custo{" "}
                              </option>
                              {data3.map(CentroCustoId => (
                                <option
                                  key={CentroCustoId.id}
                                  value={CentroCustoId.id}
                                >
                                  {" "}
                                  {CentroCustoId.cod} - {CentroCustoId.desc}{" "}
                                </option>
                              ))}
                            </Input>{" "}
                            {values.CentroCustoId.error === "has-danger" ? (
                              <Label className="error">
                                {values.CentroCustoId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Link to="/tabelas/aux/rec_desp">
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
export default RecDespUpdatee;
