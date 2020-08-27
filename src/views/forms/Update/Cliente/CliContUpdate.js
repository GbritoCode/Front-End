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
    NOME,
    CEL,
    FONE,
    SKYPE,
    EMAIL,
    ANIVER,
    TIPO_CONT,
  }) {
    dispatch(
      CliContUpdate(ClienteId, NOME, CEL, FONE, SKYPE, EMAIL, ANIVER, TIPO_CONT)
    );
    console.log("sadasd");
  }
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
                  <label>CEL</label>
                  <FormGroup>
                    <Input className="cadastro" name="CEL" type="numeric" />
                  </FormGroup>
                  <label>FONE</label>
                  <FormGroup>
                    <Input className="cadastro" name="FONE" type="numeric" />
                  </FormGroup>
                  <label>SKYPE</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="SKYPE"
                      type="text"
                      autoComplete="off"
                    />
                  </FormGroup>
                  <label>EMAIL</label>
                  <FormGroup>
                    <Input className="cadastro" name="EMAIL" type="email" />
                  </FormGroup>
                  <label>ANIVER</label>
                  <FormGroup>
                    <Input className="cadastro" name="ANIVER" type="date" />
                  </FormGroup>{" "}
                  <label>TIPO_CONT</label>
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
