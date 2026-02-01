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
import React, { useEffect, useState } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table-v6";
import { getDaysInMonth } from "date-fns";
import { CSVLink } from "react-csv";

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

import api from "~/services/api";
import { normalizeCurrencyDb, normalizeDate } from "~/normalize";
import { sortDates } from "~/sortingMethodReactTable";
import iconCsv from "~/assets/img/iconExcel.png";

export default function MovimentoCaixaLiquidTable() {
  document.body.classList.add("white-content");

  const [data, setData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [modalFilter, setModalFilter] = useState(false);

  // Initialize date range to current month
  const [date, month, year] = new Date().toLocaleDateString("pt-BR").split("/");
  const lastDayMonth = getDaysInMonth(new Date(year, month - 1, date));

  // Applied filter dates (used for actual filtering)
  const [initialDate, setInitialDate] = useState(`${year}-${month}-01`);
  const [finalDate, setFinalDate] = useState(`${year}-${month}-${lastDayMonth}`);

  // Pending filter dates (used in modal inputs)
  const [pendingInitialDate, setPendingInitialDate] = useState(`${year}-${month}-01`);
  const [pendingFinalDate, setPendingFinalDate] = useState(`${year}-${month}-${lastDayMonth}`);

  const toggleModalFilter = () => {
    // Reset pending dates to current applied dates when opening modal
    if (!modalFilter) {
      setPendingInitialDate(initialDate);
      setPendingFinalDate(finalDate);
    }
    setModalFilter(!modalFilter);
  };

  const handleFilter = () => {
    setInitialDate(pendingInitialDate);
    setFinalDate(pendingFinalDate);
    setModalFilter(false);
  };

  const csvHeaders = [
    { label: "Empresa", key: "Solicitante" },
    { label: "Relacionamento", key: "colabPgmto" },
    { label: "Descrição", key: "RecDespDesc" },
    { label: "Tipo", key: "recDespType" },
    { label: "Valor", key: "valor" },
    { label: "Data Liquidação", key: "dtLiqui" },
    { label: "Data Vencimento", key: "dtVenc" },
    { label: "Situação", key: "status" }
  ];

  const checkStatus = sit => {
    switch (sit) {
      case 1:
        return "Aberto";
      case 2:
        return "Parcial";
      case 3:
        return "Liquidado";
      case 4:
        return "Estornado";
      default:
        break;
    }
  };
  const checkSituacao = recDesp => {
    switch (recDesp) {
      case "Desp":
        console.log(recDesp);
        return (
          <>
            <div
              className="arrowDown"
              style={{
                width: 0,
                height: 0,
                borderLeft: "7.5px solid transparent",
                borderRight: "7.5px solid transparent",
                borderTop: "7.5px solid red",
                marginLeft: "40%"
              }}
            />
          </>
        );
      case "Rec":
        return (
          <div
            className="arrowUp"
            style={{
              width: 0,
              height: 0,
              borderLeft: "7.5px solid transparent",
              borderRight: "7.5px solid transparent",
              borderBottom: "7.5px solid green",
              marginLeft: "40%"
            }}
          />
        );

      default:
    }
  };
  useEffect(() => {
    const loadData = async () => {
      const response = await api.get("/movCaixa/table_liquid");

      // Filter by date range (using dtLiqui - liquidation date)
      const filteredByDate = response.data.filter(mov => {
        if (!mov.dtLiqui) return false;
        const movDate = new Date(mov.dtLiqui);
        const startDate = new Date(initialDate);
        const endDate = new Date(finalDate);
        return movDate >= startDate && movDate <= endDate;
      });

      const responseMapped = filteredByDate.map((mov, key) => {
        return {
          idd: key,
          id: mov.id,
          RecDespDesc: mov.RecDesp.desc,
          recDesp: checkSituacao(mov.RecDesp.recDesp),
          recDespType: mov.RecDesp.recDesp === "Rec" ? "Receita" : "Despesa",
          valor: normalizeCurrencyDb(mov.valor),
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
          status: checkStatus(mov.status)
        };
      });

      setData(responseMapped);

      // Prepare CSV data (without JSX elements)
      const csvExportData = responseMapped.map(mov => ({
        Solicitante: mov.Solicitante,
        colabPgmto: mov.colabPgmto,
        RecDespDesc: mov.RecDespDesc,
        recDespType: mov.recDespType,
        valor: mov.valor,
        dtLiqui: mov.dtLiqui,
        dtVenc: mov.dtVenc,
        status: mov.status
      }));
      setCsvData(csvExportData);
    };
    loadData();
  }, [initialDate, finalDate]);

  return (
    <>
      <div className="content">
        {/* Date Filter Modal */}
        <Modal
          modalClassName="modal-mini"
          isOpen={modalFilter}
          toggle={toggleModalFilter}
        >
          <div className="modal-header justify-content-center">
            <button
              aria-hidden
              className="close"
              data-dismiss="modal"
              type="button"
              color="primary"
              onClick={toggleModalFilter}
            >
              <Close />
            </button>
            <div>
              <Message fontSize="large" />
            </div>
          </div>
          <ModalBody className="text-center">
            <FormGroup inline>
              <Label>Data Inicial</Label>
              <Input
                name="initialDate"
                type="date"
                value={pendingInitialDate}
                onChange={e => setPendingInitialDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup inline>
              <Label>Data Final</Label>
              <Input
                name="finalDate"
                type="date"
                value={pendingFinalDate}
                onChange={e => setPendingFinalDate(e.target.value)}
              />
            </FormGroup>
          </ModalBody>
          <div className="modal-footer">
            <Button
              style={{ color: "#000" }}
              className="btn-neutral"
              type="button"
              onClick={toggleModalFilter}
            >
              Cancelar
            </Button>
            <Button
              style={{ color: "#7E7E7E" }}
              className="btn-neutral"
              type="button"
              onClick={handleFilter}
            >
              Filtrar
            </Button>
          </div>
        </Modal>

        <Col xs={12} md={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                Movimento Caixa Liquidado
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
                    <NavLink tag="li" onClick={toggleModalFilter}>
                      <DropdownItem
                        style={{ paddingLeft: "3%" }}
                        className="nav-item"
                      >
                        <FilterList
                          style={{ float: "left", marginRight: "3%" }}
                          fontSize="small"
                        />
                        <p style={{ paddingTop: "2%" }}>Filtrar por Data</p>
                      </DropdownItem>
                    </NavLink>
                    <NavLink tag="li">
                      <CSVLink
                        data={csvData}
                        headers={csvHeaders}
                        filename={`MovimentoCaixa_${initialDate}_${finalDate}.csv`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <DropdownItem
                          style={{ paddingLeft: "3%" }}
                          className="nav-item"
                        >
                          <div style={{ float: "left", marginRight: "3%" }}>
                            <img alt="Exportar para CSV" src={iconCsv} />
                          </div>
                          <p style={{ paddingTop: "2%" }}>Exportar CSV</p>
                        </DropdownItem>
                      </CSVLink>
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
                    accessor: "Solicitante"
                  },
                  {
                    Header: "Relacionamento",
                    accessor: "colabPgmto"
                  },
                  {
                    Header: "Desc",
                    accessor: "RecDespDesc"
                  },
                  {
                    Header: "Rec/Desp",
                    accessor: "recDesp"
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
                  },
                  {
                    Header: "Situação",
                    accessor: "status",
                    maxWidth: 100
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
