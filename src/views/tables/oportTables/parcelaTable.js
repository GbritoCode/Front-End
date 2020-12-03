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

import { Card, CardBody, CardHeader, CardTitle, Col, Button } from "reactstrap";

import api from "~/services/api";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { ArrowBackIos, AttachMoney, Receipt } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

class ParametrosTable extends Component {
=======
import { normalizeCurrency } from 'normalize'
import { Link } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

<<<<<<< HEAD:src/views/tables/auxTables/condPgmtoTable.js
class condPgmtoTable extends Component {
=======
class ParametrosTable extends Component {
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58:src/views/tables/oportTables/parcelaTable.js
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58
  state = {
    data: [],
  };
  componentDidMount() {
    //--------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.loadClients();
  }
  loadClients = async () => {
<<<<<<< HEAD
    const id = this.props.match.params.id;
    const response = await api.get(`/parcela/${id}`);
=======
<<<<<<< HEAD:src/views/tables/auxTables/condPgmtoTable.js
    const response = await api.get("/condPgmto");
=======
    const id = this.props.match.params.id;
    const response = await api.get(`/parcela/${id}`);
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58:src/views/tables/oportTables/parcelaTable.js
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58
    this.setState({
      data: response.data.map((parcela, key) => {
        return {
          id: key,
<<<<<<< HEAD
=======
<<<<<<< HEAD:src/views/tables/auxTables/condPgmtoTable.js
          idd: client.id,
          Empresa: client.Empresa.nome,
          desc: client.desc,
          diasPrazo: client.diasPrazo,
=======
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58
          idd: parcela.id,
          oportunidadeId: parcela.oportunidadeId,
          parcela: parcela.parcela,
          vlrParcela: parcela.vlrParcela,
          dtEmissao: parcela.dtEmissao,
          dtVencimento: parcela.dtVencimento,
          notaFiscal: parcela.notaFiscal,
          pedidoCliente: parcela.pedidoCliente,
          situacao: parcela.situacao,
          vlrPago: parcela.vlrPago,
          saldo: parcela.saldo,
<<<<<<< HEAD
=======
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58:src/views/tables/oportTables/parcelaTable.js
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
<<<<<<< HEAD
              <Link to={`/update/oportunidade/parcNota/${parcela.id}`}>
=======
<<<<<<< HEAD:src/views/tables/auxTables/condPgmtoTable.js
              <Link to={`/update/aux/condPgmto/${client.id}`}>
=======
              <Link to={`/update/oportunidade/parcela/${parcela.id}`}>
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58:src/views/tables/oportTables/parcelaTable.js
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58
                <Button
                  color="default"
                  size="sm"
                  className={classNames("btn-icon btn-link like")}
                >
<<<<<<< HEAD
                  <Receipt/>
                </Button>
              </Link>
              <Link to={`/update/oportunidade/parc/${parcela.id}`}>
                <Button
                  color="default"
                  size="sm"
                  className={classNames("btn-icon btn-link like")}
                >
                  <AttachMoney/>
                </Button>
              </Link>
              
=======
                  <i className="tim-icons icon-pencil" />
                </Button>
              </Link>{" "}
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58
              {/* use this button to remove the data row */}
              <Button
                onClick={() => {
                  var data = this.state.data;
                  data.find((o, i) => {
                    if (o.id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      data.splice(i, 1);
                      console.log(data);
                      return true;
                    }
                    return false;
                  });
                  this.setState({ data: data });
                }}
                color="danger"
                size="sm"
                className={classNames("btn-icon btn-link like")}
              >
                <i className="tim-icons icon-simple-remove" />
              </Button>{" "}
            </div>
          ),
        };
      }),
    });
  };

  render() {
    const id = this.props.match.params.id;
    return (
      <>
        <div className="content">
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
<<<<<<< HEAD
                  Parcelas
                  <Link to={`/cadastro/oportunidade/parcela/${id}`}>
                  <Tooltip title="Novo" placement="top" interactive>
                      <Button
                        style={{
                          float: "right",
=======
<<<<<<< HEAD:src/views/tables/auxTables/condPgmtoTable.js
                  Condições de Pagamento
                  <Link to="/cadastro/aux/condPgmto">
                    <Tooltip title="Novo" placement="top" interactive>
                      <Button
                        style={{
                          float: "right",
=======
                  Parcelas
                  <Link to={`/cadastro/oportunidade/parcela/${id}`}>
                    <Button
                      style={{
                        float: "right",
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}
                      color="info"
                      size="small"
                      className="text-left"
                    >
                      <i
                        className="tim-icons icon-simple-add"
                        style={{
                          paddingBottom: 4,
                          paddingRight: 5,
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58:src/views/tables/oportTables/parcelaTable.js
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58
                        }}
                        className={classNames("btn-icon btn-link like")}
                      >
                        <AddIcon fontSize="large" />
                      </Button>
                    </Tooltip>
                  </Link>
                  <Link to={`/tabelas/oportunidade/oport`}>
<<<<<<< HEAD
                  <Tooltip title="Voltar">
                    <Button
                        style={{
                          float: "right",
                        }}
                        className={classNames("btn-icon btn-link like")}
                      >
                        <ArrowBackIos  />
                    </Button>
                    </Tooltip>
=======
                    <Button
                      style={{
                        float: "right",
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}
                      color="secundary"
                      size="small"
                      className="text-left"
                    >
                      <i
                        className="tim-icons icon-double-left"
                        style={{
                          paddingBottom: 4,
                          paddingRight: 5,
                        }}
                        size="large"
                      />{" "}
                      Voltar
                    </Button>
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={this.state.data}
                  filterable
                  resizable={false}
                  columns={[
                    {
<<<<<<< HEAD
=======
<<<<<<< HEAD:src/views/tables/auxTables/condPgmtoTable.js
                      Header: "Empresa",
                      accessor: "Empresa",
                    },
                    {
                      Header: "dias de prazo",
                      accessor: "diasPrazo",
                    },
                    {
                      Header: "Descrição",
                      accessor: "desc",
=======
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58
                      Header: "Tipo de Cobrança",
                      accessor: "parcela",
                    },
                    {
                      Header: "horas previstas",
                      accessor: "vlrParcela",
                    },
                    {
                      Header: "Valor da proposta",
                      accessor: "notaFiscal",
                    },
                    {
                      Header: "Valor do desconto",
                      accessor: "dtEmissao",
<<<<<<< HEAD
=======
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58:src/views/tables/oportTables/parcelaTable.js
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58
                    },
                    {
                      Header: "Ações",
                      accessor: "actions",
                      sortable: false,
                      filterable: false,
                    },
                  ]}
                  defaultPageSize={10}
                  showPagination={true}
                  showPageJump={true}
                  showPaginationBottom={true}
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

<<<<<<< HEAD
export default ParametrosTable;
=======
<<<<<<< HEAD:src/views/tables/auxTables/condPgmtoTable.js
export default condPgmtoTable;
=======
export default ParametrosTable;
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58:src/views/tables/oportTables/parcelaTable.js
>>>>>>> 8dedeee1c463de829a994544aa5125e99b4fae58
