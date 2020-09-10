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
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  Form,
  Input,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { fornecRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import { useInput } from "hooks.js";

export default function FornecCadastro() {
  const dispatch = useDispatch();
  const empresa = store.getState().auth.empresa;

  const { value: CNPJ, bind: bindCNPJ } = useInput("", "number");
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

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(
      fornecRequest(
        CNPJ,
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
                      disabled
                      name="EmpresaId"
                      type="text"
                      {...bindEmpresaId}
                    />
                    {bindEmpresaId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>
                  <label>CNPJ</label>
                  <FormGroup className={`has-label ${bindCNPJ.valueerror}`}>
                    <Input name="CNPJ" type="text" {...bindCNPJ} />
                    {bindCNPJ.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
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
