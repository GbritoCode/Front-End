import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
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

import { useInput } from "~/hooks";
import history from "~/services/history";
import { forgotPass } from "~/store/modules/user/actions";
import { ReactLoadingContainer } from "~/components/DIvs/reacLoadingContainer";

// reactstrap components

export default function ForgotPass() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const status1 = useSelector(state => state.user.status);
  const dispatch = useDispatch();
  const [emailFocus, setEmailFocus] = useState("");
  const [status, setStatus] = useState(status1);
  const { value: email, bind: bindEmail } = useInput("");

  useEffect(() => {
    setStatus(status1);
  }, [dispatch, status1]);

  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = evt => {
    evt.preventDefault();

    dispatch(forgotPass({ email }));
    setStatus(status1);
    console.log(status1);
  };

  return (
    <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Card hidden={status !== "sent"} className="card-login card-white">
              <CardHeader>
                <img alt="..." src={require("assets/img/card-info.png")} />
                <CardTitle tag="h2">Recuperar Senha</CardTitle>
              </CardHeader>
              <CardBody>
                <p style={{ justifyContent: "center", textAlign: "center" }}>
                  Verifique o email {email} para visualizar os dados de acesso
                </p>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  block
                  className="mb-3"
                  color="info"
                  size="lg"
                  onClick={() => history.push("/login")}
                >
                  Ok
                </Button>
              </CardFooter>
            </Card>
            <Card
              hidden={status !== "loading"}
              className="card-login card-white"
            >
              <CardHeader>
                <img alt="..." src={require("assets/img/card-info.png")} />
                <CardTitle tag="h2">Recuperar Senha</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactLoadingContainer>
                  <ReactLoading
                    type="spin"
                    color="grey"
                    height="19%"
                    width="19%"
                  />
                </ReactLoadingContainer>
              </CardBody>
              <CardFooter />
            </Card>
            <Form
              hidden={status !== "default"}
              className="form"
              onSubmit={handleSubmit}
            >
              <Card className="card-login card-white">
                <CardHeader>
                  <img alt="..." src={require("assets/img/card-info.png")} />
                  <CardTitle tag="h2">Recuperar Senha</CardTitle>
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
                  <div className="pull-right">
                    <h6>
                      <a
                        style={{ color: "blue", fontSize: "9px" }}
                        className="link footer-link"
                        href="/login"
                      >
                        Ir para Login
                      </a>
                    </h6>
                  </div>
                </CardBody>
                <CardFooter>
                  <Button
                    type="submit"
                    block
                    className="mb-3"
                    color="info"
                    size="lg"
                  >
                    {loading ? "Carregando..." : "Enviar"}
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Container>
      </div>
    </>
  );
}
