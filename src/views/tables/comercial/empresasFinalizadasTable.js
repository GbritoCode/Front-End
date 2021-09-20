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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  DropdownItem
} from "reactstrap";

import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PostAdd } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import fileDownload from "js-file-download";
import api from "~/services/api";
import { store } from "~/store";
import { normalizeDate } from "~/normalize";
import iconExcel from "~/assets/img/iconExcel.png";

/* eslint-disable eqeqeq */
function ComercialEmpresasFimTable() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const { campId, inicDate, endDate } = useParams();
  const dispatch = useDispatch();

  const [campData, setCampData] = useState();
  const [data, setData] = useState([]);
  const [access, setAccess] = useState("");
  const [Colab, setColab] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

      const response1 = await api.get(`/campanha/${campId}/true`);
      setCampData({
        cod: response1.data.cod,
        desc: response1.data.desc
      });

      setData(
        response.data.finalizedFups.rows.map((fup, key) => {
          return {
            idd: key,
            id: fup.id,
            campanhaDesc: fup.Campanha.desc,
            Cliente: fup.Cliente.nomeAbv,
            cidade: fup.Cliente.CliComp.cidade,
            uf: fup.Cliente.CliComp.uf,
            ramo: fup.Cliente.ramo ? fup.Cliente.ramo : "--",
            setor: fup.Cliente.setor ? fup.Cliente.setor : "--",
            contato: fup.CliCont.nome,
            cargoCont: fup.CliCont.cargo ? fup.CliCont.cargo : "--",
            motivo: fup.CamposDinamicosProspect
              ? fup.CamposDinamicosProspect.valor
              : "--",
            dataFim: normalizeDate(fup.dataContato),
            data: fup.createdAt,
            actions: (
              // we've added some custom button actions
              <>
                <div className="actions-right">
                  <Link
                    to={`/timeline/cliente/followUps/${fup.Cliente.id}/${campId}`}
                  >
                    <Tooltip title="Visualizar">
                      <Button
                        color="default"
                        size="sm"
                        className={classNames("btn-icon btn-link like")}
                      >
                        <i className="tim-icons icon-zoom-split" />
                      </Button>
                    </Tooltip>
                  </Link>

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
            {/* <Modal
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
            </Modal> */}

            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <UncontrolledDropdown style={{ float: "right" }}>
                    <DropdownToggle
                      style={{ paddingLeft: "0px" }}
                      caret
                      color="default"
                      data-toggle="dropdown"
                      nav
                      onClick={e => e.preventDefault()}
                    >
                      <PostAdd />
                      <div className="photo" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-navbar" right tag="ul">
                      <NavLink
                        onClick={async () => {
                          await api
                            .get(
                              `/cliente/export/?filter=true&campId=${campId}&inicDate=${inicDate}&endDate=${endDate}&finalized=true&repeat=true`,
                              {
                                responseType: "blob"
                              }
                            )
                            .then(response =>
                              fileDownload(
                                response.data,
                                "Relatório Empresas Finalizadas.xlsx"
                              )
                            );
                        }}
                        tag="li"
                      >
                        <DropdownItem
                          style={{ paddingLeft: "3%" }}
                          className="nav-item"
                        >
                          <div style={{ float: "left", marginRight: "3%" }}>
                            <img alt="Exportar para excel" src={iconExcel} />
                          </div>
                          <p style={{ paddingTop: "2%" }}>Exportar Excel</p>
                        </DropdownItem>
                      </NavLink>
                      <NavLink tag="li">
                        <Link to="/dashboardComercial">
                          <DropdownItem
                            style={{ paddingLeft: "3%" }}
                            className="nav-item"
                          >
                            <span
                              style={{
                                float: "left",
                                marginRight: "3%",
                                fontSize: "1.25rem"
                              }}
                              className="material-icons"
                            >
                              logout
                            </span>
                            <p style={{ paddingTop: "2%" }}>Voltar</p>
                          </DropdownItem>
                        </Link>
                      </NavLink>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  <h3 style={{ marginBottom: 0 }}>Empresas Finalizadas</h3>
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
                        accessor: "contato"
                      },
                      {
                        Header: "Cargo",
                        accessor: "cargo"
                      },
                      {
                        Header: "Motivo",
                        accessor: "motivo"
                      },
                      {
                        Header: "DataFim",
                        accessor: "dataFim",
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
                      // {
                      //   Header: "Data",
                      //   accessor: "data",
                      //   minWidth: 150,
                      // sortMethod: (a, b) => {
                      //   // force null and undefined to the bottom
                      //   a = a === null || a === undefined ? -Infinity : a;
                      //   b = b === null || b === undefined ? -Infinity : b;
                      //   // force any string values to lowercase
                      //   a = typeof a === "string" ? a.toLowerCase() : a;
                      //   b = typeof b === "string" ? b.toLowerCase() : b;
                      //   // Return either 1 or -1 to indicate a sort priority
                      //   const aSplitted = a.split("/");
                      //   const bSplitted = b.split("/");
                      //   console.log(aSplitted);
                      //   a = `${aSplitted[2]}-${aSplitted[1]}-${aSplitted[0]}`;
                      //   b = `${bSplitted[2]}-${bSplitted[1]}-${bSplitted[0]}`;
                      //   console.log(a);

                      //   if (a > b) {
                      //     return 1;
                      //   }
                      //   if (a < b) {
                      //     return -1;
                      //   }
                      //   // returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
                      //   return 0;
                      // }
                      // }
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

export default ComercialEmpresasFimTable;
