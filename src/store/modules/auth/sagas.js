import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import history from "~/services/history";
import api from "~/services/api";

import { signInSuccess, signFailure } from "./actions";

export function* signIn({ payload }) {
  try {
    const { email, senha } = payload;

    const response = yield call(api.post, "sessions", { email, senha });
    const { token, user, acessible, color } = response.data;
    console.log(response.data);
    yield put(
      signInSuccess(
        token,
        user,
        acessible,
        user.empresa === undefined ? "" : user.empresa.idFederal,
        color
      )
    );

    history.push(0);
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { nome, email, senha, profile, colab } = payload;
    yield call(api.post, "users", {
      nome,
      email,
      senha,
      profile
    });
    if (colab === false) {
      history.push("/login");
    }
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

export function* createEmpRequest({ payload }) {
  try {
    const { emp } = payload;
    yield call(api.post, "emp", {
      emp
    });
    history.push("/");
  } catch (err) {
    toast.error("Falha no cadastro, verifique seus dados");
    yield put(signFailure());
  }
}

export default all([
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_UP_REQUEST", signUp),
  takeLatest("@auth/CREATE_EMP_REQUEST", createEmpRequest)
]);
