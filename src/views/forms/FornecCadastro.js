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

import * as yup from "yup";
import { store } from "~/store";
import { useInput } from "hooks.js";

const schema = yup.object().shape({
  CNPJ: yup.string().required(),
  EmpresaId: yup.string().required(),
  nome: yup.string().required(),
  cond_pgmto: yup.number().required(),
  nome_conta: yup.string().required(),
  fone: yup.number().required(),
  cep: yup.string().required(),
  rua: yup.string().required(),
  numero: yup.number().required(),
  complemento: yup.string().required(),
  bairro: yup.string().required(),
  cidade: yup.string().required(),
  uf: yup.string().required(),
  banco: yup.string().required(),
  agencia: yup.string().required(),
  conta: yup.string().required(),
});

export default function FornecCadastro() {
  const dispatch = useDispatch();
  const empresa = store.getState().auth.empresa;

  const { value: CNPJ, bind: bindCNPJ } = useInput("");
  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa);
  const { value: nome, bind: bindNome } = useInput("");
  const { value: cond_pgmto, bind: bindCond_pgmto } = useInput("");
  const { value: nome_conta, bind: bindNome_conta } = useInput("");
  const { value: fone, bind: bindFone } = useInput("");
  const { value: cep, bind: bindCep } = useInput("");
  const { value: rua, bind: bindRua } = useInput("");
  const { value: numero, bind: bindNumero } = useInput("");
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
                <Form
                  className="cadastro"
                  onSubmit={handleSubmit}
                  schema={schema}
                >
                  <label>CNPJ</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="CNPJ"
                      type="text"
                      {...bindCNPJ}
                    />
                  </FormGroup>
                  <label>Empresa</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="EmpresaId"
                      type="text"
                      {...bindEmpresaId}
                    />
                  </FormGroup>
                  <label>Nome</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="nome"
                      type="text"
                      {...bindNome}
                    />
                  </FormGroup>
                  <label>Condição de Pagamento</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="cond_pgmto"
                      type="numeric"
                      {...bindCond_pgmto}
                    />
                  </FormGroup>
                  <label>Nome da Conta</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="nome_conta"
                      type="text"
                      {...bindNome_conta}
                    />
                  </FormGroup>

                  <label>Telefone</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="fone"
                      type="numeric"
                      {...bindFone}
                    />
                  </FormGroup>

                  <label>CEP</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="cep"
                      type="text"
                      {...bindCep}
                    />
                  </FormGroup>

                  <label>Rua</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="rua"
                      type="text"
                      {...bindRua}
                    />
                  </FormGroup>

                  <label>Número</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="numero"
                      type="numeric"
                      {...bindNumero}
                    />
                  </FormGroup>

                  <label>Complemento</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="complemento"
                      type="text"
                      {...bindComplemento}
                    />
                  </FormGroup>

                  <label>Bairro</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="bairro"
                      type="text"
                      {...bindBairro}
                    />
                  </FormGroup>

                  <label>Cidade</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="cidade"
                      type="text"
                      {...bindCidade}
                    />
                  </FormGroup>

                  <label>UF</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="uf"
                      type="text"
                      {...bindUf}
                    />
                  </FormGroup>

                  <label>Banco</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="banco"
                      type="text"
                      {...bindBanco}
                    />
                  </FormGroup>

                  <label>Agência</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="agencia"
                      type="text"
                      {...bindAgencia}
                    />
                  </FormGroup>

                  <label>Conta</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="conta"
                      type="text"
                      {...bindConta}
                    />
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
