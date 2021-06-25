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
import classNames from "classnames";
import ReactTable from "react-table-v6";
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
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import { List } from "@material-ui/icons";
import { store } from "~/store";
import api from "~/services/api";
import { campanhaCadastro } from "~/store/modules/Cliente/actions";
import Modal from "~/components/Modal/modalLarge";
import { Header, Footer } from "~/components/Modal/modalStyles";
import { normalizeCnpj, normalizeCpf } from "~/normalize";

export default function CadastroCampanha() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cod: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" },
    ClienteIds: {
      value: "",
      error: "",
      message: "",
      array: [],
      optional: true
    },
    dataInic: { value: "", error: "", message: "" },
    dataFim: { value: "", error: "", message: "" },
    ColabId: { value: "", error: "", message: "" }
  };
  let reactTable = useRef(null);
  const [values, setValues] = useState(stateSchema);
  const [isOpen, setIsOpen] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [defaultFilteredData, setDefaultFilteredData] = useState([]);
  const [isOpenColab, setIsOpenColab] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      const response = await api.get(`/cliente`);
      const response1 = await api.get(`/empresa/${empresa}`);
      const response2 = await api.get(`/colab`);
      setData(response.data);
      setData2(response2.data);
      setDefaultFilteredData(
        response.data.map((client, index) => {
          return {
            _original: {
              idd: index,
              id: client.id,
              CNPJ: normalizeCnpj(client.CNPJ),
              nomeAbv: client.nomeAbv,
              RepresentanteId: client.RepresentanteId,
              Representante: client.Representante.nome,
              rzSoc: client.rzSoc,
              TipoComisseId: client.TipoComisseId,
              TipoComiss: checkDesc(client.TipoComisse.desc),
              EmpresaId: client.EmpresaId,
              prospect: checkProsp(client.prospect),
              implantacao: client.createdAt
            }
          };
        })
      );
      setFilteredData({
        data: response.data.map((client, index) => {
          return {
            _original: {
              idd: index,
              id: client.id,
              CNPJ: normalizeCnpj(client.CNPJ),
              nomeAbv: client.nomeAbv,
              RepresentanteId: client.RepresentanteId,
              Representante: client.Representante.nome,
              rzSoc: client.rzSoc,
              TipoComisseId: client.TipoComisseId,
              TipoComiss: checkDesc(client.TipoComisse.desc),
              EmpresaId: client.EmpresaId,
              prospect: checkProsp(client.prospect),
              implantacao: client.createdAt
            }
          };
        }),
        default: true
      });
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response1.data.id }
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

  const checker = () => {
    if (!isOpen && !filteredData.default) {
      setFilteredData({ data: defaultFilteredData, default: true });
    }
  };
  checker();
  const handleChange = (event, name, type) => {
    event.persist();
    const target = event.target.value;
    switch (type) {
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
    console.log(aux);
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
      dispatch(
        campanhaCadastro(
          values.empresaId.value,
          values.cod.value,
          values.desc.value,
          values.ClienteIds.array,
          values.dataInic.value,
          values.dataFim.value,
          values.ColabId.value
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
        autoDismiss: 7
      };
      notify();
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

  const checkProsp = value => {
    switch (value) {
      case true:
        return "Prospect";
      case false:
        return "Cliente";
      default:
    }
  };
  console.log(filteredData);
  console.log(values.ClienteIds.array);

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
                setIsOpen(false);
              }}
              open={isOpen}
            >
              <Header>
                {" "}
                <h4 className="modalHeader">Clientes/Prospects</h4>
              </Header>

              <ReactTable
                ref={r => (reactTable = r)}
                onFilteredChange={() => {
                  setFilteredData({
                    data: reactTable.getResolvedState().sortedData,
                    default: false
                  });
                }}
                data={data.map((client, index) => {
                  return {
                    idd: index,
                    id: client.id,
                    CNPJ: normalizeCnpj(client.CNPJ),
                    nomeAbv: client.nomeAbv,
                    RepresentanteId: client.RepresentanteId,
                    Representante: client.Representante.nome,
                    rzSoc: client.rzSoc,
                    TipoComisseId: client.TipoComisseId,
                    TipoComiss: checkDesc(client.TipoComisse.desc),
                    EmpresaId: client.EmpresaId,
                    prospect: checkProsp(client.prospect),
                    implantacao: client.createdAt
                  };
                })}
                getTdProps={(state, rowInfo) => {
                  return {
                    onClick: () => {
                      console.log(rowInfo.row);
                      rowInfo.original.clicado = true;
                      // eslint-disable-next-line no-unused-expressions
                      values.ClienteIds.array.findIndex(
                        arr => arr === rowInfo.original.id
                      ) > -1
                        ? setValues(prevState => ({
                            ...prevState,
                            ClienteIds: {
                              optional: true,
                              value: "filled",
                              array: values.ClienteIds.array.filter(
                                arr => arr !== rowInfo.original.id
                              )
                            }
                          }))
                        : setValues(prevState => ({
                            ...prevState,
                            ClienteIds: {
                              optional: true,
                              value: "filled",
                              array: [
                                ...prevState.ClienteIds.array,
                                rowInfo.original.id
                              ]
                            }
                          }));
                    },
                    style: {
                      background:
                        values.ClienteIds.array.findIndex(
                          arr =>
                            arr ===
                            (rowInfo === undefined ? -1 : rowInfo.original.id)
                        ) > -1
                          ? "#ccffcc"
                          : null
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
                    Header: "Nome Abreviado",
                    accessor: "nomeAbv"
                  },
                  {
                    Header: "Razão Social",
                    accessor: "rzSoc",
                    minWidth: 250
                  },
                  {
                    Header: "Representante",
                    accessor: "Representante"
                  },
                  {
                    Header: "Tipo",
                    accessor: "prospect"
                  },
                  {
                    Header: "Implantação",
                    accessor: "implantacao"
                  }
                ]}
                defaultPageSize={6}
                pageSizeOptions={[6, 10, 50, 100]}
                className="-striped -highlight"
              />

              <Footer>
                <Button
                  className="btn-neutral"
                  onClick={() => {
                    setIsOpen(false);
                    setFilteredData({
                      data: defaultFilteredData,
                      default: true
                    });
                  }}
                >
                  Close
                </Button>
                <Button
                  style={{ float: "right" }}
                  className="btn-neutral"
                  onClick={() => {
                    for (let i = 0; i < filteredData.data.length; i += 1) {
                      setValues(prevState => ({
                        ...prevState,
                        ClienteIds: {
                          optional: true,
                          value: "filled",
                          array: [
                            ...prevState.ClienteIds.array,
                            filteredData.data[i]._original.id
                          ]
                        }
                      }));
                    }
                    setFilteredData({
                      data: defaultFilteredData,
                      default: true
                    });
                  }}
                >
                  Relacionar
                </Button>
              </Footer>
            </Modal>

            <Modal
              onClose={() => {
                setIsOpenColab(false);
              }}
              open={isOpenColab}
            >
              <Header>
                {" "}
                <h4 className="modalHeader">Responsável</h4>
              </Header>

              <ReactTable
                data={data2.map((colab, index) => {
                  return {
                    idd: index,
                    id: colab.id,
                    CPF: normalizeCpf(colab.CPF),
                    nome: colab.nome,
                    dtAdmiss: colab.dtAdmiss,
                    espec: colab.espec
                  };
                })}
                getTdProps={(state, rowInfo) => {
                  return {
                    onClick: () => {
                      setValues(prevState => ({
                        ...prevState,
                        ColabId: {
                          value: rowInfo.original.id
                        }
                      }));
                      document.getElementsByName("ColabId")[0].value =
                        rowInfo.original.nome;
                      setIsOpenColab(false);
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
                    Header: "CPF",
                    accessor: "CPF"
                  },
                  {
                    Header: "Data de Adimissão",
                    accessor: "dtAdmiss"
                  },
                  {
                    Header: "Especialidade",
                    accessor: "espec"
                  }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
              />

              <Footer />
            </Modal>

            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <Tooltip
                      title="Relacionamentos Campanha"
                      placement="top"
                      interactive
                    >
                      <Button
                        style={{
                          float: "right"
                        }}
                        className={classNames("btn-icon btn-link like")}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <List fontSize="large" />
                      </Button>
                    </Tooltip>
                    <CardTitle tag="h4">Campanha</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <Label>Código</Label>
                          <FormGroup
                            className={`has-label ${values.cod.error}`}
                          >
                            <Input
                              name="cod"
                              type="text"
                              onChange={event =>
                                handleChange(event, "cod", "text")
                              }
                              value={values.cod.value}
                            />{" "}
                            {values.cod.error === "has-danger" ? (
                              <Label className="error">
                                {values.cod.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="8">
                          <Label>Descrição</Label>
                          <FormGroup
                            className={`has-label ${values.desc.error}`}
                          >
                            <Input
                              name="desc"
                              type="text"
                              onChange={event =>
                                handleChange(event, "desc", "text")
                              }
                              value={values.desc.value}
                            />{" "}
                            {values.desc.error === "has-danger" ? (
                              <Label className="error">
                                {values.desc.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Responsável</Label>
                          <FormGroup
                            className={`has-label ${values.ColabId.error}`}
                          >
                            <InputGroup>
                              <Input
                                disabled
                                name="ColabId"
                                type="text"
                                onChange={event =>
                                  handleChange(event, "ColabId", "text")
                                }
                                placeholder="Selecione o Responsável"
                              />
                              <InputGroupAddon
                                className="appendCustom"
                                addonType="append"
                              >
                                <Button
                                  className={classNames(
                                    "btn-icon btn-link like addon"
                                  )}
                                  onClick={() => setIsOpenColab(!isOpenColab)}
                                >
                                  <i className="tim-icons icon-zoom-split addon" />
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>

                            {values.ColabId.error === "has-danger" ? (
                              <Label className="error">
                                {values.ColabId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Data Início</Label>
                          <FormGroup
                            className={`has-label ${values.dataInic.error}`}
                          >
                            <Input
                              name="dataInic"
                              type="date"
                              onChange={event =>
                                handleChange(event, "dataInic", "text")
                              }
                              value={values.dataInic.value}
                            />{" "}
                            {values.dataInic.error === "has-danger" ? (
                              <Label className="error">
                                {values.dataInic.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Data Fim</Label>
                          <FormGroup
                            className={`has-label ${values.dataFim.error}`}
                          >
                            <Input
                              name="dataFim"
                              type="date"
                              onChange={event =>
                                handleChange(event, "dataFim", "text")
                              }
                              value={values.dataFim.value}
                            />{" "}
                            {values.dataFim.error === "has-danger" ? (
                              <Label className="error">
                                {values.dataFim.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <Label>Objetivo</Label>
                          <FormGroup
                            className={`has-label ${values.ColabId.error}`}
                          >
                            <Input
                              name="ColabId"
                              type="textarea"
                              onChange={event =>
                                handleChange(event, "ColabId", "text")
                              }
                            />
                            {values.ColabId.error === "has-danger" ? (
                              <Label className="error">
                                {values.ColabId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

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
                      <Link to="/tabelas/cliente/campanha">
                        <Button
                          style={{
                            paddingLeft: 32,
                            paddingRight: 33,
                            float: "left"
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
