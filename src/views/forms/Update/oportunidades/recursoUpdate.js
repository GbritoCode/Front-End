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
import React, { useRef, useEffect, useState} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  Label,
  Input,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { recursoUpdate } from "~/store/modules/oportunidades/actions";
import { store } from "~/store";
import axios from "axios";
import { normalizeCurrency } from "normalize";
import NotificationAlert from "react-notification-alert";
import { Link, useParams } from "react-router-dom";

export default function RecursoCadastro() {
  //--------- colocando no modo claro do template
  document.body.classList.add("white-content");

const id = useParams() 
  const dispatch = useDispatch();
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState([]);
  const [data4, setData4] = useState([]);
  const stateSchema = {
    oportunidadeId: { value: "", error: "", message: "" },
    colabId: { value: "", error: "", message: "" },
    custoPrev: { value: "", error: "", message: "" },
    dataInclusao: { value: "", error: "", message: "" },
    hrsPrevst: { value: "", error: "", message: "" },
    colabVlrHr: { value: "", error: "", message: "" },
  };
  const [values, setValues] = useState(stateSchema);
  
  useEffect(() => {
    const empresa = store.getState().auth.empresa;
    async function loadData() {
      const response = await axios(`http://localhost:51314/empresa/${empresa}`);
      const response1 = await axios(`http://localhost:51314/recurso/aux/${id.id}`);
      const response2 = await axios(`http://localhost:51314/colab/`);
      const response4 = await axios(`http://localhost:51314/oportunidade/${response1.data.oportunidadeId}`);
      setData1(response1.data);
      setData2(response2.data);
      setData4(response4.data);
      setValues((prevState) => ({
        ...prevState,
        empresaId: { value: response.data.id },
      }));
      setValues((prevState) => ({
        ...prevState,
        oportunidadeId: { value: response4.data.id },
      }));
      setValues((prevState) => ({
        ...prevState,
        colabId: { value: response1.data.colabId },
      }));
      setValues((prevState) => ({
        ...prevState,
        colabVlrHr: { value: normalizeCurrency(JSON.stringify(response1.data.colabVlrHr)) },
      }));
      setValues((prevState) => ({
        ...prevState,
        dataInclusao: { value: response1.data.dataInclusao },
      }));
      setValues((prevState) => ({
        ...prevState,
        hrsPrevst: { value: response1.data.hrsPrevst },
      }));
      setValues((prevState) => ({
        ...prevState,
        custoPrev: { value: normalizeCurrency(JSON.stringify(response1.data.custoPrev)) },
      }));
    }
    loadData();
  }, [id]);

  function getColabHr(colab) {
    axios(`http://localhost:51314/colab/comp/${colab}`).then((result) => {
      setValues((prevState) => ({
        ...prevState,
        colabVlrHr: { value: normalizeCurrency(JSON.stringify(result.data[0].valor)) },
      }));
    })
  }
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const handleChange = (event, name, type) => {
    event.persist();
    let target = event.target.value;
    switch (type) {
      case "number":
        if (verifyNumber(target)) {
          setValues((prevState) => ({
            ...prevState,
            [name]: { value: target, error: "has-success" },
          }));
        } else {
          setValues((prevState) => ({
            ...prevState,
            [name]: {
              value: target,
              error: "has-danger",
              message: "Insira um número válido",
            },
          }));
        }
        break;
      case "currency":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: normalizeCurrency(target) },
        }));
        break;
      case "text":
        setValues((prevState) => ({
          ...prevState,
          [name]: { value: target },
        }));
        break
        default:
      }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    var aux = Object.entries(values);
    const tamanho = aux.length;

    for (let i = 0; i < tamanho; i++) {
      if (!(aux[i][1].error === "has-danger")) {
        var valid = true;
      } else {
        valid = false
        break;
      }
    }
    for (let j = 0; j < tamanho; j++) {
      if (aux[j][1].value !== "") {
        var filled = true;
      } else {
        filled = false
        setValues((prevState) => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" },
        }));
        break;
      }
    }

    if (valid && filled) {
      var custoPrevdb = values.custoPrev.value.replace(/[.,]+/g, "");
      var colabVlrHrdb = values.colabVlrHr.value.replace(/[.,]+/g, "");
      dispatch(
        recursoUpdate(id,
          values.oportunidadeId.value,
          values.colabId.value,
          custoPrevdb,
          values.dataInclusao.value,
          values.hrsPrevst.value,
          colabVlrHrdb,
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
    <>
      <div className="rna-container">
        <NotificationAlert ref={notifyElment} />
      </div>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Recurso</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>

                <Label>Oportunidade</Label>
                  <FormGroup className={`has-label ${values.oportunidadeId.error}`}>
                    <Input
                      disabled
                      name="oportunidadeId"
                      onChange={(event) =>
                        handleChange(event, "oportunidadeId", "text")
                      }
                      value={values.oportunidadeId.value}
                      type="select"
                    >
                      <option disabled value="">
                        {" "}
      Selecione a Oportunidade{" "}
                      </option>{" "}
                      <option value={data4.id}>
                        {" "}
                        {data4.cod} - {data4.desc}
                      </option>
                    </Input>

                    {values.oportunidadeId.error === "has-danger" ? (
                      <Label className="error">{values.oportunidadeId.message}</Label>
                    ) : null}
                  </FormGroup>
                  <Label>Colaborador</Label>
                  <FormGroup className={`has-label ${values.colabId.error}`}>
                    <Input
                      name="colabId"
                      type="select"
                      onChange={(event) =>
                        handleChange(event, "colabId", "text")
                      }
                      value={values.colabId.value}
                      onChangeCapture={(e) => getColabHr(e.target.value)}
                    >
                      {" "}
                      <option disabled value="">
                        {" "}
          Selecione o colaborador{" "}
                      </option>
                      {data2.map((colab) => (
                        <option value={colab.id}>
                          {" "}
                          {colab.nome}{" "}
                        </option>
                      ))}
                    </Input>

                    {values.colabId.error === "has-danger" ? (
                      <Label className="error">{values.colabId.message}</Label>
                    ) : null}
                  </FormGroup>
                  <Label>Data de Inclusão</Label>
                  <FormGroup
                    className={`has-label ${values.dataInclusao.error}`}
                  >
                    <Input
                      name="dataInclusao"
                      type="date"
                      onChange={(event) =>
                        handleChange(event, "dataInclusao", "text")
                      }
                      value={values.dataInclusao.value}
                    />
                    {values.dataInclusao.error === "has-danger" ? (
                      <Label className="error">
                        {values.dataInclusao.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                  <Label>Horas Previstas</Label>
                  <FormGroup className={`has-label ${values.hrsPrevst.error}`}>
                    <Input
                      name="hrsPrevst"
                      type="numeric"
                      onChange={(event) => {
                        handleChange(event, "hrsPrevst", "number");
                      }
                      }
                      value={values.hrsPrevst.value}
                    />
                    {values.hrsPrevst.error === "has-danger" ? (
                      <Label className="error">
                        {values.hrsPrevst.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                  <Label>Valor Hora </Label>
                  <FormGroup className={`has-label ${values.colabVlrHr.error}`}>
                    <Input
                      disabled
                      name="colabVlrHr"
                      type="numeric"
                      onChange={(event) =>
                        handleChange(event, "colabVlrHr", "currency")
                      }
                      value={values.colabVlrHr.value}
                    />
                    {values.colabVlrHr.error === "has-danger" ? (
                      <Label className="error">
                        {values.colabVlrHr.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                  <Label>Custo Previsto</Label>
                  <FormGroup className={`has-label ${values.custoPrev.error}`}>
                    <Input
                      disabled
                      name="custoPrev"
                      type="numeric"
                      onChange={(event) =>
                        handleChange(event, "custoPrev", "currency")
                      }
                      value={values.custoPrev.value}
                    />
                    {values.custoPrev.error === "has-danger" ? (
                      <Label className="error">
                        {values.custoPrev.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                  <Link to={`/tabelas/oportunidade/recurso/${data1.id}`}>
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
  );
}
