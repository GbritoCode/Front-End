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
import { tipoComissRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { normalizeCnpj, normalizeCurrency } from 'normalize.js'
import { Link } from "react-router-dom";

export default function TipoComissCadastro() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" },
    prcnt: { value: "", error: "", message: "" },
    bsComiss: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
  const empresa = store.getState().auth.empresa;
  async function loadData() {
      const response = await axios(`http://localhost:51314/empresa/${empresa}`);
      setData(response.data);
      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response.data.id },
      }));
    }
    loadData();
  }, []);

  const handleChange = (event, name, type) => {
    event.persist();
    let target = event.target.value;
    switch (type) {
      case "prcnt":
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
        break
        default:
      }
  };
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

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
        filled = false
        setValues((prevState) => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" },
        }));
        break;
      }
    }

    if (valid && filled) {
      var prcntdb = values.prcnt.value.replace(/[^\d]+/g, "");
      dispatch(tipoComissRequest(values.empresaId.value, values.desc.value, prcntdb, values.bsComiss.value));
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
                <CardTitle tag="h4">Tipo de Comissão</CardTitle>
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
                    <Col md='4'>
                    <label>Descrição</label>
                      <FormGroup className={`has-label ${values.desc.error}`}>
                        <Input
                          name="desc"
                          type="text"
                          onChange={(event) => handleChange(event, "desc", "text")}
                          value={values.desc.value}
                        />
                        {values.desc.error === "has-danger" ? (
                          <label className="error">{values.desc.message}</label>
                        ) : null}
                      </FormGroup>
                    </Col><Col md='4'>

                    <label>Percentual</label>
                      <FormGroup className={`has-label ${values.prcnt.error}`}>
                        <Input
                          name="prcnt"
                          type="text"
                          onChange={(event) => handleChange(event, "prcnt", "prcnt")}
                          value={values.prcnt.value}
                        />
                        {values.prcnt.error === "has-danger" ? (
                          <label className="error">{values.prcnt.message}</label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md='4'>
                    <label>Base de Comissão</label>
                      <FormGroup className={`has-label ${values.bsComiss.error}`}>
                        <Input
                          name="bsComiss"
                          type="select"
                          onChange={(event) =>
                            handleChange(event, "bsComiss", "text")
                          }
                          value={values.bsComiss.value}
                        >
                          <option disabled value="">
                            {" "}
                                Selecione a Comissão{" "}
                          </option>
                          <option value="1">Lucro Líquido</option>
                          <option value="2">Lucro Bruto</option>
                          <option value="3">Total Projeto</option>
                          <option value="4">Fixado</option>
                        </Input>
                        {values.bsComiss.error === "has-danger" ? (
                          <label className="error">
                            {values.bsComiss.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Link to={`/tabelas/aux/tipoComiss`}>
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
