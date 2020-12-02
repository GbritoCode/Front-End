export function signFailure() {
  return {
    type: "@cadastro/CADASTRO_FALHA",
  };
}
export function ClienteUpdateSuccess(profile) {
  return {
    type: "@update/CLIENTE_REQUEST_SUCCES",
    payload: { profile },
  };
}

export function colabRequest(
  CPF,
  FornecId,
  EmpresaId,
  nome,
  dtAdmiss,
  cel,
  PerfilId,
  skype,
  email,
  espec
) {
  return {
    type: "@cadastro/CADASTRO_COLAB_REQUEST",
    payload: {
      CPF,
      FornecId,
      EmpresaId,
      nome,
      dtAdmiss,
      cel,
      PerfilId,
      skype,
      email,
      espec,
    },
  };
}

export function ColabUpdate(
  id,
  CPF,
  FornecId,
  PerfilId,
  nome,
  dtAdmiss,
  cel,
  skype,
  email,
  espec
) {
  return {
    type: "@update/COLAB_REQUEST",
    payload: {
      id,
      CPF,
      FornecId,
      PerfilId,
      nome,
      dtAdmiss,
      cel,
      skype,
      email,
      espec,
    },
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
      tipoAtend,
    },
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
      tipoAtend,
    },
  };
}
