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
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { CliCompUpdate } from "~/store/modules/Cliente/actions";

import { Form, Input } from "@rocketseat/unform";

import * as yup from "yup";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
<<<<<<< HEAD
import { useInput } from 'hooks.js'

=======
>>>>>>> parent of a3593f1...  dados recebidos em paginass de update
=======
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms

const schema = yup.object().shape({
  ClienteId: yup.string().required(),
  RZ_SOCIAL: yup.string().required(),
  COND_PGTO: yup.number().required(),
  NOME_ABV: yup.string().required(),
  CEP: yup.string().required(),
  RUA: yup.string().required(),
  NUMERO: yup.number().required(),
  BAIRRO: yup.string().required(),
  CIDADE: yup.string().required(),
  UF: yup.string().required(),
  INSC_MUN: yup.number().required(),
  INSC_UF: yup.number().required(),
});

export default function CliCompUpdatee() {
  const dispatch = useDispatch();

<<<<<<< HEAD
<<<<<<< HEAD
  const { value: ClienteId, bind: bindClienteId } = useInput("");
  const { value: rz_social, bind: bindRz_social } = useInput("");
  const { value: cond_pgmto, bind: bindCond_pgmto } = useInput("");
  const { value: nome_abv, bind: bindNome_abv } = useInput("");
  const { value: cep, bind: bindCep } = useInput("");
  const { value: rua, bind: bindRua } = useInput("");
  const { value: numero, bind: bindNumero } = useInput("");
  const { value: bairro, bind: bindBairro } = useInput("");
  const { value: cidade, bind: bindCidade } = useInput("");
  const { value: uf, bind: bindUf } = useInput("");
  const { value: insc_mun, bind: bindInsc_mun } = useInput("");
  const { value: insc_uf, bind: bindInsc_uf } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

=======
  function handleSubmit({
    ClienteId,
    RZ_SOCIAL,
    COND_PGTO,
    NOME_ABV,
    CEP,
    RUA,
    NUMERO,
    BAIRRO,
    CIDADE,
    UF,
    INSC_MUN,
    INSC_UF,
  }) {
>>>>>>> parent of a3593f1...  dados recebidos em paginass de update
=======
  function handleSubmit({
    ClienteId,
    rz_social,
    cond_pgmto,
    nome_abv,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    uf,
    insc_mun,
    insc_uf,
  }) {
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
    dispatch(
      CliCompUpdate(
        ClienteId,
        RZ_SOCIAL,
        COND_PGTO,
        NOME_ABV,
        CEP,
        RUA,
        NUMERO,
        BAIRRO,
        CIDADE,
        UF,
        INSC_MUN,
        INSC_UF
      )
    );
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cadastro Complementar de Cliente</CardTitle>
              </CardHeader>
              <CardBody>
                <Form
                  className="cadastro"
                  onSubmit={handleSubmit}
                  schema={schema}
                >
                  <label>ClienteId</label>
                  <FormGroup>
                    <Input className="cadastro" name="ClienteId" type="text" />
                  </FormGroup>

<<<<<<< HEAD
<<<<<<< HEAD
                  <label>Razão Social</label>
=======
                  <label>rz_social</label>
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
                  <FormGroup>
                    <Input className="cadastro" name="rz_social" type="text" />
                  </FormGroup>

<<<<<<< HEAD
                  <label>Condição de Pagamento</label>
=======
                  <label>RZ_SOCIAL</label>
                  <FormGroup>
                    <Input className="cadastro" name="RZ_SOCIAL" type="text" />
                  </FormGroup>

                  <label>COND_PGTO</label>
>>>>>>> parent of a3593f1...  dados recebidos em paginass de update
=======
                  <label>cond_pgmto</label>
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="COND_PGTO"
                      type="numeric"
                    />
                  </FormGroup>

<<<<<<< HEAD
<<<<<<< HEAD
                  <label>Nome Abreviado</label>
                  <FormGroup>
                    <Input className="cadastro" name="Nome Abreviado" type="text" {...bindNome_abv} />
=======
                  <label>NOME_ABV</label>
                  <FormGroup>
                    <Input className="cadastro" name="NOME_ABV" type="text" />
>>>>>>> parent of a3593f1...  dados recebidos em paginass de update
=======
                  <label>nome_abv</label>
                  <FormGroup>
                    <Input className="cadastro" name="nome_abv" type="text" />
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
                  </FormGroup>

                  <label>cep</label>
                  <FormGroup>
<<<<<<< HEAD
<<<<<<< HEAD
                    <Input className="cadastro" name="cep" type="text" {...bindCep} />
=======
                    <Input className="cadastro" name="cep" type="text" />
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
                  </FormGroup>

                  <label>rua</label>
                  <FormGroup>
                    <Input className="cadastro" name="rua" type="text" />
                  </FormGroup>

                  <label>numero</label>
                  <FormGroup>
                    <Input className="cadastro" name="numero" type="numeric" />
                  </FormGroup>

                  <label>bairro</label>
                  <FormGroup>
                    <Input className="cadastro" name="bairro" type="text" />
                  </FormGroup>

                  <label>cidade</label>
                  <FormGroup>
                    <Input className="cadastro" name="cidade" type="text" />
                  </FormGroup>

                  <label>uf</label>
                  <FormGroup>
                    <Input className="cadastro" name="uf" type="text" />
                  </FormGroup>

<<<<<<< HEAD
                  <label>Inscrição Municipal</label>
=======
                    <Input className="cadastro" name="CEP" type="text" />
                  </FormGroup>

                  <label>RUA</label>
                  <FormGroup>
                    <Input className="cadastro" name="RUA" type="text" />
                  </FormGroup>

                  <label>NUMERO</label>
                  <FormGroup>
                    <Input className="cadastro" name="NUMERO" type="numeric" />
                  </FormGroup>

                  <label>BAIRRO</label>
                  <FormGroup>
                    <Input className="cadastro" name="BAIRRO" type="text" />
                  </FormGroup>

                  <label>CIDADE</label>
                  <FormGroup>
                    <Input className="cadastro" name="CIDADE" type="text" />
                  </FormGroup>

                  <label>UF</label>
                  <FormGroup>
                    <Input className="cadastro" name="UF" type="text" />
                  </FormGroup>

                  <label>INSC_MUN</label>
>>>>>>> parent of a3593f1...  dados recebidos em paginass de update
=======
                  <label>insc_mun</label>
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="INSC_MUN"
                      type="numeric"
                    />
                  </FormGroup>

<<<<<<< HEAD
<<<<<<< HEAD
                  <label>Inscrição Federal</label>
                  <FormGroup>
                    <Input className="cadastro" name="insc_uf" type="numeric" {...bindInsc_uf} />
=======
                  <label>INSC_UF</label>
                  <FormGroup>
                    <Input className="cadastro" name="INSC_UF" type="numeric" />
>>>>>>> parent of a3593f1...  dados recebidos em paginass de update
=======
                  <label>insc_uf</label>
                  <FormGroup>
                    <Input className="cadastro" name="insc_uf" type="numeric" />
>>>>>>> parent of 29865d7... erro no update, e modificações nos forms
                  </FormGroup>

                  <Button
                    style={{ marginTop: 35 }}
                    className="form"
                    color="primary"
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
