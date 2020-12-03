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
import React, { useState, useEffect, Fragment, useRef, useCallback } from "react";

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
import { CliCompRequest } from "~/store/modules/Cliente/actions";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { normalizeCnpj } from 'normalize'

export default function CliCompCadastro() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const id = useParams();
  const dispatch = useDispatch();
  let jsonpAdapter = require("axios-jsonp");
  const firstRender = useRef(true);

  const stateSchema = {
    clienteId: { value: "", error: "", message: "" },
    CondPgmtoId: { value: "", error: "", message: "" },
    cep: { value: "", error: "", message: "" },
    rua: { value: "", error: "", message: "" },
    numero: { value: "", error: "", message: "" },
    bairro: { value: "", error: "", message: "" },
    cidade: { value: "", error: "", message: "" },
    uf: { value: "", error: "", message: "" },
    inscMun: { value: "", error: "", message: "" },
    inscEst: { value: "", error: "", message: "" },
  };
  const optionalSchema = {
    complemento: { value: "", error: "", message: "" },
  }
  const [data, setData] = useState({});
  const [data1, setData1] = useState([]);
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);

  useEffect(() => {
    //------------------- busca de dados das apis, e setar as variáveis que dependem das apis
    async function loadData() {
      const response = await axios(`http://localhost:51314/cliente/${id.id}`);
      const response1 = await axios(`http://localhost:51314/condPgmto`);
      setData(response.data);
      setValues((prevState) => ({
        ...prevState,
        clienteId: { value: response.data.id },
      }));
      setData1(response1.data);
      const response2 = await axios({
        url: `https://www.receitaws.com.br/v1/cnpj/${response.data.CNPJ}`,
        adapter: jsonpAdapter,
      });
      if (response2.data.status === "ERROR") {
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
        notify()
      } else {
        setValues((prevState) => ({
          ...prevState,
          cep: { value: response2.data.cep },
        }));
        setValues((prevState) => ({
          ...prevState,
          rua: { value: response2.data.logradouro },
        }));
        setValues((prevState) => ({
          ...prevState,
          numero: { value: response2.data.numero },
        }));
        setValues((prevState) => ({
          ...prevState,
          bairro: { value: response2.data.bairro },
        }));
        setValues((prevState) => ({
          ...prevState,
          cidade: { value: response2.data.municipio },
        }));
        setValues((prevState) => ({
          ...prevState,
          uf: { value: response2.data.uf },
        }));
      }
    }
    if (firstRender.current) {
      firstRender.current = false;
      loadData();
      return;
    }

    //----------------------- Validações
  }, [id]);
  var options = {};

  const notifyElment = useRef(document.getElementById("not"));
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
        break
        default:
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
        valid = false;
        break;
      }
    }
    for (let j = 0; j < tamanho; j++) {
      if (aux[j][1].value !== "") {
        var filled = true;
      } else {
        filled = false;
        setValues((prevState) => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" },
        }));
        break;
      }
    }

    if (valid && filled) {
      dispatch(
        CliCompRequest(
          values.clienteId.value,
          values.CondPgmtoId.value,
          values.cep.value,
          values.rua.value,
          values.numero.value,
          optional.complemento.value,
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
        autoDismiss: 7,
      };
      notify();
    }
  };
  return (
    <Fragment>

      <>
        <div className="rna-container">
          <NotificationAlert ref={notifyElment} id="not" />
        </div>{" "}
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Link to={`/tabelas/cliente/comp/${values.clienteId.value}`}>

                  </Link>
                  <CardTitle tag="h4">Complemento do Cliente</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                  <label>Cliente</label>
                    <FormGroup
                      className={`has-label ${values.clienteId.error}`}
                    >
                      <Input
                        disabled
                        onChange={(event) =>
                          handleChange(event, "clienteId", "text")
                        }
                        value={values.clienteId.value}
                        name="ClienteId"
                        type="select"
                      >
                        <option disabled value="">
                          {" "}
                            Selecione o Cliente{" "}
                        </option>{" "}
                        <option value={data.id}>
                          {" "}
                          {data.nomeAbv} - {normalizeCnpj(data.CNPJ)}
                        </option>
                      </Input>
                      {values.clienteId.error === "has-danger" ? (
                        <label className="error">
                          {values.clienteId.message}
                        </label>
                      ) : null}
                    </FormGroup>
                    <Row>
                      <Col md="4">
                      <label>CEP</label>
                        <FormGroup
                          className={`has-label ${values.cep.error}`}
                        >
                          <Input
                            disabled
                            onChange={(event) =>
                              handleChange(event, "cep", "text")
                            }
                            value={values.cep.value}
                            name="cep"
                            type="text"
                          />
                          {values.cep.error === "has-danger" ? (
                            <label className="error">
                              {values.cep.message}
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="4">
                      <label>Rua</label>
                        <FormGroup
                          className={`has-label ${values.rua.error}`}
                        >
                          <Input
                            disabled
                            onChange={(event) =>
                              handleChange(event, "rua", "text")
                            }
                            value={values.rua.value}
                            name="rua"
                            type="text"
                          />
                          {values.rua.error === "has-danger" ? (
                            <label className="error">
                              {values.rua.message}
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>

                      <Col md="4">
                      <label>Número</label>
                        <FormGroup
                          className={`has-label ${values.numero.error}`}
                        >
                          <Input
                            disabled
                            onChange={(event) =>
                              handleChange(event, "numero", "number")
                            }
                            value={values.numero.value}
                            name="numero"
                            type="numeric"
                          />
                          {values.numero.error === "has-danger" ? (
                            <label className="error">
                              {values.numero.message}
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <label>Complemento</label>
                    <FormGroup
                      className={`has-label ${optional.complemento.error}`}
                    >
                      <Input
                        disabled
                        onChange={(event) =>
                          handleChange(event, "complemento", "optional")
                        }
                        value={optional.complemento.value}
                        name="nomeAbv"
                        type="text"
                      />
                      {optional.complemento.error === "has-danger" ? (
                        <label className="error">
                          {optional.complemento.message}
                        </label>
                      ) : null}
                    </FormGroup>
                    <Row>
                      <Col md="4">
                      <label>Bairro</label>
                        <FormGroup
                          className={`has-label ${values.bairro.error}`}
                        >
                          <Input
                            disabled
                            onChange={(event) =>
                              handleChange(event, "bairro", "text")
                            }
                            value={values.bairro.value}
                            name="bairro"
                            type="text"
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
                            disabled
                            onChange={(event) =>
                              handleChange(event, "cidade", "text")
                            }
                            value={values.cidade.value}
                            name="cidade"
                            type="text"
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
                            disabled
                            onChange={(event) =>
                              handleChange(event, "uf", "text")
                            }
                            value={values.uf.value}
                            name="uf"
                            type="select"
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
                      <label>Inscrição Municipal</label>
                        <FormGroup
                          className={`has-label ${values.inscMun.error}`}
                        >
                          <Input
                            onChange={(event) =>
                              handleChange(event, "inscMun", "text")
                            }
                            value={values.inscMun.value}
                            name="inscMun"
                            type="numeric"
                          />
                          {values.inscMun.error === "has-danger" ? (
                            <label className="error">
                              {values.inscMun.message}
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col md="4">
                      <label>Inscrição Estadual</label>
                        <FormGroup
                          className={`has-label ${values.inscEst.error}`}
                        >
                          <Input
                            onChange={(event) =>
                              handleChange(event, "inscEst", "text")
                            }
                            value={values.inscEst.value}
                            name="inscEst"
                            type="numeric"
                          />
                          {values.inscEst.error === "has-danger" ? (
                            <label className="error">
                              {values.inscEst.message}
                            </label>
                          ) : null}
                        </FormGroup>
                      </Col>
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
                    </Row>
                    <Link to={`/tabelas/cliente/comp/${values.clienteId.value}`}>
                      <Button
                        style={{
                          paddingLeft: 32,
                          paddingRight: 33,
                        }}
                        color="secundary"
                        size="small"
                        className="text-left"
                      >
                        <i
                          className="tim-icons icon-double-left"
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


    </Fragment >
  );
}
