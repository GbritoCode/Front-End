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

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  DropdownItem
} from "reactstrap";
import classNames from "classnames";
import AddIcon from "@material-ui/icons/Add";

import { Link } from "react-router-dom";
import { PostAdd } from "@material-ui/icons";
import { normalizeCurrency } from "~/normalize";
import api from "~/services/api";

/* eslint-disable eqeqeq */
class ColabCompTable extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    // --------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.loadClients();
  }

  checkNivel = value => {
    switch (value) {
      case 1:
        return "Trainee";
      case 2:
        return "Júnior";
      case 3:
        return "Pleno";
      case 4:
        return "Sênior";
      default:
    }
  };

  checkAtend = value => {
    switch (value) {
      case 1:
        return "Consultoria";
      case 2:
        return "Tecnologia";
      case 3:
        return "Desenvolvimento";
      case 4:
        return "Complementar";
      default:
    }
  };

  checkValor = value => {
    switch (value) {
      case 1:
        return "Por Hora";
      case 2:
        return "Fixo";
      default:
    }
  };

  loadClients = async () => {
    const { id } = this.props.match.params;
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
                  var { data } = this.state;
                  data.find((o, i) => {
                    if (o.id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
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
                  Complemento de Colaborador
                  <UncontrolledDropdown style={{ float: "right" }}>
                    <DropdownToggle
                      style={{ paddingLeft: "0px" }}
                      caret
                      color="default"
                      data-toggle="dropdown"
                      nav
                      onClick={e => e.preventDefault()}
                    >
                      <PostAdd />
                      <div className="photo" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-navbar" right tag="ul">
                      <NavLink tag="li">
                        <Link to={`/cadastro/colab/comp/${id}`}>
                          <DropdownItem
                            style={{ paddingLeft: "3%" }}
                            className="nav-item"
                          >
                            <AddIcon
                              style={{ float: "left", marginRight: "3%" }}
                              fontSize="small"
                            />
                            <p style={{ paddingTop: "2%" }}>Novo</p>
                          </DropdownItem>
                        </Link>
                      </NavLink>
                      <NavLink tag="li">
                        <Link to={`/colab/update/${id}`}>
                          <DropdownItem
                            style={{ paddingLeft: "3%" }}
                            className="nav-item"
                          >
                            <span
                              style={{
                                float: "left",
                                marginRight: "3%",
                                fontSize: "1.25rem"
                              }}
                              className="material-icons"
                            >
                              logout
                            </span>
                            <p style={{ paddingTop: "2%" }}>Voltar</p>
                          </DropdownItem>
                        </Link>
                      </NavLink>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardTitle>
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
                      Header: "Colaborador",
                      accessor: "Colab"
                    },
                    {
                      Header: "Nivel",
                      accessor: "nivel"
                    },
                    {
                      Header: "Valor",
                      accessor: "valor"
                    },
                    {
                      Header: "Tipo de Atendimento",
                      accessor: "tipoAtend"
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

export default ColabCompTable;
