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

import { Card, CardBody, CardHeader, Col, Button } from "reactstrap";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import { FilterList } from "@material-ui/icons";
import { isAfter, isBefore, isToday, parseISO } from "date-fns";
import Modal from "~/components/Modal/modalLarge";
import { normalizeCnpj } from "~/normalize";
import api from "~/services/api";
import { Footer, Header } from "~/components/Modal/modalStyles";
import { store } from "~/store";

/* eslint-disable eqeqeq */
function ProspeccaoTable() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const { idCampanha } = useParams();
  const dispatch = useDispatch();
  const [campanha, setCampanha] = useState({
    cod: "--",
    desc: "--"
  });

  const [data, setData] = useState();
  const [data2, setData2] = useState([]);
  const [access, setAccess] = useState("");
  const [Colab, setColab] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(idCampanha === undefined);
  const history = useHistory();
  useEffect(() => {
    const { acessible } = store.getState().auth;
    const { id } = store.getState().auth.user.Colab;
    setColab(id);
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
      const response = await api.get("/campanha");
      if (idCampanha !== undefined) {
        const camp = response.data.find(
          arr => arr.id === parseInt(idCampanha, 10)
        );
        setCampanha({ cod: camp.cod, desc: camp.desc });
        access === "acessoRestrito" &&
          setData2(
            camp.Clientes.filter(
              arr => arr.Representante.ColabId === Colab
            ).map((client, key) => {
              return {
                idd: key,
                id: client.id,
                CNPJ: normalizeCnpj(client.CNPJ),
                nomeAbv: client.nomeAbv,
                rzSoc: client.rzSoc,
                RepresentanteId: client.RepresentanteId,
                Representante: client.Representante.nome,
                TipoComisseId: client.TipoComisseId,
                TipoComiss: client.TipoComisse.desc,
                EmpresaId: client.EmpresaId,
                prospect: client.prospect,
                created: client.createdAt,
                retorno:
                  client.FollowUps.find(arr => arr.CampanhasId === camp.id) !==
                  undefined
                    ? client.FollowUps.find(arr => arr.CampanhasId === camp.id)
                        .dataProxContato
                    : "--",
                situacao: checkSituacao(
                  client.FollowUps.find(arr => arr.CampanhasId === camp.id) !==
                    undefined
                    ? client.FollowUps.find(arr => arr.CampanhasId === camp.id)
                        .distanceFromToday
                    : "--"
                ),
                actions: (
                  // we've added some custom button actions
                  <div className="actions-right">
                    <Tooltip title="Novo Follow Up">
                      <Button
                        color="default"
                        size="sm"
                        className={classNames("btn-icon btn-link like")}
                        onClick={() => {
                          history.push(
                            `/cadastro/cliente/followUps/${client.id}/${camp.id}`
                          );
                        }}
                      >
                        <i className="tim-icons icon-simple-add" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Ver Follow Ups">
                      <Button
                        color="default"
                        size="sm"
                        className={classNames("btn-icon btn-link like")}
                        onClick={() => {
                          history.push(
                            `/tabelas/cliente/followUps/${client.id}/${camp.id}`
                          );
                        }}
                      >
                        <i className="tim-icons icon-attach-87" />
                      </Button>
                    </Tooltip>
                  </div>
                )
              };
            })
          );
        access === "acessoTotal" &&
          setData2(
            camp.Clientes.map((client, key) => {
              return {
                idd: key,
                id: client.id,
                CNPJ: normalizeCnpj(client.CNPJ),
                nomeAbv: client.nomeAbv,
                rzSoc: client.rzSoc,
                RepresentanteId: client.RepresentanteId,
                Representante: client.Representante.nome,
                TipoComisseId: client.TipoComisseId,
                TipoComiss: client.TipoComisse.desc,
                EmpresaId: client.EmpresaId,
                prospect: client.prospect,
                created: client.createdAt,
                retorno:
                  client.FollowUps.find(arr => arr.CampanhasId === camp.id) !==
                  undefined
                    ? client.FollowUps.find(arr => arr.CampanhasId === camp.id)
                        .dataProxContato
                    : "--",
                situacao: checkSituacao(
                  client.FollowUps.find(arr => arr.CampanhasId === camp.id) !==
                    undefined
                    ? client.FollowUps.find(arr => arr.CampanhasId === camp.id)
                        .distanceFromToday
                    : "--"
                ),
                actions: (
                  // we've added some custom button actions
                  <div className="actions-right">
                    <Tooltip title="Novo Follow Up">
                      <Button
                        color="default"
                        size="sm"
                        className={classNames("btn-icon btn-link like")}
                        onClick={() => {
                          history.push(
                            `/cadastro/cliente/followUps/${client.id}/${camp.id}`
                          );
                        }}
                      >
                        <i className="tim-icons icon-simple-add" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Ver Follow Ups">
                      <Button
                        color="default"
                        size="sm"
                        className={classNames("btn-icon btn-link like")}
                        onClick={() => {
                          history.push(
                            `/tabelas/cliente/followUps/${client.id}/${camp.id}`
                          );
                        }}
                      >
                        <i className="tim-icons icon-attach-87" />
                      </Button>
                    </Tooltip>
                  </div>
                )
              };
            })
          );
      }
      setData(
        response.data
          .filter(
            arr =>
              (!isAfter(new Date(), parseISO(arr.dataFim)) ||
                isToday(parseISO(arr.dataFim))) &&
              !isBefore(new Date(), parseISO(arr.dataInic))
          )
          .map((camp, key) => {
            return {
              idd: key,
              id: camp.id,
              cod: camp.cod,
              desc: camp.desc,
              colab: camp.Colab.nome,
              clientes: camp.Clientes
            };
          })
      );
      setIsLoading(false);
    }
    loadData();
  }, [Colab, access, dispatch, history, idCampanha]);

  const checkSituacao = days => {
    switch (true) {
      case days <= 0:
        return (
          <div
            style={{
              background: "red",
              borderRadius: "50%",
              width: "20px",
              height: "20px"
            }}
          />
        );
      case days > 0 && days < 4:
        return (
          <div
            style={{
              background: "#ff9933",
              borderRadius: "50%",
              width: "20px",
              height: "20px"
            }}
          />
        );
      case days > 5:
        return (
          <div
            style={{
              background: "#4ede6b",
              borderRadius: "50%",
              width: "20px",
              height: "20px"
            }}
          />
        );
      case days === "--":
        return "--";
      default:
    }
  };

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
                <h4 className="modalHeader">Campanha</h4>
              </Header>
              <ReactTable
                data={data}
                getTdProps={(state, rowInfo) => {
                  return {
                    onClick: () => {
                      setCampanha({
                        cod: rowInfo.original.cod,
                        desc: rowInfo.original.desc
                      });
                      access === "acessoRestrito" &&
                        setData2(
                          rowInfo.original.clientes
                            .filter(arr => arr.Representante.ColabId === Colab)
                            .map((client, key) => {
                              return {
                                idd: key,
                                id: client.id,
                                CNPJ: normalizeCnpj(client.CNPJ),
                                nomeAbv: client.nomeAbv,
                                rzSoc: client.rzSoc,
                                RepresentanteId: client.RepresentanteId,
                                Representante: client.Representante.nome,
                                TipoComisseId: client.TipoComisseId,
                                TipoComiss: client.TipoComisse.desc,
                                EmpresaId: client.EmpresaId,
                                prospect: client.prospect,
                                created: client.createdAt,
                                retorno:
                                  client.FollowUps.find(
                                    arr =>
                                      arr.CampanhasId === rowInfo.original.id
                                  ) !== undefined
                                    ? client.FollowUps.find(
                                        arr =>
                                          arr.CampanhasId ===
                                          rowInfo.original.id
                                      ).dataProxContato
                                    : "--",
                                situacao: checkSituacao(
                                  client.FollowUps.find(
                                    arr =>
                                      arr.CampanhasId === rowInfo.original.id
                                  ) !== undefined
                                    ? client.FollowUps.find(
                                        arr =>
                                          arr.CampanhasId ===
                                          rowInfo.original.id
                                      ).distanceFromToday
                                    : "--"
                                ),
                                actions: (
                                  // we've added some custom button actions
                                  <div className="actions-right">
                                    <Tooltip title="Novo Follow Up">
                                      <Button
                                        color="default"
                                        size="sm"
                                        className={classNames(
                                          "btn-icon btn-link like"
                                        )}
                                        onClick={() => {
                                          history.push(
                                            `/cadastro/cliente/followUps/${client.id}/${rowInfo.original.id}`
                                          );
                                        }}
                                      >
                                        <i className="tim-icons icon-simple-add" />
                                      </Button>
                                    </Tooltip>
                                    <Tooltip title="Ver Follow Ups">
                                      <Button
                                        color="default"
                                        size="sm"
                                        className={classNames(
                                          "btn-icon btn-link like"
                                        )}
                                        onClick={() => {
                                          history.push(
                                            `/tabelas/cliente/followUps/${client.id}/${rowInfo.original.id}`
                                          );
                                        }}
                                      >
                                        <i className="tim-icons icon-attach-87" />
                                      </Button>
                                    </Tooltip>
                                  </div>
                                )
                              };
                            })
                        );
                      access === "acessoTotal" &&
                        setData2(
                          rowInfo.original.clientes.map((client, key) => {
                            return {
                              idd: key,
                              id: client.id,
                              CNPJ: normalizeCnpj(client.CNPJ),
                              nomeAbv: client.nomeAbv,
                              rzSoc: client.rzSoc,
                              RepresentanteId: client.RepresentanteId,
                              Representante: client.Representante.nome,
                              TipoComisseId: client.TipoComisseId,
                              TipoComiss: client.TipoComisse.desc,
                              EmpresaId: client.EmpresaId,
                              prospect: client.prospect,
                              created: client.createdAt,
                              retorno:
                                client.FollowUps.find(
                                  arr => arr.CampanhasId === rowInfo.original.id
                                ) !== undefined
                                  ? client.FollowUps.find(
                                      arr =>
                                        arr.CampanhasId === rowInfo.original.id
                                    ).dataProxContato
                                  : "--",
                              situacao: checkSituacao(
                                client.FollowUps.find(
                                  arr => arr.CampanhasId === rowInfo.original.id
                                ) !== undefined
                                  ? client.FollowUps.find(
                                      arr =>
                                        arr.CampanhasId === rowInfo.original.id
                                    ).distanceFromToday
                                  : "--"
                              ),
                              actions: (
                                // we've added some custom button actions
                                <div className="actions-right">
                                  <Tooltip title="Novo Follow Up">
                                    <Button
                                      color="default"
                                      size="sm"
                                      className={classNames(
                                        "btn-icon btn-link like"
                                      )}
                                      onClick={() => {
                                        history.push(
                                          `/cadastro/cliente/followUps/${client.id}/${rowInfo.original.id}`
                                        );
                                      }}
                                    >
                                      <i className="tim-icons icon-simple-add" />
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Ver Follow Ups">
                                    <Button
                                      color="default"
                                      size="sm"
                                      className={classNames(
                                        "btn-icon btn-link like"
                                      )}
                                      onClick={() => {
                                        history.push(
                                          `/tabelas/cliente/followUps/${client.id}/${rowInfo.original.id}`
                                        );
                                      }}
                                    >
                                      <i className="tim-icons icon-attach-87" />
                                    </Button>
                                  </Tooltip>
                                </div>
                              )
                            };
                          })
                        );
                      setIsOpen(false);
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
                  },
                  {
                    Header: "Responsável",
                    accessor: "colab"
                  }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
              />
              <Footer>
                <Button
                  className="btn-neutral"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Close
                </Button>
              </Footer>
            </Modal>

            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <Button
                    style={{
                      float: "right"
                    }}
                    className={classNames("btn-icon btn-link like")}
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    <FilterList />
                  </Button>
                  <h3 style={{ marginBottom: 0 }}>Prospecção</h3>
                  <p style={{ fontSize: 14 }}>
                    {campanha.cod} | {campanha.desc}
                  </p>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={data2}
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
                        Header: "Nome Abreviado",
                        accessor: "nomeAbv",
                        minWidth: 120
                      },
                      {
                        Header: "Razão Social",
                        accessor: "rzSoc",
                        minWidth: 300
                      },
                      {
                        Header: "Representante",
                        accessor: "Representante",
                        minWidth: 150
                      },
                      {
                        Header: "Retorno",
                        accessor: "retorno",
                        defaultSortMethod: (a, b, desc) => {
                          // force null and undefined to the bottom
                          a = a === null || a === undefined ? -Infinity : a;
                          b = b === null || b === undefined ? -Infinity : b;
                          // force any string values to lowercase
                          a = typeof a === "string" ? a.toLowerCase() : a;
                          b = typeof b === "string" ? b.toLowerCase() : b;
                          // Return either 1 or -1 to indicate a sort priority
                          const aSplitted = a.split("/");
                          const bSplitted = b.split("/");

                          a = `${aSplitted[2]}-${aSplitted[1]}-${aSplitted[0]}`;
                          b = `${bSplitted[2]}-${bSplitted[1]}-${bSplitted[0]}`;

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
                        Header: "sla",
                        accessor: "situacao",
                        filterable: false,
                        sortable: false,
                        maxWidth: 50
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

export default ProspeccaoTable;
