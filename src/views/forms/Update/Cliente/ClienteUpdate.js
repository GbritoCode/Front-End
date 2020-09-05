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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { ClienteUpdate } from "~/store/modules/Cliente/actions";

import { Form, Input } from "@rocketseat/unform";
import { useParams, Link } from "react-router-dom";

function ClienteUpdatee() {
  const { id } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/cliente/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setData(response);
      });
  }, []);
  const dispatch = useDispatch();

  function handleSubmit({
    id,
    nome_abv,
    representante,
    tipo_comiss,
    prospect,
  }) {
    dispatch(ClienteUpdate(id, nome_abv, representante, tipo_comiss, prospect));
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Atualização de cliente</CardTitle>
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
                <Link to={"/tabelas/cliente/cont/" + id}>
                  <Button
                    style={{ textAlign: "right" }}
                    color="info"
                    size="md"
                    className="text-center"
                  >
                    Contatos do cliente
                  </Button>
                </Link>
                <Link to={"/tabelas/cliente/comp/" + id}>
                  <Button
                    style={{ textAlign: "right" }}
                    color="info"
                    size="md"
                    className="text-center"
                  >
                    Complemento do cliente
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
                <Form
                  className="cadastro"
                  onSubmit={handleSubmit}
                  initialData={data}
                >
                  <label>Cnpj </label>
                  <FormGroup>
                    <Input
                      disabled={true}
                      value={id}
                      className="cadastro"
                      name="id"
                      type="text"
                    />
                  </FormGroup>
                  <label>nome_abv</label>
                  <FormGroup>
                    <Input className="cadastro" name="nome_abv" type="text" />
                  </FormGroup>
                  <label>representante</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="representante"
                      type="text"
                    />
                  </FormGroup>
                  <label>tipo_comiss</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="tipo_comiss"
                      type="numeric"
                      autoComplete="off"
                    />
                  </FormGroup>
                  <label>EmpresaId</label>
                  <FormGroup>
                    <Input
                      disabled={true}
                      className="cadastro"
                      name="EmpresaId"
                      type="numeric"
                    />
                  </FormGroup>
                  {/*
                  <FormGroup className="mt-3">
                    <Label for="options">
                      {" "}
                      propspect
                      <select id="options" name="options">
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                      </select>
                    </Label>
                  </FormGroup>
*/}
                  <Button
                    style={{ marginTop: 35 }}
                    className="form"
                    color="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default ClienteUpdatee;
