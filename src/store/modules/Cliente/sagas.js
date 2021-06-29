import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history";
import api from "~/services/api";

import { signFailure, ClienteUpdateSuccess } from "./actions";

export function* clienteCadastro({ payload }) {
  try {
    const {
      CNPJ,
      nomeAbv,
      rzSoc,
      fantasia,
      RepresentanteId,
      TipoComisseId,
      EmpresaId,
      prospect,
      CampanhaIds
    } = payload;
    yield call(api.post, "cliente", {
      CNPJ,
      nomeAbv,
      rzSoc,
      fantasia,
      RepresentanteId,
      TipoComisseId,
      EmpresaId,
      prospect,
      CampanhaIds
    });
    if (prospect === "true") {
      history.push("/tabelas/cliente/prospect");
      return;
    }
    history.push("/tabelas/cliente/cliente");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}

export function* updateCliente({ payload }) {
  try {
    const {
      id,
      nomeAbv,
      rzSoc,
      fantasia,
      RepresentanteId,
      TipoComisseId,
      prospect
    } = payload;

    const Cliente = {
      nomeAbv,
      rzSoc,
      fantasia,
      RepresentanteId,
      TipoComisseId,
      prospect
    };

    const response = yield call(api.put, `cliente/${id}`, Cliente);
    toast.success("cliente atualizado");
    if (prospect === "true") {
      history.push("/tabelas/cliente/prospect");
      return;
    }
    history.push("/tabelas/cliente/cliente");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}

//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export function* cliContCadastro({ payload }) {
  try {
    const {
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipoConta,
      prospect
    } = payload;
    yield call(api.post, "cliente/cont", {
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipoConta
    });
    history.push(`/tabelas/cliente/cont/${ClienteId}/?prospect=${prospect}`);
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}

export function* updateCliCont({ payload }) {
  try {
    const {
      id,
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipoConta,
      prospect
    } = payload;

    const Cliente = {
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipoConta
    };

    const response = yield call(api.put, `cliente/cont/${id}`, Cliente);

    history.push(`/tabelas/cliente/cont/${ClienteId}/?prospect=${prospect}`);
    toast.success("cliente atualizado");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}

//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export function* cliCompCadastro({ payload }) {
  try {
    const {
      ClienteId,
      CondPgmtoId,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      inscMun,
      inscEst
    } = payload;
    yield call(api.post, "cliente/complem", {
      ClienteId,
      CondPgmtoId,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      inscMun,
      inscEst
    });
    history.push(`/cliente_update/${ClienteId}/false`);
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}

export function* updateCliComp({ payload }) {
  try {
    const {
      id,
      ClienteId,
      CondPgmtoId,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      inscMun,
      inscEst
    } = payload;

    const Cliente = {
      ClienteId,
      CondPgmtoId,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      inscMun,
      inscEst
    };

    const response = yield call(api.put, `cliente/complem/${id}`, Cliente);

    history.push(`/cliente_update/${ClienteId}/false`);
    toast.success("cliente atualizado");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}

//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export function* cliRecDespCadastro({ payload }) {
  try {
    const {
      ClienteId,
      RecDespId,
      tipoCobranca,
      valorRec,
      dataInic,
      dataFim
    } = payload;
    yield call(api.post, "cliente/rec_desp", {
      ClienteId,
      RecDespId,
      tipoCobranca,
      valorRec,
      dataInic,
      dataFim
    });
    history.push(`/tabelas/cliente/rec_desp/${ClienteId}`);
  } catch (err) {
    toast.error("Value already exists in period");
    yield put(signFailure());
  }
}

export function* updateCliRecDesp({ payload }) {
  try {
    const {
      id,
      ClienteId,
      RecDespId,
      tipoCobranca,
      valorRec,
      dataInic,
      dataFim
    } = payload;

    const Cliente = {
      ClienteId,
      RecDespId,
      tipoCobranca,
      valorRec,
      dataInic,
      dataFim
    };

    const response = yield call(api.put, `cliente/rec_desp/${id}`, Cliente);

    history.push(`/tabelas/cliente/rec_desp/${ClienteId}`);
    toast.success("cliente atualizado");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Falha!");
    yield put(signFailure());
  }
}

//---------------------------------------------
//---------------------------------------------

export function* campanhaCadastro({ payload }) {
  try {
    const {
      EmpresaId,
      cod,
      desc,
      ClienteIds,
      dataInic,
      dataFim,
      ColabId,
      objetivo
    } = payload;
    yield call(api.post, "campanha", {
      EmpresaId,
      cod,
      desc,
      ClienteIds,
      dataInic,
      dataFim,
      ColabId,
      objetivo
    });
    history.push(`/tabelas/cliente/campanha`);
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

export function* updateCampanha({ payload }) {
  try {
    const { id, cod, desc, ClienteIds, dataInic, dataFim, ColabId } = payload;

    const Cliente = {
      cod,
      desc,
      ClienteIds,
      dataInic,
      dataFim,
      ColabId
    };

    const response = yield call(api.put, `campanha/${id}`, Cliente);

    history.push(`/tabelas/cliente/campanha`);
    toast.success("Campanha Atualizada");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

//---------------------------------------------
//---------------------------------------------

export function* camposDinamicosCadastro({ payload }) {
  try {
    const { EmpresaId, nome, valor } = payload;
    yield call(api.post, "camposDinamicos", {
      EmpresaId,
      nome,
      valor
    });
    history.push(`/tabelas/cliente/camposDinamicos/`);
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

export function* updateCamposDinamicos({ payload }) {
  try {
    const { id, nome, valor } = payload;

    const Cliente = {
      nome,
      valor
    };

    const response = yield call(api.put, `camposDinamicos/${id}`, Cliente);

    history.push(`/tabelas/cliente/camposDinamicos`);
    toast.success("Campo Dinâmico Atualizado");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

//---------------------------------------------
//---------------------------------------------

export function* followUpsCadastro({ payload }) {
  try {
    const {
      EmpresaId,
      ColabId,
      ClienteId,
      CliContId,
      dataContato,
      dataProxContato,
      detalhes,
      reacao,
      CampanhasId
    } = payload;
    yield call(api.post, "followUp", {
      EmpresaId,
      ColabId,
      ClienteId,
      CliContId,
      dataContato,
      dataProxContato,
      detalhes,
      reacao,
      CampanhasId
    });
    history.push(`/tabelas/cliente/followUps/${ClienteId}/${CampanhasId}`);
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

export function* updateFollowUps({ payload }) {
  try {
    const {
      id,
      ColabId,
      ClienteId,
      CliContId,
      dataContato,
      dataProxContato,
      detalhes,
      reacao
    } = payload;

    const Cliente = {
      ColabId,
      ClienteId,
      CliContId,
      dataContato,
      dataProxContato,
      detalhes,
      reacao
    };

    const response = yield call(api.put, `followUp/${id}`, Cliente);

    history.push(`/tabelas/cliente/followUps/${ClienteId}`);
    toast.success("Follow Up Atualizado");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

export default all([
  takeLatest("@cadastro/CADASTRO_REQUEST", clienteCadastro),
  takeLatest("@cadastro/CADASTRO_CONT_REQUEST", cliContCadastro),
  takeLatest("@cadastro/CADASTRO_COMP_REQUEST", cliCompCadastro),
  takeLatest("@cadastro/CADASTRO_REC_DESP_REQUEST", cliRecDespCadastro),
  takeLatest("@cadastro/CAMPANHA_REQUEST", campanhaCadastro),
  takeLatest("@cadastro/CAMPOS_DINAMICOS_REQUEST", camposDinamicosCadastro),
  takeLatest("@cadastro/FOLLOW_UP_REQUEST", followUpsCadastro),
  takeLatest("@update/CLIENTE_REQUEST", updateCliente),
  takeLatest("@update/CONT_REQUEST", updateCliCont),
  takeLatest("@update/COMP_REQUEST", updateCliComp),
  takeLatest("@update/CLI_REC_DESP_REQUEST", updateCliRecDesp),
  takeLatest("@update/CAMPANHA_REQUEST", updateCampanha),
  takeLatest("@update/CAMPOS_DINAMICOS_REQUEST", updateCamposDinamicos),
  takeLatest("@update/FOLLOW_UP_REQUEST", updateFollowUps)
]);
