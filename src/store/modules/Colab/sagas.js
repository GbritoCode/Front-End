import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history.js";
import api from "~/services/api.js";

import { signFailure, ClienteUpdateSuccess } from "./actions.js";

export function* colabCadastro({ payload }) {
  try {
    const {
      CPF,
      FornecId,
      log_usr,
      EmpresaId,
      nome,
      dt_admiss,
      cel,
      skype,
      email,
      espec,
    } = payload;
    yield call(api.post, "colab", {
      CPF,
      FornecId,
      log_usr,
      EmpresaId,
      nome,
      dt_admiss,
      cel,
      skype,
      email,
      espec,
    });
    history.push("/tabelas/colab");
  } catch (err) {
    console.log(err);
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}

export function* updateColab({ payload }) {
  try {
    const {
      id,
      CPF,
      FornecId,
      log_usr,
      EmpresaId,
      nome,
      dt_admiss,
      cel,
      skype,
      email,
      espec,
    } = payload;

    const Colab = Object.assign({
      CPF,
      FornecId,
      log_usr,
      EmpresaId,
      nome,
      dt_admiss,
      cel,
      skype,
      email,
      espec,
    });

    const response = yield call(api.put, `colab/${id}`, Colab);

    toast.success("cliente atualizado");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export function* colabCompCadastro({ payload }) {
  try {
    const {
      ColabId,
      nivel,
      tipo_valor,
      valor,
      data_inic,
      data_fim,
      tipo_atend,
    } = payload;
    yield call(api.post, "colab/comp", {
      ColabId,
      nivel,
      tipo_valor,
      valor,
      data_inic,
      data_fim,
      tipo_atend,
    });
    history.push("/tabelas/colab/comp");
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}
export function* updateColabComp({ payload }) {
  try {
    const {
      id,
      ColabId,
      nivel,
      tipo_valor,
      valor,
      data_inic,
      data_fim,
      tipo_atend,
    } = payload;

    const Colab = Object.assign({
      ColabId,
      nivel,
      tipo_valor,
      valor,
      data_inic,
      data_fim,
      tipo_atend,
    });

    const response = yield call(api.put, `colab/comp/${id}`, Colab);

    toast.success("cliente atualizado");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Falha no cadastro, este email já existe");
    yield put(signFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export default all([
  takeLatest("@cadastro/CADASTRO_COLAB_REQUEST", colabCadastro),
  takeLatest("@update/COLAB_REQUEST", updateColab),
  takeLatest("@cadastro/CADASTRO_COLAB_COMP_REQUEST", colabCompCadastro),
  takeLatest("@update/COLAB_COMP_REQUEST", updateColabComp),
]);
