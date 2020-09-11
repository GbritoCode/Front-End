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
import { itmControleUpdate } from "~/store/modules/general/actions";
import { useParams, Link } from "react-router-dom";
import { useInput } from "hooks.js";
import axios from "axios";

function ItmCtrlUpdatee() {
  const { id } = useParams();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/itm_controle/${id}`);
      setData(response.data);
      setIsLoading(false);
    }
    loadData();
  }, []);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const { value: EmpresaId, bind: bindEmpresaId } = useInput(
    undefined,
    "number"
  );
  const { value: desc_item, bind: bindDesc_item } = useInput(undefined);
  const { value: tipo_item, bind: bindTipo_item } = useInput(
    undefined,
    "number"
  );
  const { value: conta_contabil, bind: bindConta_contabil } = useInput(
    undefined,
    "number"
  );
  const { value: cent_custo, bind: bindCent_custo } = useInput(
    undefined,
    "number"
  );

  const errorCheckAux = [
    bindEmpresaId,
    bindDesc_item,
    bindTipo_item,
    bindConta_contabil,
    bindCent_custo,
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
        itmControleUpdate(
          id,
          EmpresaId,
          desc_item,
          tipo_item,
          conta_contabil,
          cent_custo
        )
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
                    <Link to="/cadastro/geral/itm_controle">
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
                          defaultValue={EmpresaId}
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
                      <label>Descrição do Item</label>
                      <FormGroup
                        className={`has-label ${bindDesc_item.valueerror}`}
                      >
                        <Input
                          defaultValue={data.desc_item}
                          name="desc_item"
                          type="text"
                          {...bindDesc_item}
                        />
                        {bindDesc_item.valueerror === "has-danger" ? (
                          <label className="error">
                            Insira um valor válido
                          </label>
                        ) : null}
                      </FormGroup>
                      <label>Tipo de Item</label>
                      <FormGroup
                        className={`has-label ${bindTipo_item.valueerror}`}
                      >
                        <Input
                          defaultValue={data.tipo_item}
                          name="tipo_item"
                          type="numeric"
                          {...bindTipo_item}
                        />
                        {bindTipo_item.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>
                      <label>Conta Contábil</label>
                      <FormGroup
                        className={`has-label ${bindConta_contabil.valueerror}`}
                      >
                        <Input
                          defaultValue={data.conta_contabil}
                          name="conta_contabil"
                          type="numeric"
                          {...bindConta_contabil}
                        />
                        {bindConta_contabil.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>
                      <label>cent_custo</label>
                      <FormGroup
                        className={`has-label ${bindCent_custo.valueerror}`}
                      >
                        <Input
                          defaultValue={data.cent_custo}
                          name="cent_custo"
                          type="numeric"
                          {...bindCent_custo}
                        />
                        {bindCent_custo.valueerror === "has-danger" ? (
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
export default ItmCtrlUpdatee;
