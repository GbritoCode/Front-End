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
    //--------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.loadClients();
  }
  loadClients = async () => {
    const response = await api.get("/segmento");
    this.setState({
      data: response.data.map((client, key) => {
        return {
          id: key,
          idd: client.id,
          Empresa: client.Empresa.nome,
          UndNeg: client.UndNeg.descUndNeg,
          Produto: client.Produto.descProdt,
          Area: client.Area.descArea,
          descSegmt: client.descSegmt,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Link to={`/update/general/segmento/${client.id}`}>
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
  };

  render() {
    return (
      <>
        <div className="content">
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Segmento
                  <Link to="/cadastro/geral/sgmet">
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
                        }}
                        size="large"
                      />{" "}
                      Novo
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
                      Header: "Descrição",
                      accessor: "descSegmt",
                    },
                    {
                      Header: "Unidade de Negócio",
                      accessor: "UndNeg",
                    },
                    {
                      Header: "Produto",
                      accessor: "Produto",
                    },
                    {
                      Header: "Área",
                      accessor: "Area",
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
