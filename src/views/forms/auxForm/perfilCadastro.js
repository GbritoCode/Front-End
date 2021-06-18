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
  Form,
  Label,
  Input,
  FormGroup,
  Row,
  Col,
  TabPane,
  TabContent,
  NavItem,
  NavLink,
  Nav,
  CustomInput
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { Link } from "react-router-dom";
import { store } from "~/store";
import { perfilRequest } from "~/store/modules/general/actions";
import api from "~/services/api";
import routes from "~/routes/routes";

export default function PerfilCadastro() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" },
    cod: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  const [horizontalTabs, sethorizontalTabs] = useState("Dashboards");
  const [permittedPages, setPermittedPages] = useState([]);
  const [ParentPagesCounter, setParentPagesCounter] = useState({
    Dashboards: { count: 0, value: "Dashboards" },
    Administração: { count: 0, value: "Administração" },
    Vendas: { count: 0, value: "Vendas" },
    Cadastros: { count: 0, value: "Cadastros" },
    Apontamentos: { count: 0, value: "Apontamentos" },
    Oportunidades: { count: 0, value: "Oportunidades" }
  });

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

  const handleSwitchChange = (checked, name, parentRoute, selectAllId) => {
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
        routes.map(route => {
          if (route.namePerfil === parentRoute) {
            console.log(ParentPagesCounter[route.name]);
            console.log(route.views.filter(view => !view.redirect).length);
            if (
              ParentPagesCounter[route.name].count ===
              route.views.filter(view => !view.redirect).length - 1
            ) {
              console.log(ParentPagesCounter[route.name]);
              console.log(route.views.filter(view => !view.redirect).length);
              document.getElementById(selectAllId).checked = true;
            }
          }
          return true;
        });
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
        routes.map(route => {
          if (route.namePerfil === parentRoute) {
            console.log(ParentPagesCounter[route.name]);
            console.log(route.views.filter(view => !view.redirect).length);
            if (
              ParentPagesCounter[route.name].count !==
              route.views.filter(view => !view.redirect).length - 1
            ) {
              console.log(ParentPagesCounter[route.name]);
              console.log(route.views.filter(view => !view.redirect).length);
              document.getElementById(selectAllId).checked = false;
            }
          }
          return true;
        });
        break;
      default:
    }
  };

  console.log(ParentPagesCounter);

  const handleSwitchAllChange = (checked, parentRoute) => {
    switch (checked) {
      case true:
        routes.map(route => {
          if (route.name === parentRoute && route.layout !== "/auth") {
            route.views.map(view => {
              if (!view.redirect) {
                permittedPages.push(view.namePerfil);
                document.getElementById(view.namePerfil).checked = true;
                if (
                  ParentPagesCounter[parentRoute].count < route.views.length
                ) {
                  setParentPagesCounter(prevState => ({
                    ...prevState,
                    [route.namePerfil]: {
                      count: prevState[route.namePerfil].count + 1,
                      value: route.namePerfil
                    }
                  }));
                }
              }
              return true;
            });
          }
          return true;
        });
        break;
      case false:
        routes.map(route => {
          if (route.name === parentRoute && route.layout !== "/auth") {
            route.views.map(view => {
              if (!view.redirect) {
                setPermittedPages(
                  permittedPages.filter(element => element !== view.namePerfil)
                );
                document.getElementById(view.namePerfil).checked = false;
                setParentPagesCounter(prevState => ({
                  ...prevState,
                  [route.namePerfil]: {
                    count: prevState[route.namePerfil].count - 1,
                    value: route.namePerfil
                  }
                }));
              }
              return true;
            });
          }
          return true;
        });
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
    }

    Object.entries(ParentPagesCounter).forEach(page => {
      if (page[1].count > 0) string += `${page[1].value},`;
    });

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
      const first = false;
      dispatch(
        perfilRequest(
          values.empresaId.value,
          values.desc.value,
          values.cod.value,
          string,
          first
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
                      <FormGroup className={`has-label ${values.desc.error}`}>
                        <Input
                          name="license"
                          type="text"
                          onChange={event =>
                            handleChange(event, "desc", "text")
                          }
                          value={values.desc.value}
                        />
                        {values.desc.error === "has-danger" ? (
                          <Label className="error">{values.desc.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Código</Label>
                      <FormGroup className={`has-label ${values.cod.error}`}>
                        <Input
                          name="license"
                          type="text"
                          onChange={event => handleChange(event, "cod", "text")}
                          value={values.cod.value}
                        />
                        {values.cod.error === "has-danger" ? (
                          <Label className="error">{values.cod.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <hr />

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
                          changeActiveTab(e, "horizontalTabs", "Apontamentos")
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
                          changeActiveTab(e, "horizontalTabs", "Oportunidades")
                        }
                      >
                        Oportunidades
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent className="tab-space" activeTab={horizontalTabs}>
                    <TabPane tabId="Dashboards">
                      <Row>
                        <Col md="4" style={{ marginBottom: 10 }}>
                          <CustomInput
                            id="selectAllDash"
                            type="switch"
                            label="Selecionar todos"
                            onChange={e =>
                              handleSwitchAllChange(
                                e.target.checked,
                                "Dashboards"
                              )
                            }
                          />
                        </Col>
                      </Row>
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
                                        id={view.namePerfil}
                                        type="switch"
                                        label={view.name}
                                        onChange={e =>
                                          handleSwitchChange(
                                            e.target.checked,
                                            e.target.id,
                                            route.namePerfil,
                                            "selectAllDash"
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
                        <Col md="4" style={{ marginBottom: 10 }}>
                          <CustomInput
                            id="selectAllAdmin"
                            type="switch"
                            label="Selecionar todos"
                            onChange={e =>
                              handleSwitchAllChange(
                                e.target.checked,
                                "Administração"
                              )
                            }
                          />
                        </Col>
                      </Row>
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
                                        id={view.namePerfil}
                                        type="switch"
                                        label={view.name}
                                        onChange={e =>
                                          handleSwitchChange(
                                            e.target.checked,
                                            e.target.id,
                                            route.namePerfil,
                                            "selectAllAdmin"
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
                        <Col md="4" style={{ marginBottom: 10 }}>
                          <CustomInput
                            id="selectAllVendas"
                            type="switch"
                            label="Selecionar todos"
                            onChange={e =>
                              handleSwitchAllChange(e.target.checked, "Vendas")
                            }
                          />
                        </Col>
                      </Row>
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
                                        id={view.namePerfil}
                                        type="switch"
                                        label={view.name}
                                        onChange={e =>
                                          handleSwitchChange(
                                            e.target.checked,
                                            e.target.id,
                                            route.namePerfil,
                                            "selectAllVendas"
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

                    <TabPane tabId="Cadastros">
                      <Row>
                        <Col md="4" style={{ marginBottom: 10 }}>
                          <CustomInput
                            id="selectAllCad"
                            type="switch"
                            label="Selecionar todos"
                            onChange={e =>
                              handleSwitchAllChange(
                                e.target.checked,
                                "Cadastros"
                              )
                            }
                          />
                        </Col>
                      </Row>
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
                                        id={view.namePerfil}
                                        type="switch"
                                        label={view.name}
                                        onChange={e =>
                                          handleSwitchChange(
                                            e.target.checked,
                                            e.target.id,
                                            route.namePerfil,
                                            "selectAllCad"
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
                        <Col md="4" style={{ marginBottom: 10 }}>
                          <CustomInput
                            id="selectAllApont"
                            type="switch"
                            label="Selecionar todos"
                            onChange={e =>
                              handleSwitchAllChange(
                                e.target.checked,
                                "Apontamentos"
                              )
                            }
                          />
                        </Col>
                      </Row>
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
                                        id={view.namePerfil}
                                        type="switch"
                                        label={view.name}
                                        onChange={e =>
                                          handleSwitchChange(
                                            e.target.checked,
                                            e.target.id,
                                            route.namePerfil,
                                            "selectAllApont"
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
                        <Col md="4" style={{ marginBottom: 10 }}>
                          <CustomInput
                            id="selectAllOpt"
                            type="switch"
                            label="Selecionar todos"
                            onChange={e =>
                              handleSwitchAllChange(
                                e.target.checked,
                                "Oportunidades"
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Row>
                        {routes.map(route => {
                          if (
                            route.layout !== "/auth" &&
                            !route.redirect &&
                            route.namePerfil === "Oportunidades"
                          ) {
                            return route.views.map((view, index) => {
                              if (!view.redirect) {
                                return (
                                  <>
                                    <Col md="4" key={index}>
                                      <CustomInput
                                        id={view.namePerfil}
                                        type="switch"
                                        label={view.name}
                                        onChange={e =>
                                          handleSwitchChange(
                                            e.target.checked,
                                            e.target.id,
                                            route.namePerfil,
                                            "selectAllOpt"
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
                  <Link to="/tabelas/aux/perfil">
                    <Button
                      style={{
                        paddingLeft: 32,
                        paddingRight: 33
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
