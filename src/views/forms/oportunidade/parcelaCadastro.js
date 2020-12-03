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
import { parcelaReqest } from "~/store/modules/oportunidades/actions";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { normalizeCurrency} from "normalize";
import { useParams, Link } from "react-router-dom";

export default function ParcelaCadastro() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { id } = useParams()
  const dispatch = useDispatch();
  const [data1, setData1] = useState({});
  const stateSchema = {
    oportunidadeId: { value: "", error: "", message: "" },
    parcela: { value: "", error: "", message: "" },
    vlrParcela: { value: "", error: "", message: "" },
  };

  const [values, setValues] = useState(stateSchema);
  useEffect(() => {
    async function loadData() {
      const response1 = await axios(`http://localhost:51314/oportunidade/${id}`);
      setData1(response1.data);

      setValues((prevState) => ({
        ...prevState,
        oportunidadeId: { value: response1.data.id },
      }));
    }
    loadData();
  }, [id]);


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
      case "optional":

        break
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
        filled = false
        setValues((prevState) => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" },
        }));
        break;
      }
    }

    if (valid && filled) {
      var vlrParceladb = values.vlrParcela.value.replace(/[.,]+/g, "");

      dispatch(
        parcelaReqest(
          values.oportunidadeId.value,
          values.parcela.value,
          vlrParceladb,
        ));

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
                <CardTitle tag="h4">Parcela</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                <Label>Oportunidade</Label>
                  <FormGroup className={`has-label ${values.oportunidadeId.error}`}>
                    <Input
                      disabled
                      name="oportunidadeId"
                      onChange={(event) =>
                        handleChange(event, "oportunidadeId", "text")
                      }
                      value={values.oportunidadeId.value}
                      type="select"
                    >
                      <option disabled value="">
                        {" "}
                        Selecione a Oportunidade{" "}
                      </option>{" "}
                      <option value={data1.id}>
                        {" "}
                        {data1.desc}
                      </option>
                    </Input>

                    {values.oportunidadeId.error === "has-danger" ? (
                      <Label className="error">{values.oportunidadeId.message}</Label>
                    ) : null}
                  </FormGroup>
                  <Row>
                    <Col md="4">
                      {" "}
                      <Label>Parcela</Label>
                      <FormGroup
                        className={`has-label ${values.parcela.error}`}
                      >
                        <Input
                          name="parcela"
                          type="text"
                          onChange={(event) =>
                            handleChange(event, "parcela", "number")
                          }
                          value={values.parcela.value}
                        />
                        {values.parcela.error === "has-danger" ? (
                          <Label className="error">
                            {values.parcela.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {" "}
                      <Label>Valor da Parcela</Label>
                      <FormGroup
                        className={`has-label ${values.vlrParcela.error}`}
                      >
                        <Input
                          name="vlrParcela"
                          type="text"
                          onChange={(event) =>
                            handleChange(event, "vlrParcela", "currency")
                          }
                          value={values.vlrParcela.value}
                        />

                        {values.vlrParcela.error === "has-danger" ? (
                          <Label className="error">
                            {values.vlrParcela.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Link to={`/tabelas/oportunidade/oport`}>
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
