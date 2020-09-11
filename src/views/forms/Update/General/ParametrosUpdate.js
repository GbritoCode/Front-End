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
import { ParametrosUpdate } from "~/store/modules/general/actions";
import { useParams, Link } from "react-router-dom";
import { useInput } from "hooks.js";
import axios from "axios";

function ParametrosUpdatee() {
  const { id } = useParams();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/parametros/${id}`);
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
  const { value: impostos, bind: bindImpostos } = useInput(undefined, "number");
  const { value: vlr_min_hr, bind: bindVlr_min_hr } = useInput(
    undefined,
    "number"
  );
  const { value: vlr_bs_hr, bind: bindVlr_bs_hr } = useInput(
    undefined,
    "number"
  );
  const { value: vlr_bs_desp, bind: bindVlr_bs_desp } = useInput(
    undefined,
    "number"
  );
  const { value: adianta_pgmto, bind: bindAdianta_pgmto } = useInput(undefined);
  const { value: perc_adianta_pgmto, bind: bindPerc_adianta_pgmto } = useInput(
    undefined,
    "number"
  );

  const errorCheckAux = [
    bindEmpresaId,
    bindImpostos,
    bindVlr_min_hr,
    bindVlr_bs_hr,
    bindVlr_bs_desp,
    bindAdianta_pgmto,
    bindPerc_adianta_pgmto,
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
        ParametrosUpdate(
          id,
          EmpresaId,
          impostos,
          vlr_min_hr,
          vlr_bs_hr,
          vlr_bs_desp,
          adianta_pgmto,
          perc_adianta_pgmto
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
                    <CardTitle tag="h4">Edição de Área</CardTitle>
                    <Link to="/cadastro/geral/area">
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

                      <label>Impostos</label>
                      <FormGroup
                        className={`has-label ${bindImpostos.valueerror}`}
                      >
                        <Input
                          defaultValue={data.impostos}
                          name="impostos"
                          type="numeric"
                          {...bindImpostos}
                        />
                        {bindImpostos.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Valor Mínimo da Hora</label>
                      <FormGroup
                        className={`has-label ${bindVlr_min_hr.valueerror}`}
                      >
                        <Input
                          defaultValue={data.vlr_min_hr}
                          name="vlr_min_hr"
                          type="numeric"
                          {...bindVlr_min_hr}
                        />
                        {bindVlr_min_hr.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Valor Base Da Hora</label>
                      <FormGroup
                        className={`has-label ${bindVlr_bs_hr.valueerror}`}
                      >
                        <Input
                          defaultValue={data.vlr_bs_hr}
                          name="vlr_bs_hr"
                          type="numeric"
                          {...bindVlr_bs_hr}
                        />
                        {bindVlr_bs_hr.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Valor Base da Despesa</label>
                      <FormGroup
                        className={`has-label ${bindVlr_bs_desp.valueerror}`}
                      >
                        <Input
                          defaultValue={data.vlr_bs_desp}
                          name="vlr_bs_desp"
                          type="numeric"
                          {...bindVlr_bs_desp}
                        />
                        {bindVlr_bs_desp.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Adianta Pagamento</label>
                      <FormGroup
                        className={`has-label ${bindAdianta_pgmto.valueerror}`}
                      >
                        <Input
                          defaultValue={data.adianta_pgmto}
                          name="adianta_pgmto"
                          type="text"
                          {...bindAdianta_pgmto}
                        />
                        {bindAdianta_pgmto.valueerror === "has-danger" ? (
                          <label className="error">Insira um número</label>
                        ) : null}
                      </FormGroup>

                      <label>Percentual do Adiantamento</label>
                      <FormGroup
                        className={`has-label ${bindPerc_adianta_pgmto.valueerror}`}
                      >
                        <Input
                          defaultValue={data.adianta_pgmto}
                          name="perc_adianta_pgmto"
                          type="numeric"
                          {...bindPerc_adianta_pgmto}
                        />
                        {bindPerc_adianta_pgmto.valueerror === "has-danger" ? (
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
export default ParametrosUpdatee;
