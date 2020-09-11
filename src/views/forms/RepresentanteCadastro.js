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
import { representanteRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import { useInput } from "hooks.js";
import axios from "axios";

export default function RepresentanteCadastro() {
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
  const { value: nome, bind: bindNome } = useInput("");
  const { value: prcnt_comiss, bind: bindPrcnt_comiss } = useInput(
    "",
    "number"
  );
  const { value: vlr_fix_mens, bind: bindVlr_fix_mens } = useInput(
    "",
    "number"
  );

  const errorCheckAux = [
    bindEmpresaId,
    bindNome,
    bindPrcnt_comiss,
    bindVlr_fix_mens,
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
        representanteRequest(EmpresaId, nome, prcnt_comiss, vlr_fix_mens)
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
