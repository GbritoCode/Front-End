export function signInRequest(email, senha) {
  return {
    type: "@auth/SIGN_IN_REQUEST",
    payload: { email, senha }
  };
}

export function signInSuccess(token, user, acessible, empresa, color) {
  return {
    type: "@auth/SIGN_IN_SUCCESS",
    payload: { token, user, acessible, empresa, color }
  };
}

export function signFailure() {
  return {
    type: "@auth/SIGN_FAILURE"
  };
}

export function signUpRequest(nome, email, senha, profile, colab) {
  return {
    type: "@auth/SIGN_UP_REQUEST",
    payload: { nome, email, senha, profile, colab }
  };
}

export function signOut() {
  return {
    type: "@auth/SIGN_OUT"
  };
}

export function createEmpRequest(emp) {
  return {
    type: "@auth/CREATE_EMP_REQUEST",
    payload: { emp }
  };
}
