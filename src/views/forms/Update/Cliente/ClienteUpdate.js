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
import React, { Fragment, useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { ClienteUpdate } from "~/store/modules/Cliente/actions";
import { useParams, Link } from "react-router-dom";
import { useInput } from "hooks.js";
import axios from "axios";

function ClienteUpdatee() {
  const { id } = useParams();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/cliente/${id}`);
      setData(response.data);
      setIsLoading(false);
    }
    loadData();
  }, []);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const { value: CNPJ, bind: bindCNPJ } = useInput();
  const { value: nome_abv, bind: bindNome_abv } = useInput();
  const { value: representante, bind: bindRepresentante } = useInput();
  const { value: tipo_comiss, bind: bindTipo_comiss } = useInput();
  const { value: prospect, bind: bindProspect } = useInput();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      ClienteUpdate(CNPJ, nome_abv, representante, tipo_comiss, prospect)
    );
  };
  return (
    <Fragment>
      {isLoading ? (
        <div></div>
      ) : (
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
                    <Form className="cadastro" onSubmit={handleSubmit}>
                      <label>CNPJ </label>
                      <FormGroup>
                        <Input
                          className="cadastro"
                          name="CNPJ"
                          type="text"
                          defaultValue={data.id}
                          {...bindCNPJ}
                        />
                      </FormGroup>
                      <label>Nome Abreviado</label>
                      <FormGroup>
                        <Input
                          className="cadastro"
                          name="nome_abv"
                          type="text"
                          defaultValue={data.nome_abv}
                          {...bindNome_abv}
                        />
                      </FormGroup>
                      <label>Representante</label>
                      <FormGroup>
                        <Input
                          className="cadastro"
                          name="representante"
                          type="text"
                          defaultValue={data.representante}
                          {...bindRepresentante}
                        />
                      </FormGroup>
                      <label>Tipo de Comissão</label>
                      <FormGroup>
                        <Input
                          className="cadastro"
                          name="tipo_comiss"
                          type="numeric"
                          defaultValue={data.tipo_comiss}
                          {...bindTipo_comiss}
                        />
                      </FormGroup>
                      <label>EmpresaId</label>
                      <FormGroup>
                        <Input
                          disabled={true}
                          className="cadastro"
                          name="EmpresaId"
                          type="numeric"
                          defaultValue={data.EmpresaId}
                        />
                      </FormGroup>

                      <Button
                        style={{ marginTop: 35 }}
                        className="form"
                        color="info"
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
      )}
    </Fragment>
  );
}
export default ClienteUpdatee;
