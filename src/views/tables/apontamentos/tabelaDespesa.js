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
  Input,
  Label,
  FormGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  DropdownItem
} from "reactstrap";
import { Close, FilterList, Message, PostAdd } from "@material-ui/icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import ReactExport from "react-export-excel";
import { getDaysInMonth } from "date-fns";
import api from "~/services/api";
import { store } from "~/store";
import { normalizeCurrency } from "~/normalize";
import iconExcel from "~/assets/img/iconExcel.png";
import history from "~/services/history";

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;
/* eslint-disable eqeqeq */
export default class DespesasTable extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    // --------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.createInitialDateState();
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

  createInitialDateState = () => {
    const [date, month, year] = new Date()
      .toLocaleDateString("pt-BR")
      .split("/");
    const lastDayMonth = getDaysInMonth(new Date(year, month - 1, date));
    this.setState({ initialDate: `${year}-${month}-01` });
    this.setState({ finalDate: `${year}-${month}-${lastDayMonth}` });
    this.reloadData();
  };

  toggleModalMini = () => {
    this.setState({ modalMini: !this.state.modalMini });
  };

  toggleModalFilter = () => {
    this.setState({ modalFilter: !this.state.modalFilter });
  };

  delay = ms => new Promise(res => setTimeout(res, ms));

  reloadData = async () => {
    await this.delay(500);
    this.loadData();
  };

  camelCase = str => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  };

  filterColumns = data => {
    if (data.length !== 0) {
      const columns = Object.keys(data[0]);
      // Remove by key ()
      const filterColsByKey = columns.filter(
        c => c !== "actions" && c !== "idd"
      );

      return filterColsByKey;
    }
  };

  loadData = async () => {
    const idColab = store.getState().auth.user.Colab.id;
    const query = new URLSearchParams(this.props.location.search);
    const initialDate = query.get("initialDate");
    const finalDate = query.get("finalDate");
    let response;
    if (initialDate && finalDate) {
      response = await api.get(
        `/despesas/${idColab}/?initialDate=${initialDate}&finalDate=${finalDate}`
      );
    } else {
      response = await api.get(
        `/despesas/${idColab}/?initialDate=${this.state.initialDate}&finalDate=${this.state.finalDate}`
      );
    }
    this.setState({
      data: response.data.map((desps, key) => {
        return {
          idd: key,
          id: desps.id,
          Oportunidade: desps.Oportunidade.cod,
          "Descrição Oportunidade": desps.Oportunidade.desc,
          "Data Despesa": desps.dataDespesa,
          "Tipo Despesa": this.checkTipo(desps.tipoDespesa),
          "Valor Despesa": normalizeCurrency(
            JSON.stringify(desps.valorDespesa)
          ),
          Descrição: desps.desc,

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
                    <i className="tim-icons icon-pencil" />
                  </Button>
                </Tooltip>
              </Link>
              {/* use this button to remove the data row */}
              <Button
                onClick={() => {
                  this.setState({ excluding: desps.id });
                  this.toggleModalMini();
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

  checkData = () => {
    const [date, month, year] = new Date()
      .toLocaleDateString("pt-BR")
      .split("/");
    if (this.state.data.length === 0) {
      return (
        <NavLink tag="li">
          <DropdownItem style={{ paddingLeft: "3%" }} className="nav-item">
            <div style={{ float: "left", marginRight: "3%" }}>
              <img alt="Exportar para excel" src={iconExcel} />
            </div>
            <p style={{ paddingTop: "2%" }}>Exportar Excel</p>
          </DropdownItem>
        </NavLink>
      );
    }
    return (
      <ExcelFile
        element={
          <NavLink tag="li">
            <DropdownItem style={{ paddingLeft: "3%" }} className="nav-item">
              <div style={{ float: "left", marginRight: "3%" }}>
                <img alt="Exportar para excel" src={iconExcel} />
              </div>
              <p style={{ paddingTop: "2%" }}>Exportar Excel</p>
            </DropdownItem>
          </NavLink>
        }
        filename={`Despesa_${year}-${month}-${date}`}
      >
        <ExcelSheet data={this.state.data} name="Test">
          {this.filterColumns(this.state.data).map(col => {
            return <ExcelColumn label={this.camelCase(col)} value={col} />;
          })}
        </ExcelSheet>
      </ExcelFile>
    );
  };

  render() {
    const [date, month, year] = new Date()
      .toLocaleDateString("pt-BR")
      .split("/");
    const lastDayMonth = getDaysInMonth(new Date(year, month - 1, date));
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
                    .delete(`despesas/${this.state.excluding}`)
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
          <Modal
            modalClassName="modal-mini "
            isOpen={this.state.modalFilter}
            toggle={this.toggleModalFilter}
          >
            <div className="modal-header justify-content-center">
              <button
                aria-hidden
                className="close"
                data-dismiss="modal"
                type="button"
                color="primary"
                onClick={this.toggleModalFilter}
              >
                <Close />
              </button>
              <div>
                <Message fontSize="large" />
              </div>
            </div>
            <ModalBody className="text-center">
              <FormGroup inline>
                <Label> Data Inicial</Label>
                <Input
                  name="dataAtivd"
                  type="date"
                  defaultValue={
                    this.state.initialDate
                      ? this.state.initialDate
                      : `${year}-${month}-01`
                  }
                  onChange={e => this.setState({ initialDate: e.target.value })}
                />
              </FormGroup>
              <FormGroup inline>
                <Label> Data Final</Label>
                <Input
                  name="dataAtivd"
                  type="date"
                  defaultValue={
                    this.state.finalDate
                      ? this.state.finalDate
                      : `${year}-${month}-${lastDayMonth}`
                  }
                  onChange={e => this.setState({ finalDate: e.target.value })}
                />
              </FormGroup>
            </ModalBody>
            <div className="modal-footer">
              <Button
                style={{ color: "#000" }}
                className="btn-neutral"
                type="button"
                onClick={this.toggleModalFilter}
              >
                Cancelar
              </Button>
              <Button
                style={{ color: "#7E7E7E" }}
                className="btn-neutral"
                type="button"
                onClick={() => {
                  this.loadData();
                  this.toggleModalFilter();
                  history.push(
                    `?initialDate=${this.state.initialDate}&finalDate=${this.state.finalDate}`
                  );
                }}
              >
                Filtrar
              </Button>
            </div>
          </Modal>
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Despesas
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
                      <NavLink
                        onClick={() => {
                          this.toggleModalFilter();
                        }}
                        tag="li"
                      >
                        <DropdownItem
                          style={{ paddingLeft: "3%" }}
                          className="nav-item"
                        >
                          <FilterList
                            style={{ float: "left", marginRight: "3%" }}
                            fontSize="small"
                          />
                          <p style={{ paddingTop: "2%" }}>Filtrar</p>
                        </DropdownItem>
                      </NavLink>

                      {this.checkData()}

                      <NavLink onClick={() => history.goBack()} tag="li">
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
                      Header: "Código",
                      accessor: "Oportunidade"
                    },
                    {
                      Header: "Oportunidade",
                      accessor: "Descrição Oportunidade"
                    },
                    {
                      Header: "Tipo da Despesa",
                      accessor: "Tipo Despesa"
                    },
                    {
                      Header: "Valor da Despesa",
                      accessor: "Valor Despesa"
                    },
                    {
                      Header: "Data",
                      accessor: "Data Despesa"
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
