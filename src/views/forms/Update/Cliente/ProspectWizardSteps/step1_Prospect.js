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
import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef
} from "react";
import classNames from "classnames";
import ReactTable from "react-table-v6";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Label,
  Form,
  Input,
  FormGroup,
  Row,
  Col,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import { Tooltip } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { normalizeCnpj, normalizeCurrency, normalizeFone } from "~/normalize";
import { store } from "~/store";
import api from "~/services/api";
import Modal from "~/components/Modal/modalLarge";
import { Header, Footer } from "~/components/Modal/modalStyles";

/* eslint-disable eqeqeq */
const CadastroCliente = forwardRef((props, ref) => {
  // --------- colocando no modo claro do template
  const [access, setAccess] = useState("");
  const [colab, setColab] = useState("");
  const [isOpenRepr, setIsOpenRepr] = useState(false);
  const [isOpenCamp, setIsOpenCamp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const jsonpAdapter = require("axios-jsonp");
  document.body.classList.add("white-content");
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cnpj: { value: "", error: "", message: "" },
    rzSoc: { value: "", error: "", message: "" },
    nomeAbv: { value: "", error: "", message: "" },
    representante: { value: "", error: "", message: "" },
    tipoComiss: { value: null, error: "", message: "", optional: true },
    fone: { value: "", error: "", message: "", optional: true },
    site: { value: "", error: "", message: "", optional: true },
    atvPrincipal: { value: "", error: "", message: "" },
    CampanhaIds: {
      value: "",
      error: "",
      message: "",
      array: [],
      optional: true
    },
    fantasia: { value: "", error: "", message: "", optional: true }
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    const { empresa, acessible } = store.getState().auth;
    const { nome, id } = store.getState().auth.user.Colab;
    setColab(nome);
    switch (!!acessible.find(acc => acc === "acessoRestrito")) {
      case true:
        setAccess("acessoRestrito");
        break;
      case false:
        setAccess("acessoTotal");
        break;
      default:
    }
    async function loadData() {
      const response = await api.get(`empresa/${empresa}`);
      const response2 = await api.get(`representante/`);
      const response3 = await api.get(`campanha/`);
      setData2(response2.data);
      setData3(response3.data);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id },
        representante: {
          value:
            access === "acessoRestrito"
              ? response2.data.find(arr => arr.ColabId === id).id
              : ""
        }
      }));
      setIsLoading(false);
    }
    loadData();
  }, [access, colab]);

  let options = {};
  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj == "") return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999"
    )
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
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

  async function cnpjRequest(value) {
    const currentValue = value.replace(/[^\d]/g, "");
    if (validarCNPJ(currentValue)) {
      const response1 = await api.get(`/cliente/?cnpj=${currentValue}`);
      if (response1.data) {
        setValues(prevState => ({
          ...prevState,
          cnpj: {
            error: "has-danger",
            message: "O CNPJ já existe"
          }
        }));
        options = {
          place: "tr",
          message: (
            <div>
              <div>O CNPJ informado já existe como prospect ou cliente </div>
            </div>
          ),
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          autoDismiss: 7
        };
        notify();
      } else {
        const response = await axios({
          url: `https://www.receitaws.com.br/v1/cnpj/${currentValue}`,
          adapter: jsonpAdapter
        });
        if (response.data.status === "ERROR") {
          setValues(prevState => ({
            ...prevState,
            cnpj: {
              error: "has-danger",
              message: "Insira um CNPJ válido"
            }
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
            autoDismiss: 7
          };
          notify();
        } else {
          document.getElementById("atvPrincipal").value =
            response.data.atividade_principal[0].text;
          document.getElementById("situacao").value = response.data.situacao;
          document.getElementById("cep").value = response.data.cep;
          document.getElementById("rua").value = response.data.logradouro;
          document.getElementById("numero").value = response.data.numero;
          document.getElementById("bairro").value = response.data.bairro;
          document.getElementById("cidade").value = response.data.municipio;
          document.getElementById("uf").value = response.data.uf;
          document.getElementById("complemento").value =
            response.data.complemento;
          setValues(prevState => ({
            ...prevState,
            rzSoc: { value: response.data.nome },
            fantasia: { value: response.data.fantasia, optional: true },
            atvPrincipal: { value: response.data.atividade_principal[0].text }
          }));
        }
      }
    } else {
      setValues(prevState => ({
        ...prevState,
        cnpj: {
          error: "has-danger",
          message: "Insira um CNPJ válido"
        }
      }));
      options = {
        place: "tr",
        message: (
          <div>
            <div>O CNPJ é inválido</div>
          </div>
        ),
        type: "danger",
        icon: "tim-icons icon-alert-circle-exc",
        autoDismiss: 7
      };
      notify();
    }
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
    const numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const verifyUrl = value => {
    const UrlRegex = new RegExp(
      "(https:[/][/]|http:[/][/])[a-zA-Z0-9-.]+(.[.][a-zA-Z]{2,6})(:[0-9]{1,5})*(/($|[a-zA-Z0-9.,;?'\\+&amp;%$#=~_-]+))*$"
    );
    if (value) {
      if (UrlRegex.test(value)) {
        return true;
      }
      return false;
    }
    return true;
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
      case "url":
        if (verifyUrl(target)) {
          setValues(prevState => ({
            ...prevState,
            [name]: { value: target, error: "has-success", optional: true }
          }));
        } else {
          setValues(prevState => ({
            ...prevState,
            [name]: {
              value: target,
              error: "has-danger",
              message: "Insira uma URL no padrão 'https://www.exemplo.com'",
              optional: true
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
        setValues(prevState => ({
          ...prevState,
          [name]: { value: target, optional: true }
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

  const isValidated = () => {
    const aux = Object.entries(values);
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
      if (!aux[j][1].optional === true) {
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
    }

    if (valid && filled) {
      values.cnpj.value = values.cnpj.value.replace(/[^\d]+/g, "");
      values.fone.value = values.fone.value.replace(/[^\d]+/g, "");
      return true;
    }
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
  };

  useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    state: {
      EmpresaId: values.empresaId.value,
      CNPJ: values.cnpj.value,
      rzSoc: values.rzSoc.value,
      fantasia: values.fantasia.value,
      nomeAbv: values.nomeAbv.value,
      RepresentanteId: values.representante.value,
      TipoComisseId: values.tipoComiss.value,
      prospect: true,
      CampanhaIds: values.CampanhaIds.array,
      site: values.site.value,
      fone: values.fone.value,
      atvPrincipal: values.atvPrincipal.value
    }
  }));

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="rna-container">
            <NotificationAlert ref={notifyElment} />
          </div>
          <div className="content">
            <Modal
              onClose={() => {
                setIsOpenRepr(!isOpenRepr);
              }}
              open={isOpenRepr}
            >
              <Header>
                {" "}
                <Tooltip title="Fechar">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpenRepr(false);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Close fontSize="large" />
                  </Button>
                </Tooltip>{" "}
                <h4 className="modalHeader">Representante</h4>
              </Header>
              <ReactTable
                data={data2.map((repr, index) => {
                  return {
                    idd: index,
                    id: repr.id,
                    Empresa: repr.Empresa.nome,
                    nome: repr.nome,
                    TipoComisse: repr.TipoComisse.desc,
                    vlrFixMens: normalizeCurrency(
                      JSON.stringify(repr.vlrFixMens)
                    ),
                    dtAdmiss: repr.Colab === null ? "--" : repr.Colab.dtAdmiss,
                    perfil: repr.Colab === null ? "--" : repr.Colab.Perfil.desc
                  };
                })}
                getTdProps={(state, rowInfo) => {
                  return {
                    onClick: () => {
                      setValues(prevState => ({
                        ...prevState,
                        representante: { value: rowInfo.original.id }
                      }));
                      document.getElementsByName("representante")[0].value =
                        rowInfo.original.nome;
                      setIsOpenRepr(false);
                    }
                  };
                }}
                filterable
                defaultFilterMethod={(filter, row) => {
                  const id = filter.pivotId || filter.id;
                  return row[id] !== undefined
                    ? String(row[id])
                        .toLowerCase()
                        .includes(filter.value.toLowerCase())
                    : true;
                }}
                previousText="Anterior"
                nextText="Próximo"
                loadingText="Carregando"
                noDataText="Dados não encontrados"
                pageText="Página"
                ofText="de"
                rowsText="Linhas"
                columns={[
                  {
                    Header: "Nome",
                    accessor: "nome"
                  },
                  {
                    Header: "Comissão",
                    accessor: "TipoComisse"
                  },
                  {
                    Header: "Data Admissão",
                    accessor: "dtAdmiss"
                  },
                  {
                    Header: "Perfil",
                    accessor: "perfil"
                  }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
              />
              <Footer />
            </Modal>

            <Modal
              onClose={() => {
                setIsOpenCamp(!isOpenCamp);
              }}
              open={isOpenCamp}
            >
              <Header>
                {" "}
                <Tooltip title="Fechar">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpenCamp(false);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Close fontSize="large" />
                  </Button>
                </Tooltip>{" "}
                <h4 className="modalHeader">Campanha</h4>
              </Header>

              <ReactTable
                data={data3.map((camp, index) => {
                  return {
                    idd: index,
                    id: camp.id,
                    cod: camp.cod,
                    desc: camp.desc
                  };
                })}
                getTdProps={(state, rowInfo) => {
                  return {
                    onClick: () => {
                      setValues(prevState => ({
                        ...prevState,
                        CampanhaIds: {
                          value: "filled",
                          array: [rowInfo.original.id]
                        }
                      }));
                      document.getElementsByName(
                        "CampanhaIds"
                      )[0].value = `${rowInfo.original.cod} - ${rowInfo.original.desc}`;
                      setIsOpenCamp(false);
                    }
                  };
                }}
                filterable
                defaultFilterMethod={(filter, row) => {
                  const id = filter.pivotId || filter.id;
                  return row[id] !== undefined
                    ? String(row[id])
                        .toLowerCase()
                        .includes(filter.value.toLowerCase())
                    : true;
                }}
                previousText="Anterior"
                nextText="Próximo"
                loadingText="Carregando"
                noDataText="Dados não encontrados"
                pageText="Página"
                ofText="de"
                rowsText="Linhas"
                columns={[
                  {
                    Header: "Código",
                    accessor: "cod"
                  },
                  {
                    Header: "Descrição",
                    accessor: "desc"
                  }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
              />

              <Footer>
                <Button
                  className="btn-neutral"
                  onClick={() => {
                    setIsOpenCamp(false);
                  }}
                >
                  Close
                </Button>
              </Footer>
            </Modal>
            <Row>
              <Col md="12">
                <Card>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="4">
                          <Label>CNPJ</Label>
                          <FormGroup
                            className={`has-label ${values.cnpj.error}`}
                          >
                            <Input
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
                                cnpjRequest(value);
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
                          <Label>Situação Cadastral</Label>
                          <FormGroup className="has-label">
                            <Input
                              disabled
                              id="situacao"
                              name="situacao"
                              type="text"
                            />
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
                      </Row>

                      <Row>
                        <Col md="4">
                          <Label>Nome Fantasia</Label>
                          <FormGroup
                            className={`has-label ${values.fantasia.error}`}
                          >
                            <Input
                              disabled
                              onChange={event =>
                                handleChange(event, "fantasia", "optional")
                              }
                              value={values.fantasia.value}
                              name="nomeAbv"
                              type="text"
                            />
                            {values.fantasia.error === "has-danger" ? (
                              <Label className="error">
                                {values.fantasia.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Nome Abreviado</Label>
                          <FormGroup
                            className={`has-label ${values.nomeAbv.error}`}
                          >
                            <Input
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
                            {access === "acessoTotal" && (
                              <InputGroup>
                                <Input
                                  disabled
                                  name="representante"
                                  type="text"
                                  onChange={event =>
                                    handleChange(event, "representante", "text")
                                  }
                                  defaultValue={
                                    access === "acessoRestrito" ? colab : ""
                                  }
                                  placeholder="Selecione um representante"
                                />
                                <InputGroupAddon
                                  className="appendCustom"
                                  addonType="append"
                                >
                                  <Button
                                    className={classNames(
                                      "btn-icon btn-link like addon"
                                    )}
                                    onClick={() => {
                                      setIsOpenRepr(true);
                                    }}
                                  >
                                    <i className="tim-icons icon-zoom-split addon" />
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                            )}
                            {access === "acessoRestrito" && (
                              <Input
                                disabled
                                name="representante"
                                type="text"
                                onChange={event =>
                                  handleChange(event, "representante", "text")
                                }
                                defaultValue={
                                  access === "acessoRestrito" ? colab : ""
                                }
                                placeholder="Selecione um representante"
                              />
                            )}
                            {values.representante.error === "has-danger" ? (
                              <Label className="error">
                                {values.representante.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Site</Label>
                          <FormGroup
                            className={`has-label ${values.site.error}`}
                          >
                            <Input
                              name="site"
                              type="text"
                              onChange={event =>
                                handleChange(event, "site", "url")
                              }
                              value={values.site.value}
                            />
                            {values.site.error === "has-danger" ? (
                              <Label className="error">
                                {values.site.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Telefone</Label>
                          <FormGroup
                            className={`has-label ${values.fone.error}`}
                          >
                            <Input
                              minLength={10}
                              maxLength={11}
                              name="fone"
                              type="text"
                              onChange={event =>
                                handleChange(event, "fone", "optional")
                              }
                              onBlur={e => {
                                const { value } = e.target;
                                setValues(prevState => ({
                                  ...prevState,
                                  fone: {
                                    value: normalizeFone(value),
                                    optional: true
                                  }
                                }));
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
                          <Label>Campanhas</Label>
                          <FormGroup
                            className={`has-label ${values.CampanhaIds.error}`}
                          >
                            <InputGroup>
                              <Input
                                disabled
                                name="CampanhaIds"
                                type="text"
                                onChange={event =>
                                  handleChange(event, "CampanhaIds", "text")
                                }
                                placeholder="Selecione as Campanhas"
                              />
                              <InputGroupAddon
                                className="appendCustom"
                                addonType="append"
                              >
                                <Button
                                  className={classNames(
                                    "btn-icon btn-link like addon"
                                  )}
                                  onClick={() => {
                                    setIsOpenCamp(true);
                                  }}
                                >
                                  <i className="tim-icons icon-zoom-split addon" />
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>

                            {values.CampanhaIds.error === "has-danger" ? (
                              <Label className="error">
                                {values.CampanhaIds.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Label>Atividade Principal</Label>
                          <FormGroup className="has-label">
                            <Input
                              disabled
                              name="atvPrincipal"
                              id="atvPrincipal"
                              type="textarea"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
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
});
export default CadastroCliente;
