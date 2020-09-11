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
import { AreaUpdate } from "~/store/modules/general/actions";
import { useParams, Link } from "react-router-dom";
import { useInput } from "hooks.js";
import axios from "axios";

function AreaUpdatee() {
  const { id } = useParams();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/area/${id}`);
      setData(response.data);
      setIsLoading(false);
    }
    loadData();
  }, []);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const { value: EmpresaId, bind: bindEmpresaId } = useInput();
  const { value: desc_area, bind: bindDesc_area } = useInput();

  const errorCheckAux = [bindEmpresaId, bindDesc_area];
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
      dispatch(AreaUpdate(id, EmpresaId, desc_area));
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

                      <label>Descrição Área</label>
                      <FormGroup
                        className={`has-label ${bindDesc_area.valueerror}`}
                      >
                        <Input
                          defaultValue={data.desc_area}
                          name="desc_area"
                          type="text"
                          {...bindDesc_area}
                        />
                        {bindDesc_area.valueerror === "has-danger" ? (
                          <label className="error">
                            Insira um valor válido
                          </label>
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
export default AreaUpdatee;
