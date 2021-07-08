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
import classNames from "classnames";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  Form,
  Input,
  FormGroup,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalBody
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { Link, useParams } from "react-router-dom";
import {
  Close,
  InsertEmoticon,
  Message,
  Send,
  SentimentDissatisfied,
  SentimentSatisfiedAltSharp,
  SentimentVeryDissatisfied,
  SentimentVeryDissatisfiedSharp
} from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import { normalizeFone } from "~/normalize";
import { store } from "~/store";
import api from "~/services/api";
import { followUpCadastro } from "~/store/modules/Cliente/actions";
import ModalLarge from "~/components/Modal/modalLarge";
import { Footer, Header } from "~/components/Modal/modalStyles";
import TagsInput from "~/components/Tags/TagsInput";

export default function CadastroFollowUps() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { cliId, campId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [modalMini, setModalMini] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [tagsinput, settagsinput] = useState([]);
  const [string, setString] = useState("");

  const [date, month, year] = new Date().toLocaleDateString("pt-BR").split("/");

  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    ColabId: { value: "", error: "", message: "" },
    ClienteId: { value: "", error: "", message: "" },
    CliContId: { value: "", error: "", message: "" },
    data: { value: `${year}-${month}-${date}`, error: "", message: "" },
    dataProxContato: { value: ``, error: "", message: "" },
    detalhes: { value: "", error: "", message: "" },
    reacao: { value: "", error: "", message: "" },
    proxPasso: { value: "", error: "", message: "" },
    prefContato: { value: "", error: "", message: "" }
  };

  const meetingSchema = {
    title: { value: "", error: "", message: "" },
    date: { value: "", error: "", message: "" },
    startTime: { value: "", error: "", message: "" },
    endTime: { value: "", error: "", message: "" },
    mainParticipant: { value: "", error: "", message: "" },
    location: { value: "", error: "", message: "" },
    description: { value: "", error: "", message: "" },
    organizerName: { value: "", error: "", message: "" },
    organizerEmail: { value: "", error: "", message: "" }
  };

  const [values, setValues] = useState(stateSchema);
  const [meetingValues, setMeetingValues] = useState(meetingSchema);
  useEffect(() => {
    const { empresa } = store.getState().auth;
    const idColab = store.getState().auth.user.Colab.id;

    async function loadData() {
      const response = await api.get(`/empresa/${empresa}`);
      const response1 = await api.get(`/colab/?idColab=${idColab}`);
      const response2 = await api.get(`/cliente/${cliId}`);
      const response3 = await api.get(`/cliente/cont/${response2.data.id}`);
      const response4 = await api.get(`/campanha/${campId}/true`);
      setData1(response1.data);
      setData2(response2.data);
      setData3(response3.data);
      setData4(response4.data);

      setMeetingValues(prevState => ({
        ...prevState,
        organizerName: { value: response1.data.nome },
        organizerEmail: { value: response1.data.email }
      }));
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id },
        ColabId: { value: response1.data.id },
        ClienteId: { value: response2.data.id }
      }));
      setIsLoading(false);
    }
    loadData();
  }, [campId, cliId]);

  var options = {};
  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const handleTagsinput = value => {
    const verifyEmail = email => {
      var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRex.test(email)) {
        return true;
      }
      return false;
    };
    if (verifyEmail(value[value.length - 1])) {
      setString(`${value}`);
      settagsinput(value);
    } else {
      options = {
        place: "tr",
        message: (
          <div>
            <div>Digite um email válido</div>
          </div>
        ),
        type: "danger",
        icon: "tim-icons icon-alert-circle-exc",
        autoDismiss: 7
      };
      notify();
    }
  };

  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const toggleModalMini = () => {
    setModalMini(!modalMini);
  };
  const checkAction = value => {
    if (value === "10") {
      console.log(value);
      setModalMini(true);
    }
  };

  const handleContatoChange = idd => {
    const cont = data3.find(arr => arr.id === parseInt(idd, 10));
    setMeetingValues(prevState => ({
      ...prevState,
      mainParticipant: { value: cont.email }
    }));
    document.getElementsByName("meetingMainParticipant").value = cont.email;
    document.getElementById("email").value = cont.email;
    document.getElementById("telefone").value = normalizeFone(cont.fone);
    document.getElementById("celular").value = normalizeFone(cont.cel);
    document.getElementById("skype").value = cont.skype;
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
      case "meeting":
        setMeetingValues(prevState => ({
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
      if (!aux[j][1].optional === true) {
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
    }

    if (valid && filled) {
      dispatch(
        followUpCadastro(
          values.empresaId.value,
          values.ColabId.value,
          values.ClienteId.value,
          values.CliContId.value,
          values.data.value,
          values.dataProxContato.value,
          values.detalhes.value,
          values.reacao.value,
          campId,
          values.proxPasso.value,
          values.prefContato.value
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
          <div className="rna-container">
            <NotificationAlert ref={notifyElment} />
          </div>
          <div className="content">
            <Modal
              modalClassName="modal-mini "
              isOpen={modalMini}
              toggle={toggleModalMini}
            >
              <div className="modal-header justify-content-center">
                <button
                  aria-hidden
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  color="primary"
                  onClick={toggleModalMini}
                >
                  <Close />
                </button>
                <div>
                  <Message fontSize="large" />
                </div>
              </div>
              <ModalBody className="text-center">
                <p>
                  {" "}
                  A prospecção para {data2.nomeAbv} será encerrado na campanha{" "}
                  {data4.cod}{" "}
                </p>
              </ModalBody>
              <div className="modal-footer">
                <Button
                  style={{ color: "#000" }}
                  className="btn-neutral"
                  type="button"
                  onClick={() => {
                    document.getElementsByName("proxPasso")[0].value = "";
                    setValues(prevState => ({
                      ...prevState,
                      proxPasso: { value: "" }
                    }));
                    toggleModalMini();
                  }}
                >
                  Não
                </Button>
                <Button
                  style={{ color: "#7E7E7E" }}
                  className="btn-neutral"
                  type="button"
                  onClick={toggleModalMini}
                >
                  Sim
                </Button>
              </div>
            </Modal>

            <ModalLarge
              onClose={() => {
                setIsOpen(!isOpen);
              }}
              open={isOpen}
            >
              <Header>
                <Tooltip title="Fechar">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Close fontSize="large" />
                  </Button>
                </Tooltip>{" "}
                <Tooltip title="Enviar">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={async () => {
                      var aux = Object.entries(meetingValues);
                      const tamanho = aux.length;
                      for (let j = 0; j < tamanho; j++) {
                        if (!aux[j][1].optional === true) {
                          if (aux[j][1].value !== "") {
                            var meetingFilled = true;
                          } else {
                            meetingFilled = false;
                            setMeetingValues(prevState => ({
                              ...prevState,
                              [aux[j][0]]: {
                                error: "has-danger",
                                message: "Campo obrigatório"
                              }
                            }));
                            break;
                          }
                        }
                      }
                      console.log(meetingValues);
                      console.log(meetingFilled);
                      if (meetingFilled) {
                        await api.post(`/followUp/meeting/?Cc=${""}`, {
                          meetingValues,
                          string,
                          tagsinput
                        });
                        setIsOpen(false);
                      }
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Send fontSize="large" />
                  </Button>
                </Tooltip>{" "}
                <h3 style={{ marginBottom: 0 }}>Enviar Convite</h3>
                <p style={{ fontSize: 14 }}>
                  {data4.cod} | {data2.nomeAbv}
                </p>{" "}
              </Header>
              <Row>
                <Col md="4">
                  <Label>Nome do Evento</Label>
                  <FormGroup
                    className={`has-label ${meetingValues.title.error}`}
                  >
                    <Input
                      name="meetingTitle"
                      type="text"
                      onChange={event =>
                        handleChange(event, "title", "meeting")
                      }
                      value={meetingValues.title.value}
                    />
                    {meetingValues.title.error === "has-danger" ? (
                      <Label className="error">
                        {meetingValues.title.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>{" "}
                <Col md="4">
                  <Label>Organizador</Label>
                  <FormGroup
                    className={`has-label ${meetingValues.organizerName.error}`}
                  >
                    <Input
                      disabled
                      name="meetingOrganizerName"
                      type="text"
                      onChange={event =>
                        handleChange(event, "organizerName", "meeting")
                      }
                      value={`${data1.nome} - ${data1.email}`}
                    />
                    {meetingValues.organizerName.error === "has-danger" ? (
                      <Label className="error">
                        {meetingValues.organizerName.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>{" "}
                <Col md="4">
                  <Label>Local</Label>
                  <FormGroup
                    className={`has-label ${meetingValues.location.error}`}
                  >
                    <Input
                      name="meetingEndTime"
                      type="text"
                      onChange={event =>
                        handleChange(event, "location", "meeting")
                      }
                      value={meetingValues.location.value}
                    />
                    {meetingValues.location.error === "has-danger" ? (
                      <Label className="error">
                        {meetingValues.location.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>{" "}
              </Row>
              <Row>
                <Col md="4">
                  <Label>Data</Label>
                  <FormGroup
                    className={`has-label ${meetingValues.date.error}`}
                  >
                    <Input
                      name="meetingDate"
                      type="date"
                      onChange={event => handleChange(event, "date", "meeting")}
                      value={meetingValues.date.value}
                    />
                    {meetingValues.date.error === "has-danger" ? (
                      <Label className="error">
                        {meetingValues.date.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col md="4">
                  {" "}
                  <Label>Hora Inicial</Label>
                  <FormGroup
                    className={`has-label ${meetingValues.startTime.error}`}
                  >
                    <Input
                      name="meetingStartTime"
                      type="time"
                      onChange={event =>
                        handleChange(event, "startTime", "meeting")
                      }
                      value={meetingValues.startTime.value}
                    />
                    {meetingValues.startTime.error === "has-danger" ? (
                      <Label className="error">
                        {meetingValues.startTime.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col md="4">
                  <Label>Hora Final</Label>
                  <FormGroup
                    className={`has-label ${meetingValues.endTime.error}`}
                  >
                    <Input
                      name="meetingEndTime"
                      type="time"
                      onChange={event =>
                        handleChange(event, "endTime", "meeting")
                      }
                      value={meetingValues.endTime.value}
                    />
                    {meetingValues.endTime.error === "has-danger" ? (
                      <Label className="error">
                        {meetingValues.endTime.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Label>Contato Principal</Label>
                  <FormGroup
                    className={`has-label ${meetingValues.mainParticipant.error}`}
                  >
                    <Input
                      disabled
                      name="meetingMainParticipant"
                      type="text"
                      onChange={event =>
                        handleChange(event, "mainParticipant", "meeting")
                      }
                      value={meetingValues.mainParticipant.value}
                    />
                    {meetingValues.mainParticipant.error === "has-danger" ? (
                      <Label className="error">
                        {meetingValues.mainParticipant.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>{" "}
                <Col md="8">
                  <Label style={{ display: "block" }}>
                    Adicionar Participantes
                  </Label>
                  <TagsInput
                    onChange={handleTagsinput}
                    tagProps={{
                      className: "react-tagsinput-tag "
                    }}
                    value={tagsinput}
                  />
                </Col>{" "}
              </Row>
              <Row>
                <Col md="12">
                  <Label>Detalhes</Label>
                  <FormGroup
                    className={`has-label ${meetingValues.description.error}`}
                  >
                    <Input
                      name="metingDescription"
                      type="textarea"
                      onChange={event =>
                        handleChange(event, "description", "meeting")
                      }
                      value={meetingValues.description.value}
                    />{" "}
                    {meetingValues.description.error === "has-danger" ? (
                      <Label className="error">
                        {meetingValues.description.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Footer />
            </ModalLarge>

            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <h3 style={{ marginBottom: 0 }}>Prospecção</h3>
                    <p style={{ fontSize: 14 }}>
                      {data4.cod} | {data2.nomeAbv}
                    </p>{" "}
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
                          <Label>Contato</Label>
                          <FormGroup
                            className={`has-label ${values.CliContId.error}`}
                          >
                            <Input
                              name="CliContId"
                              type="select"
                              onChangeCapture={e =>
                                handleContatoChange(e.target.value)
                              }
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
                                  {CliContId.id} - {CliContId.nome}{" "}
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
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Email</Label>
                          <FormGroup className="has-label">
                            <Input
                              disabled
                              name="email"
                              id="email"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Telefone</Label>
                          <FormGroup className="has-label">
                            <Input
                              disabled
                              name="telefone"
                              id="telefone"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Celular</Label>
                          <FormGroup className="has-label">
                            <Input
                              disabled
                              name="celular"
                              id="celular"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Skype</Label>
                          <FormGroup className="has-label">
                            <Input
                              disabled
                              name="skype"
                              id="skype"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Preferência de Contato</Label>
                          <FormGroup
                            className={`has-label ${values.prefContato.error}`}
                          >
                            <Input
                              name="prefContato"
                              type="select"
                              onChange={event =>
                                handleChange(event, "prefContato", "text")
                              }
                              value={values.prefContato.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o contato{" "}
                              </option>
                              <option value={1}>Email </option>
                              <option value={2}>Telefone </option>
                              <option value={3}>Whatsapp </option>
                              <option value={4}>Skype </option>
                            </Input>
                            {values.prefContato.error === "has-danger" ? (
                              <Label className="error">
                                {values.prefContato.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Reação</Label>
                          <FormGroup check>
                            <Label check>
                              <Input
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
                        <Col md="4">
                          <Label>Ação</Label>
                          <FormGroup
                            className={`has-label ${values.proxPasso.error}`}
                          >
                            <Input
                              name="proxPasso"
                              type="select"
                              onChange={event =>
                                handleChange(event, "proxPasso", "text")
                              }
                              onChangeCapture={e => checkAction(e.target.value)}
                              value={values.proxPasso.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione a ação{" "}
                              </option>
                              <option value={1}>Retornar Ligação</option>
                              <option value={2}>Agendar Reunião</option>
                              <option value={3}>Solicitar Orçamento</option>
                              <option value={10}>Finalizar Prospecção</option>
                            </Input>
                            {values.proxPasso.error === "has-danger" ? (
                              <Label className="error">
                                {values.proxPasso.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Agendar Reunião</Label>
                          <FormGroup className="has-label">
                            <InputGroup>
                              <Input
                                disabled
                                name="reuniao"
                                type="text"
                                onChange={event =>
                                  handleChange(event, "reuniao", "text")
                                }
                                placeholder="Agende a Reunião"
                              />
                              <InputGroupAddon
                                className="appendCustom"
                                addonType="append"
                              >
                                <Button
                                  className={classNames(
                                    "btn-icon btn-link like addon"
                                  )}
                                  onClick={() => setIsOpen(!isOpen)}
                                >
                                  <i className="tim-icons icon-email-85 addon" />
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>
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
                      <Link
                        to={`/tabelas/cliente/followUps/${cliId}/${campId}`}
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
                              paddingRight: 1,
                              float: "left"
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
