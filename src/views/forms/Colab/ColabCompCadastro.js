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
  Form,
  Input,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { colabCompRequest } from "~/store/modules/Colab/actions";
import { useInput } from "hooks.js";

export default function ColabCompCadastro() {
  const dispatch = useDispatch();

  const { value: ColabId, bind: bindColabId } = useInput("", "number");
  const { value: nivel, bind: bindNivel } = useInput("");
  const { value: tipo_valor, bind: bindTipo_valor } = useInput("", "number");
  const { value: valor, bind: bindValor } = useInput("", "number");
  const { value: data_inic, bind: bindData_inic } = useInput("");
  const { value: data_fim, bind: bindData_fim } = useInput("");
  const { value: tipo_atend, bind: bindTipo_atend } = useInput("", "number");

  const errorCheckAux = [
    bindColabId,
    bindNivel,
    bindTipo_valor,
    bindValor,
    bindTipo_atend,
  ];
  const handleSubmit = (evt) => {
    evt.preventDefault();

    var tamanho = errorCheckAux.length;
    console.log(errorCheckAux.length);
    for (var j = 0; j < tamanho; j++) {
      if (
        !(errorCheckAux[j].valueerror === "has-danger") &
        !(errorCheckAux[j].value === "")
      ) {
        var valid = true;
      } else {
        valid = false;
        break;
      }
    }
    if (valid) {
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
                <Form onSubmit={handleSubmit}>
                  <label>Colaborador</label>
                  <FormGroup className={`has-label ${bindColabId.valueerror}`}>
                    <Input name="ColabId" type="numeric" {...bindColabId} />
                    {bindColabId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Nível</label>
                  <FormGroup className={`has-label ${bindNivel.valueerror}`}>
                    <Input name="nivel" type="select" {...bindNivel}>
                      <option disabled value="">
                        {" "}
                        Selecione o nível{" "}
                      </option>
                      <option value={1}>Adiministrador</option>
                      <option value={2}>Consultor</option>
                      <option value={3}>Outro</option>
                    </Input>
                  </FormGroup>

                  <label>Tipo de valor</label>
                  <FormGroup
                    className={`has-label ${bindTipo_valor.valueerror}`}
                  >
                    <Input
                      name="tipo_valor"
                      type="numeric"
                      {...bindTipo_valor}
                    />
                    {bindTipo_valor.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Valor</label>
                  <FormGroup className={`has-label ${bindValor.valueerror}`}>
                    <Input name="valor" type="numeric" {...bindValor} />
                    {bindValor.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Data Inicial</label>
                  <FormGroup
                    className={`has-label ${bindData_inic.valueerror}`}
                  >
                    <Input name="data_inic" type="date" {...bindData_inic} />
                    {bindData_inic.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Data Final</label>
                  <FormGroup className={`has-label ${bindData_fim.valueerror}`}>
                    <Input name="data_fim" type="date" {...bindData_fim} />
                    {bindData_fim.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Tipo de Atendimento</label>
                  <FormGroup
                    className={`has-label ${bindTipo_atend.valueerror}`}
                  >
                    <Input
                      name="tipo_atend"
                      type="numeric"
                      {...bindTipo_atend}
                    />
                    {bindTipo_atend.valueerror === "has-danger" ? (
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
