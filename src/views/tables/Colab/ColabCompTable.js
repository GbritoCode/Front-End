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
// react component for creating dynamic tables
import ReactTable from "react-table-v6";

import { Card, CardBody, CardHeader, CardTitle, Col, Button } from "reactstrap";
import { normalizeCurrency } from "normalize";
import api from "~/services/api";
import classNames from "classnames";
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

import { Link } from "react-router-dom";
import { ArrowBackIos } from "@material-ui/icons";

/*eslint-disable eqeqeq*/
class ColabCompTable extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    //--------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.loadClients();
  }
  checkNivel = (value) => {
    if (value == 1) {
      return "Trainee"
    } else if (value == 2) {
      return "Júnior"
    } else if (value == 3) {
      return "Pleno"
    } else if (value == 4) {
      return "Sênior"
    }
  }

  checkAtend = (value) => {
    if (value == 1) {
      return "Consultoria"
    } else if (value == 2) {
      return "Tecnologia"
    } else if (value == 3) {
      return "Desenvolvimento"
    } else if (value == 4) {
      return "Complementar"
    }
  }
  checkValor = (value) => {
    if (value == 1) {
      return "Por Hora"
    } else if (value == 2) {
      return "Fixo"
    }
  }
  loadClients = async () => {
    const id = this.props.match.params.id;
    console.log(id);
    const response = await api.get(`/colab/comp/${id}`);
    this.setState({
      data: response.data.map((client, key) => {
        return {
          id: key,
          idd: client.id,
          Colab: client.Colab.nome,
          nivel: this.checkNivel(client.nivel),
          tipoValor: this.checkValor(client.tipoValor),
          valor: normalizeCurrency(JSON.stringify(client.valor)),
          dataInic: client.dataInic,
          dataFim: client.dataFim,
          tipoAtend: this.checkAtend(client.tipoAtend),

          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Link to={`/colab/comp/update/${client.id}`}>
                <Button
                  color="default"
                  size="sm"
                  className={classNames("btn-icon btn-link like")}
                >
                  <i className="tim-icons icon-pencil" />
                </Button>
              </Link>{" "}
              {/* use this button to remove the data row */}
              <Button
                onClick={() => {
                  var data = this.state.data;
                  data.find((o, i) => {
                    if (o.id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      data.splice(i, 1);
                      console.log(data);
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
          ),
        };
      }),
    });
  };

  render() {
    const id = this.props.match.params.id;

    return (
      <>
        <div className="content">
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Complemento de Colaborador
                    <Link to={`/cadastro/colab/comp/${id}`}>
                    <Tooltip title="Novo" placement="top" interactive>
                      <Button
                        style={{
                          float: "right",
                        }}
                        className={classNames("btn-icon btn-link like")}
                      >
                        <AddIcon fontSize="large" />
                      </Button>
                    </Tooltip>
                  </Link>
                  <Link to={`/colab/update/${id}`}>
                  <Tooltip title="Voltar">
                    <Button
                        style={{
                          float: "right",
                        }}
                        className={classNames("btn-icon btn-link like")}
                      >
                        <ArrowBackIos  />
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
                      Header: "Colaborador",
                      accessor: "Colab",
                    },
                    {
                      Header: "Nivel",
                      accessor: "nivel",
                    },
                    {
                      Header: "Valor",
                      accessor: "valor",
                    },
                    {
                      Header: "Tipo de Atendimento",
                      accessor: "tipoAtend",
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
}

export default ColabCompTable;
