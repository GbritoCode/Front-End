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
import React, { Fragment, useState, useEffect } from "react";

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
import { useParams } from "react-router-dom";
import { useInput } from "hooks.js";
import axios from "axios";

export default function CliCompUpdatee() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(
        `http://localhost:3001/cliente/complem/${id}`
      );
      setData(response.data[0]);
      setIsLoading(false);
    }
    loadData();
  }, []);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { value: ClienteId, bind: bindClienteId } = useInput(
    undefined,
    "number"
  );
  const { value: rz_social, bind: bindRz_social } = useInput(
    undefined,
    "number"
  );
  const { value: cond_pgmto, bind: bindCond_pgmto } = useInput(
    undefined,
    "number"
  );
  const { value: nome_abv, bind: bindNome_abv } = useInput();
  const { value: cep, bind: bindCep } = useInput(undefined, "number");
  const { value: rua, bind: bindRua } = useInput();
  const { value: numero, bind: bindNumero } = useInput(undefined, "number");
  const { value: bairro, bind: bindBairro } = useInput();
  const { value: cidade, bind: bindCidade } = useInput();
  const { value: uf, bind: bindUf } = useInput();
  const { value: insc_mun, bind: bindInsc_mun } = useInput(undefined, "number");
  const { value: insc_uf, bind: bindInsc_uf } = useInput(undefined, "number");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(
      CliCompUpdate(
        id,
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
                    <CardTitle tag="h4">Complemento do Cliente</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <label>Cliente</label>
                      <FormGroup
                        className={`has-label ${bindClienteId.valueerror}`}
                      >
                        <Input
                          disabled
                          defaultValue={data.ClienteId}
                          name="ClienteId"
                          type="text"
                          {...bindClienteId}
                        />
                        {bindClienteId.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Razão Social</label>
                      <FormGroup
                        className={`has-label ${bindRz_social.valueerror}`}
                      >
                        <Input
                          defaultValue={data.rz_social}
                          name="rz_social"
                          type="text"
                          {...bindRz_social}
                        />
                        {bindRz_social.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
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

                      <label>Nome Abreviado</label>
                      <FormGroup
                        className={`has-label ${bindNome_abv.valueerror}`}
                      >
                        <Input
                          defaultValue={data.nome_abv}
                          name="nome_abv"
                          type="text"
                          {...bindNome_abv}
                        />
                        {bindNome_abv.valueerror === "has-danger" ? (
                          <label className="error">Insira um nome válido</label>
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
                        <Col md="4">
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
                              type="text"
                              {...bindUf}
                            />
                            {bindUf.valueerror === "has-danger" ? (
                              <label className="error">
                                Insira um valor válido
                              </label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <label>Inscrição Municipal</label>
                          <FormGroup
                            className={`has-label ${bindInsc_mun.valueerror}`}
                          >
                            <Input
                              defaultValue={data.insc_mun}
                              name="insc_mun"
                              type="numeric"
                              {...bindInsc_mun}
                            />
                            {bindInsc_mun.valueerror === "has-danger" ? (
                              <label className="error">Insira um número</label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <label>Inscrição Federal</label>
                          <FormGroup
                            className={`has-label ${bindInsc_uf.valueerror}`}
                          >
                            <Input
                              defaultValue={data.insc_uf}
                              name="insc_uf"
                              type="numeric"
                              {...bindInsc_uf}
                            />
                            {bindInsc_uf.valueerror === "has-danger" ? (
                              <label className="error">Insira um número</label>
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
