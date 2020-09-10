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
import { empresaRequest } from "~/store/modules/general/actions";
import { useInput } from "hooks.js";

export default function EmpresaCadastro() {
  const dispatch = useDispatch();

  const { value: id_federal, bind: bindId_federal } = useInput("", "number");
  const { value: nome, bind: bindNome } = useInput("");
  const { value: license, bind: bindLicense } = useInput("");
  const { value: UserId, bind: bindUserId } = useInput("", "number");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(empresaRequest(id_federal, nome, license, UserId));
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Empresa</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <label>CNPJ</label>
                  <FormGroup
                    className={`has-label ${bindId_federal.valueerror}`}
                  >
                    <Input name="id_federal" type="text" {...bindId_federal} />
                    {bindId_federal.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Nome</label>
                  <FormGroup className={`has-label ${bindNome.valueerror}`}>
                    <Input name="nome" type="text" {...bindNome} />
                    {bindNome.valueerror === "has-danger" ? (
                      <label className="error">Insira um nome válido</label>
                    ) : null}
                  </FormGroup>

                  <label>License</label>
                  <FormGroup className={`has-label ${bindLicense.valueerror}`}>
                    <Input name="license" type="text" {...bindLicense} />
                    {bindLicense.valueerror === "has-danger" ? (
                      <label className="error">Insira um valor válido</label>
                    ) : null}
                  </FormGroup>

                  <label>Usuário</label>
                  <FormGroup className={`has-label ${bindUserId.valueerror}`}>
                    <Input name="UserId" type="numeric" {...bindUserId} />
                    {bindUserId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
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
