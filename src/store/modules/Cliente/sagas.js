import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history.js";
import api from "~/services/api.js";

import { signFailure, ClienteUpdateSuccess } from "./actions.js";

export function* clienteCadastro({ payload }) {
  try {
    const { CNPJ, nome_abv, representante, tipo_comiss, EmpresaId } = payload;
    yield call(api.post, "cliente", {
      CNPJ,
      nome_abv,
      representante,
      tipo_comiss,
      EmpresaId,
    });
    history.push("/table/cliente");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}

export function* updateCliente({ payload }) {
  try {
    const { id, nome_abv, representante, tipo_comiss, prospect } = payload;

    const Cliente = Object.assign({
      nome_abv,
      representante,
      tipo_comiss,
      prospect,
    });

    const response = yield call(api.put, `cliente/${id}`, Cliente);

    toast.success("cliente atualizado");
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
      tipo_conta,
    } = payload;
    yield call(api.post, "cliente/cont", {
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipo_conta,
    });
    history.push("/dashboard");
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
      tipo_conta,
    } = payload;

    const Cliente = Object.assign({
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipo_conta,
    });

    const response = yield call(api.put, `cliente/cont/${id}`, Cliente);

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
      rz_social,
      cond_pgmto,
      nome_abv,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      insc_mun,
      insc_uf,
    } = payload;
    yield call(api.post, "cliente/complem", {
      ClienteId,
      rz_social,
      cond_pgmto,
      nome_abv,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      insc_mun,
      insc_uf,
    });
    history.push("/dashboard");
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
      rz_social,
      cond_pgmto,
      nome_abv,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      insc_mun,
      insc_uf,
    } = payload;

    const Cliente = Object.assign({
      ClienteId,
      rz_social,
      cond_pgmto,
      nome_abv,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      insc_mun,
      insc_uf,
    });

    const response = yield call(api.put, `cliente/comp/${id}`, Cliente);

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
    const { ClienteId, tipo_rec_desp, nome_rec_desp } = payload;
    yield call(api.post, "cliente/rec_desp", {
      ClienteId,
      tipo_rec_desp,
      nome_rec_desp,
    });
    history.push("/dashboard");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
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
  takeLatest("@update/COMP_REQUEST", updateCliCont),
]);
