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
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { oportRequest } from "~/store/modules/oportunidades/actions";
import { store } from "~/store";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import { normalizeCnpj } from "normalize.js";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
export default function CadastroOport() {
  //--------- colocando no modo claro do template
  let jsonpAdapter = require("axios-jsonp");
  document.body.classList.add("white-content");
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const empresa = store.getState().auth.empresa;
  const email = store.getState().auth.user.email;
  const codAux = new Date()

  let [date, month, year] = new Date().toLocaleDateString("pt-BR").split("/")

  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    colabId: { value: "", error: "", message: "" },
    clienteId: { value: "", error: "", message: "" },
    UndNegId: { value: "", error: "", message: "" },
    itmControleId: { value: "", error: "", message: "" },
    segmetId: { value: "", error: "", message: "" },
    representanteId: { value: "", error: "", message: "" },
    contato: { value: "", error: "", message: "" },
    data: { value: year + "-" + month + "-" + date, error: "", message: "" },
    fase: { value: 1, error: "", message: "" },
    cod: { value: "", error: "", message: "" },
    //cod: { value: 1234, error: "", message: "" },
    desc: { value: "", error: "", message: "" },
  };
  const optionalSchema = {
    narrativa: { value: "", error: "", message: "" },
  }
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:51314/empresa/${empresa}`);
      const response1 = await axios(`http://localhost:51314/colab/?email=${email}`);
      const response2 = await axios(`http://localhost:51314/cliente/`);
      const response4 = await axios(`http://localhost:51314/und_neg/`);
      const response5 = await axios(`http://localhost:51314/itm_controle/`);
      const response6 = await axios(`http://localhost:51314/segmento/`);
      const response7 = await axios(`http://localhost:51314/representante/`);
      const response8 = await axios(`http://localhost:51314/oportunidade/?one=true`)
      setData1(response1.data);
      setData2(response2.data);
      setData4(response4.data);
      setData5(response5.data);
      setData6(response6.data);
      setData7(response7.data);
      setData(response.data);
      if (response8.data.length !== 0) {
        var zerofilled = ('0000' + (response8.data[0].id + 1)).slice(-4);
      } else {
        var zerofilled = ('0000' + 1).slice(-4);
      }
      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response.data.id },
      }));
      setValues((prevState) => ({
        ...prevState,
        colabId: { value: response1.data.id },
      }));
      setValues((prevState) => ({
        ...prevState,
        cod: { value: "A" + JSON.stringify(codAux.getYear()) + JSON.stringify(codAux.getMonth() + 1) + "-" + zerofilled },
      }));
      setIsLoading(false);
    }
    loadData();
  }, []);
  function getCliData(cliente) {
    axios(`http://localhost:51314/cliente/cont/${cliente}`).then((result) => { setData3(result.data); })
    axios(`http://localhost:51314/cliente/${cliente}`).then((result) => {
      setValues((prevState) => ({
        ...prevState,
        representanteId: { value: result.data.RepresentanteId },
      }));
    })
  }

  var options = {};
  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };
  const handleChange = (event, name, type) => {
    event.persist();
    let target = event.target.value;
    switch (type) {
      case "number":
        if (verifyNumber(target)) {
          setValues((prevState) => ({
            ...prevState,
            [name]: { value: target, error: "has-success" },
          }));
        } else {
          setValues((prevState) => ({
            ...prevState,
            [name]: {
              value: target,
              error: "has-danger",
              message: "Insira um número válido",
            },
          }));
        }
        break;
      case "optional":
        setOptional((prevState) => ({
          ...prevState,
          [name]: { value: target },
        }));
        break
      case "text":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: target },
        }));
    }
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    var aux = Object.entries(values);
    const tamanho = aux.length;

    for (let i = 0; i < tamanho; i++) {
      if (!(aux[i][1].error === "has-danger")) {
        var valid = true;
      } else {
        var valid = false;
        break;
      }
    }
    for (let j = 0; j < tamanho; j++) {
      if (aux[j][1].value !== "") {
        var filled = true;
      } else {
        var filled = false;
        setValues((prevState) => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" },
        }));
        break;
      }
    }

    if (valid && filled) {
      dispatch(
        oportRequest(
          values.empresaId.value,
          values.colabId.value,
          values.clienteId.value,
          values.UndNegId.value,
          values.itmControleId.value,
          values.segmetId.value,
          values.representanteId.value,
          values.contato.value,
          values.data.value,
          values.fase.value,
          values.cod.value,
          values.desc.value,
          optional.narrativa.value,
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
        autoDismiss: 7,
      };
      notify();
    }
  };
  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notifyElment} />
      </div>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>

                <CardTitle tag="h4">Oportunidade</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Label>Empresa</Label>
                  <FormGroup className={`has-label ${values.empresaId.error}`}>
                    <Input
                      disabled={true}
                      name="EmpresaId"
                      type="select"
                      onChange={(event) =>
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
                      <label className="error">
                        {values.empresaId.message}
                      </label>
                    ) : null}
                  </FormGroup>
                  <Row><Col md="4">
                    <label>Colaborador</label>
                    <FormGroup className={`has-label ${values.colabId.error}`}>
                      <Input
                        disabled
                        name="colabId"
                        type="text"
                        onChange={(event) =>
                          handleChange(event, "colabId", "text")
                        }
                        defaultValue={data1.nome}
                      />
                      {values.colabId.error === "has-danger" ? (
                        <label className="error">{values.colabId.message}</label>
                      ) : null}
                    </FormGroup>
                  </Col>
                    <Col md="4">
                      <Label>Data</Label>
                      <FormGroup className={`has-label ${values.data.error}`}>
                        <TextField
                          id="date"
                          type="date"
                          onChange={(event) =>
                            handleChange(event, "data", "text")
                          }
                          value={values.data.value}
                        />
                        {values.data.error === "has-danger" ? (
                          <label className="error">{values.data.message}</label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <p style={{ paddingTop: 27, paddingLeft: 47, fontSize: 20, fontStyle: "sans-serif" }}>Aberta</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <Label>Cliente</Label>
                      <FormGroup
                        className={`has-label ${values.clienteId.error}`}
                      >
                        <Input
                          name="clienteId"
                          type="select"
                          onChange={(event) =>
                            handleChange(event, "clienteId", "text")
                          }
                          value={values.clienteId.value}
                          onChangeCapture={(e) => {
                            getCliData(e.target.value);
                          }}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o cliente{" "}
                          </option>
                          {data2.map((clienteId) => (
                            <option value={clienteId.id}>
                              {" "}
                              {clienteId.nomeAbv} - {normalizeCnpj(clienteId.CNPJ)}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.clienteId.error === "has-danger" ? (
                          <label className="error">
                            {values.clienteId.message}
                          </label>
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
                          onChange={(event) =>
                            handleChange(event, "contato", "text")
                          }
                          value={values.contato.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o contato{" "}
                          </option>
                          {data3.map((contato) => (
                            <option value={contato.id}>
                              {" "}
                              {contato.nome} - {contato.email}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.contato.error === "has-danger" ? (
                          <label className="error">
                            {values.contato.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">

                      <Label>Representante</Label>
                      <FormGroup
                        className={`has-label ${values.representanteId.error}`}
                      >
                        <Input
                          name="representanteId"
                          type="select"
                          onChange={(event) =>
                            handleChange(event, "representanteId", "text")
                          }
                          value={values.representanteId.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o representante{" "}
                          </option>
                          {data7.map((representanteId) => (
                            <option value={representanteId.id}>
                              {" "}
                              {representanteId.id} - {representanteId.nome}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.representanteId.error === "has-danger" ? (
                          <label className="error">
                            {values.representanteId.message}
                          </label>
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
                          onChange={(event) =>
                            handleChange(event, "UndNegId", "text")
                          }
                          value={values.UndNegId.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione a unidade de negócio{" "}
                          </option>
                          {data4.map((UndNegId) => (
                            <option value={UndNegId.id}>
                              {" "}
                              {UndNegId.id} - {UndNegId.descUndNeg}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.UndNegId.error === "has-danger" ? (
                          <label className="error">
                            {values.UndNegId.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Item Controle</Label>
                      <FormGroup
                        className={`has-label ${values.itmControleId.error}`}
                      >
                        <Input
                          name="itmControleId"
                          type="select"
                          onChange={(event) =>
                            handleChange(event, "itmControleId", "text")
                          }
                          value={values.itmControleId.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o item controle{" "}
                          </option>
                          {data5.map((itmControleId) => (
                            <option value={itmControleId.id}>
                              {" "}
                              {itmControleId.id} - {itmControleId.descItem}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.itmControleId.error === "has-danger" ? (
                          <label className="error">
                            {values.itmControleId.message}
                          </label>
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
                          onChange={(event) =>
                            handleChange(event, "segmetId", "text")
                          }
                          value={values.segmetId.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o segmento{" "}
                          </option>
                          {data6.map((segmetId) => (
                            <option value={segmetId.id}>
                              {" "}
                              {segmetId.id} - {segmetId.descSegmt}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.segmetId.error === "has-danger" ? (
                          <label className="error">
                            {values.segmetId.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <label>Código</label>
                      <FormGroup className={`has-label ${values.cod.error}`}>
                        <Input
                          disabled
                          name="cod"
                          type="text"
                          onChange={(event) =>
                            handleChange(event, "cod", "text")
                          }
                          value={values.cod.value}
                        />{" "}
                        {values.cod.error === "has-danger" ? (
                          <label className="error">{values.cod.message}</label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="8">
                      <label>Descrição</label>
                      <FormGroup className={`has-label ${values.desc.error}`}>
                        <Input
                          name="desc"
                          type="text"
                          onChange={(event) =>
                            handleChange(event, "desc", "text")
                          }
                          value={values.desc.value}
                        />{" "}
                        {values.desc.error === "has-danger" ? (
                          <label className="error">{values.desc.message}</label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label>Narrativa</label>
                      <FormGroup className={`has-label ${optional.narrativa.error}`}>
                        <Input
                          name="narrativa"
                          type="textarea"
                          onChange={(event) =>
                            handleChange(event, "narrativa", "optional")
                          }
                          value={optional.narrativa.value}
                        />{" "}
                        {optional.narrativa.error === "has-danger" ? (
                          <label className="error">{optional.narrativa.message}</label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Link to={`/tabelas/oportunidade/oport`}>
                    <Button
                      style={{
                        paddingLeft: 32,
                        paddingRight: 33,
                      }}
                      color="secundary"
                      size="small"
                      className="form"
                    >
                      <i className="tim-icons icon-double-left"
                        style={{
                          paddingBottom: 4,
                          paddingRight: 1,
                        }}
                        size="large"
                      />{" "}
                      Voltar
                    </Button>
                  </Link>
                  <Button
                    style={{
                      paddingLeft: 29,
                      paddingRight: 30,
                    }}
                    className="form"
                    color="info"
                    type="submit"
                  >
                    Enviar{" "}
                    <i className="tim-icons icon-send"
                      style={{
                        paddingBottom: 4,
                        paddingLeft: 3,
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
  );
}
