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

import { CliCompRequest } from "~/store/modules/Cliente/actions";

import * as yup from "yup";

const schema = yup.object().shape({
  ClienteId: yup.string().required(),
  rz_social: yup.string().required(),
  cond_pgmto: yup.number().required(),
  nome_abv: yup.string().required(),
  cep: yup.string().required(),
  rua: yup.string().required(),
  numero: yup.number().required(),
  bairro: yup.string().required(),
  cidade: yup.string().required(),
  uf: yup.string().required(),
  insc_mun: yup.number().required(),
  insc_uf: yup.number().required(),
});

export default function CliCompCadastro() {
  const dispatch = useDispatch();

  function handleSubmit({
    ClienteId,
    rz_social,
    cond_pgmto,
    nome_abv,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    uf,
    insc_mun,
    insc_uf,
  }) {
    dispatch(
      CliCompRequest(
        ClienteId,
        rz_social,
        cond_pgmto,
        nome_abv,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        uf,
        insc_mun,
        insc_uf
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
                <CardTitle tag="h4">Cadastro Complementar de Cliente</CardTitle>
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

                  <label>rz_social</label>
                  <FormGroup>
                    <Input className="cadastro" name="rz_social" type="text" />
                  </FormGroup>

                  <label>cond_pgmto</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="cond_pgmto"
                      type="numeric"
                    />
                  </FormGroup>

                  <label>nome_abv</label>
                  <FormGroup>
                    <Input className="cadastro" name="nome_abv" type="text" />
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

                  <label>insc_mun</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="insc_mun"
                      type="numeric"
                    />
                  </FormGroup>

                  <label>insc_uf</label>
                  <FormGroup>
                    <Input className="cadastro" name="insc_uf" type="numeric" />
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
