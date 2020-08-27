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
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { CliCompUpdate } from "~/store/modules/Cliente/actions";

import { Form, Input } from "@rocketseat/unform";

import * as yup from "yup";

const schema = yup.object().shape({
  ClienteId: yup.string().required(),
  RZ_SOCIAL: yup.string().required(),
  COND_PGTO: yup.number().required(),
  NOME_ABV: yup.string().required(),
  CEP: yup.string().required(),
  RUA: yup.string().required(),
  NUMERO: yup.number().required(),
  BAIRRO: yup.string().required(),
  CIDADE: yup.string().required(),
  UF: yup.string().required(),
  INSC_MUN: yup.number().required(),
  INSC_UF: yup.number().required(),
});

export default function CliCompUpdatee() {
  const dispatch = useDispatch();

  function handleSubmit({
    ClienteId,
    RZ_SOCIAL,
    COND_PGTO,
    NOME_ABV,
    CEP,
    RUA,
    NUMERO,
    BAIRRO,
    CIDADE,
    UF,
    INSC_MUN,
    INSC_UF,
  }) {
    dispatch(
      CliCompUpdate(
        ClienteId,
        RZ_SOCIAL,
        COND_PGTO,
        NOME_ABV,
        CEP,
        RUA,
        NUMERO,
        BAIRRO,
        CIDADE,
        UF,
        INSC_MUN,
        INSC_UF
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

                  <label>RZ_SOCIAL</label>
                  <FormGroup>
                    <Input className="cadastro" name="RZ_SOCIAL" type="text" />
                  </FormGroup>

                  <label>COND_PGTO</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="COND_PGTO"
                      type="numeric"
                    />
                  </FormGroup>

                  <label>NOME_ABV</label>
                  <FormGroup>
                    <Input className="cadastro" name="NOME_ABV" type="text" />
                  </FormGroup>

                  <label>CEP</label>
                  <FormGroup>
                    <Input className="cadastro" name="CEP" type="text" />
                  </FormGroup>

                  <label>RUA</label>
                  <FormGroup>
                    <Input className="cadastro" name="RUA" type="text" />
                  </FormGroup>

                  <label>NUMERO</label>
                  <FormGroup>
                    <Input className="cadastro" name="NUMERO" type="numeric" />
                  </FormGroup>

                  <label>BAIRRO</label>
                  <FormGroup>
                    <Input className="cadastro" name="BAIRRO" type="text" />
                  </FormGroup>

                  <label>CIDADE</label>
                  <FormGroup>
                    <Input className="cadastro" name="CIDADE" type="text" />
                  </FormGroup>

                  <label>UF</label>
                  <FormGroup>
                    <Input className="cadastro" name="UF" type="text" />
                  </FormGroup>

                  <label>INSC_MUN</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="INSC_MUN"
                      type="numeric"
                    />
                  </FormGroup>

                  <label>INSC_UF</label>
                  <FormGroup>
                    <Input className="cadastro" name="INSC_UF" type="numeric" />
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
