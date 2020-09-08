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
import * as yup from "yup";
import { store } from "~/store";
import { useInput } from "hooks.js";

const schema = yup.object().shape({
  EmpresaId: yup.string().required(),
  desc_item: yup.string().required(),
  tipo_item: yup.number().required(),
  conta_contabil: yup.number().required(),
  cent_custo: yup.number().required(),
});

export default function ItmControleCadastro() {
  const dispatch = useDispatch();
  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa);
  const { value: desc_item, bind: bindDesc_item } = useInput("");
  const { value: tipo_item, bind: bindTipo_item } = useInput("");
  const { value: conta_contabil, bind: bindConta_contabil } = useInput("");
  const { value: cent_custo, bind: bindCent_custo } = useInput("");

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
                  <label>Descrição do Item</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="desc_item"
                      type="text"
                      {...bindDesc_item}
                    />
                  </FormGroup>
                  <label>Tipo de Item</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="tipo_item"
                      type="numeric"
                      {...bindTipo_item}
                    />
                  </FormGroup>
                  <label>Conta Contábil</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="conta_contabil"
                      type="numeric"
                      {...bindConta_contabil}
                    />
                  </FormGroup>
                  <label>cent_custo</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="cent_custo"
                      type="numeric"
                      {...bindCent_custo}
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
