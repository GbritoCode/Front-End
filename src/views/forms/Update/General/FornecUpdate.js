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
import React, { Fragment, useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { FornecUpdate } from "~/store/modules/general/actions";
import { useParams, Link } from "react-router-dom";
import { useInput } from "hooks.js";
import axios from "axios";

function FornecUpdatee() {
  const { id } = useParams();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/fornec/${id}`);
      setData(response.data);
      setIsLoading(false);
    }
    loadData();
  }, []);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const { value: EmpresaId, bind: bindEmpresaId } = useInput(
    undefined,
    "number"
  );
  const { value: nome, bind: bindNome } = useInput(undefined);
  const { value: cond_pgmto, bind: bindCond_pgmto } = useInput(
    undefined,
    "number"
  );
  const { value: nome_conta, bind: bindNome_conta } = useInput(undefined);
  const { value: fone, bind: bindFone } = useInput(undefined, "number");
  const { value: cep, bind: bindCep } = useInput(undefined, "number");
  const { value: rua, bind: bindRua } = useInput(undefined);
  const { value: numero, bind: bindNumero } = useInput(undefined, "number");
  const { value: complemento, bind: bindComplemento } = useInput(undefined);
  const { value: bairro, bind: bindBairro } = useInput(undefined);
  const { value: cidade, bind: bindCidade } = useInput(undefined);
  const { value: uf, bind: bindUf } = useInput(undefined);
  const { value: banco, bind: bindBanco } = useInput(undefined);
  const { value: agencia, bind: bindAgencia } = useInput(undefined);
  const { value: conta, bind: bindConta } = useInput(undefined);

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
        !(errorCheckAux[j].value === "")
      ) {
        var valid = true;
      } else {
        valid = false;
        break;
      }
    }
    if (valid) {
      dispatch(
        FornecUpdate(
          id,
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
    <Fragment>
      {isLoading ? (
        <div></div>
      ) : (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Edição de Forncedor</CardTitle>
                    <Link to="/cadastro/geral/Fornec">
                      <Button
                        style={{
                          float: "right",
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        color="info"
                        size="small"
                        className="text-center"
                      >
                        <i
                          className="tim-icons icon-simple-add"
                          style={{
                            paddingBottom: 4,
                            paddingRight: 10,
                          }}
                          size="large"
                        />{" "}
                        Novo
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <label>Empresa</label>
                      <FormGroup
                        className={`has-label ${bindEmpresaId.valueerror}`}
                      >
                        <Input
                          defaultValue={data.EmpresaId}
                          disabled={true}
                          name="EmpresaId"
                          type="select"
                          {...bindEmpresaId}
                        >
                          {" "}
                          <option value={1}>
                            {" "}
                            Empresa selecionada: {data.nome}, CNPJ{" "}
                            {data.id_federal}
                          </option>
                        </Input>
                        {bindEmpresaId.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>CNPJ</label>
                      <FormGroup>
                        <Input
                          defaultValue={data.CNPJ}
                          disabled={true}
                          maxLength={18}
                          name="cnpj"
                          type="text"
                        />
                      </FormGroup>
                      <label>Nome</label>
                      <FormGroup className={`has-label ${bindNome.valueerror}`}>
                        <Input
                          defaultValue={data.nome}
                          name="nome"
                          type="text"
                          {...bindNome}
                        />
                        {bindNome.valueerror === "has-danger" ? (
                          <label className="error">Insira um nome válido</label>
                        ) : null}
                      </FormGroup>
                      <label>Condição de Pagamento</label>
                      <FormGroup
                        className={`has-label ${bindCond_pgmto.valueerror}`}
                      >
                        <Input
                          defaultValue={data.cond_pgmto}
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
                        <Input
                          defaultValue={data.nome_conta}
                          name="nome_conta"
                          type="text"
                          {...bindNome_conta}
                        />
                        {bindNome_conta.valueerror === "has-danger" ? (
                          <label className="error">Insira um nome válido</label>
                        ) : null}
                      </FormGroup>

                      <label>Telefone</label>
                      <FormGroup className={`has-label ${bindFone.valueerror}`}>
                        <Input
                          defaultValue={data.fone}
                          name="fone"
                          type="numeric"
                          {...bindFone}
                        />
                        {bindFone.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <Row>
                        <Col md="4">
                          <label>CEP</label>
                          <FormGroup
                            className={`has-label ${bindCep.valueerror}`}
                          >
                            <Input
                              defaultValue={data.cep}
                              name="cep"
                              type="text"
                              {...bindCep}
                            />
                            {bindCep.valueerror === "has-danger" ? (
                              <label className="error">Insira um número</label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <label>Rua</label>
                          <FormGroup
                            className={`has-label ${bindRua.valueerror}`}
                          >
                            <Input
                              defaultValue={data.rua}
                              name="rua"
                              type="text"
                              {...bindRua}
                            />
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
                            <Input
                              defaultValue={data.numero}
                              name="numero"
                              type="numeric"
                              {...bindNumero}
                            />
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
                              defaultValue={data.complemento}
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
                            <Input
                              defaultValue={data.bairro}
                              name="bairro"
                              type="text"
                              {...bindBairro}
                            />
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
                            <Input
                              defaultValue={data.cidade}
                              name="cidade"
                              type="text"
                              {...bindCidade}
                            />
                            {bindCidade.valueerror === "has-danger" ? (
                              <label className="error">
                                Insira um valor válido
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <label>UF</label>
                          <FormGroup
                            className={`has-label ${bindUf.valueerror}`}
                          >
                            <Input
                              defaultValue={data.uf}
                              name="uf"
                              type="select"
                              {...bindUf}
                            >
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
                            <Input
                              defaultValue={data.banco}
                              name="banco"
                              type="text"
                              {...bindBanco}
                            />
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
                            <Input
                              defaultValue={data.agencia}
                              name="agencia"
                              type="text"
                              {...bindAgencia}
                            />
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
                            <Input
                              defaultValue={data.conta}
                              name="conta"
                              type="text"
                              {...bindConta}
                            />
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
      )}
    </Fragment>
  );
}
export default FornecUpdatee;
