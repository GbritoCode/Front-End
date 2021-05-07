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
import React, { useRef, useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  Form,
  Input,
  FormGroup,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import NotificationAlert from "react-notification-alert";
import { useParams, Link } from "react-router-dom";
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon
} from "../../../components/Styles/uploadAreaStyles";
import { normalizeCurrency, normalizeCalcCurrency } from "~/normalize";
import { store } from "~/store";
import {
  cotacaoRequest,
  oportUpdate
} from "~/store/modules/oportunidades/actions";
import api from "~/services/api";
import TagsInput from "~/components/Tags/TagsInput";

export default function CotacaoCadastro() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const fileInputField = useRef(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const [tagsinput, settagsinput] = useState([]);
  const [string, setString] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [auxState, setAuxState] = useState(false);
  const [disabledVlrProp, setDisabledVlrProp] = useState();
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});
  const [data4, setData4] = useState({});
  const stateSchema = {
    empresaId: { value: "", error: "", message: "" },
    OportunidadeId: { value: "", error: "", message: "" },
    probVend: { value: "", error: "", message: "" },
    tipoCobranca: { value: "", error: "", message: "" },
    hrsPrevst: { value: "", error: "", message: "" },
    vlrProp: { value: "", error: "", message: "" },
    vlrDesc: { value: "", error: "", message: "" },
    vlrLiq: { value: "", error: "", message: "" },
    recLiq: { value: "", error: "", message: "" },
    prevLucro: { value: "", error: "", message: "" },
    numParcelas: { value: "", error: "", message: "" },
    motivo: { value: "1", error: "", message: "" },
    email: { value: "", error: "", message: "" }
  };
  const optionalSchema = {
    desc: { value: "", error: "", message: "" }
  };
  const [files, setFile] = useState([]);
  const [filesAux, setFileAux] = useState({});
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);
  useEffect(() => {
    const { empresa } = store.getState().auth;
    async function loadData() {
      const response2 = await api.get(`/cotacao/${id}/?one=true`);
      if (response2.data === null || response2.data.length === 0) {
        const response = await api.get(`/empresa/${empresa}`);
        const response1 = await api.get(`/oportunidade/${id}`);
        const response3 = await api.get(`/parametros/?one=true`);
        const response4 = await api.get(`/cotacao/?last=true`);
        const response5 = await api.get(
          `/cliente/cont/${response1.data.contato}/${response1.data.contato}`
        );
        setData1(response1.data);
        setData3(response3.data);
        setData4([{ id: response4.data.id + 1 }]);
        setValues(prevState => ({
          ...prevState,
          empresaId: { value: response.data.id },
          OportunidadeId: { value: response1.data.id },
          email: { value: response5.data.email }
        }));
        setAuxState(true);
      } else {
        const response1 = await api.get(`/oportunidade/${id}`);
        const response3 = await api.get(`/parametros/?one=true`);
        const response5 = await api.get(
          `/cliente/cont/${response1.data.contato}/${response1.data.contato}`
        );
        setData1(response1.data);
        setData3(response3.data);
        setData4(response2.data);
        setValues(prevState => ({
          ...prevState,
          empresaId: { value: response2.data[0].EmpresaId },
          OportunidadeId: { value: response2.data[0].OportunidadeId },
          probVend: { value: response2.data[0].probVend },
          tipoCobranca: { value: response2.data[0].tipoCobranca },
          hrsPrevst: { value: response2.data[0].hrsPrevst },
          vlrProp: {
            value: normalizeCalcCurrency(response2.data[0].vlrProp)
          },
          vlrDesc: {
            value: normalizeCurrency(response2.data[0].vlrDesc)
          },
          vlrLiq: {
            value: normalizeCalcCurrency(response2.data[0].vlrLiq)
          },
          recLiq: {
            value: normalizeCalcCurrency(response2.data[0].recLiq)
          },
          prevLucro: {
            value: normalizeCalcCurrency(response2.data[0].prevLucro)
          },
          numParcelas: { value: response2.data[0].numParcelas },
          motivo: { value: response2.data[0].motivo },
          email: { value: response5.data.email }
        }));
        setOptional(prevState => ({
          ...prevState,
          desc: { value: response2.data[0].desc }
        }));
      }
      setIsLoading(false);
    }
    loadData();
  }, [id]);

  var options = {};
  const notifyElment = useRef(null);
  function notify() {
    notifyElment.current.notificationAlert(options);
  }

  const convertBytesToKB = bytes => Math.round(bytes / 1000);
  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const addNewFiles = newFiles => {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of newFiles) {
      files.push(file);
      filesAux[file.name] = file;
    }
    return { ...filesAux };
  };
  const handleNewFileUpload = e => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      if (files.length < 2) {
        const updatedFiles = addNewFiles(newFiles);
        console.log(updatedFiles);
        setFileAux(updatedFiles);
      } else {
        options = {
          place: "tr",
          message: (
            <div>
              <div>Ops! Você só pode anexar 2 arquivos em cada email</div>
            </div>
          ),
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          autoDismiss: 7
        };
        notify();
      }
    }
  };
  const removeFile = fileName => {
    setFile(files.filter(obj => obj.name !== fileName));
    delete filesAux[fileName];
    setFileAux({ ...filesAux });
  };

  function getCliData(cobranca) {
    if (!(cobranca === "2" || cobranca === 2)) {
      setDisabledVlrProp(true);
      api
        .get(
          `/cliente/rec_desp/${data1.ClienteId}/?cobranca=${cobranca}&idRecDesp=${data1.RecDespId}`
        )
        .then(result => {
          if (result.data === null) {
            options = {
              place: "tr",
              message: (
                <div>
                  <div>
                    Ops! Parece que não há uma receita cadastrada para este
                    cliente
                  </div>
                </div>
              ),
              type: "danger",
              icon: "tim-icons icon-alert-circle-exc",
              autoDismiss: 7
            };
            notify();
            setValues(prevState => ({
              ...prevState,
              vlrLiq: { value: "" },
              recLiq: { value: "" },
              prevLucro: { value: "" }
            }));
          } else {
            setData2(result.data);
          }
        });
    } else {
      setDisabledVlrProp(false);
    }
  }

  if (!isLoading && !auxState) {
    getCliData(data4[0].tipoCobranca);
    setAuxState(true);
  }

  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };
  const handleChange = (event, name, type) => {
    event.persist();
    const target = event.target.value;
    switch (type) {
      case "number":
        if (verifyNumber(target)) {
          setValues(prevState => ({
            ...prevState,
            [name]: { value: target, error: "has-success" }
          }));
        } else {
          setValues(prevState => ({
            ...prevState,
            [name]: {
              value: target,
              error: "has-danger",
              message: "Insira um número válido"
            }
          }));
        }
        break;
      case "currency":
        setValues(prevState => ({
          ...prevState,
          [name]: { value: normalizeCalcCurrency(target) }
        }));
        break;
      case "optional":
        setOptional(prevState => ({
          ...prevState,
          [name]: { value: target }
        }));
        break;
      case "text":
        setValues(prevState => ({
          ...prevState,
          [name]: { value: target }
        }));
        break;
      default:
    }
  };

  const descontoChange = descont => {
    if (document.getElementsByName("tipoCobranca")[0].value === "2") {
      const imposto =
        (data3.IRPJ +
          data3.CSLL +
          data3.COFINS +
          data3.PIS +
          data3.INSS +
          data3.ISS) /
        10000;

      const value = descont.replace(/[.,]+/g, "");

      const hr = document.getElementsByName("hrsPrevst")[0].value;
      const prop = document
        .getElementsByName("vlrProp")[0]
        .value.replace(/[.,]+/g, "");
      const vLiq = prop - value;
      const rLiq = (
        (vLiq - parseFloat(parseFloat(vLiq)) * imposto) /
        100
      ).toFixed(2);
      const lucro = (parseFloat(rLiq) - (hr * data3.vlrBsHr) / 100).toFixed(2);

      setValues(prevState => ({
        ...prevState,
        vlrLiq: { value: normalizeCalcCurrency(vLiq) }
      }));
      setValues(prevState => ({
        ...prevState,
        recLiq: { value: normalizeCalcCurrency(rLiq) }
      }));
      setValues(prevState => ({
        ...prevState,
        prevLucro: { value: normalizeCalcCurrency(lucro) }
      }));
      return;
    }
    if (
      !(
        document.getElementsByName("tipoCobranca")[0].value === "2" &&
        data2.valorRec
      )
    ) {
      const imposto =
        (data3.IRPJ +
          data3.CSLL +
          data3.COFINS +
          data3.PIS +
          data3.INSS +
          data3.ISS) /
        10000;

      const value = descont.replace(/[.,]+/g, "");

      const vHr = data2.valorRec;
      const hr = document.getElementsByName("hrsPrevst")[0].value;
      const prop = hr * vHr;
      const vLiq = prop - value;
      const rLiq = (
        (vLiq - parseFloat(parseFloat(vLiq)) * imposto) /
        100
      ).toFixed(2);
      const lucro = (parseFloat(rLiq) - (hr * data3.vlrBsHr) / 100).toFixed(2);

      setValues(prevState => ({
        ...prevState,
        vlrLiq: { value: normalizeCalcCurrency(vLiq) }
      }));
      setValues(prevState => ({
        ...prevState,
        recLiq: { value: normalizeCalcCurrency(rLiq) }
      }));
      setValues(prevState => ({
        ...prevState,
        prevLucro: { value: normalizeCalcCurrency(lucro) }
      }));
    }
  };

  const handleTagsinput = value => {
    const verifyEmail = email => {
      var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRex.test(email)) {
        return true;
      }
      return false;
    };
    if (verifyEmail(value[value.length - 1])) {
      setString(`${value}`);
      settagsinput(value);
    } else {
      options = {
        place: "tr",
        message: (
          <div>
            <div>Digite um email válido</div>
          </div>
        ),
        type: "danger",
        icon: "tim-icons icon-alert-circle-exc",
        autoDismiss: 7
      };
      notify();
    }
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    var aux = Object.entries(values);
    const tamanho = aux.length;

    for (let i = 0; i < tamanho; i++) {
      if (!(aux[i][1].error === "has-danger")) {
        var valid = true;
      } else {
        valid = false;
        break;
      }
    }
    for (let j = 0; j < tamanho; j++) {
      if (aux[j][1].value !== "") {
        var filled = true;
      } else {
        filled = false;
        setValues(prevState => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" }
        }));
        break;
      }
    }

    if (valid && filled) {
      var vlrPropdb = values.vlrProp.value.replace(/[.,]+/g, "");
      var vlrDescdb = values.vlrDesc.value.replace(/[.,]+/g, "");
      var vlrLiqdb = values.vlrLiq.value.replace(/[.,]+/g, "");
      var recLiqdb = values.recLiq.value.replace(/[.,]+/g, "");
      var prevLucrodb = values.prevLucro.value.replace(/[.,]+/g, "");

      const formData = new FormData();

      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        formData.append("file", file);
      }
      dispatch(
        cotacaoRequest(
          values.empresaId.value,
          values.OportunidadeId.value,
          values.probVend.value,
          values.tipoCobranca.value,
          values.hrsPrevst.value,
          vlrPropdb,
          vlrDescdb,
          vlrLiqdb,
          recLiqdb,
          prevLucrodb,
          values.numParcelas.value,
          values.motivo.value,
          optional.desc.value
        )
      );

      dispatch(
        oportUpdate(
          data1.id,
          data1.EmpresaId,
          data1.ColabId,
          data1.ClienteId,
          data1.UndNegId,
          data1.RecDespId,
          data1.SegmentoId,
          data1.RepresentanteId,
          data1.contato,
          data1.data,
          3,
          data1.cod,
          data1.desc,
          data1.narrativa
        )
      );

      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(500);

      if (values.motivo.value === "1") {
        await api.post(
          `/files/oport/cotacao/?id=${data4[0].id + 1}&oportId=${
            data1.id
          }&tipo=cotacao&situacao=orcamento&table=cotacao&Cc=${string}`,
          formData
        );
      } else {
        await api.post(
          `/files/oport/cotacao/?id=${data4[0].id + 1}&oportId=${
            data1.id
          }&tipo=cotacao&situacao=revisao&table=cotacao&Cc=${string}`,
          formData
        );
      }
    } else {
      options = {
        place: "tr",
        message: (
          <div>
            <div>Ops! Há algo errado</div>
          </div>
        ),
        type: "danger",
        icon: "tim-icons icon-alert-circle-exc",
        autoDismiss: 7
      };
      notify();
    }
  };
  return (
    <>
      {isLoading ? (
        <>
          <div className="content" />
        </>
      ) : (
        <>
          <div className="rna-container">
            <NotificationAlert ref={notifyElment} />
          </div>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <h3 style={{ marginBottom: 0 }}>Cotação</h3>
                    <p style={{ fontSize: 11 }}>
                      {data1.cod} | {data1.desc}
                    </p>
                    <p style={{ fontSize: 11 }}>{data1.Cliente.nomeAbv}</p>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          {" "}
                          <Label>Probabilidade de Venda</Label>
                          <FormGroup
                            className={`has-label ${values.probVend.error}`}
                          >
                            <Input
                              name="probVend"
                              type="select"
                              onChange={event =>
                                handleChange(event, "probVend", "text")
                              }
                              value={values.probVend.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione a Probabilidade de venda{" "}
                              </option>
                              <option value={1}>Alta</option>
                              <option value={2}>Média</option>
                              <option value={3}>Baixa</option>
                            </Input>
                            {values.probVend.error === "has-danger" ? (
                              <Label className="error">
                                {values.probVend.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <Label>Tipo de Cobrança</Label>
                          <FormGroup
                            className={`has-label ${values.tipoCobranca.error}`}
                          >
                            <Input
                              name="tipoCobranca"
                              type="select"
                              onChange={event =>
                                handleChange(event, "tipoCobranca", "text")
                              }
                              onChangeCapture={e => {
                                getCliData(e.target.value);
                              }}
                              value={values.tipoCobranca.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione o tipo de cobrança{" "}
                              </option>
                              <option value={1}>Por Hora</option>
                              <option value={2}>Por Projeto</option>
                            </Input>
                            {values.tipoCobranca.error === "has-danger" ? (
                              <Label className="error">
                                {values.tipoCobranca.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Horas Previstas</Label>
                          <FormGroup
                            className={`has-label ${values.hrsPrevst.error}`}
                          >
                            <Input
                              name="hrsPrevst"
                              type="numeric"
                              onChange={event => {
                                handleChange(event, "hrsPrevst", "number");
                                if (
                                  !(
                                    document.getElementsByName(
                                      "tipoCobranca"
                                    )[0].value === "2"
                                  )
                                ) {
                                  setValues(prevState => ({
                                    ...prevState,
                                    vlrProp: {
                                      value: normalizeCalcCurrency(
                                        JSON.stringify(
                                          event.target.value * data2.valorRec
                                        )
                                      )
                                    }
                                  }));
                                }
                                descontoChange(
                                  document.getElementsByName("vlrDesc")[0].value
                                );
                              }}
                              value={values.hrsPrevst.value}
                            />
                            {values.hrsPrevst.error === "has-danger" ? (
                              <Label className="error">
                                {values.hrsPrevst.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          {" "}
                          <Label>Valor da Proposta</Label>
                          <FormGroup
                            className={`has-label ${values.vlrProp.error}`}
                          >
                            <Input
                              disabled={disabledVlrProp}
                              name="vlrProp"
                              type="numeric"
                              onChange={event => {
                                handleChange(event, "vlrProp", "currency");

                                descontoChange(
                                  document.getElementsByName("vlrDesc")[0].value
                                );
                              }}
                              value={values.vlrProp.value}
                            />
                            {values.vlrProp.error === "has-danger" ? (
                              <Label className="error">
                                {values.vlrProp.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Valor Desconto</Label>
                          <FormGroup
                            className={`has-label ${values.vlrDesc.error}`}
                          >
                            <Input
                              name="vlrDesc"
                              type="text"
                              onChange={event => {
                                handleChange(event, "vlrDesc", "currency");
                                descontoChange(event.target.value);
                              }}
                              value={values.vlrDesc.value}
                            />
                            {values.vlrDesc.error === "has-danger" ? (
                              <Label className="error">
                                {values.vlrDesc.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <Label>Valor Líquido</Label>
                          <FormGroup
                            className={`has-label ${values.vlrLiq.error}`}
                          >
                            <Input
                              disabled
                              name="vlrLiq"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "vlrLiq", "currency")
                              }
                              value={values.vlrLiq.value}
                            />
                            {values.vlrLiq.error === "has-danger" ? (
                              <Label className="error">
                                {values.vlrLiq.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Previsão de Lucro</Label>
                          <FormGroup
                            className={`has-label ${values.prevLucro.error}`}
                          >
                            <Input
                              disabled
                              name="prevLucro"
                              type="numeric"
                              onChange={event =>
                                handleChange(event, "prevLucro", "currency")
                              }
                              value={values.prevLucro.value}
                            />
                            {values.prevLucro.error === "has-danger" ? (
                              <Label className="error">
                                {values.prevLucro.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Número de Parcelas</Label>
                          <FormGroup
                            className={`has-label ${values.numParcelas.error}`}
                          >
                            <Input
                              name="numParcelas"
                              type="select"
                              onChange={event =>
                                handleChange(event, "numParcelas", "text")
                              }
                              value={values.numParcelas.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione a quantidade de parcelas{" "}
                              </option>{" "}
                              <option value={1}>01</option>
                              <option value={2}>02</option>
                              <option value={3}>03</option>
                              <option value={4}>04</option>
                              <option value={5}>05</option>
                              <option value={6}>06</option>
                              <option value={7}>07</option>
                              <option value={8}>08</option>
                              <option value={9}>09</option>
                              <option value={10}>10</option>
                              <option value={11}>11</option>
                              <option value={12}>12</option>
                            </Input>
                            {values.numParcelas.error === "has-danger" ? (
                              <Label className="error">
                                {values.numParcelas.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Motivo Orçamento/Revisão</Label>
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                name="motivo"
                                type="radio"
                                onChange={event =>
                                  handleChange(event, "motivo", "text")
                                }
                                value={1}
                              />{" "}
                              Orçamento
                            </Label>
                            <Label check>
                              <Input
                                name="motivo"
                                type="radio"
                                onChange={event =>
                                  handleChange(event, "motivo", "text")
                                }
                                value={2}
                              />
                              Desconto
                            </Label>
                            <Label check>
                              <Input
                                name="motivo"
                                type="radio"
                                onChange={event =>
                                  handleChange(event, "motivo", "text")
                                }
                                value={3}
                              />
                              Escopo
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>Descrição</Label>
                          <FormGroup
                            className={`has-label ${optional.desc.error}`}
                          >
                            <Input
                              name="desc"
                              type="textarea"
                              onChange={event =>
                                handleChange(event, "desc", "optional")
                              }
                              value={optional.desc.value}
                            />
                            {optional.desc.error === "has-danger" ? (
                              <Label className="error">
                                {optional.desc.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FileUploadContainer>
                            <DragDropText>Arraste e solte ou</DragDropText>
                            <UploadFileBtn
                              type="button"
                              onClick={handleUploadBtnClick}
                            >
                              <i className="fas fa-file-upload" />
                              <span>selecione um arquivo </span>
                            </UploadFileBtn>
                            <FormField
                              type="file"
                              ref={fileInputField}
                              onChange={handleNewFileUpload}
                              title=""
                              value=""
                            />
                          </FileUploadContainer>
                          <FilePreviewContainer>
                            <PreviewList>
                              {Object.keys(filesAux).map((fileName, index) => {
                                const file = filesAux[fileName];
                                const isImageFile =
                                  file.type.split("/")[0] === "image";
                                return (
                                  <PreviewContainer key={fileName}>
                                    <div>
                                      {isImageFile && (
                                        <ImagePreview
                                          src={URL.createObjectURL(file)}
                                          alt={`file preview ${index}`}
                                        />
                                      )}
                                      <FileMetaData isImageFile={isImageFile}>
                                        <span>{file.name}</span>
                                        <aside>
                                          {convertBytesToKB(file.size)} kb
                                          <RemoveFileIcon
                                            className="fas fa-trash-alt"
                                            onClick={() => removeFile(fileName)}
                                          />
                                        </aside>
                                      </FileMetaData>
                                    </div>
                                  </PreviewContainer>
                                );
                              })}
                            </PreviewList>
                          </FilePreviewContainer>
                        </Col>
                      </Row>{" "}
                      <Row>
                        <Col md="4">
                          <Label>Email Principal</Label>
                          <Input disabled value={values.email.value} />
                        </Col>
                        <Col md="8">
                          <Label style={{ display: "block" }}>Bcc Email</Label>
                          <TagsInput
                            onChange={handleTagsinput}
                            tagProps={{
                              className: "react-tagsinput-tag "
                            }}
                            value={tagsinput}
                          />
                        </Col>
                      </Row>
                      <Link to="/tabelas/oportunidade/oport">
                        <Button
                          style={{
                            paddingLeft: 32,
                            paddingRight: 33
                          }}
                          color="secundary"
                          size="small"
                          className="form"
                        >
                          <i
                            className="tim-icons icon-double-left"
                            style={{
                              paddingBottom: 4,
                              paddingRight: 1
                            }}
                            size="large"
                          />{" "}
                          Voltar
                        </Button>
                      </Link>
                      <Button
                        style={{
                          paddingLeft: 29,
                          paddingRight: 30
                        }}
                        className="form"
                        color="info"
                        type="submit"
                      >
                        Enviar{" "}
                        <i
                          className="tim-icons icon-send"
                          style={{
                            paddingBottom: 4,
                            paddingLeft: 3
                          }}
                          size="large"
                        />
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
}
