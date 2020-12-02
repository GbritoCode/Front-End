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
import React, { useRef, Fragment, useEffect, useState } from "react";

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
import { SegmentoUpdate } from "~/store/modules/general/actions";
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import axios from "axios";

function SegmentoUpdatee() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    UndNegId: { value: "", error: "", message: "" },
    ProdutoId: { value: "", error: "", message: "" },
    AreaId: { value: "", error: "", message: "" },
    descSegmt: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:51314/segmento/${id}`);
      const response1 = await axios(`http://localhost:51314/und_neg/`);
      const response2 = await axios(`http://localhost:51314/prodt/`);
      const response3 = await axios(`http://localhost:51314/area/`);
      const response4 = await axios(
        `http://localhost:51314/empresa/${response.data.EmpresaId}`
      );
      setData(response.data);
      setData1(response1.data);
      setData2(response2.data);
      setData3(response3.data);
      setData4(response4.data);
      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response4.data.id },
      }));
      setValues((prevState) => ({
        ...prevState,
        UndNegId: { value: response.data.UndNegId },
      }));
      setValues((prevState) => ({
        ...prevState,
        ProdutoId: { value: response.data.ProdutoId },
      }));
      setValues((prevState) => ({
        ...prevState,
        AreaId: { value: response.data.AreaId },
      }));
      setValues((prevState) => ({
        ...prevState,
        descSegmt: { value: response.data.descSegmt },
      }));
      setIsLoading(false);
    }
    loadData();
  }, []);

  const normalizeInput = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, "");
    const cvLength = currentValue.length;

    if (cvLength < 3) return currentValue;
    if (cvLength < 6)
      return `${currentValue.slice(0, 2)}.${currentValue.slice(2)}`;
    if (cvLength < 9)
      return `${currentValue.slice(0, 2)}.${currentValue.slice(
        2,
        5
      )}.${currentValue.slice(5)}`;
    if (cvLength < 13)
      return `${currentValue.slice(0, 2)}.${currentValue.slice(
        2,
        5
      )}.${currentValue.slice(5, 8)}/${currentValue.slice(8)}`;
    return `${currentValue.slice(0, 2)}.${currentValue.slice(
      2,
      5
    )}.${currentValue.slice(5, 8)}/${currentValue.slice(
      8,
      12
    )}-${currentValue.slice(12, 14)}`;
  };

  const handleChange = (event, name, type) => {
    event.persist();
    let target = event.target.value;
    switch (type) {
      case "text":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: target },
        }));
    }
  };
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    var aux = Object.entries(values);
    const tamanho = aux.length;

    for (let i = 0; i < tamanho; i++) {
      if (!(aux[i][1].error === "has-danger")) {
        var valid = true;
      } else {
        var valid = false;
        break;
      }
    }
    for (let j = 0; j < tamanho; j++) {
      if (aux[j][1].value !== "") {
        var filled = true;
      } else {
        var filled = false;
        setValues((prevState) => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" },
        }));
        break;
      }
    }

    if (valid && filled) {
      dispatch(
        SegmentoUpdate(
          id,
          values.empresaId.value,
          values.UndNegId.value,
          values.ProdutoId.value,
          values.AreaId.value,
          values.descSegmt.value
        )
      );
    } else {
      options = {
        place: "tr",
        message: (
          <div>
            <div>Ops! Há algo errado</div>
          </div>
        ),
        type: "danger",
        icon: "tim-icons icon-alert-circle-exc",
        autoDismiss: 7,
      };
      notify();
    }
  };

  return (
    <Fragment>
      {isLoading ? (
        <div></div>
      ) : (
          <>
            <div className="rna-container">
              <NotificationAlert ref={notifyElment} />
            </div>
            <div className="content">
              <Row>
                <Col md="12">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Edição de Segmento</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit={handleSubmit}>
                        <label>Empresa</label>
                        <FormGroup
                          className={`has-label ${values.empresaId.error}`}
                        >
                          <Input
                            disabled={true}
                            name="EmpresaId"
                            type="select"
                            onChange={(event) =>
                              handleChange(event, "empresaId", "text")
                            }
                            value={values.empresaId.value}
                          >
                            {" "}
                            <option value={1}>
                              {" "}
                              {data4.nome} - {normalizeInput(data4.idFederal)}
                            </option>
                          </Input>
                          {values.empresaId.error === "has-danger" ? (
                            <label className="error">
                              {values.empresaId.message}
                            </label>
                          ) : null}
                        </FormGroup>

                        <label>Unidade de Negócio</label>
                        <FormGroup
                          className={`has-label ${values.UndNegId.error}`}
                        >
                          <Input
                            name="UndNegId"
                            type="select"
                            onChange={(event) =>
                              handleChange(event, "UndNegId", "text")
                            }
                            value={values.UndNegId.value}
                          >
                            {" "}
                            <option disabled value="">
                              {" "}
                            Selecione a unidade de negócio{" "}
                            </option>
                            {data1.map((undNeg) => (
                              <option value={undNeg.id}>
                                {" "}
                                {undNeg.descUndNeg}{" "}
                              </option>
                            ))}
                          </Input>{" "}
                          {values.UndNegId.error === "has-danger" ? (
                            <label className="error">
                              {values.UndNegId.message}
                            </label>
                          ) : null}
                        </FormGroup>

                        <label>Produto</label>
                        <FormGroup
                          className={`has-label ${values.ProdutoId.error}`}
                        >
                          <Input
                            name="ProdutoId"
                            type="select"
                            onChange={(event) =>
                              handleChange(event, "ProdutoId", "text")
                            }
                            value={values.ProdutoId.value}
                          >
                            {" "}
                            <option disabled value="">
                              {" "}
                            Selecione o produto{" "}
                            </option>
                            {data2.map((prodt) => (
                              <option value={prodt.id}>
                                {" "}
                                {prodt.descProdt}{" "}
                              </option>
                            ))}
                          </Input>
                          {values.ProdutoId.error === "has-danger" ? (
                            <label className="error">
                              {values.ProdutoId.message}
                            </label>
                          ) : null}
                        </FormGroup>

                        <label>Área</label>
                        <FormGroup className={`has-label ${values.AreaId.error}`}>
                          <Input
                            name="AreaId"
                            type="select"
                            onChange={(event) =>
                              handleChange(event, "AreaId", "text")
                            }
                            value={values.AreaId.value}
                          >
                            {" "}
                            <option disabled value="">
                              {" "}
                            Selecione a área{" "}
                            </option>
                            {data3.map((area) => (
                              <option value={area.id}> {area.descArea} </option>
                            ))}
                          </Input>{" "}
                          {values.AreaId.error === "has-danger" ? (
                            <label className="error">
                              {values.AreaId.message}
                            </label>
                          ) : null}
                        </FormGroup>

                        <label>Descrição do Segmento</label>
                        <FormGroup
                          className={`has-label ${values.descSegmt.error}`}
                        >
                          <Input
                            name="descSegmt"
                            type="text"
                            onChange={(event) =>
                              handleChange(event, "descSegmt", "text")
                            }
                            value={values.descSegmt.value}
                          />{" "}
                          {values.descSegmt.error === "has-danger" ? (
                            <label className="error">
                              {values.descSegmt.message}
                            </label>
                          ) : null}
                        </FormGroup>
                        <Link to={`/tabelas/general/segmento`}>
                          <Button
                            style={{
                              paddingLeft: 32,
                              paddingRight: 33,
                            }}
                            color="secundary"
                            size="small"
                            className="form"
                          >
                            <i className="tim-icons icon-double-left"
                              style={{
                                paddingBottom: 4,
                                paddingRight: 1,
                              }}
                              size="large"
                            />{" "}
                      Voltar
                    </Button>
                        </Link>
                        <Button
                          style={{
                            paddingLeft: 29,
                            paddingRight: 30,
                          }}
                          className="form"
                          color="info"
                          type="submit"
                        >
                          Enviar{" "}
                          <i className="tim-icons icon-send"
                            style={{
                              paddingBottom: 4,
                              paddingLeft: 3,
                            }}
                            size="large"
                          />
                        </Button>
                      </Form>
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
export default SegmentoUpdatee;
