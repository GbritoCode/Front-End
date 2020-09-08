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
import { ClienteRequest } from "~/store/modules/Cliente/actions";
<<<<<<< HEAD
<<<<<<< HEAD
import { store } from "~/store";
=======
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
import { useInput } from "~/hooks.js";
=======

import { Form, Input } from "@rocketseat/unform";
>>>>>>> parent of a3593f1...  dados recebidos em paginass de update

export default function CadastroCliente() {
  const dispatch = useDispatch();

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
  const { value: CNPJ, bind: bindCNPJ, reset: resetCNPJ } = useInput("");
  const {
    value: nome_abv,
    bind: bindNome_abv,
    reset: resetNome_abv,
  } = useInput("");
  const {
    value: representante,
    bind: bindRepresentante,
    reset: resetRepresentante,
  } = useInput("");
  const {
    value: tipo_comiss,
    bind: bindTipo_comiss,
    reset: resetTipo_comiss,
  } = useInput("");
  const {
    value: EmpresaId,
    bind: bindEmpresaId,
    reset: resetEmpresaId,
  } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

=======
  function handleSubmit({
    CNPJ,
    nome_abv,
    representante,
    tipo_comiss,
    EmpresaId,
  }) {
>>>>>>> parent of a3593f1...  dados recebidos em paginass de update
    dispatch(
      ClienteRequest(CNPJ, nome_abv, representante, tipo_comiss, EmpresaId)
    );
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Pré-Cadastro de Cliente</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="cadastro" onSubmit={handleSubmit}>
                  <label>CNPJ</label>
                  <FormGroup>
                    <Input className="cadastro" name="CNPJ" type="text" />
                  </FormGroup>
                  <label>nome_abv</label>
                  <FormGroup>
<<<<<<< HEAD
                    <Input
                      className="cadastro"
                      name="nome_abv"
                      type="text"
                      {...bindNome_abv}
                    />
=======
                    <Input className="cadastro" name="nome_abv" type="text" />
>>>>>>> parent of a3593f1...  dados recebidos em paginass de update
                  </FormGroup>
                  <label>representante</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="representante"
                      type="text"
                    />
                  </FormGroup>
                  <label>tipo_comiss</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="tipo_comiss"
                      type="numeric"
                      autoComplete="off"
                    />
                  </FormGroup>
                  <label>EmpresaId</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="EmpresaId"
<<<<<<< HEAD
<<<<<<< HEAD
                      {...bindEmpresaId}
=======
                      type="numeric"
>>>>>>> parent of a3593f1...  dados recebidos em paginass de update
=======
                      type="numeric"
                      {...bindEmpresaId}
                      maxLength={30}
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
                    />
                  </FormGroup>
                  <FormGroup check className="mt-3">
                    <Label check>
                      <Input name="check" type="checkbox" />
                      <span className="form-check-sign" />
                      Subscribe to newsletter
                    </Label>
                  </FormGroup>
                  <Button
                    style={{ marginTop: 35 }}
                    className="form"
                    color="primary"
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
