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

import { Card, CardBody, CardHeader, CardTitle, Col, Button } from "reactstrap";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import { FilterList } from "@material-ui/icons";
import { isAfter, isBefore, isToday, parseISO } from "date-fns";
import Modal from "~/components/Modal/modalLarge";
import { normalizeCnpj } from "~/normalize";
import api from "~/services/api";
import { Footer, Header } from "~/components/Modal/modalStyles";

/* eslint-disable eqeqeq */
function ProspeccaoTable() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [data2, setData2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const checkDesc = value => {
    switch (value) {
      case 1:
        return "Indicação";
      case 2:
        return "Representação";
      case 3:
        return "Prospecção";
      case 4:
        return "Interna";
      default:
    }
  };

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/campanha");
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
  }, [dispatch, history]);

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
                      setData2(
                        rowInfo.original.clientes.map((client, key) => {
                          return {
                            idd: key,
                            id: client.id,
                            CNPJ: normalizeCnpj(client.CNPJ),
                            nomeAbv: client.nomeAbv,
                            RepresentanteId: client.RepresentanteId,
                            Representante: client.Representante.nome,
                            TipoComisseId: client.TipoComisseId,
                            TipoComiss: checkDesc(client.TipoComisse.desc),
                            EmpresaId: client.EmpresaId,
                            prospect: client.prospect,
                            actions: (
                              // we've added some custom button actions
                              <div className="actions-right">
                                <Tooltip title="Follow Up">
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
                    Header: "Cod",
                    accessor: "cod"
                  },
                  {
                    Header: "Desc",
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
                  <CardTitle tag="h4">
                    Prospecção
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
                  </CardTitle>
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
                        Header: "CNPJ",
                        accessor: "CNPJ"
                      },
                      {
                        Header: "Nome Abreviado",
                        accessor: "nomeAbv"
                      },
                      {
                        Header: "Representante",
                        accessor: "Representante"
                      },
                      {
                        Header: "Tipo de comissão",
                        accessor: "TipoComiss"
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
