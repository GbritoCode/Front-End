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
import { fornecRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import axios from "axios";
import { useInput } from "hooks.js";

export default function FornecCadastro() {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cnpj = "", setCnpj] = useState();
  const [cnpjError = "", setCnpjError] = useState();
  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa, "number");
  const { value: nome, bind: bindNome } = useInput("");
  const { value: cond_pgmto, bind: bindCond_pgmto } = useInput("", "number");
  const { value: nome_conta, bind: bindNome_conta } = useInput("");
  const { value: fone, bind: bindFone } = useInput("", "number");
  const { value: cep, bind: bindCep } = useInput("", "number");
  const { value: rua, bind: bindRua } = useInput("");
  const { value: numero, bind: bindNumero } = useInput("", "number");
  const { value: complemento, bind: bindComplemento } = useInput("");
  const { value: bairro, bind: bindBairro } = useInput("");
  const { value: cidade, bind: bindCidade } = useInput("");
  const { value: uf, bind: bindUf } = useInput("");
  const { value: banco, bind: bindBanco } = useInput("");
  const { value: agencia, bind: bindAgencia } = useInput("");
  const { value: conta, bind: bindConta } = useInput("");

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/empresa/${empresa}`);
      setData(response.data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj == "") return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999"
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

    tamanho = tamanho + 1;
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

  const normalizeInput = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, "");
    const cvLength = currentValue.length;
    renderCnpjState(value);
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 3) return currentValue;
      if (cvLength < 6)
        return `${currentValue.slice(0, 2)}.${currentValue.slice(2)}`;
      if (cvLength < 9)
        return `${currentValue.slice(0, 2)}.${currentValue.slice(
          2,
          5
        )}.${currentValue.slice(5)}`;
      if (cvLength < 13)
        return `${currentValue.slice(0, 2)}.${currentValue.slice(
          2,
          5
        )}.${currentValue.slice(5, 8)}/${currentValue.slice(8)}`;
      return `${currentValue.slice(0, 2)}.${currentValue.slice(
        2,
        5
      )}.${currentValue.slice(5, 8)}/${currentValue.slice(
        8,
        12
      )}-${currentValue.slice(12, 14)}`;
    }
  };

  async function handleChange({ target: { value } }) {
    setCnpj((prevCnpj) => normalizeInput(value, prevCnpj));
  }

  const renderCnpjState = (value) => {
    if (!validarCNPJ(value)) {
      setCnpjError("has-danger");
    } else {
      setCnpjError("has-success");
    }
  };

  const errorCheckAux = [
    bindEmpresaId,
    bindNome,
    bindCond_pgmto,
    bindNome_conta,
    bindFone,
    bindCep,
    bindRua,
    bindNumero,
    bindComplemento,
    bindBairro,
    bindCidade,
    bindUf,
    bindBanco,
    bindAgencia,
    bindConta,
  ];
  const handleSubmit = (evt) => {
    evt.preventDefault();

    var tamanho = errorCheckAux.length;
    console.log(errorCheckAux.length);
    for (var j = 0; j < tamanho; j++) {
      if (
        !(errorCheckAux[j].valueerror === "has-danger") &
        !(cnpjError === "has-danger") &
        !(errorCheckAux[j].value === "") &
        !(cnpj === "")
      ) {
        var valid = true;
      } else {
        valid = false;
        break;
      }
    }
    if (valid) {
      var cnpjdb = cnpj.replace(/[^\d]+/g, "");
      dispatch(
        fornecRequest(
          cnpjdb,
          EmpresaId,
          nome,
          cond_pgmto,
          nome_conta,
          fone,
          cep,
          rua,
          numero,
          complemento,
          bairro,
          cidade,
          uf,
          banco,
          agencia,
          conta
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
                <CardTitle tag="h4">Cadastro de Fornecedor</CardTitle>
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

                  <label>CNPJ</label>
                  <FormGroup className={`has-label ${cnpjError}`}>
                    <Input
                      maxLength={18}
                      onChange={handleChange}
                      name="cnpj"
                      type="text"
                      value={cnpj}
                    />
                    {cnpjError === "has-danger" ? (
                      <label className="error">Insira um CNPJ válido</label>
                    ) : null}
                  </FormGroup>
                  <label>Nome</label>
                  <FormGroup className={`has-label ${bindNome.valueerror}`}>
                    <Input name="nome" type="text" {...bindNome} />
                    {bindNome.valueerror === "has-danger" ? (
                      <label className="error">Insira um nome válido</label>
                    ) : null}
                  </FormGroup>
                  <label>Condição de Pagamento</label>
                  <FormGroup
                    className={`has-label ${bindCond_pgmto.valueerror}`}
                  >
                    <Input
                      name="cond_pgmto"
                      type="numeric"
                      {...bindCond_pgmto}
                    />
                    {bindCond_pgmto.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>
                  <label>Nome da Conta</label>
                  <FormGroup
                    className={`has-label ${bindNome_conta.valueerror}`}
                  >
                    <Input name="nome_conta" type="text" {...bindNome_conta} />
                    {bindNome_conta.valueerror === "has-danger" ? (
                      <label className="error">Insira um nome válido</label>
                    ) : null}
                  </FormGroup>

                  <label>Telefone</label>
                  <FormGroup className={`has-label ${bindFone.valueerror}`}>
                    <Input name="fone" type="numeric" {...bindFone} />
                    {bindFone.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <Row>
                    <Col md="4">
                      <label>CEP</label>
                      <FormGroup className={`has-label ${bindCep.valueerror}`}>
                        <Input name="cep" type="text" {...bindCep} />
                        {bindCep.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <label>Rua</label>
                      <FormGroup className={`has-label ${bindRua.valueerror}`}>
                        <Input name="rua" type="text" {...bindRua} />
                        {bindRua.valueerror === "has-danger" ? (
                          <label className="error">
                            Insira um valor válido
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <label>Número</label>
                      <FormGroup
                        className={`has-label ${bindNumero.valueerror}`}
                      >
                        <Input name="numero" type="numeric" {...bindNumero} />
                        {bindNumero.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <label>Complemento</label>
                      <FormGroup
                        className={`has-label ${bindComplemento.valueerror}`}
                      >
                        <Input
                          name="complemento"
                          type="text"
                          {...bindComplemento}
                        />
                        {bindComplemento.valueerror === "has-danger" ? (
                          <label className="error">
                            Insira um valor válido
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <label>Bairro</label>
                      <FormGroup
                        className={`has-label ${bindBairro.valueerror}`}
                      >
                        <Input name="bairro" type="text" {...bindBairro} />
                        {bindBairro.valueerror === "has-danger" ? (
                          <label className="error">
                            Insira um valor válido
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <label>Cidade</label>
                      <FormGroup
                        className={`has-label ${bindCidade.valueerror}`}
                      >
                        <Input name="cidade" type="text" {...bindCidade} />
                        {bindCidade.valueerror === "has-danger" ? (
                          <label className="error">
                            Insira um valor válido
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <label>UF</label>
                      <FormGroup className={`has-label ${bindUf.valueerror}`}>
                        <Input name="uf" type="select" {...bindUf}>
                          <option disabled value="">
                            {" "}
                            Selecione o estado{" "}
                          </option>
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <label>Banco</label>
                      <FormGroup
                        className={`has-label ${bindBanco.valueerror}`}
                      >
                        <Input name="banco" type="text" {...bindBanco} />
                        {bindBanco.valueerror === "has-danger" ? (
                          <label className="error">
                            Insira um valor válido
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <label>Agência</label>
                      <FormGroup
                        className={`has-label ${bindAgencia.valueerror}`}
                      >
                        <Input name="agencia" type="text" {...bindAgencia} />
                        {bindAgencia.valueerror === "has-danger" ? (
                          <label className="error">
                            Insira um valor válido
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <label>Conta</label>
                      <FormGroup
                        className={`has-label ${bindConta.valueerror}`}
                      >
                        <Input name="conta" type="text" {...bindConta} />
                        {bindConta.valueerror === "has-danger" ? (
                          <label className="error">
                            Insira um valor válido
                          </label>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

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
