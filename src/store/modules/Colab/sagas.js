import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history";
import api from "~/services/api";

import { signFailure, ClienteUpdateSuccess } from "./actions";

export function* colabCadastro({ payload }) {
  try {
    const {
      CPF,
      FornecId,
      EmpresaId,
      UserId,
      nome,
      dtAdmiss,
      cel,
      PerfilId,
      skype,
      email,
      espec,
      first
    } = payload;
    yield call(api.post, "colab", {
      CPF,
      FornecId,
      EmpresaId,
      UserId,
      nome,
      dtAdmiss,
      cel,
      PerfilId,
      skype,
      email,
      espec
    });
    if (first === true) {
      history.push("/dashboard");
    }
    history.push("/tabelas/colab");
  } catch (err) {
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
      UserId,
      PerfilId,
      nome,
      dtAdmiss,
      cel,
      skype,
      email,
      espec
    } = payload;

    const Colab = {
      CPF,
      FornecId,
      UserId,
      PerfilId,
      nome,
      dtAdmiss,
      cel,
      skype,
      email,
      espec
    };

    const response = yield call(api.put, `colab/${id}`, Colab);
    history.push("/tabelas/colab");
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
      tipoValor,
      valor,
      dataInic,
      dataFim,
      tipoAtend
    } = payload;
    yield call(api.post, "colab/comp", {
      ColabId,
      nivel,
      tipoValor,
      valor,
      dataInic,
      dataFim,
      tipoAtend
    });
    history.push(`/tables/colab/comp/${ColabId}`);
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
      tipoValor,
      valor,
      dataInic,
      dataFim,
      tipoAtend
    } = payload;

    const Colab = {
      ColabId,
      nivel,
      tipoValor,
      valor,
      dataInic,
      dataFim,
      tipoAtend
    };

    const response = yield call(api.put, `colab/comp/${id}`, Colab);

    toast.success("cliente atualizado");
    history.push(`/colab/update/${ColabId}`);
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
  takeLatest("@update/COLAB_COMP_REQUEST", updateColabComp)
]);
