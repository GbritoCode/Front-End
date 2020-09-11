import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history.js";
import api from "~/services/api.js";

import { requestFailure, ClienteUpdateSuccess } from "./actions.js";

export function* areaCadastro({ payload }) {
  try {
    const { EmpresaId, desc_area } = payload;
    yield call(api.post, "area", {
      EmpresaId,
      desc_area,
    });
    history.push("/tabelas/general/area");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateArea({ payload }) {
  try {
    const { id, EmpresaId, desc_area } = payload;

    const Colab = Object.assign({
      EmpresaId,
      desc_area,
    });

    const response = yield call(api.put, `area/${id}`, Colab);

    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* empresaCadastro({ payload }) {
  try {
    const { id_federal, nome, license, UserId } = payload;
    yield call(api.post, "empresa", {
      id_federal,
      nome,
      license,
      UserId,
    });
    history.push("/tabelas/general/empresa");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateEmpresa({ payload }) {
  try {
    const { id, id_federal, nome, license, UserId } = payload;

    const Colab = Object.assign({
      id_federal,
      nome,
      license,
      UserId,
    });

    const response = yield call(api.put, `empresa/${id}`, Colab);

    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* fornecCadastro({ payload }) {
  try {
    const {
      CNPJ,
      EmpresaId,
      nome,
      cond_pgmto,
      nome_conta,
      fone,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      banco,
      agencia,
      conta,
    } = payload;
    yield call(api.post, "fornec", {
      CNPJ,
      EmpresaId,
      nome,
      cond_pgmto,
      nome_conta,
      fone,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      banco,
      agencia,
      conta,
    });
    history.push("/tabelas/general/fornec");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateFornec({ payload }) {
  try {
    const {
      id,
      CNPJ,
      EmpresaId,
      nome,
      cond_pgmto,
      nome_conta,
      fone,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      banco,
      agencia,
      conta,
    } = payload;

    const Colab = Object.assign({
      CNPJ,
      EmpresaId,
      nome,
      cond_pgmto,
      nome_conta,
      fone,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      banco,
      agencia,
      conta,
    });

    const response = yield call(api.put, `fornec/${id}`, Colab);

    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* itmControleCadastro({ payload }) {
  try {
    const {
      EmpresaId,
      desc_item,
      tipo_item,
      conta_contabil,
      cent_custo,
    } = payload;
    yield call(api.post, "itm_controle", {
      EmpresaId,
      desc_item,
      tipo_item,
      conta_contabil,
      cent_custo,
    });
    history.push("/tabelas/general/itm_controle");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateItmControle({ payload }) {
  try {
    const {
      id,
      EmpresaId,
      desc_item,
      tipo_item,
      conta_contabil,
      cent_custo,
    } = payload;

    const Colab = Object.assign({
      EmpresaId,
      desc_item,
      tipo_item,
      conta_contabil,
      cent_custo,
    });

    const response = yield call(api.put, `itm_controle/${id}`, Colab);

    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* parametrosCadastro({ payload }) {
  try {
    const {
      EmpresaId,
      impostos,
      vlr_min_hr,
      vlr_bs_hr,
      vlr_bs_desp,
      adianta_pgmto,
      perc_adianta_pgmto,
    } = payload;
    yield call(api.post, "parametros", {
      EmpresaId,
      impostos,
      vlr_min_hr,
      vlr_bs_hr,
      vlr_bs_desp,
      adianta_pgmto,
      perc_adianta_pgmto,
    });
    history.push("/tabelas/general/parametros");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateParametros({ payload }) {
  try {
    const {
      id,
      EmpresaId,
      impostos,
      vlr_min_hr,
      vlr_bs_hr,
      vlr_bs_desp,
      adianta_pgmto,
      perc_adianta_pgmto,
    } = payload;

    const Colab = Object.assign({
      EmpresaId,
      impostos,
      vlr_min_hr,
      vlr_bs_hr,
      vlr_bs_desp,
      adianta_pgmto,
      perc_adianta_pgmto,
    });

    const response = yield call(api.put, `parametros/${id}`, Colab);

    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* prodtCadastro({ payload }) {
  try {
    const { EmpresaId, desc_prodt } = payload;
    yield call(api.post, "prodt", {
      EmpresaId,
      desc_prodt,
    });
    history.push("/tabelas/general/prodt");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateProdt({ payload }) {
  try {
    const { id, EmpresaId, desc_prodt } = payload;

    const Colab = Object.assign({
      EmpresaId,
      desc_prodt,
    });

    const response = yield call(api.put, `prodt/${id}`, Colab);

    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* recDespCadastro({ payload }) {
  try {
    const { EmpresaId, nome, license } = payload;
    yield call(api.post, "rec_desp", {
      EmpresaId,
      nome,
      license,
    });
    history.push("/tabelas/general/rec_desp");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateRecDesp({ payload }) {
  try {
    const { id, EmpresaId, nome, license } = payload;

    const Colab = Object.assign({
      EmpresaId,
      nome,
      license,
    });

    const response = yield call(api.put, `rec_desp/${id}`, Colab);

    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* representanteCadastro({ payload }) {
  try {
    const { EmpresaId, nome, percnt_comiss, vlr_fix_mens } = payload;
    yield call(api.post, "representante", {
      EmpresaId,
      nome,
      percnt_comiss,
      vlr_fix_mens,
    });
    history.push("/tabelas/general/representante");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateRepresentante({ payload }) {
  try {
    const { id, EmpresaId, nome, percnt_comiss, vlr_fix_mens } = payload;

    const Colab = Object.assign({
      EmpresaId,
      nome,
      percnt_comiss,
      vlr_fix_mens,
    });

    const response = yield call(api.put, `representante/${id}`, Colab);

    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export function* segmentoCadastro({ payload }) {
  try {
    const { EmpresaId, Und_negId, ProdutoId, AreaId, desc_segmt } = payload;
    yield call(api.post, "segmento", {
      EmpresaId,
      Und_negId,
      ProdutoId,
      AreaId,
      desc_segmt,
    });
    history.push("/tabelas/general/segmento");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateSegmento({ payload }) {
  try {
    const { id, EmpresaId, Und_negId, ProdutoId, AreaId, desc_segmt } = payload;

    const Colab = Object.assign({
      EmpresaId,
      Und_negId,
      ProdutoId,
      AreaId,
      desc_segmt,
    });

    const response = yield call(api.put, `segmento/${id}`, Colab);

    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export function* undNegCadastro({ payload }) {
  try {
    const { EmpresaId, desc_und_neg } = payload;
    yield call(api.post, "und_neg", {
      EmpresaId,
      desc_und_neg,
    });
    history.push("/tabelas/general/und_neg");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateUndNeg({ payload }) {
  try {
    const { id, EmpresaId, desc_und_neg } = payload;

    const Colab = Object.assign({
      EmpresaId,
      desc_und_neg,
    });

    const response = yield call(api.put, `und_neg/${id}`, Colab);

    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export default all([
  takeLatest("@cadastro/AREA_REQUEST", areaCadastro),
  takeLatest("@update/AREA_REQUEST", updateArea),
  takeLatest("@cadastro/EMPRESA_REQUEST", empresaCadastro),
  takeLatest("@update/EMPRESA_REQUEST", updateEmpresa),
  takeLatest("@cadastro/FORNEC_REQUEST", fornecCadastro),
  takeLatest("@update/FORNEC_REQUEST", updateFornec),
  takeLatest("@cadastro/ITM_CONTROLE_REQUEST", itmControleCadastro),
  takeLatest("@update/ITM_CONTROLE_REQUEST", updateItmControle),
  takeLatest("@cadastro/PARAMETROS_REQUEST", parametrosCadastro),
  takeLatest("@update/PARAMETROS_REQUEST", updateParametros),
  takeLatest("@cadastro/PRODT_REQUEST", prodtCadastro),
  takeLatest("@update/PRODUTO_REQUEST", updateProdt),
  takeLatest("@cadastro/REC_DESP_REQUEST", recDespCadastro),
  takeLatest("@update/REC_DESP_REQUEST", updateRecDesp),
  takeLatest("@cadastro/REPRESENTANTE_REQUEST", representanteCadastro),
  takeLatest("@update/REPRESENTANTE_REQUEST", updateRepresentante),
  takeLatest("@cadastro/UND_NEG_REQUEST", undNegCadastro),
  takeLatest("@update/UND_NEG_REQUEST", updateUndNeg),
  takeLatest("@cadastro/SEGMENTO_REQUEST", segmentoCadastro),
  takeLatest("@update/SEGMENTO_REQUEST", updateSegmento),
]);
