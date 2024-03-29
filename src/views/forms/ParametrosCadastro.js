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
  Label,
  Form,
  Input,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { Link } from "react-router-dom";
import { normalizeCurrency } from "~/normalize";
import { store } from "~/store";
import { parametrosRequest } from "~/store/modules/general/actions";
import api from "~/services/api";

export default function ParametrosCadastro() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    IRPJ: { value: "", error: "", message: "" },
    CSLL: { value: "", error: "", message: "" },
    COFINS: { value: "", error: "", message: "" },
    PIS: { value: "", error: "", message: "" },
    INSS: { value: "", error: "", message: "" },
    ISS: { value: "", error: "", message: "" },
    PSProLabor: { value: "", error: "", message: "" },
    IRRFProLabor: { value: "", error: "", message: "" },
    vlrMinHr: { value: "", error: "", message: "" },
    vlrBsHr: { value: "", error: "", message: "" },
    vlrBsDesp: { value: "", error: "", message: "" },
    adiantaPgmto: { value: "", error: "", message: "" },
    percAdiantaPgmto: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      const response = await api.get(`/empresa/${empresa}`);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id }
      }));
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
      var vlrMinHrdb = values.vlrMinHr.value.replace(/[^\d]+/g, "");
      var vlrBsHrdb = values.vlrBsHr.value.replace(/[^\d]+/g, "");
      var vlrBsDespdb = values.vlrBsDesp.value.replace(/[^\d]+/g, "");
      var IRPJdb = values.IRPJ.value.replace(/[^\d]+/g, "");
      var CSLLdb = values.CSLL.value.replace(/[^\d]+/g, "");
      var COFINSdb = values.COFINS.value.replace(/[^\d]+/g, "");
      var PISSdb = values.PIS.value.replace(/[^\d]+/g, "");
      var INSSdb = values.INSS.value.replace(/[^\d]+/g, "");
      var ISSdb = values.ISS.value.replace(/[^\d]+/g, "");
      var PSProLabordb = values.PSProLabor.value.replace(/[^\d]+/g, "");
      var IRRFProLabordb = values.IRRFProLabor.value.replace(/[^\d]+/g, "");

      dispatch(
        parametrosRequest(
          values.empresaId.value,
          IRPJdb,
          CSLLdb,
          COFINSdb,
          PISSdb,
          INSSdb,
          ISSdb,
          PSProLabordb,
          IRRFProLabordb,
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
      <div className="rna-container">
        <NotificationAlert ref={notifyElment} />
      </div>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Parâmetros</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="4">
                      {" "}
                      <Label>IRPJ</Label>
                      <FormGroup className={`has-label ${values.IRPJ.error}`}>
                        <Input
                          name="IRPJ"
                          type="numeric"
                          onChange={event =>
                            handleChange(event, "IRPJ", "currency")
                          }
                          value={values.IRPJ.value}
                        />
                        {values.IRPJ.error === "has-danger" ? (
                          <Label className="error">{values.IRPJ.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {" "}
                      <Label>CSLL</Label>
                      <FormGroup className={`has-label ${values.CSLL.error}`}>
                        <Input
                          name="CSLL"
                          type="numeric"
                          onChange={event =>
                            handleChange(event, "CSLL", "currency")
                          }
                          value={values.CSLL.value}
                        />
                        {values.CSLL.error === "has-danger" ? (
                          <Label className="error">{values.CSLL.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {" "}
                      <Label>COFINS</Label>
                      <FormGroup className={`has-label ${values.COFINS.error}`}>
                        <Input
                          name="COFINS"
                          type="numeric"
                          onChange={event =>
                            handleChange(event, "COFINS", "currency")
                          }
                          value={values.COFINS.value}
                        />
                        {values.COFINS.error === "has-danger" ? (
                          <Label className="error">
                            {values.COFINS.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      {" "}
                      <Label>PIS</Label>
                      <FormGroup className={`has-label ${values.PIS.error}`}>
                        <Input
                          name="PIS"
                          type="numeric"
                          onChange={event =>
                            handleChange(event, "PIS", "currency")
                          }
                          value={values.PIS.value}
                        />
                        {values.PIS.error === "has-danger" ? (
                          <Label className="error">{values.PIS.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {" "}
                      <Label>INSS</Label>
                      <FormGroup className={`has-label ${values.INSS.error}`}>
                        <Input
                          name="INSS"
                          type="numeric"
                          onChange={event =>
                            handleChange(event, "INSS", "currency")
                          }
                          value={values.INSS.value}
                        />
                        {values.INSS.error === "has-danger" ? (
                          <Label className="error">{values.INSS.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {" "}
                      <Label>ISS</Label>
                      <FormGroup className={`has-label ${values.ISS.error}`}>
                        <Input
                          name="ISS"
                          type="numeric"
                          onChange={event =>
                            handleChange(event, "ISS", "currency")
                          }
                          value={values.ISS.value}
                        />
                        {values.ISS.error === "has-danger" ? (
                          <Label className="error">{values.ISS.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      {" "}
                      <Label>PSocial</Label>
                      <FormGroup
                        className={`has-label ${values.PSProLabor.error}`}
                      >
                        <Input
                          name="PSProLabor"
                          type="numeric"
                          onChange={event =>
                            handleChange(event, "PSProLabor", "currency")
                          }
                          value={values.PSProLabor.value}
                        />
                        {values.PSProLabor.error === "has-danger" ? (
                          <Label className="error">
                            {values.PSProLabor.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {" "}
                      <Label>IRRFSócios</Label>
                      <FormGroup
                        className={`has-label ${values.IRRFProLabor.error}`}
                      >
                        <Input
                          name="IRRFProLabor"
                          type="numeric"
                          onChange={event =>
                            handleChange(event, "IRRFProLabor", "currency")
                          }
                          value={values.IRRFProLabor.value}
                        />
                        {values.IRRFProLabor.error === "has-danger" ? (
                          <Label className="error">
                            {values.IRRFProLabor.message}
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
                  </Row>
                  <Row>
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
                      <Label>Adianta Pagamemto</Label>
                      <FormGroup
                        check
                        className={`has-label ${values.adiantaPgmto.error}`}
                      >
                        <Label check>
                          <Input
                            name="adiantaPgmto"
                            type="radio"
                            onChange={event =>
                              handleChange(event, "adiantaPgmto", "text")
                            }
                            value="Sim"
                          />
                          Sim
                        </Label>
                        <Label check>
                          <Input
                            name="adiantaPgmto"
                            type="radio"
                            onChange={event =>
                              handleChange(event, "adiantaPgmto", "text")
                            }
                            value="Não"
                          />
                          Não
                        </Label>
                        {values.adiantaPgmto.error === "has-danger" ? (
                          <Label className="error">
                            {values.adiantaPgmto.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
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
                            handleChange(event, "percAdiantaPgmto", "number")
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
                  <Link to="/tabelas/general/parametros">
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
