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
import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import ReactTable from "react-table-v6";

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
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { useParams, Link } from "react-router-dom";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { Check, Close, DoneAll } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import TagsInput from "~/components/Tags/TagsInput";
import { normalizeCurrency, normalizeCpf } from "~/normalize";
import api from "~/services/api";
import { Footer, Header } from "~/components/Modal/modalStyles";
import ModalLarge from "~/components/Modal/modalLarge";
import { ExtUserUpdate } from "~/store/modules/ExtUser/actions";

/* eslint-disable eqeqeq */
export default function ExtUserCadastro() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  let reactTable = useRef(null);

  const dispatch = useDispatch();
  const { id: userId } = useParams();

  const [actualUser, setActualUser] = useState({});
  const [profileData, setProfileData] = useState([]);
  const [clientsList, setClientsList] = useState([]);
  const [selectedCli, setSelectedCli] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const stateSchema = {
    cpf: { value: "", error: "", message: "" },
    nome: { value: "", error: "", message: "" },
    PerfilUser: { value: "", error: "", message: "" },
    email: { value: "", error: "", message: "" },
    mainClient: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);

  useEffect(() => {
    async function loadData() {
      const userResponse = await api.get(`/users/${userId}`);
      const profileResponse = await api.get(`/perfil`);
      const clientListReq = await api.get(`/cliente/`);

      setActualUser(userResponse.data);
      setProfileData(profileResponse.data);
      setClientsList(clientListReq.data);

      setValues({
        cpf: { value: userResponse.data.Colab.CPF },
        nome: { value: userResponse.data.nome },
        PerfilUser: { value: userResponse.data.Colab.PerfilId },
        email: { value: userResponse.data.email },
        mainClient: {
          value:
            clientListReq.data.find(
              el => el.id === Number(userResponse.data.mainClient)
            )?.nomeAbv || ""
        }
      });

      setSelectedCli(
        clientListReq.data.filter(el => {
          el.mainClient = Number(userResponse.data.mainClient) === el.id;
          return userResponse.data.allowedClients?.includes(`${el.id}`);
        })
      );
    }
    loadData();
  }, [userId]);

  var options = {};

  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf == "") return false;
    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;

    for (var i = 1; i <= 9; i++)
      Soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10), 10)) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11), 10)) return false;
    return true;
  }

  const renderCpfState = value => {
    if (!validarCPF(value)) {
      setValues(prevState => ({
        ...prevState,
        cpf: { error: "has-danger", message: "Insira um cpf válido" }
      }));
    } else {
      setValues(prevState => ({
        ...prevState,
        cpf: { value, error: "has-success", message: "" }
      }));
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
      case "email":
        if (verifyEmail(target)) {
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
              message: "Insira um E-mail válido"
            }
          }));
        }
        break;
      case "cpf":
        setValues(prevState => ({
          ...prevState,
          cpf: { value: normalizeCpf(target) }
        }));
        break;
      case "currencyOptional":
        setValues(prevState => ({
          ...prevState,
          [name]: { value: normalizeCurrency(target) }
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
      if (!aux[j][1].optional) {
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
      var cpfdb = values.cpf.value.replace(/[^\d]+/g, "");
      dispatch(
        ExtUserUpdate({
          CPF: cpfdb,
          nome: values.nome.value,
          PerfilId: values.PerfilUser.value,
          email: values.email.value,
          allowedClients: selectedCli.map(el => el.id).join(";"),
          mainClient: selectedCli.find(el => el.mainClient).id,
          UserId: actualUser.id,
          ColabId: actualUser.Colab.id
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

  const handleTagsinput = value => {
    setSelectedCli(clientsList.filter(el => value.includes(el.nomeAbv)));
    if (selectedCli.length === 0) {
      setValues(prevState => {
        return {
          ...prevState,
          mainClient: { value: "", error: "", message: "" }
        };
      });
    }
  };

  const handleClientClick = (clickedClient, state) => {
    const clientIndex = selectedCli.findIndex(el => el.id === clickedClient.id);

    if (clientIndex > -1) {
      if (!clickedClient.mainClient) {
        setClientsList(
          state.data.map(el => ({
            ...el,
            mainClient: el.id === clickedClient.id
          }))
        );
        setSelectedCli(prevState => {
          return prevState.map(el => ({
            ...el,
            mainClient: el.id === clickedClient.id
          }));
        });
        setValues(prevState => {
          return {
            ...prevState,
            mainClient: { value: clickedClient.nomeAbv, error: "", message: "" }
          };
        });
        return;
      }

      setSelectedCli(prevState => {
        return prevState.filter(el => el.id !== clickedClient.id);
      });
      setClientsList(
        state.data.map(el => ({
          ...el,
          mainClient: false
        }))
      );
      setValues(prevState => {
        return {
          ...prevState,
          mainClient: { value: "", error: "", message: "" }
        };
      });
    } else {
      setSelectedCli(prevState => {
        return [...prevState, clickedClient];
      });
    }
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notifyElment} />
      </div>
      <div className="content">
        <ModalLarge
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
            <Tooltip title="Ok">
              <Button
                style={{
                  float: "right"
                }}
                onClick={async () => {
                  setIsOpen(false);
                }}
                className={classNames("btn-icon btn-link like")}
              >
                <Check fontSize="large" />
              </Button>
            </Tooltip>
            <Tooltip title="Relacionar Todos" placement="top" interactive>
              <Button
                style={{
                  float: "right"
                }}
                onClick={() => {
                  setSelectedCli(clientsList.map(el => el));
                  setIsOpen(false);
                }}
                className={classNames("btn-icon btn-link like")}
              >
                <DoneAll fontSize="large" />
              </Button>
            </Tooltip>
            <h4 className="modalHeader">Clientes</h4>
          </Header>

          <ReactTable
            ref={r => (reactTable = r)}
            onFilteredChange={() => {
              setFilteredData({
                data: reactTable.getResolvedState().sortedData,
                default: false
              });
            }}
            data={clientsList}
            getTdProps={(state, rowInfo) => {
              return {
                onClick: () => {
                  rowInfo.original.clicado = true;
                  handleClientClick(rowInfo.original, state);
                },
                style: {
                  // eslint-disable-next-line no-nested-ternary
                  background: rowInfo?.original.mainClient
                    ? "#009aef"
                    : selectedCli.findIndex(
                        el =>
                          el.id === rowInfo?.original.id &&
                          !rowInfo.original.mainClient
                      ) > -1
                    ? "#ccffcc"
                    : null
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
                Header: "Nome Abreviado",
                accessor: "nomeAbv"
              },
              {
                Header: "Razão Social",
                accessor: "rzSoc",
                minWidth: 250
              },
              {
                Header: "Representante",
                accessor: "Representante.nome"
              }
            ]}
            defaultPageSize={6}
            pageSizeOptions={[6, 10, 50, 100]}
            className="-striped -highlight"
          />

          <Footer />
        </ModalLarge>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Tooltip title="Clientes" placement="top" interactive>
                  <Button
                    style={{
                      float: "right"
                    }}
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    className={classNames("btn-icon btn-link like")}
                  >
                    <EventNoteIcon />
                  </Button>
                </Tooltip>
                <CardTitle tag="h4">Usuário</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="4">
                      <Label>CPF</Label>
                      <FormGroup className={`has-label ${values.cpf.error}`}>
                        <Input
                          maxLength={18}
                          name="cpf"
                          type="text"
                          onChange={event => handleChange(event, "cpf", "cpf")}
                          value={values.cpf.value}
                          onBlur={e => {
                            const { value } = e.target;
                            renderCpfState(value);
                          }}
                        />
                        {values.cpf.error === "has-danger" ? (
                          <Label className="error">{values.cpf.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Nome</Label>
                      <FormGroup className={`has-label ${values.nome.error}`}>
                        <Input
                          name="nome"
                          type="text"
                          onChange={event =>
                            handleChange(event, "nome", "text")
                          }
                          value={values.nome.value}
                        />
                        {values.nome.error === "has-danger" ? (
                          <Label className="error">{values.nome.message}</Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {" "}
                      <Label>Perfil</Label>
                      <FormGroup
                        className={`has-label ${values.PerfilUser.error}`}
                      >
                        <Input
                          name="PerfilId"
                          type="select"
                          onChange={event =>
                            handleChange(event, "PerfilUser", "text")
                          }
                          value={values.PerfilUser.value}
                        >
                          {" "}
                          <option disabled value="">
                            {" "}
                            Selecione o perfil{" "}
                          </option>
                          {profileData.map(perfil => (
                            <option value={perfil.id}>
                              {perfil.cod} - {perfil.desc}{" "}
                            </option>
                          ))}
                        </Input>
                        {values.PerfilUser.error === "has-danger" ? (
                          <Label className="error">
                            {values.PerfilUser.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <Label>Email</Label>
                      <FormGroup className={`has-label ${values.email.error}`}>
                        <Input
                          name="email"
                          type="text"
                          onChange={event =>
                            handleChange(event, "email", "email")
                          }
                          value={values.email.value}
                        />
                        {values.email.error === "has-danger" ? (
                          <Label className="error">
                            {values.email.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Label>Cliente Principal</Label>
                      <FormGroup
                        className={`has-label ${values.mainClient.error}`}
                      >
                        <Input
                          name="mainClient"
                          type="text"
                          onChange={event =>
                            handleChange(event, "mainClient", "text")
                          }
                          value={values.mainClient.value}
                        />
                        {values.mainClient.error === "has-danger" ? (
                          <Label className="error">
                            {values.mainClient.message}
                          </Label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Label style={{ display: "block" }}>
                        Clientes que o usuário pode ver
                      </Label>
                      <TagsInput
                        // disabled
                        onChange={handleTagsinput}
                        tagProps={{
                          className: "react-tagsinput-tag "
                        }}
                        value={selectedCli.map(el => el.nomeAbv)}
                        inputProps={{
                          placeholder: "",
                          disabled: true
                        }}
                      />
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
                  <Link to="/tabelas/general/ext-user">
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
  );
}
