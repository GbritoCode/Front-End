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
  Row,
  Label,
  FormGroup,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  DropdownItem
} from "reactstrap";

import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Close,
  InsertEmoticon,
  PostAdd,
  SentimentDissatisfied,
  SentimentSatisfiedAltSharp,
  SentimentVeryDissatisfied,
  SentimentVeryDissatisfiedSharp
} from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import fileDownload from "js-file-download";
import api from "~/services/api";
import { store } from "~/store";
import iconExcel from "~/assets/img/iconExcel.png";
import Modal from "~/components/Modal/modalLarge";
import { Footer, Header } from "~/components/Modal/modalStyles";
import { normalizeFone } from "~/normalize";

/* eslint-disable eqeqeq */
function ComercialFUPsTotalTable() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const { campId, inicDate, endDate } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState();
  const [campData, setCampData] = useState();
  const [clientes] = useState([]);
  const [clientesFlag] = useState({});
  const [data, setData] = useState();
  const [access, setAccess] = useState("");
  const [Colab, setColab] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const stateSchema = {
    empresaId: "",
    ColabId: "",
    ClienteId: "",
    CliContId: "",
    data: ``,
    dataProxContato: "",
    detalhes: "",
    reacao: "",
    proxPasso: "",
    prefContato: "",
    ativo: "",
    motivo: ""
  };
  const [values, setValues] = useState(stateSchema);

  const checkAcao = value => {
    switch (value) {
      case 1:
        return "Retornar Contato";
      case 2:
        return "Agendar Reunião";
      case 3:
        return "Solicitar Orçamento";
      case 4:
        return "Iniciar Contato";
      case 5:
        return "Analisar Reunião";
      case 10:
        return "Finalizar";
      default:
    }
  };

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
      response.data.Fups.rows.reverse().map(arr => {
        console.log(arr);
        if (!clientesFlag[arr.ClienteId]) {
          clientesFlag[arr.ClienteId] = true;
          console.log(clientesFlag);
          clientes.push({
            ClienteId: arr.ClienteId,
            distanceFromToday: -1 * arr.distanceFromToday
          });
        }
        return false;
      });

      setData(
        response.data.Fups.rows.map((fup, key) => {
          console.log(clientes.find(arr => arr.ClienteId === fup.ClienteId));
          return {
            idd: key,
            id: fup.id,
            EmpresaId: fup.EmpresaId,
            Colab: fup.Colab,
            acao: checkAcao(fup.proxPasso),
            CliContNome: fup.CliCont.nome,
            dataContato: fup.dataContato,
            dataProxContato: fup.dataProxContato,
            detalhes: fup.detalhes,
            reacao: fup.reacao,
            Cliente: fup.Cliente.nomeAbv,
            Campanha: fup.Campanha.cod,
            dias:
              clientes.find(arr => arr.ClienteId === fup.ClienteId) ===
              undefined
                ? "--"
                : clientes.find(arr => arr.ClienteId === fup.ClienteId)
                    .distanceFromToday,
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
                          empresaId: fup.EmpresaId,
                          ClienteId: fup.Cliente.nomeAbv,
                          ClienteRzSoc: fup.Cliente.rzSoc,
                          ColabId: fup.Colab.nome,
                          CliContId: fup.CliCont.nome,
                          contCargo: fup.CliCont.cargo,
                          contEmail: fup.CliCont.email,
                          contFone: normalizeFone(fup.CliCont.fone),
                          contCel: normalizeFone(fup.CliCont.cel),
                          contRamal: fup.CliCont.ramal,
                          contSkype: fup.CliCont.skype,
                          data: fup.dataContato,
                          dataProxContato: fup.dataProxContato,
                          detalhes: fup.detalhes,
                          reacao: fup.reacao,
                          proxPasso: fup.proxPasso,
                          prefContato: fup.prefContato
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
  }, [
    Colab,
    access,
    campId,
    clientes,
    clientesFlag,
    dispatch,
    endDate,
    history,
    inicDate
  ]);

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
                  {values.ClienteId} | {values.ClienteRzSoc}
                </h4>
              </Header>
              <Row>
                <Col sm="4">
                  <Label>Colaborador</Label>
                  <FormGroup className="has-label ">
                    <Input
                      disabled
                      name="ColabId"
                      type="text"
                      value={values.ColabId}
                    />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Data</Label>
                  <FormGroup className="has-label ">
                    <Input
                      disabled
                      name="name_abv"
                      type="text"
                      value={values.data}
                    />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Contato</Label>
                  <FormGroup className="has-label ">
                    <Input
                      disabled
                      name="CliContId"
                      type="text"
                      value={values.CliContId}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <Label>Cargo</Label>
                  <FormGroup className="has-label">
                    <Input
                      disabled
                      value={values.contCargo}
                      name="cargo"
                      id="cargo"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Email</Label>
                  <FormGroup className="has-label">
                    <Input
                      disabled
                      value={values.contEmail}
                      name="email"
                      id="email"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Celular</Label>
                  <FormGroup className="has-label">
                    <Input
                      disabled
                      value={values.contCel}
                      name="celular"
                      id="celular"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <Label>Telefone</Label>
                  <FormGroup className="has-label">
                    <Input
                      disabled
                      value={values.contFone}
                      name="telefone"
                      id="telefone"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Ramal</Label>
                  <FormGroup className="has-label">
                    <Input
                      disabled
                      value={values.contRamal}
                      name="ramal"
                      id="ramal"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Skype</Label>
                  <FormGroup className="has-label">
                    <Input
                      disabled
                      value={values.contSkype}
                      name="skype"
                      id="skype"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <Label>Preferência de Contato</Label>
                  <FormGroup className="has-label ">
                    <Input
                      disabled
                      name="prefContato"
                      type="select"
                      value={values.prefContato}
                    >
                      {" "}
                      <option disabled value="">
                        {" "}
                        Selecione o contato{" "}
                      </option>
                      <option value={1}>Email </option>
                      <option value={2}>Telefone </option>
                      <option value={3}>Whatsapp </option>
                      <option value={4}>Skype </option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Reação</Label>
                  <FormGroup check>
                    <Label check>
                      <Input
                        disabled
                        hidden
                        name="reacao"
                        type="radio"
                        value="pessima"
                      />{" "}
                      <Tooltip title="Péssima">
                        <SentimentVeryDissatisfiedSharp
                          color={
                            values.reacao === "pessima" ? "null" : "disabled"
                          }
                        />
                      </Tooltip>
                    </Label>
                    <Label check>
                      <Input
                        disabled
                        hidden
                        name="reacao"
                        type="radio"
                        value="ruim"
                      />{" "}
                      <Tooltip title="Ruim">
                        <SentimentVeryDissatisfied
                          color={values.reacao === "ruim" ? "null" : "disabled"}
                        />
                      </Tooltip>
                    </Label>
                    <Label check>
                      <Input
                        disabled
                        hidden
                        name="reacao"
                        type="radio"
                        value="neutra"
                      />{" "}
                      <Tooltip title="Sem Reação">
                        <SentimentDissatisfied
                          color={
                            values.reacao === "neutra" ? "null" : "disabled"
                          }
                        />
                      </Tooltip>
                    </Label>
                    <Label check>
                      <Input
                        disabled
                        hidden
                        name="reacao"
                        type="radio"
                        value="boa"
                      />
                      <Tooltip title="Boa">
                        <SentimentSatisfiedAltSharp
                          color={values.reacao === "boa" ? "null" : "disabled"}
                        />
                      </Tooltip>
                    </Label>
                    <Label check>
                      <Input
                        disabled
                        hidden
                        name="reacao"
                        type="radio"
                        value="otima"
                      />
                      <Tooltip title="Ótima">
                        <InsertEmoticon
                          color={
                            values.reacao === "otima" ? "null" : "disabled"
                          }
                        />
                      </Tooltip>
                    </Label>
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Data Próximo Contato</Label>
                  <FormGroup className="has-label ">
                    <Input
                      disabled
                      name="dataProxContato"
                      type="text"
                      value={values.dataProxContato}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <Label>Ação</Label>
                  <FormGroup className="has-label ">
                    <Input
                      disabled
                      name="proxPasso"
                      type="select"
                      value={values.proxPasso}
                    >
                      {" "}
                      <option disabled value="">
                        {" "}
                        Selecione a ação{" "}
                      </option>
                      <option value={4}>Iniciar Contato</option>
                      <option value={1}>Retornar Contato</option>
                      <option value={2}>Agendar Reunião</option>
                      <option value={3}>Solicitar Orçamento</option>
                      <option value={10}>Finalizar Prospecção</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col hidden={values.proxPasso.value !== "10"} md="4">
                  <Label>Motivo</Label>
                  <FormGroup className="has-label ">
                    <Input
                      disabled
                      hidden={values.proxPasso.value !== "10"}
                      name="CliContId"
                      placeholder="Selecione o Motivo"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Label>Detalhes</Label>
                  <FormGroup className="has-label ">
                    <Input
                      disabled
                      name="detalhes"
                      type="textarea"
                      value={values.detalhes}
                    />{" "}
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
                      <NavLink
                        onClick={async () => {
                          await api
                            .get(
                              `/cliente/export/?filter=true&campId=${campId}&inicDate=${inicDate}&endDate=${endDate}&finalized=false&totalFUP=true&repeat=true`,
                              {
                                responseType: "blob"
                              }
                            )
                            .then(response =>
                              fileDownload(
                                response.data,
                                "Relatório Follow Ups.xlsx"
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
                  <h3 style={{ marginBottom: 0 }}>Follow Ups</h3>
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
                        Header: "Nome Contato",
                        accessor: "CliContNome"
                      },
                      {
                        Header: "Data Contato",
                        accessor: "dataContato"
                      },
                      {
                        Header: "Reação",
                        accessor: "reacao"
                      },
                      {
                        Header: "Ação",
                        accessor: "acao"
                      },
                      {
                        Header: "Dias",
                        accessor: "dias"
                      },
                      {
                        Header: "Próximo Contato",
                        accessor: "dataProxContato",
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

export default ComercialFUPsTotalTable;
