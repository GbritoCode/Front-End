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
  Input,
  Label,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { condPgmtoRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import axios from "axios";
import { normalizeCnpj } from 'normalize.js'
import NotificationAlert from "react-notification-alert";
import { Link } from "react-router-dom";

export default function CondPgmtoCadastro() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cod: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" },
    diasPrazo: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
  const empresa = store.getState().auth.empresa;
  async function loadData() {
      const response = await axios(`http://localhost:5140/empresa/${empresa}`);
      setData(response.data);
      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response.data.id },
      }));
    }
    loadData();
  }, []);

  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const handleChange = (event, name, type) => {
    event.persist();
    let target = event.target.value;
    switch (type) {
      case "text":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: target },
        }));
        break
        default:
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
        valid = false
        break;
      }
    }
    for (let j = 0; j < tamanho; j++) {
      if (aux[j][1].value !== "") {
        var filled = true;
      } else {
        filled = false;
        setValues((prevState) => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" },
        }));
        break;
      }
    }

    if (valid && filled) {
      dispatch(condPgmtoRequest(values.empresaId.value, values.cod.value, values.desc.value, values.diasPrazo.value));
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
                <CardTitle tag="h4">Condição de Pagamento</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                <Label>Empresa</Label>
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
                      <Label className="error">
                        {values.empresaId.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                  <Row>
                    <Col md="4">
                    <Label>Código</Label>
                  <FormGroup className={`has-label ${values.cod.error}`}>
                    <Input
                      name="license"
                      type="text"
                      onChange={(event) => handleChange(event, "cod", "text")}
                      value={values.cod.value}
                    />
                    {values.cod.error === "has-danger" ? (
                      <Label className="error">{values.cod.message}</Label>
                    ) : null}
                  </FormGroup>
                    </Col>
                    <Col md="4">
                    <Label>Descrição</Label>
                  <FormGroup className={`has-label ${values.desc.error}`}>
                    <Input
                      name="license"
                      type="text"
                      onChange={(event) => handleChange(event, "desc", "text")}
                      value={values.desc.value}
                    />
                    {values.desc.error === "has-danger" ? (
                      <Label className="error">{values.desc.message}</Label>
                    ) : null}
                  </FormGroup>
                    </Col>
                    <Col md="4">
                    <Label>Dias de Prazo</Label>
                  <FormGroup className={`has-label ${values.diasPrazo.error}`}>
                    <Input
                      name="diasPrazo"
                      type="text"
                      onChange={(event) =>
                        handleChange(event, "diasPrazo", "text")
                      }
                      value={values.diasPrazo.value}
                    />{" "}
                    {values.diasPrazo.error === "has-danger" ? (
                      <Label className="error">{values.diasPrazo.message}</Label>
                    ) : null}
                  </FormGroup>
                    </Col>
                  </Row>
                  <Link to={`/tabelas/aux/condPgmto`}>
                    <Button
                      style={{
                        paddingLeft: 32,
                        paddingRight: 33,
                      }}
                      color="secundary"
                      size="small"
                      className="text-left"
                    >
                      <i
                        className="tim-icons icon-double-left"
                        style={{
                          paddingBottom: 4,
                          paddingRight: 1,
                        }}
                        size="large"
                      />{" "}
                      Voltar
                    </Button>
                  </Link>
                  <Button
                    style={{
                      paddingLeft: 29,
                      paddingRight: 30,
                    }}
                    className="form"
                    color="info"
                    type="submit"
                  >
                    Enviar{" "}
                    <i className="tim-icons icon-send"
                      style={{
                        paddingBottom: 4,
                        paddingLeft: 3,
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
