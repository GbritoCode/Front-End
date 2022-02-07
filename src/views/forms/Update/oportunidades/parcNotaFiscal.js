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
  FormGroup,
  Label,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { GetApp } from "@material-ui/icons";
import { isBefore, parseISO } from "date-fns";
import {
  faturaParcela,
  parcelaUpdate
} from "~/store/modules/oportunidades/actions";
import { normalizeCurrency, normalizeCalcCurrency } from "~/normalize";
import api from "~/services/api";
import history from "~/services/history";
import TagsInput from "~/components/Tags/TagsInput";
import {
  FileUploadContainer,
  FormField,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon
} from "../../../../components/Styles/uploadAreaStyles";
import { store } from "~/store";
/* eslint-disable eqeqeq */
export default function ParcelaUpdate() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const fileInputField = useRef(null);

  // eslint-disable-next-line no-extend-native
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  var filesError = "";
  const dispatch = useDispatch();
  const { id } = useParams();
  const [disabledField, setDisabledField] = useState();
  const [dtVenc, setDtVenc] = useState();
  const [data, setData] = useState();
  const [data1, setData1] = useState();
  const [tagsinput, settagsinput] = useState([]);

  const [string, setString] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  // const dtVenc = today
  const stateSchema = {
    OportunidadeId: { value: "", error: "", message: "" },
    parcela: { value: "", error: "", message: "" },
    vlrParcela: { value: "", error: "", message: "" },
    dtEmissao: { value: ``, error: "", message: "" },
    dtVencimento: {
      value: "",
      error: "",
      message: ""
    },
    notaFiscal: { value: "", error: "", message: "" },
    email: { value: "", error: "", message: "" },
    idColab: { value: "", error: "", message: "" },
    idCliente: { value: "", error: "", message: "" },
    idRecDesp: { value: "", error: "", message: "" },
    idEmpresa: { value: "", error: "", message: "" }
  };
  const optionalSchema = {
    pedidoCliente: { value: "Não informado", error: "", message: "" },
    situacao: { value: 1, error: "", message: "" },
    dtLiquidacao: { value: "", error: "", message: "" },
    vlrPago: { value: "", error: "", message: "" },
    saldo: { value: "", error: "", message: "" }
  };
  const [filesAux, setFileAux] = useState({});
  const [filePreview, setFilePreview] = useState([]);
  const [files, setFile] = useState([]);
  const [values, setValues] = useState(stateSchema);
  const [optional, setOptional] = useState(optionalSchema);

  const downloadFile = async fileId => {
    const url = `${process.env.REACT_APP_API_URL}/download/oport/download/${fileId}/?table=parcelas`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "file", "");
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    const { id: idColab } = store.getState().auth.user.Colab;
    async function loadData() {
      const response = await api.get(`/parcela/aux/${id}`);
      const response1 = await api.get(
        `/oportunidade/${response.data.OportunidadeId}`
      );
      const response2 = await api.get(
        `/cliente/complem/${response1.data.ClienteId}`
      );
      const response3 = await api.get(
        `/condPgmto/${response2.data.CondPgmtoId}`
      );
      const response4 = await api.get(
        `/cliente/cont/${response1.data.contato}/${response1.data.contato}`
      );
      await api
        .get(`/parcela_ped/${response.data.OportunidadeId}`)
        .then(result => {
          setOptional(prevState => ({
            ...prevState,
            pedidoCliente: { value: result.data.parc.pedidoCliente }
          }));
        })
        .catch(err => console.log("sem ped"));

      if (response.data.situacao > 1) {
        const response5 = await api.get(
          `/download/oport/getPreview/${response.data.id}/?table=parcelas`
        );
        setFilePreview(response5.data);
        setFile(response5.data);
        setOptional(prevState => ({
          ...prevState,
          pedidoCliente: { value: response.data.pedidoCliente }
        }));
      }
      setDisabledField(response.data.situacao > 1);
      setData(response.data);
      setData1(response1.data);
      const today = new Date();
      const [date, month, year] = today.toLocaleDateString("pt-BR").split("/");
      const [dateVenc, monthVenc, yearVenc] = new Date()
        .addDays(response3.data.diasPrazo)
        .toLocaleDateString("pt-BR")
        .split("/");
      if (isBefore(parseISO(response.data.dtVencimento), today)) {
        setDtVenc({ venc: true, dt: response.data.dtVencimento });
      }
      setValues(prevState => ({
        ...prevState,
        OportunidadeId: { value: response.data.OportunidadeId },
        parcela: { value: response.data.parcela },
        vlrParcela: {
          value: normalizeCalcCurrency(response.data.vlrParcela)
        },
        dtVencimento: {
          value:
            response.data.dtVencimento || `${yearVenc}-${monthVenc}-${dateVenc}`
        },
        dtEmissao: {
          value: response.data.dtEmissao || `${year}-${month}-${date}`
        },
        notaFiscal: { value: response.data.notaFiscal },
        email: { value: response4.data.email },
        idColab: { value: idColab },
        idCliente: { value: response1.data.ClienteId },
        idRecDesp: { value: response1.data.RecDespId },
        idEmpresa: { value: response1.data.EmpresaId }
      }));

      setOptional(prevState => ({
        ...prevState,
        situacao: { value: response.data.situacao },
        dtLiquidacao: { value: response.data.dtLiquidacao },
        vlrPago: {
          value: normalizeCurrency(JSON.stringify(response.data.vlrPago))
        },
        saldo: {
          value: normalizeCurrency(JSON.stringify(response.data.saldo))
        }
      }));

      if (normalizeCurrency(JSON.stringify(response.data.saldo)) === "0,00") {
        setOptional(prevState => ({
          ...prevState,
          saldo: { value: normalizeCalcCurrency(response.data.vlrParcela) }
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

  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
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
      case "optional":
        setOptional(prevState => ({
          ...prevState,
          [name]: { value: target }
        }));
        break;
      case "currency":
        setValues(prevState => ({
          ...prevState,
          [name]: { value: normalizeCurrency(target) }
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

  const handleSubmit = async evt => {
    evt.preventDefault();
    var aux = Object.entries(values);
    const tamanho = aux.length;
    var valid;
    var filled;

    for (let i = 0; i < tamanho; i++) {
      if (!(aux[i][1].error === "has-danger")) {
        valid = true;
      } else {
        valid = false;
        break;
      }
    }

    for (let j = 0; j < tamanho; j++) {
      if (aux[j][1].value !== "" && aux[j][1].value !== null) {
        filled = true;
      } else {
        filled = false;
        setValues(prevState => ({
          ...prevState,
          [aux[j][0]]: { error: "has-danger", message: "Campo obrigatório" }
        }));
        break;
      }
      if (Object.keys(filesAux).length === 0) {
        filled = false;
        filesError = "has-danger";
      } else {
        filled = true;
        filesError = "";
        break;
      }
    }

    if (valid && filled) {
      var vlrParceladb = values.vlrParcela.value.replace(/[^\d]+/g, "");
      var vlrPagodb = optional.vlrPago.value.replace(/[^\d]+/g, "");
      var saldodb = optional.saldo.value.replace(/[^\d]+/g, "");

      const formData = new FormData();
      for (const file of files) {
        formData.append("file", file);
      }
      if (optional.situacao.value === 1) {
        dispatch(
          faturaParcela({
            id,
            OpotunidadeId: values.OportunidadeId.value,
            parcela: values.parcela.value,
            vlrParcela: vlrParceladb,
            dtEmissao: values.dtEmissao.value,
            dtVencimento: values.dtVencimento.value,
            notaFiscal: values.notaFiscal.value,
            pedidoCliente: optional.pedidoCliente.value,
            situacao: 2,
            dtLiquidacao: optional.dtLiquidacao.value,
            vlrPago: vlrPagodb,
            saldo: saldodb,
            idColab: values.idColab.value,
            idCliente: values.idCliente.value,
            idRecDesp: values.idRecDesp.value,
            idEmpresa: values.idEmpresa.value
          })
        );
      } else {
        let sit = 2;
        if (dtVenc && dtVenc.dt !== values.dtVencimento.values) {
          sit = 5;
        }
        dispatch(
          parcelaUpdate({
            id,
            OpotunidadeId: values.OportunidadeId.value,
            parcela: values.parcela.value,
            vlrParcela: vlrParceladb,
            dtEmissao: values.dtEmissao.value,
            dtVencimento: values.dtVencimento.value,
            notaFiscal: values.notaFiscal.value,
            pedidoCliente: optional.pedidoCliente.value,
            situacao: sit,
            dtLiquidacao: optional.dtLiquidacao.value,
            vlrPago: vlrPagodb,
            saldo: saldodb
          })
        );
      }

      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1500);
      if (data.situacao > 1) {
        await api.post(
          `/emailResend/oport/cotacao/?id=${data.id}&tipo=parcela&situacao=fatura`
        );
      } else {
        await api.post(
          `/files/oport/cotacao/?id=${data.id}&oportId=${data1.id}&tipo=parcela&situacao=fatura&table=parcela&Cc=${string}`,
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
                    <h3 style={{ marginBottom: 0 }}>Nota Fiscal</h3>
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
                          <Label>Parcela</Label>
                          <FormGroup
                            className={`has-label ${values.parcela.error}`}
                          >
                            <Input
                              disabled
                              name="parcela"
                              type="text"
                              onChange={event =>
                                handleChange(event, "parcela", "number")
                              }
                              value={values.parcela.value}
                            />
                            {values.parcela.error === "has-danger" ? (
                              <Label className="error">
                                {values.parcela.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <Label>Valor da Parcela</Label>
                          <FormGroup
                            className={`has-label ${values.vlrParcela.error}`}
                          >
                            <Input
                              disabled
                              name="vlrParcela"
                              type="text"
                              onChange={event =>
                                handleChange(event, "vlrParcela", "currency")
                              }
                              value={values.vlrParcela.value}
                            />

                            {values.vlrParcela.error === "has-danger" ? (
                              <Label className="error">
                                {values.vlrParcela.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          {" "}
                          <Label>Data da Emissão</Label>
                          <FormGroup
                            className={`has-label ${values.dtEmissao.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              autoFocus={!disabledField}
                              name="dtEmissao"
                              type="date"
                              onChange={event =>
                                handleChange(event, "dtEmissao", "text")
                              }
                              value={values.dtEmissao.value}
                            />
                            {values.dtEmissao.error === "has-danger" ? (
                              <Label className="error">
                                {values.dtEmissao.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="4">
                          <Label>Data de Vencimento</Label>
                          <FormGroup
                            className={`has-label ${values.dtVencimento.error}`}
                          >
                            <Input
                              name="dtVencimento"
                              type="date"
                              onChange={event =>
                                handleChange(event, "dtVencimento", "text")
                              }
                              value={values.dtVencimento.value}
                            />
                            {values.dtVencimento.error === "has-danger" ? (
                              <Label className="error">
                                {values.dtVencimento.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Nota Fiscal</Label>
                          <FormGroup
                            className={`has-label ${values.notaFiscal.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="notaFiscal"
                              type="text"
                              onChange={event =>
                                handleChange(event, "notaFiscal", "text")
                              }
                              value={values.notaFiscal.value}
                            />
                            {values.notaFiscal.error === "has-danger" ? (
                              <Label className="error">
                                {values.notaFiscal.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <Label>Pedido Cliente</Label>
                          <FormGroup
                            className={`has-label ${optional.pedidoCliente.error}`}
                          >
                            <Input
                              disabled={disabledField}
                              name="pedidoCliente"
                              type="text"
                              onChange={event => {
                                handleChange(
                                  event,
                                  "pedidoCliente",
                                  "optional"
                                );
                              }}
                              value={optional.pedidoCliente.value}
                            />
                            {optional.pedidoCliente.error === "has-danger" ? (
                              <Label className="error">
                                {optional.pedidoCliente.message}
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Situação</Label>
                          <FormGroup style={{ marginBottom: 25 }} check>
                            <Input
                              disabled
                              name="situacao"
                              type="select"
                              onChange={event =>
                                handleChange(event, "situacao", "optional")
                              }
                              value={optional.situacao.value}
                            >
                              <option disabled value="">
                                {" "}
                                Selecione situação{" "}
                              </option>{" "}
                              <option value={1}>Pendente</option>
                              <option value={2}>Aberta</option>
                              <option value={3}>Parcial</option>
                              <option value={4}>Liquidada</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <FileUploadContainer>
                              <UploadFileBtn
                                type="button"
                                onClick={handleUploadBtnClick}
                              >
                                <i className="fas fa-file-upload" />
                                <span>
                                  Arraste e solte ou selecione um arquivo{" "}
                                </span>{" "}
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
                                {data.situacao <= 1
                                  ? Object.keys(filesAux).map(
                                      (fileName, index) => {
                                        const file = filesAux[fileName];
                                        const isImageFile =
                                          file.type.split("/")[0] === "image";
                                        return (
                                          <PreviewContainer key={fileName}>
                                            <div>
                                              {isImageFile && (
                                                <ImagePreview
                                                  src={URL.createObjectURL(
                                                    file
                                                  )}
                                                  alt={`file preview ${index}`}
                                                />
                                              )}
                                              <FileMetaData
                                                isImageFile={isImageFile}
                                              >
                                                <span>{file.name}</span>
                                                <aside>
                                                  <span>
                                                    {convertBytesToKB(
                                                      file.size
                                                    )}{" "}
                                                    kb
                                                  </span>{" "}
                                                  <RemoveFileIcon
                                                    className="fas fa-trash-alt"
                                                    onClick={() =>
                                                      removeFile(fileName)
                                                    }
                                                  />
                                                </aside>
                                              </FileMetaData>
                                            </div>
                                          </PreviewContainer>
                                        );
                                      }
                                    )
                                  : filePreview.map(file => {
                                      return (
                                        <PreviewContainer key={file.nome}>
                                          <div>
                                            <FileMetaData isImageFile={false}>
                                              <span>{file.nome}</span>
                                              <aside>
                                                <span>
                                                  {convertBytesToKB(file.size)}{" "}
                                                  kb
                                                </span>{" "}
                                                <GetApp
                                                  className="downloadIconPrev"
                                                  onClick={() =>
                                                    downloadFile(file.id)
                                                  }
                                                />
                                              </aside>
                                            </FileMetaData>
                                          </div>
                                        </PreviewContainer>
                                      );
                                    })}
                              </PreviewList>
                            </FilePreviewContainer>
                            {filesError === "has-danger" ? (
                              <Label className="error">
                                Selecione ao menos um arquivo
                              </Label>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label>Email Principal</Label>
                          <Input disabled value={values.email.value} />
                        </Col>
                        <Col md="8">
                          <Label style={{ display: "block" }}>
                            Cópia Email
                          </Label>
                          <TagsInput
                            onChange={handleTagsinput}
                            tagProps={{
                              className: "react-tagsinput-tag "
                            }}
                            value={tagsinput}
                          />
                        </Col>
                      </Row>
                      <Row />
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
                      <Button
                        style={{
                          paddingLeft: 32,
                          paddingRight: 33,
                          float: "left"
                        }}
                        color="secundary"
                        size="small"
                        className="form"
                        onClick={() => {
                          history.goBack();
                        }}
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
