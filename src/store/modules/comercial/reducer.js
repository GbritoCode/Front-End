import produce from "immer";

const INITIAL_STATE = {
  cliente: null
};

export default function cadastro(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@update/CLIENTE_REQUEST_SUCCES": {
        draft.cliente = action.payload.profile;
        break;
      }
      case "@cadastro/CADASTRO_FALHA": {
        break;
      }
      default:
    }
  });
}
