import React, { useState } from "react";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";

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
  Col
} from "reactstrap";

import { signInRequest } from "~/store/modules/auth/actions";
import { useInput } from "~/hooks";

// reactstrap components

export default function SignIn() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const [emailFocus, setEmailFocus] = useState("");
  const [passFocus, setPassFocus] = useState("");
  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");

  const loading = useSelector(state => state.auth.loading);

  const errorCheckAux = [bindEmail, bindPassword];
  const handleSubmit = evt => {
    evt.preventDefault();

    var tamanho = errorCheckAux.length;
    console.log(errorCheckAux.length);
    for (var j = 0; j < tamanho; j++) {
      if (
        !(errorCheckAux[j].valueerror === "has-danger") &&
        !(errorCheckAux[j].value === "")
      ) {
        var valid = true;
      } else {
        valid = false;
        break;
      }
    }
    if (valid) {
      dispatch(signInRequest(email, password));
    }
  };

  return (
    <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Form className="form" onSubmit={handleSubmit}>
              <Card className="card-login card-white">
                <CardHeader>
                  <img alt="..." src={require("assets/img/card-primary.png")} />
                  <CardTitle tag="h1">Log in</CardTitle>
                </CardHeader>
                <CardBody>
                  <InputGroup
                    className={classnames({
                      "input-group-focus": emailFocus
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      onBlur={() => {
                        setEmailFocus(false);
                      }}
                      onFocus={() => {
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
                      "input-group-focus": passFocus
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-lock-circle" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      onBlur={() => {
                        setPassFocus(false);
                      }}
                      onFocus={() => {
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
                        onClick={e => e.preventDefault()}
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
