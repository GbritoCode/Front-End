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
  Label,
  Form,
  Input,
  FormGroup,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { Link, useParams } from "react-router-dom";
import {
  AssignmentInd,
  CreditCard,
  LocalOffer,
  PostAdd,
  Timeline
} from "@material-ui/icons";
import { isAfter, isBefore, isToday, parseISO } from "date-fns";
import { normalizeCnpj, pt_brDateToEUADate } from "~/normalize";
import { oportUpdate } from "~/store/modules/oportunidades/actions";
import api from "~/services/api";

/* eslint-disable eqeqeq */
export default function UpdateOport() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const firstRender = useRef(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [disabledField, setDisabledField] = useState();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [data8, setData8] = useState({});
  const [data9, setData9] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    ColabId: { value: "", error: "", message: "" },
    ClienteId: { value: "", error: "", message: "" },
    UndNegId: { value: "", error: "", message: "" },
    RecDespId: { value: "", error: "", message: "" },
    segmetId: { value: "", error: "", message: "" },
    RepresentanteId: { value: "", error: "", message: "" },
    CampanhaId: { value: "", error: "", message: "", optional: true },
    contato: { value: "", error: "", message: "" },
    data: { value: "", error: "", message: "" },
    fase: { value: 1, error: "", message: "" },
    cod: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" },
    narrativa: { value: "", error: "", message: "", optional: true }
  };
  const [values, setValues] = useState(stateSchema);
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response2 = await api.get(`/cliente/`);
      const response4 = await api.get(`/und_neg/`);
      const response5 = await api.get(`/rec_desp/`);
      const response6 = await api.get(`/segmento/`);
      const response7 = await api.get(`/representante/`);
      const response8 = await api.get(`/oportunidade/${id}`);
      const response1 = await api.get(`/colab/${response8.data.ColabId}`);
      const response3 = await api.get(
        `/cliente/cont/${response8.data.ClienteId}`
      );
      setDisabledField(response8.data.fase >= 5);
      setData1(response1.data);
      setData2(response2.data);
      setData3(response3.data);
      setData4(response4.data);
      setData5(response5.data);
      setData6(response6.data);
      setData7(response7.data);
      setData8(response8.data);
      setData9(
        response2.data
          .find(arr => arr.id === response8.data.ClienteId)
          .Campanhas.filter(
            arr =>
              (isAfter(
                new Date(),
                parseISO(pt_brDateToEUADate(arr.dataInic))
              ) ||
                isToday(parseISO(pt_brDateToEUADate(arr.dataFim)))) &&
              isBefore(new Date(), parseISO(pt_brDateToEUADate(arr.dataFim)))
          )
      );
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response8.data.empresaId },
        ColabId: { value: response8.data.ColabId },
        data: { value: response8.data.data },
        fase: { value: response8.data.fase },
        ClienteId: { value: response8.data.ClienteId },
        CampanhaId: { value: response8.data.CampanhaId },
        contato: { value: response8.data.contato },
        cod: { value: response8.data.cod },
        UndNegId: { value: response8.data.UndNegId },
        RecDespId: { value: response8.data.RecDespId },
        segmetId: { value: response8.data.segmetId },
        RepresentanteId: { value: response8.data.RepresentanteId },
        desc: { value: response8.data.desc },
        narrativa: { value: response8.data.narrativa, optional: true }
      }));

      setIsLoading(false);
      firstRender.current = false;
    }
    loadData();
  }, [id]);

  const checkFase = value => {
    if (value == 1) {
      return "Aberta";
    }
    if (value == 2) {
      return "Em Cotação";
    }
    if (value == 3) {
      return "Cotada";
    }
    if (value == 4) {
      return "Aprovada";
    }
    if (value == 5) {
      return "Reprovada";
    }
    if (value == 6) {
      return "Finalizada";
    }
  };
  function getContato(cliente) {
    api.get(`/cliente/cont/${cliente}`).then(result => {
      setData3(result.data);
    });
    api.get(`/cliente/${cliente}`).then(result => {
      setValues(prevState => ({
        ...prevState,
        RepresentanteId: { value: result.data.RepresentanteId }
      }));
    });
  }

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
        oportUpdate(
          id,
          values.empresaId.value,
          values.ColabId.value,
          values.ClienteId.value,
          values.UndNegId.value,
          values.RecDespId.value,
          values.segmetId.value,
          values.RepresentanteId.value,
          values.contato.value,
          values.data.value,
          values.fase.value,
          values.cod.value,
          values.desc.value,
          values.narrativa.value
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
          <div className="content" />{" "}
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
                        <NavLink tag="li">
                          <Link to={`/tabelas/oportunidade/cotacao/${id}`}>
                            <DropdownItem
                              style={{ paddingLeft: "3%" }}
                              className="nav-item"
                            >
                              <LocalOffer
                                style={{ float: "left", marginRight: "3%" }}
                                fontSize="small"
                              />
                              <p style={{ paddingTop: "2%" }}>Cotação </p>
                            </DropdownItem>
                          </Link>
                        </NavLink>
                        <NavLink
                          hidden={
                            !(
                              (values.fase.value == 4 ||
                                values.fase.value >= 5) &&
                              firstRender.current
                            )
                          }
                          tag="li"
                        >
                          <Link to={`/tabelas/oportunidade/recurso/${id}`}>
                            <DropdownItem
                              style={{ paddingLeft: "3%" }}
                              className="nav-item"
                            >
                              <AssignmentInd
                                style={{ float: "left", marginRight: "3%" }}
                                fontSize="small"
                              />
                              <p style={{ paddingTop: "2%" }}>Recursos</p>
                            </DropdownItem>
                          </Link>
                        </NavLink>

                        <NavLink
                          hidden={
                            !(
                              (values.fase.value == 4 ||
                                values.fase.value >= 5) &&
                              firstRender.current
                            )
                          }
                          tag="li"
                        >
                          <Link to={`/tabelas/oportunidade/parcela/${id}`}>
                            <DropdownItem
                              style={{ paddingLeft: "3%" }}
                              className="nav-item"
                            >
                              <CreditCard
                                style={{ float: "left", marginRight: "3%" }}
                                fontSize="small"
                              />
                              <p style={{ paddingTop: "2%" }}>Parcelas</p>
                            </DropdownItem>
                          </Link>
                        </NavLink>

                        <NavLink
                          hidden={
                            !(
                              (values.fase.value == 4 ||
                                values.fase.value >= 5) &&
                              firstRender.current
                            )
                          }
                          tag="li"
                        >
                          <Link to={`/view/oportunidade/dados/${id}`}>
                            <DropdownItem
                              style={{ paddingLeft: "3%" }}
                              className="nav-item"
                            >
                              <Timeline
                                style={{ float: "left", marginRight: "3%" }}
                                fontSize="small"
                              />
                              <p style={{ paddingTop: "2%" }}>Resultados</p>
                            </DropdownItem>
                          </Link>
                        </NavLink>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <h3 style={{ marginBottom: 0 }}>Oportunidade</h3>
                    <p style={{ fontSize: 14 }}>
                      {checkFase(values.fase.value)}
                    </p>{" "}
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <Label>Cliente</Label>
                          <FormGroup
                            className={`has-label ${values.ClienteId.error}`}
                          >
                            <Input
                              disabled
                              name="ClienteId"
                              type="select"
                              onChange={event =>
                                handleChange(event, "ClienteId", "text")
                              }
                              value={values.ClienteId.value}
                              onChangeCapture={e => getContato(e.target.value)}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o cliente{" "}
                              </option>
                              {data2.map(ClienteId => (
                                <option value={ClienteId.id}>
                                  {" "}
                                  {ClienteId.nomeAbv} -{" "}
                                  {normalizeCnpj(ClienteId.CNPJ)}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.ClienteId.error === "has-danger" ? (
                              <Label className="error">
                                {values.ClienteId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
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
                              disabled={disabledField}
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
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Contato</Label>
                          <FormGroup
                            className={`has-label ${values.contato.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="contato"
                              type="select"
                              onChange={event =>
                                handleChange(event, "contato", "text")
                              }
                              value={values.contato.value}
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
                            {values.contato.error === "has-danger" ? (
                              <Label className="error">
                                {values.contato.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Representante</Label>
                          <FormGroup
                            className={`has-label ${values.RepresentanteId.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="RepresentanteId"
                              type="select"
                              onChange={event =>
                                handleChange(event, "RepresentanteId", "text")
                              }
                              value={values.RepresentanteId.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o representante{" "}
                              </option>
                              {data7.map(RepresentanteId => (
                                <option value={RepresentanteId.id}>
                                  {" "}
                                  {RepresentanteId.id} - {RepresentanteId.nome}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.RepresentanteId.error === "has-danger" ? (
                              <Label className="error">
                                {values.RepresentanteId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Campanha</Label>
                          <FormGroup
                            className={`has-label ${values.CampanhaId.error}`}
                          >
                            <Input
                              name="CampanhaId"
                              type="select"
                              onChange={event =>
                                handleChange(event, "CampanhaId", "optional")
                              }
                              value={values.CampanhaId.value}
                            >
                              {" "}
                              <option value=""> Selecione a Campanha </option>
                              {data9.map(camp => (
                                <option value={camp.id}>
                                  {" "}
                                  {camp.cod} - {camp.desc}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.RepresentanteId.error === "has-danger" ? (
                              <Label className="error">
                                {values.RepresentanteId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Unidade de Negócio</Label>
                          <FormGroup
                            className={`has-label ${values.UndNegId.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="UndNegId"
                              type="select"
                              onChange={event =>
                                handleChange(event, "UndNegId", "text")
                              }
                              value={values.UndNegId.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione a unidade de negócio{" "}
                              </option>
                              {data4.map(UndNegId => (
                                <option value={UndNegId.id}>
                                  {" "}
                                  {UndNegId.id} - {UndNegId.descUndNeg}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.UndNegId.error === "has-danger" ? (
                              <Label className="error">
                                {values.UndNegId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Receita</Label>
                          <FormGroup
                            className={`has-label ${values.RecDespId.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="RecDespId"
                              type="select"
                              onChange={event =>
                                handleChange(event, "RecDespId", "text")
                              }
                              value={values.RecDespId.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o tipo de receita{" "}
                              </option>
                              {data5.map(RecDespId => (
                                <option value={RecDespId.id}>
                                  {" "}
                                  {RecDespId.id} - {RecDespId.desc}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.RecDespId.error === "has-danger" ? (
                              <Label className="error">
                                {values.RecDespId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Segmento</Label>
                          <FormGroup
                            className={`has-label ${values.segmetId.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="segmetId"
                              type="select"
                              onChange={event =>
                                handleChange(event, "segmetId", "text")
                              }
                              value={values.segmetId.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o segmento{" "}
                              </option>
                              {data6.map(segmetId => (
                                <option value={segmetId.id}>
                                  {" "}
                                  {segmetId.id} - {segmetId.descSegmt}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.segmetId.error === "has-danger" ? (
                              <Label className="error">
                                {values.segmetId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Código</Label>
                          <FormGroup
                            className={`has-label ${values.cod.error}`}
                          >
                            <Input
                              disabled
                              name="cod"
                              type="text"
                              onChange={event =>
                                handleChange(event, "cod", "text")
                              }
                              value={values.cod.value}
                            />{" "}
                            {values.cod.error === "has-danger" ? (
                              <Label className="error">
                                {values.cod.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="8">
                          <Label>Descrição</Label>
                          <FormGroup
                            className={`has-label ${values.desc.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="desc"
                              type="text"
                              onChange={event =>
                                handleChange(event, "desc", "text")
                              }
                              value={values.desc.value}
                            />{" "}
                            {values.desc.error === "has-danger" ? (
                              <Label className="error">
                                {values.desc.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>Narrativa</Label>
                          <FormGroup
                            className={`has-label ${values.narrativa.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="narrativa"
                              type="textarea"
                              onChange={event =>
                                handleChange(event, "narrativa", "optional")
                              }
                              value={values.narrativa.value}
                            />{" "}
                            {values.narrativa.error === "has-danger" ? (
                              <Label className="error">
                                {values.narrativa.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Link
                        to={
                          data8.fase < 5
                            ? "/tabelas/oportunidade/oport"
                            : "/tabelas/oportunidade/finOport"
                        }
                      >
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
                      {data8.fase >= 5 ? (
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
