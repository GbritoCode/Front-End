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
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";

// reactstrap components
import {
  Card,
  CardBody,
  Form,
  Label,
  Input,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import NotificationAlert from "react-notification-alert";

const CliCompCadastro = forwardRef((props, ref) => {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const firstRender = useRef(true);
  let options = useRef();

  const stateSchema = {
    CondPgmtoId: { value: 1, error: "", message: "" },
    inscMun: { value: "ISENTO", error: "", message: "" },
    inscEst: { value: "ISENTO", error: "", message: "" }
  };
  const optionalSchema = {
    complemento: { value: "", error: "", message: "" }
  };

  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);

  const [finalState, setFinalState] = useState();
  options = {};

  const notifyElment = useRef(document.getElementById("not"));
  function notify() {
    notifyElment.current.notificationAlert(options);
  }
  useEffect(() => {
    // ------------------- busca de dados das apis, e setar as variáveis que dependem das apis
    async function loadData() {}
    if (firstRender.current) {
      firstRender.current = false;
      loadData();
    }
  }, []);

  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const handleChange = (event, name, type) => {
    event.persist();
    const target = event.target.value;
    switch (type) {
      case "number":
        if (verifyNumber(target)) {
          setValues(prevState => ({
            ...prevState,
            [name]: { value: target, error: "has-success" }
          }));
        } else {
          setValues(prevState => ({
            ...prevState,
            [name]: {
              value: target,
              error: "has-danger",
              message: "Insira um número válido"
            }
          }));
        }
        break;
      case "optional":
        setOptional(prevState => ({
          ...prevState,
          [name]: { value: target }
        }));
        break;
      case "text":
        setValues(prevState => ({
          ...prevState,
          [name]: { value: target }
        }));
        break;
      default:
    }
  };

  const isValidated = () => {
    const aux = Object.entries(values);
    const tamanho = aux.length;

    for (let i = 0; i < tamanho; i++) {
      if (!(aux[i][1].error === "has-danger")) {
        var valid = true;
      } else {
        valid = false;
        break;
      }
    }
    for (let j = 0; j < tamanho; j++) {
      if (aux[j][1].value !== "") {
        var filled = true;
      } else {
        filled = false;
        setValues(prevState => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" }
        }));
        break;
      }
    }

    if (valid && filled) {
      setFinalState({
        inscMun: values.inscMun.value,
        inscEst: values.inscEst.value,
        CondPgmtoId: values.CondPgmtoId.value,
        complemento: optional.complemento.value
      });
      return true;
    }
    options = {
      place: "tr",
      message: (
        <div>
          <div>Ops! Há algo errado</div>
        </div>
      ),
      type: "danger",
      icon: "tim-icons icon-alert-circle-exc",
      autoDismiss: 7
    };
    notify();
  };

  useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    state: finalState
  }));

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notifyElment} id="not" />
      </div>{" "}
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="4">
                      <Label>CEP</Label>
                      <FormGroup className="has-label">
                        <Input disabled id="cep" name="cep" type="text" />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Rua</Label>
                      <FormGroup className="has-label">
                        <Input disabled id="rua" name="rua" type="text" />
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <Label>Número</Label>
                      <FormGroup className="has-label ">
                        <Input disabled id="numero" name="numero" type="text" />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="8">
                      <Label>Complemento</Label>
                      <FormGroup
                        className={`has-label ${optional.complemento.error}`}
                      >
                        <Input
                          onChange={event =>
                            handleChange(event, "complemento", "optional")
                          }
                          id="complemento"
                          name="complemento"
                          type="text"
                        />
                        {optional.complemento.error === "has-danger" ? (
                          <Label className="error">
                            {optional.complemento.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Bairro</Label>
                      <FormGroup className="has-label ">
                        <Input disabled id="bairro" name="bairro" type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <Label>Cidade</Label>
                      <FormGroup className="has-label ">
                        <Input disabled id="cidade" name="cidade" type="text" />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>UF</Label>
                      <FormGroup className="has-label ">
                        <Input disabled id="uf" name="uf" type="text" />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Inscrição Municipal</Label>
                      <FormGroup
                        className={`has-label ${values.inscMun.error}`}
                      >
                        <Input
                          onChange={event =>
                            handleChange(event, "inscMun", "text")
                          }
                          value={values.inscMun.value}
                          name="inscMun"
                          type="numeric"
                        />
                        {values.inscMun.error === "has-danger" ? (
                          <Label className="error">
                            {values.inscMun.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <Label>Inscrição Estadual</Label>
                      <FormGroup
                        className={`has-label ${values.inscEst.error}`}
                      >
                        <Input
                          onChange={event =>
                            handleChange(event, "inscEst", "text")
                          }
                          value={values.inscEst.value}
                          name="inscEst"
                          type="numeric"
                        />
                        {values.inscEst.error === "has-danger" ? (
                          <Label className="error">
                            {values.inscEst.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4" />
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
});
export default CliCompCadastro;
