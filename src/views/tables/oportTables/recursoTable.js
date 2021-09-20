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
  Modal,
  ModalBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  DropdownItem
} from "reactstrap";
import { Close, Message, PostAdd } from "@material-ui/icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import AddIcon from "@material-ui/icons/Add";
import api from "~/services/api";

/* eslint-disable eqeqeq */
class RecursoTable extends Component {
  state = {
    data: [],
    hiddenButton: false
  };

  componentDidMount() {
    // --------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.loadData();
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

  toggleModalMini = () => {
    this.setState({ modalMini: !this.state.modalMini });
  };

  delay = ms => new Promise(res => setTimeout(res, ms));

  reloadData = async () => {
    await this.delay(500);
    this.loadData();
  };

  loadData = async () => {
    const { id } = this.props.match.params;
    const response = await api.get(`/recurso/${id}`);
    this.setState({
      hiddenButton: response.data[0]
        ? response.data[0].Oportunidade.fase >= 5
        : false
    });
    this.setState({
      data: response.data.map((recurso, key) => {
        return {
          idd: key,
          id: recurso.id,
          OportunidadeId: recurso.Oportunidade.desc,
          ColabId: recurso.Colab.nome,
          custoPrev: recurso.custoPrev,
          dataInclusao: recurso.dataInclusao,
          hrsPrevst: recurso.hrsPrevst,
          colabVlrHr: recurso.colabVlrHr,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {recurso.Oportunidade.fase >= 5 ? (
                <>
                  <Link to={`/update/oportunidade/recurso/${recurso.id}`}>
                    <Button
                      color="default"
                      size="sm"
                      className={classNames("btn-icon btn-link like")}
                    >
                      <i className="tim-icons icon-zoom-split" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
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
                      this.setState({ excluding: recurso.id });
                      this.toggleModalMini();
                    }}
                    color="danger"
                    size="sm"
                    className={classNames("btn-icon btn-link like")}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </Button>{" "}
                </>
              )}
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
          <Modal
            modalClassName="modal-mini "
            isOpen={this.state.modalMini}
            toggle={this.toggleModalMini}
          >
            <div className="modal-header justify-content-center">
              <button
                aria-hidden
                className="close"
                data-dismiss="modal"
                type="button"
                color="primary"
                onClick={this.toggleModalMini}
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
                onClick={this.toggleModalMini}
              >
                Não
              </Button>
              <Button
                style={{ color: "#7E7E7E" }}
                className="btn-neutral"
                type="button"
                onClick={async () => {
                  await api
                    .delete(`recurso/${this.state.excluding}`)
                    .then(result => {
                      toast.success(result.data);
                      this.reloadData();
                      this.setState({ excluding: undefined });
                    })
                    .catch(err => {
                      toast.error(err.response.data.error);
                    });
                  this.toggleModalMini();
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
                  Recursos
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
                          <Link to={`/cadastro/oportunidade/recurso/${id}`}>
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
                      Header: "Oportunidade",
                      accessor: "OportunidadeId"
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
