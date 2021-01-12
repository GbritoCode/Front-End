import { all } from "redux-saga/effects";

import auth from "./auth/sagas";
import user from "./user/sagas";
import geral from "./general/sagas";
import cliente from "./Cliente/sagas";
import colab from "./Colab/sagas";
import oport from "./oportunidades/sagas";

export default function* rootSaga() {
  return yield all([auth, user, colab, geral, cliente, oport]);
}
