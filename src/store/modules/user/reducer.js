import produce from "immer";

const INITIAL_STATE = {
  status: "default"
};

export default function cadastro(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@auth/REQUEST_FORGOT_PASS": {
        draft.status = "loading";
        break;
      }
      case "@auth/FAIL_FORGOT_PASS": {
        draft.status = "default";
        break;
      }
      case "@auth/OK_FORGOT_PASS": {
        draft.status = "sent";
        break;
      }

      default:
    }
  });
}
