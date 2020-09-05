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
import { ClienteRequest } from "~/store/modules/Cliente/actions";
import { useInput } from "~/hooks.js";

export default function CadastroCliente() {
  const dispatch = useDispatch();

  const { value: CNPJ, bind: bindCNPJ, reset: resetCNPJ } = useInput("");
  const {
    value: nome_abv,
    bind: bindNome_abv,
    reset: resetNome_abv,
  } = useInput("");
  const {
    value: representante,
    bind: bindRepresentante,
    reset: resetRepresentante,
  } = useInput("");
  const {
    value: tipo_comiss,
    bind: bindTipo_comiss,
    reset: resetTipo_comiss,
  } = useInput("");
  const {
    value: EmpresaId,
    bind: bindEmpresaId,
    reset: resetEmpresaId,
  } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(
      ClienteRequest(CNPJ, nome_abv, representante, tipo_comiss, EmpresaId)
    );
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Pré-Cadastro de Cliente</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="cadastro" onSubmit={handleSubmit}>
                  <label>CNPJ</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="CNPJ"
                      type="text"
                      {...bindCNPJ}
                    />
                  </FormGroup>
                  <label>nome_abv</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="nome_abv"
                      type="text"
                      {...bindNome_abv}
                    />
                  </FormGroup>
                  <label>representante</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="representante"
                      type="text"
                      {...bindRepresentante}
                    />
                  </FormGroup>
                  <label>tipo_comiss</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="tipo_comiss"
                      type="numeric"
                      autoComplete="off"
                      {...bindTipo_comiss}
                    />
                  </FormGroup>
                  <label>EmpresaId</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="EmpresaId"
                      type="numeric"
                      {...bindEmpresaId}
                      maxLength={30}
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
