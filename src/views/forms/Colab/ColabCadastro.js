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
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  Input,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { colabRequest } from "~/store/modules/Colab/actions";
import { store } from "~/store";
import { useInput } from "~/hooks.js";
import axios from "axios";

export default function ColabCadastro() {
  const dispatch = useDispatch();
  const [cpf = "", setCpf] = useState();
  const [data, setData] = useState({});
  const [data1, setData1] = useState([]);
  const [cpfError = "", setCpfError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa, "number");
  const { value: FornecId, bind: bindFornecId } = useInput("", "number");
  const { value: log_usr, bind: bindLog_usr } = useInput("", "number");
  const { value: nome, bind: bindNome } = useInput("");
  const { value: dt_admiss, bind: bindDt_admiss } = useInput("");
  const { value: cel, bind: bindCel } = useInput("", "number");
  const { value: skype, bind: bindSkype } = useInput("");
  const { value: email, bind: bindEmail } = useInput("", "email");
  const { value: espec, bind: bindEspec } = useInput("");

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/empresa/${empresa}`);
      const response1 = await axios(`http://localhost:3001/fornec`);
      setData1(response1.data);
      setData(response.data);
      setIsLoading(false);
    }
    loadData();
  }, []);
  console.log(data1);
  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf == "") return false;
    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;

    for (var i = 1; i <= 9; i++)
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;

    Soma = 0;
    for (var i = 1; i <= 10; i++)
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

  const normalizeInput = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, "");
    const cvLength = currentValue.length;
    renderCpfState(value);
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7)
        return `${currentValue.slice(0, 3)}.${currentValue.slice(3)}`;
      if (cvLength < 10)
        return `${currentValue.slice(0, 3)}.${currentValue.slice(
          3,
          6
        )}.${currentValue.slice(6)}`;

      return `${currentValue.slice(0, 3)}.${currentValue.slice(
        3,
        6
      )}.${currentValue.slice(6, 9)}-${currentValue.slice(9, 11)}`;
    }
  };

  async function handleChange({ target: { value } }) {
    setCpf((prevCpf) => normalizeInput(value, prevCpf));
  }

  const renderCpfState = (value) => {
    if (!validarCPF(value)) {
      setCpfError("has-danger");
    } else {
      setCpfError("has-success");
    }
  };

  const errorCheckAux = [
    bindEmpresaId,
    bindFornecId,
    bindLog_usr,
    bindNome,
    bindCel,
    bindSkype,
    bindEmail,
    bindEspec,
  ];
  const handleSubmit = (evt) => {
    evt.preventDefault();

    var tamanho = errorCheckAux.length;
    console.log(errorCheckAux.length);
    for (var j = 0; j < tamanho; j++) {
      if (
        !(errorCheckAux[j].valueerror === "has-danger") &
        !(cpfError === "has-danger") &
        !(errorCheckAux[j].value === "") &
        !(cpf === "")
      ) {
        var valid = true;
      } else {
        valid = false;
        break;
      }
    }
    if (valid) {
      var cpfdb = cpf.replace(/[^\d]+/g, "");
      dispatch(
        colabRequest(
          cpfdb,
          FornecId,
          log_usr,
          EmpresaId,
          nome,
          dt_admiss,
          cel,
          skype,
          email,
          espec
        )
      );
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Colaborador</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <label>Empresa</label>
                  <FormGroup
                    className={`has-label ${bindEmpresaId.valueerror}`}
                  >
                    <Input
                      disabled={true}
                      name="EmpresaId"
                      type="select"
                      {...bindEmpresaId}
                    >
                      {" "}
                      <option value={1}>
                        {" "}
                        Empresa selecionada: {data.nome}, CNPJ {data.id_federal}
                      </option>
                    </Input>
                    {bindEmpresaId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>CPF</label>
                  <FormGroup className={`has-label ${cpfError}`}>
                    <Input
                      maxLength={18}
                      onChange={handleChange}
                      name="cpf"
                      type="text"
                      value={cpf}
                    />
                    {cpfError === "has-danger" ? (
                      <label className="error">Insira um CPF válido</label>
                    ) : null}
                  </FormGroup>

                  <label>Fornecedor</label>
                  <FormGroup className={`has-label ${bindFornecId.valueerror}`}>
                    <Input name="FornecId" type="select" {...bindFornecId}>
                      {" "}
                      {data1.map((fornec) => (
                        <option value={fornec.id}> {fornec.nome} </option>
                      ))}
                    </Input>
                    {bindFornecId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Usuário</label>
                  <FormGroup className={`has-label ${bindLog_usr.valueerror}`}>
                    <Input name="log_usr" type="numeric" {...bindLog_usr} />
                    {bindLog_usr.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Nome</label>
                  <FormGroup className={`has-label ${bindNome.valueerror}`}>
                    <Input name="nome" type="text" {...bindNome} />
                    {bindNome.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Data de Adimissão</label>
                  <FormGroup
                    className={`has-label ${bindDt_admiss.valueerror}`}
                  >
                    <Input name="dt_admiss" type="date" {...bindDt_admiss} />
                    {bindDt_admiss.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Celular</label>
                  <FormGroup className={`has-label ${bindCel.valueerror}`}>
                    <Input name="cel" type="numeric" {...bindCel} />
                    {bindCel.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Skype</label>
                  <FormGroup className={`has-label ${bindSkype.valueerror}`}>
                    <Input name="skype" type="text" {...bindSkype} />
                    {bindSkype.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Email</label>
                  <FormGroup className={`has-label ${bindEmail.valueerror}`}>
                    <Input name="email" type="text" {...bindEmail} />
                    {bindEmail.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Especialidade</label>
                  <FormGroup className={`has-label ${bindEspec.valueerror}`}>
                    <Input name="espec" type="text" {...bindEspec} />
                    {bindEspec.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <Button
                    style={{ marginTop: 35 }}
                    className="form"
                    color="info"
                    type="submit"
                  >
                    Submit
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
