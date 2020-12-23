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
  Label,
  Form,
  Input,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import {
  normalizeHrToMin,
  normalizeCurrency,
  normalizeCalcCurrency
} from "~/normalize";
import api from "~/services/api";

export default function DataOport() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const { id } = useParams();

  const stateSchema = {
    totalHrsAtual: { value: "", error: "", message: "" },
    totalHrsPrev: { value: "", error: "", message: "" },
    receitaPrev: { value: "", error: "", message: "" },
    impostoPrev: { value: "", error: "", message: "" },
    custoPrev: { value: "", error: "", message: "" },
    custoReal: { value: "", error: "", message: "" },
    efetividade: { value: "", error: "", message: "" },
    rentabilidade: { value: "", error: "", message: "" }
  };

  const [values, setValues] = useState(stateSchema);
  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/oportunidade/${id}`);
      const response1 = await api.get(`/cotacao/${id}/?one=true`);
      const response2 = await api.get(`/recurso/${id}/?total=true`);
      const response3 = await api.get(`/colab/?data=true&oport=${id}`);

      setValues(prevState => ({
        ...prevState,
        totalHrsAtual: { value: normalizeHrToMin(response.data.totalHoras) },
        totalHrsPrev: {
          value: normalizeHrToMin(response1.data[0].hrsPrevst)
        },
        receitaPrev: { value: normalizeCurrency(response1.data[0].recLiq) },
        custoPrev: {
          value: normalizeCurrency(response2.data)
        },
        custoReal: {
          value: normalizeCurrency(response3.data)
        },
        efetividade: {
          value: normalizeCurrency(response3.data / response2.data)
        },
        rentabilidade: {
          value: normalizeCalcCurrency(
            (response1.data[0].vlrProp - response3.data) /
              response1.data[0].vlrProp
          )
        }
      }));
    }
    loadData();
  }, [id]);

  const handleChange = (event, name, type) => {
    event.persist();
    const target = event.target.value;
    switch (type) {
      case "text":
        setValues(prevState => ({
          ...prevState,
          [name]: { value: target }
        }));
        break;
      default:
    }
  };
  return (
    <>
      <div className="rna-container" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Oportunidade</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="4">
                      <Label>Total de Horas Atual</Label>
                      <FormGroup
                        className={`has-label ${values.totalHrsAtual.error}`}
                      >
                        <Input
                          disabled
                          name="totalHrsAtual"
                          type="text"
                          onChange={event =>
                            handleChange(event, "totalHrsAtual", "text")
                          }
                          value={values.totalHrsAtual.value}
                        />
                        {values.totalHrsAtual.error === "has-danger" ? (
                          <Label className="error">
                            {values.totalHrsAtual.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Total de Horas Previsto</Label>
                      <FormGroup
                        className={`has-label ${values.totalHrsPrev.error}`}
                      >
                        <Input
                          disabled
                          name="totalHrsPrev"
                          type="text"
                          onChange={event =>
                            handleChange(event, "totalHrsPrev", "text")
                          }
                          value={values.totalHrsPrev.value}
                        />
                        {values.totalHrsPrev.error === "has-danger" ? (
                          <Label className="error">
                            {values.totalHrsPrev.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Receita Prevista</Label>
                      <FormGroup
                        className={`has-label ${values.receitaPrev.error}`}
                      >
                        <Input
                          disabled
                          name="receitaPrev"
                          type="text"
                          onChange={event =>
                            handleChange(event, "receitaPrev", "text")
                          }
                          value={values.receitaPrev.value}
                        />
                        {values.receitaPrev.error === "has-danger" ? (
                          <Label className="error">
                            {values.receitaPrev.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <Label>Imposto Previsto</Label>
                      <FormGroup
                        className={`has-label ${values.impostoPrev.error}`}
                      >
                        <Input
                          disabled
                          name="impostoPrev"
                          type="text"
                          onChange={event =>
                            handleChange(event, "impostoPrev", "text")
                          }
                          value={values.impostoPrev.value}
                        />
                        {values.impostoPrev.error === "has-danger" ? (
                          <Label className="error">
                            {values.impostoPrev.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Custo Previsto</Label>
                      <FormGroup
                        className={`has-label ${values.custoPrev.error}`}
                      >
                        <Input
                          disabled
                          name="custoPrev"
                          type="text"
                          onChange={event =>
                            handleChange(event, "custoPrev", "text")
                          }
                          value={values.custoPrev.value}
                        />
                        {values.custoPrev.error === "has-danger" ? (
                          <Label className="error">
                            {values.custoPrev.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Custo Real</Label>
                      <FormGroup
                        className={`has-label ${values.custoReal.error}`}
                      >
                        <Input
                          disabled
                          name="custoReal"
                          type="text"
                          onChange={event =>
                            handleChange(event, "custoReal", "text")
                          }
                          value={values.custoReal.value}
                        />
                        {values.custoReal.error === "has-danger" ? (
                          <Label className="error">
                            {values.custoReal.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <Label>Efetividade</Label>
                      <FormGroup
                        className={`has-label ${values.efetividade.error}`}
                      >
                        <Input
                          disabled
                          name="efetividade"
                          type="text"
                          onChange={event =>
                            handleChange(event, "efetividade", "text")
                          }
                          value={values.efetividade.value}
                        />
                        {values.efetividade.error === "has-danger" ? (
                          <Label className="error">
                            {values.efetividade.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Rentabilidade</Label>
                      <FormGroup
                        className={`has-label ${values.rentabilidade.error}`}
                      >
                        <Input
                          disabled
                          name="rentabilidade"
                          type="text"
                          onChange={event =>
                            handleChange(event, "rentabilidade", "text")
                          }
                          value={values.rentabilidade.value}
                        />
                        {values.rentabilidade.error === "has-danger" ? (
                          <Label className="error">
                            {values.rentabilidade.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Link to={`update/oportunidade/oport/${id}`}>
                    <Button
                      style={{
                        paddingLeft: 32,
                        paddingRight: 33
                      }}
                      color="secundary"
                      size="small"
                      className="form"
                    >
                      <i
                        className="tim-icons icon-double-left"
                        style={{
                          paddingBottom: 4,
                          paddingRight: 1
                        }}
                        size="large"
                      />{" "}
                      Voltar
                    </Button>
                  </Link>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
