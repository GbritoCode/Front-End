/* eslint-disable no-unused-expressions */
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
import React, { useEffect, useState } from "react";
import classNames from "classnames";
// react component for creating dynamic tables
import ReactTable from "react-table-v6";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Button,
  Input,
  Label,
  Row,
  FormGroup
} from "reactstrap";

import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Close } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import api from "~/services/api";
import { normalizeCnpj, normalizeDatetime, normalizeFone } from "~/normalize";
import { store } from "~/store";

import { Footer, Header } from "~/components/Modal/modalStyles";
import Modal from "~/components/Modal/modalLarge";
import { sortDates } from "~/sortingMethodReactTable";
/* eslint-disable eqeqeq */
function EmpresasIncluidasCliCamp() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const { campId, inicDate, endDate } = useParams();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const status = new URLSearchParams(search).get("status");
  const [isOpen, setIsOpen] = useState();
  const [campData, setCampData] = useState();
  const [data, setData] = useState();
  const [access, setAccess] = useState("");
  const [Colab, setColab] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const stateSchema = {
    empresaId: "",
    cnpj: "",
    rzSoc: "",
    nomeAbv: "",
    representante: "",
    tipoComiss: "",
    fone: "",
    site: "",
    atvPrincipal: "",
    fantasia: "",
    erp: "",
    database: "",
    ramo: "",
    setor: "",
    qtdFuncionarios: ""
  };
  const [values, setValues] = useState(stateSchema);

  const history = useHistory();

  useEffect(() => {
    var situation;
    switch (status) {
      case "Atraídas":
        situation = "atraida";
        break;
      case "Convertidas":
        situation = "reuniaoAgend";
        break;
      case "Ativadas":
        situation = "orcamentoSolict";
        break;
      case "Alcançadas":
        situation = "efetivacao";
        break;

      default:
        break;
    }

    const { acessible } = store.getState().auth;
    const { id } = store.getState().auth.user.Colab;
    setColab(id);
    switch (true) {
      case !!acessible.find(acc => acc === "acessoRestrito"):
        setAccess("acessoRestrito");
        break;
      case !!acessible.find(acc => acc === "acessoTotal"):
        setAccess("acessoTotal");
        break;
      default:
    }
    async function loadData() {
      const response = await api.get(
        `comercialDash/?camp=${campId}&dataInic=${inicDate}&dataFim=${endDate}`
      );
      const response1 = await api.get(`/campanha/${campId}/true`);
      setCampData({
        cod: response1.data.cod,
        desc: response1.data.desc
      });
      setData(
        situation !== ""
          ? response.data.cliStatusPassing.rows
              .filter(arr => {
                const newDataInic = new Date(inicDate);
                const newDataFim = new Date(endDate);
                return (
                  newDataInic <= new Date(arr[situation]) &&
                  new Date(arr[situation]) <= newDataFim
                );
              })
              .map((camp, key) => {
                return {
                  idd: key,
                  id: camp.id,
                  campanhaDesc: camp.Campanha.desc,
                  Cliente: camp.Cliente.nomeAbv,
                  setor: camp.Cliente.setor ? camp.Cliente.setor : "--",
                  cidade: camp.Cliente.CliComp.cidade,
                  uf: camp.Cliente.CliComp.uf,
                  ramo: camp.Cliente.ramo ? camp.Cliente.ramo : "--",
                  contNome: camp.Cliente.CliConts[0]
                    ? camp.Cliente.CliConts[0].nome
                    : "--",
                  // eslint-disable-next-line no-nested-ternary
                  contCargo: camp.Cliente.CliConts[0]
                    ? camp.Cliente.CliConts[0].cargo
                      ? camp.Cliente.CliConts[0].cargo
                      : "--"
                    : "--",
                  data: normalizeDatetime(camp.createdAt),
                  actions: (
                    // we've added some custom button actions
                    <>
                      <div className="actions-right">
                        <Tooltip title="Visualizar">
                          <Button
                            color="default"
                            size="sm"
                            className={classNames("btn-icon btn-link like")}
                            onClick={() => {
                              setIsOpen(true);
                              setValues({
                                cnpj: normalizeCnpj(camp.Cliente.CNPJ),
                                fantasia: camp.Cliente.fantasia,
                                rzSoc: camp.Cliente.rzSoc,
                                nomeAbv: camp.Cliente.nomeAbv,
                                representante: camp.Cliente.Representante.nome,
                                site: camp.Cliente.site,
                                fone: normalizeFone(camp.Cliente.fone),
                                atvPrincipal: camp.Cliente.atvPrincipal
                              });
                            }}
                          >
                            <i className="tim-icons icon-zoom-split" />
                          </Button>
                        </Tooltip>

                        {/* use this button to remove the data row */}
                      </div>
                    </>
                  )
                };
              })
          : null
      );
      setIsLoading(false);
    }
    loadData();
  }, [Colab, access, campId, dispatch, endDate, history, inicDate, status]);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="content">
            <Modal
              onClose={() => {
                setIsOpen(!isOpen);
              }}
              open={isOpen}
            >
              <Header>
                {" "}
                <Tooltip title="Fechar">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Close fontSize="large" />
                  </Button>
                </Tooltip>{" "}
                <h4 className="modalHeader">
                  {values.nomeAbv} | {values.rzSoc}
                </h4>
              </Header>
              <Row>
                <Col sm="4">
                  <Label>CNPJ</Label>
                  <FormGroup className="has-label ">
                    <Input
                      disabled
                      maxLength={18}
                      name="cnpj"
                      type="text"
                      value={values.cnpj}
                    />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Nome Fanasia</Label>
                  <FormGroup className="has-label ">
                    <Input
                      disabled
                      value={values.fantasia}
                      name="nomeAbv"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Representante</Label>
                  <FormGroup className="has-label ">
                    <Input
                      disabled
                      name="representante"
                      type="text"
                      value={values.representante}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <Label>Site</Label>
                  <FormGroup className="has-label ">
                    <Input
                      disabled
                      name="site"
                      type="text"
                      value={values.site}
                    />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Telefone</Label>
                  <FormGroup className="has-label ">
                    <Input
                      disabled
                      minLength={10}
                      maxLength={11}
                      name="fone"
                      type="text"
                      value={values.fone}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <Label>Atividade Principal</Label>
                  <FormGroup className="has-label">
                    <Input
                      disabled
                      name="atvPrincipal"
                      id="atvPrincipal"
                      type="textarea"
                      value={values.atvPrincipal}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Footer />
            </Modal>
            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <Link to="/dashboardComercial">
                    <Tooltip title="Voltar">
                      <Button
                        style={{
                          float: "right"
                        }}
                        className={classNames("btn-icon btn-link like")}
                      >
                        <span className="material-icons">logout</span>{" "}
                      </Button>
                    </Tooltip>
                  </Link>

                  <h3 style={{ marginBottom: 0 }}>Empresas {status}</h3>
                  <p style={{ fontSize: 14 }}>
                    {campData.cod} | {campData.desc}
                  </p>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={data}
                    filterable
                    resizable
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
                        Header: "Empresa",
                        accessor: "Cliente"
                      },
                      {
                        Header: "Cidade",
                        accessor: "cidade"
                      },
                      {
                        Header: "UF",
                        accessor: "uf",
                        maxWidth: 50
                      },
                      {
                        Header: "Ramo",
                        accessor: "ramo"
                      },
                      {
                        Header: "Setor",
                        accessor: "setor"
                      },
                      {
                        Header: "Contato",
                        accessor: "contNome"
                      },
                      {
                        Header: "Cargo",
                        accessor: "contCargo"
                      },
                      {
                        Header: "Data",
                        accessor: "data",
                        // minWidth: 100,
                        sortMethod: sortDates()
                      },
                      {
                        Header: "Ações",
                        accessor: "actions",
                        sortable: false,
                        filterable: false
                      }
                    ]}
                    defaultPageSize={10}
                    showPagination
                    showPageJump
                    showPaginationBottom
                    className="-striped -highlight"
                  />
                </CardBody>
              </Card>
            </Col>
          </div>
        </>
      )}
    </>
  );
}

export default EmpresasIncluidasCliCamp;
