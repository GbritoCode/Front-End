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
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { Form, Input } from "@rocketseat/unform";
import { colabCompRequest } from "~/store/modules/Colab/actions";
import * as yup from "yup";

const schema = yup.object().shape({
  ColabId: yup.number().required(),
  nivel: yup.number().required(),
  tipo_valor: yup.number().required(),
  valor: yup.number().required(),
  data_inic: yup.date().required(),
  data_fim: yup.date().required(),
  tipo_atend: yup.number().required(),
});

export default function ColabCompCadastro() {
  const dispatch = useDispatch();

  function handleSubmit({
    ColabId,
    nivel,
    tipo_valor,
    valor,
    data_inic,
    data_fim,
    tipo_atend,
  }) {
    console.log("asdas");
    dispatch(
      colabCompRequest(
        ColabId,
        nivel,
        tipo_valor,
        valor,
        data_inic,
        data_fim,
        tipo_atend
      )
    );
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Cadastro de Complemento do Colaborador
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Form
                  className="cadastro"
                  onSubmit={handleSubmit}
                  schema={schema}
                >
                  <label>ColabId</label>
                  <FormGroup>
                    <Input className="cadastro" name="ColabId" type="numeric" />
                  </FormGroup>

                  <label>nivel</label>
                  <FormGroup>
                    <Input className="cadastro" name="nivel" type="numeric" />
                  </FormGroup>

                  <label>tipo_valor</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="tipo_valor"
                      type="numeric"
                    />
                  </FormGroup>

                  <label>valor</label>
                  <FormGroup>
                    <Input className="cadastro" name="valor" type="numeric" />
                  </FormGroup>

                  <label>data_inic</label>
                  <FormGroup>
                    <Input className="cadastro" name="data_inic" type="date" />
                  </FormGroup>

                  <label>data_fim</label>
                  <FormGroup>
                    <Input className="cadastro" name="data_fim" type="date" />
                  </FormGroup>

                  <label>tipo_atend</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="tipo_atend"
                      type="numeric"
                    />
                  </FormGroup>

                  <FormGroup check className="mt-3">
                    <Label check>
                      <Input name="check" type="checkbox" />
                      <span className="form-check-sign" />
                      Subscribe to newsletter
                    </Label>
                  </FormGroup>
                  <Button
                    style={{ marginTop: 35 }}
                    className="form"
                    color="primary"
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
