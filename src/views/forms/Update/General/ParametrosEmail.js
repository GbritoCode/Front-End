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
  const [tagsinputCRM, settagsinputCRM] = useState([]);
  const [stringOrc, setStringOrc] = useState("");
  const [stringRev, setStringRev] = useState("");
  const [stringFat, setStringFat] = useState("");
  const [stringCRM, setStringCRM] = useState("");
  const [horizontalTabs, sethorizontalTabs] = useState("Orçamento");
  const stateSchema = {
    id: { value: "", error: "", message: "" },
    empresaId: { value: 1, error: "", message: "" },
    fromEmailOrc: { value: "", error: "", message: "" },
    fromEmailRev: { value: "", error: "", message: "" },
    fromEmailFat: { value: "", error: "", message: "" },
    fromEmailCRM: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/emailParams/?one=true`);
      setValues(prevState => ({
        ...prevState,
        id: { value: response.data.id },
        fromEmailOrc: { value: response.data.fromEmailOrc },
        fromEmailRev: { value: response.data.fromEmailRev },
        fromEmailFat: { value: response.data.fromEmailFat },
        fromEmailCRM: { value: response.data.fromEmailCRM }
      }));
      settagsinputOrc(
        response.data.bccEmailOrc.split(",").filter(arr => arr !== "")
      );
      setStringOrc(response.data.bccEmailOrc);

      settagsinputRev(
        response.data.bccEmailRev.split(",").filter(arr => arr !== "")
      );
      setStringRev(response.data.bccEmailRev);

      settagsinputFat(
        response.data.bccEmailFat.split(",").filter(arr => arr !== "")
      );
      setStringFat(response.data.bccEmailFat);

      settagsinputCRM(
        response.data.bccEmailCRM.split(",").filter(arr => arr !== "")
      );
      setStringCRM(response.data.bccEmailCRM);

      setIsLoading(false);
    }
    loadData();
  }, []);

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
  const handleTagsinputCRM = value => {
    setStringCRM(`${value}`);
    settagsinputCRM(value);
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
          stringCRM,
          values.fromEmailOrc.value,
          values.fromEmailRev.value,
          values.fromEmailFat.value,
          values.fromEmailCRM.value
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
                    <Nav tabs>
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
                      <NavItem>
                        <NavLink
                          data-toggle="tab"
                          href="#"
                          className={
                            horizontalTabs === "CRM"
                              ? "active emailParam"
                              : "emailParam"
                          }
                          onClick={e =>
                            changeActiveTab(e, "horizontalTabs", "CRM")
                          }
                        >
                          CRM
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
                              <Label>Email de Orçamento</Label>
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
                              <Label>Email de Revisão</Label>
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
                              <Label>Email de Faturamento</Label>
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
                      <TabPane tabId="CRM">
                        <Form onSubmit={handleSubmit}>
                          <Row>
                            <Col md="4">
                              <Label>Email de CRM</Label>
                              <FormGroup
                                className={`has-label ${values.fromEmailCRM.error}`}
                              >
                                <Input
                                  name="fromEmailCRM"
                                  type="text"
                                  onChange={event =>
                                    handleChange(event, "fromEmailCRM", "text")
                                  }
                                  value={values.fromEmailCRM.value}
                                />
                                {values.fromEmailCRM.error === "has-danger" ? (
                                  <Label className="error">
                                    {values.fromEmailCRM.message}
                                  </Label>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col md="8">
                              <Label style={{ display: "block" }}>
                                Cópia Email
                              </Label>
                              <TagsInput
                                onChange={handleTagsinputCRM}
                                tagProps={{
                                  className: "react-tagsinput-tag "
                                }}
                                value={tagsinputCRM}
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
                        onClick={() => history.push("/dashboard")}
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
