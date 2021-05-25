import produce from "immer";

const INITIAL_STATE = {
  token: null,
  acessible: null,
  signed: false,
  loading: false,
  empresa: null,
  user: { Colab: null }
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@auth/SIGN_IN_REQUEST": {
        draft.loading = true;
        break;
      }

      case "@auth/SIGN_IN_SUCCESS": {
        draft.token = action.payload.token;
        draft.user = action.payload.user;
        draft.acessible = action.payload.acessible;
        draft.signed = true;
        draft.loading = false;
        draft.empresa = 1;
        break;
      }
      case "@colab/FIRST_COLAB_SUCCESS": {
        draft.user = action.payload.user;
        break;
      }
      case "@auth/SIGN_FAILURE": {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
