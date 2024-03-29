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
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { Link } from "react-router-dom";
import { store } from "~/store";
import { prodtRequest } from "~/store/modules/general/actions";
import api from "~/services/api";

export default function ProdtCadastro() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    descProdt: { value: "", error: "", message: "" },
    id: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      let id = 1;
      const response = await api.get(`/empresa/${empresa}`);
      const response1 = await api.get(`/prodt/`);
      if (response1.data.length !== 0) {
        id = response1.data[response1.data.length - 1].id + 1;
      } else {
        id = 1;
      }
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id },
        id: { value: id }
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
      dispatch(prodtRequest(values.empresaId.value, values.descProdt.value));
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
                <CardTitle tag="h4">Produto</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="4">
                      <Label>Código</Label>
                      <FormGroup className={`has-label ${values.id.error}`}>
                        <Input
                          disabled
                          name="id"
                          type="text"
                          onChange={event => handleChange(event, "id", "text")}
                          value={values.id.value}
                        />{" "}
                        {values.id.error === "has-danger" ? (
                          <Label className="error">{values.id.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Descrição do Produto</Label>
                      <FormGroup
                        className={`has-label ${values.descProdt.error}`}
                      >
                        <Input
                          name="descProdt"
                          type="text"
                          onChange={event =>
                            handleChange(event, "descProdt", "text")
                          }
                          value={values.descProdt.value}
                        />
                        {values.descProdt.error === "has-danger" ? (
                          <Label className="error">
                            {values.descProdt.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Link to="/tabelas/general/prodt">
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
  );
}
