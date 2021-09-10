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
  ModalBody,
  CardTitle,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  DropdownItem
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { Link, useParams } from "react-router-dom";
import {
  Check,
  Close,
  FormatListBulleted,
  InfoOutlined,
  InsertEmoticon,
  MailOutline,
  Message,
  PostAdd,
  SentimentDissatisfied,
  SentimentSatisfiedAltSharp,
  SentimentVeryDissatisfied,
  SentimentVeryDissatisfiedSharp,
  Timeline
} from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import { normalizeCnpj, normalizeFone } from "~/normalize";
import { store } from "~/store";
import api from "~/services/api";
import { followUpCadastro } from "~/store/modules/Cliente/actions";
import ModalLarge from "~/components/Modal/modalLarge";
import { Footer, Header } from "~/components/Modal/modalStyles";
import TagsInput from "~/components/Tags/TagsInput";
import {
  clearFields,
  FUPCadastroFields
} from "~/store/modules/keepingFields/actions";

export default function CadastroFollowUps() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { cliId, campId } = useParams();
  const dispatch = useDispatch();
  const [timeline, setTimeLine] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMini, setModalMini] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOport, setIsOpenOport] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState({});
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [data8, setData8] = useState([]);
  const [data9, setData9] = useState([]);
  const [data10, setData10] = useState([]);
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
    prefContato: { value: "", error: "", message: "" },
    ativo: { value: true, error: "", message: "" },
    motivo: { value: "", error: "", message: "", optional: true }
  };
  const oportSchema = {
    empresaId: { value: "", error: "", message: "" },
    ColabId: { value: "", error: "", message: "" },
    ClienteId: { value: "", error: "", message: "" },
    UndNegId: { value: "", error: "", message: "" },
    RecDespId: { value: "", error: "", message: "" },
    segmetId: { value: "", error: "", message: "" },
    CampanhaId: { value: "", error: "", message: "" },
    RepresentanteId: { value: "", error: "", message: "" },
    contato: { value: "", error: "", message: "" },
    data: { value: `${year}-${month}-${date}`, error: "", message: "" },
    fase: { value: 1, error: "", message: "" },
    cod: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" },
    narrativa: { value: "", error: "", message: "", optional: true }
  };

  const contSchema = {
    email: { value: "", error: "", message: "" },
    cargo: { value: "", error: "", message: "" },
    fone: { value: "", error: "", message: "" },
    ramal: { value: "", error: "", message: "" },
    cel: { value: ``, error: "", message: "" },
    skype: { value: ``, error: "", message: "" }
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
  const [contValues, setContValues] = useState(contSchema);
  const [meetingValues, setMeetingValues] = useState(meetingSchema);
  const [oportValues, setOportValues] = useState(oportSchema);
  useEffect(() => {
    const { empresa } = store.getState().auth;
    const { FUPCadastro } = store.getState().field;
    const idColab = store.getState().auth.user.Colab.id;

    async function loadData() {
      const codAux = new Date();
      const response = await api.get(`/empresa/${empresa}`);
      const response1 = await api.get(`/colab/?idColab=${idColab}`);
      const response2 = await api.get(`/cliente/${cliId}`);
      const response3 = await api.get(`/cliente/cont/${response2.data.id}`);
      const response4 = await api.get(`/campanha/${campId}/true`);
      const response6 = await api.get("/representante");
      const response7 = await api.get("/camposDinamicos");
      const response8 = await api.get(`/und_neg/`);
      const response9 = await api.get(`/rec_desp/?rec=true`);
      const response11 = await api.get(`/oportunidade/?one=true`);
      setData1(response1.data);
      setData2(response2.data);
      setData3(response3.data);
      setData4(response4.data);
      setData5({
        CliAtvPrincipal: response2.data.atvPrincipal,
        CliEndereco: `${response2.data.CliComp.rua}, ${response2.data.CliComp.numero}, ${response2.data.CliComp.bairro}, ${response2.data.CliComp.cidade} - ${response2.data.CliComp.uf}`
      });
      setData6(response6.data);
      setData7(response7.data);
      setData8(response8.data);
      setData9(response9.data);

      var zerofilled =
        response11.data.length !== 0
          ? `0000${response11.data[0].id + 1}`.slice(-4)
          : `0000${1}`.slice(-4);

      setMeetingValues(prevState => ({
        ...prevState,
        organizerName: { value: response1.data.nome },
        organizerEmail: { value: response1.data.email }
      }));

      if (FUPCadastro.CliContId) {
        const cont = response3.data.find(
          arr => arr.id === parseInt(FUPCadastro.CliContId, 10)
        );
        setMeetingValues(prevState => ({
          ...prevState,
          mainParticipant: { value: cont.email }
        }));
        setContValues(prevState => ({
          ...prevState,
          email: { value: cont.email },
          fone: { value: cont.fone },
          cel: { value: cont.cel },
          skype: { value: cont.skype },
          ramal: { value: cont.ramal },
          cargo: { value: cont.cargo }
        }));
      }

      if (FUPCadastro.UndNegId) {
        await api
          .get(`/segmento/?idUndNeg=${FUPCadastro.UndNegId}`)
          .then(result => {
            setData10(result.data);
          });
      }

      setOportValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id },
        ClienteId: { value: cliId },
        CampanhaId: { value: campId },
        ColabId: { value: response1.data.id },
        RepresentanteId: { value: response2.data.RepresentanteId },
        cod: {
          value: `A${JSON.stringify(codAux.getYear()).slice(
            -2
          )}${`0${codAux.getMonth() + 1}`.slice(-2)}-${zerofilled}`
        },
        contato: {
          value: FUPCadastro.CliContId ? FUPCadastro.CliContId : ""
        },
        RecDespId: {
          value: FUPCadastro.RecDespId ? FUPCadastro.RecDespId : ""
        },
        UndNegId: {
          value: FUPCadastro.UndNegId ? FUPCadastro.UndNegId : ""
        },
        segmetId: {
          value: FUPCadastro.SegmentoId ? FUPCadastro.SegmentoId : ""
        },
        data: {
          value: FUPCadastro.dataOport
            ? FUPCadastro.dataOport
            : `${year}-${month}-${date}`
        },
        desc: {
          value: FUPCadastro.desc ? FUPCadastro.desc : ""
        },
        narrativa: {
          value: FUPCadastro.narrativa ? FUPCadastro.narrativa : ""
        }
      }));

      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id },
        ColabId: { value: response1.data.id },
        ClienteId: { value: response2.data.id },
        CliContId: {
          value: FUPCadastro.CliContId ? FUPCadastro.CliContId : ""
        },
        data: {
          value: FUPCadastro.data
            ? FUPCadastro.data
            : `${year}-${month}-${date}`
        },
        dataProxContato: {
          value: FUPCadastro.dataProxContato ? FUPCadastro.dataProxContato : ""
        },
        reacao: { value: FUPCadastro.reacao ? FUPCadastro.reacao : "" },
        detalhes: { value: FUPCadastro.detalhes ? FUPCadastro.detalhes : "" },
        motivo: {
          value: FUPCadastro.motivo ? FUPCadastro.motivo : "",
          optional: true
        },
        prefContato: {
          value: FUPCadastro.prefContato ? FUPCadastro.prefContato : ""
        },
        proxPasso: { value: FUPCadastro.proxPasso ? FUPCadastro.proxPasso : "" }
      }));
      setIsLoading(false);
    }
    loadData();

    return () => {
      if (FUPCadastro.timeline) {
        console.log(timeline);
        dispatch(clearFields({ field: "FUPCadastro" }));
      }
    };
  }, [campId, cliId, date, dispatch, month, timeline, year]);

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
  console.log(oportValues);
  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const toggleModalMini = () => {
    setModalMini(!modalMini);
  };
  const checkAction = value => {
    if (value === "10") {
      setValues(prevState => ({
        ...prevState,
        ativo: { value: false },
        dataProxContato: { value: `${year}-${month}-${date}` }
      }));
      document.getElementsByName("dataProxContato")[0].disabled = true;
      setValues(prevState => ({
        ...prevState,
        motivo: { value: "" }
      }));
      setModalMini(true);
    } else {
      document.getElementsByName("dataProxContato")[0].disabled = false;
      setValues(prevState => ({
        ...prevState,
        motivo: { value: "", optional: true }
      }));
    }
  };
  const handleContatoChange = idd => {
    const cont = data3.find(arr => arr.id === parseInt(idd, 10));
    setMeetingValues(prevState => ({
      ...prevState,
      mainParticipant: { value: cont.email }
    }));
    setOportValues(prevState => ({
      ...prevState,
      contato: { value: cont.id }
    }));
    document.getElementsByName("meetingMainParticipant").value = cont.email;
    document.getElementById("email").value = cont.email;
    document.getElementById("telefone").value = normalizeFone(cont.fone);
    document.getElementById("celular").value = normalizeFone(cont.cel);
    document.getElementById("skype").value = cont.skype;
    document.getElementById("ramal").value = cont.ramal ? cont.ramal : "--";
    document.getElementById("cargo").value = cont.cargo ? cont.cargo : "--";
  };

  const getDynamicData = undNeg => {
    api.get(`/segmento/?idUndNeg=${undNeg}`).then(result => {
      setData10(result.data);

      setOportValues(prevState => ({
        ...prevState,
        segmetId: { value: "", error: "", message: "" }
      }));
    });
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
      case "optional":
        setValues(prevState => ({
          ...prevState,
          [name]: { value: target, optional: true }
        }));
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
      case "oport":
        setOportValues(prevState => ({
          ...prevState,
          [name]: { value: target }
        }));
        break;
      default:
    }
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    var auxValues = Object.entries(values);
    var auxOport = Object.entries(oportValues);
    const tamanhoValues = auxValues.length;
    const tamanhoOport = auxValues.length;

    for (let i = 0; i < tamanhoValues; i++) {
      if (!(auxValues[i][1].error === "has-danger")) {
        var valid = true;
      } else {
        valid = false;
        break;
      }
    }
    for (let i = 0; i < tamanhoOport; i++) {
      if (!(auxOport[i][1].error === "has-danger")) {
        var validOport = true;
      } else {
        validOport = false;
        break;
      }
    }
    for (let j = 0; j < tamanhoOport; j++) {
      if (!auxValues[j][1].optional === true) {
        if (auxValues[j][1].value !== "") {
          var filled = true;
        } else {
          filled = false;
          setOportValues(prevState => ({
            ...prevState,
            [auxOport[j][0]]: {
              error: "has-danger",
              message: "Campo obrigatório"
            }
          }));
          break;
        }
      }
    }
    for (let j = 0; j < tamanhoOport; j++) {
      if (!auxOport[j][1].optional === true) {
        if (auxOport[j][1].value !== "") {
          var filledOport = true;
        } else {
          filledOport = false;
          setOportValues(prevState => ({
            ...prevState,
            [auxOport[j][0]]: {
              error: "has-danger",
              message: "Campo obrigatório"
            }
          }));
          break;
        }
      }
    }
    console.log(validOport);
    console.log(filledOport);

    if (valid && filled) {
      dispatch(
        followUpCadastro({
          Follow: {
            EmpresaId: values.empresaId.value,
            ColabId: values.ColabId.value,
            ClienteId: values.ClienteId.value,
            CliContId: values.CliContId.value,
            dataContato: values.data.value,
            dataProxContato: values.dataProxContato.value,
            detalhes: values.detalhes.value,
            reacao: values.reacao.value,
            CampanhaId: campId,
            proxPasso: values.proxPasso.value,
            prefContato: values.prefContato.value,
            CamposDinamicosProspectId: values.motivo.value
              ? values.motivo.value
              : null
          },
          Oport:
            validOport && filledOport
              ? {
                  EmpresaId: values.empresaId.value,
                  ColabId: values.ColabId.value,
                  ClienteId: values.ClienteId.value,
                  contato: values.CliContId.value,
                  UndNegId: oportValues.UndNegId.value,
                  RecDespId: oportValues.RecDespId.value,
                  SegmentoId: oportValues.segmetId.value,
                  RepresentanteId: oportValues.RepresentanteId.value,
                  CampanhaId: campId,
                  data: oportValues.data.value,
                  fase: oportValues.fase.value,
                  cod: oportValues.cod.value,
                  desc: oportValues.desc.value,
                  narrativa: oportValues.narrativa.value
                }
              : null
        })
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
                <CardTitle tag="h3">Alerta</CardTitle>
              </div>
              <ModalBody className="text-center">
                <p>
                  {" "}
                  Ao selecionar "Finalizar Prospecção" a empresa{" "}
                  <strong> {data2.nomeAbv}</strong> será encerrada na campanha{" "}
                  <strong>{data4.cod}</strong>.
                </p>
              </ModalBody>
              <div className="modal-footer">
                <Button
                  style={{ color: "#7E7E7E" }}
                  className="btn-neutral  "
                  type="button"
                  onClick={toggleModalMini}
                >
                  Ok
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
                    <MailOutline fontSize="large" />
                  </Button>
                </Tooltip>{" "}
                <h3 style={{ marginBottom: 0 }}>Enviar Convite</h3>
                <p style={{ fontSize: 14 }}>
                  {data4.cod} | {data2.nomeAbv}
                </p>{" "}
              </Header>
              <Row>
                <Col sm="4">
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
                <Col sm="4">
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
                <Col sm="4">
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
                <Col sm="4">
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
                <Col sm="4">
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
                <Col sm="4">
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
                <Col sm="4">
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
                <Col sm="8">
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
                <Col sm="12">
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
            {/*
            ------------
            ------------
            ------------
            */}
            <ModalLarge
              onClose={() => {
                setIsOpenInfo(!isOpenInfo);
              }}
              open={isOpenInfo}
            >
              <Header>
                <Tooltip title="Fechar">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpenInfo(false);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Close fontSize="large" />
                  </Button>
                </Tooltip>{" "}
                <h3 style={{ marginBottom: 0 }}>Empresa</h3>
              </Header>
              <Row>
                <Col sm="4">
                  <Label>CNPJ</Label>
                  <FormGroup className="has-label">
                    <Input
                      disabled
                      value={normalizeCnpj(data2.CNPJ)}
                      id="CliCNPJ"
                      name="CliCNPJ"
                      type="text"
                    />
                  </FormGroup>
                </Col>{" "}
                <Col sm="4">
                  <Label>Razão Social</Label>
                  <FormGroup className="has-label">
                    <Input
                      disabled
                      value={data2.rzSoc}
                      id="CliRzSoc"
                      name="CliRzSoc"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Nome Abreviado</Label>
                  <FormGroup className="has-label">
                    <Input
                      disabled
                      value={data2.nomeAbv}
                      id="CliNomeAbv"
                      name="CliNomeAbv"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <Label>Site</Label>
                  <FormGroup className="has-label">
                    <InputGroup>
                      <Input
                        disabled
                        value={data2.site ? data2.site : "--"}
                        id="CliSite"
                        name="CliSite"
                        type="text"
                      />
                      <InputGroupAddon
                        className="appendCustom"
                        addonType="append"
                      >
                        <Button
                          className={classNames("btn-icon btn-link like addon")}
                          onClick={() =>
                            data2.site
                              ? window.open(
                                  `${data2.site}`,
                                  "_blank",
                                  "noopener,noreferrer"
                                )
                              : null
                          }
                        >
                          <i className="tim-icons icon-world addon" />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Telefone</Label>
                  <FormGroup className="has-label">
                    <Input
                      disabled
                      value={data2.fone ? normalizeFone(data2.fone) : "--"}
                      id="CliFone"
                      name="CliFone"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Representante</Label>
                  <FormGroup className="has-label">
                    <Input
                      disabled
                      value={data2.RepresentanteId}
                      id="CliFone"
                      name="CliFone"
                      type="select"
                    >
                      <option disabled value="">
                        {" "}
                        Representante
                      </option>
                      {data6.map((repr, index) => (
                        <option id={index} value={repr.id}>
                          {" "}
                          {repr.nome}{" "}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <Label>Endereço</Label>
                  <FormGroup className="has-label">
                    <Input
                      disabled
                      value={data5.CliEndereco}
                      id="CliEndereco"
                      name="CliEndereco"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col sm="12">
                  <Label>Atividade Principal</Label>
                  <FormGroup className="has-label">
                    <Input
                      disabled
                      value={data5.CliAtvPrincipal}
                      id="CliAtvPrincipal"
                      name="CliAtvPrincipal"
                      type="textarea"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Footer />
            </ModalLarge>
            {/*
            ------------
            ------------
            ------------
            */}
            {/*
            ------------
            ------------
            ------------
            */}
            <ModalLarge
              onClose={() => {
                setIsOpenOport(!isOpenOport);
              }}
              open={isOpenOport}
            >
              <Header>
                <Tooltip title="Fechar">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpenOport(false);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Close fontSize="large" />
                  </Button>
                </Tooltip>{" "}
                <Tooltip title="Ok">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpenOport(false);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Check fontSize="large" />
                  </Button>
                </Tooltip>
                <h3 style={{ marginBottom: 0 }}>Oportunidade</h3>
              </Header>
              <Row>
                <Col sm="4">
                  <Label>Colaborador</Label>
                  <FormGroup
                    className={`has-label ${oportValues.ColabId.error}`}
                  >
                    <Input
                      disabled
                      name="ColabId"
                      type="text"
                      onChange={event =>
                        handleChange(event, "ColabId", "oport")
                      }
                      defaultValue={data1.nome}
                    />
                    {oportValues.ColabId.error === "has-danger" ? (
                      <Label className="error">
                        {oportValues.ColabId.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Data</Label>
                  <FormGroup className={`has-label ${oportValues.data.error}`}>
                    <Input
                      name="name_abv"
                      type="date"
                      onChange={event => handleChange(event, "data", "oport")}
                      value={oportValues.data.value}
                    />
                    {oportValues.data.error === "has-danger" ? (
                      <Label className="error">
                        {oportValues.data.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <Label>Cliente</Label>
                  <FormGroup
                    className={`has-label ${oportValues.ClienteId.error}`}
                  >
                    <Input
                      disabled
                      name="ClienteId"
                      type="text"
                      value={`${data2.nomeAbv} - ${normalizeCnpj(data2.CNPJ)}`}
                    />
                    {oportValues.ClienteId.error === "has-danger" ? (
                      <Label className="error">
                        {oportValues.ClienteId.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Contato</Label>
                  <FormGroup
                    className={`has-label ${oportValues.contato.error}`}
                  >
                    <Input
                      disabled
                      name="contato"
                      type="select"
                      onChange={event =>
                        handleChange(event, "contato", "oport")
                      }
                      value={oportValues.contato.value}
                    >
                      {" "}
                      <option disabled value="">
                        {" "}
                        Selecione o contato{" "}
                      </option>
                      {data3.map(contato => (
                        <option value={contato.id}>
                          {" "}
                          {contato.nome} - {contato.email}{" "}
                        </option>
                      ))}
                    </Input>
                    {oportValues.contato.error === "has-danger" ? (
                      <Label className="error">
                        {oportValues.contato.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Representante</Label>
                  <FormGroup
                    className={`has-label ${oportValues.RepresentanteId.error}`}
                  >
                    <Input
                      disabled
                      name="RepresentanteId"
                      type="select"
                      value={data2.RepresentanteId}
                    >
                      {" "}
                      <option disabled value="">
                        {" "}
                        Selecione o Representante{" "}
                      </option>
                      {data6.map(repr => (
                        <option value={repr.id}>
                          {" "}
                          {repr.id} - {repr.nome}{" "}
                        </option>
                      ))}
                    </Input>
                    {oportValues.RepresentanteId.error === "has-danger" ? (
                      <Label className="error">
                        {oportValues.RepresentanteId.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <Label>Unidade de Negócio</Label>
                  <FormGroup
                    className={`has-label ${oportValues.UndNegId.error}`}
                  >
                    <Input
                      name="UndNegId"
                      type="select"
                      onChange={event =>
                        handleChange(event, "UndNegId", "oport")
                      }
                      onChangeCapture={e => {
                        getDynamicData(e.target.value);
                      }}
                      value={oportValues.UndNegId.value}
                    >
                      {" "}
                      <option disabled value="">
                        {" "}
                        Selecione a unidade de negócio{" "}
                      </option>
                      {data8.map(UndNegId => (
                        <option value={UndNegId.id}>
                          {" "}
                          {UndNegId.id} - {UndNegId.descUndNeg}{" "}
                        </option>
                      ))}
                    </Input>
                    {oportValues.UndNegId.error === "has-danger" ? (
                      <Label className="error">
                        {oportValues.UndNegId.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Receita</Label>
                  <FormGroup
                    className={`has-label ${oportValues.RecDespId.error}`}
                  >
                    <Input
                      name="RecDespId"
                      type="select"
                      onChange={event =>
                        handleChange(event, "RecDespId", "oport")
                      }
                      value={oportValues.RecDespId.value}
                    >
                      {" "}
                      <option disabled value="">
                        {" "}
                        Selecione a receita{" "}
                      </option>
                      {data9.map(RecDespId => (
                        <option value={RecDespId.id}>
                          {" "}
                          {RecDespId.id} - {RecDespId.desc}{" "}
                        </option>
                      ))}
                    </Input>
                    {oportValues.RecDespId.error === "has-danger" ? (
                      <Label className="error">
                        {oportValues.RecDespId.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Segmento</Label>
                  <FormGroup
                    className={`has-label ${oportValues.segmetId.error}`}
                  >
                    <Input
                      name="segmetId"
                      type="select"
                      onChange={event =>
                        handleChange(event, "segmetId", "oport")
                      }
                      value={oportValues.segmetId.value}
                    >
                      {" "}
                      <option disabled value="">
                        {" "}
                        Selecione o segmento{" "}
                      </option>
                      {data10.map(segmetId => (
                        <option value={segmetId.id}>
                          {" "}
                          {segmetId.id} - {segmetId.descSegmt}{" "}
                        </option>
                      ))}
                    </Input>
                    {oportValues.segmetId.error === "has-danger" ? (
                      <Label className="error">
                        {oportValues.segmetId.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <Label>Código</Label>
                  <FormGroup className={`has-label ${oportValues.cod.error}`}>
                    <Input
                      disabled
                      name="cod"
                      type="text"
                      onChange={event => handleChange(event, "cod", "oport")}
                      value={oportValues.cod.value}
                    />{" "}
                    {oportValues.cod.error === "has-danger" ? (
                      <Label className="error">{oportValues.cod.message}</Label>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm="8">
                  <Label>Descrição</Label>
                  <FormGroup className={`has-label ${oportValues.desc.error}`}>
                    <Input
                      name="desc"
                      type="text"
                      onChange={event => handleChange(event, "desc", "oport")}
                      value={oportValues.desc.value}
                    />{" "}
                    {oportValues.desc.error === "has-danger" ? (
                      <Label className="error">
                        {oportValues.desc.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Narrativa</Label>
                  <FormGroup
                    className={`has-label ${oportValues.narrativa.error}`}
                  >
                    <Input
                      name="narrativa"
                      type="textarea"
                      onChange={event =>
                        handleChange(event, "narrativa", "oport")
                      }
                      value={oportValues.narrativa.value}
                    />{" "}
                    {oportValues.narrativa.error === "has-danger" ? (
                      <Label className="error">
                        {oportValues.narrativa.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Footer />
            </ModalLarge>
            {/*
            ------------
            ------------
            ------------
            */}
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <UncontrolledDropdown style={{ float: "right" }}>
                      <DropdownToggle
                        caret
                        color="default"
                        data-toggle="dropdown"
                        nav
                        onClick={e => e.preventDefault()}
                      >
                        <PostAdd />
                        <div className="photo" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-navbar" right tag="ul">
                        <NavLink onClick={() => setIsOpenOport(true)} tag="li">
                          <DropdownItem
                            style={{ paddingLeft: "3%" }}
                            className="nav-item"
                          >
                            <InfoOutlined
                              style={{ float: "left", marginRight: "3%" }}
                              fontSize="small"
                            />
                            <p style={{ paddingTop: "0.5%" }}>Oportunidade</p>
                          </DropdownItem>
                        </NavLink>
                        <NavLink
                          onClick={async () => {
                            await delay(500);
                            setTimeLine(true);
                            dispatch(
                              FUPCadastroFields({
                                timeline: true,
                                CliContId: values.CliContId.value,
                                data: values.data.value,
                                dataProxContato: values.dataProxContato.value,
                                detalhes: values.detalhes.value,
                                reacao: values.reacao.value,
                                proxPasso: values.proxPasso.value,
                                prefContato: values.prefContato.value,
                                motivo: values.motivo.value,
                                UndNegId: oportValues.UndNegId.value,
                                RecDespId: oportValues.RecDespId.value,
                                SegmentoId: oportValues.segmetId.value,
                                dataOport: oportValues.data.value,
                                fase: oportValues.fase.value,
                                desc: oportValues.desc.value,
                                narrativa: oportValues.narrativa.value
                              })
                            );
                          }}
                          tag="li"
                        >
                          <Link
                            to={`/timeline/cliente/followUps/${cliId}/${campId}`}
                          >
                            <DropdownItem
                              style={{ paddingLeft: "3%" }}
                              className="nav-item"
                            >
                              <Timeline
                                style={{ float: "left", marginRight: "3%" }}
                                fontSize="small"
                              />
                              <p style={{ paddingTop: "0.5%" }}>Timeline</p>
                            </DropdownItem>
                          </Link>{" "}
                        </NavLink>
                        <NavLink onClick={() => setIsOpenInfo(true)} tag="li">
                          <DropdownItem
                            style={{ paddingLeft: "3%" }}
                            className="nav-item"
                          >
                            <FormatListBulleted
                              style={{ float: "left", marginRight: "3%" }}
                              fontSize="small"
                            />
                            <p style={{ paddingTop: "0.5%" }}>Informações</p>
                          </DropdownItem>
                        </NavLink>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <h3 style={{ marginBottom: 0 }}>Follow Up</h3>
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
                          <Label>Cargo</Label>
                          <FormGroup className="has-label">
                            <Input
                              disabled
                              defaultValue={contValues.cargo.value}
                              name="cargo"
                              id="cargo"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Email</Label>
                          <FormGroup className="has-label">
                            <Input
                              disabled
                              defaultValue={contValues.email.value}
                              name="email"
                              id="email"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Celular</Label>
                          <FormGroup className="has-label">
                            <Input
                              disabled
                              defaultValue={contValues.cel.value}
                              name="celular"
                              id="celular"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Telefone</Label>
                          <FormGroup className="has-label">
                            <Input
                              disabled
                              defaultValue={contValues.fone.value}
                              name="telefone"
                              id="telefone"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Ramal</Label>
                          <FormGroup className="has-label">
                            <Input
                              disabled
                              defaultValue={contValues.ramal.value}
                              name="ramal"
                              id="ramal"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Skype</Label>
                          <FormGroup className="has-label">
                            <Input
                              disabled
                              defaultValue={contValues.skype.value}
                              name="skype"
                              id="skype"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
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
                              <option value={4}>Iniciar Contato</option>
                              <option value={1}>Retornar Contato</option>
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
                        <Col hidden={values.proxPasso.value !== "10"} md="4">
                          <Label>Motivo</Label>
                          <FormGroup className="has-label ">
                            <Input
                              hidden={values.proxPasso.value !== "10"}
                              name="CliContId"
                              type="select"
                              onChange={event =>
                                handleChange(event, "motivo", "text")
                              }
                              placeholder="Selecione o Motivo"
                            >
                              {" "}
                              <option value=""> Selecione o Motivo </option>
                              {data7.map((motivo, index) => {
                                return (
                                  <option key={index} value={motivo.id}>
                                    {" "}
                                    {motivo.nome} - {motivo.valor}{" "}
                                  </option>
                                );
                              })}
                            </Input>
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
                                placeholder={
                                  meetingValues.date.value === ""
                                    ? "Agendar Reunião"
                                    : `${meetingValues.date.value} | ${meetingValues.startTime.value} |${meetingValues.endTime.value}`
                                }
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
