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
import React, { useRef, Fragment, useEffect, useState } from "react";

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
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { ColabUpdate } from "~/store/modules/Colab/actions";
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import { normalizeCpf, normalizeFone } from "normalize";

function ColabUpdatee() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cpf: { value: "", error: "", message: "" },
    fornecId: { value: "", error: "", message: "" },
    nome: { value: "", error: "", message: "" },
    PerfilId: { value: "", error: "", message: "" },
    dtAdmiss: { value: "", error: "", message: "" },
    cel: { value: "", error: "", message: "" },
    skype: { value: "", error: "", message: "" },
    email: { value: "", error: "", message: "" },
    espec: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:51314/colab/${id}`);
      const response1 = await axios(`http://localhost:51314/fornec`);
      const response2 = await axios(`http://localhost:51314/perfil`);
      const response3 = await axios(
        `http://localhost:51314/empresa/${response.data.EmpresaId}`
      );
      setData(response.data);
      setData1(response1.data);
      setData2(response2.data);
      setData3(response3.data);

      setValues((prevState) => ({
        ...prevState,
        cpf: { value: response.data.CPF },
      }));
      setValues((prevState) => ({
        ...prevState,
        fornecId: { value: response.data.FornecId },
      }));
      setValues((prevState) => ({
        ...prevState,
        PerfilId: { value: response.data.PerfilId },
      }));
     
      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response.data.EmpresaId },
      }));
      setValues((prevState) => ({
        ...prevState,
        nome: { value: response.data.nome },
      }));
      setValues((prevState) => ({
        ...prevState,
        dtAdmiss: { value: response.data.dtAdmiss },
      }));
      setValues((prevState) => ({
        ...prevState,
        cel: { value: response.data.cel },
      }));
      setValues((prevState) => ({
        ...prevState,
        skype: { value: response.data.skype },
      }));
      setValues((prevState) => ({
        ...prevState,
        email: { value: response.data.email },
      }));
      setValues((prevState) => ({
        ...prevState,
        espec: { value: response.data.espec },
      }));

      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response.data.id },
      }));

      setIsLoading(false);
    }
    loadData();
  }, []);

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf == "") return false;
    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;

    for (var i = 1; i <= 9; i++)
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;

    Soma = 0;
    for (var i = 1; i <= 10; i++)
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

  const renderCpfState = (value) => {
    if (!validarCPF(value)) {
      setValues((prevState) => ({
        ...prevState,
        cpf: { error: "has-danger", message: "Insira um cpf válido" },
      }));
    } else {
      setValues((prevState) => ({
        ...prevState,
        cpf: { value: value, error: "has-success", message: "" },
      }));
    }
  };

  const verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
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
      case "email":
        if (verifyEmail(target)) {
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
              message: "Insira um E-mail válido",
            },
          }));
        }
        break;
      case "cpf":
        setValues((prevState) => ({
          ...prevState,
          cpf: { value: normalizeCpf(target) },
        }));
        break;
      case "text":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: target },
        }));
    }
  };
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

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
      var cpfdb = values.cpf.value.replace(/[^\d]+/g, "");
      dispatch(
        ColabUpdate(
          id,
          cpfdb,
          values.fornecId.value,
          values.PerfilId.value,
          values.nome.value,
          values.dtAdmiss.value,
          values.cel.value,
          values.skype.value,
          values.email.value,
          values.espec.value
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
    <Fragment>
      {isLoading ? (
        <div></div>
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
                    <CardTitle tag="h4">Edição do colaborador</CardTitle>
                    <Link to="/cadastro/colab/colab">
                      <Button
                        style={{
                          float: "right",
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        color="info"
                        size="small"
                        className="text-left"
                      >
                        <i
                          className="tim-icons icon-simple-add"
                          style={{
                            paddingBottom: 4,
                            paddingRight: 5,
                          }}
                          size="large"
                        />{" "}
                        Novo
                      </Button>
                    </Link>
                    <Link to={"/tables/colab/comp/" + id}>
                      <Button
                        style={{ textAlign: "right" }}
                        color="info"
                        size="md"
                        className="text-center"
                      >
                        Complemento
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <label>Empresa</label>
                      <FormGroup
                        className={`has-label ${values.empresaId.error}`}
                      >
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
                            {data3.nome} - {data3.idFederal}
                          </option>
                        </Input>
                        {values.empresaId.error === "has-danger" ? (
                          <label className="error">
                            {values.empresaId.message}
                          </label>
                        ) : null}
                      </FormGroup>

                      <label>CPF</label>
                      <FormGroup className={`has-label ${values.cpf.error}`}>
                        <Input
                          maxLength={18}
                          name="cpf"
                          type="text"
                          onChange={(event) =>
                            handleChange(event, "cpf", "cpf")
                          }
                          value={values.cpf.value}
                          onBlur={(e) => {
                            let value = e.target.value;
                            renderCpfState(value);
                          }}
                        />
                        {values.cpf.error === "has-danger" ? (
                          <label className="error">{values.cpf.message}</label>
                        ) : null}
                      </FormGroup>
                      <Row>
                        <Col md="4">
                          {" "}
                          <label>Nome</label>
                          <FormGroup
                            className={`has-label ${values.nome.error}`}
                          >
                            <Input
                              name="nome"
                              type="text"
                              onChange={(event) =>
                                handleChange(event, "nome", "text")
                              }
                              value={values.nome.value}
                            />
                            {values.nome.error === "has-danger" ? (
                              <label className="error">
                                {values.nome.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <label>Data de Adimissão</label>
                          <FormGroup
                            className={`has-label ${values.dtAdmiss.error}`}
                          >
                            <Input
                              name="dtAdmiss"
                              type="date"
                              onChange={(event) =>
                                handleChange(event, "dtAdmiss", "text")
                              }
                              value={values.dtAdmiss.value}
                            />
                            {values.dtAdmiss.error === "has-danger" ? (
                              <label className="error">
                                {values.dtAdmiss.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <label>Celular</label>
                          <FormGroup
                            className={`has-label ${values.cel.error}`}
                          >
                            <Input
                              name="cel"
                              type="numeric"
                              onChange={(event) =>
                                handleChange(event, "cel", "text")
                              }
                              onBlur={(e) => {
                                let value = e.target.value;
                                setValues((prevState) => ({
                                  ...prevState,
                                  cel: { value: normalizeFone(value) },
                                }));
                              }}
                              value={values.cel.value}
                            />
                            {values.cel.error === "has-danger" ? (
                              <label className="error">
                                {values.cel.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          {" "}
                          <label>Fornecedor</label>
                          <FormGroup
                            className={`has-label ${values.fornecId.error}`}
                          >
                            <Input
                              name="FornecId"
                              type="select"
                              onChange={(event) =>
                                handleChange(event, "fornecId", "text")
                              }
                              value={values.fornecId.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o fornecedor{" "}
                              </option>
                              {data1.map((fornec) => (
                                <option value={fornec.id}>
                                  {" "}
                                  {fornec.nome}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.fornecId.error === "has-danger" ? (
                              <label className="error">
                                {values.fornecId.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <label>Perfil</label>
                          <FormGroup
                            className={`has-label ${values.PerfilId.error}`}
                          >
                            <Input
                              name="PerfilId"
                              type="select"
                              onChange={(event) =>
                                handleChange(event, "PerfilId", "text")
                              }
                              value={values.PerfilId.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o perfil{" "}
                              </option>
                              {data2.map((perfil) => (
                                <option value={perfil.id}>
                                  {" "}
                                  {perfil.id} - {perfil.desc}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.PerfilId.error === "has-danger" ? (
                              <label className="error">
                                {values.PerfilId.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                          {" "}
                          <label>Skype</label>
                          <FormGroup
                            className={`has-label ${values.skype.error}`}
                          >
                            <Input
                              name="skype"
                              type="text"
                              onChange={(event) =>
                                handleChange(event, "skype", "text")
                              }
                              value={values.skype.value}
                            />
                            {values.skype.error === "has-danger" ? (
                              <label className="error">
                                {values.skype.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          {" "}
                          <label>Email</label>
                          <FormGroup
                            className={`has-label ${values.email.error}`}
                          >
                            <Input
                              name="email"
                              type="text"
                              onChange={(event) =>
                                handleChange(event, "email", "email")
                              }
                              value={values.email.value}
                            />
                            {values.email.error === "has-danger" ? (
                              <label className="error">
                                {values.email.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <label>Especialidade</label>
                      <FormGroup
                        claclassName={`has-label ${values.espec.error}`}
                      >
                        <Input
                          name="espec"
                          type="text"
                          onChange={(event) =>
                            handleChange(event, "espec", "text")
                          }
                          value={values.espec.value}
                        />
                        {values.espec.error === "has-danger" ? (
                          <label className="error">
                            {values.espec.message}
                          </label>
                        ) : null}
                      </FormGroup>
                      <Button
                        style={{ marginTop: 35 }}
                        className="form"
                        color="info"
                        type="submit"
                      >
                        Enviar
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )}
    </Fragment>
  );
}
export default ColabUpdatee;
