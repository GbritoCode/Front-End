import React, { useState } from "react";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "hooks.js";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

import { signUpRequest } from "~/store/modules/auth/actions";

export default function SignUp() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const { value: name, bind: bindName } = useInput("");
  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
  const [emailFocus, setEmailFocus] = useState("");
  const [nameFocus, setNameFocus] = useState("");
  const [passFocus, setPassFocus] = useState("");
  const loading = useSelector((state) => state.auth.loading);

  const errorCheckAux = [bindName, bindEmail, bindPassword];
  const colab = false
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
      dispatch(signUpRequest(name, email, password, colab));
    }
  };
  return (
    <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="7" md="10">
            <Form onSubmit={handleSubmit}>
              <Card className="card-login card-white">
                <CardHeader>
                  <img alt="..." src={require("assets/img/card-primary.png")} />
                  <CardTitle tag="h1">Sign Up</CardTitle>
                </CardHeader>
                <CardBody>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": nameFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      onBlur={(e) => {
                        setNameFocus(false);
                      }}
                      onFocus={(e) => {
                        setNameFocus(true);
                      }}
                      name="name"
                      placeholder="Full Name"
                      type="text"
                      {...bindName}
                    />
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": emailFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      onBlur={(e) => {
                        setEmailFocus(false);
                      }}
                      onFocus={(e) => {
                        setEmailFocus(true);
                      }}
                      name="email"
                      type="email"
                      placeholder="E-mail"
                      {...bindEmail}
                    />
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": passFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-lock-circle" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      onBlur={(e) => {
                        setPassFocus(false);
                      }}
                      onFocus={(e) => {
                        setPassFocus(true);
                      }}
                      name="password"
                      type="password"
                      placeholder="Senha"
                      {...bindPassword}
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
/*
  return (
    <>
      <img alt="GoBarber" />
      <Form schema={Schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">{loading ? "Aguarde" : "Cadastrar"}</button>
        <Link to="/">já tenho login</Link>
      </Form>
    </>
  );
}
*/
