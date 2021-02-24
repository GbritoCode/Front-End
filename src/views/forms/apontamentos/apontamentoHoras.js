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
  Form,
  Label,
  Input,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { Link, useParams } from "react-router-dom";
import { differenceInMinutes, subHours, subMinutes } from "date-fns";
import { normalizeCurrency } from "~/normalize";
import { store } from "~/store";
import { horaRequest } from "~/store/modules/oportunidades/actions";
import api from "~/services/api";

export default function HorasCadastro() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { id } = useParams();
  const dispatch = useDispatch();
  const [data1, setData1] = useState({});
  const [data4, setData4] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, month, year] = new Date().toLocaleDateString("pt-BR").split("/");
  const optionalSchema = {
    totalApontDb: { value: 0, error: "", message: "" }
  };
  const stateSchema = {
    OportunidadeId: { value: "", error: "", message: "" },
    oportunidadeCod: { value: "", error: "", message: "" },
    oportunidadeDesc: { value: "", error: "", message: "" },
    Cliente: { value: "", error: "", message: "" },
    ColabId: { value: "", error: "", message: "" },
    dataAtivd: { value: `${year}-${month}-${date}`, error: "", message: "" },
    horaInic: { value: "", error: "", message: "" },
    horaIntrv: { value: "01:00", error: "", message: "" },
    horaFim: { value: "", error: "", message: "" },
    dataLancamento: {
      value: `${year}-${month}-${date}`,
      error: "",
      message: ""
    },
    totalApont: { value: "", error: "", message: "" },
    totalAcum: { value: "", error: "", message: "" },
    totalAcumTemp: { value: "", error: "", message: "" },
    solicitante: { value: "", error: "", message: "" },
    AreaId: { value: "", error: "", message: "" },
    RecursoId: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);

  useEffect(() => {
    const idColab = store.getState().auth.user.Colab.id;
    const { empresa } = store.getState().auth;
    async function loadData() {
      const response = await api.get(`/empresa/${empresa}`);
      const response1 = await api.get(`/oportunidade/${id}`);
      const response2 = await api.get(
        `/oportunidade/?idOport=${id}&colab=${idColab}`
      );
      const response3 = await api.get(`/cliente/${response1.data.ClienteId}`);
      const response4 = await api.get(`/area/`);
      const response5 = await api.get(`/colab/?idColab=${idColab}`);
      const response6 = await api.get(
        `/horas/${idColab}/?total=${true}&tipo=project&oport=${
          response1.data.id
        }`
      );
      setData4(response4.data);
      setData1(response1.data);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id },
        OportunidadeId: { value: response1.data.id },
        oportunidadeCod: { value: response1.data.cod },
        oportunidadeDesc: { value: response1.data.desc },
        AreaId: { value: response1.data.Segmento.AreaId },
        RecursoId: { value: response2.data.Recurso.id },
        Cliente: { value: response3.data.nomeAbv },
        ColabId: { value: response5.data.id },
        totalAcum: { value: response6.data },
        totalAcumTemp: { value: response6.data }
      }));
      setIsLoading(false);
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
    const acum = values.totalAcumTemp.value.split(":");
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
        const acumMin = `0${Math.trunc(
          (parseInt(acum[1], 10) + parseInt(apontMin, 10)) % 60
        )}`.slice(-2);
        const acumHr = `0${parseInt(acum[0], 10) +
          parseInt(apontHr, 10) +
          Math.trunc(
            (parseInt(acum[1], 10) + parseInt(apontMin, 10)) / 60
          )}`.slice(-2);

        // const acumMin = `0${Math.trunc(acum % 60)}`.slice(-2);

        setValues(prevState => ({
          ...prevState,
          totalApont: { value: `${apontHr}:${apontMin}` },
          totalAcum: { value: `${acumHr}:${acumMin}` }
        }));
        setOptional(prevState => ({
          ...prevState,
          totalApontDb: { value: apontBruto }
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
      dispatch(
        horaRequest(
          values.OportunidadeId.value,
          values.ColabId.value,
          values.dataAtivd.value,
          values.horaInic.value,
          values.horaIntrv.value,
          values.horaFim.value,
          values.dataLancamento.value,
          optional.totalApontDb.value,
          values.solicitante.value,
          values.AreaId.value,
          values.RecursoId.value,
          values.desc.value
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
        <>
          <div className="content" />
        </>
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
                    <h3 style={{ marginBottom: 0 }}>Horas</h3>
                    <p style={{ fontSize: 11 }}>
                      {data1.cod} | {data1.desc}
                    </p>
                    <p style={{ fontSize: 11 }}>{data1.Cliente.nomeAbv}</p>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <Label>Hora Inicial</Label>
                          <FormGroup
                            className={`has-label ${values.horaInic.error}`}
                          >
                            <Input
                              autoFocus
                              type="time"
                              name="horaInic"
                              placeholder="time placeholder"
                              onChange={event => {
                                handleChange(event, "horaInic", "text");
                                horasChange(
                                  document.getElementsByName("horaInic")[0]
                                    .value,
                                  document.getElementsByName("horaFim")[0]
                                    .value,
                                  document.getElementsByName("horaIntrv")[0]
                                    .value
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
                                  document.getElementsByName("horaInic")[0]
                                    .value,
                                  document.getElementsByName("horaFim")[0]
                                    .value,
                                  document.getElementsByName("horaIntrv")[0]
                                    .value
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
                                  document.getElementsByName("horaInic")[0]
                                    .value,
                                  document.getElementsByName("horaFim")[0]
                                    .value,
                                  document.getElementsByName("horaIntrv")[0]
                                    .value
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
                            className={`has-label ${values.dataAtivd.error}`}
                          >
                            <Input
                              name="dataAtivd"
                              type="date"
                              onChange={event =>
                                handleChange(event, "dataAtivd", "text")
                              }
                              value={values.dataAtivd.value}
                            />
                            {values.dataAtivd.error === "has-danger" ? (
                              <Label className="error">
                                {values.dataAtivd.message}
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
                              type="text"
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
                      <Row>
                        <Col md="4">
                          <Label>Área</Label>
                          <FormGroup
                            className={`has-label ${values.AreaId.error}`}
                          >
                            <Input
                              name="AreaId"
                              type="select"
                              onChange={event =>
                                handleChange(event, "AreaId", "text")
                              }
                              value={values.AreaId.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione a área{" "}
                              </option>
                              {data4.map(area => (
                                <option value={area.id}>
                                  {" "}
                                  {area.descArea}{" "}
                                </option>
                              ))}
                            </Input>{" "}
                            {values.AreaId.error === "has-danger" ? (
                              <Label className="error">
                                {values.AreaId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Solicitante</Label>
                          <FormGroup
                            className={`has-label ${values.solicitante.error}`}
                          >
                            <Input
                              type="text"
                              name="solicitante"
                              onChange={event =>
                                handleChange(event, "solicitante", "text")
                              }
                              value={values.solicitante.value}
                            />
                            {values.solicitante.error === "has-danger" ? (
                              <Label className="error">
                                {values.solicitante.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Label>Descrição</Label>
                          <FormGroup
                            className={`has-label ${values.desc.error}`}
                          >
                            <Input
                              type="textarea"
                              name="desc"
                              onChange={event =>
                                handleChange(event, "desc", "text")
                              }
                              value={values.desc.value}
                            />
                            {values.desc.error === "has-danger" ? (
                              <Label className="error">
                                {values.desc.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
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
                      <Link to="/tabelas/apontamentos/oportunidades/">
                        <Button
                          style={{
                            paddingLeft: 32,
                            paddingRight: 33,
                            float: "left"
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
