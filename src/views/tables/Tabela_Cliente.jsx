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

import { Link } from "react-router-dom";

class Tabela_Cliente extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.loadCliente();
  }
  loadCliente = async () => {
    const response = await api.get("/cliente");
    this.setState({
      data: response.data.map((client, key) => {
        return {
          idd: key,
          id: client.id,
          CNPJ: client.CNPJ,
          nome_abv: client.nome_abv,
          representante: client.representante,
          tipo_comiss: client.tipo_comiss,
          EmpresaId: client.EmpresaId,
          prospect: client.prospect,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}
              <Link
                to={`/cliente_update/${client.id}/false`}
                color="warning"
                size="sm"
                eclassNam={classNames("btn-icon btn-link like")}
              >
                <i className="tim-icons icon-pencil" />
              </Link>{" "}
              {/* use this button to add a edit kind of action */}
              <Link
                to={`/cliente_update/${client.id}/true`}
                color="warning"
                size="sm"
                eclassNam={classNames("btn-icon btn-link like")}
              >
                <i className="tim-icons icon-pencil" />
              </Link>{" "}
              {/* use this button to remove the data row */}
              <Button
                onClick={() => {
                  var data = this.state.data;
                  data.find((o, i) => {
                    if (o.idd === key) {
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
    console.log(this.state.data);
  };
  render() {
    return (
      <>
        <div className="content">
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Clientes Cadastrados
                  <Link to="/cliente_cadastro">
                    <Button
                      style={{ float: "right" }}
                      color="info"
                      size="md"
                      className="text-center"
                    >
                      Adicionar cliente
                    </Button>
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
                      Header: "CNPJ",
                      accessor: "CNPJ",
                    },
                    {
                      Header: "Nome Abreviado",
                      accessor: "nome_abv",
                    },
                    {
                      Header: "Representante",
                      accessor: "representante",
                    },
                    {
                      Header: "Tipo de comissão",
                      accessor: "tipo_comiss",
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

export default Tabela_Cliente;
