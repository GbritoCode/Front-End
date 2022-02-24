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

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  DropdownItem
} from "reactstrap";
import { PostAdd } from "@material-ui/icons";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import api from "~/services/api";
import { normalizeCurrencyDb, normalizeDate } from "~/normalize";
import { sortDates } from "~/sortingMethodReactTable";

export default function MovimentoCaixaLiquidTable() {
  document.body.classList.add("white-content");

  const [data, setData] = useState([]);

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
      const responseMapped = response.data.map((mov, key) => {
        return {
          idd: key,
          id: mov.id,
          RecDespDesc: mov.RecDesp.desc,
          recDesp: checkSituacao(mov.RecDesp.recDesp),
          valor: normalizeCurrencyDb(mov.valor),
          valorDB: mov.valor,
          saldo: mov.saldo,
          colabPgmto: mov.ColabPgmt
            ? mov.ColabPgmt.nome
            : mov.Parcela
            ? mov.Parcela.Oportunidade.cod
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
    };
    loadData();
  }, []);

  return (
    <>
      <div className="content">
        <Col xs={12} md={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Movimento Caixa Liquidado</CardTitle>
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
                    sortMethod: sortDates()
                  },
                  {
                    Header: "Data Vencimento",
                    accessor: "dtVenc",
                    sortMethod: sortDates()
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
