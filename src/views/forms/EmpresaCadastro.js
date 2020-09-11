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
import React, { useState } from "react";

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
import { empresaRequest } from "~/store/modules/general/actions";
import { useInput } from "hooks.js";

export default function EmpresaCadastro() {
  const dispatch = useDispatch();

  const [cnpj = "", setCnpj] = useState();
  const [cnpjError = "", setCnpjError] = useState();
  const { value: nome, bind: bindNome } = useInput("");
  const { value: license, bind: bindLicense } = useInput("");
  const { value: UserId, bind: bindUserId } = useInput("", "number");

  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj == "") return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999"
    )
      return false;

    // Valida DVs
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }

  const normalizeInput = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, "");
    const cvLength = currentValue.length;
    renderCnpjState(value);
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 3) return currentValue;
      if (cvLength < 6)
        return `${currentValue.slice(0, 2)}.${currentValue.slice(2)}`;
      if (cvLength < 9)
        return `${currentValue.slice(0, 2)}.${currentValue.slice(
          2,
          5
        )}.${currentValue.slice(5)}`;
      if (cvLength < 13)
        return `${currentValue.slice(0, 2)}.${currentValue.slice(
          2,
          5
        )}.${currentValue.slice(5, 8)}/${currentValue.slice(8)}`;
      return `${currentValue.slice(0, 2)}.${currentValue.slice(
        2,
        5
      )}.${currentValue.slice(5, 8)}/${currentValue.slice(
        8,
        12
      )}-${currentValue.slice(12, 14)}`;
    }
  };

  async function handleChange({ target: { value } }) {
    setCnpj((prevCnpj) => normalizeInput(value, prevCnpj));
  }

  const renderCnpjState = (value) => {
    if (!validarCNPJ(value)) {
      setCnpjError("has-danger");
    } else {
      setCnpjError("has-success");
    }
  };

  const errorCheckAux = [bindNome, bindLicense, bindUserId];
  const handleSubmit = (evt) => {
    evt.preventDefault();

    var tamanho = errorCheckAux.length;
    for (var j = 0; j < tamanho; j++) {
      if (
        !(errorCheckAux[j].valueerror === "has-danger") &
        !(cnpjError === "has-danger") &
        !(errorCheckAux[j].value === "") &
        !(cnpj === "")
      ) {
        var valid = true;
      } else {
        valid = false;
        break;
      }
    }
    if (valid) {
      var cnpjdb = cnpj.replace(/[^\d]+/g, "");
      dispatch(empresaRequest(cnpjdb, nome, license, UserId));
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Empresa</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <label>CNPJ</label>
                  <FormGroup className={`has-label ${cnpjError}`}>
                    <Input
                      onChange={handleChange}
                      name="id_federal"
                      type="text"
                      value={cnpj}
                    />
                    {cnpjError === "has-danger" ? (
                      <label className="error">Insira um CNPJ válido</label>
                    ) : null}
                  </FormGroup>

                  <label>Nome</label>
                  <FormGroup className={`has-label ${bindNome.valueerror}`}>
                    <Input name="nome" type="text" {...bindNome} />
                    {bindNome.valueerror === "has-danger" ? (
                      <label className="error">Insira um nome válido</label>
                    ) : null}
                  </FormGroup>

                  <label>License</label>
                  <FormGroup className={`has-label ${bindLicense.valueerror}`}>
                    <Input name="license" type="text" {...bindLicense} />
                    {bindLicense.valueerror === "has-danger" ? (
                      <label className="error">Insira um valor válido</label>
                    ) : null}
                  </FormGroup>

                  <label>Usuário</label>
                  <FormGroup className={`has-label ${bindUserId.valueerror}`}>
                    <Input name="UserId" type="numeric" {...bindUserId} />
                    {bindUserId.valueerror === "has-danger" ? (
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
