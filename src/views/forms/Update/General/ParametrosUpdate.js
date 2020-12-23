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
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { normalizeCnpj, normalizeCurrency } from "~/normalize";
import { ParametrosUpdate } from "~/store/modules/general/actions";
import api from "~/services/api";

function ParametrosUpdatee() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    impostos: { value: "", error: "", message: "" },
    vlrMinHr: { value: "", error: "", message: "" },
    vlrBsHr: { value: "", error: "", message: "" },
    vlrBsDesp: { value: "", error: "", message: "" },
    adiantaPgmto: { value: "", error: "", message: "" },
    percAdiantaPgmto: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/parametros/${id}`);

      setData(response.data);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.EmpresaId },
        impostos: {
          value: normalizeCurrency(JSON.stringify(response.data.impostos))
        },
        vlrMinHr: {
          value: normalizeCurrency(JSON.stringify(response.data.vlrMinHr))
        },
        vlrBsHr: {
          value: normalizeCurrency(JSON.stringify(response.data.vlrBsHr))
        },
        vlrBsDesp: {
          value: normalizeCurrency(JSON.stringify(response.data.vlrBsDesp))
        },
        adiantaPgmto: { value: response.data.adiantaPgmto },
        percAdiantaPgmto: { value: response.data.percAdiantaPgmto }
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
      var impostosdb = values.impostos.value.replace(/[^\d]+/g, "");
      var vlrMinHrdb = values.vlrMinHr.value.replace(/[^\d]+/g, "");
      var vlrBsHrdb = values.vlrBsHr.value.replace(/[^\d]+/g, "");
      var vlrBsDespdb = values.vlrBsDesp.value.replace(/[^\d]+/g, "");

      dispatch(
        ParametrosUpdate(
          id,
          values.empresaId.value,
          impostosdb,
          vlrMinHrdb,
          vlrBsHrdb,
          vlrBsDespdb,
          values.adiantaPgmto.value,
          values.percAdiantaPgmto.value
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
                    <CardTitle tag="h4">Edição de Parâmetros</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Label>Empresa</Label>
                      <FormGroup
                        className={`has-label ${values.empresaId.error}`}
                      >
                        <Input
                          disabled
                          name="EmpresaId"
                          type="select"
                          onChange={event =>
                            handleChange(event, "empresaId", "text")
                          }
                          value={values.empresaId.value}
                        >
                          {" "}
                          <option value={1}>
                            {" "}
                            {data.nome} - {normalizeCnpj(data.idFederal)}
                          </option>
                        </Input>
                        {values.empresaId.error === "has-danger" ? (
                          <Label className="error">
                            {values.empresaId.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                      <Row>
                        <Col md="4">
                          {" "}
                          <Label>Impostos</Label>
                          <FormGroup
                            className={`has-label ${values.impostos.error}`}
                          >
                            <Input
                              name="impostos"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "impostos", "currency")
                              }
                              value={values.impostos.value}
                            />
                            {values.impostos.error === "has-danger" ? (
                              <Label className="error">
                                {values.impostos.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <Label>Valor Mínimo da Hora</Label>
                          <FormGroup
                            className={`has-label ${values.vlrMinHr.error}`}
                          >
                            <Input
                              name="vlrMinHr"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "vlrMinHr", "currency")
                              }
                              value={values.vlrMinHr.value}
                            />
                            {values.vlrMinHr.error === "has-danger" ? (
                              <Label className="error">
                                {values.vlrMinHr.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Valor Base Da Hora</Label>
                          <FormGroup
                            className={`has-label ${values.vlrBsHr.error}`}
                          >
                            <Input
                              name="vlrBsHr"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "vlrBsHr", "currency")
                              }
                              value={values.vlrBsHr.value}
                            />
                            {values.vlrBsHr.error === "has-danger" ? (
                              <Label className="error">
                                {values.vlrBsHr.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          {" "}
                          <Label>Valor Base da Despesa</Label>
                          <FormGroup
                            className={`has-label ${values.vlrBsDesp.error}`}
                          >
                            <Input
                              name="vlrBsDesp"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "vlrBsDesp", "currency")
                              }
                              value={values.vlrBsDesp.value}
                            />
                            {values.vlrBsDesp.error === "has-danger" ? (
                              <Label className="error">
                                {values.vlrBsDesp.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Adianta Pagamento</Label>
                          <FormGroup
                            className={`has-label ${values.adiantaPgmto.error}`}
                          >
                            <Input
                              name="adiantaPgmto"
                              type="text"
                              onChange={event =>
                                handleChange(event, "adiantaPgmto", "currency")
                              }
                              value={values.adiantaPgmto.value}
                            />
                            {values.adiantaPgmto.error === "has-danger" ? (
                              <Label className="error">
                                {values.adiantaPgmto.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <Label>Percentual do Adiantamento</Label>
                          <FormGroup
                            className={`has-label ${values.percAdiantaPgmto.error}`}
                          >
                            <Input
                              name="percAdiantaPgmto"
                              type="numeric"
                              onChange={event =>
                                handleChange(
                                  event,
                                  "percAdiantaPgmto",
                                  "number"
                                )
                              }
                              value={values.percAdiantaPgmto.value}
                            />
                            {values.percAdiantaPgmto.error === "has-danger" ? (
                              <Label className="error">
                                {values.percAdiantaPgmto.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Link to="/tabelas/general/parametros">
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
export default ParametrosUpdatee;
