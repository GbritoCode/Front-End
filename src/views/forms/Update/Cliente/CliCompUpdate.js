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
import React, { useRef, Fragment, useState, useEffect } from "react";

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
import { CliCompUpdate } from "~/store/modules/Cliente/actions";
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import axios from "axios";

export default function CliCompUpdatee() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const stateSchema = {
    clienteId: { value: "", error: "", message: "" },
    rzSoc: { value: "", error: "", message: "" },
    CondPgmtoId: { value: "", error: "", message: "" },
    nomeAbv: { value: "", error: "", message: "" },
    fantasia: { value: "", error: "", message: "" },
    cep: { value: "", error: "", message: "" },
    rua: { value: "", error: "", message: "" },
    numero: { value: "", error: "", message: "" },
    bairro: { value: "", error: "", message: "" },
    cidade: { value: "", error: "", message: "" },
    uf: { value: "", error: "", message: "" },
    inscMun: { value: "", error: "", message: "" },
    inscEst: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(
        `http://localhost:51314/cliente/complem/1/${id}`
      );
      const response1 = await axios(`http://localhost:51314/condPgmto`);
      const response2 = await axios(
        `http://localhost:51314/cliente/${response.data.ClienteId}`
      );
      setData1(response1.data);
      setData2(response2.data);

      setValues((prevState) => ({
        ...prevState,
        clienteId: { value: response.data.ClienteId },
      }));
      setValues((prevState) => ({
        ...prevState,
        CondPgmtoId: { value: response.data.CondPgmtoId },
      }));
      setValues((prevState) => ({
        ...prevState,
        rzSoc: { value: response.data.rzSocial },
      }));
      setValues((prevState) => ({
        ...prevState,
        fantasia: { value: response.data.fantasia },
      }));
      setValues((prevState) => ({
        ...prevState,
        nomeAbv: { value: response.data.nomeAbv },
      }));
      setValues((prevState) => ({
        ...prevState,
        cep: { value: response.data.cep },
      }));
      setValues((prevState) => ({
        ...prevState,
        rua: { value: response.data.rua },
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
        cidade: { value: response.data.cidade },
      }));
      setValues((prevState) => ({
        ...prevState,
        uf: { value: response.data.uf },
      }));
      setValues((prevState) => ({
        ...prevState,
        inscMun: { value: response.data.inscMun },
      }));
      setValues((prevState) => ({
        ...prevState,
        inscEst: { value: response.data.inscEst },
      }));
      setIsLoading(false);
    }
    loadData();
  }, [id]);

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
      case "text":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: target },
        }));
        break
        default:
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
        valid = false
        break;
      }
    }
    for (let j = 0; j < tamanho; j++) {
      if (aux[j][1].value !== "") {
        var filled = true;
      } else {
        filled = false
        setValues((prevState) => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" },
        }));
        break;
      }
    }

    if (valid && filled) {
      dispatch(
        CliCompUpdate(
          id,
          values.clienteId.value,
          values.CondPgmtoId.value,
          values.rzSoc.value,
          values.nomeAbv.value,
          values.fantasia.value,
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
                      <CardTitle tag="h4">
                        Edição de Complemento do Cliente
                    </CardTitle>
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
                            <option value={data2.id}>
                              {" "}
                              {data2.nomeAbv} - {data2.CNPJ}
                            </option>
                          </Input>
                          {values.clienteId.error === "has-danger" ? (
                            <label className="error">
                              {values.clienteId.message}
                            </label>
                          ) : null}
                        </FormGroup>

                        <label>Razão Social</label>
                        <FormGroup className={`has-label ${values.rzSoc.error}`}>
                          <Input
                            id="rzSoc"
                            name="rzSoc"
                            type="text"
                            onChange={(event) =>
                              handleChange(event, "rzSoc", "text")
                            }
                            value={values.rzSoc.value}
                          />
                          {values.rzSoc.error === "has-danger" ? (
                            <label className="error">
                              {values.rzSoc.message}
                            </label>
                          ) : null}
                        </FormGroup>
                        <label>Nome Abreviado</label>
                        <FormGroup
                          className={`has-label ${values.nomeAbv.error}`}
                        >
                          <Input
                            disabled
                            onChange={(event) =>
                              handleChange(event, "nomeAbv", "text")
                            }
                            value={values.nomeAbv.value}
                            name="nomeAbv"
                            type="text"
                          />
                          {values.nomeAbv.error === "has-danger" ? (
                            <label className="error">
                              {values.nomeAbv.message}
                            </label>
                          ) : null}
                        </FormGroup>
                        <label>Nome Fantasia</label>
                        <FormGroup
                          className={`has-label ${values.fantasia.error}`}
                        >
                          <Input
                            onChange={(event) =>
                              handleChange(event, "fantasia", "text")
                            }
                            value={values.fantasia.value}
                            name="nomeAbv"
                            type="text"
                          />
                          {values.fantasia.error === "has-danger" ? (
                            <label className="error">
                              {values.fantasia.message}
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
                                    {condPgmto.id} -{condPgmto.desc}{" "}
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
        )}
    </Fragment>
  );
}
