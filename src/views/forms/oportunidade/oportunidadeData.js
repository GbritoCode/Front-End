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
  Label,
  Form,
  Input,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { normalizeHrToMin, normalizeCurrency } from "~/normalize";
import api from "~/services/api";

export default function DataOport() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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
      const response3 = await api.get(`/colab/?data=true&oport=${id}`);
      const response4 = await api.get(`/parametros/?one=true`);
      setData(response.data);
      const imposto =
        (response4.data.IRPJ +
          response4.data.CSLL +
          response4.data.COFINS +
          response4.data.PIS +
          response4.data.INSS +
          response4.data.ISS) /
        100;
      if (response1.data[0]) {
        const custoprevCalculado =
          response4.data.vlrBsHr * response1.data[0].hrsPrevst;
        const impostoCalculado = (
          (imposto * (response1.data[0].vlrLiq / 100)) /
          100
        ).toFixed(2);
        setValues(prevState => ({
          ...prevState,
          impostoPrev: { value: normalizeCurrency(impostoCalculado) },
          totalHrsPrev: {
            value: response1.data[0].hrsPrevst
          },
          custoPrev: {
            value: normalizeCurrency(custoprevCalculado)
          },
          receitaPrev: { value: normalizeCurrency(response1.data[0].recLiq) },
          rentabilidade: {
            value: `${Math.trunc(
              ((response1.data[0].vlrProp - response3.data) /
                response1.data[0].vlrProp) *
                100
            )}%`
          },
          efetividade: {
            value: `${Math.trunc((response3.data / custoprevCalculado) * 100)}%`
          }
        }));
      } else {
        setValues(prevState => ({
          ...prevState,
          totalHrsPrev: { value: 0 },
          receitaPrev: { value: 0 },
          rentabilidade: { value: 0 }
        }));
      }
      setValues(prevState => ({
        ...prevState,
        totalHrsAtual: { value: normalizeHrToMin(response.data.totalHoras) },

        custoReal: {
          value: normalizeCurrency(response3.data)
        }
      }));
      setIsLoading(false);
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
      {isLoading ? (
        <><div className='content' /></>
      ) : (
        <>
          <div className="rna-container" />
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <h3 style={{ marginBottom: 0 }}>Análise</h3>
                    <p style={{ fontSize: 11 }}>
                      {data.cod} | {data.desc}
                    </p>
                    <p style={{ fontSize: 11 }}>{data.Cliente.nomeAbv}</p>
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

                      <Link to={`/update/oportunidade/oport/${id}`}>
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
      )}
    </>
  );
}
