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
  Label,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { normalizeCpf, normalizeCurrency } from "~/normalize";
import { RepresentanteUpdate } from "~/store/modules/general/actions";
import api from "~/services/api";
import Modal from "~/components/Modal/modalLarge";
import { Footer, Header } from "~/components/Modal/modalStyles";

function RepresentanteUpdatee() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");

  const dispatch = useDispatch();
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    nome: { value: "", error: "", message: "" },
    tipoComiss: { value: "", error: "", message: "" },
    vlrFixMens: { value: "", error: "", message: "" },
    ColabId: { value: "", error: "", message: "" }
  };
  const [values, setValues] = useState(stateSchema);
  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/representante/${id}`);
      const response1 = await api.get(`/tipoComiss/`);
      const response2 = await api.get(`/colab/`);
      setData1(response1.data);
      setData2(response2.data);
      setValues(prevState => ({
        ...prevState,
        empresaId: { value: response.data.EmpresaId },
        nome: { value: response.data.nome },
        tipoComiss: { value: response.data.tipoComiss },
        vlrFixMens: {
          value: normalizeCurrency(JSON.stringify(response.data.vlrFixMens))
        },
        ColabId: { value: response.data.ColabId }
      }));

      setIsLoading(false);
    }
    loadData();
  }, [id]);

  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
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
      case "currency":
        setValues(prevState => ({
          ...prevState,
          [name]: { value: normalizeCurrency(target) }
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
  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
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
      var vlrFixMensdb = values.vlrFixMens.value.replace(/[^\d]+/g, "");

      dispatch(
        RepresentanteUpdate({
          id,
          EmpresaId: values.empresaId.value,
          nome: values.nome.value,
          tipoComiss: values.tipoComiss.value,
          vlrFixMens: vlrFixMensdb,
          ColabId: values.ColabId.value
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
                <h4 className="modalHeader">Colaborador</h4>
              </Header>

              <ReactTable
                data={data2
                  .filter(
                    arr => arr.Perfil.permittedPages.search("Prospecção") > -1
                  )
                  .map((colab, index) => {
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
                        },
                        nome: {
                          value: rowInfo.original.nome
                        }
                      }));
                      document.getElementsByName("nome")[0].value =
                        rowInfo.original.nome;
                      setIsOpen(false);
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

            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Representante</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <Label>Nome</Label>
                          <FormGroup
                            className={`has-label ${values.nome.error}`}
                          >
                            <InputGroup>
                              <Input
                                disabled
                                name="nome"
                                type="text"
                                placeholder="Selecione o Colaborador"
                                value={
                                  data2.find(
                                    arr => arr.id === values.ColabId.value
                                  ).nome
                                }
                              />
                              <InputGroupAddon
                                className="appendCustom"
                                addonType="append"
                              >
                                <Button
                                  className={classNames(
                                    "btn-icon btn-link like addon"
                                  )}
                                  onClick={() => setIsOpen(!isOpen)}
                                >
                                  <i className="tim-icons icon-zoom-split addon" />
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>
                            {values.nome.error === "has-danger" ? (
                              <Label className="error">
                                {values.nome.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <Label>Tipo de Comissão</Label>
                          <FormGroup
                            className={`has-label ${values.tipoComiss.error}`}
                          >
                            <Input
                              name="tipoComiss"
                              type="select"
                              onChange={event =>
                                handleChange(event, "tipoComiss", "text")
                              }
                              value={values.tipoComiss.value}
                            >
                              {" "}
                              <option disabled value="">
                                {" "}
                                Selecione o tipo de comissão{" "}
                              </option>
                              {data1.map(tipoComiss => (
                                <option value={tipoComiss.id}>
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
                        <Col md="4">
                          {" "}
                          <Label>Valor Fixo Mensal</Label>
                          <FormGroup
                            className={`has-label ${values.vlrFixMens.error}`}
                          >
                            <Input
                              name="vlrFixMens"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "vlrFixMens", "currency")
                              }
                              value={values.vlrFixMens.value}
                            />{" "}
                            {values.vlrFixMens.error === "has-danger" ? (
                              <Label className="error">
                                {values.vlrFixMens.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Link to="/tabelas/general/representante">
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
      )}
    </>
  );
}
export default RepresentanteUpdatee;
