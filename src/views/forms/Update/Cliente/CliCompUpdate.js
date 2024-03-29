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
import React, { useRef, useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { CliCompUpdate } from "~/store/modules/Cliente/actions";
import { normalizeCnpj } from "~/normalize";
import api from "~/services/api";

export default function CliCompUpdatee() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const stateSchema = {
    id: { value: "", error: "", message: "" },
    CondPgmtoId: { value: "", error: "", message: "" },
    cep: { value: "", error: "", message: "" },
    rua: { value: "", error: "", message: "" },
    numero: { value: "", error: "", message: "" },
    bairro: { value: "", error: "", message: "" },
    cidade: { value: "", error: "", message: "" },
    uf: { value: "", error: "", message: "" },
    inscMun: { value: "", error: "", message: "" },
    inscEst: { value: "", error: "", message: "" }
  };
  const optionalSchema = {
    complemento: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);

  const dispatch = useDispatch();
  const { id, prospect } = useParams();
  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/cliente/complem/1/${id}`);
      const response1 = await api.get(`/condPgmto`);
      const response2 = await api.get(`/cliente/${response.data.ClienteId}`);
      setData1(response1.data);
      setData2(response2.data);
      setValues(prevState => ({
        ...prevState,
        id: { value: response.data.id },
        ClienteId: { value: response.data.ClienteId },
        CondPgmtoId: { value: response.data.CondPgmtoId },
        cep: { value: response.data.cep },
        rua: { value: response.data.rua },
        numero: { value: response.data.numero },
        bairro: { value: response.data.bairro },
        cidade: { value: response.data.cidade },
        uf: { value: response.data.uf },
        inscMun: { value: response.data.inscMun },
        inscEst: { value: response.data.inscEst }
      }));
      setOptional(prevState => ({
        ...prevState,
        complemento: { value: response.data.complemento }
      }));
      setIsLoading(false);
    }
    loadData();
  }, [id]);

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
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
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
        CliCompUpdate(
          values.id.value,
          values.ClienteId.value,
          values.CondPgmtoId.value,
          values.cep.value,
          values.rua.value,
          values.numero.value,
          values.bairro.value,
          values.cidade.value,
          values.uf.value,
          values.inscMun.value,
          values.inscEst.value
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
                    <h3 style={{ marginBottom: 0 }}>
                      {prospect === "true"
                        ? "Complemento de Prospect"
                        : "Complemento de Cliente"}
                    </h3>
                    <p style={{ fontSize: 11 }}>{data2.rzSoc}</p>
                    <p style={{ fontSize: 11 }}>{normalizeCnpj(data2.CNPJ)}</p>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <Label>CEP</Label>
                          <FormGroup
                            className={`has-label ${values.cep.error}`}
                          >
                            <Input
                              disabled
                              onChange={event =>
                                handleChange(event, "cep", "text")
                              }
                              value={values.cep.value}
                              name="cep"
                              type="text"
                            />
                            {values.cep.error === "has-danger" ? (
                              <Label className="error">
                                {values.cep.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Rua</Label>
                          <FormGroup
                            className={`has-label ${values.rua.error}`}
                          >
                            <Input
                              disabled
                              onChange={event =>
                                handleChange(event, "rua", "text")
                              }
                              value={values.rua.value}
                              name="rua"
                              type="text"
                            />
                            {values.rua.error === "has-danger" ? (
                              <Label className="error">
                                {values.rua.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>

                        <Col md="4">
                          <Label>Número</Label>
                          <FormGroup
                            className={`has-label ${values.numero.error}`}
                          >
                            <Input
                              disabled
                              onChange={event =>
                                handleChange(event, "numero", "number")
                              }
                              value={values.numero.value}
                              name="numero"
                              type="numeric"
                            />
                            {values.numero.error === "has-danger" ? (
                              <Label className="error">
                                {values.numero.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="8">
                          <Label>Complemento</Label>
                          <FormGroup
                            className={`has-label ${optional.complemento.error}`}
                          >
                            <Input
                              onChange={event =>
                                handleChange(event, "complemento", "optional")
                              }
                              value={optional.complemento.value}
                              name="nomeAbv"
                              type="text"
                            />
                            {optional.complemento.error === "has-danger" ? (
                              <Label className="error">
                                {optional.complemento.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Bairro</Label>
                          <FormGroup
                            className={`has-label ${values.bairro.error}`}
                          >
                            <Input
                              disabled
                              onChange={event =>
                                handleChange(event, "bairro", "text")
                              }
                              value={values.bairro.value}
                              name="bairro"
                              type="text"
                            />
                            {values.bairro.error === "has-danger" ? (
                              <Label className="error">
                                {values.bairro.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Cidade</Label>
                          <FormGroup
                            className={`has-label ${values.cidade.error}`}
                          >
                            <Input
                              disabled
                              onChange={event =>
                                handleChange(event, "cidade", "text")
                              }
                              value={values.cidade.value}
                              name="cidade"
                              type="text"
                            />
                            {values.cidade.error === "has-danger" ? (
                              <Label className="error">
                                {values.cidade.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>UF</Label>
                          <FormGroup className={`has-label ${values.uf.error}`}>
                            <Input
                              disabled
                              onChange={event =>
                                handleChange(event, "uf", "text")
                              }
                              value={values.uf.value}
                              name="uf"
                              type="text"
                            />
                            {values.uf.error === "has-danger" ? (
                              <Label className="error">
                                {values.uf.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Inscrição Municipal</Label>
                          <FormGroup
                            className={`has-label ${values.inscMun.error}`}
                          >
                            <Input
                              onChange={event =>
                                handleChange(event, "inscMun", "text")
                              }
                              value={values.inscMun.value}
                              name="inscMun"
                              type="numeric"
                            />
                            {values.inscMun.error === "has-danger" ? (
                              <Label className="error">
                                {values.inscMun.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Inscrição Estadual</Label>
                          <FormGroup
                            className={`has-label ${values.inscEst.error}`}
                          >
                            <Input
                              onChange={event =>
                                handleChange(event, "inscEst", "text")
                              }
                              value={values.inscEst.value}
                              name="inscEst"
                              type="numeric"
                            />
                            {values.inscEst.error === "has-danger" ? (
                              <Label className="error">
                                {values.inscEst.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Condição de Pagamento</Label>
                          <FormGroup
                            className={`has-label ${values.CondPgmtoId.error}`}
                          >
                            <Input
                              name="CondPgmtoId"
                              type="select"
                              onChange={event =>
                                handleChange(event, "CondPgmtoId", "text")
                              }
                              value={values.CondPgmtoId.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione a condição de pagamento{" "}
                              </option>
                              {data1.map(condPgmto => (
                                <option value={condPgmto.id}>
                                  {condPgmto.cod} - {condPgmto.desc}
                                </option>
                              ))}
                            </Input>
                            {values.CondPgmtoId.error === "has-danger" ? (
                              <Label className="error">
                                {values.CondPgmtoId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4" />
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
                        to={`/cliente_update/${values.ClienteId.value}/${prospect}`}
                      >
                        <Button
                          style={{
                            paddingLeft: 32,
                            paddingRight: 33,
                            float: "left"
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
