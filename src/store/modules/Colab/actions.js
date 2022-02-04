export function signFailure() {
  return {
    type: "@cadastro/CADASTRO_FALHA"
  };
}

export function firstColabSuccess(user) {
  return {
    type: "@colab/FIRST_COLAB_SUCCESS",
    payload: { user }
  };
}

export function ClienteUpdateSuccess(profile) {
  return {
    type: "@update/CLIENTE_REQUEST_SUCCES",
    payload: { profile }
  };
}

export function colabRequest(data) {
  return {
    type: "@cadastro/CADASTRO_COLAB_REQUEST",
    payload: data
  };
}

export function ColabUpdate(data) {
  return {
    type: "@update/COLAB_REQUEST",
    payload: data
  };
}

export function colabCompRequest(
  ColabId,
  nivel,
  tipoValor,
  valor,
  dataInic,
  dataFim,
  tipoAtend
) {
  return {
    type: "@cadastro/CADASTRO_COLAB_COMP_REQUEST",
    payload: {
      ColabId,
      nivel,
      tipoValor,
      valor,
      dataInic,
      dataFim,
      tipoAtend
    }
  };
}

export function ColabCompUpdate(
  id,
  ColabId,
  nivel,
  tipoValor,
  valor,
  dataInic,
  dataFim,
  tipoAtend
) {
  return {
    type: "@update/COLAB_COMP_REQUEST",
    payload: {
      id,
      ColabId,
      nivel,
      tipoValor,
      valor,
      dataInic,
      dataFim,
      tipoAtend
    }
  };
}
