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
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  Form,
  Input,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { CliRecDespRequest } from "~/store/modules/Cliente/actions";
import { useInput } from "~/hooks.js";
export default function CliRecDespCadastro() {
  const dispatch = useDispatch();

  const { value: ClienteId, bind: bindClienteId } = useInput("");
  const { value: tipo_rec_desp, bind: bindTipo_rec_desp } = useInput("");
  const { value: nome_rec_desp, bind: bindNome_rec_desp } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(CliRecDespRequest(ClienteId, tipo_rec_desp, nome_rec_desp));
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Cadastro de Receita e Despesa de Cliente
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <label>Cliente</label>
                  <FormGroup>
                    <Input name="ClienteId" type="text" {...bindClienteId} />
                  </FormGroup>
                  <label>Receita ou despesa</label>
                  <FormGroup>
                    <Input
                      name="tipo_rec_desp"
                      type="numeric"
                      {...bindTipo_rec_desp}
                    />
                  </FormGroup>
                  <label>Nome</label>
                  <FormGroup>
                    <Input
                      name="nome_rec_desp"
                      type="text"
                      {...bindNome_rec_desp}
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
  );
}
