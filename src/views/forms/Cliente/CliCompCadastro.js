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
import { CliCompRequest } from "~/store/modules/Cliente/actions";
import { useInput } from "~/hooks";
import { useParams } from "react-router-dom";
import axios from "axios";
import ajax from "ajax";
export default function CliCompCadastro() {
  const id = useParams();
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const [data1, setData1] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/cliente/${id.id}`);
      setData(response.data);
      const response1 = await fetch(
        `https://www.receitaws.com.br/v1/cnpj/61808531000108`,
        {
          method: "OPTIONS",
          dataType: "jsonp",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "/",
          },
        }
      );
      setData1(response1.data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const { value: ClienteId, bind: bindClienteId } = useInput("", "number");
  const { value: rz_social, bind: bindRz_social } = useInput("", "number");
  const { value: cond_pgmto, bind: bindCond_pgmto } = useInput("", "number");
  const { value: nome_abv, bind: bindNome_abv } = useInput("");
  const { value: cep, bind: bindCep } = useInput("", "number");
  const { value: rua, bind: bindRua } = useInput("");
  const { value: numero, bind: bindNumero } = useInput("", "number");
  const { value: bairro, bind: bindBairro } = useInput("");
  const { value: cidade, bind: bindCidade } = useInput("");
  const { value: uf, bind: bindUf } = useInput("");
  const { value: insc_mun, bind: bindInsc_mun } = useInput("", "number");
  const { value: insc_uf, bind: bindInsc_uf } = useInput("", "number");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      CliCompRequest(
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
  console.log(data1);
  return (
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
                      disabled={true}
                      name="ClienteId"
                      type="select"
                      {...bindClienteId}
                    >
                      {" "}
                      <option value={data.id}>
                        {" "}
                        Cliente atual: {data.nome_abv}, CNPJ {data.CNPJ}
                      </option>
                    </Input>
                    {bindClienteId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>
                  <Input
                    hidden={true}
                    disabled={true}
                    name="cnpj"
                    type="text"
                    value={data.CNPJ}
                  />
                  <label>Razão Social</label>
                  <FormGroup
                    className={`has-label ${bindRz_social.valueerror}`}
                  >
                    <Input name="rz_social" type="text" {...bindRz_social} />
                    {bindRz_social.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
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

                  <label>Nome Abreviado</label>
                  <FormGroup className={`has-label ${bindNome_abv.valueerror}`}>
                    <Input name="nome_abv" type="text" {...bindNome_abv} />
                    {bindNome_abv.valueerror === "has-danger" ? (
                      <label className="error">Insira um nome válido</label>
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

                    <Col md="4">
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
                        <Input name="insc_uf" type="numeric" {...bindInsc_uf} />
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
  );
}
