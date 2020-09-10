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
  Label,
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

  const { value: CNPJ, bind: bindCNPJ } = useInput(undefined, "number");
  const { value: nome_abv, bind: bindNome_abv } = useInput();
  const { value: representante, bind: bindRepresentante } = useInput();
  const { value: tipo_comiss, bind: bindTipo_comiss } = useInput(
    undefined,
    "number"
  );
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
                        Contatos
                      </Button>
                    </Link>
                    <Link to={"/tabelas/cliente/comp/" + id}>
                      <Button
                        style={{ textAlign: "right" }}
                        color="info"
                        size="md"
                        className="text-center"
                      >
                        Complemento
                      </Button>
                    </Link>
                    <Link to={"/tabelas/cliente/rec_desp/" + id}>
                      <Button
                        style={{ textAlign: "right" }}
                        color="info"
                        size="md"
                        className="text-center"
                      >
                        Receita/Despesa
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardBody>
                    <Form className="cadastro" onSubmit={handleSubmit}>
                      <Label>Empresa</Label>
                      <FormGroup>
                        <Input
                          disabled={true}
                          name="EmpresaId"
                          defaultValue={data.EmpresaId}
                        />
                      </FormGroup>
                      <Label>CNPJ</Label>
                      <FormGroup className={`has-label ${bindCNPJ.valueerror}`}>
                        <Input
                          defaultValue={data.CNPJ}
                          name="CNPJ"
                          type="numeric"
                          {...bindCNPJ}
                        />
                        {bindCNPJ.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>
                      <Label>Nome Abreviado</Label>
                      <FormGroup
                        className={`has-label ${bindNome_abv.valueerror}`}
                      >
                        <Input
                          defaultValue={data.nome_abv}
                          name="name_abv"
                          type="text"
                          {...bindNome_abv}
                        />
                        {bindNome_abv.valueerror === "has-danger" ? (
                          <label className="error">Insira um nome válido</label>
                        ) : null}
                      </FormGroup>
                      <Label>Representante</Label>
                      <FormGroup
                        className={`has-label ${bindRepresentante.valueerror}`}
                      >
                        <Input
                          defaultValue={data.representante}
                          name="representante"
                          type="text"
                          {...bindRepresentante}
                        />
                        {bindRepresentante.valueerror === "has-danger" ? (
                          <label className="error">Insira um nome válido</label>
                        ) : null}
                      </FormGroup>
                      <Label>Tipo Comissão</Label>
                      <FormGroup
                        className={`has-label ${bindTipo_comiss.valueerror}`}
                      >
                        <Input
                          defaultValue={data.tipo_comiss}
                          name="tipo_comiss"
                          type="numeric"
                          {...bindTipo_comiss}
                        />
                        {bindTipo_comiss.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
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
