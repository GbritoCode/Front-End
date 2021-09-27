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
  useImperativeHandle,
  forwardRef
} from "react";

// reactstrap components
import {
  Card,
  CardBody,
  Label,
  Form,
  Input,
  FormGroup,
  Row,
  Col
} from "reactstrap";

const CliContCadastro = forwardRef((props, ref) => {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const [isLoading, setIsLoading] = useState(true);
  const stateSchema = {
    erp: { value: "", error: "", message: "", optional: true },
    database: { value: "", error: "", message: "", optional: true },
    ramo: { value: "", error: "", message: "", optional: true },
    setor: { value: "", error: "", message: "", optional: true },
    qtdFuncionarios: { value: "", error: "", message: "", optional: true }
  };

  const [values, setValues] = useState(stateSchema);
  const [finalState, setFinalState] = useState();

  useEffect(() => {
    async function loadData() {
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleChange = (event, name, type) => {
    event.persist();
    const target = event.target.value;
    switch (type) {
      case "optional":
        setValues(prevState => ({
          ...prevState,
          [name]: { value: target, optional: true }
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
    setFinalState({
      erp: values.erp.value,
      database: values.database.value,
      ramo: values.ramo.value,
      setor: values.setor.value,
      qtdFuncionarios: values.qtdFuncionarios.value
    });
    return true;
  };

  useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    state: finalState
  }));

  return (
    <>
      {isLoading ? (
        <>
          <div className="content" />
        </>
      ) : (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardBody>
                    <Form id="RegisterValidation">
                      <Row>
                        <Col md="4">
                          <Label>ERP</Label>
                          <FormGroup
                            className={`has-label ${values.erp.error}`}
                          >
                            <Input
                              name="erp"
                              type="text"
                              onChange={event =>
                                handleChange(event, "erp", "optional")
                              }
                              value={values.erp.value}
                            />
                            {values.erp.error === "has-danger" ? (
                              <Label className="error">
                                {values.erp.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Banco De Dados</Label>
                          <FormGroup
                            className={`has-label ${values.database.error}`}
                          >
                            <Input
                              name="database"
                              type="text"
                              onChange={event =>
                                handleChange(event, "database", "optional")
                              }
                              value={values.database.value}
                            />
                            {values.database.error === "has-danger" ? (
                              <Label className="error">
                                {values.database.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Ramo</Label>
                          <FormGroup
                            className={`has-label ${values.ramo.error}`}
                          >
                            <Input
                              name="ramo"
                              type="text"
                              onChange={event =>
                                handleChange(event, "ramo", "optional")
                              }
                              value={values.ramo.value}
                            />
                            {values.ramo.error === "has-danger" ? (
                              <Label className="error">
                                {values.ramo.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="4">
                          <Label>Setor</Label>
                          <FormGroup
                            className={`has-label ${values.setor.error}`}
                          >
                            <Input
                              name="setor"
                              type="text"
                              onChange={event =>
                                handleChange(event, "setor", "optional")
                              }
                              value={values.setor.value}
                            />
                            {values.setor.error === "has-danger" ? (
                              <Label className="error">
                                {values.setor.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Quantidade de Funcionários</Label>
                          <FormGroup
                            className={`has-label ${values.qtdFuncionarios.error}`}
                          >
                            <Input
                              name="qtdFuncionarios"
                              type="text"
                              onChange={event =>
                                handleChange(
                                  event,
                                  "qtdFuncionarios",
                                  "optional"
                                )
                              }
                              value={values.qtdFuncionarios.value}
                            />
                            {values.qtdFuncionarios.error === "has-danger" ? (
                              <Label className="error">
                                {values.qtdFuncionarios.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
});

export default CliContCadastro;
