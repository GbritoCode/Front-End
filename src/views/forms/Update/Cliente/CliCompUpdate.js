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
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { CliCompUpdate } from "~/store/modules/Cliente/actions";

import * as yup from "yup";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import { useInput } from 'hooks.js'

=======
>>>>>>> parent of a3593f1...  dados recebidos em paginass de update

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
                  <label>Cliente</label>
                  <FormGroup>
                    <Input className="cadastro" name="ClienteId" type="text" {...bindClienteId} />
                  </FormGroup>

<<<<<<< HEAD
                  <label>Razão Social</label>
                  <FormGroup>
                    <Input className="cadastro" name="rz_social" type="text" {...bindRz_social} />
                  </FormGroup>

                  <label>Condição de Pagamento</label>
=======
                  <label>RZ_SOCIAL</label>
                  <FormGroup>
                    <Input className="cadastro" name="RZ_SOCIAL" type="text" />
                  </FormGroup>

                  <label>COND_PGTO</label>
>>>>>>> parent of a3593f1...  dados recebidos em paginass de update
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="COND_PGTO"
                      type="numeric"
                      {...bindCond_pgmto}
                    />
                  </FormGroup>

<<<<<<< HEAD
                  <label>Nome Abreviado</label>
                  <FormGroup>
                    <Input className="cadastro" name="Nome Abreviado" type="text" {...bindNome_abv} />
=======
                  <label>NOME_ABV</label>
                  <FormGroup>
                    <Input className="cadastro" name="NOME_ABV" type="text" />
>>>>>>> parent of a3593f1...  dados recebidos em paginass de update
                  </FormGroup>

                  <label>CEP</label>
                  <FormGroup>
<<<<<<< HEAD
                    <Input className="cadastro" name="cep" type="text" {...bindCep} />
                  </FormGroup>

                  <label>Rua</label>
                  <FormGroup>
                    <Input className="cadastro" name="rua" type="text" {...bindRua} />
                  </FormGroup>

                  <label>Número</label>
                  <FormGroup>
                    <Input className="cadastro" name="numero" type="numeric" {...bindNumero} />
                  </FormGroup>

                  <label>Bairro</label>
                  <FormGroup>
                    <Input className="cadastro" name="bairro" type="text" {...bindBairro} />
                  </FormGroup>

                  <label>Cidade</label>
                  <FormGroup>
                    <Input className="cadastro" name="cidade" type="text" {...bindCidade} />
                  </FormGroup>

                  <label>Uf</label>
                  <FormGroup>
                    <Input className="cadastro" name="uf" type="text" {...bindUf} />
                  </FormGroup>

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
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="INSC_MUN"
                      type="numeric"
                      {...bindInsc_mun}
                    />
                  </FormGroup>

<<<<<<< HEAD
                  <label>Inscrição Federal</label>
                  <FormGroup>
                    <Input className="cadastro" name="insc_uf" type="numeric" {...bindInsc_uf} />
=======
                  <label>INSC_UF</label>
                  <FormGroup>
                    <Input className="cadastro" name="INSC_UF" type="numeric" />
>>>>>>> parent of a3593f1...  dados recebidos em paginass de update
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
