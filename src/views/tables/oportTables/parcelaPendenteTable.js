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
import React, { useEffect, useState } from "react";
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
  Label,
  Input,
  FormGroup
} from "reactstrap";
import { Close, Message } from "@material-ui/icons";
import { toast } from "react-toastify";

import { Tooltip } from "@material-ui/core";
import api from "~/services/api";
import history from "~/services/history";
import {
  normalizeCurrency,
  normalizeCurrencyDb,
  normalizeCurrencyInput
} from "~/normalize";

export default function ParcelaPendentesTable() {
  document.body.classList.add("white-content");

  const [data, setData] = useState([]);
  const [modalDtLiqui, setModalDtLiqui] = useState(false);

  const [date, month, year] = new Date().toLocaleDateString("pt-BR").split("/");

  const stateSchema = {
    movs: [],
    mov: {},
    dtLiqui: `${year}-${month}-${date}`,
    vlrSingle: 0,
    hidden: true,
    ColabId: 0,
    saldo: 0,
    error: "",
    message: ""
  };
  const [values, setValues] = useState(stateSchema);

  const toggleModalDtLiqui = () => {
    setModalDtLiqui(!modalDtLiqui);
  };

  const checkSituacao = parcela => {
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

  useEffect(() => {
    const loadData = async () => {
      const response = await api.get(`/parcela/?listAll=true&tipo=atrasadas`);

      setData(
        response.data.map((parcela, key) => {
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
            situacao: checkSituacao(parcela.situacao),
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
                      setModalDtLiqui(true);
                      setValues(prevState => ({
                        ...prevState,
                        hidden: false,
                        vlrSingle: normalizeCurrencyDb(
                          parcela.MovimentoCaixa.saldo
                        ),
                        saldo: normalizeCurrencyDb(
                          parcela.MovimentoCaixa.saldo
                        ),
                        movs: [],
                        error: "",
                        message: "",
                        mov: {
                          id: parcela.MovimentoCaixa.id,
                          saldo: parcela.MovimentoCaixa.saldo,
                          recDesp: parcela.MovimentoCaixa.RecDesp.recDesp,
                          total: parcela.MovimentoCaixa.valor,
                          ParcelaId: parcela.id
                        }
                      }));
                    }}
                  >
                    <i className="tim-icons icon-coins" />
                  </Button>
                </Tooltip>
                <Button
                  color="default"
                  size="sm"
                  className={classNames("btn-icon btn-link like")}
                  onClick={() => {
                    history.push(`/update/oportunidade/parc/${parcela.id}`);
                  }}
                >
                  <i className="tim-icons icon-zoom-split" />
                </Button>
              </div>
            )
          };
        })
      );
    };
    loadData();
  }, []);

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
                    console.log("ok");
                    if (
                      parseInt(value.replace(/[^\d]+/g, ""), 10) / 100 >
                      parseInt(values.saldo.replace(/[^\d]+/g, ""), 10) / 100
                    ) {
                      setValues(prevState => ({
                        ...prevState,
                        error: "has-danger",
                        message: `O valor não pode ser maior que o saldo ${values.saldo}`
                      }));
                      return;
                    }
                    setValues(prevState => ({
                      ...prevState,
                      vlrSingle: normalizeCurrencyInput(value),
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
                await api
                  .put(`/movCaixa_liquid/`, {
                    mov: values.mov,
                    dtLiqui: values.dtLiqui,
                    ColabId: values.ColabId,
                    saldo: values.saldo,
                    vlrSingle:
                      parseInt(values.vlrSingle.replace(/[^\d]+/g, ""), 10) /
                      100,
                    multiple: false
                  })
                  .then(res => {
                    toast.success(res.data.message);
                    history.go(0);
                  })
                  .catch(err => {
                    toast.error(err.response.data.error);
                  });
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
                Parcelas Pendentes
                <Tooltip title="Voltar">
                  <Button
                    onClick={() => history.goBack()}
                    style={{
                      float: "right"
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <span className="material-icons">logout</span>{" "}
                  </Button>
                </Tooltip>
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
                    Header: "Cliente",
                    accessor: "Cliente"
                  },
                  {
                    Header: "Código",
                    accessor: "OportunidadeCod"
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
                    Header: "Valor Parcela",
                    accessor: "vlrParcela"
                  },
                  {
                    Header: "Inclusão",
                    accessor: "createdAt"
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
