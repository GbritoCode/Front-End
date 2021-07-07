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

export default function CadastroFollowUps() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { cliId, campId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [modalMini, setModalMini] = useState(false);
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

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

  const [values, setValues] = useState(stateSchema);
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
                  O cliente {data2.nomeAbv} será encerrado na campanha{" "}
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
                >
                  Sim
                </Button>
              </div>
            </Modal>
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
                          <Label>Responsável</Label>
                          <FormGroup className="has-label">
                            <InputGroup>
                              <Input
                                disabled
                                name="ColabId"
                                type="text"
                                onChange={event =>
                                  handleChange(event, "ColabId", "text")
                                }
                                placeholder="Selecione o Responsável"
                              />
                              <InputGroupAddon
                                className="appendCustom"
                                addonType="append"
                              >
                                <Button
                                  className={classNames(
                                    "btn-icon btn-link like addon"
                                  )}
                                  // onClick={() => setIsOpenColab(!isOpenColab)}
                                >
                                  <i className="tim-icons icon-zoom-split addon" />
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
