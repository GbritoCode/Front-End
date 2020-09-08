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
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";

import { Form, Input } from "@rocketseat/unform";

import { parametrosRequest } from "~/store/modules/general/actions";

import * as yup from "yup";

const schema = yup.object().shape({
  EmpresaId: yup.number().required(),
  impostos: yup.number().required(),
  vlr_min_hr: yup.number().required(),
  vlr_bs_hr: yup.number().required(),
  vlr_bs_desp: yup.number().required(),
  adianta_pgmto: yup.string().required(),
  perc_adianta_pgmto: yup.number().required(),
});

export default function ParametrosCadastro() {
  const dispatch = useDispatch();

  function handleSubmit({
    EmpresaId,
    impostos,
    vlr_min_hr,
    vlr_bs_hr,
    vlr_bs_desp,
    adianta_pgmto,
    perc_adianta_pgmto,
  }) {
    console.log("asdas");
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
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cadastro de Parâmetros</CardTitle>
              </CardHeader>
              <CardBody>
                <Form
                  className="cadastro"
                  onSubmit={handleSubmit}
                  schema={schema}
                >
                  <label>EmpresaId</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="EmpresaId"
                      type="numeric"
                    />
                  </FormGroup>

                  <label>impostos</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="impostos"
                      type="numeric"
                    />
                  </FormGroup>

                  <label>vlr_min_hr</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="vlr_min_hr"
                      type="numeric"
                    />
                  </FormGroup>

                  <label>vlr_bs_hr</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="vlr_bs_hr"
                      type="numeric"
                      autoComplete="off"
                    />
                  </FormGroup>
                  <label>vlr_bs_desp</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="vlr_bs_desp"
                      type="numeric"
                    />
                  </FormGroup>

                  <label>adianta_pgmto</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="adianta_pgmto"
                      type="text"
                    />
                  </FormGroup>

                  <label>perc_adianta_pgmto</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="perc_adianta_pgmto"
                      type="numeric"
                    />
                  </FormGroup>

                  <FormGroup check className="mt-3">
                    <Label check>
                      <Input name="check" type="checkbox" />
                      <span className="form-check-sign" />
                      Subscribe to newsletter
                    </Label>
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
