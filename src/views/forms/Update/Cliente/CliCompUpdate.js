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
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { CliCompUpdate } from "~/store/modules/Cliente/actions";

import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useInput } from 'hooks.js'


const schema = yup.object().shape({
  ClienteId: yup.string().required(),
  rz_social: yup.string().required(),
  cond_pgmto: yup.number().required(),
  nome_abv: yup.string().required(),
  cep: yup.string().required(),
  rua: yup.string().required(),
  numero: yup.number().required(),
  bairro: yup.string().required(),
  cidade: yup.string().required(),
  uf: yup.string().required(),
  insc_mun: yup.number().required(),
  insc_uf: yup.number().required(),
});

export default function CliCompUpdatee() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/cliente/complem/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setData(response[0]);
      });
  }, []);

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

    dispatch(
      CliCompUpdate(
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
        insc_uf
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
                  initialData={data}
                >
                  <label>Cliente</label>
                  <FormGroup>
                    <Input className="cadastro" name="ClienteId" type="text" {...bindClienteId} />
                  </FormGroup>

                  <label>Razão Social</label>
                  <FormGroup>
                    <Input className="cadastro" name="rz_social" type="text" {...bindRz_social} />
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

                  <label>Nome Abreviado</label>
                  <FormGroup>
                    <Input className="cadastro" name="Nome Abreviado" type="text" {...bindNome_abv} />
                  </FormGroup>

                  <label>CEP</label>
                  <FormGroup>
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
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="insc_mun"
                      type="numeric"
                      {...bindInsc_mun}
                    />
                  </FormGroup>

                  <label>Inscrição Federal</label>
                  <FormGroup>
                    <Input className="cadastro" name="insc_uf" type="numeric" {...bindInsc_uf} />
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
