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
import { normalizeCnpj } from "~/normalize";
import api from "~/services/api";
import { store } from "~/store";

export default function Tabela_Cliente() {
  document.body.classList.add("white-content");

  const [data, setData] = useState([]);
  const [excluding, setExcluding] = useState([]);
  const [modalMini, setModalMini] = useState(false);
  const [access, setAccess] = useState("");

  const toggleModalMini = () => {
    setModalMini(!modalMini);
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const reloadData = async () => {
    await delay(500);
  };

  useEffect(() => {
    const { id } = store.getState().auth.user.Colab;
    const { accessible } = store.getState().auth;
    console.log(id);
    console.log(accessible);
    console.log(!!accessible.find(acc => acc === "acessoRestritoCli"));
    console.log(!!accessible.find(acc => acc === "acessoTotalCli"));
    switch (true) {
      case !!accessible.find(acc => acc === "acessoRestritoCli"):
        setAccess("acessoRestritoCli");
        break;
      case !!accessible.find(acc => acc === "acessoTotalCli"):
        setAccess("acessoTotalCli");
        break;
      default:
    }

    const loadData = async () => {
      const response = await api.get("/cliente/?prospect=false");
      setData(
        response.data.map((client, key) => {
          return {
            idd: key,
            id: client.id,
            CNPJ: normalizeCnpj(client.CNPJ),
            nomeAbv: client.nomeAbv,
            contNome: client.CliConts[0].nome,
            contEmail: client.CliConts[0].email,
            RepresentanteId: client.RepresentanteId,
            Representante: client.Representante.nome,
            EmpresaId: client.EmpresaId,
            prospect: client.prospect,
            actions: (
              // we've added some custom button actions
              <div className="actions-right">
                {/* use this button to add a like kind of action */}
                {/* use this button to add a edit kind of action */}
                <Link to={`/cliente_update/${client.id}/false`}>
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
      // access === "acessoTotalCli" &&
      //   setData(
      //     response.data.map((client, key) => {
      //       return {
      //         idd: key,
      //         id: client.id,
      //         CNPJ: normalizeCnpj(client.CNPJ),
      //         nomeAbv: client.nomeAbv,
      //         contNome: client.CliConts[0].nome,
      //         contEmail: client.CliConts[0].email,
      //         RepresentanteId: client.RepresentanteId,
      //         Representante: client.Representante.nome,
      //         EmpresaId: client.EmpresaId,
      //         prospect: client.prospect,
      //         actions: (
      //           // we've added some custom button actions
      //           <div className="actions-right">
      //             {/* use this button to add a like kind of action */}
      //             {/* use this button to add a edit kind of action */}
      //             <Link to={`/cliente_update/${client.id}/false`}>
      //               <Button
      //                 color="default"
      //                 size="sm"
      //                 className={classNames("btn-icon btn-link like")}
      //               >
      //                 <i className="tim-icons icon-pencil" />
      //               </Button>
      //             </Link>
      //             {/* use this button to remove the data row */}
      //             <Button
      //               onClick={() => {
      //                 setExcluding(client.id);
      //                 setModalMini(!modalMini);
      //               }}
      //               color="danger"
      //               size="sm"
      //               className={classNames("btn-icon btn-link like")}
      //             >
      //               <i className="tim-icons icon-simple-remove" />
      //             </Button>{" "}
      //           </div>
      //         )
      //       };
      //     })
      //   );

      // access === "acessoRestritoCli" &&
      //   setData(
      //     response.data
      //       .filter(arr => arr.Representante.ColabId === id)
      //       .map((client, key) => {
      //         return {
      //           idd: key,
      //           id: client.id,
      //           CNPJ: normalizeCnpj(client.CNPJ),
      //           nomeAbv: client.nomeAbv,
      //           contNome: client.CliConts[0].nome,
      //           contEmail: client.CliConts[0].email,
      //           RepresentanteId: client.RepresentanteId,
      //           Representante: client.Representante.nome,
      //           EmpresaId: client.EmpresaId,
      //           prospect: client.prospect,
      //           actions: (
      //             // we've added some custom button actions
      //             <div className="actions-right">
      //               {/* use this button to add a like kind of action */}
      //               {/* use this button to add a edit kind of action */}
      //               <Link to={`/cliente_update/${client.id}/false`}>
      //                 <Button
      //                   color="default"
      //                   size="sm"
      //                   className={classNames("btn-icon btn-link like")}
      //                 >
      //                   <i className="tim-icons icon-pencil" />
      //                 </Button>
      //               </Link>
      //               {/* use this button to remove the data row */}
      //               <Button
      //                 onClick={() => {
      //                   setExcluding(client.id);
      //                   setModalMini(!modalMini);
      //                 }}
      //                 color="danger"
      //                 size="sm"
      //                 className={classNames("btn-icon btn-link like")}
      //               >
      //                 <i className="tim-icons icon-simple-remove" />
      //               </Button>{" "}
      //             </div>
      //           )
      //         };
      //       })
      //   );
    };
    loadData();
  }, [access, modalMini]);

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
                  .delete(`cliente/${excluding}`)
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
                Clientes
                <Link to="/cliente_cadastro/false">
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
                    Header: "CNPJ",
                    accessor: "CNPJ"
                  },
                  {
                    Header: "Nome Abreviado",
                    accessor: "nomeAbv"
                  },
                  {
                    Header: "Contato",
                    accessor: "contNome"
                  },
                  {
                    Header: "Email",
                    accessor: "contEmail"
                  },
                  {
                    Header: "Representante",
                    accessor: "Representante"
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
