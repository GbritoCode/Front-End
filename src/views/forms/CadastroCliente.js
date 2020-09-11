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
import React, { useEffect, useState } from "react";

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
import { ClienteRequest } from "~/store/modules/Cliente/actions";
import { store } from "~/store";
import axios from "axios";
import { useInput } from "~/hooks.js";

export default function CadastroCliente() {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cnpj = "", setCnpj] = useState();
  const [cnpjError = "", setCnpjError] = useState();
  const empresa = store.getState().auth.empresa;

  const { value: EmpresaId, bind: bindEmpresaId } = useInput(empresa, "number");
  const { value: nome_abv, bind: bindNome_abv } = useInput("");
  const { value: representante, bind: bindRepresentante } = useInput("");
  const { value: tipo_comiss, bind: bindTipo_comiss } = useInput("", "number");

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await axios(`http://localhost:3001/empresa/${empresa}`);
      setData(response.data);
      setIsLoading(false);
    }
    loadData();
  }, []);

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

  const errorCheckAux = [
    bindEmpresaId,
    bindNome_abv,
    bindRepresentante,
    bindTipo_comiss,
  ];
  const handleSubmit = (evt) => {
    evt.preventDefault();

    var tamanho = errorCheckAux.length;
    console.log(errorCheckAux.length);
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

      dispatch(
        ClienteRequest(cnpjdb, nome_abv, representante, tipo_comiss, EmpresaId)
      );
    }
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cliente</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Label>Empresa</Label>
                  <FormGroup
                    className={`has-label ${bindEmpresaId.valueerror}`}
                  >
                    <Input
                      disabled={true}
                      name="EmpresaId"
                      type="select"
                      {...bindEmpresaId}
                    >
                      {" "}
                      <option value={1}>
                        {" "}
                        Empresa selecionada: {data.nome}, CNPJ {data.id_federal}
                      </option>
                    </Input>
                    {bindEmpresaId.valueerror === "has-danger" ? (
                      <label className="error">Insira um número</label>
                    ) : null}
                  </FormGroup>
                  <Label>CNPJ</Label>
                  <FormGroup className={`has-label ${cnpjError}`}>
                    <Input
                      maxLength={18}
                      onChange={handleChange}
                      name="cnpj"
                      type="text"
                      value={cnpj}
                      key
                    />
                    {cnpjError === "has-danger" ? (
                      <label className="error">Insira um CNPJ válido</label>
                    ) : null}
                  </FormGroup>
                  <Label>Nome Abreviado</Label>
                  <FormGroup className={`has-label ${bindNome_abv.valueerror}`}>
                    <Input name="name_abv" type="text" {...bindNome_abv} />
                    {bindNome_abv.valueerror === "has-danger" ? (
                      <label className="error">Insira um nome válido</label>
                    ) : null}
                  </FormGroup>
                  <Label>Representante</Label>
                  <FormGroup
                    className={`has-label ${bindRepresentante.valueerror}`}
                  >
                    <Input
                      name="representante"
                      type="text"
                      {...bindRepresentante}
                    />
                    {bindRepresentante.valueerror === "has-danger" ? (
                      <label className="error">Insira um nome válido</label>
                    ) : null}
                  </FormGroup>
                  <Label>Tipo Comissão</Label>
                  <FormGroup
                    className={`has-label ${bindTipo_comiss.valueerror}`}
                  >
                    <Input
                      name="tipo_comiss"
                      type="numeric"
                      {...bindTipo_comiss}
                    />
                    {bindTipo_comiss.valueerror === "has-danger" ? (
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
