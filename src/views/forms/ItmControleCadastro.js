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
import { itmControleRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import { useInput } from "hooks.js";

export default function ItmControleCadastro() {
  const dispatch = useDispatch();
  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa, "number");
  const { value: desc_item, bind: bindDesc_item } = useInput("");
  const { value: tipo_item, bind: bindTipo_item } = useInput("", "number");
  const { value: conta_contabil, bind: bindConta_contabil } = useInput(
    "",
    "number"
  );
  const { value: cent_custo, bind: bindCent_custo } = useInput("", "number");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(
      itmControleRequest(
        EmpresaId,
        desc_item,
        tipo_item,
        conta_contabil,
        cent_custo
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
                <CardTitle tag="h4">Cadastro de Item Controle</CardTitle>
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
                    />
                    {bindEmpresaId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>
                  <label>Descrição do Item</label>
                  <FormGroup
                    className={`has-label ${bindDesc_item.valueerror}`}
                  >
                    <Input name="desc_item" type="text" {...bindDesc_item} />
                    {bindDesc_item.valueerror === "has-danger" ? (
                      <label className="error">Insira um valor válido</label>
                    ) : null}
                  </FormGroup>
                  <label>Tipo de Item</label>
                  <FormGroup
                    className={`has-label ${bindTipo_item.valueerror}`}
                  >
                    <Input name="tipo_item" type="numeric" {...bindTipo_item} />
                    {bindTipo_item.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>
                  <label>Conta Contábil</label>
                  <FormGroup
                    className={`has-label ${bindConta_contabil.valueerror}`}
                  >
                    <Input
                      name="conta_contabil"
                      type="numeric"
                      {...bindConta_contabil}
                    />
                    {bindConta_contabil.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>
                  <label>cent_custo</label>
                  <FormGroup
                    className={`has-label ${bindCent_custo.valueerror}`}
                  >
                    <Input
                      name="cent_custo"
                      type="numeric"
                      {...bindCent_custo}
                    />
                    {bindCent_custo.valueerror === "has-danger" ? (
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
