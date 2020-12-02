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

import { normalizeCnpj } from "normalize";
import { Link } from "react-router-dom";
import axios from "axios"
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

class Tabela_Cliente extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    //--------- colocando no modo claro do template
    document.body.classList.add("white-content");
    this.loadCliente();
  }

  loadCliente = async () => {
    const response = await api.get("/cliente/?prospect=false");

    this.setState({
      data: response.data.map((client, key) => {
        return {
          idd: key,
          id: client.id,
          CNPJ: normalizeCnpj(client.CNPJ),
          nomeAbv: client.nomeAbv,
          RepresentanteId: client.RepresentanteId,
          Representante: client.Representante.nome,
          TipoComisseId: client.TipoComisseId,
          TipoComiss: client.tipoComisse.desc,
          EmpresaId: client.EmpresaId,
          prospect: client.prospect,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}

              {/* use this button to add a edit kind of action */}
              <Link to={`/cliente_update/${client.id}/true`}>
                <Button
                  color="default"
                  size="sm"
                  className={classNames("btn-icon btn-link like")}
                >
                  <i className="tim-icons icon-pencil" />
                </Button>
              </Link>
              {/* use this button to remove the data row */}
              <Button
                onClick={() => {
                  var data = this.state.data;
                  data.find((o, i) => {
                    if (o.idd === key) {
                      console.log(o.id)
                      axios.delete(`http://localhost:51314/cliente/${o.id}`);
                      data.splice(i, 1);

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
                  Clientes
                  <Link to={`/cliente_cadastro/false`}>
                    <Tooltip title="novo" placement="top" interactive>
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
                      accessor: "nomeAbv",
                    },
                    {
                      Header: "Representante",
                      accessor: "Representante",
                    },
                    {
                      Header: "Tipo de comissão",
                      accessor: "TipoComiss",
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
