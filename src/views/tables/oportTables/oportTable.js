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
import React, { Component, useEffect, useState } from "react";
import classNames from "classnames";
// react component for creating dynamic tables
import ReactTable from "react-table-v6";

import {
  Card, CardBody, CardHeader, CardTitle, Col, Button, Modal,
  ModalBody,
} from "reactstrap";

import api from "~/services/api";
import { normalizeCnpj } from "normalize";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Tooltip from '@material-ui/core/Tooltip';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleOutline';
import { oportUpdate } from "~/store/modules/oportunidades/actions";
import { AccountBalance, Done, EditOutlined, Close, AccountCircle } from "@material-ui/icons";

function OportTable() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const dispatch = useDispatch()
  const [data, setData] = useState();
  const [modalMini, setModalMini] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/oportunidade");
      setData(response.data.map((oport, key) => {
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
          itmControle: oport.itmControle.descItem,
          segmento: oport.Segmento.descSegmt,
          representante: oport.Representante.nome,
          desc: oport.desc,
          actions: (
            // we've added some custom button actions
            <>
              <div className="actions-right">
                <Tooltip title="Cotar">
                  <Button
                    disabled={oport.fase > 2 ? true : false}
                    color="default"
                    size="sm"
                    className={classNames("btn-icon btn-link like")}
                    onClick={() => {
                      dispatch(
                        oportUpdate(
                          oport.id,
                          oport.EmpresaId,
                          oport.ColabId,
                          oport.clienteId,
                          oport.UndNegId,
                          oport.itmControleId,
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
                      history.push(`/cadastro/oportunidade/cotacao/${oport.id}`)
                    }}
                  >
                    <AccountBalance />
                  </Button>
                </Tooltip>

                <Tooltip title="Aprovar">
                  <Button
                    disabled={oport.fase >= 4 ? true : false}
                    color="default"
                    size="sm"
                    className={classNames("btn-icon btn-link like")}
                    onClick={() => {
                      dispatch(
                        oportUpdate(
                          oport.id,
                          oport.EmpresaId,
                          oport.ColabId,
                          oport.clienteId,
                          oport.UndNegId,
                          oport.itmControleId,
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
                      history.push(`/cadastro/oportunidade/recurso/${oport.id}`)
                    }}
                  >
                    <Done />
                  </Button>
                </Tooltip>

                <Tooltip title="Reprovar">
                  <Button
                    color="default"
                    size="sm"
                    className={classNames("btn-icon btn-link like")}
                    onClick={() => {
                      history.go(0)
                      dispatch(
                        oportUpdate(
                          oport.id,
                          oport.EmpresaId,
                          oport.ColabId,
                          oport.clienteId,
                          oport.UndNegId,
                          oport.itmControleId,
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
                    <RemoveCircleSharpIcon />
                  </Button>
                </Tooltip>
                {/* use this button to add a edit kind of action */}
                <Link to={`/update/oportunidade/oport/${oport.id}`}>
                  <Button
                    color="default"
                    size="sm"
                    className={classNames("btn-icon btn-link like")}
                  >
                    <EditOutlined />
                  </Button>
                </Link>
                {/* use this button to remove the data row */}
                <Button
                  onClick={() => {
                    var data = this.state.data;
                    data.find((o, i) => {
                      if (o.idd === key) {
                        console.log(o.id)
                        data.splice(i, 1);

                        return true;
                      }
                      return false;
                    });
                    this.setState({ data: data });
                  }}
                  color="danger"
                  size="sm"
                  className={classNames("btn-icon btn-link like")}
                >
                  <i className="tim-icons icon-simple-remove" />
                </Button>{" "}
              </div>
            </>
          ),
        };
      }))

    }
    loadData()
  }, [])
  const checkFase = (value) => {
    if (value == 1) {
      return "Aberta"
    } else if (value == 2) {
      return "Em Cotação"
    } else if (value == 3) {
      return "Cotada"
    } else if (value == 4) {
      return "Aprovada"
    }
  }
  const toggleModalMini = () => {
    setModalMini(!modalMini);
  };

  return (
    <>
      <div className="content">
        <Col xs={12} md={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                Oportunidades
                  <Link to={`/cadastro/oportunidade/oport`}>
                  <Button
                    style={{
                      float: "right",
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}
                    color="info"
                    size="small"
                    className="text-left"
                  >
                    <i
                      className="tim-icons icon-simple-add"
                      style={{
                        paddingBottom: 4,
                        paddingRight: 5,
                      }}
                      size="large"
                    />{" "}
                      Novo
                    </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Modal
                modalClassName="modal-mini "
                isOpen={modalMini}
                toggle={toggleModalMini}
              >
                <div className="modal-header justify-content-center">
                  <button
                    aria-hidden={true}
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    color="primary"
                    onClick={toggleModalMini}
                  >
                    <Close />
                  </button>
                  <div>
                    <AccountCircle fontSize="large" />
                  </div>
                </div>
                <ModalBody className="text-center">
                  <p>Always have an access to your profile</p>
                </ModalBody>
                <div className="modal-footer">
                  <Button
                    style={{ color: "#000" }}
                    className="btn-neutral"
                    type="button"
                    onClick={toggleModalMini}
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
              <ReactTable
                data={data}
                filterable
                resizable={true}
                defaultFilterMethod={(filter, row, column) => {
                  const id = filter.pivotId || filter.id
                  return row[id] !== undefined ? String(row[id]).toLowerCase().startsWith(filter.value.toLowerCase()) : true
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
                    Header: "cod",
                    accessor: "cod",
                  },
                  {
                    Header: "descrição",
                    accessor: "desc",
                    width: 301,
                  },
                  {
                    Header: "fase",
                    accessor: "fase",
                  },
                  {
                    Header: "Cliente",
                    accessor: "Cliente",
                  },
                  {
                    Header: "data",
                    accessor: "data",
                  },
                  {
                    Header: "Ações",
                    accessor: "actions",
                    sortable: false,
                    filterable: false,
                  },
                ]}
                defaultPageSize={10}
                showPagination={true}
                showPageJump={true}
                showPaginationBottom={true}
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
