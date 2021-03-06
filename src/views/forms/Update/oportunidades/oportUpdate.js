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
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";
import Tooltip from "@material-ui/core/Tooltip";
import {
  AssignmentInd,
  CreditCard,
  LocalOffer,
  Timeline
} from "@material-ui/icons";
import { normalizeCnpj } from "~/normalize";
import { store } from "~/store";
import { oportUpdate } from "~/store/modules/oportunidades/actions";
import api from "~/services/api";

/* eslint-disable eqeqeq */
export default function UpdateOport() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const firstRender = useRef(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    ColabId: { value: "", error: "", message: "" },
    ClienteId: { value: "", error: "", message: "" },
    UndNegId: { value: "", error: "", message: "" },
    RecDespId: { value: "", error: "", message: "" },
    segmetId: { value: "", error: "", message: "" },
    RepresentanteId: { value: "", error: "", message: "" },
    contato: { value: "", error: "", message: "" },
    data: { value: "", error: "", message: "" },
    fase: { value: 1, error: "", message: "" },
    cod: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" }
  };
  const optionalSchema = {
    narrativa: { value: "", error: "", message: "" }
  };
  const [optional, setOptional] = useState(optionalSchema);
  const [values, setValues] = useState(stateSchema);
  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      setIsLoading(true);
      const response = await api.get(`/empresa/${empresa}`);
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
      setData1(response1.data);
      setData2(response2.data);
      setData3(response3.data);
      setData4(response4.data);
      setData5(response5.data);
      setData6(response6.data);
      setData7(response7.data);
      setData(response.data);

      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response8.data.empresaId },
        ColabId: { value: response8.data.ColabId },
        data: { value: response8.data.data },
        fase: { value: response8.data.fase },
        ClienteId: { value: response8.data.ClienteId },
        contato: { value: response8.data.contato },
        cod: { value: response8.data.cod },
        UndNegId: { value: response8.data.UndNegId },
        RecDespId: { value: response8.data.RecDespId },
        segmetId: { value: response8.data.segmetId },
        RepresentanteId: { value: response8.data.RepresentanteId },
        desc: { value: response8.data.desc }
      }));
      setOptional(prevState => ({
        ...prevState,
        narrativa: { value: response8.data.narrativa }
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
        setOptional(prevState => ({
          ...prevState,
          [name]: { value: target }
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

  function checkAprovada(fase) {
    if (fase == 4 && firstRender.current) {
      return (
        <>
          <Link to={`/tabelas/oportunidade/recurso/${id}`}>
            <Tooltip title="Recurso" placement="top" interactive>
              <Button
                style={{ float: "right" }}
                color="default"
                size="sm"
                className={classNames("btn-icon btn-link like")}
              >
                <AssignmentInd />
              </Button>
            </Tooltip>
          </Link>

          <Link to={`/tabelas/oportunidade/parcela/${id}`}>
            <Tooltip title="Parcelas" placement="top" interactive>
              <Button
                style={{ float: "right" }}
                color="default"
                size="sm"
                className={classNames("btn-icon btn-link like")}
              >
                <CreditCard />
              </Button>
            </Tooltip>
          </Link>
          <Link to={`/view/oportunidade/dados/${id}`}>
            <Tooltip title="Resultados" placement="top" interactive>
              <Button
                style={{ float: "right" }}
                color="default"
                size="sm"
                className={classNames("btn-icon btn-link like")}
              >
                <Timeline />
              </Button>
            </Tooltip>
          </Link>
        </>
      );
    }
  }

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
          optional.narrativa.value
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
        <> </>
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
                    {checkAprovada(values.fase.value)}

                    <Link to={`/tabelas/oportunidade/cotacao/${id}`}>
                      <Tooltip title="Cotação" placement="top" interactive>
                        <Button
                          style={{ float: "right" }}
                          color="default"
                          size="sm"
                          className={classNames("btn-icon btn-link like")}
                        >
                          <LocalOffer />
                        </Button>
                      </Tooltip>
                    </Link>

                    <CardTitle tag="h4">Edição de Oportunidade</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Label>Empresa</Label>
                      <FormGroup
                        className={`has-label ${values.empresaId.error}`}
                      >
                        <Input
                          disabled
                          name="EmpresaId"
                          type="select"
                          onChange={event =>
                            handleChange(event, "empresaId", "text")
                          }
                          value={values.empresaId.value}
                        >
                          {" "}
                          <option value={1}>
                            {" "}
                            {data.nome} - {normalizeCnpj(data.idFederal)}
                          </option>
                        </Input>
                        {values.empresaId.error === "has-danger" ? (
                          <Label className="error">
                            {values.empresaId.message}
                          </Label>
                        ) : null}
                      </FormGroup>
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
                          <p
                            style={{
                              paddingTop: 27,
                              paddingLeft: 47,
                              marginRight: 5,
                              fontSize: 30,
                              float: "right",
                              fontStyle: "sans-serif"
                            }}
                          >
                            {checkFase(values.fase.value)}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Cliente</Label>
                          <FormGroup
                            className={`has-label ${values.ClienteId.error}`}
                          >
                            <Input
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
                          <Label>Contato</Label>
                          <FormGroup
                            className={`has-label ${values.contato.error}`}
                          >
                            <Input
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
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Unidade de Negócio</Label>
                          <FormGroup
                            className={`has-label ${values.UndNegId.error}`}
                          >
                            <Input
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
                            className={`has-label ${optional.narrativa.error}`}
                          >
                            <Input
                              name="narrativa"
                              type="textarea"
                              onChange={event =>
                                handleChange(event, "narrativa", "optional")
                              }
                              value={optional.narrativa.value}
                            />{" "}
                            {optional.narrativa.error === "has-danger" ? (
                              <Label className="error">
                                {optional.narrativa.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Link to="/tabelas/oportunidade/oport">
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
      )}
    </>
  );
}
