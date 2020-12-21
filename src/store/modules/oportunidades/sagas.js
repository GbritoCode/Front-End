import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history.js";
import api from "~/services/api.js";

import { signFailure, UpdateSuccess } from "./actions.js";

export function* oportCadastro({ payload }) {
  try {
    const {
      EmpresaId,
      ColabId,
      ClienteId,
      UndNegId,
      ItmControleId,
      SegmentoId,
      RepresentanteId,
      contato,
      data,
      fase,
      cod,
      desc,
      narrativa
    } = payload;
    yield call(api.post, "oportunidade", {
      EmpresaId,
      ColabId,
      ClienteId,
      UndNegId,
      ItmControleId,
      SegmentoId,
      RepresentanteId,
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
      ColabId,
      ClienteId,
      UndNegId,
      ItmControleId,
      SegmentoId,
      RepresentanteId,
      contato,
      data,
      fase,
      cod,
      desc,
      narrativa
    } = payload;

    const Oport = Object.assign({
      EmpresaId,
      ColabId,
      ClienteId,
      UndNegId,
      ItmControleId,
      SegmentoId,
      RepresentanteId,
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
      OportunidadeId,
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
      OportunidadeId,
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
      OportunidadeId,
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
      OportunidadeId,
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
      OportunidadeId,
      ColabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
    } = payload;
    yield call(api.post, "recurso", {
      OportunidadeId,
      ColabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
    });
    history.push(`/tabelas/oportunidade/recurso/${OportunidadeId}`);
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}
export function* updateRecurso({ payload }) {
  try {
    const {
      id,
      OportunidadeId,
      ColabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
    } = payload;

    const recurso = Object.assign({
      OportunidadeId,
      ColabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
    });

    const response = yield call(api.put, `recurso/${id}`, recurso);
    history.push(`/update/oportunidade/oport/${OportunidadeId}`);
    toast.success("cliente atualizado");
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}
//---------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------


export function* parcelaCadastro({ payload }) {
  try {
    const {
      OportunidadeId,
      parcela,
      vlrParcela,
      dtEmissao,
      dtVencimento,
      notaFiscal,
      pedidoCliente,
      situacao,
      dtLiquidacao,
      vlrPago,
      saldo,
    } = payload;
    yield call(api.post, "parcela", {
      OportunidadeId,
      parcela,
      vlrParcela,
      dtEmissao,
      dtVencimento,
      notaFiscal,
      pedidoCliente,
      situacao,
      dtLiquidacao,
      vlrPago,
      saldo,
    });
    history.push(`/tabelas/oportunidade/parcela/${OportunidadeId}`);
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}
export function* updateParcela({ payload }) {
  try {
    const {
      id,
      OportunidadeId,
      parcela,
      vlrParcela,
      dtEmissao,
      dtVencimento,
      notaFiscal,
      pedidoCliente,
      situacao,
      dtLiquidacao,
      vlrPago,
      saldo,
    } = payload;

    const recurso = Object.assign({
      OportunidadeId,
      parcela,
      vlrParcela,
      dtEmissao,
      dtVencimento,
      notaFiscal,
      pedidoCliente,
      situacao,
      dtLiquidacao,
      vlrPago,
      saldo,
    });

    const response = yield call(api.put, `parcela/${id}`, recurso);
    history.push(`/tabelas/oportunidade/parcela/${OportunidadeId}`);
    toast.success("cliente atualizado");
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}


//---------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------


export function* horaCadastro({ payload }) {
  try {
    const {
      OportunidadeId,
      ColabId,
      dataAtivd,
      horaInic,
      horaIntrv,
      horaFim,
      dataLancamento,
      totalApont,
      solicitante,
      AreaId,
      desc,
    } = payload;
    yield call(api.post, "horas", {
      OportunidadeId,
      ColabId,
      dataAtivd,
      horaInic,
      horaIntrv,
      horaFim,
      dataLancamento,
      totalApont,
      solicitante,
      AreaId,
      desc,
    });
    history.go(0);
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}
export function* updateHora({ payload }) {
  try {
    const {
      id,
      OportunidadeId,
      ColabId,
      dataAtivd,
      horaInic,
      horaIntrv,
      horaFim,
      dataLancamento,
      totalApont,
      solicitante,
      AreaId,
      desc,
      apontDiff
    } = payload;

    const recurso = Object.assign({
      OportunidadeId,
      ColabId,
      dataAtivd,
      horaInic,
      horaIntrv,
      horaFim,
      dataLancamento,
      totalApont,
      solicitante,
      AreaId,
      desc,
      apontDiff
    });

    const response = yield call(api.put, `horas/${id}`, recurso);
    toast.success("cliente atualizado");
    history.go(0)
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}


//---------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------


export function* despesaCadastro({ payload }) {
  try {
    const {
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc,
    } = payload;
    yield call(api.post, "despesas", {
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc,
    });
    history.go(0);
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}
export function* updateDespesa({ payload }) {
  try {
    const {
      id,
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc,
    } = payload;

    const recurso = Object.assign({
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc,
    });

    const response = yield call(api.put, `despesas/${id}`, recurso);
    toast.success("cliente atualizado");
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}

export default all([
  takeLatest("@cadastro/OPORT_REQUEST", oportCadastro),
  takeLatest("@update/OPORT_REQUEST", updateOport),
  takeLatest("@cadastro/COTACAO_REQUEST", cotacaoCadastro),
  takeLatest("@update/COTACAO_REQUEST", updateCotacao),
  takeLatest("@cadastro/RECURSO_REQUEST", recursoCadastro),
  takeLatest("@update/RECURSO_REQUEST", updateRecurso),
  takeLatest("@cadastro/PARCELA_REQUEST", parcelaCadastro),
  takeLatest("@update/PARCELA_REQUEST", updateParcela),
  takeLatest("@cadastro/HORA_REQUEST", horaCadastro),
  takeLatest("@update/HORA_REQUEST", updateHora),
  takeLatest("@cadastro/DESPESA_REQUEST", despesaCadastro),
  takeLatest("@update/DESPESA_REQUEST", updateDespesa),
]);
