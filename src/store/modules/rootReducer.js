import { combineReducers } from "redux";

import auth from "./auth/reducer";
import user from "./general/reducer";
import geral from "./general/reducer";
import cliente from "./Cliente/reducer";
import colab from "./Colab/reducer";

export default combineReducers({ auth, user, colab, geral, cliente });
