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
  Input,
  Row,
  Col,
  CustomInput,
  TabPane,
  NavLink,
  NavItem,
  Nav,
  TabContent
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { perfilUpdate } from "~/store/modules/general/actions";
import { store } from "~/store";
import api from "~/services/api";
import routes from "~/routes/routes";

function PerfilUpdate() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" },
    cod: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  const [radioValue, setRadioValue] = useState("");
  const [horizontalTabs, sethorizontalTabs] = useState("Dashboards");
  const [permittedPages, setPermittedPages] = useState([]);
  const [ParentPagesCounter, setParentPagesCounter] = useState({
    Dashboards: { count: 0, value: "Dashboards" },
    Administração: { count: 0, value: "Administração" },
    Vendas: { count: 0, value: "Vendas" },
    Cadastros: { count: 0, value: "Cadastros" },
    Apontamentos: { count: 0, value: "Apontamentos" },
    "Oportunidades side": { count: 0, value: "Oportunidades" }
  });

  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      const response = await api.get(`/empresa/${empresa}`);
      const response1 = await api.get(`/perfil/${id}`);
      setPermittedPages(response1.data.permittedPages.split(","));
      setValues(prevState => ({
        ...prevState,
        desc: { value: response1.data.desc },
        empresaId: { value: response.data.id },
        cod: { value: response1.data.cod }
      }));
      if (response1.data.permittedPages.split(",").includes("acessoRestrito")) {
        setRadioValue("acessoRestrito");
      } else if (
        response1.data.permittedPages.split(",").includes("acessoTotal")
      ) {
        setRadioValue("acessoTotal");
      }
      routes.map(route => {
        if (route.layout !== "/auth") {
          route.views.map(view => {
            if (
              response1.data.permittedPages.split(",").includes(view.namePerfil)
            ) {
              setParentPagesCounter(prevState => ({
                ...prevState,
                [route.namePerfil]: {
                  count: prevState[route.namePerfil].count + 1,
                  value: route.namePerfil
                }
              }));
            }
            return true;
          });
        }
        return true;
      });

      setIsLoading(false);
    }
    loadData();
  }, [id]);
  console.log(permittedPages);
  console.log(ParentPagesCounter);
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

  const handleSwitchChange = (checked, name, parentRoute) => {
    switch (checked) {
      case true:
        permittedPages.push(name);
        setParentPagesCounter(prevState => ({
          ...prevState,
          [parentRoute]: {
            count: prevState[parentRoute].count + 1,
            value: parentRoute
          }
        }));
        break;
      case false:
        setPermittedPages(permittedPages.filter(element => element !== name));
        setParentPagesCounter(prevState => ({
          ...prevState,
          [parentRoute]: {
            count: prevState[parentRoute].count - 1,
            value: parentRoute
          }
        }));
        break;
      default:
    }
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
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    var aux = Object.entries(values);
    const tamanho = aux.length;

    let string = "";
    for (const page of permittedPages) {
      if (string.search(page) < 0) {
        string += `${page},`;
      }
      if (page === "Prospecção") {
        string += `${radioValue},`;
      }
    }
    console.log(string);
    console.log(ParentPagesCounter);

    Object.entries(ParentPagesCounter).forEach(page => {
      if (page[1].count > 0) {
        console.log(`${ParentPagesCounter.Oportunidades}enter`);
        if (string.search(page[1].value) < 0) {
          console.log(`${ParentPagesCounter.Oportunidades}add`);
          string += `${page[1].value},`;
        }
      } else if (page[1].count === 0) {
        console.log(`${ParentPagesCounter.Oportunidades}sub`);
        string = string.replace(`${page[1].value},`, "");
      }
    });
    console.log(string);

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
        perfilUpdate(
          id,
          values.empresaId.value,
          values.desc.value,
          values.cod.value,
          string
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
        <>
          <div className="content" />
        </>
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
                    <CardTitle tag="h4">Perfil</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <Label>Descrição</Label>
                          <FormGroup
                            className={`has-label ${values.desc.error}`}
                          >
                            <Input
                              name="license"
                              type="text"
                              onChange={event =>
                                handleChange(event, "desc", "text")
                              }
                              value={values.desc.value}
                            />
                            {values.desc.error === "has-danger" ? (
                              <Label className="error">
                                {values.desc.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Código</Label>
                          <FormGroup
                            className={`has-label ${values.cod.error}`}
                          >
                            <Input
                              name="license"
                              type="text"
                              onChange={event =>
                                handleChange(event, "cod", "text")
                              }
                              value={values.cod.value}
                            />
                            {values.cod.error === "has-danger" ? (
                              <Label className="error">
                                {values.cod.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            data-toggle="tab"
                            href="#"
                            className={
                              horizontalTabs === "Dashboards"
                                ? "active perfilPage"
                                : "perfilPage"
                            }
                            onClick={e =>
                              changeActiveTab(e, "horizontalTabs", "Dashboards")
                            }
                          >
                            Dashboards
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            data-toggle="tab"
                            href="#"
                            className={
                              horizontalTabs === "admin"
                                ? "active perfilPage"
                                : "perfilPage"
                            }
                            onClick={e =>
                              changeActiveTab(e, "horizontalTabs", "admin")
                            }
                          >
                            Administração
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            data-toggle="tab"
                            href="#"
                            className={
                              horizontalTabs === "Vendas"
                                ? "active perfilPage"
                                : "perfilPage"
                            }
                            onClick={e =>
                              changeActiveTab(e, "horizontalTabs", "Vendas")
                            }
                          >
                            Vendas
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            data-toggle="tab"
                            href="#"
                            className={
                              horizontalTabs === "Cadastros"
                                ? "active perfilPage"
                                : "perfilPage"
                            }
                            onClick={e =>
                              changeActiveTab(e, "horizontalTabs", "Cadastros")
                            }
                          >
                            Cadastros
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            data-toggle="tab"
                            href="#"
                            className={
                              horizontalTabs === "Apontamentos"
                                ? "active perfilPage"
                                : "perfilPage"
                            }
                            onClick={e =>
                              changeActiveTab(
                                e,
                                "horizontalTabs",
                                "Apontamentos"
                              )
                            }
                          >
                            Apontamentos
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            data-toggle="tab"
                            href="#"
                            className={
                              horizontalTabs === "Oportunidades"
                                ? "active perfilPage"
                                : "perfilPage"
                            }
                            onClick={e =>
                              changeActiveTab(
                                e,
                                "horizontalTabs",
                                "Oportunidades"
                              )
                            }
                          >
                            Oportunidades
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent
                        className="tab-space"
                        activeTab={horizontalTabs}
                      >
                        <TabPane tabId="Dashboards">
                          <Row>
                            {routes.map(route => {
                              if (
                                route.layout !== "/auth" &&
                                route.namePerfil === "Dashboards"
                              ) {
                                return route.views.map((view, index) => {
                                  if (!view.redirect) {
                                    return (
                                      <>
                                        <Col md="4" key={index}>
                                          <CustomInput
                                            key={index}
                                            defaultChecked={permittedPages.includes(
                                              view.namePerfil
                                            )}
                                            id={view.namePerfil}
                                            type="switch"
                                            label={view.name}
                                            onChange={e =>
                                              handleSwitchChange(
                                                e.target.checked,
                                                e.target.id,
                                                route.namePerfil
                                              )
                                            }
                                          />
                                        </Col>
                                      </>
                                    );
                                  }
                                  return true;
                                });
                              }
                              return true;
                            })}
                          </Row>
                        </TabPane>

                        <TabPane tabId="admin">
                          <Row>
                            {routes.map(route => {
                              if (
                                route.layout !== "/auth" &&
                                route.namePerfil === "Administração"
                              ) {
                                return route.views.map((view, index) => {
                                  if (!view.redirect) {
                                    return (
                                      <>
                                        <Col md="4" key={index}>
                                          <CustomInput
                                            defaultChecked={permittedPages.includes(
                                              view.namePerfil
                                            )}
                                            id={view.namePerfil}
                                            type="switch"
                                            label={view.name}
                                            onChange={e =>
                                              handleSwitchChange(
                                                e.target.checked,
                                                e.target.id,
                                                route.namePerfil
                                              )
                                            }
                                          />
                                        </Col>
                                      </>
                                    );
                                  }
                                  return true;
                                });
                              }
                              return true;
                            })}
                          </Row>
                        </TabPane>

                        <TabPane tabId="Vendas">
                          <Row>
                            {routes.map(route => {
                              if (
                                route.layout !== "/auth" &&
                                route.namePerfil === "Vendas"
                              ) {
                                return route.views.map((view, index) => {
                                  if (!view.redirect) {
                                    return (
                                      <>
                                        <Col md="4" key={index}>
                                          <CustomInput
                                            defaultChecked={permittedPages.includes(
                                              view.namePerfil
                                            )}
                                            id={view.namePerfil}
                                            type="switch"
                                            label={view.name}
                                            onChange={e => {
                                              e.target.checked &&
                                                setRadioValue("acessoRestrito");
                                              !e.target.checked &&
                                                setRadioValue("");
                                              handleSwitchChange(
                                                e.target.checked,
                                                e.target.id,
                                                route.namePerfil
                                              );
                                            }}
                                          />
                                          {view.name === "Prospecção" ? (
                                            <>
                                              {" "}
                                              <FormGroup tag="fieldset">
                                                <FormGroup check>
                                                  <Label
                                                    id="switchChildren"
                                                    check
                                                  >
                                                    <Input
                                                      checked={
                                                        permittedPages.find(
                                                          page =>
                                                            page ===
                                                            "Prospecção"
                                                        ) === "Prospecção" &&
                                                        radioValue ===
                                                          "acessoTotal"
                                                      }
                                                      type="radio"
                                                      name="acessoTotal"
                                                      id="acessoTotal"
                                                      onChange={() =>
                                                        permittedPages.find(
                                                          page =>
                                                            page ===
                                                            "Prospecção"
                                                        ) === "Prospecção" &&
                                                        setRadioValue(
                                                          "acessoTotal"
                                                        )
                                                      }
                                                    />{" "}
                                                    Acesso Total
                                                  </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                  <Label
                                                    id="switchChildren"
                                                    check
                                                  >
                                                    <Input
                                                      checked={
                                                        permittedPages.find(
                                                          page =>
                                                            page ===
                                                            "Prospecção"
                                                        ) === "Prospecção" &&
                                                        radioValue ===
                                                          "acessoRestrito"
                                                      }
                                                      type="radio"
                                                      name="acessoRestrito"
                                                      id="acessoRestrito"
                                                      onChange={() =>
                                                        permittedPages.find(
                                                          page =>
                                                            page ===
                                                            "Prospecção"
                                                        ) === "Prospecção" &&
                                                        setRadioValue(
                                                          "acessoRestrito"
                                                        )
                                                      }
                                                    />{" "}
                                                    Acesso Restrito
                                                  </Label>
                                                </FormGroup>
                                              </FormGroup>
                                            </>
                                          ) : null}
                                        </Col>
                                      </>
                                    );
                                  }
                                  return true;
                                });
                              }
                              return true;
                            })}
                          </Row>
                        </TabPane>

                        <TabPane tabId="Cadastros">
                          <Row>
                            {routes.map(route => {
                              if (
                                route.layout !== "/auth" &&
                                !route.redirect &&
                                route.namePerfil === "Cadastros"
                              ) {
                                return route.views.map((view, index) => {
                                  if (!view.redirect) {
                                    return (
                                      <>
                                        <Col md="4" key={index}>
                                          <CustomInput
                                            defaultChecked={permittedPages.includes(
                                              view.namePerfil
                                            )}
                                            id={view.namePerfil}
                                            type="switch"
                                            label={view.name}
                                            onChange={e =>
                                              handleSwitchChange(
                                                e.target.checked,
                                                e.target.id,
                                                route.namePerfil
                                              )
                                            }
                                          />
                                        </Col>
                                      </>
                                    );
                                  }
                                  return true;
                                });
                              }
                              return true;
                            })}
                          </Row>
                        </TabPane>

                        <TabPane tabId="Apontamentos">
                          <Row>
                            {routes.map(route => {
                              if (
                                route.layout !== "/auth" &&
                                !route.redirect &&
                                route.namePerfil === "Apontamentos"
                              ) {
                                return route.views.map((view, index) => {
                                  if (!view.redirect) {
                                    return (
                                      <>
                                        <Col md="4" key={index}>
                                          <CustomInput
                                            defaultChecked={permittedPages.includes(
                                              view.namePerfil
                                            )}
                                            id={view.namePerfil}
                                            type="switch"
                                            label={view.name}
                                            onChange={e =>
                                              handleSwitchChange(
                                                e.target.checked,
                                                e.target.id,
                                                route.namePerfil
                                              )
                                            }
                                          />
                                        </Col>
                                      </>
                                    );
                                  }
                                  return true;
                                });
                              }
                              return true;
                            })}
                          </Row>
                        </TabPane>

                        <TabPane tabId="Oportunidades">
                          <Row>
                            {routes.map(route => {
                              if (
                                route.layout !== "/auth" &&
                                !route.redirect &&
                                route.namePerfil === "Oportunidades side"
                              ) {
                                return route.views.map((view, index) => {
                                  if (!view.redirect) {
                                    return (
                                      <>
                                        <Col md="4" key={index}>
                                          <CustomInput
                                            defaultChecked={permittedPages.includes(
                                              view.namePerfil
                                            )}
                                            id={view.namePerfil}
                                            type="switch"
                                            label={view.name}
                                            onChange={e =>
                                              handleSwitchChange(
                                                e.target.checked,
                                                e.target.id,
                                                route.namePerfil
                                              )
                                            }
                                          />
                                        </Col>
                                      </>
                                    );
                                  }
                                  return true;
                                });
                              }
                              return true;
                            })}
                          </Row>
                        </TabPane>
                      </TabContent>

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
                      <Link to="/tabelas/aux/perfil">
                        <Button
                          style={{
                            paddingLeft: 32,
                            paddingRight: 33,
                            float: "left"
                          }}
                          color="secundary"
                          size="small"
                          className="text-left"
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
export default PerfilUpdate;
