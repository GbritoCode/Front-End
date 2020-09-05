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

  const [data, setData] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/cliente/cont/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setData(response[0]);
        console.log(response);
      });
  }, []);
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
      CliContUpdate(
        ClienteId,
        nome,
        cel,
        fone,
        skype,
        email,
        aniver,
        tipo_conta
      )
    );
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
                <Form
                  className="cadastro"
                  onSubmit={handleSubmit}
                  initialData={data}
                >
                  <label>Nome </label>
                  <FormGroup>
                    <Input
                      disabled={true}
                      value={id}
                      className="cadastro"
                      name="nome"
                      type="text"
                    />
                  </FormGroup>
                  <label>cel</label>
                  <FormGroup>
                    <Input className="cadastro" name="cel" type="numeric" />
                  </FormGroup>
                  <label>fone</label>
                  <FormGroup>
                    <Input className="cadastro" name="fone" type="numeric" />
                  </FormGroup>
                  <label>skype</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="skype"
                      type="text"
                      autoComplete="off"
                    />
                  </FormGroup>
                  <label>email</label>
                  <FormGroup>
                    <Input className="cadastro" name="email" type="email" />
                  </FormGroup>
                  <label>aniver</label>
                  <FormGroup>
                    <Input className="cadastro" name="aniver" type="date" />
                  </FormGroup>{" "}
                  <label>tipo_conta</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="tipo_conta"
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
