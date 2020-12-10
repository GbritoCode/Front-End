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
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import classNames from "classnames";
import Tooltip from "@material-ui/core/Tooltip";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { AttachMoney, Contacts } from "@material-ui/icons";
import { normalizeCnpj } from "~/normalize";
import { store } from "~/store";
import { ClienteUpdate } from "~/store/modules/Cliente/actions";

/* eslint-disable eqeqeq */
function ClienteUpdatee(props) {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const dispatch = useDispatch();
  const { prct } = useParams();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cnpj: { value: "", error: "", message: "" },
    rzSoc: { value: "", error: "", message: "" },
    nomeAbv: { value: "", error: "", message: "" },
    representante: { value: "", error: "", message: "" },
    tipoComiss: { value: "", error: "", message: "" }
  };
  const optionalSchema = {
    fantasia: { value: "", error: "", message: "" }
  };
  const [optional, setOptional] = useState(optionalSchema);
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:5140/cliente/${id}`);
      const response1 = await axios(`http://localhost:5140/tipoComiss`);
      const response2 = await axios(`http://localhost:5140/representante`);
      const response3 = await axios(`http://localhost:5140/empresa/${empresa}`);
      setData1(response1.data);
      setData2(response2.data);
      setData3(response3.data);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.EmpresaId },
        cnpj: { value: normalizeCnpj(response.data.CNPJ) },
        nomeAbv: { value: response.data.nomeAbv },
        representante: { value: response.data.RepresentanteId },
        tipoComiss: { value: response.data.TipoComisseId },
        rzSoc: { value: response.data.rzSoc },
        fantasia: { value: response.data.fantasia }
      }));

      setIsLoading(false);
    }
    loadData();
  }, [id]);
  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj == "") return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj === "00000000000000" ||
      cnpj === "11111111111111" ||
      cnpj === "22222222222222" ||
      cnpj === "33333333333333" ||
      cnpj === "44444444444444" ||
      cnpj === "55555555555555" ||
      cnpj === "66666666666666" ||
      cnpj === "77777777777777" ||
      cnpj === "88888888888888" ||
      cnpj === "99999999999999"
    )
      return false;

    // Valida DVs
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }

  const renderCnpjState = value => {
    if (!validarCNPJ(value)) {
      setValues(prevState => ({
        ...prevState,
        cnpj: {
          error: "has-danger",
          message: "Insira um CNPJ válido"
        }
      }));
    } else {
      setValues(prevState => ({
        ...prevState,
        cnpj: { value, error: "has-success", message: "" }
      }));
    }
  };

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

      case "cnpj":
        setValues(prevState => ({
          ...prevState,
          cnpj: { value: normalizeCnpj(target) }
        }));
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
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  function checkProsp(param) {
    if (param == "true") {
      return (
        <>
          <Link to={`/tabelas/cliente/comp/${id}`}>
            <Tooltip title="Complemento" placement="top" interactive>
              <Button
                style={{ float: "right" }}
                color="default"
                size="sm"
                className={classNames("btn-icon btn-link like")}
              >
                <EventNoteIcon />
              </Button>
            </Tooltip>
          </Link>
          <Link to={`/tabelas/cliente/rec_desp/${id}`}>
            <Tooltip title="Receita" placement="top" interactive>
              <Button
                style={{ float: "right" }}
                color="default"
                size="sm"
                className={classNames("btn-icon btn-link like")}
              >
                <AttachMoney />
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
        ClienteUpdate(
          id,
          values.nomeAbv.value,
          values.rzSoc.value,
          optional.fantasia.value,
          values.representante.value,
          values.tipoComiss.value,
          values.empresaId.value
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
        <div> </div>
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
                    {checkProsp(prct)}

                    <Link to={`/tabelas/cliente/cont/${id}`}>
                      <Tooltip title="Contato" placement="top" interactive>
                        <Button
                          style={{ float: "right" }}
                          color="default"
                          size="sm"
                          className={classNames("btn-icon btn-link like")}
                        >
                          <Contacts />
                        </Button>
                      </Tooltip>
                    </Link>
                    <CardTitle tag="h4">Edição do cliente</CardTitle>
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
                            {data3.nome} - {normalizeCnpj(data3.idFederal)}
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
                          <Label>CNPJ</Label>
                          <FormGroup
                            className={`has-label ${values.cnpj.error}`}
                          >
                            <Input
                              disabled
                              maxLength={18}
                              name="cnpj"
                              type="text"
                              onChange={event =>
                                handleChange(event, "cnpj", "cnpj")
                              }
                              value={values.cnpj.value}
                              onBlur={e => {
                                const { value } = e.target;
                                renderCnpjState(value);
                              }}
                            />

                            {values.cnpj.error === "has-danger" ? (
                              <Label className="error">
                                {values.cnpj.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Razão Social</Label>
                          <FormGroup
                            className={`has-label ${values.rzSoc.error}`}
                          >
                            <Input
                              disabled
                              id="rzSoc"
                              name="rzSoc"
                              type="text"
                              onChange={event =>
                                handleChange(event, "rzSoc", "text")
                              }
                              value={values.rzSoc.value}
                            />
                            {values.rzSoc.error === "has-danger" ? (
                              <Label className="error">
                                {values.rzSoc.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Nome Fanasia</Label>
                          <FormGroup
                            className={`has-label ${optional.fantasia.error}`}
                          >
                            <Input
                              disabled
                              onChange={event =>
                                handleChange(event, "fantasia", "optional")
                              }
                              value={optional.fantasia.value}
                              name="nomeAbv"
                              type="text"
                            />
                            {optional.fantasia.error === "has-danger" ? (
                              <Label className="error">
                                {optional.fantasia.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="4">
                          <Label>Nome Abreviado</Label>
                          <FormGroup
                            className={`has-label ${values.nomeAbv.error}`}
                          >
                            <Input
                              disabled
                              name="name_abv"
                              type="text"
                              onChange={event =>
                                handleChange(event, "nomeAbv", "text")
                              }
                              value={values.nomeAbv.value}
                            />
                            {values.nomeAbv.error === "has-danger" ? (
                              <Label className="error">
                                {values.nomeAbv.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Representante</Label>
                          <FormGroup
                            className={`has-label ${values.representante.error}`}
                          >
                            <Input
                              name="representante"
                              type="select"
                              onChange={event =>
                                handleChange(event, "representante", "text")
                              }
                              value={values.representante.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o representante{" "}
                              </option>
                              {data2.map(representante => (
                                <option value={representante.id}>
                                  {" "}
                                  {representante.nome}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.representante.error === "has-danger" ? (
                              <Label className="error">
                                {values.representante.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Tipo Comissão</Label>
                          <FormGroup
                            className={`has-label ${values.tipoComiss.error}`}
                          >
                            <Input
                              name="tipoComiss"
                              type="select"
                              onChange={event =>
                                handleChange(event, "tipoComiss", "text")
                              }
                              value={values.tipoComiss.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o tipo de comissão{" "}
                              </option>
                              {data1.map(tipoComiss => (
                                <option value={tipoComiss.id}>
                                  {" "}
                                  {tipoComiss.id} - {tipoComiss.desc}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.tipoComiss.error === "has-danger" ? (
                              <Label className="error">
                                {values.tipoComiss.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Link to="/tabelas/cliente/cliente">
                        <Button
                          style={{
                            paddingLeft: 32,
                            paddingRight: 33
                          }}
                          color="secundary"
                          size="small"
                          className="text-left"
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
export default ClienteUpdatee;
