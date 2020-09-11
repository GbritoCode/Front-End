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
import React, { Fragment, useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { SegmentoUpdate } from "~/store/modules/general/actions";
import { useParams, Link } from "react-router-dom";
import { useInput } from "hooks.js";
import axios from "axios";

function SegmentoUpdatee() {
  const { id } = useParams();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/segmento/${id}`);
      setData(response.data);
      setIsLoading(false);
    }
    loadData();
  }, []);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(undefined);
  const { value: Und_negId, bind: bindUnd_negId } = useInput(
    undefined,
    "number"
  );
  const { value: ProdutoId, bind: bindProdutoId } = useInput(
    undefined,
    "number"
  );
  const { value: AreaId, bind: bindAreaId } = useInput(undefined, "number");
  const { value: desc_segmt, bind: bindDesc_segmt } = useInput(undefined);

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
        SegmentoUpdate(id, EmpresaId, Und_negId, ProdutoId, AreaId, desc_segmt)
      );
    }
  };
  return (
    <Fragment>
      {isLoading ? (
        <div></div>
      ) : (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Edição de Área</CardTitle>
                    <Link to="/cadastro/geral/area">
                      <Button
                        style={{
                          float: "right",
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        color="info"
                        size="small"
                        className="text-center"
                      >
                        <i
                          className="tim-icons icon-simple-add"
                          style={{
                            paddingBottom: 4,
                            paddingRight: 10,
                          }}
                          size="large"
                        />{" "}
                        Novo
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <label>Empresa</label>
                      <FormGroup
                        className={`has-label ${bindEmpresaId.valueerror}`}
                      >
                        <Input
                          defaultValue={data.EmpresaId}
                          disabled={true}
                          name="EmpresaId"
                          type="select"
                          {...bindEmpresaId}
                        >
                          {" "}
                          <option value={1}>
                            {" "}
                            Empresa selecionada: {data.nome}, CNPJ{" "}
                            {data.id_federal}
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
                        <Input
                          defaultValue={data.Und_negId}
                          name="Und_negId"
                          type="numeric"
                          {...bindUnd_negId}
                        />
                        {bindUnd_negId.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Produto</label>
                      <FormGroup
                        className={`has-label ${bindProdutoId.valueerror}`}
                      >
                        <Input
                          defaultValue={data.ProdutoId}
                          name="ProdutoId"
                          type="numeric"
                          {...bindProdutoId}
                        />{" "}
                        {bindProdutoId.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Área</label>
                      <FormGroup
                        className={`has-label ${bindAreaId.valueerror}`}
                      >
                        <Input
                          defaultValue={data.AreaId}
                          name="AreaId"
                          type="numeric"
                          {...bindAreaId}
                        />{" "}
                        {bindAreaId.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Descrição do Segmento</label>
                      <FormGroup
                        className={`has-label ${bindDesc_segmt.valueerror}`}
                      >
                        <Input
                          defaultValue={data.desc_segmt}
                          name="desc_segmt"
                          type="text"
                          {...bindDesc_segmt}
                        />{" "}
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
      )}
    </Fragment>
  );
}
export default SegmentoUpdatee;
