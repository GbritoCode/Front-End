import { combineReducers } from "redux";

import auth from "./auth/reducer";
import user from "./user/reducer";
import geral from "./general/reducer";
import cliente from "./Cliente/reducer";
import colab from "./Colab/reducer";
import oport from "./oportunidades/reducer";
import field from "./keepingFields/reducer";

export default combineReducers({
  auth,
  user,
  colab,
  geral,
  cliente,
  oport,
  field
});
