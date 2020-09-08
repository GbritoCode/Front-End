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
import * as yup from "yup";
import { store } from "~/store";
import { useInput } from "hooks.js";

const schema = yup.object().shape({
  EmpresaId: yup.string().required(),
  Und_negId: yup.number().required(),
  ProdutoId: yup.number().required(),
  AreaId: yup.number().required(),
  desc_segmt: yup.string().required(),
});

export default function SegmentoCadastro() {
  const dispatch = useDispatch();
  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa);
  const { value: Und_negId, bind: bindUnd_negId } = useInput("");
  const { value: ProdutoId, bind: bindProdutoId } = useInput("");
  const { value: AreaId, bind: bindAreaId } = useInput("");
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
                <CardTitle tag="h4">Cadastro de Segmento</CardTitle>
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
                  <label>Unidade de Negócio</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="Und_negId"
                      type="numeric"
                      {...bindUnd_negId}
                    />
                  </FormGroup>
                  <label>Produto</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="ProdutoId"
                      type="numeric"
                      {...bindProdutoId}
                    />
                  </FormGroup>
                  <label>Área</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="AreaId"
                      type="numeric"
                      {...bindAreaId}
                    />
                  </FormGroup>
                  <label>Descrição do Segmento</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="desc_segmt"
                      type="text"
                      {...bindDesc_segmt}
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
