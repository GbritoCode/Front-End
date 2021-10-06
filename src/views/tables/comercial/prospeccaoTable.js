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
import { FilterList, Close } from "@material-ui/icons";
import { isAfter, isBefore, isToday, parseISO } from "date-fns";
import Modal from "~/components/Modal/modalLarge";
import { normalizeCnpj, pt_brDateToEUADate } from "~/normalize";
import api from "~/services/api";
import { Footer, Header } from "~/components/Modal/modalStyles";
import { store } from "~/store";
import { sortDates } from "~/sortingMethodReactTable";

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
  const [isOpen, setIsOpen] = useState(
    idCampanha === undefined || idCampanha === ":idCampanha"
  );
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
      const response = await api.get("/campanha");
      if (idCampanha !== ":idCampanha" && idCampanha !== undefined) {
        const camp = response.data.find(
          arr => arr.id === parseInt(idCampanha, 10)
        );
        setCampanha({ cod: camp.cod, desc: camp.desc });
        access === "acessoRestrito" &&
          setData2(
            camp.Clientes.filter(
              arr =>
                arr.Representante.ColabId === Colab &&
                arr.Campanhas_Clientes.ativo === true
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
                TipoComiss:
                  client.TipoComisse === null ? "--" : client.TipoComisse.desc,
                EmpresaId: client.EmpresaId,
                prospect: client.prospect,
                created: client.createdAt,
                retorno:
                  client.FollowUps.find(arr => arr.CampanhaId === camp.id) !==
                  undefined
                    ? client.FollowUps.find(arr => arr.CampanhaId === camp.id)
                        .dataProxContato
                    : "--",
                situacao: checkSituacao(
                  client.FollowUps.find(arr => arr.CampanhaId === camp.id) !==
                    undefined
                    ? client.FollowUps.find(arr => arr.CampanhaId === camp.id)
                        .distanceFromToday
                    : "--"
                ),
                daysFromStart:
                  client.FollowUps.reverse().find(
                    arr => arr.CampanhaId === camp.id
                  ) !== undefined
                    ? Math.abs(
                        client.FollowUps.find(arr => arr.CampanhaId === camp.id)
                          .daysFromStart
                      )
                    : "--",
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
                    <Tooltip title="Timeline">
                      <Button
                        color="default"
                        size="sm"
                        className={classNames("btn-icon btn-link like")}
                        onClick={() => {
                          history.push(
                            `/timeline/cliente/followUps/${client.id}/${camp.id}`
                          );
                        }}
                      >
                        <i className="tim-icons icon-zoom-split" />
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
            camp.Clientes.filter(
              arr => arr.Campanhas_Clientes.ativo === true
            ).map((client, key) => {
              return {
                idd: key,
                id: client.id,
                CNPJ: normalizeCnpj(client.CNPJ),
                nomeAbv: client.nomeAbv,
                rzSoc: client.rzSoc,
                RepresentanteId: client.RepresentanteId,
                Representante: client.Representante.nome,
                TipoComiss:
                  client.TipoComisse === null ? "--" : client.TipoComisse.desc,
                EmpresaId: client.EmpresaId,
                prospect: client.prospect,
                created: client.createdAt,
                retorno:
                  client.FollowUps.find(arr => arr.CampanhaId === camp.id) !==
                  undefined
                    ? client.FollowUps.find(arr => arr.CampanhaId === camp.id)
                        .dataProxContato
                    : "--",
                situacao: checkSituacao(
                  client.FollowUps.find(arr => arr.CampanhaId === camp.id) !==
                    undefined
                    ? client.FollowUps.find(arr => arr.CampanhaId === camp.id)
                        .distanceFromToday
                    : "--"
                ),
                daysFromStart:
                  client.FollowUps.reverse().find(
                    arr => arr.CampanhaId === camp.id
                  ) !== undefined
                    ? Math.abs(
                        client.FollowUps.find(arr => arr.CampanhaId === camp.id)
                          .daysFromStart
                      )
                    : "--",
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
                    <Tooltip title="Timeline">
                      <Button
                        color="default"
                        size="sm"
                        className={classNames("btn-icon btn-link like")}
                        onClick={() => {
                          history.push(
                            `/timeline/cliente/followUps/${client.id}/${camp.id}`
                          );
                        }}
                      >
                        <i className="tim-icons icon-zoom-split" />
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
      console.log(pt_brDateToEUADate(response.data[0].dataInic));
      setData(
        response.data
          .filter(
            arr =>
              (isAfter(
                new Date(),
                parseISO(pt_brDateToEUADate(arr.dataInic))
              ) ||
                isToday(parseISO(pt_brDateToEUADate(arr.dataFim)))) &&
              isBefore(new Date(), parseISO(pt_brDateToEUADate(arr.dataFim)))
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
      case days > 0 && days <= 4:
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
      case days >= 5:
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
                <h4 className="modalHeader">Campanha</h4>
              </Header>
              <ReactTable
                data={data}
                getTdProps={(state, rowInfo) => {
                  return {
                    onClick: () => {
                      window.history.pushState(
                        "",
                        "",
                        `/tabelas/prospeccao/campanha/${rowInfo.original.id}`
                      );
                      setCampanha({
                        cod: rowInfo.original.cod,
                        desc: rowInfo.original.desc
                      });
                      access === "acessoRestrito" &&
                        setData2(
                          rowInfo.original.clientes
                            .filter(
                              arr =>
                                arr.Representante.ColabId === Colab &&
                                arr.Campanhas_Clientes.ativo === true
                            )
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
                                TipoComiss:
                                  client.TipoComisse === null
                                    ? "--"
                                    : client.TipoComisse.desc,
                                EmpresaId: client.EmpresaId,
                                prospect: client.prospect,
                                created: client.createdAt,
                                retorno:
                                  client.FollowUps.find(
                                    arr =>
                                      arr.CampanhaId === rowInfo.original.id
                                  ) !== undefined
                                    ? client.FollowUps.find(
                                        arr =>
                                          arr.CampanhaId === rowInfo.original.id
                                      ).dataProxContato
                                    : "--",
                                situacao: checkSituacao(
                                  client.FollowUps.find(
                                    arr =>
                                      arr.CampanhaId === rowInfo.original.id
                                  ) !== undefined
                                    ? client.FollowUps.find(
                                        arr =>
                                          arr.CampanhaId === rowInfo.original.id
                                      ).distanceFromToday
                                    : "--"
                                ),
                                daysFromStart:
                                  client.FollowUps.reverse().find(
                                    arr =>
                                      arr.CampanhaId === rowInfo.original.id
                                  ) !== undefined
                                    ? Math.abs(
                                        client.FollowUps.find(
                                          arr =>
                                            arr.CampanhaId ===
                                            rowInfo.original.id
                                        ).daysFromStart
                                      )
                                    : "--",
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
                                    <Tooltip title="Timeline">
                                      <Button
                                        color="default"
                                        size="sm"
                                        className={classNames(
                                          "btn-icon btn-link like"
                                        )}
                                        onClick={() => {
                                          history.push(
                                            `/timeline/cliente/followUps/${client.id}/${rowInfo.original.id}`
                                          );
                                        }}
                                      >
                                        <i className="tim-icons icon-zoom-split" />
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
                          rowInfo.original.clientes
                            .filter(
                              arr => arr.Campanhas_Clientes.ativo === true
                            )
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
                                TipoComiss:
                                  client.TipoComisse === null
                                    ? "--"
                                    : client.TipoComisse.desc,
                                EmpresaId: client.EmpresaId,
                                prospect: client.prospect,
                                created: client.createdAt,
                                retorno:
                                  client.FollowUps.find(
                                    arr =>
                                      arr.CampanhaId === rowInfo.original.id
                                  ) !== undefined
                                    ? client.FollowUps.find(
                                        arr =>
                                          arr.CampanhaId === rowInfo.original.id
                                      ).dataProxContato
                                    : "--",
                                situacao: checkSituacao(
                                  client.FollowUps.find(
                                    arr =>
                                      arr.CampanhaId === rowInfo.original.id
                                  ) !== undefined
                                    ? client.FollowUps.find(
                                        arr =>
                                          arr.CampanhaId === rowInfo.original.id
                                      ).distanceFromToday
                                    : "--"
                                ),
                                daysFromStart:
                                  client.FollowUps.reverse().find(
                                    arr =>
                                      arr.CampanhaId === rowInfo.original.id
                                  ) !== undefined
                                    ? Math.abs(
                                        client.FollowUps.find(
                                          arr =>
                                            arr.CampanhaId ===
                                            rowInfo.original.id
                                        ).daysFromStart
                                      )
                                    : "--",
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
                                    <Tooltip title="Timeline">
                                      <Button
                                        color="default"
                                        size="sm"
                                        className={classNames(
                                          "btn-icon btn-link like"
                                        )}
                                        onClick={() => {
                                          history.push(
                                            `/timeline/cliente/followUps/${client.id}/${rowInfo.original.id}`
                                          );
                                        }}
                                      >
                                        <i className="tim-icons icon-zoom-split" />
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
              <Footer />
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
                        sortMethod: sortDates()
                      },
                      {
                        Header: "Dias",
                        accessor: "daysFromStart"
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
