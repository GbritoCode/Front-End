export function signFailure() {
  return {
    type: "@update/REQUEST_FAILURE"
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
