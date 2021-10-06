import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history";
import api from "~/services/api";

import { signFailure } from "./actions";

export function* movCaixaCadastro({ payload }) {
  try {
    yield call(api.post, "movCaixa", payload);

    history.goBack();
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

export function* updateMovCaixa({ payload }) {
  try {
    // const { id } = payload;

    // const response = yield call(api.put, `movCaixa/${id}`, payload);

    history.goBack();
    toast.success("Follow Up Atualizado");
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}

export default all([
  takeLatest("@cadastro/MOV_CAIXA_REQUEST", movCaixaCadastro),
  takeLatest("@cadastro/MOV_CAIXA_UPDATE", updateMovCaixa)
]);
