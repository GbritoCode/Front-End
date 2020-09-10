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
import { parametrosRequest } from "~/store/modules/general/actions";
import { store } from "~/store";
import { useInput } from "hooks.js";

export default function ParametrosCadastro() {
  const dispatch = useDispatch();
  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa, "number");
  const { value: impostos, bind: bindImpostos } = useInput("", "number");
  const { value: vlr_min_hr, bind: bindVlr_min_hr } = useInput("", "number");
  const { value: vlr_bs_hr, bind: bindVlr_bs_hr } = useInput("", "number");
  const { value: vlr_bs_desp, bind: bindVlr_bs_desp } = useInput("", "number");
  const { value: adianta_pgmto, bind: bindAdianta_pgmto } = useInput("");
  const { value: perc_adianta_pgmto, bind: bindPerc_adianta_pgmto } = useInput(
    "",
    "number"
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(
      parametrosRequest(
        EmpresaId,
        impostos,
        vlr_min_hr,
        vlr_bs_hr,
        vlr_bs_desp,
        adianta_pgmto,
        perc_adianta_pgmto
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
                <CardTitle tag="h4">Parâmetros</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <label>Empresa</label>
                  <FormGroup
                    className={`has-label ${bindEmpresaId.valueerror}`}
                  >
                    <Input
                      disabled={true}
                      name="EmpresaId"
                      type="numeric"
                      {...bindEmpresaId}
                    />
                    {bindEmpresaId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Impostos</label>
                  <FormGroup className={`has-label ${bindImpostos.valueerror}`}>
                    <Input name="impostos" type="numeric" {...bindImpostos} />
                    {bindImpostos.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Valor Mínimo da Hora</label>
                  <FormGroup
                    className={`has-label ${bindVlr_min_hr.valueerror}`}
                  >
                    <Input
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
                    <Input name="vlr_bs_hr" type="numeric" {...bindVlr_bs_hr} />
                    {bindVlr_bs_hr.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>

                  <label>Valor Base da Despesa</label>
                  <FormGroup
                    className={`has-label ${bindVlr_bs_desp.valueerror}`}
                  >
                    <Input
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
  );
}
