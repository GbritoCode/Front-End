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
import { segmentoRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import { useInput } from "hooks.js";

export default function SegmentoCadastro() {
  const dispatch = useDispatch();
  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa);
  const { value: Und_negId, bind: bindUnd_negId } = useInput("", "number");
  const { value: ProdutoId, bind: bindProdutoId } = useInput("", "number");
  const { value: AreaId, bind: bindAreaId } = useInput("", "number");
  const { value: desc_segmt, bind: bindDesc_segmt } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(
      segmentoRequest(EmpresaId, Und_negId, ProdutoId, AreaId, desc_segmt)
    );
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Segmento</CardTitle>
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

                  <label>Unidade de Negócio</label>
                  <FormGroup
                    className={`has-label ${bindUnd_negId.valueerror}`}
                  >
                    <Input name="Und_negId" type="numeric" {...bindUnd_negId} />
                    {bindUnd_negId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Produto</label>
                  <FormGroup
                    className={`has-label ${bindProdutoId.valueerror}`}
                  >
                    <Input name="ProdutoId" type="numeric" {...bindProdutoId} />{" "}
                    {bindProdutoId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Área</label>
                  <FormGroup className={`has-label ${bindAreaId.valueerror}`}>
                    <Input name="AreaId" type="numeric" {...bindAreaId} />{" "}
                    {bindAreaId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Descrição do Segmento</label>
                  <FormGroup
                    className={`has-label ${bindDesc_segmt.valueerror}`}
                  >
                    <Input name="desc_segmt" type="text" {...bindDesc_segmt} />{" "}
                    {bindDesc_segmt.valueerror === "has-danger" ? (
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
