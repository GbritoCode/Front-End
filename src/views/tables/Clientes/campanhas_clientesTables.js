/*!

=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
// react component for creating dynamic tables
import ReactTable from "react-table-v6";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Button,
  Modal,
  ModalBody
} from "reactstrap";
import { Check, Close, DoneAll, Message } from "@material-ui/icons";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { normalizeCnpj } from "~/normalize";
import api from "~/services/api";
import { Footer, Header } from "~/components/Modal/modalStyles";
import ModalLarge from "~/components/Modal/modalLarge";

export default function CampanhaClienteTable() {
  document.body.classList.add("white-content");

  const { id } = useParams();
  let reactTable = useRef(null);

  const [filteredData, setFilteredData] = useState([]);
  const [defaultFilteredData, setDefaultFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [excluding, setExcluding] = useState();
  const [modalMini, setModalMini] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const stateSchema = {
    ClienteIds: {
      value: "",
      error: "",
      message: "",
      array: [],
      optional: true
    }
  };
  const [values, setValues] = useState(stateSchema);
  const checkProsp = value => {
    switch (value) {
      case true:
        return "Prospect";
      case false:
        return "Cliente";
      default:
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const response = await api.get(`/cliente/?CampanhaId=${id}`);
      const response2 = await api.get(`/cliente/`);
      setData(
        response.data.map((client, index) => {
          return {
            idd: index,
            id: client.id,
            CNPJ: normalizeCnpj(client.CNPJ),
            nomeAbv: client.nomeAbv,
            RepresentanteId: client.RepresentanteId,
            Representante: client.Representante.nome,
            rzSoc: client.rzSoc,
            TipoComisseId: client.TipoComisseId,
            EmpresaId: client.EmpresaId,
            prospect: checkProsp(client.prospect),
            implantacao: client.createdAt,
            actions: (
              // we've added some custom button actions
              <div className="actions-right">
                <Button
                  onClick={() => {
                    setExcluding(client.id);
                    setModalMini(!modalMini);
                  }}
                  color="danger"
                  size="sm"
                  className={classNames("btn-icon btn-link like")}
                >
                  <i className="tim-icons icon-simple-remove" />
                </Button>{" "}
              </div>
            )
          };
        })
      );
      setData2(
        response2.data
          .filter(
            arr =>
              response.data.findIndex(nestedArr => nestedArr.id === arr.id) < 0
          )
          .map((client, index) => {
            return {
              idd: index,
              id: client.id,
              CNPJ: normalizeCnpj(client.CNPJ),
              nomeAbv: client.nomeAbv,
              RepresentanteId: client.RepresentanteId,
              Representante: client.Representante.nome,
              rzSoc: client.rzSoc,
              TipoComisseId: client.TipoComisseId,
              EmpresaId: client.EmpresaId,
              prospect: checkProsp(client.prospect),
              implantacao: client.createdAt
            };
          })
      );
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
              TipoComiss: client.TipoComisse.desc,
              EmpresaId: client.EmpresaId,
              prospect: checkProsp(client.prospect),
              implantacao: client.createdAt
            }
          };
        })
      );
    };
    loadData();
  }, [id, modalMini]);

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const reloadData = async () => {
    await delay(500);
  };

  const toggleModalMini = () => {
    setModalMini(!modalMini);
  };
  console.log(values.ClienteIds.array);

  return (
    <>
      <div className="content">
        <ModalLarge
          onClose={() => {
            setIsOpen(false);
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
                  setFilteredData({
                    data: defaultFilteredData,
                    default: true
                  });
                }}
                className={classNames("btn-icon btn-link like")}
              >
                <Close fontSize="large" />
              </Button>
            </Tooltip>
            <Tooltip title="Fechar">
              <Button
                style={{
                  float: "right"
                }}
                onClick={async () => {
                  await api
                    .post(`/campanha/relate/?CampanhaId=${id}`, {
                      ClienteIds: values.ClienteIds.array
                    })
                    .then(res => {
                      toast.success(res.data.message);
                      setData(
                        ...data,
                        data2
                          .filter(arr =>
                            values.ClienteIds.array.includes(arr.id)
                          )
                          .map((client, index) => {
                            return {
                              idd: index,
                              id: client.id,
                              CNPJ: normalizeCnpj(client.CNPJ),
                              nomeAbv: client.nomeAbv,
                              RepresentanteId: client.RepresentanteId,
                              Representante: client.Representante.nome,
                              rzSoc: client.rzSoc,
                              TipoComisseId: client.TipoComisseId,
                              EmpresaId: client.EmpresaId,
                              prospect: checkProsp(client.prospect),
                              implantacao: client.createdAt,
                              actions: (
                                // we've added some custom button actions
                                <div className="actions-right">
                                  <Button
                                    onClick={() => {
                                      setExcluding(client.id);
                                      setModalMini(!modalMini);
                                    }}
                                    color="danger"
                                    size="sm"
                                    className={classNames(
                                      "btn-icon btn-link like"
                                    )}
                                  >
                                    <i className="tim-icons icon-simple-remove" />
                                  </Button>{" "}
                                </div>
                              )
                            };
                          })
                      );
                      // history.go(0);
                    });
                }}
                className={classNames("btn-icon btn-link like")}
              >
                <Check fontSize="large" />
              </Button>
            </Tooltip>
            <Tooltip title="Relacionar Todos" placement="top" interactive>
              <Button
                style={{
                  float: "right"
                }}
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
                className={classNames("btn-icon btn-link like")}
              >
                <DoneAll fontSize="large" />
              </Button>
            </Tooltip>
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
            data={data2}
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

          <Footer />
        </ModalLarge>

        <Modal
          modalClassName="modal-mini "
          isOpen={modalMini}
          toggle={toggleModalMini}
        >
          <div className="modal-header justify-content-center">
            <button
              aria-hidden
              className="close"
              data-dismiss="modal"
              type="button"
              color="primary"
              onClick={toggleModalMini}
            >
              <Close />
            </button>
            <div>
              <Message fontSize="large" />
            </div>
          </div>
          <ModalBody className="text-center">
            <p>Deseja remover o cliente desta campanha?</p>
          </ModalBody>
          <div className="modal-footer">
            <Button
              style={{ color: "#000" }}
              className="btn-neutral"
              type="button"
              onClick={toggleModalMini}
            >
              Não
            </Button>
            <Button
              style={{ color: "#7E7E7E" }}
              className="btn-neutral"
              type="button"
              onClick={async () => {
                await api
                  .delete(
                    `campanha/${excluding}/?removeRelation=true&CampanhaId=${id}`
                  )
                  .then(result => {
                    toast.success(result.data);
                    reloadData();
                    setExcluding(undefined);
                  })
                  .catch(err => {
                    toast.error(err.response.data.error);
                  });
                toggleModalMini();
              }}
            >
              Sim
            </Button>
          </div>
        </Modal>
        <Col xs={12} md={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                Clientes - Campanha
                <Tooltip title="Novo">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <AddIcon fontSize="large" />
                  </Button>
                </Tooltip>
              </CardTitle>
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
  );
}
