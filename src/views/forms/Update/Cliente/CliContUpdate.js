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
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { CliContUpdate } from "~/store/modules/Cliente/actions";

import { useParams } from "react-router-dom";

import { useInput } from "hooks.js";

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

  const { value: ClienteId, bind: bindClienteId } = useInput("");
  const { value: nome, bind: bindNome } = useInput("");
  const { value: cel, bind: bindCel } = useInput("");
  const { value: fone, bind: bindFone } = useInput("");
  const { value: skype, bind: bindSkype } = useInput("");
  const { value: email, bind: bindEmail } = useInput("");
  const { value: aniver, bind: bindAniver } = useInput("");
  const { value: tipo_conta, bind: bindTipo_conta } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

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
                      className="cadastro"
                      name="NOME"
                      type="text"
                      {...bindNome}
                    />
                  </FormGroup>
                  <label>Celular</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="cel"
                      type="numeric"
                      {...bindCel}
                    />
                  </FormGroup>
                  <label>Telefone</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="fone"
                      type="numeric"
                      {...bindFone}
                    />
                  </FormGroup>
                  <label>Skype</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="SKYPE"
                      type="text"
                      {...bindSkype}
                    />
                  </FormGroup>
                  <label>Email</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="email"
                      type="email"
                      {...bindEmail}
                    />
                  </FormGroup>
                  <label>Aniversário</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="aniver"
                      type="date"
                      {...bindAniver}
                    />
                  </FormGroup>{" "}
                  <label>Tipo de Conta</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="TIPO_CONT"
                      type="numeric"
                      {...bindTipo_conta}
                    />
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
