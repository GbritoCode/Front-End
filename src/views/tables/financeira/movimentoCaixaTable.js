/* eslint-disable no-nested-ternary */
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
import React, { useEffect, useRef, useState } from "react";
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
  DropdownItem,
  Label,
  Input,
  FormGroup,
  Row
} from "reactstrap";
import {
  Check,
  Close,
  DoneAll,
  Message,
  PostAdd,
  Receipt
} from "@material-ui/icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { Tooltip } from "@material-ui/core";
import api from "~/services/api";
import {
  normalizeCurrencyInput,
  normalizeCurrencyDb,
  normalizeDate
} from "~/normalize";
import { sortDates, sortValues_MovCaixa } from "~/sortingMethodReactTable";
import { Footer, Header } from "~/components/Modal/modalStyles";
import ModalLarge from "~/components/Modal/modalLarge";
import history from "~/services/history";
import { store } from "~/store";

export default function MovimentoCaixaTable() {
  document.body.classList.add("white-content");

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [excluding, setExcluding] = useState([]);
  const [modalMini, setModalMini] = useState(false);
  const [modalDtLiqui, setModalDtLiqui] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [defaultFilteredData, setDefaultFilteredData] = useState([]);
  const [date, month, year] = new Date().toLocaleDateString("pt-BR").split("/");

  const stateSchema = {
    movs: [],
    mov: {},
    dtLiqui: `${year}-${month}-${date}`,
    vlrSingle: 0,
    hidden: true,
    multiple: false,
    ColabId: 0,
    saldo: 0,
    error: "",
    message: ""
  };

  const detailSchema = {
    recDespDesc: { value: "" },
    recDesp: { value: "" },
    colabCreate: { value: "" },
    solicitante: { value: "" },
    valor: { value: "" },
    saldo: { value: "" },
    dtVenc: { value: "" },
    status: { value: "" },
    desc: { value: "" },
    relacionamento: { value: "" }
  };

  const [detailsValues, setDetailsValues] = useState(detailSchema);
  const [values, setValues] = useState(stateSchema);

  let reactTable = useRef(null);

  const toggleModalMini = () => {
    setModalMini(!modalMini);
  };
  const toggleModalDtLiqui = () => {
    setModalDtLiqui(!modalDtLiqui);
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const reloadData = async () => {
    await delay(500);
  };

  const checkStatus = sit => {
    switch (sit) {
      case 1:
        return "Aberto";
      case 2:
        return "Parcial";
      case 3:
        return "Liquidado";
      default:
        break;
    }
  };
  const checkSituacao = (recDesp, value) => {
    switch (recDesp) {
      case "Desp":
        return (
          <>
            <p style={{ float: "right" }}>{value}</p>
            <div
              className="arrowDown"
              style={{
                float: "left",
                width: 0,
                height: 0,
                borderLeft: "7.5px solid transparent",
                borderRight: "7.5px solid transparent",
                borderTop: "7.5px solid red",
                marginLeft: "20%",
                marginTop: "5%"
                // marginLeft: "40%"
              }}
            />
          </>
        );
      case "Rec":
        return (
          <>
            <p style={{ float: "right" }}>{value}</p>
            <div
              className="arrowUp"
              style={{
                float: "left",
                width: 0,
                height: 0,
                borderLeft: "7.5px solid transparent",
                borderRight: "7.5px solid transparent",
                borderBottom: "7.5px solid green",
                marginLeft: "20%",
                marginTop: "5%"
                // marginLeft: "40%"
              }}
            />
          </>
        );

      default:
    }
  };
  useEffect(() => {
    const { id } = store.getState().auth.user.Colab;
    setValues(prevState => ({
      ...prevState,
      ColabId: id
    }));
    const loadData = async () => {
      const response = await api.get("/movCaixa/table_aberto");
      const responseMapped = response.data.map((mov, key) => {
        return {
          idd: key,
          id: mov.id,
          RecDespDesc: mov.RecDesp.desc,
          recDesp: checkSituacao(mov.RecDesp.recDesp),
          valor: checkSituacao(
            mov.RecDesp.recDesp,
            normalizeCurrencyDb(mov.valor)
          ),
          valorDB: mov.valor,
          saldo: mov.saldo,
          colabPgmto: mov.ColabPgmt
            ? mov.ColabPgmt.nome
            : mov.Parcela
            ? mov.Parcela.Oportunidade.cod
            : mov.referencia
            ? mov.referencia
            : "--",
          ColabCreate: mov.ColabCreated.nome,
          ColabLiqui: mov.ColabLiquid ? mov.ColabLiquid.nome : "--",
          Fornec: mov.Fornec ? mov.Fornec.nomeConta : "--",
          Cliente: mov.Cliente ? mov.Cliente.nomeAbv : "--",
          Solicitante: mov.Cliente ? mov.Cliente.nomeAbv : mov.Fornec.nomeConta,
          dtVenc: normalizeDate(mov.dtVenc),
          dtLiqui: mov.dtLiqui ? normalizeDate(mov.dtLiqui) : "--",
          status: checkStatus(mov.status),
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              <Tooltip title="Visualizar">
                <Button
                  color="default"
                  size="sm"
                  className={classNames("btn-icon btn-link like")}
                  onClick={() => {
                    setIsOpenDetail(true);
                    setDetailsValues({
                      recDespDesc: mov.RecDesp.desc,
                      recDesp: mov.RecDesp.recDesp,
                      colabCreate: mov.ColabCreated.nome,
                      solicitante: mov.Cliente
                        ? mov.Cliente.rzSoc
                        : mov.Fornec.nome,
                      valor: normalizeCurrencyDb(mov.valor),
                      saldo: normalizeCurrencyDb(mov.saldo),
                      dtVenc: normalizeDate(mov.dtVenc),
                      status: checkStatus(mov.status),
                      desc: mov.desc ? mov.desc : "--",
                      referencia: mov.ColabPgmt
                        ? mov.ColabPgmt.nome
                        : mov.Parcela
                        ? mov.Parcela.Oportunidade.cod
                        : mov.referencia
                        ? mov.referencia
                        : "--"
                    });
                  }}
                >
                  <i className="tim-icons icon-zoom-split" />
                </Button>
              </Tooltip>
              <Button
                disabled={mov.status >= 3}
                color="default"
                size="sm"
                className={classNames("btn-icon btn-link like")}
                onClick={() => {
                  setModalDtLiqui(true);
                  setValues(prevState => ({
                    ...prevState,
                    hidden: false,
                    vlrSingle: normalizeCurrencyDb(mov.saldo),
                    saldo: normalizeCurrencyDb(mov.saldo),
                    multiple: false,
                    movs: [],
                    error: "",
                    message: "",
                    mov: {
                      id: mov.id,
                      saldo: mov.saldo,
                      recDesp: mov.RecDesp.recDesp,
                      total: mov.valor,
                      ParcelaId: mov.ParcelaId
                    }
                  }));
                }}
              >
                <i className="tim-icons icon-coins" />
              </Button>
              {/* use this button to remove the data row */}
              <Button
                onClick={() => {
                  setExcluding(mov.id);
                  setModalMini(true);
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
      });
      const responseFiltered = response.data
        .filter(arr => arr.status < 3)
        .map((mov, key) => {
          return {
            idd: key,
            id: mov.id,
            RecDespDesc: mov.RecDesp.desc,
            recDespDB: mov.RecDesp.recDesp,
            valor: normalizeCurrencyDb(mov.valor),
            valorDB: mov.valor,
            saldo: mov.saldo,
            colabPgmto: mov.ColabPgmt ? mov.ColabPgmt.nome : "--",
            ColabCreate: mov.ColabCreated.nome,
            ColabLiqui: mov.ColabLiquid ? mov.ColabLiquid.nome : "--",
            Fornec: mov.Fornec ? mov.Fornec.nomeConta : "--",
            Cliente: mov.Cliente ? mov.Cliente.nomeAbv : "--",
            Solicitante: mov.Cliente
              ? mov.Cliente.nomeAbv
              : mov.Fornec.nomeConta,
            dtVenc: normalizeDate(mov.dtVenc),
            dtLiqui: mov.dtLiqui ? normalizeDate(mov.dtLiqui) : "--",
            status: checkStatus(mov.status)
          };
        });

      setData(responseMapped);
      setData2(responseFiltered);
      setDefaultFilteredData(responseFiltered);
      setFilteredData({ data: responseFiltered, default: true });
    };
    loadData();
  }, [modalMini]);

  console.log(checkSituacao("Desp", 120).props);

  return (
    <>
      <div className="content">
        <Modal
          modalClassName="modal-mini "
          isOpen={modalDtLiqui}
          toggle={toggleModalDtLiqui}
        >
          <div className="modal-header justify-content-center">
            <button
              aria-hidden
              className="close"
              data-dismiss="modal"
              type="button"
              color="primary"
              onClick={toggleModalDtLiqui}
            >
              <Close />
            </button>
            <div>
              <Message fontSize="large" />
            </div>
          </div>
          <ModalBody className="text-center">
            <p> Preencha os dados </p>
            <Label style={{ float: "left" }}>Data Liquidação</Label>
            <Input
              name="dtLiqui"
              type="date"
              value={values.dtLiqui}
              onChange={e => {
                var { value } = e.target;
                setValues(prevState => ({
                  ...prevState,
                  dtLiqui: value
                }));
              }}
            />
            <Label
              hidden={values.hidden}
              id="labelVlrSingle"
              style={{ float: "left" }}
            >
              Valor a pagar
            </Label>
            <FormGroup className={`has-label ${values.error}`}>
              <Input
                hidden={values.hidden}
                id="vlrPagarSingle"
                name="vlrPagarSingle"
                type="text"
                value={values.vlrSingle}
                onChange={e => {
                  var { value } = e.target;
                  if (typeof parseInt(value, 10) === "number") {
                    if (
                      parseInt(value.replace(/[^\d]+/g, ""), 10) / 100 >
                      parseInt(values.saldo.replace(/[^\d]+/g, ""), 10) / 100
                    ) {
                      setValues(prevState => ({
                        ...prevState,
                        // vlrSingle: normalizeCurrencyInput(value),
                        multiple: false,
                        error: "has-danger",
                        message: `O valor não pode ser maior que o saldo ${values.saldo}`
                      }));
                      return;
                    }
                    setValues(prevState => ({
                      ...prevState,
                      vlrSingle: normalizeCurrencyInput(value),
                      multiple: false,
                      error: "",
                      message: ""
                    }));
                  }
                }}
              />{" "}
              {values.error === "has-danger" ? (
                <Label className="error">{values.message}</Label>
              ) : null}
            </FormGroup>
          </ModalBody>
          <div className="modal-footer">
            <Button
              style={{ color: "#000" }}
              className="btn-neutral"
              type="button"
              onClick={toggleModalDtLiqui}
            >
              Não
            </Button>
            <Button
              style={{ color: "#7E7E7E" }}
              className="btn-neutral"
              type="button"
              onClick={async () => {
                if (values.multiple) {
                  await api
                    .put(`/movCaixa_liquid/`, {
                      movs: values.movs,
                      dtLiqui: values.dtLiqui,
                      ColabId: values.ColabId,
                      multiple: values.multiple
                    })
                    .then(res => {
                      toast.success(res.data.message);
                      history.go(0);
                    })
                    .catch(err => {
                      toast.error(err.response.data.error);
                    });
                } else if (!values.multiple) {
                  await api
                    .put(`/movCaixa_liquid/`, {
                      mov: values.mov,
                      dtLiqui: values.dtLiqui,
                      ColabId: values.ColabId,
                      saldo: values.saldo,
                      vlrSingle:
                        parseInt(values.vlrSingle.replace(/[^\d]+/g, ""), 10) /
                        100,
                      multiple: values.multiple
                    })
                    .then(res => {
                      toast.success(res.data.message);
                      history.go(0);
                    })
                    .catch(err => {
                      toast.error(err.response.data.error);
                    });
                }
              }}
            >
              Sim
            </Button>
          </div>
        </Modal>

        {/*
  --------------------------------------------
  --------------------------------------------
  --------------------------------------------
  --------------------------------------------
  --------------------------------------------
    */}

        <ModalLarge
          onClose={() => {
            setIsOpen(false);
          }}
          open={isOpen}
        >
          <Header>
            {" "}
            <Tooltip title="Fechar">
              <Button
                style={{
                  float: "right"
                }}
                onClick={() => {
                  setIsOpen(false);
                  setFilteredData({
                    data: defaultFilteredData,
                    default: true
                  });
                }}
                className={classNames("btn-icon btn-link like")}
              >
                <Close fontSize="large" />
              </Button>
            </Tooltip>
            <Tooltip title="Enviar">
              <Button
                style={{
                  float: "right"
                }}
                onClick={async () => {
                  setModalDtLiqui(true);
                  setValues(prevState => ({
                    ...prevState,
                    hidden: true,
                    vlrSingle: 0,
                    multiple: true
                  }));
                }}
                className={classNames("btn-icon btn-link like")}
              >
                <Check fontSize="large" />
              </Button>
            </Tooltip>
            <Tooltip title="Selecionar Todos" placement="top" interactive>
              <Button
                style={{
                  float: "right"
                }}
                onClick={() => {
                  for (let i = 0; i < filteredData.data.length; i += 1) {
                    setValues(prevState => ({
                      ...prevState,
                      movs: [
                        ...prevState.movs,
                        {
                          id: filteredData.data[i].id,
                          saldo: filteredData.data[i].saldo,
                          recDesp: filteredData.data[i].recDespDB,
                          total: filteredData.data[i].valorDB
                        }
                      ]
                    }));
                  }
                  setFilteredData({
                    data: defaultFilteredData,
                    default: true
                  });
                }}
                className={classNames("btn-icon btn-link like")}
              >
                <DoneAll fontSize="large" />
              </Button>
            </Tooltip>
            <h4 className="modalHeader">Liquidar</h4>
          </Header>

          <ReactTable
            ref={r => (reactTable = r)}
            onFilteredChange={() => {
              setFilteredData({
                data: reactTable.getResolvedState().sortedData,
                default: false
              });
            }}
            data={data2}
            getTdProps={(state, rowInfo) => {
              return {
                onClick: () => {
                  if (rowInfo !== undefined) {
                    rowInfo.original.clicado = true;
                    // eslint-disable-next-line no-unused-expressions
                    values.movs.findIndex(
                      arr => arr.id === rowInfo.original.id
                    ) > -1
                      ? setValues(prevState => ({
                          movs: prevState.movs.filter(
                            arr => arr.id !== rowInfo.original.id
                          )
                        }))
                      : setValues(prevState => ({
                          ...prevState,
                          movs: [
                            ...prevState.movs,
                            {
                              id: rowInfo.original.id,
                              saldo: rowInfo.original.saldo,
                              recDesp: rowInfo.original.recDespDB,
                              total: rowInfo.original.valorDB
                            }
                          ]
                        }));
                  }
                },
                style: {
                  background:
                    values.movs.findIndex(
                      arr =>
                        arr.id ===
                        (rowInfo === undefined ? -1 : rowInfo.original.id)
                    ) > -1
                      ? "#ccffcc"
                      : null
                }
              };
            }}
            filterable
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
                Header: "Empresa",
                accessor: "Solicitante"
              },
              {
                Header: "colab",
                accessor: "colabPgmto"
              },
              {
                Header: "Desc",
                accessor: "RecDespDesc"
              },
              {
                Header: "Valor",
                accessor: "valor"
              },
              {
                Header: "data Liquidação",
                accessor: "dtLiqui",
                sortMethod: sortDates
              },
              {
                Header: "Data Vencimento",
                accessor: "dtVenc",
                sortMethod: sortDates
              }
            ]}
            defaultPageSize={6}
            pageSizeOptions={[6, 10, 50, 100]}
            className="-striped -highlight"
          />

          <Footer />
        </ModalLarge>

        {/**
         *
         *
         *
         *
         */}

        <Modal
          modalClassName="modal-mini "
          isOpen={modalMini}
          toggle={toggleModalMini}
        >
          <div className="modal-header justify-content-center">
            <button
              aria-hidden
              className="close"
              data-dismiss="modal"
              type="button"
              color="primary"
              onClick={toggleModalMini}
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
              onClick={toggleModalMini}
            >
              Não
            </Button>
            <Button
              style={{ color: "#7E7E7E" }}
              className="btn-neutral"
              type="button"
              onClick={async () => {
                await api
                  .delete(`movCaixa/${excluding}`)
                  .then(result => {
                    toast.success(result.data);
                    reloadData();
                    setExcluding(undefined);
                  })
                  .catch(err => {
                    toast.error(err.response.data.error);
                  });
                toggleModalMini();
              }}
            >
              Sim
            </Button>
          </div>
        </Modal>

        {/* ---------------------------------
            ---------------------------------
            ---------------------------------
            ---------------------------------
            --------------------------------- */}

        <ModalLarge
          onClose={() => {
            setIsOpenDetail(!isOpenDetail);
          }}
          open={isOpenDetail}
        >
          <Header>
            {" "}
            <Tooltip title="Fechar">
              <Button
                style={{
                  float: "right"
                }}
                onClick={() => {
                  setIsOpenDetail(false);
                }}
                className={classNames("btn-icon btn-link like")}
              >
                <Close fontSize="large" />
              </Button>
            </Tooltip>{" "}
            <h4 className="modalHeader">Movimento Detalhes</h4>
          </Header>
          <Row>
            <Col sm="4">
              <Label>Colaborador Criação</Label>
              <FormGroup className="has-label ">
                <Input
                  disabled
                  value={detailsValues.colabCreate}
                  name="colabCreate"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col sm="4">
              <Label>Solicitante</Label>
              <FormGroup className="has-label ">
                <Input
                  disabled
                  name="solicitante"
                  type="text"
                  value={detailsValues.solicitante}
                />
              </FormGroup>
            </Col>
            <Col sm="4">
              <Label>Referência</Label>
              <FormGroup className="has-label ">
                <Input
                  disabled
                  name="referencia"
                  type="text"
                  value={detailsValues.referencia}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <Label>Receita/Despesa</Label>
              <FormGroup className="has-label ">
                <Input
                  disabled
                  name="recDesp"
                  type="text"
                  value={detailsValues.recDesp}
                />
              </FormGroup>
            </Col>
            <Col sm="4">
              <Label>Descrição Receita/Despesa</Label>
              <FormGroup className="has-label ">
                <Input
                  disabled
                  name="recDespDesc"
                  type="text"
                  value={detailsValues.recDespDesc}
                />
              </FormGroup>
            </Col>
            <Col sm="4">
              <Label>Situação</Label>
              <FormGroup className="has-label ">
                <Input
                  disabled
                  name="status"
                  type="text"
                  value={detailsValues.status}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <Label>Valor</Label>
              <FormGroup className="has-label ">
                <Input
                  disabled
                  name="valor"
                  type="text"
                  value={detailsValues.valor}
                />
              </FormGroup>
            </Col>
            <Col sm="4">
              <Label>Saldo</Label>
              <FormGroup className="has-label ">
                <Input
                  disabled
                  name="saldo"
                  type="text"
                  value={detailsValues.saldo}
                />
              </FormGroup>
            </Col>
            <Col sm="4">
              <Label>Data Vencimento</Label>
              <FormGroup className="has-label ">
                <Input
                  disabled
                  name="dtVenc"
                  type="text"
                  value={detailsValues.dtVenc}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Label>Descrição</Label>
              <FormGroup className="has-label">
                <Input
                  disabled
                  name="desc"
                  type="textarea"
                  value={detailsValues.desc}
                />
              </FormGroup>
            </Col>
          </Row>
          <Footer />
        </ModalLarge>

        {/* ---------------------------------
            ---------------------------------
            ---------------------------------
            ---------------------------------
            --------------------------------- */}

        <Col xs={12} md={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                Movimento Caixa
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
                      <Link to="/cadastro/comercial/movCaixa">
                        {" "}
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
                    <NavLink
                      onClick={() => {
                        setIsOpen(true);
                        setValues(prevState => ({
                          ...prevState,
                          hidden: true,
                          vlrSingle: 0,
                          multiple: true,
                          movs: [],
                          mov: {}
                        }));
                      }}
                      tag="li"
                    >
                      {" "}
                      <DropdownItem
                        style={{ paddingLeft: "3%" }}
                        className="nav-item"
                      >
                        <Receipt
                          style={{ float: "left", marginRight: "3%" }}
                          fontSize="small"
                        />
                        <p style={{ paddingTop: "2%" }}>Liquidar Múltiplos</p>
                      </DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={data}
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
                    Header: "Empresa",
                    accessor: "Solicitante",
                    maxWidth: 120
                  },
                  {
                    Header: "Relacionamento",
                    accessor: "colabPgmto"
                  },
                  {
                    Header: "Desc",
                    accessor: "RecDespDesc",
                    minWidth: 130
                  },
                  {
                    Header: "Valor",
                    accessor: "valor",
                    maxWidth: 125,
                    sortMethod: sortValues_MovCaixa
                  },
                  {
                    Header: "data Liquidação",
                    accessor: "dtLiqui",
                    sortMethod: sortDates
                  },
                  {
                    Header: "Data Vencimento",
                    accessor: "dtVenc",
                    sortMethod: sortDates
                  },
                  {
                    Header: "Situação",
                    accessor: "status",
                    maxWidth: 100
                  },
                  {
                    Header: "Ações",
                    accessor: "actions",
                    sortable: false,
                    filterable: false,
                    maxWidth: 80
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
