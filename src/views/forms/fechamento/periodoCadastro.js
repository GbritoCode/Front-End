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
import React, { useRef, useEffect, useState } from "react";

import classNames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Label,
  Modal,
  ModalBody,
  Input,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { Link } from "react-router-dom";
import { Close, DateRange, Message } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import { toast } from "react-toastify";
import { store } from "~/store";
import { areaRequest } from "~/store/modules/general/actions";
import api from "~/services/api";
import history from "~/services/history";

export default function CadastroPeriodo() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();

  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    nome: { value: "", error: "", message: "" },
    dataInic: { value: "", error: "", message: "" },
    dataFim: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  const [modalMini, setModalMini] = useState(false);
  const [modalVar, setModalVar] = useState({ ano: 2021 });

  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      const response = await api.get(`/empresa/${empresa}`);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id }
      }));
    }
    loadData();
  }, []);

  const toggleModalMini = () => {
    setModalMini(!modalMini);
  };

  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

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

  const handleSubmit = evt => {
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
        setValues(prevState => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" }
        }));
        break;
      }
    }

    if (valid && filled) {
      dispatch(areaRequest(values.empresaId.value, values.descArea.value));
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
        autoDismiss: 7
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
        <Modal
          modalClassName="modal-mini "
          isOpen={modalMini}
          toggle={toggleModalMini}
        >
          <div className="modal-header justify-content-center">
            <button
              aria-hidden
              className="close"
              data-dismiss="modal"
              type="button"
              color="primary"
              onClick={toggleModalMini}
            >
              <Close />
            </button>
            <div>
              <Message fontSize="large" />
            </div>
          </div>
          <ModalBody className="text-center">
            <p> Geração automática do período mensal </p>
            <Label style={{ float: "left" }}>Ano</Label>
            <Input
              name="ano"
              type="select"
              onChange={e => {
                var { value } = e.target;
                setModalVar(prevState => ({
                  ...prevState,
                  ano: value
                }));
              }}
            >
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </Input>
          </ModalBody>
          <div className="modal-footer">
            <Button
              style={{ color: "#000" }}
              className="btn-neutral"
              type="button"
              onClick={toggleModalMini}
            >
              Cancelar
            </Button>
            <Button
              style={{ color: "#7E7E7E" }}
              className="btn-neutral"
              type="button"
              onClick={async () => {
                await api
                  .post("fechamentoPeriodo/?auto=true&tipo=mensal", modalVar)
                  .then(() => {
                    setModalMini(!modalMini);
                    history.push("/tabelas/fechamento/periodo");
                  })
                  .catch(err => {
                    toast.error(err.response.data.error);
                  });
              }}
            >
              Gerar
            </Button>
          </div>
        </Modal>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Período</CardTitle>
                <Tooltip title="Geração" placement="top" interactive>
                  <Button
                    style={{ float: "right" }}
                    color="default"
                    size="sm"
                    className={classNames("btn-icon btn-link like")}
                    onClick={() => setModalMini(!modalMini)}
                  >
                    <DateRange />
                  </Button>
                </Tooltip>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="4">
                      {" "}
                      <Label>Nome Período</Label>
                      <FormGroup className={`has-label ${values.nome.error}`}>
                        <Input
                          name="nome"
                          type="text"
                          onChange={event =>
                            handleChange(event, "nome", "text")
                          }
                          value={values.nome.value}
                        />{" "}
                        {values.nome.error === "has-danger" ? (
                          <Label className="error">{values.nome.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Data Inicial</Label>
                      <FormGroup
                        className={`has-label ${values.dataInic.error}`}
                      >
                        <Input
                          name="dataInic"
                          type="date"
                          onChange={event =>
                            handleChange(event, "dataInic", "text")
                          }
                          value={values.dataInic.value}
                        />{" "}
                        {values.dataInic.error === "has-danger" ? (
                          <Label className="error">
                            {values.dataInic.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {" "}
                      <Label>Data Final</Label>
                      <FormGroup
                        className={`has-label ${values.dataFim.error}`}
                      >
                        <Input
                          name="dataFim"
                          type="date"
                          onChange={event =>
                            handleChange(event, "dataFim", "text")
                          }
                          value={values.dataFim.value}
                        />{" "}
                        {values.dataFim.error === "has-danger" ? (
                          <Label className="error">
                            {values.dataFim.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Link to="/tabelas/fechamento/periodo">
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
                  <Button
                    style={{
                      paddingLeft: 29,
                      paddingRight: 30
                    }}
                    className="form"
                    color="info"
                    type="submit"
                  >
                    Enviar{" "}
                    <i
                      className="tim-icons icon-send"
                      style={{
                        paddingBottom: 4,
                        paddingLeft: 3
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
