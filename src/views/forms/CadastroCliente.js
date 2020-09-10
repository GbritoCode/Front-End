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
  Label,
  Form,
  Input,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { ClienteRequest } from "~/store/modules/Cliente/actions";
import { store } from "~/store";
import { useInput } from "~/hooks.js";

export default function CadastroCliente() {
  const dispatch = useDispatch();
  const empresa = store.getState().auth.empresa;
  const [data, setData] = useState();
  const [cnpjError, setCnpjError] = useState(false);

  /*
  useEffect(() => {
    const empresa = store.getState().auth.empresa;

    fetch(`http://localhost:3001/empresa/${empresa}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setData(response.id);
      });
  }, []);

  const aa = data;
  console.log(aa);
  */
  const { value: CNPJ, bind: bindCNPJ } = useInput("", "number");
  const { value: nome_abv, bind: bindNome_abv } = useInput("");
  const { value: representante, bind: bindRepresentante } = useInput("");
  const { value: tipo_comiss, bind: bindTipo_comiss } = useInput("", "number");
  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa, "number");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(
      ClienteRequest(CNPJ, nome_abv, representante, tipo_comiss, EmpresaId)
    );
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cliente</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Label>Empresa</Label>
                  <FormGroup
                    className={`has-label ${bindEmpresaId.valueerror}`}
                  >
                    <Input
                      disabled={true}
                      name="EmpresaId"
                      {...bindEmpresaId}
                    />
                    {bindEmpresaId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>
                  <Label>CNPJ</Label>
                  <FormGroup className={`has-label ${bindCNPJ.valueerror}`}>
                    <Input name="CNPJ" type="text" {...bindCNPJ} />
                    {bindCNPJ.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>
                  <Label>Nome Abreviado</Label>
                  <FormGroup className={`has-label ${bindNome_abv.valueerror}`}>
                    <Input name="name_abv" type="text" {...bindNome_abv} />
                    {bindNome_abv.valueerror === "has-danger" ? (
                      <label className="error">Insira um nome válido</label>
                    ) : null}
                  </FormGroup>
                  <Label>Representante</Label>
                  <FormGroup
                    className={`has-label ${bindRepresentante.valueerror}`}
                  >
                    <Input
                      name="representante"
                      type="text"
                      {...bindRepresentante}
                    />
                    {bindRepresentante.valueerror === "has-danger" ? (
                      <label className="error">Insira um nome válido</label>
                    ) : null}
                  </FormGroup>
                  <Label>Tipo Comissão</Label>
                  <FormGroup
                    className={`has-label ${bindTipo_comiss.valueerror}`}
                  >
                    <Input
                      name="tipo_comiss"
                      type="numeric"
                      {...bindTipo_comiss}
                    />
                    {bindTipo_comiss.valueerror === "has-danger" ? (
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
