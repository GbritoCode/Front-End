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
import * as yup from "yup";
import { store } from "~/store";
import { useInput } from "~/hooks.js";

const schema = yup.object().shape({
  CPF: yup.number("digite um número").required(),
  FornecId: yup.number().required(),
  log_usr: yup.number().required(),
  EmpresaId: yup.number().required(),
  nome: yup.string().required(),
  dt_admiss: yup.date().required(),
  cel: yup.number().required(),
  skype: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  espec: yup.string().required(),
});

export default function ColabCadastro() {
  const dispatch = useDispatch();

  const empresa = store.getState().auth.empresa;

  const { value: CPF, bind: bindCPF } = useInput("");
  const { value: FornecId, bind: bindFornecId } = useInput("");
  const { value: log_usr, bind: bindLog_usr } = useInput("");
  const { value: EmpresaId, bind: bindEmpresaId } = useInput("");
  const { value: nome, bind: bindNome } = useInput("");
  const { value: dt_admiss, bind: bindDt_admiss } = useInput("");
  const { value: cel, bind: bindCel } = useInput("");
  const { value: skype, bind: bindSkype } = useInput("");
  const { value: email, bind: bindEmail } = useInput("");
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
                <CardTitle tag="h4">Pré-Cadastro de Colaborador</CardTitle>
              </CardHeader>
              <CardBody>
                <Form
                  className="cadastro"
                  onSubmit={handleSubmit}
                  schema={schema}
                >
                  <label>CPF</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="CPF"
                      type="numeric"
                      {...bindCPF}
                    />
                  </FormGroup>
                  <label>FornecId</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="FornecId"
                      type="numeric"
                      {...bindFornecId}
                    />
                  </FormGroup>
                  <label>log_usr</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="log_usr"
                      type="numeric"
                      {...bindLog_usr}
                    />
                  </FormGroup>
                  <label>EmpresaId</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="EmpresaId"
                      type="numeric"
                      {...bindEmpresaId}
                    />
                  </FormGroup>
                  <label>nome</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="nome"
                      type="text"
                      {...bindNome}
                    />
                  </FormGroup>
                  <label>dt_admiss</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="dt_admiss"
                      type="date"
                      {...bindDt_admiss}
                    />
                  </FormGroup>
                  <label>cel</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="cel"
                      type="numeric"
                      {...bindCel}
                    />
                  </FormGroup>
                  <label>skype</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="skype"
                      type="text"
                      {...bindSkype}
                    />
                  </FormGroup>
                  <label>email</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="email"
                      type="text"
                      {...bindEmail}
                    />
                  </FormGroup>
                  <label>espec</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="espec"
                      type="text"
                      {...bindEspec}
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
