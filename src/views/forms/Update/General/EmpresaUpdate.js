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
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { EmpresaUpdate } from "~/store/modules/general/actions";
import { useParams, Link } from "react-router-dom";
import { useInput } from "hooks.js";
import axios from "axios";

function EmpresaUpdatee() {
  const { id } = useParams();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/empresa/${id}`);
      setData(response.data);
      setIsLoading(false);
    }
    loadData();
  }, []);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const { value: nome, bind: bindNome } = useInput(undefined);
  const { value: license, bind: bindLicense } = useInput(undefined);
  const { value: UserId, bind: bindUserId } = useInput(undefined, "number");

  const errorCheckAux = [bindNome, bindLicense, bindUserId];
  const handleSubmit = (evt) => {
    evt.preventDefault();

    var tamanho = errorCheckAux.length;
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
      dispatch(EmpresaUpdate(id, nome, license, UserId));
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
                    <CardTitle tag="h4">Edição de Empresa</CardTitle>
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
                      <label>CNPJ</label>
                      <FormGroup>
                        <Input
                          defaultValue={data.id_federal}
                          disabled={true}
                          name="id_federal"
                          type="text"
                        />
                      </FormGroup>

                      <label>Nome</label>
                      <FormGroup className={`has-label ${bindNome.valueerror}`}>
                        <Input
                          defaultValue={data.nome}
                          name="nome"
                          type="text"
                          {...bindNome}
                        />
                        {bindNome.valueerror === "has-danger" ? (
                          <label className="error">Insira um nome válido</label>
                        ) : null}
                      </FormGroup>

                      <label>License</label>
                      <FormGroup
                        className={`has-label ${bindLicense.valueerror}`}
                      >
                        <Input
                          defaultValue={data.license}
                          name="license"
                          type="text"
                          {...bindLicense}
                        />
                        {bindLicense.valueerror === "has-danger" ? (
                          <label className="error">
                            Insira um valor válido
                          </label>
                        ) : null}
                      </FormGroup>

                      <label>Usuário</label>
                      <FormGroup
                        className={`has-label ${bindUserId.valueerror}`}
                      >
                        <Input
                          defaultValue={data.UserId}
                          name="UserId"
                          type="numeric"
                          {...bindUserId}
                        />
                        {bindUserId.valueerror === "has-danger" ? (
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
export default EmpresaUpdatee;
