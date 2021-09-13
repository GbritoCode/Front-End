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

import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ArrowBackIos, Close } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import fileDownload from "js-file-download";
import api from "~/services/api";
import { normalizeCnpj, normalizeDatetime, normalizeFone } from "~/normalize";
import { store } from "~/store";

import iconExcel from "~/assets/img/iconExcel.png";
import { Footer, Header } from "~/components/Modal/modalStyles";
import Modal from "~/components/Modal/modalLarge";
/* eslint-disable eqeqeq */
function EmpresasIncluidasCreatedCli() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const { campId, inicDate, endDate } = useParams();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState();
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

      setData(
        response.data.createdCli.rows.map((cli, key) => {
          return {
            idd: key,
            id: cli.id,
            campanhaDesc: cli.Campanhas.desc,
            Cliente: cli.nomeAbv,
            setor: cli.setor ? cli.setor : "--",
            cidade: cli.CliComp.cidade,
            uf: cli.CliComp.uf,
            ramo: cli.ramo ? cli.ramo : "--",
            contNome: cli.CliConts[0] ? cli.CliConts[0].nome : "--",
            // eslint-disable-next-line no-nested-ternary
            contCargo: cli.CliConts[0]
              ? cli.CliConts[0].cargo
                ? cli.CliConts[0].cargo
                : "--"
              : "--",
            data: normalizeDatetime(cli.createdAt),
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
                          cnpj: normalizeCnpj(cli.CNPJ),
                          fantasia: cli.fantasia,
                          rzSoc: cli.rzSoc,
                          nomeAbv: cli.nomeAbv,
                          representante: cli.Representante.nome,
                          site: cli.site,
                          fone: normalizeFone(cli.fone),
                          atvPrincipal: cli.atvPrincipal
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
      );
      setIsLoading(false);
    }
    loadData();
  }, [Colab, access, campId, dispatch, endDate, history, inicDate]);

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
                        <ArrowBackIos />
                      </Button>
                    </Tooltip>
                  </Link>
                  <div style={{ marginTop: 10, float: "right" }}>
                    <Tooltip
                      title="Exportar para excel"
                      placement="top"
                      interactive
                      onClick={async () => {
                        await api
                          .get(
                            `/cliente/export/?filter=true&campId=${campId}&inicDate=${inicDate}&endDate=${endDate}&finalized=false&repeat=false`,
                            {
                              responseType: "blob"
                            }
                          )
                          .then(response =>
                            fileDownload(
                              response.data,
                              "Relatório Empresas Incluídas.xlsx"
                            )
                          );
                      }}
                    >
                      <img alt="Exportar para excel" src={iconExcel} />
                    </Tooltip>
                  </div>
                  <h3 style={{ marginBottom: 0 }}>Empresas Incluídas</h3>
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
                        sortMethod: (a, b) => {
                          // force null and undefined to the bottom
                          a = a === null || a === undefined ? -Infinity : a;
                          b = b === null || b === undefined ? -Infinity : b;
                          // force any string values to lowercase
                          a = typeof a === "string" ? a.toLowerCase() : a;
                          b = typeof b === "string" ? b.toLowerCase() : b;
                          // Return either 1 or -1 to indicate a sort priority
                          const aSplitted = a.split("/");
                          const bSplitted = b.split("/");
                          console.log(aSplitted);
                          a = `${aSplitted[2]}-${aSplitted[1]}-${aSplitted[0]}`;
                          b = `${bSplitted[2]}-${bSplitted[1]}-${bSplitted[0]}`;
                          console.log(a);

                          if (a > b) {
                            return 1;
                          }
                          if (a < b) {
                            return -1;
                          }
                          // returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
                          return 0;
                        }
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

export default EmpresasIncluidasCreatedCli;
