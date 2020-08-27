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

import { segmentoRequest } from "~/store/modules/general/actions";

import * as yup from "yup";

const schema = yup.object().shape({
  EmpresaId: yup.string().required(),
  Und_negId: yup.number().required(),
  ProdutoId: yup.number().required(),
  AreaId: yup.number().required(),
  desc_segmt: yup.string().required(),
});

export default function SegmentoCadastro() {
  const dispatch = useDispatch();

  function handleSubmit({
    EmpresaId,
    Und_negId,
    ProdutoId,
    AreaId,
    desc_segmt,
  }) {
    console.log("asdas");
    dispatch(
      segmentoRequest(EmpresaId, Und_negId, ProdutoId, AreaId, desc_segmt)
    );
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cadastro de Segmento</CardTitle>
              </CardHeader>
              <CardBody>
                <Form
                  className="cadastro"
                  onSubmit={handleSubmit}
                  schema={schema}
                >
                  <label>EmpresaId</label>
                  <FormGroup>
                    <Input className="cadastro" name="EmpresaId" type="text" />
                  </FormGroup>
                  <label>Und_negId</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="Und_negId"
                      type="numeric"
                    />
                  </FormGroup>
                  <label>ProdutoId</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="ProdutoId"
                      type="numeric"
                    />
                  </FormGroup>
                  <label>AreaId</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="AreaId"
                      type="numeric"
                      autoComplete="off"
                    />
                  </FormGroup>
                  <label>desc_segmt</label>
                  <FormGroup>
                    <Input className="cadastro" name="desc_segmt" type="text" />
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
