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
import ReactDatetime from "react-datetime";

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
import { CliContRequest } from "~/store/modules/Cliente/actions";
import { useInput } from "~/hooks.js";

export default function CliContCadastro() {
  const dispatch = useDispatch();
  const { value: ClienteId, bind: bindClienteId } = useInput("", "number");
  const { value: nome, bind: bindNome } = useInput("");
  const { value: cel, bind: bindCel } = useInput("", "number");
  const { value: fone, bind: bindFone } = useInput("", "number");
  const { value: skype, bind: bindSkype } = useInput("");
  const { value: email, bind: bindEmail } = useInput("", "email");
  const { value: aniver, bind: bindAniver } = useInput("");
  const { value: tipo_conta, bind: bindTipo_conta } = useInput("", "number");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      CliContRequest(
        ClienteId,
        nome,
        cel,
        fone,
        skype,
        email,
        aniver,
        tipo_conta
      )
    );
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Continuação Cadastro de Cliente</CardTitle>
              </CardHeader>
              <CardBody>
                <Form id="RegisterValidation" onSubmit={handleSubmit}>
                  <label>Cliente</label>
                  <FormGroup
                    className={`has-label ${bindClienteId.valueerror}`}
                  >
                    <Input name="ClienteId" type="text" {...bindClienteId} />
                    {bindClienteId.valueerror === "has-danger" ? (
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
                  <Row>
                    <Col md="4">
                      <Label>Celular</Label>
                      <FormGroup className={`has-label ${bindCel.valueerror}`}>
                        <Input name="cel" type="numeric" {...bindCel} />
                        {bindCel.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Telefone</Label>
                      <FormGroup className={`has-label ${bindFone.valueerror}`}>
                        <Input name="fone" type="numeric" {...bindFone} />
                        {bindFone.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Aniversário </Label>
                        <Input name="aniver" type="date" {...bindAniver} />
                      </FormGroup>{" "}
                      {""}
                    </Col>
                  </Row>
                  <label>Skype</label>
                  <FormGroup className={`has-label ${bindSkype.valueerror}`}>
                    <Input name="skype" type="text" {...bindSkype} />
                    {bindSkype.valueerror === "has-danger" ? (
                      <label className="error">Insira um valor válido</label>
                    ) : null}
                  </FormGroup>
                  <Label>Email</Label>
                  <FormGroup className={`has-label ${bindEmail.valueerror}`}>
                    <Input name="email" type="email" {...bindEmail} />
                    {bindEmail.valueerror === "has-danger" ? (
                      <label className="error">Insira um E-mail válido</label>
                    ) : null}
                  </FormGroup>
                  <label>Tipo de Conta</label>
                  <FormGroup
                    className={`has-label ${bindTipo_conta.valueerror}`}
                  >
                    <Input
                      name="tipo_conta"
                      type="numeric"
                      {...bindTipo_conta}
                    />
                    {bindTipo_conta.valueerror === "has-danger" ? (
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
