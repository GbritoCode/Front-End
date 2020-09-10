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
import { colabRequest } from "~/store/modules/Colab/actions";
import { store } from "~/store";
import { useInput } from "~/hooks.js";

export default function ColabCadastro() {
  const dispatch = useDispatch();

  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa, "number");
  const { value: CPF, bind: bindCPF } = useInput("", "number");
  const { value: FornecId, bind: bindFornecId } = useInput("", "number");
  const { value: log_usr, bind: bindLog_usr } = useInput("", "number");
  const { value: nome, bind: bindNome } = useInput("");
  const { value: dt_admiss, bind: bindDt_admiss } = useInput("");
  const { value: cel, bind: bindCel } = useInput("", "number");
  const { value: skype, bind: bindSkype } = useInput("");
  const { value: email, bind: bindEmail } = useInput("", "email");
  const { value: espec, bind: bindEspec } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      colabRequest(
        CPF,
        FornecId,
        log_usr,
        EmpresaId,
        nome,
        dt_admiss,
        cel,
        skype,
        email,
        espec
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
                <CardTitle tag="h4">Colaborador</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <label>Empresa</label>
                  <FormGroup
                    className={`has-label ${bindEmpresaId.valueerror}`}
                  >
                    <Input name="EmpresaId" type="numeric" {...bindEmpresaId} />
                    {bindEmpresaId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>CPF</label>
                  <FormGroup className={`has-label ${bindCPF.valueerror}`}>
                    <Input name="CPF" type="numeric" {...bindCPF} />
                    {bindCPF.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Fornecedor</label>
                  <FormGroup className={`has-label ${bindFornecId.valueerror}`}>
                    <Input name="FornecId" type="numeric" {...bindFornecId} />
                    {bindFornecId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Usuário</label>
                  <FormGroup className={`has-label ${bindLog_usr.valueerror}`}>
                    <Input name="log_usr" type="numeric" {...bindLog_usr} />
                    {bindLog_usr.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Nome</label>
                  <FormGroup className={`has-label ${bindNome.valueerror}`}>
                    <Input name="nome" type="text" {...bindNome} />
                    {bindNome.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Data de Adimissão</label>
                  <FormGroup
                    className={`has-label ${bindDt_admiss.valueerror}`}
                  >
                    <Input name="dt_admiss" type="date" {...bindDt_admiss} />
                    {bindDt_admiss.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Celular</label>
                  <FormGroup className={`has-label ${bindCel.valueerror}`}>
                    <Input name="cel" type="numeric" {...bindCel} />
                    {bindCel.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Skype</label>
                  <FormGroup className={`has-label ${bindSkype.valueerror}`}>
                    <Input name="skype" type="text" {...bindSkype} />
                    {bindSkype.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Email</label>
                  <FormGroup className={`has-label ${bindEmail.valueerror}`}>
                    <Input name="email" type="text" {...bindEmail} />
                    {bindEmail.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Especialidade</label>
                  <FormGroup className={`has-label ${bindEspec.valueerror}`}>
                    <Input name="espec" type="text" {...bindEspec} />
                    {bindEspec.valueerror === "has-danger" ? (
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
