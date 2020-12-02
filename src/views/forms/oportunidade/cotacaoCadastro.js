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
import Switch from "react-bootstrap-switch";

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
import { cotacaoRequest, oportUpdate } from "~/store/modules/oportunidades/actions";
import { store } from "~/store";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { normalizeCurrency, normalizeCnpj, normalizeCalcCurrency } from "normalize";
import { useParams, Link } from "react-router-dom";

export default function CotacaoCadastro() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { id } = useParams()
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const empresa = store.getState().auth.empresa;
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    oportunidadeId: { value: "", error: "", message: "" },
    probVend: { value: "", error: "", message: "" },
    tipoCobranca: { value: "", error: "", message: "" },
    hrsPrevst: { value: "", error: "", message: "" },
    vlrProp: { value: "", error: "", message: "" },
    vlrDesc: { value: "", error: "", message: "" },
    vlrLiq: { value: "", error: "", message: "" },
    recLiq: { value: "", error: "", message: "" },
    prevLucro: { value: "", error: "", message: "" },
    numParcelas: { value: "", error: "", message: "" },
    motivo: { value: 1, error: "", message: "" },
  };
  const optionalSchema = {
    desc: { value: "", error: "", message: "" },
  }
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);
  const imposto = 14 / 100
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:51314/empresa/${empresa}`);
      const response1 = await axios(`http://localhost:51314/oportunidade/${id}`);
      setData(response.data);
      setData1(response1.data);
      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response.data.id },
      }));
      setValues((prevState) => ({
        ...prevState,
        oportunidadeId: { value: response1.data.id },
      }));
      setIsLoading(false);
    }
    loadData();
  }, []);

  function getCliData(cobranca) {
    axios(`http://localhost:51314/cliente/rec_desp/${data1.clienteId}/?itmControleId=${data1.itmControleId}&cobranca=${cobranca}`)
      .then((result) => {
        if (result.data === null) {
          options = {
            place: "tr",
            message: (
              <div>
                <div>Ops! Parece que não há uma receita cadastrada para o caso dessa oportunidade, casdastre uma!</div>
              </div>
            ),
            type: "danger",
            icon: "tim-icons icon-alert-circle-exc",
            autoDismiss: 7,
          };
          notify()
        } else {
          setData2(result.data)
        }
      })
  }
  var options = {};
  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }
  console.log(data2)
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
      case "currency":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: normalizeCurrency(target) },
        }));
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
  const descontoChange = (descont) => {
    const value = descont.replace(/[.,]+/g, "")
    if (value >= 100) {
      const vHr = data2.valorRec
      var prop = document.getElementsByName("hrsPrevst")[0].value * vHr
      const hr = document.getElementsByName("hrsPrevst")[0].value
      const vLiq = prop - value
      const rLiq = vLiq - vLiq * imposto
      const lucro = rLiq - hr * 6000
      setValues((prevState) => ({
        ...prevState,
        vlrLiq: { value: normalizeCalcCurrency(JSON.stringify((vLiq))) },
      }));
      setValues((prevState) => ({
        ...prevState,
        recLiq: { value: normalizeCalcCurrency(JSON.stringify((rLiq))) },
      }));
      setValues((prevState) => ({
        ...prevState,
        prevLucro: { value: normalizeCalcCurrency(JSON.stringify((lucro))) },
      }));
    }
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
      var vlrPropdb = values.vlrProp.value.replace(/[.,]+/g, "");
      var vlrDescdb = values.vlrDesc.value.replace(/[.,]+/g, "");
      var vlrLiqdb = values.vlrLiq.value.replace(/[.,]+/g, "");
      var recLiqdb = values.recLiq.value.replace(/[.,]+/g, "");
      var prevLucrodb = values.prevLucro.value.replace(/[.,]+/g, "");

      dispatch(
        cotacaoRequest(
          values.empresaId.value,
          values.oportunidadeId.value,
          values.probVend.value,
          values.tipoCobranca.value,
          values.hrsPrevst.value,
          vlrPropdb,
          vlrDescdb,
          vlrLiqdb,
          recLiqdb,
          prevLucrodb,
          values.numParcelas.value,
          values.motivo.value,
          optional.desc.value,
        ));
      dispatch(
        oportUpdate(
          data1.id,
          data1.EmpresaId,
          data1.ColabId,
          data1.clienteId,
          data1.UndNegId,
          data1.itmControleId,
          data1.SegmentoId,
          data1.RepresentanteId,
          data1.contato,
          data1.data,
          3,
          data1.cod,
          data1.desc,
          data1.narrativa,
        ))

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
                <CardTitle tag="h4">Cotação</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <label>Empresa</label>
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
                  <Row>
                    <Col md="4">
                      <label>Oportunidade</label>
                      <FormGroup className={`has-label ${values.oportunidadeId.error}`}>
                        <Input
                          disabled
                          name="oportunidadeId"
                          onChange={(event) =>
                            handleChange(event, "oportunidadeId", "text")
                          }
                          value={values.oportunidadeId.value}
                          type="select"
                        >
                          <option disabled value="">
                            {" "}
                        Selecione a Oportunidade{" "}
                          </option>{" "}
                          <option value={data1.id}>
                            {" "}
                            {data1.desc}
                          </option>
                        </Input>

                        {values.oportunidadeId.error === "has-danger" ? (
                          <label className="error">{values.oportunidadeId.message}</label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {" "}
                      <label>Probabilidade de Venda</label>
                      <FormGroup
                        className={`has-label ${values.probVend.error}`}
                      >
                        <Input
                          name="probVend"
                          type="select"
                          onChange={(event) =>
                            handleChange(event, "probVend", "text")
                          }
                          value={values.probVend.value}
                        >
                          <option disabled value="">
                            {" "}
                            Selecione a Probabilidade de venda{" "}
                          </option>
                          <option value={1}>Alta</option>
                          <option value={2}>Média</option>
                          <option value={3}>Baixa</option>
                        </Input>
                        {values.probVend.error === "has-danger" ? (
                          <label className="error">
                            {values.probVend.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {" "}
                      <label>Tipo de Cobrança</label>
                      <FormGroup
                        className={`has-label ${values.tipoCobranca.error}`}
                      >
                        <Input
                          name="tipoCobranca"
                          type="select"
                          onChange={(event) =>
                            handleChange(event, "tipoCobranca", "text")
                          }
                          onChangeCapture={(e) => {
                            getCliData(e.target.value);
                          }}
                          value={values.tipoCobranca.value}
                        >
                          <option disabled value="">
                            {" "}
                            Selecione o tipo de cobrança{" "}
                          </option>
                          <option value={1}>Por Hora</option>
                          <option value={2}>Por Projeto</option>
                        </Input>
                        {values.tipoCobranca.error === "has-danger" ? (
                          <label className="error">
                            {values.tipoCobranca.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>

                  </Row>
                  <Row>
                    <Col md="4">
                      <label>Horas Previstas</label>
                      <FormGroup
                        className={`has-label ${values.hrsPrevst.error}`}
                      >
                        <Input
                          name="hrsPrevst"
                          type="numeric"
                          onChange={(event) => {
                            handleChange(event, "hrsPrevst", "number");
                            setValues((prevState) => ({
                              ...prevState,
                              vlrProp: { value: normalizeCalcCurrency(JSON.stringify(event.target.value * data2.valorRec)) },
                            }));
                            descontoChange(document.getElementsByName("vlrDesc")[0].value)
                          }
                          }
                          value={values.hrsPrevst.value}
                        />
                        {values.hrsPrevst.error === "has-danger" ? (
                          <label className="error">
                            {values.hrsPrevst.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {" "}
                      <label>Valor da Proposta</label>
                      <FormGroup
                        className={`has-label ${values.vlrProp.error}`}
                      >
                        <Input
                          disabled
                          name="vlrProp"
                          type="numeric"
                          onChange={(event) =>
                            handleChange(event, "vlrProp", "currency")
                          }
                          value={values.vlrProp.value}
                        />
                        {values.vlrProp.error === "has-danger" ? (
                          <label className="error">
                            {values.vlrProp.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <label>Valor Desconto</label>
                      <FormGroup
                        className={`has-label ${values.vlrDesc.error}`}
                      >
                        <Input
                          name="vlrDesc"
                          type="text"
                          onChange={(event) => {
                            handleChange(event, "vlrDesc", "currency");
                            descontoChange(event.target.value)
                          }
                          }
                          value={values.vlrDesc.value}
                        />
                        {values.vlrDesc.error === "has-danger" ? (
                          <label className="error">
                            {values.vlrDesc.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>

                  </Row>
                  <Row>
                    <Col md="4">
                      {" "}
                      <label>Valor Líquido</label>
                      <FormGroup
                        className={`has-label ${values.vlrLiq.error}`}
                      >
                        <Input
                          disabled
                          name="vlrLiq"
                          type="numeric"
                          onChange={(event) =>
                            handleChange(event, "vlrLiq", "currency")
                          }
                          value={values.vlrLiq.value}
                        />
                        {values.vlrLiq.error === "has-danger" ? (
                          <label className="error">
                            {values.vlrLiq.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <label>Receita Líquida</label>
                      <FormGroup
                        className={`has-label ${values.recLiq.error}`}
                      >
                        <Input
                          disabled
                          name="recLiq"
                          type="numeric"
                          onChange={(event) =>
                            handleChange(event, "recLiq", "currency")
                          }
                          value={values.recLiq.value}
                        />
                        {values.recLiq.error === "has-danger" ? (
                          <label className="error">
                            {values.recLiq.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <label>Previsão de Lucro</label>
                      <FormGroup
                        className={`has-label ${values.prevLucro.error}`}
                      >
                        <Input
                          disabled
                          name="prevLucro"
                          type="numeric"
                          onChange={(event) =>
                            handleChange(event, "prevLucro", "currency")
                          }
                          value={values.prevLucro.value}
                        />
                        {values.prevLucro.error === "has-danger" ? (
                          <label className="error">
                            {values.prevLucro.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>

                  </Row>
                  <Row>
                    <Col md="4">
                      <label>Número de Parcelas</label>
                      <FormGroup
                        className={`has-label ${values.numParcelas.error}`}
                      >
                        <Input
                          name="numParcelas"
                          type="select"
                          onChange={(event) =>
                            handleChange(event, "numParcelas", "text")
                          }
                          value={values.numParcelas.value}
                        >
                          <option disabled value="">
                            {" "}
                        Selecione a quantidade de parcelas{" "}
                          </option>{" "}
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                          <option value={9}>9</option>
                          <option value={10}>10</option>
                          <option value={11}>11</option>
                          <option value={12}>12</option>
                        </Input>
                        {values.numParcelas.error === "has-danger" ? (
                          <label className="error">
                            {values.numParcelas.message}
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Motivo Orçamento/Revisão</Label>
                      <FormGroup check >
                        <Label check>
                          <Input
                            defaultChecked
                            name="motivo"
                            type="radio"
                            onChange={(event) => handleChange(event, "motivo", "text")}
                            value={1}
                          />{' '}
                    Orçamento
                    </Label>
                        <Label check>
                          <Input
                            name="motivo"
                            type="radio"
                            onChange={(event) => handleChange(event, "motivo", "text")}
                            value={2}
                          />
                    Desconto
                    </Label>
                        <Label check>
                          <Input
                            name="motivo"
                            type="radio"
                            onChange={(event) => handleChange(event, "motivo", "text")}
                            value={3}
                          />
                    Escopo
                    </Label>

                      </FormGroup>
                    </Col>

                  </Row>
                  <Row>
                    <Col>
                      <label>Descrição</label>
                      <FormGroup
                        className={`has-label ${optional.desc.error}`}
                      >
                        <Input
                          name="desc"
                          type="textarea"
                          onChange={(event) =>
                            handleChange(event, "desc", "optional")
                          }
                          value={optional.desc.value}
                        />
                        {optional.desc.error === "has-danger" ? (
                          <label className="error">
                            {optional.desc.message}
                          </label>
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