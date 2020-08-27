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

import { CliContRequest } from "~/store/modules/Cliente/actions";

import * as yup from "yup";

const schema = yup.object().shape({
  ClienteId: yup.string().required("O cnpj é obrigatório"),
  nome: yup.string().required("O nome é obrigatório"),
  cel: yup.number().required("O cel é obrigatório"),
  fone: yup.number("Digite um número").integer("Insira um número inteiro"),
  skype: yup.string().required("O skype é obrigatório"),
  email: yup
    .string()
    .email()
    .required("O email é obrigatório"),
  aniver: yup.date().required("O aniversário é obrigatório"),
  tipo_conta: yup.number().required("O tipo da conta é obrigatório"),
});

export default function CliContCadastro() {
  const dispatch = useDispatch();

  function handleSubmit({
    ClienteId,
    nome,
    cel,
    fone,
    skype,
    email,
    aniver,
    tipo_conta,
  }) {
    dispatch(
      CliContRequest(
        ClienteId,
        nome,
        cel,
        fone,
        skype,
        email,
        aniver,
        tipo_conta
      )
    );
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Continuação Cadastro de Cliente</CardTitle>
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
                  <label>nome</label>
                  <FormGroup>
                    <Input className="cadastro" name="nome" type="text" />
                  </FormGroup>
                  <label>cel</label>
                  <FormGroup>
                    <Input className="cadastro" name="cel" type="numeric" />
                  </FormGroup>
                  <label>fone</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="fone"
                      type="numeric"
                      autoComplete="off"
                    />
                  </FormGroup>
                  <label>skype</label>
                  <FormGroup>
                    <Input className="cadastro" name="skype" type="text" />
                  </FormGroup>
                  <label>email</label>
                  <FormGroup>
                    <Input className="cadastro" name="email" type="email" />
                  </FormGroup>
                  <label>aniver</label>
                  <FormGroup>
                    <Input className="cadastro" name="aniver" type="date" />
                  </FormGroup>
                  <label>tipo_conta</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="tipo_conta"
                      type="numeric"
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
