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
import ReactDatetime from "react-datetime";

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
import { CliContUpdate } from "~/store/modules/Cliente/actions";
import { useParams } from "react-router-dom";
import { useInput } from "hooks.js";
import axios from "axios";

export default function CliContUpdatee() {
  const { id } = useParams();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/cliente/cont/${id}`);
      setData(response.data[0]);
      setIsLoading(false);
    }
    loadData();
  }, []);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const { value: ClienteId, bind: bindClienteId } = useInput();
  const { value: nome, bind: bindNome } = useInput();
  const { value: cel, bind: bindCel } = useInput();
  const { value: fone, bind: bindFone } = useInput();
  const { value: skype, bind: bindSkype } = useInput();
  const { value: email, bind: bindEmail } = useInput();
  const { value: aniver, bind: bindAniver } = useInput();
  const { value: tipo_conta, bind: bindTipo_conta } = useInput();
  console.log(data);

  const handleSubmit = (evt) => {
    evt.preventDefault();

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
                    <CardTitle tag="h4">Atualização de cliente</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <form className="cadastro" onSubmit={handleSubmit}>
                      <Label>Nome </Label>
                      <FormGroup>
                        <Input
                          className="cadastro"
                          name="nome"
                          type="text"
                          defaultValue={data.nome}
                          {...bindNome}
                        />
                      </FormGroup>
                      <Row>
                        <Col md="4">
                          <Label>Celular</Label>
                          <FormGroup>
                            <Input
                              className="cadastro"
                              name="cel"
                              type="numeric"
                              defaultValue={data.cel}
                              {...bindCel}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Telefone</Label>
                          <FormGroup>
                            <Input
                              className="cadastro"
                              name="fone"
                              type="numeric"
                              defaultValue={data.fone}
                              {...bindFone}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Aniversário </Label>
                            <ReactDatetime
                              inputProps={{
                                className: "form-control",
                              }}
                              defaultValue={data.aniver}
                              {...bindAniver}
                            />
                          </FormGroup>{" "}
                          {""}
                        </Col>
                      </Row>
                      <Label>Skype</Label>
                      <FormGroup>
                        <Input
                          className="cadastro"
                          name="skype"
                          type="text"
                          defaultValue={data.skype}
                          {...bindSkype}
                        />
                      </FormGroup>
                      <Label>Email</Label>
                      <FormGroup>
                        <Input
                          className="cadastro"
                          name="email"
                          type="email"
                          defaultValue={data.email}
                          {...bindEmail}
                        />
                      </FormGroup>
                      <Label>Tipo de Conta</Label>
                      <FormGroup>
                        <Input
                          className="cadastro"
                          name="tipo_conta"
                          type="numeric"
                          defaultValue={data.tipo_conta}
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
                    </form>
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
