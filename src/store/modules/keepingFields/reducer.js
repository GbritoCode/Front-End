import produce from "immer";

const INITIAL_STATE = {
  comercialDash: {}
};

export default function field(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@field/COMERCIAL_DASH_FIELDS": {
        draft.comercialDash = {
          camp: action.payload.camp,
          inicDate: action.payload.inicDate,
          endDate: action.payload.endDate
        };
        break;
      }

      default:
    }
  });
}
