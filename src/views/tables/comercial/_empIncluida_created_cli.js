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
  FormGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  DropdownItem
} from "reactstrap";

import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Close, PostAdd } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import api from "~/services/api";
import { normalizeCnpj, normalizeDatetime, normalizeFone } from "~/normalize";
import { store } from "~/store";

import iconExcel from "~/assets/img/iconExcel.png";
import { Footer, Header } from "~/components/Modal/modalStyles";
import Modal from "~/components/Modal/modalLarge";
import { sortDates } from "~/sortingMethodReactTable";
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

  const downloadFile = async () => {
    // eslint-disable-next-line no-restricted-syntax
    const url = `${process.env.REACT_APP_API_URL}/cliente/export/?campId=${campId}&inicDate=${inicDate}&endDate=${endDate}&finalized=false&filter=true&empIncluida=true`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "file", "");
    document.body.appendChild(link);
    link.click();

    const delay = ms => new Promise(res => setTimeout(res, ms));
    // eslint-disable-next-line no-await-in-loop
    await delay(500);
  };

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
        response.data.cliJoinedCamp.rows.map((campCli, key) => {
          return {
            idd: key,
            id: campCli.Cliente.id,
            campanhaDesc: campCli.Campanha.desc,
            Cliente: campCli.Cliente.nomeAbv,
            setor: campCli.Cliente.setor ? campCli.Cliente.setor : "--",
            cidade: campCli.Cliente.CliComp.cidade,
            uf: campCli.Cliente.CliComp.uf,
            ramo: campCli.Cliente.ramo ? campCli.Cliente.ramo : "--",
            contNome: campCli.Cliente.CliConts[0]
              ? campCli.Cliente.CliConts[0].nome
              : "--",
            // eslint-disable-next-line no-nested-ternary
            contCargo: campCli.Cliente.CliConts[0]
              ? campCli.Cliente.CliConts[0].cargo
                ? campCli.Cliente.CliConts[0].cargo
                : "--"
              : "--",
            data: normalizeDatetime(campCli.Cliente.createdAt),
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
                          cnpj: normalizeCnpj(campCli.Cliente.CNPJ),
                          fantasia: campCli.Cliente.fantasia,
                          rzSoc: campCli.Cliente.rzSoc,
                          nomeAbv: campCli.Cliente.nomeAbv,
                          representante: campCli.Cliente.Representante.nome,
                          site: campCli.Cliente.site,
                          fone: normalizeFone(campCli.Cliente.fone),
                          atvPrincipal: campCli.Cliente.atvPrincipal
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
                      <NavLink onClick={() => downloadFile()} tag="li">
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

export default EmpresasIncluidasCreatedCli;
