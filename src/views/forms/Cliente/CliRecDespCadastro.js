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
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";

import { Form, Input } from "@rocketseat/unform";

import { CliRecDespRequest } from "~/store/modules/Cliente/actions";

import * as yup from "yup";

const schema = yup.object().shape({
  ClienteId: yup.string().required(),
  tipo_rec_desp: yup.number().required(),
  nome_rec_desp: yup.string().required(),
});

export default function CliRecDespCadastro() {
  const dispatch = useDispatch();

  function handleSubmit({ ClienteId, tipo_rec_desp, nome_rec_desp }) {
    console.log("asdas");
    dispatch(CliRecDespRequest(ClienteId, tipo_rec_desp, nome_rec_desp));
  }
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
                <Form
                  className="cadastro"
                  onSubmit={handleSubmit}
                  schema={schema}
                >
                  <label>ClienteId</label>
                  <FormGroup>
                    <Input className="cadastro" name="ClienteId" type="text" />
                  </FormGroup>
                  <label>tipo_rec_desp</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="tipo_rec_desp"
                      type="numeric"
                    />
                  </FormGroup>
                  <label>nome_rec_desp</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="nome_rec_desp"
                      type="text"
                    />
                  </FormGroup>

                  <FormGroup check className="mt-3">
                    <Label check>
                      <Input name="check" type="checkbox" />
                      <span className="form-check-sign" />
                      Subscribe to newsletter
                    </Label>
                  </FormGroup>
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
