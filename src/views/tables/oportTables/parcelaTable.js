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
  ModalBody
} from "reactstrap";
import { Close, Message, ArrowBackIos } from "@material-ui/icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import api from "~/services/api";
import history from "~/services/history";
import { normalizeCurrency } from "~/normalize";

class ParametrosTable extends Component {
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
    const { id } = this.props.match.params;
    const response = await api.get(`/parcela/${id}`);
    this.setState({
      data: response.data.map((parcela, key) => {
        return {
          id: key,
          idd: parcela.id,
          OportunidadeId: parcela.OportunidadeId,
          parcela: parcela.parcela,
          vlrParcela: normalizeCurrency(parcela.vlrParcela),
          dtEmissao: parcela.dtEmissao,
          dtVencimento: parcela.dtVencimento,
          notaFiscal: parcela.notaFiscal,
          pedidoCliente: parcela.pedidoCliente,
          situacao: this.checkSituacao(parcela.situacao),
          vlrPago: normalizeCurrency(parcela.vlrPago),
          saldo: normalizeCurrency(parcela.saldo),
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
                    history.push(`/update/oportunidade/parcNota/${parcela.id}`);
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
                    history.push(`/update/oportunidade/parc/${parcela.id}`);
                  }}
                >
                  <i className="tim-icons icon-coins" />
                </Button>
              </Tooltip>
              {/* use this button to remove the data row */}
              <Button
                onClick={() => {
                  this.setState({ excluding: parcela.id });
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
                  Parcelas
                  <Link to={`/cadastro/oportunidade/parcela/${id}`}>
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
                  <Link to={`/update/oportunidade/oport/${id}`}>
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
                      Header: "parcela",
                      accessor: "parcela"
                    },
                    {
                      Header: "Valor Parcela",
                      accessor: "vlrParcela"
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
                      Header: "Saldo",
                      accessor: "saldo"
                    },
                    {
                      Header: "Situação",
                      accessor: "situacao"
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
