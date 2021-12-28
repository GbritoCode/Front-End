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
import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import ReactTable from "react-table-v6";

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
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { normalizeCnpj, normalizeCurrency, normalizeFone } from "~/normalize";
import { store } from "~/store";
import api from "~/services/api";
import { movCaixaCadastro } from "~/store/modules/comercial/actions";
import Modal from "~/components/Modal/modalLarge";
import { Footer, Header } from "~/components/Modal/modalStyles";

export default function MovimentoCaixaCadastro() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [fieldFornecCli, setFieldFornecCli] = useState("Cliente");
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenCli, setIsOpenCli] = useState(false);
  const [isOpenFornec, setIsOpenFornec] = useState(false);
  const [isOpenRecDesp, setIsOpenRecDesp] = useState(false);

  const stateSchema = {
    EmpresaId: { value: "", error: "", message: "" },
    RecDespId: { value: "", error: "", message: "" },
    ColabCreate: { value: "", error: "", message: "" },
    FornecId: { value: "", error: "", message: "", optional: true },
    ClienteId: { value: "", error: "", message: "", optional: true },
    valor: { value: "", error: "", message: "" },
    dtVenc: { value: "", error: "", message: "" },
    status: { value: 1, error: "", message: "" },
    desc: { value: "", error: "", message: "", optional: true }
  };

  const [values, setValues] = useState(stateSchema);
  const idColab = store.getState().auth.user.Colab.id;

  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      setIsLoading(true);

      const response = await api.get(`/empresa/${empresa}`);
      const response1 = await api.get(`/colab/?idColab=${idColab}`);
      const response2 = await api.get(`/cliente/?prospect=false`);
      const response3 = await api.get(`/rec_desp`);
      const response4 = await api.get(`/fornec`);

      setData1(response1.data);

      setData2(
        response2.data.map((client, key) => {
          return {
            idd: key,
            id: client.id,
            CNPJ: normalizeCnpj(client.CNPJ),
            nomeAbv: client.nomeAbv,
            contNome:
              client.CliConts.length === 0 ? "--" : client.CliConts[0].nome,
            contEmail:
              client.CliConts.length === 0 ? "--" : client.CliConts[0].email,
            RepresentanteId: client.RepresentanteId,
            Representante: client.Representante.nome,
            EmpresaId: client.EmpresaId,
            prospect: client.prospect
          };
        })
      );
      setData3(
        response3.data.map((recDesps, key) => {
          return {
            idd: key,
            id: recDesps.id,
            Empresa: recDesps.Empresa.nome,
            desc: recDesps.desc,
            recDesp: recDesps.recDesp === "Desp" ? "Desp" : "Rec",
            tipoItem: recDesps.tipoItem,
            contaContabil: recDesps.ContaContabil.cod,
            centCusto: recDesps.CentroCusto.cod
          };
        })
      );
      setData4(
        response4.data.map((fornec, key) => {
          return {
            idd: key,
            id: fornec.id,
            cnpj: normalizeCnpj(fornec.CNPJ),
            nome: fornec.nome,
            nomeConta: fornec.nomeConta,
            fone: normalizeFone(fornec.fone)
          };
        })
      );
      setValues(prevState => ({
        ...prevState,
        EmpresaId: { value: response.data.id },
        ColabCreate: { value: response1.data.id }
      }));
      setIsLoading(false);
    }
    loadData();
  }, [idColab]);
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
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
        setValues(prevState => ({
          ...prevState,
          [name]: { value: target, optional: true }
        }));
        break;
      case "currency":
        setValues(prevState => ({
          ...prevState,
          [name]: { value: normalizeCurrency(target) }
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

  const handleSubmit = evt => {
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
      var vlrDb = parseInt(values.valor.value.replace(/[.,]+/g, ""), 10) / 100;
      dispatch(
        movCaixaCadastro({
          EmpresaId: values.EmpresaId.value,
          RecDespId: values.RecDespId.value,
          ColabCreate: values.ColabCreate.value,
          FornecId: values.FornecId.value === "" ? null : values.FornecId.value,
          ClienteId:
            values.ClienteId.value === "" ? null : values.ClienteId.value,
          valor: fieldFornecCli === "Fornec" ? vlrDb * -1 : vlrDb,
          dtVenc: values.dtVenc.value,
          status: values.status.value,
          ColabId: idColab,
          desc: values.desc.value
        })
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
        autoDismiss: 7
      };
      notify();
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="content" />
        </>
      ) : (
        <>
          <div className="rna-container">
            <NotificationAlert ref={notifyElment} />
          </div>
          <div className="content">
            {/* -------------------------------
          -------------------------------
          -----------Cli Table-----------
          -------------------------------
          -------------------------------
          ------------------------------- */}
            <Modal
              onClose={() => {
                setIsOpenCli(!isOpenCli);
              }}
              open={isOpenCli}
            >
              <Header>
                {" "}
                <Tooltip title="Fechar">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpenCli(false);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Close fontSize="large" />
                  </Button>
                </Tooltip>{" "}
                <h4 className="modalHeader">Cliente</h4>
              </Header>

              <ReactTable
                data={data2}
                getTdProps={(state, rowInfo) => {
                  return {
                    onClick: () => {
                      if (rowInfo) {
                        setValues(prevState => ({
                          ...prevState,
                          ClienteId: {
                            value: rowInfo.original.id
                          }
                        }));
                        document.getElementsByName("ClienteId")[0].value = ` ${
                          rowInfo.original.nomeAbv
                        } - ${normalizeCnpj(rowInfo.original.CNPJ)}`;
                        setIsOpenCli(!isOpenCli);
                      }
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
                    Header: "CNPJ",
                    accessor: "CNPJ"
                  },
                  {
                    Header: "Nome Abreviado",
                    accessor: "nomeAbv"
                  },
                  {
                    Header: "Contato",
                    accessor: "contNome"
                  },
                  {
                    Header: "Email",
                    accessor: "contEmail"
                  },
                  {
                    Header: "Representante",
                    accessor: "Representante"
                  }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
              />

              <Footer>
                <Button
                  className="btn-neutral"
                  onClick={() => {
                    setIsOpenCli(false);
                  }}
                >
                  Close
                </Button>
              </Footer>
            </Modal>

            {/* -------------------------------
          -------------------------------
          -----------Cli Table-----------
          -------------------------------
          -------------------------------
          ------------------------------- */}

            {/* -------------------------------
          -------------------------------
          -----------Fornec Table-----------
          -------------------------------
          -------------------------------
          ------------------------------- */}
            <Modal
              onClose={() => {
                setIsOpenFornec(!isOpenFornec);
              }}
              open={isOpenFornec}
            >
              <Header>
                {" "}
                <Tooltip title="Fechar">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpenFornec(false);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Close fontSize="large" />
                  </Button>
                </Tooltip>{" "}
                <h4 className="modalHeader">Fornecedor</h4>
              </Header>

              <ReactTable
                data={data4}
                getTdProps={(state, rowInfo) => {
                  return {
                    onClick: () => {
                      if (rowInfo) {
                        setValues(prevState => ({
                          ...prevState,
                          FornecId: {
                            value: rowInfo.original.id
                          }
                        }));
                        document.getElementsByName(
                          "FornecId"
                        )[0].value = ` ${rowInfo.original.nomeConta}`;
                        setIsOpenFornec(!isOpenFornec);
                      }
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
                    Header: "cnpj",
                    accessor: "cnpj"
                  },
                  {
                    Header: "nome abreviado",
                    accessor: "nomeConta"
                  },
                  {
                    Header: "nome",
                    accessor: "nome"
                  },
                  {
                    Header: "telefone",
                    accessor: "fone"
                  }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
              />

              <Footer>
                <Button
                  className="btn-neutral"
                  onClick={() => {
                    setIsOpenCli(false);
                  }}
                >
                  Close
                </Button>
              </Footer>
            </Modal>

            {/* -------------------------------
          -------------------------------
          -----------Fornec Table-----------
          -------------------------------
          -------------------------------
          ------------------------------- */}

            {/* -------------------------------
          -------------------------------
          -----------RecDesp Table-----------
          -------------------------------
          -------------------------------
          ------------------------------- */}
            <Modal
              onClose={() => {
                setIsOpenRecDesp(!isOpenRecDesp);
              }}
              open={isOpenRecDesp}
            >
              <Header>
                {" "}
                <Tooltip title="Fechar">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpenRecDesp(false);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Close fontSize="large" />
                  </Button>
                </Tooltip>{" "}
                <h4 className="modalHeader">Receita/Despesa</h4>
              </Header>

              <ReactTable
                data={data3}
                getTdProps={(state, rowInfo) => {
                  return {
                    onClick: () => {
                      if (rowInfo) {
                        setValues(prevState => ({
                          ...prevState,
                          RecDespId: {
                            value: rowInfo.original.id
                          }
                        }));
                        document.getElementsByName(
                          "RecDespId"
                        )[0].value = `${rowInfo.original.recDesp} - ${rowInfo.original.desc}`;
                        if (rowInfo.original.recDesp === "Desp") {
                          setFieldFornecCli("Fornec");
                          setValues(prevState => ({
                            ...prevState,
                            ClienteId: {
                              value: "",
                              optional: true
                            }
                          }));
                          document.getElementsByName("ClienteId")[0].value = ``;
                        } else if (rowInfo.original.recDesp === "Rec") {
                          setFieldFornecCli("Cliente");
                          setValues(prevState => ({
                            ...prevState,
                            FornecId: {
                              value: "",
                              optional: true
                            }
                          }));
                          document.getElementsByName("FornecId")[0].value = ``;
                        }
                        setIsOpenRecDesp(!isOpenRecDesp);
                      }
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
                    Header: "Descrição",
                    accessor: "desc"
                  },
                  {
                    Header: "Tipo de Item",
                    accessor: "tipoItem"
                  },
                  {
                    Header: "Receita/Despesa",
                    accessor: "recDesp"
                  },
                  {
                    Header: "Conta Contábil",
                    accessor: "contaContabil"
                  },
                  {
                    Header: "centro de Custo",
                    accessor: "centCusto"
                  }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
              />

              <Footer>
                <Button
                  className="btn-neutral"
                  onClick={() => {
                    setIsOpenCli(false);
                  }}
                >
                  Close
                </Button>
              </Footer>
            </Modal>

            {/* -------------------------------
          -------------------------------
          -----------RecDesp Table-----------
          -------------------------------
          -------------------------------
          ------------------------------- */}
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Movimento Caixa</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <Label>Colaborador</Label>
                          <FormGroup
                            className={`has-label ${values.ColabCreate.error}`}
                          >
                            <Input
                              disabled
                              name="ColabCreate"
                              type="text"
                              onChange={event =>
                                handleChange(event, "ColabCreate", "text")
                              }
                              defaultValue={data1.nome}
                            />

                            {values.ColabCreate.error === "has-danger" ? (
                              <Label className="error">
                                {values.ColabCreate.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Receita/Despesa</Label>
                          <FormGroup
                            className={`has-label ${values.RecDespId.error}`}
                          >
                            <InputGroup>
                              <Input disabled name="RecDespId" type="text" />{" "}
                              <InputGroupAddon
                                className="appendCustom"
                                addonType="append"
                              >
                                <Button
                                  className={classNames(
                                    "btn-icon btn-link like addon"
                                  )}
                                  onClick={() => {
                                    setIsOpenRecDesp(true);
                                  }}
                                >
                                  <i className="tim-icons icon-zoom-split addon" />
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>

                            {values.RecDespId.error === "has-danger" ? (
                              <Label className="error">
                                {values.RecDespId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col hidden={fieldFornecCli !== "Fornec"} md="4">
                          <Label>Fornecedor</Label>
                          <FormGroup
                            className={`has-label ${values.FornecId.error}`}
                          >
                            <InputGroup>
                              <Input disabled name="FornecId" type="text" />{" "}
                              <InputGroupAddon
                                className="appendCustom"
                                addonType="append"
                              >
                                <Button
                                  className={classNames(
                                    "btn-icon btn-link like addon"
                                  )}
                                  onClick={() => {
                                    setIsOpenFornec(true);
                                  }}
                                >
                                  <i className="tim-icons icon-zoom-split addon" />
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>

                            {values.FornecId.error === "has-danger" ? (
                              <Label className="error">
                                {values.FornecId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col hidden={fieldFornecCli !== "Cliente"} md="4">
                          <Label>Cliente</Label>
                          <FormGroup
                            className={`has-label ${values.ClienteId.error}`}
                          >
                            <InputGroup>
                              <Input disabled name="ClienteId" type="text" />{" "}
                              <InputGroupAddon
                                className="appendCustom"
                                addonType="append"
                              >
                                <Button
                                  className={classNames(
                                    "btn-icon btn-link like addon"
                                  )}
                                  onClick={() => {
                                    setIsOpenCli(true);
                                  }}
                                >
                                  <i className="tim-icons icon-zoom-split addon" />
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>
                            {values.ClienteId.error === "has-danger" ? (
                              <Label className="error">
                                {values.ClienteId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Valor</Label>
                          <FormGroup
                            className={`has-label ${values.valor.error}`}
                          >
                            <Input
                              name="valor"
                              type="text"
                              onChange={event =>
                                handleChange(event, "valor", "currency")
                              }
                              value={values.valor.value}
                            />
                            {values.valor.error === "has-danger" ? (
                              <Label className="error">
                                {values.valor.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Data Vencimento</Label>
                          <FormGroup
                            className={`has-label ${values.dtVenc.error}`}
                          >
                            <Input
                              name="dtVenc"
                              type="date"
                              onChange={event =>
                                handleChange(event, "dtVenc", "text")
                              }
                              value={values.dtVenc.value}
                            />
                            {values.dtVenc.error === "has-danger" ? (
                              <Label className="error">
                                {values.dtVenc.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Situação</Label>
                          <FormGroup
                            className={`has-label ${values.status.error}`}
                          >
                            <Input
                              disabled
                              name="status"
                              type="select"
                              onChange={event =>
                                handleChange(event, "status", "text")
                              }
                              value={values.status.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione a situação{" "}
                              </option>
                              <option value="1">Aberto</option>
                              <option value="2">Parcial</option>
                              <option value="3">Liquidado</option>
                            </Input>
                            {values.status.error === "has-danger" ? (
                              <Label className="error">
                                {values.status.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12" />
                      </Row>
                      <Label>Descrição</Label>
                      <FormGroup className={`has-label ${values.desc.error}`}>
                        <Input
                          disabled
                          name="desc"
                          type="textarea"
                          onChange={event =>
                            handleChange(event, "optional", "text")
                          }
                          value={values.desc.value}
                        />
                        {values.desc.error === "has-danger" ? (
                          <Label className="error">{values.desc.message}</Label>
                        ) : null}
                      </FormGroup>
                      <Row />

                      <Link to="/tabelas/comercial/movimentoCaixa">
                        <Button
                          style={{
                            paddingLeft: 32,
                            paddingRight: 33
                          }}
                          color="secundary"
                          size="small"
                          className="form"
                        >
                          <i
                            className="tim-icons icon-double-left"
                            style={{
                              paddingBottom: 4,
                              paddingRight: 1
                            }}
                            size="large"
                          />{" "}
                          Voltar
                        </Button>
                      </Link>
                      <Button
                        style={{
                          paddingLeft: 29,
                          paddingRight: 30
                        }}
                        className="form"
                        color="info"
                        type="submit"
                      >
                        Enviar{" "}
                        <i
                          className="tim-icons icon-send"
                          style={{
                            paddingBottom: 4,
                            paddingLeft: 3
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
    </>
  );
}
