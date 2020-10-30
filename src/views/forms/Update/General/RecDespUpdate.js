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
  Label,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { RecDespUpdate } from "~/store/modules/general/actions";
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import {normalizeCnpj} from 'normalize'

function RecDespUpdatee() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [data1, setData1] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" },
    rec_desp: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:51314/rec_desp/${id}`);
      const response1 = await axios(
        `http://localhost:51314/empresa/${response.data.EmpresaId}`
      );
      setData(response.data);
      setData1(response1.data);
      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response.data.EmpresaId },
      }));
      setValues((prevState) => ({
        ...prevState,
        desc: { value: response.data.desc },
      }));
      setValues((prevState) => ({
        ...prevState,
        rec_desp: { value: response.data.rec_desp },
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
    }
  };
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

const   checkRec=(values)=>{
    if (values.rec_desp.value == "Rec"){
      return true
    }
  }

  const   checkDesp=(values)=>{
    if (values.rec_desp.value == "Desp"){
      return true
    }
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
      dispatch(RecDespUpdate(id, values.empresaId.value, values.desc.value,values.rec_desp.value));
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
                    <CardTitle tag="h4">Edição de Receita e Despesa</CardTitle>
                    <Link to="/cadastro/geral/area">
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
                            {data1.nome} - {normalizeCnpj(data1.idFederal)}
                          </option>
                        </Input>
                        {values.empresaId.error === "has-danger" ? (
                          <label className="error">
                            {values.empresaId.message}
                          </label>
                        ) : null}
                      </FormGroup>

                      <label>Descrição</label>
                      <FormGroup className={`has-label ${values.desc.error}`}>
                        <Input
                          name="license"
                          type="text"
                          onChange={(event) =>
                            handleChange(event, "desc", "text")
                          }
                          value={values.desc.value}
                        />
                        {values.desc.error === "has-danger" ? (
                          <label className="error">{values.desc.message}</label>
                        ) : null}
                      </FormGroup>

                      <FormGroup check className={`has-label ${values.rec_desp.error}`}>
                  <Label check>
                    <Input
                     checked={checkRec(values)}
                      name="rec/desp"
                      type="radio"
                      onChange={(event) => handleChange(event, "rec_desp", "text")}
                      value={"Rec"}
                    />
                    Receita
                    </Label>
                    <Label check>
                    <Input
                     checked={checkDesp(values)}
                     name="rec/desp"
                      type="radio"
                      onChange={(event) => handleChange(event, "rec_desp", "text")}
                      value={"Desp"}
                    />
                    Despesa
                    </Label>
                    {values.rec_desp.error === "has-danger" ? (
                      <label className="error">{values.rec_desp.message}</label>
                    ) : null}
                  </FormGroup>

                      <Button
                        style={{ marginTop: 35 }}
                        className="form"
                        color="info"
                        type="submit"
                      >
                        Enviar
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
export default RecDespUpdatee;
