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
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";

import { areaRequest } from "~/store/modules/general/actions";

import * as yup from "yup";

import { useInput } from "hooks.js";

import { store } from "~/store";

const schema = yup.object().shape({
  EmpresaId: yup.string().required(),
  desc_area: yup.string().required(),
});
export default function CadastroCliente() {
  const dispatch = useDispatch();

  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa);
  const { value: desc_area, bind: bindDesc_area } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(areaRequest(EmpresaId, desc_area));
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cadastro de Area</CardTitle>
              </CardHeader>
              <CardBody>
                <Form
                  className="cadastro"
                  onSubmit={handleSubmit}
                  schema={schema}
                >
                  <label>Empresa</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="EmpresaId"
                      type="text"
                      {...bindEmpresaId}
                    />
                  </FormGroup>

                  <label>Descrição Área</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="desc_area"
                      type="text"
                      {...bindDesc_area}
                    />
                  </FormGroup>

                  <Button
                    style={{ marginTop: 35 }}
                    className="form"
                    color="info"
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
