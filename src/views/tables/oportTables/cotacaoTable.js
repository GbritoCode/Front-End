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
import { PostAdd } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { normalizeCurrency } from "~/normalize";
import api from "~/services/api";

class ParametrosTable extends Component {
  state = {
    data: [],
    hiddenButton: false
  };

  componentDidMount() {
    // --------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.loadClients();
  }

  loadClients = async () => {
    const { id } = this.props.match.params;
    const response = await api.get(`/cotacao/${id}`);
    this.setState({ hiddenButton: response.data[0].Oportunidade.fase >= 5 });
    this.setState({
      data: response.data.map((cotacao, key) => {
        return {
          id: key,
          idd: cotacao.id,
          EmpresaId: cotacao.EmpresaId,
          OportunidadeId: cotacao.OportunidadeId,
          probVend: cotacao.probVend,
          tipoCobranca: this.checkCobranca(cotacao.tipoCobranca),
          hrsPrevst: cotacao.hrsPrevst,
          vlrProp: normalizeCurrency(JSON.stringify(cotacao.vlrProp)),
          vlrDesc: normalizeCurrency(JSON.stringify(cotacao.vlrDesc)),
          vlrLiq: normalizeCurrency(JSON.stringify(cotacao.vlrLiq)),
          recLiq: normalizeCurrency(JSON.stringify(cotacao.recLiq)),
          prevLucro: normalizeCurrency(JSON.stringify(cotacao.prevLucro)),
          numParcelas: cotacao.numParcelas,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Link to={`/update/oportunidade/cotacao/${cotacao.id}`}>
                <Button
                  color="default"
                  size="sm"
                  className={classNames("btn-icon btn-link like")}
                >
                  {cotacao.Oportunidade.fase >= 5 ? (
                    <i className="tim-icons icon-zoom-split" />
                  ) : (
                    <i className="tim-icons icon-pencil" />
                  )}
                </Button>
              </Link>{" "}
            </div>
          )
        };
      })
    });
  };

  checkCobranca = value => {
    switch (value) {
      case 1:
        return "Por Hora";
      case 2:
        return "Por Projeto";
      default:
    }
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
                  Cotações
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
                      {this.state.hiddenButton ? (
                        <></>
                      ) : (
                        <NavLink tag="li">
                          <Link to={`/cadastro/oportunidade/cotacao/${id}`}>
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
                      )}

                      <NavLink tag="li">
                        <Link to={`/update/oportunidade/oport/${id}`}>
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
                      Header: "horas previstas",
                      accessor: "hrsPrevst"
                    },
                    {
                      Header: "Valor da proposta",
                      accessor: "vlrProp"
                    },
                    {
                      Header: "Valor do desconto",
                      accessor: "vlrDesc"
                    },
                    {
                      Header: "Valor Líquido",
                      accessor: "vlrLiq"
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

export default ParametrosTable;
