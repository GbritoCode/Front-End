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
import { itmControleUpdate } from "~/store/modules/general/actions";
import api from "~/services/api";

function ItmCtrlUpdatee() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data1, setData1] = useState({});
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    descItem: { value: "", error: "", message: "" },
    tipoItem: { value: "", error: "", message: "" },
    contaContabil: { value: "", error: "", message: "" },
    centCusto: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await api.get(`/itm_controle/${id}`);
      const response1 = await api.get(`/empresa/${response.data.EmpresaId}`);
      setData1(response1.data);
      setValues(prevState => ({
        ...prevState,
        descItem: { value: response.data.descItem },
        tipoItem: { value: response.data.tipoItem },
        contaContabil: { value: response.data.contaContabil },
        centCusto: { value: response.data.centCusto },
        empresaId: { value: response.data.EmpresaId }
      }));

      setIsLoading(false);
    }
    loadData();
  }, [id]);

  const normalizeInput = value => {
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
      dispatch(
        itmControleUpdate(
          id,
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
                    <CardTitle tag="h4">Edição de Item Controle</CardTitle>
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
                            {data1.nome} - {normalizeInput(data1.idFederal)}
                          </option>
                        </Input>
                        {values.empresaId.error === "has-danger" ? (
                          <Label className="error">
                            {values.empresaId.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                      <Label>Descrição do Item</Label>
                      <FormGroup
                        className={`has-label ${values.descItem.error}`}
                      >
                        <Input
                          name="descItem"
                          type="text"
                          onChange={event =>
                            handleChange(event, "descItem", "text")
                          }
                          value={values.descItem.value}
                        />
                        {values.descItem.error === "has-danger" ? (
                          <Label className="error">
                            {values.descItem.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                      <Label>Tipo de Item</Label>
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
                      <Label>Conta Contábil</Label>
                      <FormGroup
                        className={`has-label ${values.contaContabil.error}`}
                      >
                        <Input
                          name="contaContabil"
                          type="numeric"
                          onChange={event =>
                            handleChange(event, "contaContabil", "text")
                          }
                          value={values.contaContabil.value}
                        />
                        {values.contaContabil.error === "has-danger" ? (
                          <Label className="error">
                            {values.contaContabil.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                      <Label>Centro de Custo</Label>
                      <FormGroup
                        className={`has-label ${values.centCusto.error}`}
                      >
                        <Input
                          name="centCusto"
                          type="numeric"
                          onChange={event =>
                            handleChange(event, "centCusto", "text")
                          }
                          value={values.centCusto.value}
                        />
                        {values.centCusto.error === "has-danger" ? (
                          <Label className="error">
                            {values.centCusto.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                      <Link to="/tabelas/general/itm_controle">
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
export default ItmCtrlUpdatee;
