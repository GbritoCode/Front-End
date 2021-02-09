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
import { getDaysInMonth } from "date-fns";
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
  FormGroup
} from "reactstrap";
import { Close, Message, SearchOutlined } from "@material-ui/icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import ReactExport from "react-export-excel";
import api from "~/services/api";
import { store } from "~/store";
import { normalizeHrToMin } from "~/normalize";
import iconExcel from "~/assets/img/iconExcel.png";

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;
/* eslint-disable eqeqeq */
export default class HorasTable extends Component {
  state = {
    data: [{}],
    initialDate: null,
    finalDate: null
  };

  componentDidMount() {
    // --------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.createInitialDateState();
  }

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
    await this.delay(100);
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
    const response = await api.get(
      `/horas/${idColab}/?initialDate=${this.state.initialDate}&finalDate=${this.state.finalDate}`
    );
    this.setState({
      data: response.data.map((horas, key) => {
        return {
          idd: key,
          id: horas.id,
          Cliente: horas.Oportunidade.Cliente.nomeAbv,
          Oportunidade: horas.Oportunidade.cod,
          "Descrição Oportunidade": horas.Oportunidade.desc,
          "Data Atividade": horas.dataAtivd,
          Analista: horas.Colab.nome,
          "Hora Inicial": horas.horaInic,
          Intervalo: horas.horaIntrv,
          "Hora Final": horas.horaFim,
          Total: normalizeHrToMin(horas.totalApont),
          "Id Área": horas.AreaId,
          Solicitante: horas.solicitante,
          Descrição: horas.desc,

          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Link to={`/update/apontamentos/horas/${horas.id}`}>
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
                  this.setState({ excluding: horas.id });
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
        <Tooltip title="Exportar para excel" placement="top" interactive>
          <img alt="Exportar para excel" src={iconExcel} />
        </Tooltip>
      );
    }
    return (
      <ExcelFile
        element={
          <Tooltip title="Exportar para excel" placement="top" interactive>
            <img alt="Exportar para excel" src={iconExcel} />
          </Tooltip>
        }
        filename={`Horas_${year}-${month}-${date}`}
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
                    .delete(`horas/${this.state.excluding}`)
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
                  Horas
                  <div style={{ marginTop: 10, float: "right" }}>
                    {this.checkData()}
                  </div>
                  <Tooltip title="Filtrar" placement="top" interactive>
                    <Button
                      style={{
                        float: "right"
                      }}
                      className={classNames("btn-icon btn-link like")}
                      onClick={() => {
                        this.toggleModalFilter();
                      }}
                    >
                      <SearchOutlined />
                    </Button>
                  </Tooltip>
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
                      Header: "Código",
                      accessor: "Oportunidade"
                    },
                    {
                      Header: "Oportunidade",
                      accessor: "Descrição Oportunidade"
                    },
                    {
                      Header: "Cliente",
                      accessor: "Cliente"
                    },
                    {
                      Header: "Data",
                      accessor: "Data Atividade"
                    },
                    {
                      Header: "Total",
                      accessor: "Total"
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
