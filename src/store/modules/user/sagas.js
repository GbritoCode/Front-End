import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history";
import api from "~/services/api";

import { signFailure } from "./actions";

export function* profileUpdate({ payload }) {
  try {
    const { id, nome, email, senhaAntiga, senha, confirmSenha } = payload;
    yield call(api.put, `users/${id}`, {
      nome,
      email,
      senhaAntiga,
      senha,
      confirmSenha
    });
    history.push(0);
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

export default all([takeLatest("@update/USER_REQUEST", profileUpdate)]);
