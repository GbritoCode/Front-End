import produce from "immer";

const INITIAL_STATE = {
  comercialDash: {},
  FUPCadastro: {}
};

export default function field(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@field/COMERCIAL_DASH_FIELDS": {
        draft.comercialDash = {
          camp: action.payload.camp,
          inicDate: action.payload.inicDate,
          endDate: action.payload.endDate,
          dataForDoughnut: action.payload.dataForDoughnut,
          cliStatusGraph: action.payload.cliStatusGraph
        };
        break;
      }
      case "@field/FUP_CADASTRO_FIELDS": {
        draft.FUPCadastro = action.payload;
        break;
      }
      case "@field/CLEAR_FIELDS": {
        draft[action.payload.field] = {};
        break;
      }
      default:
    }
  });
}
