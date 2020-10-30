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
  Label,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { ClienteUpdate } from "~/store/modules/Cliente/actions";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { store } from "~/store";
import NotificationAlert from "react-notification-alert";

function ClienteUpdatee() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const empresa = store.getState().auth.empresa;
  const [data, setData] = useState({});
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cnpj: { value: "", error: "", message: "" },
    nomeAbv: { value: "", error: "", message: "" },
    RepresentanteId: { value: "", error: "", message: "" },
    TipoComisseId: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:51314/cliente/${id}`);
      const response1 = await axios(`http://localhost:51314/tipoComiss`);
      const response2 = await axios(`http://localhost:51314/representante`);
      const response3 = await axios(`http://localhost:51314/empresa/${empresa}`);
      setData(response.data);
      setData1(response1.data);
      setData2(response2.data);
      setData3(response3.data);
      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response.data.EmpresaId },
      }));
      setValues((prevState) => ({
        ...prevState,
        cnpj: { value: normalizeInput(response.data.CNPJ) },
      }));
      setValues((prevState) => ({
        ...prevState,
        nomeAbv: { value: response.data.nomeAbv },
      }));
      setValues((prevState) => ({
        ...prevState,
        RepresentanteId: { value: response.data.RepresentanteId },
      }));
      setValues((prevState) => ({
        ...prevState,
        TipoComisseId: { value: response.data.TipoComisseId },
      }));

      setIsLoading(false);
    }
    loadData();
  }, []);
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

    tamanho = tamanho + 1;
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

  const normalizeInput = (value) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, "");
    const cvLength = currentValue.length;
    if (cvLength < 3) return currentValue;
    if (cvLength < 6)
      return `${currentValue.slice(0, 2)}.${currentValue.slice(2)}`;
    if (cvLength < 9)
      return `${currentValue.slice(0, 2)}.${currentValue.slice(
        2,
        5
      )}.${currentValue.slice(5)}`;
    if (cvLength < 13)
      return `${currentValue.slice(0, 2)}.${currentValue.slice(
        2,
        5
      )}.${currentValue.slice(5, 8)}/${currentValue.slice(8)}`;
    return `${currentValue.slice(0, 2)}.${currentValue.slice(
      2,
      5
    )}.${currentValue.slice(5, 8)}/${currentValue.slice(
      8,
      12
    )}-${currentValue.slice(12, 14)}`;
  };

  const renderCnpjState = (value) => {
    if (!validarCNPJ(value)) {
      setValues((prevState) => ({
        ...prevState,
        cnpj: {
          error: "has-danger",
          message: "Insira um CNPJ válido",
        },
      }));
    } else {
      setValues((prevState) => ({
        ...prevState,
        cnpj: { value: value, error: "has-success", message: "" },
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

      case "cnpj":
        setValues((prevState) => ({
          ...prevState,
          cnpj: { value: normalizeInput(target) },
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
      var cnpjdb = values.cnpj.value.replace(/[^\d]+/g, "");

      dispatch(
        ClienteUpdate(
          id,
          values.nomeAbv.value,
          values.RepresentanteId.value,
          values.TipoComisseId.value,
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
        autoDismiss: 7,
      };
      notify();
    }
  };

  return (
    <Fragment>
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
                    <CardTitle tag="h4">Edição de cliente</CardTitle>
                    <Link to="/cliente_cadastro">
                      <Button
                        style={{
                          float: "right",
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        color="info"
                        size="small"
                        className="text-center"
                      >
                        <i
                          className="tim-icons icon-simple-add"
                          style={{
                            paddingBottom: 4,
                            paddingRight: 10,
                          }}
                          size="large"
                        />{" "}
                        Novo
                      </Button>
                    </Link>
                    <Link to={"/tabelas/cliente/cont/" + id}>
                      <Button
                        style={{ textAlign: "right" }}
                        color="info"
                        size="md"
                        className="text-center"
                      >
                        Contatos
                      </Button>
                    </Link>
                    <Link to={"/tabelas/cliente/comp/" + id}>
                      <Button
                        style={{ textAlign: "right" }}
                        color="info"
                        size="md"
                        className="text-center"
                      >
                        Complemento
                      </Button>
                    </Link>
                    <Link to={"/tabelas/cliente/rec_desp/" + id}>
                      <Button
                        style={{ textAlign: "right" }}
                        color="info"
                        size="md"
                        className="text-center"
                      >
                        Receita/Despesa
                      </Button>
                    </Link>
                    <Link to={`/tabelas/cliente/cliente`}>
                  <Button
                      style={{
                        float: "right",
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}
                      color="secundary"
                      size="small"
                      className="text-left"
                    >
                      <i
                        className="tim-icons icon-double-left"
                        style={{
                          paddingBottom: 4,
                          paddingRight: 5,
                        }}
                        size="large"
                      />{" "}
                      Voltar
                    </Button>
                  </Link>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Label>Empresa</Label>
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
                            {data3.nome} - {normalizeInput(data3.idFederal)}
                          </option>
                        </Input>
                        {values.empresaId.error === "has-danger" ? (
                          <label className="error">
                            {values.empresaId.message}
                          </label>
                        ) : null}
                      </FormGroup>
                      <label>CNPJ</label>
                      <FormGroup className={`has-label ${values.cnpj.error}`}>
                        <Input
                        disabled
                          maxLength={18}
                          name="cnpj"
                          type="text"
                          onChange={(event) =>
                            handleChange(event, "cnpj", "cnpj")
                          }
                          value={values.cnpj.value}
                          onBlur={(e) => {
                            let value = e.target.value;
                            renderCnpjState(value);
                          }}
                        />
                        {values.empresaId.error === "has-danger" ? (
                          <label className="error">
                            {values.empresaId.message}
                          </label>
                        ) : null}
                      </FormGroup>
                      <Label>Nome Abreviado</Label>
                      <FormGroup
                        className={`has-label ${values.nomeAbv.error}`}
                      >
                        <Input
                        disabled
                          name="name_abv"
                          type="text"
                          onChange={(event) =>
                            handleChange(event, "nomeAbv", "text")
                          }
                          value={values.nomeAbv.value}
                        />
                        {values.empresaId.error === "has-danger" ? (
                          <label className="error">
                            {values.empresaId.message}
                          </label>
                        ) : null}
                      </FormGroup>
                      <Label>Representante</Label>
                      <FormGroup
                        className={`has-label ${values.RepresentanteId.error}`}
                      >
                        <Input
                          name="representante"
                          type="select"
                          onChange={(event) =>
                            handleChange(event, "representante", "text")
                          }
                          value={values.RepresentanteId.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o representante{" "}
                          </option>
                          {data2.map((representante) => (
                            <option value={representante.id}>
                              {" "}
                              {representante.nome}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.empresaId.error === "has-danger" ? (
                          <label className="error">
                            {values.empresaId.message}
                          </label>
                        ) : null}
                      </FormGroup>
                      <Label>Tipo Comissão</Label>
                      <FormGroup
                        className={`has-label ${values.TipoComisseId.error}`}
                      >
                        <Input
                          name="tipoComiss"
                          type="select"
                          onChange={(event) =>
                            handleChange(event, "tipoComiss", "text")
                          }
                          value={values.TipoComisseId.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o tipo de comissão{" "}
                          </option>
                          {data1.map((tipoComiss) => (
                            <option value={tipoComiss.id}>
                              {" "}
                              {tipoComiss.id} -{tipoComiss.desc}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.empresaId.error === "has-danger" ? (
                          <label className="error">
                            {values.empresaId.message}
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
export default ClienteUpdatee;
