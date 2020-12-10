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
import { ArrowBackIos } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import api from "~/services/api";

/* eslint-disable eqeqeq */
class RecursoTable extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    // --------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.loadCliente();
  }

  checkFase = value => {
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

  loadCliente = async () => {
    const { id } = this.props.match.params;
    const response = await api.get(`/recurso/${id}`);
    this.setState({
      data: response.data.map((recurso, key) => {
        return {
          idd: key,
          id: recurso.id,
          oportunidadeId: recurso.Oportunidade.desc,
          ColabId: recurso.Colab.nome,
          custoPrev: recurso.custoPrev,
          dataInclusao: recurso.dataInclusao,
          hrsPrevst: recurso.hrsPrevst,
          colabVlrHr: recurso.colabVlrHr,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Link to={`/update/oportunidade/recurso/${recurso.id}`}>
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
    const { id } = this.props.match.params;
    return (
      <>
        <div className="content">
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Recursos
                  <Link to={`/cadastro/oportunidade/recurso/${id}`}>
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
                  <Link to="/tabelas/oportunidade/oport">
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
                </CardTitle>
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
                      Header: "Oportunidade",
                      accessor: "oportunidadeId"
                    },
                    {
                      Header: "Colaborador",
                      accessor: "ColabId"
                    },
                    {
                      Header: "Horas Previstas",
                      accessor: "hrsPrevst"
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

export default RecursoTable;
