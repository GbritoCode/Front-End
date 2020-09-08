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
  Form,
  Input,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { prodtRequest } from "~/store/modules/general/actions";
import * as yup from "yup";
import { store } from "~/store";
import { useInput } from "hooks.js";

const schema = yup.object().shape({
  EmpresaId: yup.string().required(),
  desc_prodt: yup.string().required(),
});

export default function ProdtCadastro() {
  const dispatch = useDispatch();
  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa);
  const { value: desc_prodt, bind: bindDesc_prodt } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(prodtRequest(EmpresaId, desc_prodt));
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cadastro de Produto</CardTitle>
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
                  <label>Descrição do Produto</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="desc_prodt"
                      type="text"
                      {...bindDesc_prodt}
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
