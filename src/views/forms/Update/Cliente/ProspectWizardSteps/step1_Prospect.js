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
import { normalizeCnpj, normalizeCurrency } from "~/normalize";
import { store } from "~/store";
import api from "~/services/api";
import Modal from "~/components/Modal/modalLarge";
import { Header, Footer } from "~/components/Modal/modalStyles";

/* eslint-disable eqeqeq */
const CadastroCliente = forwardRef((props, ref) => {
  // --------- colocando no modo claro do template
  const [isOpenRepr, setIsOpenRepr] = useState(false);
  const [isOpenCamp, setIsOpenCamp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const jsonpAdapter = require("axios-jsonp");
  document.body.classList.add("white-content");
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cnpj: { value: "", error: "", message: "" },
    rzSoc: { value: "", error: "", message: "" },
    nomeAbv: { value: "", error: "", message: "" },
    representante: { value: "", error: "", message: "" },
    tipoComiss: { value: "", error: "", message: "" },
    CampanhaIds: {
      value: "",
      error: "",
      message: "",
      array: [],
      optional: true
    }
  };
  const optionalSchema = {
    fantasia: { value: "", error: "", message: "" }
  };
  const [optional, setOptional] = useState(optionalSchema);
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      const response = await api.get(`empresa/${empresa}`);
      const response1 = await api.get(`tipoComiss/`);
      const response2 = await api.get(`representante/`);
      const response3 = await api.get(`campanha/`);
      setData1(response1.data);
      setData2(response2.data);
      setData3(response3.data);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id }
      }));
      setIsLoading(false);
    }
    loadData();
  }, []);

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
      setValues(prevState => ({
        ...prevState,
        rzSoc: { value: response.data.nome }
      }));
      setOptional(prevState => ({
        ...prevState,
        fantasia: { value: response.data.fantasia }
      }));
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

  const checkDesc = value => {
    switch (value) {
      case 1:
        return "Indicação";
      case 2:
        return "Representação";
      case 3:
        return "Prospecção";
      case 4:
        return "Interna";
      default:
    }
  };

  const verifyNumber = value => {
    const numberRex = new RegExp("^[0-9]+$");
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

      case "cnpj":
        setValues(prevState => ({
          ...prevState,
          cnpj: { value: normalizeCnpj(target) }
        }));
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
      nomeAbv: values.nomeAbv.value,
      RepresentanteId: values.representante.value,
      TipoComisseId: values.tipoComiss.value,
      prospect: true,
      CampanhaIds: values.CampanhaIds.array
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
                    )
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
                    Header: "Valor Fixo Mensal",
                    accessor: "vlrFixMens"
                  },
                  {
                    Header: "Comissão",
                    accessor: "TipoComisse"
                  }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
              />
              <Footer>
                <Button
                  className="btn-neutral"
                  onClick={() => {
                    setIsOpenRepr(false);
                  }}
                >
                  Close
                </Button>
              </Footer>
            </Modal>

            <Modal
              onClose={() => {
                setIsOpenCamp(!isOpenCamp);
              }}
              open={isOpenCamp}
            >
              <Header>
                {" "}
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
                          array: [
                            ...prevState.CampanhaIds.array,
                            rowInfo.original.id
                          ]
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
                        <Col md="4">
                          <Label>Nome Fanasia</Label>
                          <FormGroup
                            className={`has-label ${optional.fantasia.error}`}
                          >
                            <Input
                              disabled
                              onChange={event =>
                                handleChange(event, "fantasia", "optional")
                              }
                              value={optional.fantasia.value}
                              name="nomeAbv"
                              type="text"
                            />
                            {optional.fantasia.error === "has-danger" ? (
                              <Label className="error">
                                {optional.fantasia.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
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
                            <InputGroup>
                              <Input
                                disabled
                                name="representante"
                                type="text"
                                onChange={event =>
                                  handleChange(event, "representante", "text")
                                }
                                placeholder="Selecione um Representante"
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

                            {values.representante.error === "has-danger" ? (
                              <Label className="error">
                                {values.representante.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Tipo Comissão</Label>
                          <FormGroup
                            className={`has-label ${values.tipoComiss.error}`}
                          >
                            <Input
                              name="tipoComiss"
                              type="select"
                              onChange={event =>
                                handleChange(event, "tipoComiss", "text")
                              }
                              onChangeCapture={async () => {
                                const response2 = await axios({
                                  url: `https://www.receitaws.com.br/v1/cnpj/${values.cnpj.value.replace(
                                    /[^\d]+/g,
                                    ""
                                  )}`,
                                  adapter: jsonpAdapter
                                });
                                if (response2.data.status === "ERROR") {
                                  setValues(prevState => ({
                                    ...prevState,
                                    cnpj: {
                                      error: "has-danger",
                                      message: "Insira um CNPJ válido"
                                    }
                                  }));
                                } else {
                                  sessionStorage.setItem(
                                    "cliData",
                                    JSON.stringify(values)
                                  );
                                  sessionStorage.setItem(
                                    "compData",
                                    JSON.stringify({
                                      ClienteId: {
                                        value: "",
                                        error: "",
                                        message: ""
                                      },
                                      CondPgmtoId: {
                                        value: "",
                                        error: "",
                                        message: ""
                                      },
                                      cep: { value: response2.data.cep },
                                      rua: { value: response2.data.logradouro },
                                      numero: { value: response2.data.numero },
                                      bairro: { value: response2.data.bairro },
                                      cidade: {
                                        value: response2.data.municipio
                                      },
                                      uf: { value: response2.data.uf },
                                      inscMun: {
                                        value: "",
                                        error: "",
                                        message: ""
                                      },
                                      inscEst: {
                                        value: "",
                                        error: "",
                                        message: ""
                                      }
                                    })
                                  );
                                }
                              }}
                              value={values.tipoComiss.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o tipo de comissão{" "}
                              </option>
                              {data1.map(tipoComiss => (
                                <option value={tipoComiss.id}>
                                  {" "}
                                  {tipoComiss.id} - {checkDesc(tipoComiss.desc)}{" "}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
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
