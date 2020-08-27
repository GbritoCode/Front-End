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

import { colabRequest } from "~/store/modules/Colab/actions";

import * as yup from "yup";

const schema = yup.object().shape({
  CPF: yup.number().required(),
  FornecId: yup.number().required(),
  log_usr: yup.number().required(),
  EmpresaId: yup.number().required(),
  nome: yup.string().required(),
  dt_admiss: yup.date().required(),
  cel: yup.number().required(),
  skype: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  espec: yup.string().required(),
});

export default function ColabCadastro() {
  const dispatch = useDispatch();

  function handleSubmit({
    CPF,
    FornecId,
    log_usr,
    EmpresaId,
    nome,
    dt_admiss,
    cel,
    skype,
    email,
    espec,
  }) {
    dispatch(
      colabRequest(
        CPF,
        FornecId,
        log_usr,
        EmpresaId,
        nome,
        dt_admiss,
        cel,
        skype,
        email,
        espec
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
                <CardTitle tag="h4">Pré-Cadastro de Colaborador</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="cadastro" onSubmit={handleSubmit}>
                  <label>CPF</label>
                  <FormGroup>
                    <Input className="cadastro" name="CPF" type="numeric" />
                  </FormGroup>
                  <label>FornecId</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="FornecId"
                      type="numeric"
                    />
                  </FormGroup>
                  <label>log_usr</label>
                  <FormGroup>
                    <Input className="cadastro" name="log_usr" type="numeric" />
                  </FormGroup>
                  <label>EmpresaId</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="EmpresaId"
                      type="numeric"
                    />
                  </FormGroup>
                  <label>nome</label>
                  <FormGroup>
                    <Input className="cadastro" name="nome" type="text" />
                  </FormGroup>
                  <label>dt_admiss</label>
                  <FormGroup>
                    <Input className="cadastro" name="dt_admiss" type="date" />
                  </FormGroup>
                  <label>cel</label>
                  <FormGroup>
                    <Input className="cadastro" name="cel" type="numeric" />
                  </FormGroup>
                  <label>skype</label>
                  <FormGroup>
                    <Input className="cadastro" name="skype" type="text" />
                  </FormGroup>

                  <label>email</label>
                  <FormGroup>
                    <Input className="cadastro" name="email" type="text" />
                  </FormGroup>

                  <label>espec</label>
                  <FormGroup>
                    <Input className="cadastro" name="espec" type="text" />
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
