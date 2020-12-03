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
import { normalizeCurrency } from 'normalize'
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';

class ParametrosTable extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    //--------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.loadClients();
  }
  loadClients = async () => {
    const id = this.props.match.params.id;
    const response = await api.get(`/cotacao/${id}`);
    this.setState({
      data: response.data.map((cotacao, key) => {
        return {
          id: key,
          idd: cotacao.id,
          EmpresaId: cotacao.EmpresaId,
          oportunidadeId: cotacao.oportunidadeId,
          probVend: cotacao.probVend,
          tipoCobranca: cotacao.tipoCobranca,
          hrsPrevst: cotacao.hrsPrevst,
          vlrProp: normalizeCurrency(JSON.stringify(cotacao.vlrProp)),
          vlrDesc: normalizeCurrency(JSON.stringify(cotacao.vlrDesc)),
          vlrLiq: normalizeCurrency(JSON.stringify(cotacao.vlrLiq)),
          recLiq: normalizeCurrency(JSON.stringify(cotacao.recLiq)),
          prevLucro: normalizeCurrency(JSON.stringify(cotacao.prevLucro)),
          numParcelas: cotacao.numParcelas,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Link to={`/update/oportunidade/cotacao/${cotacao.id}`}>
                <Button
                  color="default"
                  size="sm"
                  className={classNames("btn-icon btn-link like")}
                >
                  <i className="tim-icons icon-pencil" />
                </Button>
              </Link>{" "}
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
    console.log(this.state.data)
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
                  Cotações
                  <Link to={`/cadastro/oportunidade/cotacao/${id}`}>
                  <Tooltip title="Novo" placement="top" interactive>
                      <Button
                        style={{
                          float: "right",
                        }}
                        className={classNames("btn-icon btn-link like")}
                      >
                        <AddIcon fontSize="large" />
                      </Button>
                    </Tooltip>
                  </Link>
                  <Link to={`/tabelas/oportunidade/oport`}>
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
                      Header: "Tipo de Cobrança",
                      accessor: "tipoCobranca",
                    },
                    {
                      Header: "horas previstas",
                      accessor: "hrsPrevst",
                    },
                    {
                      Header: "Valor da proposta",
                      accessor: "vlrProp",
                    },
                    {
                      Header: "Valor do desconto",
                      accessor: "vlrDesc",
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

export default ParametrosTable;
