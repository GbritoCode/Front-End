import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "@rocketseat/unform";
import * as yup from "yup";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

import { signInRequest } from "~/store/modules/auth/actions";

import "~/auth.css";

// reactstrap components

const Schema = yup.object().shape({
  email: yup
    .string()
    .email("Insira um email válido")
    .required("o email é obrigatório"),
  password: yup.string().required("A senha é obrigatória"),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  /*return 
    <>
      <img alt="GoBarber" />
      <Form schema={Schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">{loading ? "Carregando..." : "Acessar"}</button>
        <Link to="/register">Criar conta</Link>
      </Form>
    </>
  );*/
  return (
    <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Form className="auth" schema={Schema} onSubmit={handleSubmit}>
              <Card className="card-login card-white">
                <CardHeader>
                  <img alt="..." src={require("assets/img/card-primary.png")} />
                  <CardTitle tag="h1">Log in</CardTitle>
                </CardHeader>
                <CardBody>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      className="auth"
                      name="email"
                      type="email"
                      placeholder="E-mail"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-lock-circle" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      className="auth"
                      name="password"
                      type="password"
                      placeholder="Senha"
                    />
                  </InputGroup>
                </CardBody>
                <CardFooter>
                  <Button
                    type="submit"
                    block
                    className="mb-3"
                    color="primary"
                    size="lg"
                  >
                    {loading ? "Carregando..." : "Acessar"}
                  </Button>
                  <div className="pull-left">
                    <h6>
                      <a className="link footer-link" href="/register">
                        Criar Conta
                      </a>
                    </h6>
                  </div>
                  <div className="pull-right">
                    <h6>
                      <a
                        className="link footer-link"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Need Help?
                      </a>
                    </h6>
                  </div>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Container>
      </div>
    </>
  );
}
