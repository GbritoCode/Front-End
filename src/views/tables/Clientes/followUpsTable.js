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
  Col,
  Button,
  Modal,
  ModalBody
} from "reactstrap";
import { ArrowBackIos, Close, Message, Timeline } from "@material-ui/icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import api from "~/services/api";

class followUpTable extends Component {
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

  checkAcao = value => {
    switch (value) {
      case 1:
        return "Retornar Contato";
      case 2:
        return "Agendar Reunião";
      case 3:
        return "Solicitar Orçamento";
      case 10:
        return "Finalizar";
      default:
    }
  };

  loadData = async () => {
    const { cliId, campId } = this.props.match.params;
    const response = await api.get(
      `/followUp/${cliId}/false/?ClienteId=${cliId}&CampanhaId=${campId}`
    );
    const response1 = await api.get(`/cliente/${cliId}`);
    this.setState({
      cli: response1.data,
      data: response.data.map((followUp, key) => {
        return {
          idd: key,
          id: followUp.id,
          EmpresaId: followUp.EmpresaId,
          Colab: followUp.Colab,
          acao: this.checkAcao(followUp.proxPasso),
          CliContNome: followUp.CliCont.nome,
          dataContato: followUp.dataContato,
          dataProxContato: followUp.dataProxContato,
          detalhes: followUp.detalhes,
          reacao: followUp.reacao,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}
              {/* use this button to add a edit kind of action */}
              <Link to={`/update/cliente/followUps/${followUp.id}`}>
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
                  this.setState({ excluding: followUp.id });
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
    const { cliId, campId } = this.props.match.params;
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
                    .delete(`followUp/${this.state.excluding}`)
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
                <Link to={`/cadastro/cliente/followUps/${cliId}/${campId}`}>
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
                <Link to={`/timeline/cliente/followUps/${cliId}/${campId}`}>
                  <Tooltip title="TimeLine" placement="top" interactive>
                    <Button
                      style={{
                        float: "right"
                      }}
                      className={classNames("btn-icon btn-link like")}
                    >
                      <Timeline fontSize="large" />
                    </Button>
                  </Tooltip>
                </Link>
                <Link to={`/tabelas/prospeccao/campanha/${campId}`}>
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
                <h3 style={{ marginBottom: 0 }}>Follow Up</h3>
                <p style={{ fontSize: 14 }}>
                  {this.state.cli === undefined ? "" : this.state.cli.nomeAbv}
                </p>
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
                      Header: "Nome Contato",
                      accessor: "CliContNome"
                    },
                    {
                      Header: "Data Contato",
                      accessor: "dataContato"
                    },
                    {
                      Header: "Reação",
                      accessor: "reacao"
                    },
                    {
                      Header: "Ação",
                      accessor: "acao"
                    },
                    {
                      Header: "Data Próximo Contato",
                      accessor: "dataProxContato"
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

export default followUpTable;
