import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history";
import api from "~/services/api";

import { signFailure, ClienteUpdateSuccess } from "./actions";

let result;
export function* extUserCadastro({ payload }) {
  try {
    console.log(payload);
    result = yield call(api.post, "users", {
      ...payload,
      senha: "Aidera2020",
      profile: payload.PerfilId
    });

    history.push("/tabelas/general/ext-user");
    toast.success("usuário criado");
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.error);
  }
}

export function* updateExtUser({ payload }) {
  try {
    const { UserId, ColabId } = payload;

    yield call(api.put, `users/${UserId}`, {
      ...payload,
      profile: payload.PerfilId
    });

    const response = yield call(api.put, `colab/${ColabId}`, payload);
    history.push("/tabelas/general/ext-user");
    toast.success("usuário atualizado");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error(err.response.data.error);
    yield put(signFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export default all([
  takeLatest("@cadastro/CADASTRO_EXT_USER_REQUEST", extUserCadastro),
  takeLatest("@update/EXT_USER_REQUEST", updateExtUser)
]);
