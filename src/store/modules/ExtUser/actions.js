export function signFailure() {
  return {
    type: "@cadastro/CADASTRO_FALHA"
  };
}

export function firstExtUserSuccess(user) {
  return {
    type: "@extUserId/FIRST_EXT_USER_SUCCESS",
    payload: { user }
  };
}

export function extUserRequest(data) {
  return {
    type: "@cadastro/CADASTRO_EXT_USER_REQUEST",
    payload: data
  };
}

export function ExtUserUpdate(data) {
  return {
    type: "@update/EXT_USER_REQUEST",
    payload: data
  };
}

export function ClienteUpdateSuccess(profile) {
  return {
    type: "@update/CLIENTE_REQUEST_SUCCES",
    payload: { profile }
  };
}
