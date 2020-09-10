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
import { representanteRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import { useInput } from "hooks.js";

export default function RepresentanteCadastro() {
  const dispatch = useDispatch();
  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa, "number");
  const { value: nome, bind: bindNome } = useInput("");
  const { value: prcnt_comiss, bind: bindPrcnt_comiss } = useInput(
    "",
    "number"
  );
  const { value: vlr_fix_mens, bind: bindVlr_fix_mens } = useInput(
    "",
    "number"
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(representanteRequest(EmpresaId, nome, prcnt_comiss, vlr_fix_mens));
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Representante</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <label>Empresa</label>
                  <FormGroup
                    className={`has-label ${bindEmpresaId.valueerror}`}
                  >
                    <Input
                      disabled={true}
                      name="EmpresaId"
                      type="text"
                      {...bindEmpresaId}
                    />{" "}
                    {bindEmpresaId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Nome</label>
                  <FormGroup className={`has-label ${bindNome.valueerror}`}>
                    <Input name="nome" type="text" {...bindNome} />{" "}
                    {bindNome.valueerror === "has-danger" ? (
                      <label className="error">Insira um nome válido</label>
                    ) : null}
                  </FormGroup>

                  <label>Percentual de Comissão</label>
                  <FormGroup
                    className={`has-label ${bindPrcnt_comiss.valueerror}`}
                  >
                    <Input
                      name="prcnt_comiss"
                      type="numeric"
                      {...bindPrcnt_comiss}
                    />{" "}
                    {bindPrcnt_comiss.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Valor Fixo Mensal</label>
                  <FormGroup
                    className={`has-label ${bindVlr_fix_mens.valueerror}`}
                  >
                    <Input
                      name="vlr_fix_mens"
                      type="numeric"
                      {...bindVlr_fix_mens}
                    />{" "}
                    {bindVlr_fix_mens.valueerror === "has-danger" ? (
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
