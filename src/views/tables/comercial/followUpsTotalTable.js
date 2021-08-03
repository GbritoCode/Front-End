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

import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ArrowBackIos } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import api from "~/services/api";
import { store } from "~/store";

/* eslint-disable eqeqeq */
function ComercialFUPsTotalTable() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const { campId, inicDate, endDate } = useParams();
  const dispatch = useDispatch();

  const [data, setData] = useState();
  const [access, setAccess] = useState("");
  const [Colab, setColab] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const checkAcao = value => {
    switch (value) {
      case 1:
        return "Retornar Contato";
      case 2:
        return "Agendar Reunião";
      case 3:
        return "Solicitar Orçamento";
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

      setData(
        response.data.Fups.rows.map((fup, key) => {
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
            Campanha: fup.Campanha.cod
          };
        })
      );
      setIsLoading(false);
    }
    loadData();
  }, [Colab, access, campId, dispatch, endDate, history, inicDate]);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="content">
            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <Link to="/dashboardComercial">
                    <Tooltip title="Voltar">
                      <Button
                        style={{
                          float: "right"
                        }}
                        className={classNames("btn-icon btn-link like")}
                      >
                        <ArrowBackIos />
                      </Button>
                    </Tooltip>
                  </Link>
                  <h3 style={{ marginBottom: 0 }}>Follow Ups</h3>
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
                        Header: "Cliente",
                        accessor: "Cliente"
                      },
                      {
                        Header: "Campanha",
                        accessor: "Campanha"
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
                        Header: "Data Próximo Contato",
                        accessor: "dataProxContato"
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
