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
  Label,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { ColabUpdate } from "~/store/modules/Colab/actions";
import { useParams, Link } from "react-router-dom";
import { useInput } from "hooks.js";
import axios from "axios";

function ColabUpdatee() {
  const { id } = useParams();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/colab/${id}`);
      setData(response.data);
      setIsLoading(false);
    }
    loadData();
  }, []);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(
    undefined,
    "number"
  );
  const { value: FornecId, bind: bindFornecId } = useInput(undefined, "number");
  const { value: log_usr, bind: bindLog_usr } = useInput(undefined, "number");
  const { value: nome, bind: bindNome } = useInput(undefined);
  const { value: dt_admiss, bind: bindDt_admiss } = useInput(undefined);
  const { value: cel, bind: bindCel } = useInput(undefined, "number");
  const { value: skype, bind: bindSkype } = useInput(undefined);
  const { value: email, bind: bindEmail } = useInput(undefined, "email");
  const { value: espec, bind: bindEspec } = useInput(undefined);

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
  console.log(data);
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
        ColabUpdate(
          id,
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
                    <CardTitle tag="h4">Edição de Colaborador</CardTitle>
                    <Link to="/cadastro/colab/colab">
                      <Button
                        style={{ float: "right" }}
                        color="info"
                        size="md"
                        className="text-center"
                      >
                        Adicionar Colaborador
                      </Button>
                    </Link>
                    <Link to={"/tabelas/colab/comp/" + id}>
                      <Button
                        style={{ textAlign: "right" }}
                        color="info"
                        size="md"
                        className="text-center"
                      >
                        Complemento
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardBody>
                    <Form className="cadastro" onSubmit={handleSubmit}>
                      <Label>Empresa</Label>
                      <FormGroup>
                        <Input
                          disabled={true}
                          name="EmpresaId"
                          defaultValue={data.EmpresaId}
                        />
                      </FormGroup>
                      <label>CPF</label>
                      <FormGroup>
                        <Input
                          disabled={true}
                          maxLength={18}
                          name="cpf"
                          type="text"
                          defaultValue={data.CPF}
                        />
                      </FormGroup>
                      <label>Fornecedor</label>
                      <FormGroup
                        className={`has-label ${bindFornecId.valueerror}`}
                      >
                        <Input
                          defaultValue={data.FornecId}
                          name="FornecId"
                          type="numeric"
                          {...bindFornecId}
                        />
                        {bindFornecId.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Usuário</label>
                      <FormGroup
                        className={`has-label ${bindLog_usr.valueerror}`}
                      >
                        <Input
                          defaultValue={data.log_usr}
                          name="log_usr"
                          type="numeric"
                          {...bindLog_usr}
                        />
                        {bindLog_usr.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
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
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Data de Adimissão</label>
                      <FormGroup
                        className={`has-label ${bindDt_admiss.valueerror}`}
                      >
                        <Input
                          defaultValue={data.dt_admiss}
                          name="dt_admiss"
                          type="date"
                          {...bindDt_admiss}
                        />
                        {bindDt_admiss.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Celular</label>
                      <FormGroup className={`has-label ${bindCel.valueerror}`}>
                        <Input
                          defaultValue={data.cel}
                          name="cel"
                          type="numeric"
                          {...bindCel}
                        />
                        {bindCel.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Skype</label>
                      <FormGroup
                        className={`has-label ${bindSkype.valueerror}`}
                      >
                        <Input
                          defaultValue={data.skype}
                          name="skype"
                          type="text"
                          {...bindSkype}
                        />
                        {bindSkype.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Email</label>
                      <FormGroup
                        className={`has-label ${bindEmail.valueerror}`}
                      >
                        <Input
                          defaultValue={data.email}
                          name="email"
                          type="text"
                          {...bindEmail}
                        />
                        {bindEmail.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Especialidade</label>
                      <FormGroup
                        className={`has-label ${bindEspec.valueerror}`}
                      >
                        <Input
                          defaultValue={data.espec}
                          name="espec"
                          type="text"
                          {...bindEspec}
                        />
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
      )}
    </Fragment>
  );
}
export default ColabUpdatee;
