import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history.js";
import api from "~/services/api.js";

import { signFailure, UpdateSuccess } from "./actions.js";

export function* oportCadastro({ payload }) {
  try {
    const {
      EmpresaId,
      colabId,
      clienteId,
      UndNegId,
      itmControleId,
      segmentoId,
      representanteId,
      contato,
      data,
      fase,
      cod,
      desc,
      narrativa
    } = payload;
    yield call(api.post, "oportunidade", {
      EmpresaId,
      colabId,
      clienteId,
      UndNegId,
      itmControleId,
      segmentoId,
      representanteId,
      contato,
      data,
      fase,
      cod,
      desc,
      narrativa
    });
    history.push("/tabelas/oportunidade/oport");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}

export function* updateOport({ payload }) {
  try {
    const {
      id,
      EmpresaId,
      colabId,
      clienteId,
      UndNegId,
      itmControleId,
      segmentoId,
      representanteId,
      contato,
      data,
      fase,
      cod,
      desc,
      narrativa
    } = payload;

    const Oport = Object.assign({
      EmpresaId,
      colabId,
      clienteId,
      UndNegId,
      itmControleId,
      segmentoId,
      representanteId,
      contato,
      data,
      fase,
      cod,
      desc,
      narrativa
    });

    const response = yield call(api.put, `oportunidade/${id}`, Oport);
    toast.success("cliente atualizado");
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* cotacaoCadastro({ payload }) {
  try {
    const {
      EmpresaId,
      oportunidadeId,
      probVend,
      tipoCobranca,
      hrsPrevst,
      vlrProp,
      vlrDesc,
      vlrLiq,
      recLiq,
      prevLucro,
      numParcelas,
      motivo,
      desc
    } = payload;
    yield call(api.post, "cotacao", {
      EmpresaId,
      oportunidadeId,
      probVend,
      tipoCobranca,
      hrsPrevst,
      vlrProp,
      vlrDesc,
      vlrLiq,
      recLiq,
      prevLucro,
      numParcelas,
      motivo,
      desc
    });
    history.push(`/tabelas/oportunidade/oport`);
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}

export function* updateCotacao({ payload }) {
  try {
    const {
      id,
      EmpresaId,
      oportunidadeId,
      probVend,
      tipoCobranca,
      hrsPrevst,
      vlrProp,
      vlrDesc,
      vlrLiq,
      recLiq,
      prevLucro,
      numParcelas,
      motivo,
      desc
    } = payload;

    const Oport = Object.assign({
      EmpresaId,
      oportunidadeId,
      probVend,
      tipoCobranca,
      hrsPrevst,
      vlrProp,
      vlrDesc,
      vlrLiq,
      recLiq,
      prevLucro,
      numParcelas,
      motivo,
      desc
    });

    const response = yield call(api.put, `cotacao/${id}`, Oport);
    toast.success("cliente atualizado");
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------


export function* recursoCadastro({ payload }) {
  try {
    const {
      oportunidadeId,
      colabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
    } = payload;
    yield call(api.post, "recurso", {
      oportunidadeId,
      colabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
    });
    history.push(`/update/oportunidade/oport/${oportunidadeId}`);
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}
export function* updateRecurso({ payload }) {
  try {
    const {
      id,
      oportunidadeId,
      colabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
    } = payload;

    const recurso = Object.assign({
      oportunidadeId,
      colabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
    });

    const response = yield call(api.put, `recurso/${id}`, recurso);
    history.push(`/update/oportunidade/oport/${oportunidadeId}`);
    toast.success("cliente atualizado");
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}
//---------

export default all([
  takeLatest("@cadastro/OPORT_REQUEST", oportCadastro),
  takeLatest("@update/OPORT_REQUEST", updateOport),
  takeLatest("@cadastro/COTACAO_REQUEST", cotacaoCadastro),
  takeLatest("@update/COTACAO_REQUEST", updateCotacao),
  takeLatest("@cadastro/RECURSO_REQUEST", recursoCadastro),
  takeLatest("@update/RECURSO_REQUEST", updateRecurso),
]);
