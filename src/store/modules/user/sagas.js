import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history";
import api from "~/services/api";

import { signFailure } from "./actions";
import { firstColabSuccess } from "../Colab/actions";

export function* profileUpdate({ payload }) {
  try {
    const {
      id,
      nome,
      email,
      aniver,
      ColabId,
      CPF,
      senhaAntiga,
      senha,
      confirmSenha
    } = payload;
    yield call(api.put, `users/${id}`, {
      nome,
      email,
      aniver,
      ColabId,
      CPF,
      senhaAntiga,
      senha,
      confirmSenha
    });
    const user = yield call(api.get, `users/${id}`);
    const localstorage = {
      id: user.data.id,
      nome: user.data.nome,
      profile: user.data.profile,
      isFirstLogin: user.data.isFirstLogin,
      Empresa: user.data.Empresa,
      Colab: user.data.Colab
    };
    yield put(firstColabSuccess(localstorage));
    history.push("/dashboard");
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

export default all([takeLatest("@update/USER_REQUEST", profileUpdate)]);
