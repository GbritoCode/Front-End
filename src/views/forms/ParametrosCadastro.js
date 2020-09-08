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
import * as yup from "yup";
import { store } from "~/store";
import { useInput } from "hooks.js";

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
  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa);
  const { value: impostos, bind: bindImpostos } = useInput("");
  const { value: vlr_min_hr, bind: bindVlr_min_hr } = useInput("");
  const { value: vlr_bs_hr, bind: bindVlr_bs_hr } = useInput("");
  const { value: vlr_bs_desp, bind: bindVlr_bs_desp } = useInput("");
  const { value: adianta_pgmto, bind: bindAdianta_pgmto } = useInput("");
  const { value: perc_adianta_pgmto, bind: bindPerc_adianta_pgmto } = useInput(
    ""
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
                <CardTitle tag="h4">Cadastro de Parâmetros</CardTitle>
              </CardHeader>
              <CardBody>
                <Form
                  className="cadastro"
                  onSubmit={handleSubmit}
                  schema={schema}
                >
                  <label>Empresa</label>
                  <FormGroup>
                    <Input
                      disabled={true}
                      className="cadastro"
                      name="EmpresaId"
                      type="numeric"
                      {...bindEmpresaId}
                    />
                  </FormGroup>

                  <label>Impostos</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="impostos"
                      type="numeric"
                      {...bindImpostos}
                    />
                  </FormGroup>

                  <label>Valor Mínimo da Hora</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="vlr_min_hr"
                      type="numeric"
                      {...bindVlr_min_hr}
                    />
                  </FormGroup>

                  <label>Valor Base Da Hora</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="vlr_bs_hr"
                      type="numeric"
                      {...bindVlr_bs_hr}
                    />
                  </FormGroup>
                  <label>Valor Base da Despesa</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="vlr_bs_desp"
                      type="numeric"
                      {...bindVlr_bs_desp}
                    />
                  </FormGroup>

                  <label>Adianta Pagamento</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="adianta_pgmto"
                      type="text"
                      {...bindAdianta_pgmto}
                    />
                  </FormGroup>

                  <label>Percentual do Adiantamento</label>
                  <FormGroup>
                    <Input
                      className="cadastro"
                      name="perc_adianta_pgmto"
                      type="numeric"
                      {...bindPerc_adianta_pgmto}
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
