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
import React, { Component } from "react";
import classNames from "classnames";
// react component for creating dynamic tables
import ReactTable from "react-table-v6";

import { Card, CardBody, CardHeader, CardTitle, Col, Button } from "reactstrap";

import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import api from "~/services/api";
import { store } from "~/store";
import { normalizeHrToMin } from "~/normalize";

/* eslint-disable eqeqeq */
export default class HorasTable extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    // --------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.loadCliente();
  }

  loadCliente = async () => {
    const idColab = store.getState().auth.user.Colab.id;
    const response = await api.get(`/horas/${idColab}`);
    this.setState({
      data: response.data.map((horas, key) => {
        return {
          idd: key,
          id: horas.id,
          cod: horas.Oportunidade.cod,
          desc: horas.Oportunidade.desc,
          horaInic: horas.horaInic,
          horaIntrv: horas.horaIntrv,
          horaFim: horas.horaFim,
          dataAtivd: horas.dataAtivd,
          TotalApont: normalizeHrToMin(horas.totalApont),
          Cliente: horas.Oportunidade.Cliente.nomeAbv,

          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Link to={`/update/apontamentos/horas/${horas.id}`}>
                <Tooltip title="Editar" placement="top" interactive>
                  <Button
                    color="default"
                    size="sm"
                    className={classNames("btn-icon btn-link like")}
                  >
                    <i className="tim-icons icon-pencil" />
                  </Button>
                </Tooltip>
              </Link>
              {/* use this button to remove the data row */}
              <Button
                onClick={() => {
                  var { data } = this.state;
                  data.find((o, i) => {
                    if (o.idd === key) {
                      data.splice(i, 1);

                      return true;
                    }
                    return false;
                  });
                  this.setState({ data });
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
    });
    console.log(typeof this.state.data.dataAtivd);
  };

  render() {
    return (
      <>
        <div className="content">
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Horas</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={this.state.data}
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
                      Header: "Oportunidade",
                      accessor: "desc"
                    },
                    {
                      Header: "Cliente",
                      accessor: "Cliente"
                    },
                    {
                      Header: "Data",
                      accessor: "dataAtivd"
                    },
                    {
                      Header: "Total do Dia",
                      accessor: "TotalApont"
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
}
