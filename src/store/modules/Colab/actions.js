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
  log_usr,
  EmpresaId,
  nome,
  dt_admiss,
  cel,
  skype,
  email,
  espec
) {
  return {
    type: "@cadastro/CADASTRO_COLAB_REQUEST",
    payload: {
      CPF,
      FornecId,
      log_usr,
      EmpresaId,
      nome,
      dt_admiss,
      cel,
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
  log_usr,
  EmpresaId,
  nome,
  dt_admiss,
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
      log_usr,
      EmpresaId,
      nome,
      dt_admiss,
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
  tipo_valor,
  valor,
  data_inic,
  data_fim,
  tipo_atend
) {
  return {
    type: "@cadastro/CADASTRO_COLAB_COMP_REQUEST",
    payload: {
      ColabId,
      nivel,
      tipo_valor,
      valor,
      data_inic,
      data_fim,
      tipo_atend,
    },
  };
}

export function ColabCompUpdate(
  id,
  CPF,
  FornecId,
  log_usr,
  EmpresaId,
  nome,
  dt_admiss,
  cel,
  skype,
  email,
  espec
) {
  return {
    type: "@update/COLAB_COMP_REQUEST",
    payload: {
      id,
      CPF,
      FornecId,
      log_usr,
      EmpresaId,
      nome,
      dt_admiss,
      cel,
      skype,
      email,
      espec,
    },
  };
}
