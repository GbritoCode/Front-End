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
  ModalBody,
  Input,
  Label
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import { Close, Message } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";
import { normalizeCpf } from "~/normalize";
import api from "~/services/api";

/* eslint-disable eqeqeq */
function PeriodTokenTable() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [data1, setData1] = useState([]);
  const [modalMini, setModalMini] = useState(false);
  const [altering, setAltering] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/colab");
      const response1 = await api.get("/fechamentoPeriodo");
      setData1(response1.data);
      setAltering(prevState => ({
        ...prevState,
        periodo: response1.data[0].nome,
        ano: response1.data[0].ano
      }));
      setData(
        response.data.map((colab, key) => {
          return {
            id: key,
            idd: colab.id,
            CPF: normalizeCpf(colab.CPF),
            FornecId: colab.FornecId,
            Empresa: colab.Empresa.nome,
            nome: colab.nome,
            dtAdmiss: colab.dtAdmiss,
            cel: colab.cel,
            skype: colab.skype,
            email: colab.email,
            espec: colab.espec,

            actions: (
              // we've added some custom button actions
              <div className="actions-right">
                {/* use this button to add a edit kind of action */}
                <Button
                  color="default"
                  size="sm"
                  className={classNames("btn-icon btn-link like")}
                  onClick={() => {
                    setAltering({
                      ColabId: colab.id,
                      nome: colab.nome,
                      action: "liberar"
                    });
                    setModalMini(!modalMini);
                  }}
                >
                  <Tooltip title="Gerar Token">
                    <i className="tim-icons icon-simple-add" />
                  </Tooltip>
                </Button>
                {/* use this button to remove the data row */}
                <Button
                  onClick={() => {
                    setAltering({
                      ColabId: colab.id,
                      nome: colab.nome,
                      action: "cancelar"
                    });
                    setModalMini(!modalMini);
                  }}
                  color="danger"
                  size="sm"
                  className={classNames("btn-icon btn-link like")}
                >
                  <Tooltip title="Excluir Token">
                    <i className="tim-icons icon-simple-remove" />
                  </Tooltip>
                </Button>{" "}
              </div>
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
  console.log(altering);
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
            {altering.action === "liberar" ? (
              <>
                <p>
                  {" "}
                  Informe período que deseja liberar para o colaborador{" "}
                  {altering.nome}{" "}
                </p>
                <Label style={{ float: "left" }}>Período</Label>
                <Input
                  name="periodo"
                  type="select"
                  onChange={e => {
                    var { value } = e.target;
                    var i = value.replace(/[^a-zA-Z0-9,ç ]/g, "").split(",");
                    setAltering(prevState => ({
                      ...prevState,
                      periodo: i[0],
                      ano: i[1]
                    }));
                  }}
                >
                  <option disabled value="">
                    Selecione o período
                  </option>
                  {data1.map(periodo => (
                    <option
                      key={periodo.id}
                      value={JSON.stringify([periodo.nome, periodo.ano])}
                    >
                      {" "}
                      {periodo.nome} - {periodo.ano}{" "}
                    </option>
                  ))}
                </Input>
                <div className="modal-footer">
                  <>
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
                          .post("liberaPeriodo", {
                            ColabId: altering.ColabId,
                            periodo: altering.periodo,
                            ano: altering.ano
                          })
                          .then(result => {
                            toast.success(result.data);
                            setAltering({});
                          })
                          .catch(err => {
                            toast.error(err.response.data.error);
                          });
                        toggleModalMini();
                      }}
                    >
                      Liberar
                    </Button>
                  </>
                </div>
              </>
            ) : (
              <>
                <p>
                  {" "}
                  Deseja cancelar o período liberado para o colaborador{" "}
                  {altering.nome} ?{" "}
                </p>
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
                        .delete(`liberaPeriodo/${altering.ColabId}`)
                        .then(result => {
                          toast.success(result.data);
                          setAltering({});
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
              </>
            )}
          </ModalBody>
        </Modal>
        <Col xs={12} md={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                Liberar Períodos
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
                    Header: "Nome",
                    accessor: "nome"
                  },
                  {
                    Header: "Celular",
                    accessor: "cel"
                  },
                  {
                    Header: "Email",
                    accessor: "email"
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

export default PeriodTokenTable;
