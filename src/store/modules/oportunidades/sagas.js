import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history";
import api from "~/services/api";

import { signFailure, UpdateSuccess } from "./actions";

export function* oportCadastro({ payload }) {
  try {
    const response = yield call(api.post, "oportunidade", payload);
    history.push("/tabelas/oportunidade/oport");
    toast.success(response.data.message);
  } catch (err) {
    toast.error(err.response.data.error);
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
      RecDespId,
      SegmentoId,
      RepresentanteId,
      contato,
      data,
      fase,
      cod,
      desc,
      narrativa
    } = payload;

    const Oport = {
      EmpresaId,
      ColabId,
      ClienteId,
      UndNegId,
      RecDespId,
      SegmentoId,
      RepresentanteId,
      contato,
      data,
      fase,
      cod,
      desc,
      narrativa
    };

    const response = yield call(api.put, `oportunidade/${id}`, Oport);
    history.push("/tabelas/oportunidade/oport");
    toast.success("Oportunidade atualizada");
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
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
    toast.error(err.response.data.error);
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

    const Oport = {
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
    };

    const response = yield call(api.put, `cotacao/${id}`, Oport);
    toast.success("cliente atualizado");
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
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
      tipoValor,
      tipoAtend,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr
    } = payload;
    yield call(api.post, "recurso", {
      OportunidadeId,
      ColabId,
      tipoValor,
      tipoAtend,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr
    });
    history.go(0);
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}
export function* updateRecurso({ payload }) {
  try {
    const {
      id,
      OportunidadeId,
      ColabId,
      tipoValor,
      tipoAtend,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr
    } = payload;

    const recurso = {
      OportunidadeId,
      ColabId,
      tipoValor,
      tipoAtend,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr
    };

    const response = yield call(api.put, `recurso/${id}`, recurso);
    history.push(`/tabelas/oportunidade/recurso/${OportunidadeId}`);
    toast.success("cliente atualizado");
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
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
      saldo
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
      saldo
    });
    history.go(0);
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}
export function* updateParcela({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.put, `parcela/${id}`, payload);
    // history.push(`/tabelas/oportunidade/parcela/${OportunidadeId}`);
    history.goBack();
    toast.success("Parcela atualizada com Sucesso");
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

//---------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* faturaParcela({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.put, `parcela_fatura/${id}`, payload);
    history.goBack();
    toast.success("Parcela atualizada com Sucesso");
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

//---------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* pagamentoParcela({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.put, `parcela_pgmto/${id}`, payload);
    history.goBack();
    toast.success("Parcela atualizada com Sucesso");
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
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
      RecursoId,
      desc
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
      RecursoId,
      desc
    });
    history.go(0);
  } catch (err) {
    toast.error(err.response.data.error);
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
      RecursoId,
      desc,
      apontDiff
    } = payload;

    const recurso = {
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
      RecursoId,
      desc,
      apontDiff
    };

    const response = yield call(api.put, `horas/${id}`, recurso);
    toast.success("cliente atualizado");
    history.push(`/tabelas/apontamentos/horas/${ColabId}`);
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

//---------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* despesaCadastro({ payload }) {
  try {
    yield call(api.post, "despesas", payload);
    history.go(0);
  } catch (err) {
    toast.error(err.response.data.error);
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
      desc
    } = payload;

    const recurso = {
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc
    };

    const response = yield call(api.put, `despesas/${id}`, recurso);
    toast.success("cliente atualizado");
    yield put(UpdateSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
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
  takeLatest("@update/PARCELA_FATURA", faturaParcela),
  takeLatest("@update/PARCELA_PGMTO", pagamentoParcela),
  takeLatest("@cadastro/HORA_REQUEST", horaCadastro),
  takeLatest("@update/HORA_REQUEST", updateHora),
  takeLatest("@cadastro/DESPESA_REQUEST", despesaCadastro),
  takeLatest("@update/DESPESA_REQUEST", updateDespesa)
]);
