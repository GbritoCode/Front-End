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
  CardTitle,
  Col,
  Button,
  Modal,
  ModalBody
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import { Close, Message } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { normalizeCnpj } from "~/normalize";
import { oportUpdate } from "~/store/modules/oportunidades/actions";
import api from "~/services/api";

/* eslint-disable eqeqeq */
function OportTable() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [modalMini, setModalMini] = useState(false);
  const [excluding, setExcluding] = useState(false);
  const history = useHistory();

  const checkFase = value => {
    if (value == 1) {
      return "Aberta";
    }
    if (value == 2) {
      return "Em Cotação";
    }
    if (value == 3) {
      return "Cotada";
    }
    if (value == 4) {
      return "Aprovada";
    }
  };
  useEffect(() => {
    async function loadData() {
      const response = await api.get("/oportunidade");
      setData(
        response.data.map((oport, key) => {
          return {
            idd: key,
            id: oport.id,
            Empresa: normalizeCnpj(oport.Empresa.nome),
            Colab: oport.Colab.nome,
            data: oport.data,
            fase: checkFase(oport.fase),
            Cliente: oport.Cliente.nomeAbv,
            contato: oport.contato,
            cod: oport.cod,
            UndNeg: oport.UndNeg.descUndNeg,
            RecDesp: oport.RecDesp.descItem,
            segmento: oport.Segmento.descSegmt,
            representante: oport.Representante.nome,
            desc: oport.desc,
            actions: (
              // we've added some custom button actions
              <>
                <div className="actions-right">
                  <Tooltip title="Cotar">
                    <Button
                      disabled={oport.fase > 2}
                      color="default"
                      size="sm"
                      className={classNames("btn-icon btn-link like")}
                      onClick={() => {
                        dispatch(
                          oportUpdate(
                            oport.id,
                            oport.EmpresaId,
                            oport.ColabId,
                            oport.ClienteId,
                            oport.UndNegId,
                            oport.RecDespId,
                            oport.SegmentoId,
                            oport.RepresentanteId,
                            oport.contato,
                            oport.data,
                            2,
                            oport.cod,
                            oport.desc,
                            oport.narrativa
                          )
                        );
                        history.push(
                          `/cadastro/oportunidade/cotacao/${oport.id}`
                        );
                      }}
                    >
                      <i className="tim-icons icon-money-coins" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="revisar">
                    <Button
                      disabled={oport.fase > 3}
                      color="default"
                      size="sm"
                      className={classNames("btn-icon btn-link like")}
                      onClick={() => {
                        history.push(
                          `/cadastro/oportunidade/cotacao/${oport.id}`
                        );
                      }}
                    >
                      <i className="tim-icons icon-bulb-63" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Aprovar">
                    <Button
                      disabled={oport.fase >= 4}
                      color="default"
                      size="sm"
                      className={classNames("btn-icon btn-link like")}
                      onClick={() => {
                        dispatch(
                          oportUpdate(
                            oport.id,
                            oport.EmpresaId,
                            oport.ColabId,
                            oport.ClienteId,
                            oport.UndNegId,
                            oport.RecDespId,
                            oport.SegmentoId,
                            oport.RepresentanteId,
                            oport.contato,
                            oport.data,
                            4,
                            oport.cod,
                            oport.desc,
                            oport.narrativa
                          )
                        );
                        history.push(
                          `/cadastro/oportunidade/parcela/${oport.id}`
                        );
                      }}
                    >
                      <i className="tim-icons icon-spaceship" />
                    </Button>
                  </Tooltip>
                  {oport.fase != 4 ? (
                    <Tooltip title="Reprovar">
                      <Button
                        color="default"
                        size="sm"
                        className={classNames("btn-icon btn-link like")}
                        onClick={() => {
                          history.go(0);
                          dispatch(
                            oportUpdate(
                              oport.id,
                              oport.EmpresaId,
                              oport.ColabId,
                              oport.ClienteId,
                              oport.UndNegId,
                              oport.RecDespId,
                              oport.SegmentoId,
                              oport.RepresentanteId,
                              oport.contato,
                              oport.data,
                              5,
                              oport.cod,
                              oport.desc,
                              oport.narrativa
                            )
                          );
                        }}
                      >
                        <i className="tim-icons icon-lock-circle" />
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Finalizar">
                      <Button
                        color="default"
                        size="sm"
                        className={classNames("btn-icon btn-link like")}
                        onClick={() => {
                          history.go(0);
                          dispatch(
                            oportUpdate(
                              oport.id,
                              oport.EmpresaId,
                              oport.ColabId,
                              oport.ClienteId,
                              oport.UndNegId,
                              oport.RecDespId,
                              oport.SegmentoId,
                              oport.RepresentanteId,
                              oport.contato,
                              oport.data,
                              5,
                              oport.cod,
                              oport.desc,
                              oport.narrativa
                            )
                          );
                        }}
                      >
                        <i className="tim-icons icon-trophy" />
                      </Button>
                    </Tooltip>
                  )}
                  {/* use this button to add a edit kind of action */}
                  <Tooltip title="Editar">
                    <Button
                      color="default"
                      size="sm"
                      className={classNames("btn-icon btn-link like")}
                      onClick={() => {
                        setExcluding(oport.id);
                        setModalMini(!modalMini);
                      }}
                    >
                      <i className="tim-icons icon-pencil" />
                    </Button>
                  </Tooltip>
                  {/* use this button to remove the data row */}
                </div>
              </>
            )
          };
        })
      );
    }
    loadData();
  }, [dispatch, history, modalMini]);

  const toggleModalMini = () => {
    setModalMini(!modalMini);
  };

  return (
    <>
      <div className="content">
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
            <p>Você quer mesmo reprovar/aprovar</p>
          </ModalBody>
          <div className="modal-footer">
            <Button
              style={{ color: "#000" }}
              className="btn-neutral"
              type="button"
              onClick={() => console.log(excluding)}
            >
              Back
            </Button>
            <Button
              style={{ color: "#7E7E7E" }}
              className="btn-neutral"
              type="button"
              onClick={toggleModalMini}
            >
              Close
            </Button>
          </div>
        </Modal>
        <Col xs={12} md={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                Oportunidades
                <Link to="/cadastro/oportunidade/oport">
                  <Tooltip title="Novo" placement="top" interactive>
                    <Button
                      style={{
                        float: "right"
                      }}
                      className={classNames("btn-icon btn-link like")}
                    >
                      <AddIcon fontSize="large" />
                    </Button>
                  </Tooltip>
                </Link>
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
                        .startsWith(filter.value.toLowerCase())
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
                    Header: "descrição",
                    accessor: "desc",
                    width: 301
                  },
                  {
                    Header: "fase",
                    accessor: "fase"
                  },
                  {
                    Header: "Cliente",
                    accessor: "Cliente"
                  },
                  {
                    Header: "data",
                    accessor: "data"
                  },
                  {
                    Header: "Ações",
                    accessor: "actions",
                    sortable: false,
                    filterable: false,
                    minWidth: 212
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

export default OportTable;
