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
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { useParams } from "react-router-dom";
import {
  InsertEmoticon,
  SentimentDissatisfied,
  SentimentSatisfiedAltSharp,
  SentimentVeryDissatisfied,
  SentimentVeryDissatisfiedSharp
} from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import { normalizeCnpj } from "~/normalize";
import { store } from "~/store";
import api from "~/services/api";
import { followUpUpdate } from "~/store/modules/Cliente/actions";
import history from "~/services/history";

export default function UpdateFollowUps() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { id } = useParams();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const [date, month, year] = new Date().toLocaleDateString("pt-BR").split("/");

  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    ColabId: { value: "", error: "", message: "" },
    ClienteId: { value: "", error: "", message: "" },
    CliContId: { value: "", error: "", message: "" },
    data: { value: `${year}-${month}-${date}`, error: "", message: "" },
    dataProxContato: { value: ``, error: "", message: "" },
    detalhes: { value: "", error: "", message: "" },
    reacao: { value: "ruim", error: "", message: "" }
  };

  const [values, setValues] = useState(stateSchema);
  useEffect(() => {
    const { empresa } = store.getState().auth;
    const idColab = store.getState().auth.user.Colab.id;

    async function loadData() {
      const response = await api.get(`/empresa/${empresa}`);
      const response1 = await api.get(`/colab/?idColab=${idColab}`);
      const response4 = await api.get(`/followUp/${id}/true`);
      const response2 = await api.get(`/cliente/${response4.data.ClienteId}`);
      const response3 = await api.get(
        `/cliente/cont/${response4.data.ClienteId}`
      );
      setData1(response1.data);
      setData2(response2.data);
      setData3(response3.data);

      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id },
        ColabId: { value: response4.data.ColabId },
        ClienteId: { value: response4.data.ClienteId },
        CliContId: { value: response4.data.CliContId },
        data: { value: response4.data.dataContato },
        dataProxContato: { value: response4.data.dataProxContato },
        detalhes: { value: response4.data.detalhes },
        reacao: { value: response4.data.reacao }
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
  console.log(values);
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
        followUpUpdate(
          id,
          values.ColabId.value,
          values.ClienteId.value,
          values.CliContId.value,
          values.data.value,
          values.dataProxContato.value,
          values.detalhes.value,
          values.reacao.value
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
        <></>
      ) : (
        <>
          {" "}
          <div className="rna-container">
            <NotificationAlert ref={notifyElment} />
          </div>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Follow Up</CardTitle>
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
                              disabled
                              name="ColabId"
                              type="text"
                              onChange={event =>
                                handleChange(event, "ColabId", "text")
                              }
                              defaultValue={data1.nome}
                            />
                            {values.ColabId.error === "has-danger" ? (
                              <Label className="error">
                                {values.ColabId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Data</Label>
                          <FormGroup
                            className={`has-label ${values.data.error}`}
                          >
                            <Input
                              name="name_abv"
                              type="date"
                              onChange={event =>
                                handleChange(event, "data", "text")
                              }
                              value={values.data.value}
                            />
                            {values.data.error === "has-danger" ? (
                              <Label className="error">
                                {values.data.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Data Próximo Contato</Label>
                          <FormGroup
                            className={`has-label ${values.dataProxContato.error}`}
                          >
                            <Input
                              name="dataProxContato"
                              type="date"
                              onChange={event =>
                                handleChange(event, "dataProxContato", "text")
                              }
                              value={values.dataProxContato.value}
                            />
                            {values.dataProxContato.error === "has-danger" ? (
                              <Label className="error">
                                {values.dataProxContato.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Cliente</Label>
                          <FormGroup
                            className={`has-label ${values.ClienteId.error}`}
                          >
                            <Input
                              disabled
                              name="ClienteId"
                              type="text"
                              onChange={event =>
                                handleChange(event, "ClienteId", "text")
                              }
                              defaultValue={`${data2.nomeAbv} - ${normalizeCnpj(
                                data2.CNPJ
                              )}`}
                            >
                              {data2.nomeAbv} - {normalizeCnpj(data2.CNPJ)}
                            </Input>
                            {values.ClienteId.error === "has-danger" ? (
                              <Label className="error">
                                {values.ClienteId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Contato</Label>
                          <FormGroup
                            className={`has-label ${values.CliContId.error}`}
                          >
                            <Input
                              name="CliContId"
                              type="select"
                              onChange={event =>
                                handleChange(event, "CliContId", "text")
                              }
                              value={values.CliContId.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o contato{" "}
                              </option>
                              {data3.map(CliContId => (
                                <option value={CliContId.id}>
                                  {" "}
                                  {CliContId.nome} - {CliContId.email}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.CliContId.error === "has-danger" ? (
                              <Label className="error">
                                {values.CliContId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Reação</Label>
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked={
                                  values.reacao.value === "pessima"
                                }
                                hidden
                                name="reacao"
                                type="radio"
                                onChange={event =>
                                  handleChange(event, "reacao", "text")
                                }
                                value="pessima"
                              />{" "}
                              <Tooltip title="Péssima">
                                <SentimentVeryDissatisfiedSharp
                                  color={
                                    values.reacao.value === "pessima"
                                      ? "null"
                                      : "disabled"
                                  }
                                />
                              </Tooltip>
                            </Label>
                            <Label check>
                              <Input
                                defaultChecked={values.reacao.value === "ruim"}
                                hidden
                                name="reacao"
                                type="radio"
                                onChange={event =>
                                  handleChange(event, "reacao", "text")
                                }
                                value="ruim"
                              />{" "}
                              <Tooltip title="Ruim">
                                <SentimentVeryDissatisfied
                                  color={
                                    values.reacao.value === "ruim"
                                      ? "null"
                                      : "disabled"
                                  }
                                />
                              </Tooltip>
                            </Label>
                            <Label check>
                              <Input
                                defaultChecked={
                                  values.reacao.value === "neutra"
                                }
                                hidden
                                name="reacao"
                                type="radio"
                                onChange={event =>
                                  handleChange(event, "reacao", "text")
                                }
                                value="neutra"
                              />{" "}
                              <Tooltip title="Sem Reação">
                                <SentimentDissatisfied
                                  color={
                                    values.reacao.value === "neutra"
                                      ? "null"
                                      : "disabled"
                                  }
                                />
                              </Tooltip>
                            </Label>
                            <Label check>
                              <Input
                                defaultChecked={values.reacao.value === "boa"}
                                hidden
                                name="reacao"
                                type="radio"
                                onChange={event =>
                                  handleChange(event, "reacao", "text")
                                }
                                value="boa"
                              />
                              <Tooltip title="Boa">
                                <SentimentSatisfiedAltSharp
                                  color={
                                    values.reacao.value === "boa"
                                      ? "null"
                                      : "disabled"
                                  }
                                />
                              </Tooltip>
                            </Label>
                            <Label check>
                              <Input
                                defaultChecked={values.reacao.value === "otima"}
                                hidden
                                name="reacao"
                                type="radio"
                                onChange={event =>
                                  handleChange(event, "reacao", "text")
                                }
                                value="otima"
                              />
                              <Tooltip title="Ótima">
                                <InsertEmoticon
                                  color={
                                    values.reacao.value === "otima"
                                      ? "null"
                                      : "disabled"
                                  }
                                />
                              </Tooltip>
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Label>Detalhes</Label>
                          <FormGroup
                            className={`has-label ${values.detalhes.error}`}
                          >
                            <Input
                              name="detalhes"
                              type="textarea"
                              onChange={event =>
                                handleChange(event, "detalhes", "text")
                              }
                              value={values.detalhes.value}
                            />{" "}
                            {values.detalhes.error === "has-danger" ? (
                              <Label className="error">
                                {values.detalhes.message}
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
                      <Button
                        style={{
                          paddingLeft: 32,
                          paddingRight: 33,
                          float: "left"
                        }}
                        onClick={() => history.goBack()}
                        color="secundary"
                        size="small"
                        className="form"
                      >
                        <i
                          className="tim-icons icon-double-left"
                          style={{
                            paddingBottom: 4,
                            paddingRight: 1,
                            float: "left"
                          }}
                          size="large"
                        />{" "}
                        Voltar
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
