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

import { fornecRequest } from "~/store/modules/general/actions";

import * as yup from "yup";

const schema = yup.object().shape({
  CNPJ: yup.string().required(),
  EmpresaId: yup.string().required(),
  nome: yup.string().required(),
  cond_pgmto: yup.number().required(),
  nome_conta: yup.string().required(),
  fone: yup.number().required(),
  cep: yup.string().required(),
  rua: yup.string().required(),
  numero: yup.number().required(),
  complemento: yup.string().required(),
  bairro: yup.string().required(),
  cidade: yup.string().required(),
  uf: yup.string().required(),
  banco: yup.string().required(),
  agencia: yup.string().required(),
  conta: yup.string().required(),
});

export default function FornecCadastro() {
  const dispatch = useDispatch();

  function handleSubmit({
    CNPJ,
    EmpresaId,
    nome,
    cond_pgmto,
    nome_conta,
    fone,
    cep,
    rua,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    banco,
    agencia,
    conta,
  }) {
    dispatch(
      fornecRequest(
        CNPJ,
        EmpresaId,
        nome,
        cond_pgmto,
        nome_conta,
        fone,
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        banco,
        agencia,
        conta
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
                <CardTitle tag="h4">Cadastro de Fornecedor</CardTitle>
              </CardHeader>
              <CardBody>
                <Form
                  className="cadastro"
                  onSubmit={handleSubmit}
                  schema={schema}
                >
                  <label>CNPJ</label>
                  <FormGroup>
                    <Input className="cadastro" name="CNPJ" type="text" />
                  </FormGroup>
                  <label>EmpresaId</label>
                  <FormGroup>
                    <Input className="cadastro" name="EmpresaId" type="text" />
                  </FormGroup>
                  <label>nome</label>
                  <FormGroup>
                    <Input className="cadastro" name="nome" type="text" />
                  </FormGroup>
                  <label>cond_pgmto</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="cond_pgmto"
                      type="numeric"
                      autoComplete="off"
                    />
                  </FormGroup>
                  <label>nome_conta</label>
                  <FormGroup>
                    <Input className="cadastro" name="nome_conta" type="text" />
                  </FormGroup>

                  <label>fone</label>
                  <FormGroup>
                    S
                    <Input className="cadastro" name="fone" type="numeric" />
                  </FormGroup>

                  <label>cep</label>
                  <FormGroup>
                    <Input className="cadastro" name="cep" type="text" />
                  </FormGroup>

                  <label>rua</label>
                  <FormGroup>
                    <Input className="cadastro" name="rua" type="text" />
                  </FormGroup>

                  <label>numero</label>
                  <FormGroup>
                    <Input className="cadastro" name="numero" type="numeric" />
                  </FormGroup>

                  <label>complemento</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="complemento"
                      type="text"
                    />
                  </FormGroup>

                  <label>bairro</label>
                  <FormGroup>
                    <Input className="cadastro" name="bairro" type="text" />
                  </FormGroup>

                  <label>cidade</label>
                  <FormGroup>
                    <Input className="cadastro" name="cidade" type="text" />
                  </FormGroup>

                  <label>uf</label>
                  <FormGroup>
                    <Input className="cadastro" name="uf" type="text" />
                  </FormGroup>

                  <label>banco</label>
                  <FormGroup>
                    <Input className="cadastro" name="banco" type="text" />
                  </FormGroup>

                  <label>agencia</label>
                  <FormGroup>
                    <Input className="cadastro" name="agencia" type="text" />
                  </FormGroup>

                  <label>conta</label>
                  <FormGroup>
                    <Input className="cadastro" name="conta" type="text" />
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
