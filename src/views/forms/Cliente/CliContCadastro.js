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
import { CliContRequest } from "~/store/modules/Cliente/actions";
import * as yup from "yup";
import { useInput } from "~/hooks.js";

const schema = yup.object().shape({
  ClienteId: yup.string().required("O cnpj é obrigatório"),
  nome: yup.string().required("O nome é obrigatório"),
  cel: yup.number().required("O cel é obrigatório"),
  fone: yup.number("Digite um número").integer("Insira um número inteiro"),
  skype: yup.string().required("O skype é obrigatório"),
  email: yup
    .string()
    .email()
    .required("O email é obrigatório"),
  aniver: yup.date().required("O aniversário é obrigatório"),
  tipo_conta: yup.number().required("O tipo da conta é obrigatório"),
});

export default function CliContCadastro() {
  const dispatch = useDispatch();
  const {
    value: ClienteId,
    bind: bindClienteId,
    reset: resetClienteId,
  } = useInput("");
  const { value: nome, bind: bindNome, reset: resetNome } = useInput("");
  const { value: cel, bind: bindCel, reset: resetCel } = useInput("");
  const { value: fone, bind: bindFone, reset: resetFone } = useInput("");
  const { value: skype, bind: bindSkype, reset: resetSkype } = useInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const { value: aniver, bind: bindAniver, reset: resetAniver } = useInput("");
  const {
    value: tipo_conta,
    bind: bindTipo_conta,
    reset: resetTipo_conta,
  } = useInput("");

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
                <Form
                  className="cadastro"
                  onSubmit={handleSubmit}
                  schema={schema}
                >
                  <label>Cliente</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="ClienteId"
                      type="text"
                      {...bindClienteId}
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
                  <label>Celular</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="cel"
                      type="numeric"
                      {...bindCel}
                    />
                  </FormGroup>
                  <label>Telefone</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="fone"
                      type="numeric"
                      autoComplete="off"
                      {...bindFone}
                    />
                  </FormGroup>
                  <label>Skype</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="skype"
                      type="text"
                      {...bindSkype}
                    />
                  </FormGroup>
                  <label>Email</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="email"
                      type="email"
                      {...bindEmail}
                    />
                  </FormGroup>
                  <label>Aniver</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="aniver"
                      type="date"
                      {...bindAniver}
                    />
                  </FormGroup>
                  <label>Tipo de Conta</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="tipo_conta"
                      type="numeric"
                      {...bindTipo_conta}
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
