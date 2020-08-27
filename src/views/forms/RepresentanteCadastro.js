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

import { representanteRequest } from "~/store/modules/general/actions";

import * as yup from "yup";

const schema = yup.object().shape({
  EmpresaId: yup.string().required(),
  nome: yup.string().required(),
  prcnt_comiss: yup.number().required(),
  vlr_fix_mens: yup.number().required(),
});

export default function RepresentanteCadastro() {
  const dispatch = useDispatch();

  function handleSubmit({ EmpresaId, nome, prcnt_comiss, vlr_fix_mens }) {
    console.log("asdas");
    dispatch(representanteRequest(EmpresaId, nome, prcnt_comiss, vlr_fix_mens));
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cadastro de Representante</CardTitle>
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
                  <label>nome</label>
                  <FormGroup>
                    <Input className="cadastro" name="nome" type="text" />
                  </FormGroup>
                  <label>prcnt_comiss</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="prcnt_comiss"
                      type="numeric"
                    />
                  </FormGroup>
                  <label>vlr_fix_mens</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="vlr_fix_mens"
                      type="numeric"
                      autoComplete="off"
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
