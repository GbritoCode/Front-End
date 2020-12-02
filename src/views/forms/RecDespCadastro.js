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
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { recDespRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import axios from "axios";
import { normalizeCnpj } from 'normalize'
import NotificationAlert from "react-notification-alert";
import { Link } from 'react-router-dom'

export default function RecDespCadastro() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [data1, setData1] = useState([]);
  const empresa = store.getState().auth.empresa;
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    itmControleId: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" },
    recDesp: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:51314/empresa/${empresa}`);
      const response1 = await axios(`http://localhost:51314/itm_controle/`);
      setData(response.data);
      setData1(response1.data);
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

  const handleChange = (event, name, type) => {
    event.persist();
    let target = event.target.value;
    switch (type) {
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
      dispatch(recDespRequest(values.empresaId.value, values.itmControleId.value, values.desc.value, values.recDesp.value));
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
                <CardTitle tag="h4">Receita e Despesa</CardTitle>
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
                  <Label>Item Controle</Label>
                  <FormGroup
                    className={`has-label ${values.itmControleId.error}`}
                  >
                    <Input
                      name="itmControleId"
                      type="select"
                      onChange={(event) =>
                        handleChange(event, "itmControleId", "text")
                      }
                      value={values.itmControleId.value}
                    >
                      {" "}
                      <option disabled value="">
                        {" "}
                            Selecione o item controle{" "}
                      </option>
                      {data1.map((itm) => (
                        <option value={itm.id}>
                          {" "}
                          {itm.descItem} - {itm.tipoItem}{" "}
                        </option>
                      ))}
                    </Input>
                    {values.itmControleId.error === "has-danger" ? (
                      <label className="error">
                        {values.itmControleId.message}
                      </label>
                    ) : null}
                  </FormGroup>
                  <label>Descrição</label>
                  <FormGroup className={`has-label ${values.desc.error}`}>
                    <Input
                      name="license"
                      type="text"
                      onChange={(event) => handleChange(event, "desc", "text")}
                      value={values.desc.value}
                    />
                    {values.desc.error === "has-danger" ? (
                      <label className="error">{values.desc.message}</label>
                    ) : null}
                  </FormGroup>

                  <FormGroup style={{ marginBottom: 20 }} check className={`has-label ${values.recDesp.error}`}>
                    <Label check>
                      <Input
                        name="rec/desp"
                        type="radio"
                        onChange={(event) => handleChange(event, "recDesp", "text")}
                        value={"Rec"}
                      />
                    Receita
                    </Label>
                    <Label check>
                      <Input
                        name="rec/desp"
                        type="radio"
                        onChange={(event) => handleChange(event, "recDesp", "text")}
                        value={"Desp"}
                      />
                    Despesa
                    </Label>
                    {values.recDesp.error === "has-danger" ? (
                      <label className="error">{values.recDesp.message}</label>
                    ) : null}
                  </FormGroup>
                  <Link to={`/tabelas/aux/rec_desp`}>
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
