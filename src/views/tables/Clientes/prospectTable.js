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
import { Close, Message } from "@material-ui/icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import { normalizeCnpj } from "~/normalize";
import { ClienteUpdate } from "~/store/modules/Cliente/actions";
import api from "~/services/api";

export default function ProspectTable() {
  document.body.classList.add("white-content");
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [modalMini, setModalMini] = useState(false);
  const [excluding, setExcluding] = useState(false);
  const checkDesc = value => {
    switch (value) {
      case "1":
        return "Indicação";
      case "2":
        return "Representação";
      case "3":
        return "Prospecção";
      case "4":
        return "Interna";
      default:
    }
  };
  useEffect(() => {
    async function loadData() {
      const response = await api.get("/cliente/?prospect=true");
      setData(
        response.data.map((client, key) => {
          return {
            idd: key,
            id: client.id,
            CNPJ: normalizeCnpj(client.CNPJ),
            fantasia: client.fantasia,
            rzSoc: client.rzSoc,
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
                {/* use this button to add a like kind of action */}
                <Tooltip title="Aprovar">
                  <Button
                    color="default"
                    size="sm"
                    className={classNames("btn-icon btn-link like")}
                    onClick={() => {
                      dispatch(
                        ClienteUpdate(
                          client.id,
                          client.nomeAbv,
                          client.rzSoc,
                          client.fantasia,
                          client.RepresentanteId,
                          client.TipoComisseId,
                          0
                        )
                      );
                    }}
                  >
                    <i className="tim-icons icon-check-2" />
                  </Button>
                </Tooltip>
                {/* use this button to add a edit kind of action */}
                <Link to={`/cliente_update/${client.id}/true`}>
                  <Button
                    color="default"
                    size="sm"
                    className={classNames("btn-icon btn-link like")}
                  >
                    <i className="tim-icons icon-pencil" />
                  </Button>
                </Link>
                {/* use this button to remove the data row */}
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
    }
    loadData();
  }, [dispatch, modalMini]);
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
            <p>Deseja deletar o registro?</p>
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
                  .delete(`recurso/${excluding}`)
                  .then(result => {
                    toast.success(result.data);
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
                Prospects
                <Link to="/cliente_cadastro/true">
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
  );
}
