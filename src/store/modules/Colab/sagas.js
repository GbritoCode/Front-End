import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history.js";
import api from "~/services/api.js";

import { signFailure } from "./actions.js";

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
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export default all([
  takeLatest("@cadastro/CADASTRO_COLAB_REQUEST", colabCadastro),
  takeLatest("@cadastro/CADASTRO_COLAB_COMP_REQUEST", colabCompCadastro),
]);
