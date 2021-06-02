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
  InputGroupAddon,
  ModalBody,
  Modal
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import { Close, Message } from "@material-ui/icons";
import { normalizeCnpj } from "~/normalize";
import { store } from "~/store";
import api from "~/services/api";

/* eslint-disable eqeqeq */
const CadastroCliente = forwardRef((props, ref) => {
  // --------- colocando no modo claro do template
  const [modalMini, setModalMini] = useState(false);
  const [stateAux, setStateAux] = useState("");
  const toggleModalMini = () => {
    setModalMini(!modalMini);
  };
  const jsonpAdapter = require("axios-jsonp");
  document.body.classList.add("white-content");
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cnpj: { value: "", error: "", message: "" },
    rzSoc: { value: "", error: "", message: "" },
    nomeAbv: { value: "", error: "", message: "" },
    representante: { value: "", error: "", message: "" },
    tipoComiss: { value: "", error: "", message: "" }
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
      setData1(response1.data);
      setData2(response2.data);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id }
      }));
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
      case "1":
        return "Indicação";
      case "2":
        return "Representação";
      case "3":
        return "Prospecção";
      case "4":
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
      prospect: true
    }
  }));

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notifyElment} />
      </div>
      <div className="content">
        <Modal
          modalClassName="modal-mini "
          isOpen={modalMini}
          toggle={toggleModalMini}
        >
          <div className="modal-header justify-content-center">
            <button
              aria-hidden
              className="close"
              data-dismiss="modal"
              type="button"
              color="primary"
              onClick={toggleModalMini}
            >
              <Close />
            </button>
            <div>
              <Message fontSize="large" />
            </div>
          </div>
          <ModalBody className="text-center">
            <Label>Filtrar</Label>
            <Input onChange={e => setStateAux(e.target.value)} />
            <div>
              <ul>
                {console.log(values)}
                {data2.map(
                  repr =>
                    repr.nome.includes(stateAux) && (
                      <li
                        onClick={() => {
                          setModalMini(!modalMini);
                          document.getElementsByName("representante")[0].value =
                            repr.nome;
                          setValues(prevState => ({
                            ...prevState,
                            representante: { value: repr.id }
                          }));
                        }}
                      >
                        {repr.nome}
                      </li>
                    )
                )}
              </ul>
            </div>
          </ModalBody>
          <div className="modal-footer">
            <Button
              style={{ color: "#000" }}
              className="btn-neutral"
              type="button"
              onClick={toggleModalMini}
            >
              Não
            </Button>
            <Button
              style={{ color: "#7E7E7E" }}
              className="btn-neutral"
              type="button"
              onClick={() => {}}
            >
              Sim
            </Button>
          </div>
        </Modal>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="4">
                      <Label>CNPJ</Label>
                      <FormGroup className={`has-label ${values.cnpj.error}`}>
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
                          <Label className="error">{values.cnpj.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Input
                      hidden
                      value={stateAux}
                      id="filtrandoRepresentantesModal"
                    />
                    <Col md="4">
                      <Label>Razão Social</Label>
                      <FormGroup className={`has-label ${values.rzSoc.error}`}>
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
                            name="representante"
                            type="text"
                            onChange={event =>
                              handleChange(event, "representante", "text")
                            }
                          />
                          <InputGroupAddon
                            className="appendCustom"
                            addonType="append"
                          >
                            <Button onClick={() => setModalMini(!modalMini)}>
                              <i className="tim-icons icon-zoom-split" />
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
                                  cidade: { value: response2.data.municipio },
                                  uf: { value: response2.data.uf },
                                  inscMun: {
                                    value: "",
                                    error: "",
                                    message: ""
                                  },
                                  inscEst: { value: "", error: "", message: "" }
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
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
});
export default CadastroCliente;
