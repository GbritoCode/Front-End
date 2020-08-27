export function requestFailure() {
  return { type: "@cadastro/REQUEST_FAIL" };
}
export function colabRequest({
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
}) {
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

export function colabCompRequest({
  ColabId,
  nivel,
  tipo_valor,
  valor,
  data_inic,
  data_fim,
  tipo_atend,
}) {
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
