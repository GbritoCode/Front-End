export function signFailure() {
  return {
    type: "@update/REQUEST_FAILURE"
  };
}

export function forgotPassFail() {
  return {
    type: "@auth/FAIL_FORGOT_PASS"
  };
}

export function forgotPassOK() {
  return {
    type: "@auth/OK_FORGOT_PASS"
  };
}

export function forgotPass(email) {
  return {
    type: "@auth/REQUEST_FORGOT_PASS",
    payload: { email }
  };
}

export function updateProfile(
  id,
  nome,
  email,
  aniver,
  ColabId,
  CPF,
  senhaAntiga,
  senha,
  confirmSenha
) {
  return {
    type: "@update/USER_REQUEST",
    payload: {
      id,
      nome,
      email,
      aniver,
      ColabId,
      CPF,
      senhaAntiga,
      senha,
      confirmSenha
    }
  };
}
