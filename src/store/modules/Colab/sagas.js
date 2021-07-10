import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history";
import api from "~/services/api";

import {
  signFailure,
  ClienteUpdateSuccess,
  firstColabSuccess
} from "./actions";
import { store } from "~/store";

let result;
export function* colabCadastro({ payload }) {
  try {
    const {
      CPF,
      FornecId,
      EmpresaId,
      nome,
      dtAdmiss,
      cel,
      PerfilId,
      skype,
      email,
      espec,
      first,
      PerfilUser
    } = payload;

    if (!first) {
      result = yield call(api.post, "users", {
        nome,
        email,
        senha: "Aidera2020",
        profile: PerfilUser,
        CPF
      });
      yield call(api.post, "colab", {
        CPF,
        FornecId,
        EmpresaId,
        nome,
        dtAdmiss,
        cel,
        PerfilId,
        skype,
        email,
        espec,
        UserId: result.data.id
      });
    }
    if (first) {
      const { id } = store.getState().auth.user;
      yield call(api.post, "colab", {
        CPF,
        FornecId,
        EmpresaId,
        nome,
        dtAdmiss,
        cel,
        PerfilId,
        skype,
        email,
        espec,
        UserId: id
      });
      const user = yield call(api.get, `users/${id}`);
      yield put(firstColabSuccess(user.data));
    }

    if (first === true) {
      history.push("/dashboard");
      return;
    }
    history.push("/tabelas/colab");
  } catch (err) {
    yield call(api.delete, `users/${result.data.id}`);
    toast.error(err.response.data.error);
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

    yield call(api.put, `users/${UserId}`, {
      nome,
      email,
      CPF,
      ColabId: id
    });

    const response = yield call(api.put, `colab/${id}`, Colab);
    history.push("/tabelas/colab");
    toast.success("cliente atualizado");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
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
