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
import ReactTable from "react-table-v6";

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
  InputGroup,
  InputGroupAddon,
  CustomInput,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  DropdownItem
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { Link, useParams } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import { Check, Close, InfoOutlined, List, PostAdd } from "@material-ui/icons";
import { store } from "~/store";
import api from "~/services/api";
import { campanhaUpdate } from "~/store/modules/Cliente/actions";
import Modal from "~/components/Modal/modalLarge";
import { Header, Footer } from "~/components/Modal/modalStyles";
import { normalizeCpf } from "~/normalize";

export default function UpdateCampanha() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const { id } = useParams();
  const dispatch = useDispatch();
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cod: { value: "", error: "", message: "" },
    desc: { value: "", error: "", message: "" },
    dataInic: { value: "", error: "", message: "" },
    dataFim: { value: "", error: "", message: "" },
    ColabId: { value: "", error: "", message: "" },
    objetivo: { value: "", error: "", message: "" }
  };
  const [isOpenFields, setIsOpenFields] = useState(false);
  const [values, setValues] = useState(stateSchema);
  const [isLoading, setIsLoading] = useState(true);
  const [data2, setData2] = useState([]);
  const [data1, setData1] = useState([]);
  const [isOpenColab, setIsOpenColab] = useState(false);
  const [colabNome, setColabNome] = useState("");
  const [dashFields] = useState({
    StatusCli: "Funil De Vendas",
    FupsTot: "Follow Ups",
    EmpFin: "Empresas Finalizadas",
    FupsProx: "Follow Ups em Aberto",
    FinsMotivo: "Finalizações por Motivo"
  });
  const [string, setString] = useState("");

  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      const response = await api.get(`/empresa/${empresa}`);
      const response1 = await api.get(`/campanha/${id}/true`);
      const response2 = await api.get(`/colab`);
      setData1(response1.data);
      setData2(response2.data);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.id },
        cod: { value: response1.data.cod },
        desc: { value: response1.data.desc },
        dataInic: { value: response1.data.dataInic },
        dataFim: { value: response1.data.dataFim },
        ColabId: { value: response1.data.ColabId },
        objetivo: { value: response1.data.objetivo }
      }));

      setString(response1.data.dashFields);
      setColabNome(
        response2.data.find(arr => arr.id === response1.data.ColabId).nome
      );

      setIsLoading(false);
    }
    loadData();
  }, [id]);
  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const handleSwitchChange = (checked, field) => {
    if (checked && dashFields.some(arr => arr === field)) {
      setString(`${string}${field},`);
    }
    if (!checked && dashFields.some(arr => arr === field)) {
      setString(string.replace(`${field},`, ""));
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
        campanhaUpdate({
          id,
          EmpresaId: values.empresaId.value,
          cod: values.cod.value,
          desc: values.desc.value,
          dataaInic: values.dataInic.value,
          dataFim: values.dataFim.value,
          ColabId: values.ColabId.value,
          objetivo: values.objetivo.value,
          dashFields: string
        })
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
            <Modal
              onClose={() => {
                setIsOpenColab(false);
              }}
              open={isOpenColab}
            >
              <Header>
                {" "}
                <h4 className="modalHeader">Representante</h4>
              </Header>

              <ReactTable
                data={data2.map((colab, index) => {
                  return {
                    idd: index,
                    id: colab.id,
                    CPF: normalizeCpf(colab.CPF),
                    nome: colab.nome,
                    dtAdmiss: colab.dtAdmiss,
                    espec: colab.espec
                  };
                })}
                getTdProps={(state, rowInfo) => {
                  return {
                    onClick: () => {
                      setValues(prevState => ({
                        ...prevState,
                        ColabId: {
                          value: rowInfo.original.id
                        }
                      }));
                      document.getElementsByName("ColabId")[0].value =
                        rowInfo.original.nome;
                      setIsOpenColab(false);
                    }
                  };
                }}
                filterable
                defaultFilterMethod={(filter, row) => {
                  const id = filter.pivotId || filter.id;
                  return row[id] !== undefined
                    ? String(row[id])
                        .toLowerCase()
                        .includes(filter.value.toLowerCase())
                    : true;
                }}
                previousText="Anterior"
                nextText="Próximo"
                loadingText="Carregando"
                noDataText="Dados não encontrados"
                pageText="Página"
                ofText="de"
                rowsText="Linhas"
                columns={[
                  {
                    Header: "Nome",
                    accessor: "nome"
                  },
                  {
                    Header: "CPF",
                    accessor: "CPF"
                  },
                  {
                    Header: "Data de Adimissão",
                    accessor: "dtAdmiss"
                  },
                  {
                    Header: "Especialidade",
                    accessor: "espec"
                  }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
              />

              <Footer />
            </Modal>

            <Modal
              onClose={() => {
                setIsOpenFields(!isOpenFields);
              }}
              open={isOpenFields}
            >
              <Header>
                <Tooltip title="Fechar">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpenFields(false);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Close fontSize="large" />
                  </Button>
                </Tooltip>{" "}
                <Tooltip title="Ok">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => setIsOpenFields(false)}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Check fontSize="large" />
                  </Button>
                </Tooltip>{" "}
                <h3 style={{ marginBottom: 0 }}>
                  Indicadores Dashboard Comercial
                </h3>
              </Header>
              <Row>
                {Object.keys(dashFields).map((field, index) => {
                  return (
                    <>
                      <Col sm="4" key={index}>
                        <CustomInput
                          defaultChecked={string.search(field) > -1}
                          key={index}
                          id={field}
                          type="switch"
                          label={dashFields[field]}
                          onChange={e =>
                            handleSwitchChange(e.target.checked, field)
                          }
                        />
                      </Col>
                    </>
                  );
                })}
              </Row>
              <Footer />
            </Modal>

            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <UncontrolledDropdown style={{ float: "right" }}>
                      <DropdownToggle
                        style={{ paddingLeft: "0px" }}
                        caret
                        color="default"
                        data-toggle="dropdown"
                        nav
                        onClick={e => e.preventDefault()}
                      >
                        <PostAdd />
                        <div className="photo" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-navbar" right tag="ul">
                        <NavLink onClick={() => setIsOpenFields(true)} tag="li">
                          {" "}
                          <DropdownItem
                            style={{ paddingLeft: "3%" }}
                            className="nav-item"
                          >
                            <InfoOutlined
                              style={{ float: "left", marginRight: "3%" }}
                              fontSize="small"
                            />
                            <p style={{ paddingTop: "2%" }}>
                              Indicadores Dashboard
                            </p>
                          </DropdownItem>
                        </NavLink>
                        <NavLink tag="li">
                          <Link to={`/tabelas/campanhas/clientes/${data1.id}`}>
                            <DropdownItem
                              style={{ paddingLeft: "3%" }}
                              className="nav-item"
                            >
                              <List
                                style={{ float: "left", marginRight: "3%" }}
                                fontSize="small"
                              />
                              <p style={{ paddingTop: "2%" }}>Empresas</p>
                            </DropdownItem>
                          </Link>
                        </NavLink>
                      </DropdownMenu>
                    </UncontrolledDropdown>

                    <CardTitle tag="h4">Campanha</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <Label>Código</Label>
                          <FormGroup
                            className={`has-label ${values.cod.error}`}
                          >
                            <Input
                              disabled
                              name="cod"
                              type="text"
                              onChange={event =>
                                handleChange(event, "cod", "text")
                              }
                              value={values.cod.value}
                            />{" "}
                            {values.cod.error === "has-danger" ? (
                              <Label className="error">
                                {values.cod.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="8">
                          <Label>Descrição</Label>
                          <FormGroup
                            className={`has-label ${values.desc.error}`}
                          >
                            <Input
                              name="desc"
                              type="text"
                              onChange={event =>
                                handleChange(event, "desc", "text")
                              }
                              value={values.desc.value}
                            />{" "}
                            {values.desc.error === "has-danger" ? (
                              <Label className="error">
                                {values.desc.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Responsável</Label>
                          <FormGroup
                            className={`has-label ${values.ColabId.error}`}
                          >
                            <InputGroup>
                              <Input
                                disabled
                                name="ColabId"
                                type="text"
                                defaultValue={colabNome}
                                placeholder="Selecione o Responsável"
                              />
                              <InputGroupAddon
                                className="appendCustom"
                                addonType="append"
                              >
                                <Button
                                  className={classNames(
                                    "btn-icon btn-link like addon"
                                  )}
                                  onClick={() => setIsOpenColab(!isOpenColab)}
                                >
                                  <i className="tim-icons icon-zoom-split addon" />
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>

                            {values.ColabId.error === "has-danger" ? (
                              <Label className="error">
                                {values.ColabId.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Data Início</Label>
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
                          <Label>Data Fim</Label>
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
                      <Row>
                        <Col md="12">
                          <Label>Objetivo</Label>
                          <FormGroup
                            className={`has-label ${values.objetivo.error}`}
                          >
                            <Input
                              name="objetivo"
                              type="textarea"
                              onChange={event =>
                                handleChange(event, "objetivo", "text")
                              }
                              value={values.objetivo.value}
                            />
                            {values.objetivo.error === "has-danger" ? (
                              <Label className="error">
                                {values.objetivo.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

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
                      <Link to="/tabelas/cliente/campanha">
                        <Button
                          style={{
                            paddingLeft: 32,
                            paddingRight: 33,
                            float: "left"
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
