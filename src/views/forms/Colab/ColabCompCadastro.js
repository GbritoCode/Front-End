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
import { useInput } from "hooks.js";

export default function ColabCompCadastro() {
  const dispatch = useDispatch();

  const { value: ColabId, bind: bindColabId } = useInput("");
  const { value: nivel, bind: bindNivel } = useInput("");
  const { value: tipo_valor, bind: bindTipo_valor } = useInput("");
  const { value: valor, bind: bindValor } = useInput("");
  const { value: data_inic, bind: bindData_inic } = useInput("");
  const { value: data_fim, bind: bindData_fim } = useInput("");
  const { value: tipo_atend, bind: bindTipo_atend } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
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
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Complemento do Colaborador</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="cadastro" onSubmit={handleSubmit}>
                  <label>Colaborador</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="ColabId"
                      type="numeric"
                      {...bindColabId}
                    />
                  </FormGroup>

                  <label>Nível</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="nivel"
                      type="numeric"
                      {...bindNivel}
                    />
                  </FormGroup>

                  <label>Tipo de valor</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="tipo_valor"
                      type="numeric"
                      {...bindTipo_valor}
                    />
                  </FormGroup>

                  <label>Valor</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="valor"
                      type="numeric"
                      {...bindValor}
                    />
                  </FormGroup>

                  <label>Data Inicial</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="data_inic"
                      type="date"
                      {...bindData_inic}
                    />
                  </FormGroup>

                  <label>Data Final</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="data_fim"
                      type="date"
                      {...bindData_fim}
                    />
                  </FormGroup>

                  <label>Tipo de Atendimento</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="tipo_atend"
                      type="numeric"
                      {...bindTipo_atend}
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
