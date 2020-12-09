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
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { FornecUpdate } from "~/store/modules/general/actions";
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import { normalizeCnpj, normalizeFone } from "normalize";

/*eslint-disable eqeqeq*/
function FornecUpdatee() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const { id } = useParams();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
  const optionalSchema = {
    complemento: { value: "", error: "", message: "" },

  }
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);

  useEffect(() => {
    async function loadData() {
      const response = await axios(`http://localhost:51314/fornec/${id}`);
      const response1 = await axios(`http://localhost:51314/condPgmto`);
      const response2 = await axios(
        `http://localhost:51314/empresa/${response.data.EmpresaId}`
      );
      setData1(response1.data);
      setData2(response2.data);
      setValues((prevState) => ({
        ...prevState,
        cnpj: { value: response.data.CNPJ },
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
        CondPgmtoId: { value: response.data.CondPgmtoId },
      }));
      setValues((prevState) => ({
        ...prevState,
        nomeConta: { value: response.data.nomeConta },
      }));
      setValues((prevState) => ({
        ...prevState,
        fone: { value: normalizeFone(JSON.stringify(response.data.fone)) },
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
      setOptional((prevState) => ({
        ...prevState,
        complemento: { value: response.data.complemento },
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
        banco: { value: response.data.banco },
      }));
      setValues((prevState) => ({
        ...prevState,
        agencia: { value: response.data.agencia },
      }));
      setValues((prevState) => ({
        ...prevState,
        conta: { value: response.data.conta },
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
      var cnpjdb = values.cnpj.value.replace(/[^\d]+/g, "");
      var fonedb = values.fone.value.replace(/[^\d]+/g, "");
      dispatch(
        FornecUpdate(id,
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
                      <CardTitle tag="h4">Edição de Forncedor</CardTitle>
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
                              {data2.nome} - {normalizeCnpj(data2.idFederal)}
                            </option>
                          </Input>
                          {values.empresaId.error === "has-danger" ? (
                            <Label className="error">
                              {values.empresaId.message}
                            </Label>
                          ) : null}
                        </FormGroup>

                        <Label>CNPJ</Label>
                        <FormGroup className={`has-label ${values.cnpj.error}`}>
                          <Input
                            disabled
                            maxLength={18}
                            name="cnpj"
                            type="text"
                            onChange={(event) =>
                              handleChange(event, "cnpj", "cnpj")
                            }
                            value={normalizeCnpj(values.cnpj.value)}
                            onBlur={(e) => {
                              let value = e.target.value;
                              renderCnpjState(value);
                            }}
                          />
                          {values.cnpj.error === "has-danger" ? (
                            <Label className="error">{values.cnpj.message}</Label>
                          ) : null}
                        </FormGroup>
                        <Row>
                          <Col md="6">
                            {" "}
                            <Label>Nome</Label>
                            <FormGroup
                              className={`has-label ${values.nome.error}`}
                            >
                              <Input
                                disabled
                                name="nome"
                                type="text"
                                onChange={(event) =>
                                  handleChange(event, "nome", "text")
                                }
                                value={values.nome.value}
                              />
                              {values.nome.error === "has-danger" ? (
                                <Label className="error">
                                  {values.nome.message}
                                </Label>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col md="6">
                          <Label>Nome Abreviado</Label>
                            <FormGroup
                              className={`has-label ${values.nomeConta.error}`}
                            >
                              <Input
                                disabled
                                name="nomeConta"
                                type="text"
                                onChange={(event) =>
                                  handleChange(event, "nomeConta", "text")
                                }
                                value={values.nomeConta.value}
                              />
                              {values.nomeConta.error === "has-danger" ? (
                                <Label className="error">
                                  {values.nomeConta.message}
                                </Label>
                              ) : null}
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="4">
                          <Label>Condição de Pagamento</Label>
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
                                <Label className="error">
                                  {values.CondPgmtoId.message}
                                </Label>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            {" "}
                            <Label>Telefone</Label>
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
                                  normalizeFone(value);
                                }}
                                value={values.fone.value}
                              />
                              {values.fone.error === "has-danger" ? (
                                <Label className="error">
                                  {values.fone.message}
                                </Label>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            {" "}
                            <Label>CEP</Label>
                            <FormGroup
                              className={`has-label ${values.cep.error}`}
                            >
                              <Input
                                disabled
                                name="cep"
                                type="text"
                                onChange={(event) =>
                                  handleChange(event, "cep", "text")
                                }
                                value={values.cep.value}
                              />
                              {values.cep.error === "has-danger" ? (
                                <Label className="error">
                                  {values.cep.message}
                                </Label>
                              ) : null}
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="4">
                          <Label>Rua</Label>
                            <FormGroup
                              className={`has-label ${values.rua.error}`}
                            >
                              <Input
                                disabled
                                name="rua"
                                type="text"
                                onChange={(event) =>
                                  handleChange(event, "rua", "text")
                                }
                                value={values.rua.value}
                              />
                              {values.rua.error === "has-danger" ? (
                                <Label className="error">
                                  {values.rua.message}
                                </Label>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col md="2">
                          <Label>Número</Label>
                            <FormGroup
                              className={`has-label ${values.numero.error}`}
                            >
                              <Input
                                disabled
                                name="numero"
                                type="numeric"
                                onChange={(event) =>
                                  handleChange(event, "numero", "number")
                                }
                                value={values.numero.value}
                              />
                              {values.numero.error === "has-danger" ? (
                                <Label className="error">
                                  {values.numero.message}
                                </Label>
                              ) : null}
                            </FormGroup>
                          </Col>

                          <Col md="6">
                          <Label>Complemento</Label>
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
                                <Label className="error">
                                  {optional.complemento.message}
                                </Label>
                              ) : null}
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="4">
                          <Label>Bairro</Label>
                            <FormGroup
                              className={`has-label ${values.bairro.error}`}
                            >
                              <Input
                                disabled
                                name="bairro"
                                type="text"
                                onChange={(event) =>
                                  handleChange(event, "bairro", "text")
                                }
                                value={values.bairro.value}
                              />
                              {values.bairro.error === "has-danger" ? (
                                <Label className="error">
                                  {values.bairro.message}
                                </Label>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col md="4">
                          <Label>Cidade</Label>
                            <FormGroup
                              className={`has-label ${values.cidade.error}`}
                            >
                              <Input
                                disabled
                                name="cidade"
                                type="text"
                                onChange={(event) =>
                                  handleChange(event, "cidade", "text")
                                }
                                value={values.cidade.value}
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
                                <Label className="error">
                                  {values.uf.message}
                                </Label>
                              ) : null}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="4">
                          <Label>Banco</Label>
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
                                <Label className="error">
                                  {values.banco.message}
                                </Label>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col md="4">
                          <Label>Agência</Label>
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
                                <Label className="error">
                                  {values.agencia.message}
                                </Label>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col md="4">
                          <Label>Conta</Label>
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
                                <Label className="error">
                                  {values.conta.message}
                                </Label>
                              ) : null}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Link to={`/tabelas/general/fornec`}>
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
        )}
    </Fragment>
  );
}
export default FornecUpdatee;
