import { takeLatest, call, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import history from "~/services/history";
import api from "~/services/api";

export function* signIn({ payload }) {
  try {
    const { email, senha } = payload;

    const response = yield call(api.post, "sessions", { email, senha });
    console.log(response.data);

    history.push(0);
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.error);
  }
}

export default all([takeLatest("@unused/unused", signIn)]);
