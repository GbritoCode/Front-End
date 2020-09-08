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
import { recDespRequest } from "~/store/modules/general/actions";
import * as yup from "yup";
import { store } from "~/store";
import { useInput } from "hooks.js";

const schema = yup.object().shape({
  EmpresaId: yup.string().required(),
  nome: yup.string().required(),
  license: yup.string().required(),
});

export default function RecDespCadastro() {
  const dispatch = useDispatch();
  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa);
  const { value: nome, bind: bindNome } = useInput("");
  const { value: license, bind: bindLicense } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(recDespRequest(EmpresaId, nome, license));
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cadastro de Receita e Despesa</CardTitle>
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
                  <label>Nome</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="nome"
                      type="text"
                      {...bindNome}
                    />
                  </FormGroup>
                  <label>License</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="license"
                      type="text"
                      {...bindLicense}
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
