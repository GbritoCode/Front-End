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
import { condPgmtoUpdate } from "~/store/modules/general/actions";
import { useParams, Link } from "react-router-dom";
import { store } from "~/store";
import axios from "axios";
import { normalizeCnpj } from "normalize";
import NotificationAlert from "react-notification-alert";

function AreaUpdatee() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [data1, setData1] = useState({});
  const empresa = store.getState().auth.empresa;

  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cod: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" },
    diasPrazo: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:51314/empresa/${empresa}`);
      const response1 = await axios(`http://localhost:51314/condPgmto/${id}`);
      setData(response.data);
      setData1(response1.data);

      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response.data.id },
      }));

      setValues((prevState) => ({
        ...prevState,
        desc: { value: response1.data.desc },
      }));

      setValues((prevState) => ({
        ...prevState,
        cod: { value: response1.data.cod },
      }));

      setValues((prevState) => ({
        ...prevState,
        diasPrazo: { value: response1.data.diasPrazo },
      }));

      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleChange = (event, name, type) => {
    event.persist();
    let target = event.target.value;
    switch (type) {
      case "text":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: target },
        }));
        break;
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
        valid = false;
        break;
      }
    }
    for (let j = 0; j < tamanho; j++) {
      if (aux[j][1].value !== "") {
        var filled = true;
      } else {
        filled = false;
        setValues((prevState) => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" },
        }));
        break;
      }
    }

    if (valid && filled) {
      dispatch(condPgmtoUpdate(id, values.empresaId.value, values.cod.value, values.desc.value, values.diasPrazo.value));
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
                      <Link to="/cadastro/aux/condPgmto">
                        <Button
                          style={{
                            float: "right",
                            paddingLeft: 15,
                            paddingRight: 15,
                          }}
                          color="info"
                          size="small"
                          className="text-center"
                        >
                          <i
                            className="tim-icons icon-simple-add"
                            style={{
                              paddingBottom: 4,
                              paddingRight: 10,
                            }}
                            size="large"
                          />{" "}
                        Novo
                      </Button>
                      </Link>
                      <CardTitle tag="h4">
                        Edição de Condição de Pagamento
                    </CardTitle>
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
                              {data.nome} -{normalizeCnpj(data.idFederal)}
                            </option>
                          </Input>{" "}
                          {values.empresaId.error === "has-danger" ? (
                            <label className="error">
                              {values.empresaId.message}
                            </label>
                          ) : null}
                        </FormGroup>

                        <label>Código</label>
                        <FormGroup className={`has-label ${values.cod.error}`}>
                          <Input
                            name="cod"
                            type="text"
                            onChange={(event) =>
                              handleChange(event, "cod", "text")
                            }
                            value={values.cod.value}
                          />{" "}
                          {values.cod.error === "has-danger" ? (
                            <label className="error">{values.cod.message}</label>
                          ) : null}
                        </FormGroup>

                        <label>Descrição</label>
                        <FormGroup className={`has-label ${values.desc.error}`}>
                          <Input
                            name="desc"
                            type="text"
                            onChange={(event) =>
                              handleChange(event, "desc", "text")
                            }
                            value={values.desc.value}
                          />{" "}
                          {values.desc.error === "has-danger" ? (
                            <label className="error">{values.desc.message}</label>
                          ) : null}
                        </FormGroup>

                        <label>Dias de Prazo</label>
                        <FormGroup className={`has-label ${values.diasPrazo.error}`}>
                          <Input
                            name="diasPrazo"
                            type="text"
                            onChange={(event) =>
                              handleChange(event, "diasPrazo", "text")
                            }
                            value={values.diasPrazo.value}
                          />{" "}
                          {values.diasPrazo.error === "has-danger" ? (
                            <label className="error">{values.diasPrazo.message}</label>
                          ) : null}
                        </FormGroup>
                        <Link to={`/tabelas/aux/condPgmto`}>
                          <Button
                            style={{
                              paddingLeft: 32,
                              paddingRight: 33,
                            }}
                            color="secundary"
                            size="small"
                            className="text-left"
                          >
                            <i
                              className="tim-icons icon-double-left"
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
export default AreaUpdatee;