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
import ReactTable from "react-table-v6";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import classNames from "classnames";
import Tooltip from "@material-ui/core/Tooltip";
import EventNoteIcon from "@material-ui/icons/EventNote";
import {
  AttachMoney,
  Check,
  Close,
  Contacts,
  FormatListBulleted,
  InfoOutlined,
  PostAdd
} from "@material-ui/icons";
import { isBefore } from "date-fns";
import { normalizeCnpj, normalizeFone } from "~/normalize";
import { store } from "~/store";
import { ClienteUpdate } from "~/store/modules/Cliente/actions";
import api from "~/services/api";
import { Footer, Header } from "~/components/Modal/modalStyles";
import Modal from "~/components/Modal/modalLarge";

/* eslint-disable eqeqeq */
function ClienteUpdatee() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const dispatch = useDispatch();
  const { id, prospect } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [data4, setData4] = useState([]);
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    cnpj: { value: "", error: "", message: "" },
    rzSoc: { value: "", error: "", message: "" },
    nomeAbv: { value: "", error: "", message: "" },
    representante: { value: "", error: "", message: "" },
    tipoComiss: { value: null, error: "", message: "", optional: true },
    fone: { value: "", error: "", message: "", optional: true },
    site: { value: "", error: "", message: "", optional: true },
    fantasia: { value: "", error: "", message: "", optional: true },
    atvPrincipal: { value: "", error: "", message: "", optional: true },
    erp: { value: "", error: "", message: "", optional: true },
    database: { value: "", error: "", message: "", optional: true },
    ramo: { value: "", error: "", message: "", optional: true },
    setor: { value: "", error: "", message: "", optional: true },
    qtdFuncionarios: { value: "", error: "", message: "", optional: true }
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      setIsLoading(true);
      const response = await api.get(`/cliente/${id}`);
      const response1 = await api.get(`/tipoComiss`);
      const response2 = await api.get(`/representante`);
      const response3 = await api.get(`/empresa/${empresa}`);
      setData1(response1.data);
      setData2(response2.data);
      setData4(
        response.data.Campanhas.filter(
          arr => arr.Campanhas_Clientes.ClienteId === response.data.id
        ).map((camp, key) => {
          let situation = true;
          if (
            isBefore(new Date(camp.dataFim), new Date()) ||
            !camp.Campanhas_Clientes.ativo
          ) {
            situation = false;
          }
          return {
            idd: key,
            id: camp.id,
            cod: camp.cod,
            desc: camp.desc,
            colab: camp.Colab.nome,
            clientes: camp.Clientes,
            lastFUP:
              camp.FollowUps.find(arr => arr.ClienteId === response.data.id) !==
              undefined
                ? camp.FollowUps.find(arr => arr.ClienteId === response.data.id)
                    .dataContato
                : "--",
            situacao: situation ? "Em Prospecção" : "Finalizado",
            created:
              camp.FollowUps.find(arr => arr.ClienteId === response.data.id) !==
              undefined
                ? camp.FollowUps.reverse().find(
                    arr => arr.ClienteId === response.data.id
                  ).dataContato
                : "--"
          };
        })
      );
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response3.data.id },
        cnpj: { value: normalizeCnpj(response.data.CNPJ) },
        nomeAbv: { value: response.data.nomeAbv },
        representante: { value: response.data.RepresentanteId },
        tipoComiss: {
          value: response.data.TipoComisseId ? response.data.TipoComisseId : "",
          optional: true
        },
        rzSoc: { value: response.data.rzSoc },
        site: { value: response.data.site, optional: true },
        fone: { value: normalizeFone(response.data.fone), optional: true },
        fantasia: { value: response.data.fantasia, optional: true },
        atvPrincipal: { value: response.data.atvPrincipal, optional: true },
        erp: { value: response.data.erp, optional: true },
        database: { value: response.data.database, optional: true },
        ramo: { value: response.data.ramo, optional: true },
        setor: { value: response.data.setor, optional: true },
        qtdFuncionarios: {
          value: response.data.qtdFuncionarios,
          optional: true
        }
      }));
      setIsLoading(false);
    }
    loadData();
  }, [id]);
  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj == "") return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj === "00000000000000" ||
      cnpj === "11111111111111" ||
      cnpj === "22222222222222" ||
      cnpj === "33333333333333" ||
      cnpj === "44444444444444" ||
      cnpj === "55555555555555" ||
      cnpj === "66666666666666" ||
      cnpj === "77777777777777" ||
      cnpj === "88888888888888" ||
      cnpj === "99999999999999"
    )
      return false;

    // Valida DVs
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }

  const renderCnpjState = value => {
    if (!validarCNPJ(value)) {
      setValues(prevState => ({
        ...prevState,
        cnpj: {
          error: "has-danger",
          message: "Insira um CNPJ válido"
        }
      }));
    } else {
      setValues(prevState => ({
        ...prevState,
        cnpj: { value, error: "has-success", message: "" }
      }));
    }
  };

  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const verifyUrl = value => {
    const UrlRegex = new RegExp(
      "(https:[/][/]|http:[/][/])[a-zA-Z0-9-.]+(.[.][a-zA-Z]{2,6})(:[0-9]{1,5})*(/($|[a-zA-Z0-9.,;?'\\+&amp;%$#=~_-]+))*$"
    );
    if (value) {
      if (UrlRegex.test(value)) {
        return true;
      }
      return false;
    }
    return true;
  };

  const checkDesc = value => {
    switch (value) {
      case "1":
        return "Indicação";
      case "2":
        return "Representação";
      case "3":
        return "Prospecção";
      case "4":
        return "Interna";
      default:
    }
  };

  const handleChange = (event, name, type) => {
    event.persist();
    const target = event.target.value;
    switch (type) {
      case "number":
        if (verifyNumber(target)) {
          setValues(prevState => ({
            ...prevState,
            [name]: { value: target, error: "has-success" }
          }));
        } else {
          setValues(prevState => ({
            ...prevState,
            [name]: {
              value: target,
              error: "has-danger",
              message: "Insira um número válido"
            }
          }));
        }
        break;
      case "url":
        if (verifyUrl(target)) {
          setValues(prevState => ({
            ...prevState,
            [name]: { value: target, error: "has-success", optional: true }
          }));
        } else {
          setValues(prevState => ({
            ...prevState,
            [name]: {
              value: target,
              error: "has-danger",
              message: "Insira uma URL no padrão 'https://www.exemplo.com'",
              optional: true
            }
          }));
        }
        break;
      case "cnpj":
        setValues(prevState => ({
          ...prevState,
          cnpj: { value: normalizeCnpj(target) }
        }));
        break;
      case "optional":
        setValues(prevState => ({
          ...prevState,
          [name]: { value: target, optional: true }
        }));
        break;
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

  function checkProsp(param, aux) {
    switch (aux) {
      case "icons":
        switch (param) {
          case "false":
            return <></>;

          default:
            break;
        }
        break;
      case "title":
        switch (param) {
          case "false":
            return "Cliente";
          case "true":
            return "Prospect";
          default:
            break;
        }
        break;
      case "backButton":
        switch (param) {
          case "false":
            return (
              <Link to="/tabelas/cliente/cliente">
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
            );
          case "true":
            return (
              <Link to="/tabelas/cliente/prospect">
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
            );
          default:
            break;
        }
        break;
      default:
        break;
    }
  }
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
      if (!aux[j][1].optional === true) {
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
    }

    if (valid && filled) {
      const foneDb = values.fone.value
        ? values.fone.value.replace(/[^\d]+/g, "")
        : "";
      dispatch(
        ClienteUpdate({
          id,
          nomeAbv: values.nomeAbv.value,
          rzSoc: values.rzSoc.value,
          fantasia: values.fantasia.value,
          RepresentanteId: values.representante.value,
          TipoComisseId:
            values.tipoComiss.value === "" ? null : values.tipoComiss.value,
          prospect,
          site: values.site.value,
          fone: foneDb,
          erp: values.erp.value,
          database: values.database.value,
          ramo: values.ramo.value,
          setor: values.setor.value,
          qtdFuncionarios: values.qtdFuncionarios.value
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
        <>
          <div className="content" />
        </>
      ) : (
        <>
          <div className="rna-container">
            <NotificationAlert ref={notifyElment} />
          </div>
          <div className="content">
            <Modal
              onClose={() => {
                setIsOpen(false);
              }}
              open={isOpen}
            >
              <Header>
                {" "}
                <Tooltip title="Fechar">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Close fontSize="large" />
                  </Button>
                </Tooltip>
                <h4 className="modalHeader">Campanhas</h4>
              </Header>

              <ReactTable
                onFilteredChange={() => {}}
                data={data4}
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
                    Header: "Código",
                    accessor: "cod"
                  },
                  {
                    Header: "Descrição",
                    accessor: "desc"
                  },
                  {
                    Header: "data Inclusão",
                    accessor: "created"
                  },
                  {
                    Header: "data Último FUP",
                    accessor: "lastFUP"
                  },
                  {
                    Header: "situacao",
                    accessor: "situacao"
                  }
                ]}
                defaultPageSize={6}
                pageSizeOptions={[6, 10, 50, 100]}
                className="-striped -highlight"
              />

              <Footer />
            </Modal>

            <Modal
              onClose={() => {
                setIsOpenInfo(!isOpenInfo);
              }}
              open={isOpenInfo}
            >
              <Header>
                <Tooltip title="Fechar">
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpenInfo(false);
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
                    onClick={() => setIsOpenInfo(false)}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <Check fontSize="large" />
                  </Button>
                </Tooltip>{" "}
                <h3 style={{ marginBottom: 0 }}>Informações Opcionais</h3>
              </Header>
              <Row>
                <Col sm="4">
                  <Label>ERP</Label>
                  <FormGroup className={`has-label ${values.erp.error}`}>
                    <Input
                      onChange={event => handleChange(event, "erp", "optional")}
                      value={values.erp.value}
                      id="Clierp"
                      name="Clierp"
                      type="text"
                    />
                    {values.erp.error === "has-danger" ? (
                      <Label className="error">{values.erp.message}</Label>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Banco de Dados</Label>
                  <FormGroup className={`has-label ${values.database.error}`}>
                    <Input
                      onChange={event =>
                        handleChange(event, "database", "optional")
                      }
                      value={values.database.value}
                      id="Clidatabase"
                      name="Clidatabase"
                      type="text"
                    />
                    {values.database.error === "has-danger" ? (
                      <Label className="error">{values.database.message}</Label>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Ramo</Label>
                  <FormGroup className={`has-label ${values.ramo.error}`}>
                    <Input
                      onChange={event =>
                        handleChange(event, "ramo", "optional")
                      }
                      value={values.ramo.value}
                      id="Cliramo"
                      name="Cliramo"
                      type="text"
                    />
                    {values.ramo.error === "has-danger" ? (
                      <Label className="error">{values.ramo.message}</Label>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <Label>Setor</Label>
                  <FormGroup className={`has-label ${values.setor.error}`}>
                    <Input
                      onChange={event =>
                        handleChange(event, "setor", "optional")
                      }
                      value={values.setor.value}
                      id="Clisetor"
                      name="Clisetor"
                      type="text"
                    />
                    {values.setor.error === "has-danger" ? (
                      <Label className="error">{values.setor.message}</Label>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm="4">
                  <Label>Quantidade de Funcionários</Label>
                  <FormGroup
                    className={`has-label ${values.qtdFuncionarios.error}`}
                  >
                    <Input
                      onChange={event =>
                        handleChange(event, "qtdFuncionarios", "optional")
                      }
                      value={values.qtdFuncionarios.value}
                      id="CliqtdFuncionarios"
                      name="CliqtdFuncionarios"
                      type="text"
                    />
                    {values.qtdFuncionarios.error === "has-danger" ? (
                      <Label className="error">
                        {values.qtdFuncionarios.message}
                      </Label>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Footer />
            </Modal>

            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">
                      <UncontrolledDropdown style={{ float: "right" }}>
                        <DropdownToggle
                          caret
                          color="default"
                          data-toggle="dropdown"
                          nav
                          onClick={e => e.preventDefault()}
                        >
                          <PostAdd />
                          <div className="photo" />
                        </DropdownToggle>
                        <DropdownMenu
                          className="dropdown-navbar"
                          right
                          tag="ul"
                        >
                          <NavLink tag="li">
                            <Link to={`/cliente/comp_update/${id}/${prospect}`}>
                              <DropdownItem
                                style={{ paddingLeft: "3%" }}
                                className="nav-item"
                              >
                                <EventNoteIcon
                                  style={{ float: "left", marginRight: "3%" }}
                                  fontSize="small"
                                />
                                <p style={{ paddingTop: "2%" }}>Complemento</p>
                              </DropdownItem>
                            </Link>
                          </NavLink>
                          <NavLink hidden={prospect === "true"} tag="li">
                            <Link to={`/tabelas/cliente/rec_desp/${id}`}>
                              <DropdownItem
                                style={{ paddingLeft: "3%" }}
                                className="nav-item"
                              >
                                <AttachMoney
                                  style={{ float: "left", marginRight: "3%" }}
                                  fontSize="small"
                                />
                                <p style={{ paddingTop: "2%" }}>
                                  Receita/Despesa
                                </p>
                              </DropdownItem>
                            </Link>
                          </NavLink>
                          <NavLink onClick={() => setIsOpenInfo(true)} tag="li">
                            <Link
                              to={`/tabelas/cliente/cont/${id}/?prospect=${prospect}`}
                            >
                              <DropdownItem
                                style={{ paddingLeft: "3%" }}
                                className="nav-item"
                              >
                                <Contacts
                                  style={{ float: "left", marginRight: "3%" }}
                                  fontSize="small"
                                />
                                <p style={{ paddingTop: "2%" }}>Contato</p>
                              </DropdownItem>
                            </Link>
                          </NavLink>
                          <NavLink onClick={() => setIsOpen(true)} tag="li">
                            <DropdownItem
                              style={{ paddingLeft: "3%" }}
                              className="nav-item"
                            >
                              <FormatListBulleted
                                style={{ float: "left", marginRight: "3%" }}
                                fontSize="small"
                              />
                              <p style={{ paddingTop: "2%" }}>Campanhas</p>
                            </DropdownItem>
                          </NavLink>
                          <NavLink onClick={() => setIsOpenInfo(true)} tag="li">
                            <DropdownItem
                              style={{ paddingLeft: "3%" }}
                              className="nav-item"
                            >
                              <InfoOutlined
                                style={{ float: "left", marginRight: "3%" }}
                                fontSize="small"
                              />
                              <p style={{ paddingTop: "2%" }}>Informações</p>
                            </DropdownItem>
                          </NavLink>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      {checkProsp(prospect, "title")}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <Label>CNPJ</Label>
                          <FormGroup
                            className={`has-label ${values.cnpj.error}`}
                          >
                            <Input
                              disabled
                              maxLength={18}
                              name="cnpj"
                              type="text"
                              onChange={event =>
                                handleChange(event, "cnpj", "cnpj")
                              }
                              value={values.cnpj.value}
                              onBlur={e => {
                                const { value } = e.target;
                                renderCnpjState(value);
                              }}
                            />

                            {values.cnpj.error === "has-danger" ? (
                              <Label className="error">
                                {values.cnpj.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Razão Social</Label>
                          <FormGroup
                            className={`has-label ${values.rzSoc.error}`}
                          >
                            <Input
                              disabled
                              id="rzSoc"
                              name="rzSoc"
                              type="text"
                              onChange={event =>
                                handleChange(event, "rzSoc", "text")
                              }
                              value={values.rzSoc.value}
                            />
                            {values.rzSoc.error === "has-danger" ? (
                              <Label className="error">
                                {values.rzSoc.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Nome Fantasia</Label>
                          <FormGroup
                            className={`has-label ${values.fantasia.error}`}
                          >
                            <Input
                              disabled
                              onChange={event =>
                                handleChange(event, "fantasia", "optional")
                              }
                              value={values.fantasia.value}
                              name="nomeAbv"
                              type="text"
                            />
                            {values.fantasia.error === "has-danger" ? (
                              <Label className="error">
                                {values.fantasia.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="4">
                          <Label>Nome Abreviado</Label>
                          <FormGroup
                            className={`has-label ${values.nomeAbv.error}`}
                          >
                            <Input
                              name="name_abv"
                              type="text"
                              onChange={event =>
                                handleChange(event, "nomeAbv", "text")
                              }
                              value={values.nomeAbv.value}
                            />
                            {values.nomeAbv.error === "has-danger" ? (
                              <Label className="error">
                                {values.nomeAbv.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Representante</Label>
                          <FormGroup
                            className={`has-label ${values.representante.error}`}
                          >
                            <Input
                              name="representante"
                              type="select"
                              onChange={event =>
                                handleChange(event, "representante", "text")
                              }
                              value={values.representante.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o representante{" "}
                              </option>
                              {data2.map(representante => (
                                <option
                                  key={representante.id}
                                  value={representante.id}
                                >
                                  {" "}
                                  {representante.nome}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.representante.error === "has-danger" ? (
                              <Label className="error">
                                {values.representante.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Tipo Comissão</Label>
                          <FormGroup
                            className={`has-label ${values.tipoComiss.error}`}
                          >
                            <Input
                              name="tipoComiss"
                              type="select"
                              onChange={event =>
                                handleChange(event, "tipoComiss", "optional")
                              }
                              value={values.tipoComiss.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o tipo de comissão{" "}
                              </option>
                              {data1.map(tipoComiss => (
                                <option
                                  key={tipoComiss.id}
                                  value={tipoComiss.id}
                                >
                                  {" "}
                                  {tipoComiss.id} - {checkDesc(tipoComiss.desc)}{" "}
                                </option>
                              ))}
                            </Input>
                            {values.tipoComiss.error === "has-danger" ? (
                              <Label className="error">
                                {values.tipoComiss.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Site</Label>
                          <FormGroup
                            className={`has-label ${values.site.error}`}
                          >
                            <Input
                              name="site"
                              type="text"
                              onChange={event =>
                                handleChange(event, "site", "url")
                              }
                              value={values.site.value}
                            />
                            {values.site.error === "has-danger" ? (
                              <Label className="error">
                                {values.site.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Telefone</Label>
                          <FormGroup
                            className={`has-label ${values.fone.error}`}
                          >
                            <Input
                              minLength={10}
                              maxLength={11}
                              name="fone"
                              type="text"
                              onChange={event =>
                                handleChange(event, "fone", "optional")
                              }
                              onBlur={e => {
                                const { value } = e.target;
                                setValues(prevState => ({
                                  ...prevState,
                                  fone: {
                                    value: normalizeFone(value),
                                    optional: true
                                  }
                                }));
                              }}
                              value={values.fone.value}
                            />
                            {values.fone.error === "has-danger" ? (
                              <Label className="error">
                                {values.fone.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Label>Atividade Principal</Label>
                          <FormGroup
                            className={`has-label ${values.atvPrincipal.error}`}
                          >
                            <Input
                              disabled
                              name="atvPrincipal"
                              type="textarea"
                              onChange={event =>
                                handleChange(event, "atvPrincipal", "optional")
                              }
                              value={values.atvPrincipal.value}
                            />
                            {values.atvPrincipal.error === "has-danger" ? (
                              <Label className="error">
                                {values.atvPrincipal.message}
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
                      {checkProsp(prospect, "backButton")}
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
export default ClienteUpdatee;
