import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history.js";
import api from "~/services/api.js";

import { requestFailure } from "./actions.js";

export function* areaCadastro({ payload }) {
  try {
    const { EmpresaId, desc_area } = payload;
    yield call(api.post, "area", {
      EmpresaId,
      desc_area,
    });
    history.push("/dashboard");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
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
    history.push("/dashboard");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
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
    history.push("/dashboard");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
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
    history.push("/dashboard");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
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
    history.push("/dashboard");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
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
    history.push("/dashboard");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
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
    history.push("/dashboard");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
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
    history.push("/dashboard");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
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
    history.push("/dashboard");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
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
    history.push("/dashboard");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export default all([
  takeLatest("@cadastro/AREA_REQUEST", areaCadastro),
  takeLatest("@cadastro/EMPRESA_REQUEST", empresaCadastro),
  takeLatest("@cadastro/FORNEC_REQUEST", fornecCadastro),
  takeLatest("@cadastro/ITM_CONTROLE_REQUEST", itmControleCadastro),
  takeLatest("@cadastro/PARAMETROS_REQUEST", parametrosCadastro),
  takeLatest("@cadastro/PRODT_REQUEST", prodtCadastro),
  takeLatest("@cadastro/REC_DESP_REQUEST", recDespCadastro),
  takeLatest("@cadastro/REPRESENTANTE_REQUEST", representanteCadastro),
  takeLatest("@cadastro/UND_NEG_REQUEST", undNegCadastro),
  takeLatest("@cadastro/SEGMENTO_REQUEST", segmentoCadastro),
]);
