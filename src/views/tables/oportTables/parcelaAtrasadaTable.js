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

import { Tooltip } from "@material-ui/core";
import ReactExport from "react-export-excel";
import api from "~/services/api";
import history from "~/services/history";
import { normalizeCurrency } from "~/normalize";
import iconExcel from "~/assets/img/iconExcel.png";

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;
class ParcelaAtrasadaTable extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    // --------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.loadData();
  }

  toggleModalMini = () => {
    this.setState({ modalMini: !this.state.modalMini });
  };

  delay = ms => new Promise(res => setTimeout(res, ms));

  reloadData = async () => {
    await this.delay(500);
    this.loadData();
  };

  checkSituacao = parcela => {
    switch (parcela) {
      case "1":
        return "Pendente";
      case "2":
        return "Aberta";
      case "3":
        return "Parcial";
      case "4":
        return "Liquidada";
      default:
    }
  };

  loadData = async () => {
    const response = await api.get(`/parcela/?listAll=true&tipo=atrasadas`);

    const data = response.data.map((parcela, key) => {
      return {
        id: key,
        idd: parcela.id,
        OportunidadeId: parcela.OportunidadeId,
        Cliente: parcela.Oportunidade.Cliente.nomeAbv,
        "Código Oportunidade": parcela.Oportunidade.cod,
        Oportunidade: parcela.Oportunidade.desc,
        dtEmissao: parcela.dtEmissao,
        parcela: parcela.parcela,
        vlrParcela: normalizeCurrency(parcela.vlrParcela),
        notaFiscal: parcela.notaFiscal,
        dtVencimento: parcela.dtVencimento,
        vlrPago: normalizeCurrency(parcela.vlrPago),
        saldo: normalizeCurrency(parcela.saldo),
        pedidoCliente: parcela.pedidoCliente,
        situacao: this.checkSituacao(parcela.situacao),
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a edit kind of action */}
            <Tooltip title="Nota Fiscal">
              <Button
                color="default"
                size="sm"
                className={classNames("btn-icon btn-link like")}
                onClick={() => {
                  history.push(
                    `/update/oportunidade/parcNota/${parcela.id}/?fromDash=true`
                  );
                }}
              >
                <i className="tim-icons icon-paper" />
              </Button>
            </Tooltip>
            <Tooltip title="Liquidar">
              <Button
                disabled={parcela.situacao < 2}
                color="default"
                size="sm"
                className={classNames("btn-icon btn-link like")}
                onClick={() => {
                  history.push(
                    `/update/oportunidade/parc/${parcela.id}/?fromDash=true`
                  );
                }}
              >
                <i className="tim-icons icon-coins" />
              </Button>
            </Tooltip>
          </div>
        )
      };
    });

    this.setState({
      data
    });
  };

  camelCase = str => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  };

  filterColumns = data => {
    if (data.length !== 0) {
      const columns = Object.keys(data[0]);
      // Remove by key ()
      const filterColsByKey = columns.filter(
        c =>
          c !== "actions" && c !== "idd" && c !== "id" && c !== "OportunidadeId"
      );

      return filterColsByKey;
    }
  };

  checkData = () => {
    const [date, month, year] = new Date()
      .toLocaleDateString("pt-BR")
      .split("/");
    if (this.state.data.length === 0) {
      return (
        <Tooltip title="Exportar para excel" placement="top" interactive>
          <img alt="Exportar para excel" src={iconExcel} />
        </Tooltip>
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
        filename={`parcelasAtrasadas_${year}-${month}-${date}`}
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
                    .delete(`parcela/${this.state.excluding}`)
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
                  Parcelas Atrasadas
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
                      Header: "Cliente",
                      accessor: "Cliente"
                    },
                    {
                      Header: "Código",
                      accessor: "Código Oportunidade"
                    },
                    {
                      Header: "Oportunidade",
                      accessor: "Oportunidade"
                    },
                    {
                      Header: "parcela",
                      accessor: "parcela"
                    },
                    {
                      Header: "Saldo",
                      accessor: "saldo"
                    },
                    {
                      Header: "Nota Fiscal",
                      accessor: "notaFiscal"
                    },
                    {
                      Header: "Vencimento",
                      accessor: "dtVencimento"
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

export default ParcelaAtrasadaTable;
