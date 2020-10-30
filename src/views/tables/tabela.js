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

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";

import api from "~/services/api";

import { Redirect, Link } from "react-router-dom";

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
    const response = await api.get("/cliente");

    this.setState({
      data: response.data.map((client, key) => {
        return {
          CNPJ: key,
          nomeAbv: client.nomeAbv,
          REPRESENTANTE: client.REPRESENTANTE,
          TIPO_COMISS: client.TIPO_COMISS,
          CODIGO_EMP: client.CODIGO_EMP,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}
              <Button
                onClick={() => {
                  let obj = aux.find((o) => o.id === key);
                  alert(
                    "You've clicked LIKE button on \n{ \nName: " +
                      obj.nomeAbv +
                      ", \nemail: " +
                      obj.REPRESENTANTE +
                      ", \nidade: " +
                      obj.TIPO_COMISS +
                      ", \nsalario: " +
                      obj.CODIGO_EMP +
                      "\n}."
                  );
                }}
                color="info"
                size="sm"
                className={classNames("btn-icon btn-link like")}
              >
                <i className="tim-icons icon-heart-2" />
              </Button>{" "}
              {/* use this button to add a edit kind of action */}
              <Button
                onClick={() => {
                  let obj = this.state.data.find((o) => o.id === key);
                  alert(
                    "You've clicked EDIT button on \n{ \nName: " +
                      obj.nomeAbv +
                      ", \nemail: " +
                      obj.REPRESENTANTE +
                      ", \nidade: " +
                      obj.TIPO_COMISS +
                      ", \nsalario: " +
                      obj.CODIGO_EMP +
                      "\n}."
                  );
                }}
                color="warning"
                size="sm"
                className={classNames("btn-icon btn-link like")}
              >
                <i className="tim-icons icon-pencil" />
              </Button>{" "}
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
                      Header: "Name",
                      accessor: "nomeAbv",
                    },
                    {
                      Header: "Email",
                      accessor: "REPRESENTANTE",
                    },
                    {
                      Header: "Idade",
                      accessor: "TIPO_COMISS",
                    },
                    {
                      Header: "Salário",
                      accessor: "CODIGO_EMP",
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
