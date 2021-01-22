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
  Row,
  FormGroup
} from "reactstrap";
import { Close, Message, SearchOutlined } from "@material-ui/icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import api from "~/services/api";
import { store } from "~/store";
import { normalizeHrToMin } from "~/normalize";

/* eslint-disable eqeqeq */
export default class HorasTable extends Component {
  state = {
    data: [],
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

  delay = ms => new Promise(res => setTimeout(res, ms));

  reloadData = async () => {
    await this.delay(100);
    this.loadData();
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
          cod: horas.Oportunidade.cod,
          desc: horas.Oportunidade.desc,
          horaInic: horas.horaInic,
          horaIntrv: horas.horaIntrv,
          horaFim: horas.horaFim,
          dataAtivd: horas.dataAtivd,
          TotalApont: normalizeHrToMin(horas.totalApont),
          Cliente: horas.Oportunidade.Cliente.nomeAbv,

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
              <p>Você quer mesmo deletar esse registro ?</p>
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
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Row>
                    <Col md="2">
                      <h4>Horas</h4>
                    </Col>
                    <Col md="4">
                      <FormGroup inline>
                        <Label> Data Inicial</Label>
                        <Input
                          name="dataAtivd"
                          type="date"
                          defaultValue={`${year}-${month}-01`}
                          onChange={e =>
                            this.setState({ initialDate: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup inline>
                        <Label> Data Final</Label>
                        <Input
                          name="dataAtivd"
                          type="date"
                          defaultValue={`${year}-${month}-${lastDayMonth}`}
                        />
                      </FormGroup>
                    </Col>
                    <Tooltip title="Filtrar" placement="top" interactive>
                      <Button
                        style={{
                          marginTop: 20
                        }}
                        className={classNames("btn-icon btn-link like")}
                        onClick={() => {
                          this.loadData();
                        }}
                      >
                        <SearchOutlined fontSize="large" />
                      </Button>
                    </Tooltip>
                  </Row>
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
                      accessor: "cod"
                    },
                    {
                      Header: "Oportunidade",
                      accessor: "desc"
                    },
                    {
                      Header: "Cliente",
                      accessor: "Cliente"
                    },
                    {
                      Header: "Data",
                      accessor: "dataAtivd"
                    },
                    {
                      Header: "Total",
                      accessor: "TotalApont"
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
