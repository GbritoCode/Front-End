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
  Label,
  Input,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { Link, useParams } from "react-router-dom";
import { differenceInMinutes, subHours, subMinutes } from "date-fns";
import { normalizeCurrency } from "~/normalize";
import { store } from "~/store";
import { recursoReqest } from "~/store/modules/oportunidades/actions";
import api from "~/services/api";

export default function HorasCadastro() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { id } = useParams();
  const dispatch = useDispatch();
  const [data1, setData1] = useState({});
  const [date, month, year] = new Date().toLocaleDateString("pt-BR").split("/");

  const stateSchema = {
    oportunidadeId: { value: "", error: "", message: "" },
    oportunidadeCod: { value: "", error: "", message: "" },
    oportunidadeDesc: { value: "", error: "", message: "" },
    Cliente: { value: "", error: "", message: "" },
    dataInclusao: {
      value: `${year}-${month}-${date}`,
      error: "",
      message: ""
    },
    horaInic: { value: "", error: "", message: "" },
    horaIntrv: { value: "01:00", error: "", message: "" },
    horaFim: { value: "", error: "", message: "" },
    dataLancamento: { value: "", error: "", message: "" },
    totalApont: { value: "", error: "", message: "" },
    totalAcum: { value: "", error: "", message: "" },
    solicitante: { value: "", error: "", message: "" },
    AreaId: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      const response = await axios(`http://localhost:51314/empresa/${empresa}`);
      const response1 = await axios(
        `http://localhost:51314/oportunidade/${id}`
      );
      const response3 = await api.get(`/cliente/${response1.data.ClienteId}`);
      setData1(response1.data);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id }
      }));
      setValues(prevState => ({
        ...prevState,
        oportunidadeCod: { value: response1.data.cod }
      }));
      setValues(prevState => ({
        ...prevState,
        oportunidadeDesc: { value: response1.data.desc }
      }));
      setValues(prevState => ({
        ...prevState,
        Cliente: { value: response3.data.nomeAbv }
      }));
    }
    loadData();
  }, [id]);

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

  const horasChange = (hrInic, hrFim, hrIntvrl) => {
    if (hrInic && hrFim && hrIntvrl) {
      const inicAux = hrInic.split(":");
      var inic = new Date();
      inic.setHours(inicAux[0]);
      inic.setMinutes(inicAux[1]);
      inic.setSeconds(0);
      const inicParsed = Date.parse(inic);

      const fimAux = hrFim.split(":");
      const intervalAux = hrIntvrl.split(":");
      var fim = new Date();
      fim.setHours(fimAux[0]);
      fim.setMinutes(fimAux[1]);
      fim.setSeconds(0);
      fim = subHours(fim, intervalAux[0]);
      fim = subMinutes(fim, intervalAux[1]);
      const fimParsed = Date.parse(fim);
      if (differenceInMinutes(fimParsed, inicParsed) > 0) {
        const apontBruto = differenceInMinutes(fimParsed, inicParsed);
        const apontHr = `0${Math.trunc(apontBruto / 60)}`.slice(-2);
        const apontMin = `0${Math.trunc(apontBruto % 60)}`.slice(-2);

        setValues(prevState => ({
          ...prevState,
          totalApont: { value: `${apontHr}:${apontMin}` }
        }));
      } else if (differenceInMinutes(fimParsed, inicParsed) < 0) {
        setValues(prevState => ({
          ...prevState,
          totalApont: {
            value: "",
            error: "has-danger",
            message:
              "A hora inicial não pode ser menor do que (Hora Final-Intervalo)"
          }
        }));
      } else if (differenceInMinutes(fimParsed, inicParsed) === 0) {
        setValues(prevState => ({
          ...prevState,
          totalApont: {
            value: "",
            error: "has-danger",
            message:
              "A hora inicial não pode ser igual à (Hora Final-Intervalo)"
          }
        }));
      }
    }
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
      var custoPrevdb = values.custoPrev.value.replace(/[.,]+/g, "");
      var colabVlrHrdb = values.colabVlrHr.value.replace(/[.,]+/g, "");
      dispatch(
        recursoReqest(
          values.oportunidadeCod.value,
          values.colabId.value,
          custoPrevdb,
          values.dataInclusao.value,
          values.hrsPrevst.value,
          colabVlrHrdb
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
                <CardTitle tag="h4">Recurso</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="4">
                      <Label>Código Oportunidade</Label>
                      <FormGroup
                        className={`has-label ${values.oportunidadeCod.error}`}
                      >
                        <Input
                          disabled
                          name="oportunidadeCod"
                          onChange={event =>
                            handleChange(event, "oportunidadeCod", "text")
                          }
                          value={values.oportunidadeCod.value}
                          type="text"
                        />

                        {values.oportunidadeCod.error === "has-danger" ? (
                          <Label className="error">
                            {values.oportunidadeCod.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Descrição Oportunidade</Label>
                      <FormGroup
                        className={`has-label ${values.oportunidadeDesc.error}`}
                      >
                        <Input
                          disabled
                          name="oportunidadeDesc"
                          onChange={event =>
                            handleChange(event, "oportunidadeDesc", "text")
                          }
                          value={values.oportunidadeDesc.value}
                          type="text"
                        />

                        {values.oportunidadeDesc.error === "has-danger" ? (
                          <Label className="error">
                            {values.oportunidadeDesc.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Cliente</Label>
                      <FormGroup
                        className={`has-label ${values.Cliente.error}`}
                      >
                        <Input
                          disabled
                          name="Cliente"
                          type="text"
                          onChange={event => {
                            handleChange(event, "Cliente", "text");
                          }}
                          value={values.Cliente.value}
                        />
                        {values.Cliente.error === "has-danger" ? (
                          <Label className="error">
                            {values.Cliente.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <Label>Hora Inicial</Label>
                      <FormGroup
                        className={`has-label ${values.horaInic.error}`}
                      >
                        <Input
                          type="time"
                          name="horaInic"
                          placeholder="time placeholder"
                          onChange={event => {
                            handleChange(event, "horaInic", "text");
                            horasChange(
                              document.getElementsByName("horaInic")[0].value,
                              document.getElementsByName("horaFim")[0].value,
                              document.getElementsByName("horaIntrv")[0].value
                            );
                          }}
                        />
                        {values.horaInic.error === "has-danger" ? (
                          <Label className="error">
                            {values.horaInic.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Hora Final</Label>
                      <FormGroup
                        className={`has-label ${values.horaFim.error}`}
                      >
                        <Input
                          type="time"
                          name="horaFim"
                          placeholder="time placeholder"
                          onChange={event => {
                            handleChange(event, "horaFim", "text");
                            horasChange(
                              document.getElementsByName("horaInic")[0].value,
                              document.getElementsByName("horaFim")[0].value,
                              document.getElementsByName("horaIntrv")[0].value
                            );
                          }}
                        />
                        {values.horaFim.error === "has-danger" ? (
                          <Label className="error">
                            {values.horaFim.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Intervalo</Label>
                      <FormGroup
                        className={`has-label ${values.horaIntrv.error}`}
                      >
                        <Input
                          type="time"
                          name="horaIntrv"
                          placeholder="time placeholder"
                          onChange={event => {
                            handleChange(event, "horaIntrv", "text");
                            horasChange(
                              document.getElementsByName("horaInic")[0].value,
                              document.getElementsByName("horaFim")[0].value,
                              document.getElementsByName("horaIntrv")[0].value
                            );
                          }}
                          value={values.horaIntrv.value}
                        />
                        {values.horaIntrv.error === "has-danger" ? (
                          <Label className="error">
                            {values.horaIntrv.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <Label>Data da Atividade</Label>
                      <FormGroup
                        className={`has-label ${values.dataLancamento.error}`}
                      >
                        <Input
                          name="dataLancamento"
                          type="date"
                          onChange={event =>
                            handleChange(event, "dataLancamento", "text")
                          }
                          value={values.dataLancamento.value}
                        />
                        {values.dataLancamento.error === "has-danger" ? (
                          <Label className="error">
                            {values.dataLancamento.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Horas Apontadas</Label>
                      <FormGroup
                        className={`has-label ${values.totalApont.error}`}
                      >
                        <Input
                          disabled
                          type="time"
                          name="totalApont"
                          placeholder="time placeholder"
                          onChange={event =>
                            handleChange(event, "totalApont", "text")
                          }
                          value={values.totalApont.value}
                        />
                        {values.totalApont.error === "has-danger" ? (
                          <Label className="error">
                            {values.totalApont.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Total Acumulado</Label>
                      <FormGroup
                        className={`has-label ${values.totalAcum.error}`}
                      >
                        <Input
                          disabled
                          type="time"
                          name="totalAcum"
                          placeholder="time placeholder"
                          onChange={event =>
                            handleChange(event, "totalAcum", "text")
                          }
                          value={values.totalAcum.value}
                        />
                        {values.totalAcum.error === "has-danger" ? (
                          <Label className="error">
                            {values.totalAcum.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Link to={`/tabelas/oportunidade/recurso/${data1.id}`}>
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
