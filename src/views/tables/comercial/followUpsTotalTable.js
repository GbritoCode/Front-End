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
import fileDownload from "js-file-download";
import api from "~/services/api";
import { store } from "~/store";
import iconExcel from "~/assets/img/iconExcel.png";

/* eslint-disable eqeqeq */
function ComercialFUPsTotalTable() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const { campId, inicDate, endDate } = useParams();
  const dispatch = useDispatch();

  const [campData, setCampData] = useState();
  const [clientes] = useState([]);
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
      case 4:
        return "Iniciar Contato";
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
      const response1 = await api.get(`/campanha/${campId}/true`);
      setCampData({
        cod: response1.data.cod,
        desc: response1.data.desc
      });
      setData(
        response.data.Fups.rows.map((fup, key) => {
          // console.log(
          //   response.data.Fups.rows.reverse().find(arr => {
          //     !clientes.includes(arr.ClienteId);
          //     clientes.push(arr.ClienteId);
          //     return true;
          //   }).distanceFromToday
          // );
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
            // dias: response.data.Fups.rows.reverse().find(arr => {
            //   if(clientes.includes(arr.ClienteId)){
            //     return true;
            //   }
            //   clientes.push(arr.ClienteId);
            // }).distanceFromToday
          };
        })
      );
      setIsLoading(false);
    }
    loadData();
  }, [Colab, access, campId, clientes, dispatch, endDate, history, inicDate]);

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
                  <div style={{ marginTop: 10, float: "right" }}>
                    <Tooltip
                      title="Exportar para excel"
                      placement="top"
                      interactive
                      onClick={async () => {
                        await api
                          .get(
                            `/cliente/export/?filter=true&campId=${campId}&inicDate=${inicDate}&endDate=${endDate}&finalized=false&totalFUP=true&repeat=true`,
                            {
                              responseType: "blob"
                            }
                          )
                          .then(response =>
                            fileDownload(
                              response.data,
                              "Relatório Follow Ups.xlsx"
                            )
                          );
                      }}
                    >
                      <img alt="Exportar para excel" src={iconExcel} />
                    </Tooltip>
                  </div>
                  <h3 style={{ marginBottom: 0 }}>Follow Ups</h3>
                  <p style={{ fontSize: 14 }}>
                    {campData.cod} | {campData.desc}
                  </p>
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
                        Header: "Empresa",
                        accessor: "Cliente"
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
                      // {
                      //   Header: "Dias",
                      //   accessor: "dias"
                      // },
                      {
                        Header: "Próximo Contato",
                        accessor: "dataProxContato",
                        sortMethod: (a, b) => {
                          // force null and undefined to the bottom
                          a = a === null || a === undefined ? -Infinity : a;
                          b = b === null || b === undefined ? -Infinity : b;
                          // force any string values to lowercase
                          a = typeof a === "string" ? a.toLowerCase() : a;
                          b = typeof b === "string" ? b.toLowerCase() : b;
                          // Return either 1 or -1 to indicate a sort priority
                          const aSplitted = a.split("/");
                          const bSplitted = b.split("/");
                          console.log(aSplitted);
                          a = `${aSplitted[2]}-${aSplitted[1]}-${aSplitted[0]}`;
                          b = `${bSplitted[2]}-${bSplitted[1]}-${bSplitted[0]}`;
                          console.log(a);

                          if (a > b) {
                            return 1;
                          }
                          if (a < b) {
                            return -1;
                          }
                          // returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
                          return 0;
                        }
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
