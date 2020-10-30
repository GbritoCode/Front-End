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
import React, { useRef, useState, useEffect, Fragment } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  Input,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { fornecRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { normalizeCnpj, normalizeFone, validarCNPJ } from "normalize.js";

export default function FornecCadastro() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  let jsonpAdapter = require("axios-jsonp");
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [data1, setData1] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const empresa = store.getState().auth.empresa;

  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cnpj: { value: "", error: "", message: "" },
    nome: { value: "", error: "", message: "" },
    CondPgmtoId: { value: "", error: "", message: "" },
    nomeConta: { value: "", error: "", message: "" },
    fone: { value: "", error: "", message: "" },
    cep: { value: "", error: "", message: "" },
    rua: { value: "", error: "", message: "" },
    numero: { value: "", error: "", message: "" },
    bairro: { value: "", error: "", message: "" },
    cidade: { value: "", error: "", message: "" },
    uf: { value: "", error: "", message: "" },
    banco: { value: "", error: "", message: "" },
    agencia: { value: "", error: "", message: "" },
    conta: { value: "", error: "", message: "" },
  };

  const optionalSchema={
    complemento: { value: "", error: "", message: "" },
  }
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:51314/empresa/${empresa}`);
      const response1 = await axios(`http://localhost:51314/condPgmto`);
      setData(response.data);
      setData1(response1.data);
      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response.data.id },
      }));
      setIsLoading(false);
    }
    loadData();
  }, []);

  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

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

  async function cnpjRequest(value) {
    const currentValue = value.replace(/[^\d]/g, "");
    const response = await axios({
      url: `https://www.receitaws.com.br/v1/cnpj/${currentValue}`,
      adapter: jsonpAdapter,
    });
    if (response.data.status === "ERROR") {
      setValues((prevState) => ({
        ...prevState,
        cnpj: {
          error: "has-danger",
          message: "Insira um CNPJ válido",
        },
      }));
      options = {
        place: "tr",
        message: (
          <div>
            <div>O CNPJ é inválido e foi recusado pela receita federal</div>
          </div>
        ),
        type: "danger",
        icon: "tim-icons icon-alert-circle-exc",
        autoDismiss: 7,
      };
      notify();
    } else {
      setValues((prevState) => ({
        ...prevState,
        nome: { value: response.data.nome },
      }));
      setValues((prevState) => ({
        ...prevState,
        cep: { value: response.data.cep },
      }));
      setValues((prevState) => ({
        ...prevState,
        rua: { value: response.data.logradouro },
      }));
      setValues((prevState) => ({
        ...prevState,
        numero: { value: response.data.numero },
      }));
      setValues((prevState) => ({
        ...prevState,
        bairro: { value: response.data.bairro },
      }));
      setValues((prevState) => ({
        ...prevState,
        cidade: { value: response.data.municipio },
      }));
      setValues((prevState) => ({
        ...prevState,
        uf: { value: response.data.uf },
      }));
    }
    setIsLoading(false);
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
      case "cnpj":
        setValues((prevState) => ({
          ...prevState,
          cnpj: { value: normalizeCnpj(target) },
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
      var fonedb = values.fone.value.replace(/[^\d]+/g, "");
      dispatch(
        fornecRequest(
          cnpjdb,
          values.empresaId.value,
          values.nome.value,
          values.CondPgmtoId.value,
          values.nomeConta.value,
          fonedb,
          values.cep.value,
          values.rua.value,
          values.numero.value,
          optional.complemento.value,
          values.bairro.value,
          values.cidade.value,
          values.uf.value,
          values.banco.value,
          values.agencia.value,
          values.conta.value
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
                    <CardTitle tag="h4">Fornecedor</CardTitle>
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
                            {data.nome} - {normalizeCnpj(data.idFederal)}
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
                            cnpjRequest(value);
                          }}
                        />
                        {values.cnpj.error === "has-danger" ? (
                          <label className="error">{values.cnpj.message}</label>
                        ) : null}
                      </FormGroup>
                      <Row>
                        <Col md="6">
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
                        <Col md="6">
                          <label>Nome da Conta</label>
                          <FormGroup
                            className={`has-label ${values.nomeConta.error}`}
                          >
                            <Input
                              name="nomeConta"
                              type="text"
                              onChange={(event) =>
                                handleChange(event, "nomeConta", "text")
                              }
                              value={values.nomeConta.value}
                            />
                            {values.nomeConta.error === "has-danger" ? (
                              <label className="error">
                                {values.nomeConta.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="4">
                          <label>Condição de Pagamento</label>
                          <FormGroup
                            className={`has-label ${values.CondPgmtoId.error}`}
                          >
                            <Input
                              name="CondPgmtoId"
                              type="select"
                              onChange={(event) =>
                                handleChange(event, "CondPgmtoId", "text")
                              }
                              value={values.CondPgmtoId.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione a condição de pagamento{" "}
                              </option>
                              {data1.map((condPgmto) => (
                                <option value={condPgmto.id}>
                                  {" "}
                                  {condPgmto.id} - {condPgmto.desc}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.CondPgmtoId.error === "has-danger" ? (
                              <label className="error">
                                {values.CondPgmtoId.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <label>Telefone</label>
                          <FormGroup
                            className={`has-label ${values.fone.error}`}
                          >
                            <Input
                              minLength={10}
                              maxLength={11}
                              name="fone"
                              type="numeric"
                              onChange={(event) =>
                                handleChange(event, "fone", "text")
                              }
                              onBlur={(e) => {
                                let value = e.target.value;
                                setValues((prevState) => ({
                                  ...prevState,
                                  fone: { value: normalizeFone(value) },
                                }));
                              }}
                              value={values.fone.value}
                            />
                            {values.fone.error === "has-danger" ? (
                              <label className="error">
                                {values.fone.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <label>CEP</label>
                          <FormGroup
                            className={`has-label ${values.cep.error}`}
                          >
                            <Input
                              name="cep"
                              type="text"
                              onChange={(event) =>
                                handleChange(event, "cep", "text")
                              }
                              value={values.cep.value}
                            />
                            {values.cep.error === "has-danger" ? (
                              <label className="error">
                                {values.cep.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="4">
                          <label>Rua</label>
                          <FormGroup
                            className={`has-label ${values.rua.error}`}
                          >
                            <Input
                              name="rua"
                              type="text"
                              onChange={(event) =>
                                handleChange(event, "rua", "text")
                              }
                              value={values.rua.value}
                            />
                            {values.rua.error === "has-danger" ? (
                              <label className="error">
                                {values.rua.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="2">
                          <label>Número</label>
                          <FormGroup
                            className={`has-label ${values.numero.error}`}
                          >
                            <Input
                              name="numero"
                              type="numeric"
                              onChange={(event) =>
                                handleChange(event, "numero", "number")
                              }
                              value={values.numero.value}
                            />
                            {values.numero.error === "has-danger" ? (
                              <label className="error">
                                {values.numero.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>

                        <Col md="6">
                          <label>Complemento</label>
                          <FormGroup
                            className={`has-label ${optional.complemento.error}`}
                          >
                            <Input
                              name="complemento"
                              type="text"
                              onChange={(event) =>
                                handleChange(event, "complemento", "optional")
                              }
                              value={optional.complemento.value}
                            />
                            {optional.complemento.error === "has-danger" ? (
                              <label className="error">
                                {optional.complemento.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="4">
                          <label>Bairro</label>
                          <FormGroup
                            className={`has-label ${values.bairro.error}`}
                          >
                            <Input
                              name="bairro"
                              type="text"
                              onChange={(event) =>
                                handleChange(event, "bairro", "text")
                              }
                              value={values.bairro.value}
                            />
                            {values.bairro.error === "has-danger" ? (
                              <label className="error">
                                {values.bairro.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <label>Cidade</label>
                          <FormGroup
                            className={`has-label ${values.cidade.error}`}
                          >
                            <Input
                              name="cidade"
                              type="text"
                              onChange={(event) =>
                                handleChange(event, "cidade", "text")
                              }
                              value={values.cidade.value}
                            />
                            {values.cidade.error === "has-danger" ? (
                              <label className="error">
                                {values.cidade.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <label>UF</label>
                          <FormGroup className={`has-label ${values.uf.error}`}>
                            <Input
                              name="uf"
                              type="select"
                              onChange={(event) =>
                                handleChange(event, "uf", "text")
                              }
                              value={values.uf.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione o estado{" "}
                              </option>
                              <option value="AC">Acre</option>
                              <option value="AL">Alagoas</option>
                              <option value="AP">Amapá</option>
                              <option value="AM">Amazonas</option>
                              <option value="BA">Bahia</option>
                              <option value="CE">Ceará</option>
                              <option value="DF">Distrito Federal</option>
                              <option value="ES">Espírito Santo</option>
                              <option value="GO">Goiás</option>
                              <option value="MA">Maranhão</option>
                              <option value="MT">Mato Grosso</option>
                              <option value="MS">Mato Grosso do Sul</option>
                              <option value="MG">Minas Gerais</option>
                              <option value="PA">Pará</option>
                              <option value="PB">Paraíba</option>
                              <option value="PR">Paraná</option>
                              <option value="PE">Pernambuco</option>
                              <option value="PI">Piauí</option>
                              <option value="RJ">Rio de Janeiro</option>
                              <option value="RN">Rio Grande do Norte</option>
                              <option value="RS">Rio Grande do Sul</option>
                              <option value="RO">Rondônia</option>
                              <option value="RR">Roraima</option>
                              <option value="SC">Santa Catarina</option>
                              <option value="SP">São Paulo</option>
                              <option value="SE">Sergipe</option>
                              <option value="TO">Tocantins</option>
                            </Input>
                            {values.uf.error === "has-danger" ? (
                              <label className="error">
                                {values.uf.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <label>Banco</label>
                          <FormGroup
                            className={`has-label ${values.banco.error}`}
                          >
                            <Input
                              name="banco"
                              type="select"
                              onChange={(event) =>
                                handleChange(event, "banco", "text")
                              }
                              value={values.banco.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione o Banco{" "}
                              </option>
                              <option value="001">
                                001: Banco do Brasil S.A.
                              </option>
                              <option value="237">
                                237: Banco Bradesco S.A.
                              </option>
                              <option value="104">
                                104: Caixa Econômica Federal
                              </option>
                              <option value="745">
                                745: Banco Citibank S.A.
                              </option>
                              <option value="399">
                                399: HSBC Bank Brasil S.A. – Banco Múltiplo
                              </option>
                              <option value="341">341: Banco Itaú S.A.</option>
                              <option value="652">
                                652: Itaú Unibanco Holding S.A.
                              </option>
                              <option value="422">422: Banco Safra S.A.</option>
                              <option value="033">
                                033: Banco Santander (Brasil) S.A.
                              </option>
                            </Input>
                            {values.banco.error === "has-danger" ? (
                              <label className="error">
                                {values.banco.message}
                              </label>
                            ) : null}
                          </FormGroup>{" "}
                        </Col>
                        <Col md="4">
                          <label>Agência</label>
                          <FormGroup
                            className={`has-label ${values.agencia.error}`}
                          >
                            <Input
                              name="agencia"
                              type="text"
                              onChange={(event) =>
                                handleChange(event, "agencia", "text")
                              }
                              value={values.agencia.value}
                            />
                            {values.agencia.error === "has-danger" ? (
                              <label className="error">
                                {values.agencia.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <label>Conta</label>
                          <FormGroup
                            className={`has-label ${values.conta.error}`}
                          >
                            <Input
                              name="conta"
                              type="text"
                              onChange={(event) =>
                                handleChange(event, "conta", "text")
                              }
                              value={values.conta.value}
                            />
                            {values.conta.error === "has-danger" ? (
                              <label className="error">
                                {values.conta.message}
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

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
