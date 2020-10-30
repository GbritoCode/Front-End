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
import React, { useRef, Fragment, useEffect, useState } from "react";

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
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { RepresentanteUpdate } from "~/store/modules/general/actions";
import { useParams, Link } from "react-router-dom";
import { normalizeCnpj, normalizeCurrency } from "normalize";
import NotificationAlert from "react-notification-alert";
import axios from "axios";

function RepresentanteUpdatee() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState([]);
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    nome: { value: "", error: "", message: "" },
    tipoComiss: { value: "", error: "", message: "" },
    vlrFixMens: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:51314/representante/${id}`);
      const response1 = await axios(
        `http://localhost:51314/empresa/${response.data.EmpresaId}`
      );
      const response2 = await axios(`http://localhost:51314/tipoComiss/`);
      setData(response.data);
      setData1(response1.data);
      setData2(response2.data);
      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response.data.EmpresaId },
      }));
      setValues((prevState) => ({
        ...prevState,
        nome: { value: response.data.nome },
      }));
      setValues((prevState) => ({
        ...prevState,
        tipoComiss: { value: response.data.tipoComiss },
      }));
      setValues((prevState) => ({
        ...prevState,
        vlrFixMens: { value: normalizeCurrency(JSON.stringify(response.data.vlrFixMens)) },
      }));

      setIsLoading(false);
    }
    loadData();
  }, []);

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
      var vlrFixMensdb = values.vlrFixMens.value.replace(/[^\d]+/g, "");

      dispatch(
        RepresentanteUpdate(
          id,
          values.empresaId.value,
          values.nome.value,
          values.tipoComiss.value,
          vlrFixMensdb
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
    <Fragment>
      {isLoading ? (
        <div></div>
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
                    <CardTitle tag="h4">Edição de Representante</CardTitle>
                    <Link to="/cadastro/geral/area">
                      <Button
                        style={{
                          float: "right",
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        color="info"
                        size="small"
                        className="text-center"
                      >
                        <i
                          className="tim-icons icon-simple-add"
                          style={{
                            paddingBottom: 4,
                            paddingRight: 10,
                          }}
                          size="large"
                        />{" "}
                        Novo
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <label>Empresa</label>
                      <FormGroup
                        className={`has-label ${values.empresaId.error}`}
                      >
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
                            {data1.nome} - {normalizeCnpj(data1.idFederal)}
                          </option>
                        </Input>
                        {values.empresaId.error === "has-danger" ? (
                          <label className="error">
                            {values.empresaId.message}
                          </label>
                        ) : null}
                      </FormGroup>

                      <label>Nome</label>
                      <FormGroup className={`has-label ${values.nome.error}`}>
                        <Input
                          name="nome"
                          type="text"
                          onChange={(event) =>
                            handleChange(event, "nome", "text")
                          }
                          value={values.nome.value}
                        />{" "}
                        {values.nome.error === "has-danger" ? (
                          <label className="error">{values.nome.message}</label>
                        ) : null}
                      </FormGroup>
                      <Row>
                        <Col md="6">
                          {" "}
                          <label>Tipo Comissão</label>
                      <FormGroup
                        className={`has-label ${values.tipoComiss.error}`}
                      >
                        <Input
                          name="tipoComiss"
                          type="select"
                          onChange={(event) =>
                            handleChange(event, "tipoComiss", "text")
                          }
                          value={values.tipoComiss.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o tipo de comissão{" "}
                          </option>
                          {data2.map((tipoComiss) => (
                            <option value={tipoComiss.id}>
                              {" "}
                              {tipoComiss.id} - {tipoComiss.desc}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.tipoComiss.error === "has-danger" ? (
                          <label className="error">
                            {values.tipoComiss.message}
                          </label>
                        ) : null}
                      </FormGroup>
                        </Col>
                        <Col md="6">
                          {" "}
                          <label>Valor Fixo Mensal</label>
                          <FormGroup
                            className={`has-label ${values.vlrFixMens.error}`}
                          >
                            <Input
                              name="vlrFixMens"
                              type="numeric"
                              onChange={(event) =>
                                handleChange(event, "vlrFixMens", "currency")
                              }
                              value={values.vlrFixMens.value}
                            />{" "}
                            {values.vlrFixMens.error === "has-danger" ? (
                              <label className="error">
                                {values.vlrFixMens.message}
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
      )}
    </Fragment>
  );
}
export default RepresentanteUpdatee;
