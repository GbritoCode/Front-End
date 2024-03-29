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
import {
  normalizeCalcCurrency,
  normalizeCurrency,
  normalizeCurrencyDb
} from "~/normalize";
import { store } from "~/store";
import { recursoUpdate } from "~/store/modules/oportunidades/actions";
import api from "~/services/api";

export default function RecursoCadastro() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [disabledField, setDisabledField] = useState();
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState([]);
  const [data4, setData4] = useState([]);
  const stateSchema = {
    OportunidadeId: { value: "", error: "", message: "" },
    ColabId: { value: "", error: "", message: "" },
    tipoValor: { value: "", error: "", message: "" },
    tipoAtend: { value: "", error: "", message: "" },
    custoPrev: { value: "", error: "", message: "" },
    dataInclusao: { value: "", error: "", message: "" },
    hrsPrevst: { value: "", error: "", message: "" },
    colabVlrHr: { value: "", error: "", message: "" }
  };
  const optionalSchema = {
    HorasTotais: { value: "", error: "", message: "" }
  };
  const [optional, setOptional] = useState(optionalSchema);
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      const response = await api.get(`/empresa/${empresa}`);
      const response1 = await api.get(`/recurso/aux/${id}`);
      const response2 = await api.get(`/colab/`);
      const response3 = await api.get(
        `/cotacao/${response1.data.OportunidadeId}`
      );
      const response4 = await api.get(
        `/oportunidade/${response1.data.OportunidadeId}`
      );
      setDisabledField(response4.data.fase >= 5);
      setData1(response1.data);
      setData2(response2.data);
      setData4(response4.data);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id },
        OportunidadeId: { value: response4.data.id },
        ColabId: { value: response1.data.ColabId },
        tipoValor: { value: response1.data.tipoValor },
        tipoAtend: { value: response1.data.tipoAtend },
        colabVlrHr: {
          value: normalizeCurrencyDb(JSON.stringify(response1.data.colabVlrHr))
        },
        dataInclusao: { value: response1.data.dataInclusao },
        hrsPrevst: { value: response1.data.hrsPrevst },
        custoPrev: {
          value: normalizeCurrencyDb(JSON.stringify(response1.data.custoPrev))
        }
      }));

      if (response3.data[0]) {
        setOptional(prevState => ({
          ...prevState,
          HorasTotais: { value: response3.data[0].hrsPrevst }
        }));
      } else {
        setOptional(prevState => ({
          ...prevState,
          HorasTotais: { value: 0 }
        }));
      }
      setIsLoading(false);
    }
    loadData();
  }, [id]);
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  function getColabHr(colab, tipoValor, tipoAtend) {
    if (colab && tipoValor && tipoAtend) {
      api
        .get(
          `/colab/comp/${colab}/?tipoValorBusca=${tipoValor}&tipoAtendBusca=${tipoAtend}`
        )
        .then(result => {
          if (result.data === null) {
            options = {
              place: "tr",
              message: (
                <div>
                  <div>
                    Ops! Parece que não há um complemento para esse colaborador,
                    casdastre um!
                  </div>
                </div>
              ),
              type: "danger",
              icon: "tim-icons icon-alert-circle-exc",
              autoDismiss: 7
            };
            notify();
          } else {
            setValues(prevState => ({
              ...prevState,
              colabVlrHr: {
                value: normalizeCurrency(result.data.valor)
              }
            }));
          }
        });
    }
  }

  function custoPrevst(hr, vlrHr) {
    const { value } = document.getElementsByName("colabVlrHr")[0];
    const vlrHrColab = value.replace(/[.,]+/g, "");

    const custo = hr * vlrHrColab;
    setValues(prevState => ({
      ...prevState,
      custoPrev: { value: normalizeCalcCurrency(JSON.stringify(custo)) }
    }));
  }

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
      var custoPrevdb =
        parseInt(values.custoPrev.value.replace(/[.,]+/g, ""), 10) / 100;
      var colabVlrHrdb =
        parseInt(values.colabVlrHr.value.replace(/[.,]+/g, ""), 10) / 100;
      dispatch(
        recursoUpdate(
          id,
          values.OportunidadeId.value,
          values.ColabId.value,
          values.tipoValor.value,
          values.tipoAtend.value,
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
                    <h3 style={{ marginBottom: 0 }}>Recurso</h3>
                    <p style={{ fontSize: 11 }}>
                      {data4.cod} | {data4.desc}
                    </p>
                    <p style={{ fontSize: 11 }}>{data4.Cliente.nomeAbv}</p>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <Label>Colaborador</Label>
                          <FormGroup
                            className={`has-label ${values.ColabId.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="ColabId"
                              type="select"
                              onChange={event =>
                                handleChange(event, "ColabId", "text")
                              }
                              value={values.ColabId.value}
                              onChangeCapture={() =>
                                getColabHr(
                                  document.getElementsByName("ColabId")[0]
                                    .value,
                                  document.getElementsByName("tipoValor")[0]
                                    .value,
                                  document.getElementsByName("tipoAtend")[0]
                                    .value
                                )
                              }
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o colaborador{" "}
                              </option>
                              {data2.map(colab => (
                                <option value={colab.id}> {colab.nome} </option>
                              ))}
                            </Input>

                            {values.ColabId.error === "has-danger" ? (
                              <Label className="error">
                                {values.ColabId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Tipo de Valor</Label>
                          <FormGroup
                            className={`has-label ${values.tipoValor.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="tipoValor"
                              type="select"
                              onChange={event =>
                                handleChange(event, "tipoValor", "text")
                              }
                              value={values.tipoValor.value}
                              onChangeCapture={() =>
                                getColabHr(
                                  document.getElementsByName("ColabId")[0]
                                    .value,
                                  document.getElementsByName("tipoValor")[0]
                                    .value,
                                  document.getElementsByName("tipoAtend")[0]
                                    .value
                                )
                              }
                            >
                              <option disabled value="">
                                {" "}
                                Selecione o tipo de valor{" "}
                              </option>
                              <option value={1}>Por Hora</option>
                              <option value={2}>Fixo</option>
                            </Input>

                            {values.tipoValor.error === "has-danger" ? (
                              <Label className="error">
                                {values.tipoValor.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Tipo de Atendimento</Label>
                          <FormGroup
                            className={`has-label ${values.tipoAtend.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="tipoAtend"
                              type="select"
                              onChange={event =>
                                handleChange(event, "tipoAtend", "text")
                              }
                              value={values.tipoAtend.value}
                              onChangeCapture={() =>
                                getColabHr(
                                  document.getElementsByName("ColabId")[0]
                                    .value,
                                  document.getElementsByName("tipoValor")[0]
                                    .value,
                                  document.getElementsByName("tipoAtend")[0]
                                    .value
                                )
                              }
                            >
                              <option disabled value="">
                                {" "}
                                Selecione o tipo de atendimento{" "}
                              </option>
                              <option value={1}>Consultoria</option>
                              <option value={2}>Tecnologia</option>
                              <option value={3}>Desenvolvimento</option>
                              <option value={4}>Complementar</option>
                            </Input>

                            {values.tipoAtend.error === "has-danger" ? (
                              <Label className="error">
                                {values.tipoAtend.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Data de Inclusão</Label>
                          <FormGroup
                            className={`has-label ${values.dataInclusao.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="dataInclusao"
                              type="date"
                              onChange={event =>
                                handleChange(event, "dataInclusao", "text")
                              }
                              value={values.dataInclusao.value}
                            />
                            {values.dataInclusao.error === "has-danger" ? (
                              <Label className="error">
                                {values.dataInclusao.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Horas Previstas</Label>
                          <FormGroup
                            className={`has-label ${values.hrsPrevst.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="hrsPrevst"
                              type="numeric"
                              onChange={event => {
                                handleChange(event, "hrsPrevst", "number");
                                custoPrevst(
                                  event.target.value,
                                  document.getElementsByName("colabVlrHr")[0]
                                    .value
                                );
                              }}
                              value={values.hrsPrevst.value}
                            />
                            {values.hrsPrevst.error === "has-danger" ? (
                              <Label className="error">
                                {values.hrsPrevst.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Horas Previstas Projeto</Label>
                          <FormGroup
                            className={`has-label ${optional.HorasTotais.error}`}
                          >
                            <Input
                              disabled
                              name="HorasTotais"
                              type="numeric"
                              onChange={event => {
                                handleChange(event, "HorasTotais", "number");
                              }}
                              value={optional.HorasTotais.value}
                            />
                            {optional.HorasTotais.error === "has-danger" ? (
                              <Label className="error">
                                {optional.HorasTotais.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Valor Hora </Label>
                          <FormGroup
                            className={`has-label ${values.colabVlrHr.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="colabVlrHr"
                              type="numeric"
                              onChange={event => {
                                handleChange(event, "colabVlrHr", "currency");
                                custoPrevst(
                                  document.getElementsByName("hrsPrevst")[0]
                                    .value,
                                  event.target.value
                                );
                              }}
                              value={values.colabVlrHr.value}
                            />
                            {values.colabVlrHr.error === "has-danger" ? (
                              <Label className="error">
                                {values.colabVlrHr.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Custo Previsto</Label>
                          <FormGroup
                            className={`has-label ${values.custoPrev.error}`}
                          >
                            <Input
                              disabled
                              name="custoPrev"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "custoPrev", "currency")
                              }
                              value={values.custoPrev.value}
                            />
                            {values.custoPrev.error === "has-danger" ? (
                              <Label className="error">
                                {values.custoPrev.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      {data4.fase >= 5 ? (
                        <></>
                      ) : (
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
                      )}
                      <Link
                        to={`/tabelas/oportunidade/recurso/${data1.OportunidadeId}`}
                      >
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
