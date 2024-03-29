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

import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { PostAdd } from "@material-ui/icons";
import { normalizeCurrency } from "~/normalize";
import api from "~/services/api";

/* eslint-disable eqeqeq */
class Tabela_Cliente extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    // --------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.loadData();
  }

  checkCobranca = value => {
    if (value == 1) {
      return "Por Hora";
    }
    if (value == 2) {
      return "Por Projeto";
    }
    if (value == 3) {
      return "Por Dia";
    }
    if (value == 4) {
      return "Por Quilômetro";
    }
    if (value == 5) {
      return "Por Refeição";
    }
  };

  loadData = async () => {
    const { id } = this.props.match.params;
    const response = await api.get(`/cliente/rec_desp/${id}`);
    this.setState({
      data: response.data.map((cliRecDesp, key) => {
        return {
          id: key,
          idd: cliRecDesp.id,
          ClienteId: cliRecDesp.ClienteId,
          recDesp: cliRecDesp.RecDesp.desc,
          dataFim: cliRecDesp.dataFim,
          tipoCobranca: this.checkCobranca(cliRecDesp.tipoCobranca),
          valorRec: normalizeCurrency(JSON.stringify(cliRecDesp.valorRec)),
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Link to={`/update/cliente/rec_desp/${cliRecDesp.id}`}>
                <Button
                  color="default"
                  size="sm"
                  className={classNames("btn-icon btn-link like")}
                >
                  <i className="tim-icons icon-pencil" />
                </Button>
              </Link>{" "}
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
                  Receita do Cliente
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
                        <Link to={`/cadastro/cliente/rec_desp/${id}`}>
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
                        <Link to={`/cliente_update/${id}/false`}>
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
                      Header: "Tipo de Cobrança",
                      accessor: "tipoCobranca"
                    },
                    {
                      Header: "Tipo",
                      accessor: "recDesp"
                    },
                    {
                      Header: "Valor da Receita",
                      accessor: "valorRec"
                    },
                    {
                      Header: "data Final",
                      accessor: "dataFim"
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

export default Tabela_Cliente;
