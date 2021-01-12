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
      prospect
    } = payload;
    yield call(api.post, "cliente", {
      CNPJ,
      nomeAbv,
      rzSoc,
      fantasia,
      RepresentanteId,
      TipoComisseId,
      EmpresaId,
      prospect
    });
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
    if (prospect === true) {
      history.push("/tabelas/cliente/prospect");
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
      tipoConta
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
    history.push(`/cliente_update/${ClienteId}/true`);
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
      tipoConta
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

    history.push(`/tabelas/cliente/cont/${ClienteId}`);
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
    history.push(`/cliente_update/${ClienteId}/true`);
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

    history.push(`/tabelas/cliente/comp/${ClienteId}`);
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
    history.push(`/cliente_update/${ClienteId}/true`);
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

export default all([
  takeLatest("@cadastro/CADASTRO_REQUEST", clienteCadastro),
  takeLatest("@cadastro/CADASTRO_CONT_REQUEST", cliContCadastro),
  takeLatest("@cadastro/CADASTRO_COMP_REQUEST", cliCompCadastro),
  takeLatest("@cadastro/CADASTRO_REC_DESP_REQUEST", cliRecDespCadastro),
  takeLatest("@update/CLIENTE_REQUEST", updateCliente),
  takeLatest("@update/CONT_REQUEST", updateCliCont),
  takeLatest("@update/COMP_REQUEST", updateCliComp),
  takeLatest("@update/CLI_REC_DESP_REQUEST", updateCliRecDesp)
]);
