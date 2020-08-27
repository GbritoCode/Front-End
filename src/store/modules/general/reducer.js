import produce from "immer";

const INITIAL_STATE = {
  ola: false
};

export default function cadastro(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@cadastro/REQUEST_FAIL": {
        draft.ola = true;
        break;
      }
      case "@cadastro/CADASTRO_COLAB_REQUEST": {
        break;
      }
      default:
    }
  });
}
