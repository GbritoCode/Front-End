/*!

=========================================================
* Black Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useRef } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col,
  Form,
  Label,
  FormGroup,
  Input
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import TagsInput from "~/components/Tags/TagsInput";
import api from "~/services/api";
import { EmailParamsUpdate } from "~/store/modules/general/actions";
import history from "~/services/history";

const Panels = () => {
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [tagsinputOrc, settagsinputOrc] = useState([]);
  const [tagsinputRev, settagsinputRev] = useState([]);
  const [tagsinputFat, settagsinputFat] = useState([]);
  const [stringOrc, setStringOrc] = useState("");
  const [stringRev, setStringRev] = useState("");
  const [stringFat, setStringFat] = useState("");
  const [horizontalTabs, sethorizontalTabs] = useState("Orçamento");
  const stateSchema = {
    id: { value: "", error: "", message: "" },
    empresaId: { value: 1, error: "", message: "" },
    fromEmailOrc: { value: "", error: "", message: "" },
    fromEmailRev: { value: "", error: "", message: "" },
    fromEmailFat: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  console.log(tagsinputOrc);
  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/emailParams/?one=true`);
      setValues(prevState => ({
        ...prevState,
        id: { value: response.data.id },
        fromEmailOrc: { value: response.data.fromEmailOrc },
        fromEmailRev: { value: response.data.fromEmailRev },
        fromEmailFat: { value: response.data.fromEmailFat }
      }));
      const auxOrc = response.data.bccEmailOrc.split(",");
      if (!auxOrc.some(value => tagsinputOrc.includes(value))) {
        settagsinputOrc(tagsinputOrc.concat(auxOrc));
        setStringOrc(response.data.bccEmailOrc);
      }
      const auxRev = response.data.bccEmailRev.split(",");
      if (!auxRev.some(value => tagsinputRev.includes(value))) {
        settagsinputRev(tagsinputRev.concat(auxRev));
        setStringRev(response.data.bccEmailRev);
      }
      const auxFat = response.data.bccEmailFat.split(",");
      if (!auxFat.some(value => tagsinputFat.includes(value))) {
        settagsinputFat(tagsinputFat.concat(auxFat));
        setStringFat(response.data.bccEmailFat);
      }
      setIsLoading(false);
    }
    loadData();
  }, [tagsinputFat, tagsinputOrc, tagsinputRev]);

  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }
  // with this function we change the active tab for all the tabs in this page
  const changeActiveTab = (e, tabState, tabName) => {
    e.preventDefault();
    switch (tabState) {
      case "horizontalTabs":
        sethorizontalTabs(tabName);
        break;
      default:
        break;
    }
  };
  console.log(stringOrc);
  const handleTagsinputOrc = value => {
    setStringOrc(`${value}`);
    settagsinputOrc(value);
  };
  const handleTagsinputRev = value => {
    setStringRev(`${value}`);
    settagsinputRev(value);
  };
  const handleTagsinputFat = value => {
    setStringFat(`${value}`);
    settagsinputFat(value);
  };

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
      dispatch(
        EmailParamsUpdate(
          values.id.value,
          values.empresaId.value,
          stringOrc,
          stringRev,
          stringFat,
          values.fromEmailOrc.value,
          values.fromEmailRev.value,
          values.fromEmailFat.value
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
        autoDismiss: 7
      };
      notify();
    }
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="rna-container">
            <NotificationAlert ref={notifyElment} />
          </div>
          <div className="content">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <Nav className="nav-pills-info" pills>
                      <NavItem>
                        <NavLink
                          data-toggle="tab"
                          href="#"
                          className={
                            horizontalTabs === "Orçamento"
                              ? "active emailParam"
                              : "emailParam"
                          }
                          onClick={e =>
                            changeActiveTab(e, "horizontalTabs", "Orçamento")
                          }
                        >
                          Orçamento
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          data-toggle="tab"
                          href="#"
                          className={
                            horizontalTabs === "revisao"
                              ? "active emailParam"
                              : "emailParam"
                          }
                          onClick={e =>
                            changeActiveTab(e, "horizontalTabs", "revisao")
                          }
                        >
                          Revisão
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          data-toggle="tab"
                          href="#"
                          className={
                            horizontalTabs === "Faturamento"
                              ? "active emailParam"
                              : "emailParam"
                          }
                          onClick={e =>
                            changeActiveTab(e, "horizontalTabs", "Faturamento")
                          }
                        >
                          Faturamento
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </CardHeader>
                  <CardBody>
                    <TabContent
                      className="tab-space"
                      activeTab={horizontalTabs}
                    >
                      <TabPane tabId="Orçamento">
                        <Form onSubmit={handleSubmit}>
                          <Row>
                            <Col md="4">
                              <Label>Email de Envio</Label>
                              <FormGroup
                                className={`has-label ${values.fromEmailOrc.error}`}
                              >
                                <Input
                                  name="fromEmailOrc"
                                  type="text"
                                  onChange={event =>
                                    handleChange(event, "fromEmailOrc", "text")
                                  }
                                  value={values.fromEmailOrc.value}
                                />
                                {values.fromEmailOrc.error === "has-danger" ? (
                                  <Label className="error">
                                    {values.fromEmailOrc.message}
                                  </Label>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col md="8">
                              <Label style={{ display: "block" }}>
                                Cópia Email
                              </Label>
                              <TagsInput
                                onChange={handleTagsinputOrc}
                                tagProps={{
                                  className: "react-tagsinput-tag "
                                }}
                                value={tagsinputOrc}
                              />
                            </Col>
                          </Row>
                        </Form>
                      </TabPane>
                      <TabPane tabId="revisao">
                        <Form onSubmit={handleSubmit}>
                          <Row>
                            <Col md="4">
                              <Label>Email de Envio</Label>
                              <FormGroup
                                className={`has-label ${values.fromEmailRev.error}`}
                              >
                                <Input
                                  name="fromEmailRev"
                                  type="text"
                                  onChange={event =>
                                    handleChange(event, "fromEmailRev", "text")
                                  }
                                  value={values.fromEmailRev.value}
                                />
                                {values.fromEmailRev.error === "has-danger" ? (
                                  <Label className="error">
                                    {values.fromEmailRev.message}
                                  </Label>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col md="8">
                              <Label style={{ display: "block" }}>
                                Cópia Email
                              </Label>
                              <TagsInput
                                onChange={handleTagsinputRev}
                                tagProps={{
                                  className: "react-tagsinput-tag "
                                }}
                                value={tagsinputRev}
                              />
                            </Col>
                          </Row>
                        </Form>
                      </TabPane>
                      <TabPane tabId="Faturamento">
                        <Form onSubmit={handleSubmit}>
                          <Row>
                            <Col md="4">
                              <Label>Email de Envio</Label>
                              <FormGroup
                                className={`has-label ${values.fromEmailFat.error}`}
                              >
                                <Input
                                  name="fromEmailFat"
                                  type="text"
                                  onChange={event =>
                                    handleChange(event, "fromEmailFat", "text")
                                  }
                                  value={values.fromEmailFat.value}
                                />
                                {values.fromEmailFat.error === "has-danger" ? (
                                  <Label className="error">
                                    {values.fromEmailFat.message}
                                  </Label>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col md="8">
                              <Label style={{ display: "block" }}>
                                Cópia Email
                              </Label>
                              <TagsInput
                                onChange={handleTagsinputFat}
                                tagProps={{
                                  className: "react-tagsinput-tag "
                                }}
                                value={tagsinputFat}
                              />
                            </Col>
                          </Row>
                        </Form>
                      </TabPane>
                    </TabContent>
                    <Form onSubmit={handleSubmit}>
                      <Button
                        style={{
                          paddingLeft: 32,
                          paddingRight: 33
                        }}
                        color="secundary"
                        size="small"
                        className="form"
                        onClick={() => history.goBack()}
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
      )}
    </>
  );
};

export default Panels;
