import { all } from "redux-saga/effects";

import auth from "./auth/sagas";
import geral from "./general/sagas";
import cliente from "./Cliente/sagas";
import colab from "./Colab/sagas";

export default function* rootSaga() {
  return yield all([auth, colab, geral, cliente]);
}
