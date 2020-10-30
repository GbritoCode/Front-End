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
import Switch from "react-bootstrap-switch";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  Input,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { parametrosRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { normalizeCurrency, normalizeCnpj } from "normalize";

export default function ParametrosCadastro() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const empresa = store.getState().auth.empresa;
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    impostos: { value: "", error: "", message: "" },
    vlrMinHr: { value: "", error: "", message: "" },
    vlrBsHr: { value: "", error: "", message: "" },
    vlrBsDesp: { value: "", error: "", message: "" },
    adiantaPgmto: { value: "", error: "", message: "" },
    percAdiantaPgmto: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:51314/empresa/${empresa}`);
      setData(response.data);
      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response.data.id },
      }));
      setIsLoading(false);
    }
    loadData();
  }, []);

  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const handleChange = (event, name, type) => {
    event.persist();
    let target = event.target.value;
    switch (type) {
      case "number":
        if (verifyNumber(target)) {
          setValues((prevState) => ({
            ...prevState,
            [name]: { value: target, error: "has-success" },
          }));
        } else {
          setValues((prevState) => ({
            ...prevState,
            [name]: {
              value: target,
              error: "has-danger",
              message: "Insira um número válido",
            },
          }));
        }
        break;
      case "currency":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: normalizeCurrency(target) },
        }));
        break;
      case "text":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: target },
        }));
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    var aux = Object.entries(values);
    const tamanho = aux.length;

    for (let i = 0; i < tamanho; i++) {
      if (!(aux[i][1].error === "has-danger")) {
        var valid = true;
      } else {
        var valid = false;
        break;
      }
    }
    for (let j = 0; j < tamanho; j++) {
      if (aux[j][1].value !== "") {
        var filled = true;
      } else {
        var filled = false;
        setValues((prevState) => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" },
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
        parametrosRequest(
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
        autoDismiss: 7,
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
                  <label>Empresa</label>
                  <FormGroup className={`has-label ${values.empresaId.error}`}>
                    <Input
                      disabled={true}
                      name="EmpresaId"
                      type="select"
                      onChange={(event) =>
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
                      <label className="error">
                        {values.empresaId.message}
                      </label>
                    ) : null}
                  </FormGroup>
                  <Row>
                    <Col md="4">
                      {" "}
                      <label>Impostos</label>
                      <FormGroup
                        className={`has-label ${values.impostos.error}`}
                      >
                        <Input
                          name="impostos"
                          type="numeric"
                          onChange={(event) =>
                            handleChange(event, "impostos", "currency")
                          }
                          value={values.impostos.value}
                        />
                        {values.impostos.error === "has-danger" ? (
                          <label className="error">
                            {values.impostos.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {" "}
                      <label>Valor Mínimo da Hora</label>
                      <FormGroup
                        className={`has-label ${values.vlrMinHr.error}`}
                      >
                        <Input
                          name="vlrMinHr"
                          type="numeric"
                          onChange={(event) =>
                            handleChange(event, "vlrMinHr", "currency")
                          }
                          value={values.vlrMinHr.value}
                        />
                        {values.vlrMinHr.error === "has-danger" ? (
                          <label className="error">
                            {values.vlrMinHr.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <label>Valor Base Da Hora</label>
                      <FormGroup
                        className={`has-label ${values.vlrBsHr.error}`}
                      >
                        <Input
                          name="vlrBsHr"
                          type="numeric"
                          onChange={(event) =>
                            handleChange(event, "vlrBsHr", "currency")
                          }
                          value={values.vlrBsHr.value}
                        />
                        {values.vlrBsHr.error === "has-danger" ? (
                          <label className="error">
                            {values.vlrBsHr.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      {" "}
                      <label>Valor Base da Despesa</label>
                      <FormGroup
                        className={`has-label ${values.vlrBsDesp.error}`}
                      >
                        <Input
                          name="vlrBsDesp"
                          type="numeric"
                          onChange={(event) =>
                            handleChange(event, "vlrBsDesp", "currency")
                          }
                          value={values.vlrBsDesp.value}
                        />
                        {values.vlrBsDesp.error === "has-danger" ? (
                          <label className="error">
                            {values.vlrBsDesp.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <label>Adianta Pagamento</label>
                      <FormGroup
                        className={`has-label ${values.adiantaPgmto.error}`}
                      >
                        <Input
                          name="adiantaPgmto"
                          type="text"
                          onChange={(event) =>
                            handleChange(event, "adiantaPgmto", "text")
                          }
                          value={values.adiantaPgmto.value}
                        />
                        {values.adiantaPgmto.error === "has-danger" ? (
                          <label className="error">
                            {values.adiantaPgmto.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {" "}
                      <label>Percentual do Adiantamento</label>
                      <FormGroup
                        className={`has-label ${values.percAdiantaPgmto.error}`}
                      >
                        <Input
                          name="percAdiantaPgmto"
                          type="numeric"
                          onChange={(event) =>
                            handleChange(event, "percAdiantaPgmto", "number")
                          }
                          value={values.percAdiantaPgmto.value}
                        />
                        {values.percAdiantaPgmto.error === "has-danger" ? (
                          <label className="error">
                            {values.percAdiantaPgmto.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Button
                    style={{ marginTop: 35 }}
                    className="form"
                    color="info"
                    type="submit"
                  >
                    Enviar
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
