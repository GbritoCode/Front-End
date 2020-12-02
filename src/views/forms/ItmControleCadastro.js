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
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { itmControleRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { Link } from "react-router-dom";

export default function ItmControleCadastro() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const empresa = store.getState().auth.empresa;
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    descItem: { value: "", error: "", message: "" },
    tipoItem: { value: "", error: "", message: "" },
    contaContabil: { value: "", error: "", message: "" },
    centCusto: { value: "", error: "", message: "" },
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

  const normalizeInput = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, "");
    const cvLength = currentValue.length;

    if (cvLength < 3) return currentValue;
    if (cvLength < 6)
      return `${currentValue.slice(0, 2)}.${currentValue.slice(2)}`;
    if (cvLength < 9)
      return `${currentValue.slice(0, 2)}.${currentValue.slice(
        2,
        5
      )}.${currentValue.slice(5)}`;
    if (cvLength < 13)
      return `${currentValue.slice(0, 2)}.${currentValue.slice(
        2,
        5
      )}.${currentValue.slice(5, 8)}/${currentValue.slice(8)}`;
    return `${currentValue.slice(0, 2)}.${currentValue.slice(
      2,
      5
    )}.${currentValue.slice(5, 8)}/${currentValue.slice(
      8,
      12
    )}-${currentValue.slice(12, 14)}`;
  };

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
      dispatch(
        itmControleRequest(
          values.empresaId.value,
          values.descItem.value,
          values.tipoItem.value,
          values.contaContabil.value,
          values.centCusto.value
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
                <CardTitle tag="h4">Item Controle</CardTitle>
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
                        {data.nome} - {normalizeInput(data.idFederal)}
                      </option>
                    </Input>
                    {values.empresaId.error === "has-danger" ? (
                      <label className="error">
                        {values.empresaId.message}
                      </label>
                    ) : null}
                  </FormGroup>
                  <label>Descrição do Item</label>
                  <FormGroup className={`has-label ${values.descItem.error}`}>
                    <Input
                      name="descItem"
                      type="text"
                      onChange={(event) =>
                        handleChange(event, "descItem", "text")
                      }
                      value={values.descItem.value}
                    />
                    {values.descItem.error === "has-danger" ? (
                      <label className="error">{values.descItem.message}</label>
                    ) : null}
                  </FormGroup>
                  <label>Tipo de Item</label>
                  <FormGroup className={`has-label ${values.tipoItem.error}`}>
                    <Input
                      name="tipoItem"
                      type="numeric"
                      onChange={(event) =>
                        handleChange(event, "tipoItem", "text")
                      }
                      value={values.tipoItem.value}
                    />
                    {values.tipoItem.error === "has-danger" ? (
                      <label className="error">{values.tipoItem.message}</label>
                    ) : null}
                  </FormGroup>
                  <label>Conta Contábil</label>
                  <FormGroup
                    className={`has-label ${values.contaContabil.error}`}
                  >
                    <Input
                      name="contaContabil"
                      type="numeric"
                      onChange={(event) =>
                        handleChange(event, "contaContabil", "text")
                      }
                      value={values.contaContabil.value}
                    />
                    {values.contaContabil.error === "has-danger" ? (
                      <label className="error">
                        {values.contaContabil.message}
                      </label>
                    ) : null}
                  </FormGroup>
                  <label>Centro de Custo</label>
                  <FormGroup className={`has-label ${values.centCusto.error}`}>
                    <Input
                      name="centCusto"
                      type="numeric"
                      onChange={(event) =>
                        handleChange(event, "centCusto", "text")
                      }
                      value={values.centCusto.value}
                    />
                    {values.centCusto.error === "has-danger" ? (
                      <label className="error">
                        {values.centCusto.message}
                      </label>
                    ) : null}
                  </FormGroup>
                  <Link to={`/tabelas/general/itm_controle`}>
                    <Button
                      style={{
                        paddingLeft: 32,
                        paddingRight: 33,
                      }}
                      color="secundary"
                      size="small"
                      className="form"
                    >
                      <i className="tim-icons icon-double-left"
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
