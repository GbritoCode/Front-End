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
  Form,
  Input,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { undNegRequest } from "~/store/modules/general/actions";
import * as yup from "yup";
import { store } from "~/store";
import { useInput } from "hooks.js";

const schema = yup.object().shape({
  EmpresaId: yup.string().required(),
  desc_und_neg: yup.string().required(),
});

export default function UndNegCadastro() {
  const dispatch = useDispatch();
  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa);
  const { value: desc_und_neg, bind: bindDesc_und_neg } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(undNegRequest(EmpresaId, desc_und_neg));
  };
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
                  <label>Empresa</label>
                  <FormGroup>
                    <Input
                      disabled={true}
                      className="cadastro"
                      name="EmpresaId"
                      type="text"
                      {...bindEmpresaId}
                    />
                  </FormGroup>

                  <label>Descrição da Unidade de Negócio</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="desc_und_neg"
                      type="text"
                      {...bindDesc_und_neg}
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
