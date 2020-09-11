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
import { segmentoRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import { useInput } from "hooks.js";
import axios from "axios";

export default function SegmentoCadastro() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const empresa = store.getState().auth.empresa;

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/empresa/${empresa}`);
      const response1 = await axios(`http://localhost:3001/und_neg/`);
      const response2 = await axios(`http://localhost:3001/prodt/`);
      const response3 = await axios(`http://localhost:3001/area/`);
      setData(response.data);
      setData1(response1.data);
      setData2(response2.data);
      setData3(response3.data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa);
  const { value: Und_negId, bind: bindUnd_negId } = useInput("", "number");
  const { value: ProdutoId, bind: bindProdutoId } = useInput("", "number");
  const { value: AreaId, bind: bindAreaId } = useInput("", "number");
  const { value: desc_segmt, bind: bindDesc_segmt } = useInput("");

  const errorCheckAux = [
    bindEmpresaId,
    bindUnd_negId,
    bindProdutoId,
    bindAreaId,
    bindDesc_segmt,
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
        segmentoRequest(EmpresaId, Und_negId, ProdutoId, AreaId, desc_segmt)
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

                  <label>Unidade de Negócio</label>
                  <FormGroup
                    className={`has-label ${bindUnd_negId.valueerror}`}
                  >
                    <Input name="Und_negId" type="select" {...bindUnd_negId}>
                      {" "}
                      {data1.map((undNeg) => (
                        <option value={undNeg.id}>
                          {" "}
                          {undNeg.desc_und_neg}{" "}
                        </option>
                      ))}
                    </Input>{" "}
                    {bindUnd_negId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Produto</label>
                  <FormGroup
                    className={`has-label ${bindProdutoId.valueerror}`}
                  >
                    <Input name="ProdutoId" type="select" {...bindProdutoId}>
                      {" "}
                      {data2.map((prodt) => (
                        <option value={prodt.id}> {prodt.desc_prodt} </option>
                      ))}
                    </Input>
                    {bindProdutoId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Área</label>
                  <FormGroup className={`has-label ${bindAreaId.valueerror}`}>
                    <Input name="AreaId" type="select" {...bindAreaId}>
                      {" "}
                      {data3.map((area) => (
                        <option value={area.id}> {area.desc_area} </option>
                      ))}
                    </Input>{" "}
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
