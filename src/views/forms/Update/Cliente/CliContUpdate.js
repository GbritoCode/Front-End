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
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { CliContUpdate } from "~/store/modules/Cliente/actions";

import { Form, Input } from "@rocketseat/unform";
import { useParams } from "react-router-dom";

<<<<<<< HEAD
import { useInput } from "hooks.js";

=======
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
export default function CliContUpdatee() {
  const { id } = useParams();

  /*async function loadCliente(id) {
    const res = await fetc(`http://localhost:3001/cliente`);
    res.json().then((res) => setData(res));
  }

  useEffect(() => {
    loadCliente(id);
  });
*/

  const dispatch = useDispatch();

  function handleSubmit({
    ClienteId,
    nome,
    cel,
    fone,
    skype,
    email,
    aniver,
    tipo_conta,
  }) {
    dispatch(
      CliContUpdate(ClienteId, NOME, CEL, FONE, SKYPE, EMAIL, ANIVER, TIPO_CONT)
    );
    console.log("sadasd");
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Atualização de cliente</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="cadastro" onSubmit={handleSubmit}>
                  <label>Nome </label>
                  <FormGroup>
                    <Input
                      disabled={true}
                      value={id}
                      className="cadastro"
                      name="NOME"
                      type="text"
                    />
                  </FormGroup>
                  <label>cel</label>
                  <FormGroup>
<<<<<<< HEAD
                    <Input
                      className="cadastro"
                      name="cel"
                      type="numeric"
                      {...bindCel}
                    />
=======
                    <Input className="cadastro" name="cel" type="numeric" />
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
                  </FormGroup>
                  <label>fone</label>
                  <FormGroup>
<<<<<<< HEAD
                    <Input
                      className="cadastro"
                      name="fone"
                      type="numeric"
                      {...bindFone}
                    />
=======
                    <Input className="cadastro" name="fone" type="numeric" />
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
                  </FormGroup>
                  <label>skype</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="SKYPE"
                      type="text"
                      autoComplete="off"
                    />
                  </FormGroup>
                  <label>email</label>
                  <FormGroup>
<<<<<<< HEAD
                    <Input
                      className="cadastro"
                      name="email"
                      type="email"
                      {...bindEmail}
                    />
=======
                    <Input className="cadastro" name="email" type="email" />
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
                  </FormGroup>
                  <label>aniver</label>
                  <FormGroup>
<<<<<<< HEAD
                    <Input
                      className="cadastro"
                      name="aniver"
                      type="date"
                      {...bindAniver}
                    />
=======
                    <Input className="cadastro" name="aniver" type="date" />
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
                  </FormGroup>{" "}
                  <label>tipo_conta</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="TIPO_CONT"
                      type="numeric"
                    />
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
