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
import React, { useEffect, useState } from "react";

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
import { undNegRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import { useInput } from "hooks.js";
import axios from "axios";

export default function UndNegCadastro() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const empresa = store.getState().auth.empresa;

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/empresa/${empresa}`);
      setData(response.data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa, "number");
  const { value: desc_und_neg, bind: bindDesc_und_neg } = useInput("");

  const errorCheckAux = [bindEmpresaId, bindDesc_und_neg];
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
      dispatch(undNegRequest(EmpresaId, desc_und_neg));
    }
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Unidade de Negócio</CardTitle>
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
                      type="select"
                      {...bindEmpresaId}
                    >
                      {" "}
                      <option value={1}>
                        {" "}
                        Empresa selecionada: {data.nome}, CNPJ {data.id_federal}
                      </option>
                    </Input>
                    {bindEmpresaId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Descrição da Unidade de Negócio</label>
                  <FormGroup
                    className={`has-label ${bindDesc_und_neg.valueerror}`}
                  >
                    <Input
                      name="desc_und_neg"
                      type="text"
                      {...bindDesc_und_neg}
                    />
                    {bindDesc_und_neg.valueerror === "has-danger" ? (
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
