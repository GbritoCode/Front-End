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
import { EditOutlined } from "@material-ui/icons";
import api from "~/services/api";
import { store } from "~/store";
import { normalizeCurrency } from "~/normalize";

/* eslint-disable eqeqeq */
export default class DespesasTable extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    // --------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.loadCliente();
  }
  checkTipo = value => {
    if (value == 1) {
      return "Alimentação";
    }
    if (value == 2) {
      return "Deslocamento";
    }
    if (value == 3) {
      return "Hospedagem";
    }
    if (value == 4) {
      return "Passagem";
    }
    if (value == 5) {
      return "Pedágio";
    }
    if (value == 6) {
      return "Estacionamento";
    }
  };
  loadCliente = async () => {
    const { id } = store.getState().auth.user;
    const response = await api.get(`/despesas/${id}`);
    this.setState({
      data: response.data.map((desps, key) => {
        return {
          idd: key,
          id: desps.id,
          cod: desps.Oportunidade.cod,
          oportDesc: desps.Oportunidade.desc,
          tipoDespesa: this.checkTipo(desps.tipoDespesa),
          valorDespesa: normalizeCurrency(JSON.stringify(desps.valorDespesa)),
          desc: desps.desc,

          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Link to={`/update/apontamentos/despesas/${desps.id}`}>
                <Tooltip title="Editar" placement="top" interactive>
                  <Button
                    color="default"
                    size="sm"
                    className={classNames("btn-icon btn-link like")}
                  >
                    <EditOutlined />
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
  };

  render() {
    return (
      <>
        <div className="content">
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Despesas</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={this.state.data}
                  filterable
                  resizable={false}
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
                      accessor: "oportDesc"
                    },
                    {
                      Header: "Tipo da Despesa",
                      accessor: "tipoDespesa"
                    },
                    {
                      Header: "Valor da Despesa",
                      accessor: "valorDespesa"
                    },
                    {
                      Header: "Comentário",
                      accessor: "desc"
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

