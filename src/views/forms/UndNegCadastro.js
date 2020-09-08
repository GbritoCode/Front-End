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

import { Form, Input } from "@rocketseat/unform";

import { undNegRequest } from "~/store/modules/general/actions";

import * as yup from "yup";

const schema = yup.object().shape({
  EmpresaId: yup.string().required(),
  desc_und_neg: yup.string().required(),
});

export default function UndNegCadastro() {
  const dispatch = useDispatch();

  function handleSubmit({ EmpresaId, desc_und_neg }) {
    console.log("asdas");
    dispatch(undNegRequest(EmpresaId, desc_und_neg));
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cadastro de Unidade de Negócio</CardTitle>
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

                  <label>desc_und_neg</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="desc_und_neg"
                      type="text"
                    />
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
