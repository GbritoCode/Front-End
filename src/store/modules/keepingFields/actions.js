export function comercialDashFilterFields(data) {
  return {
    type: "@field/COMERCIAL_DASH_FIELDS",
    payload: data
  };
}

export function FUPCadastroFields(data) {
  return {
    type: "@field/FUP_CADASTRO_FIELDS",
    payload: data
  };
}

export function clearFields(data) {
  return {
    type: "@field/CLEAR_FIELDS",
    payload: data
  };
}
