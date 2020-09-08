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

import { itmControleRequest } from "~/store/modules/general/actions";

import * as yup from "yup";

const schema = yup.object().shape({
  EmpresaId: yup.string().required(),
  desc_item: yup.string().required(),
  tipo_item: yup.number().required(),
  conta_contabil: yup.number().required(),
  cent_custo: yup.number().required(),
});

export default function ItmControleCadastro() {
  const dispatch = useDispatch();

  function handleSubmit({
    EmpresaId,
    desc_item,
    tipo_item,
    conta_contabil,
    cent_custo,
  }) {
    console.log("asdas");
    dispatch(
      itmControleRequest(
        EmpresaId,
        desc_item,
        tipo_item,
        conta_contabil,
        cent_custo
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
                <CardTitle tag="h4">Cadastro de Item Controle</CardTitle>
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
                  <label>desc_item</label>
                  <FormGroup>
                    <Input className="cadastro" name="desc_item" type="text" />
                  </FormGroup>
                  <label>tipo_item</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="tipo_item"
                      type="numeric"
                    />
                  </FormGroup>
                  <label>conta_contabil</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="conta_contabil"
                      type="numeric"
                      autoComplete="off"
                    />
                  </FormGroup>
                  <label>cent_custo</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="cent_custo"
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
