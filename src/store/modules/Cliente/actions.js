export function signFailure() {
  return {
    type: "@cadastro/CADASTRO_FALHA",
  };
}

export function ClienteRequest(
  CNPJ,
  nome_abv,
  representante,
  tipo_comiss,
  EmpresaId
) {
  return {
    type: "@cadastro/CADASTRO_REQUEST",
    payload: { CNPJ, nome_abv, representante, tipo_comiss, EmpresaId },
  };
}

export function ClienteUpdate(
  id,
  nome_abv,
  representante,
  tipo_comiss,
  prospect
) {
  return {
    type: "@update/CLIENTE_REQUEST",
    payload: { id, nome_abv, representante, tipo_comiss, prospect },
  };
}
export function ClienteUpdateSuccess(profile) {
  return {
    type: "@update/CLIENTE_REQUEST_SUCCES",
    payload: { profile },
  };
}

export function CliContRequest(
  id,
  ClienteId,
  nome,
  cel,
  fone,
  skype,
  email,
  aniver,
  tipo_conta
) {
  return {
    type: "@cadastro/CADASTRO_CONT_REQUEST",
    payload: { ClienteId, nome, cel, fone, skype, email, aniver, tipo_conta },
  };
}

export function CliContUpdate(
  id,
  ClienteId,
  nome,
  cel,
  fone,
  skype,
  email,
  aniver,
  tipo_conta
) {
  return {
    type: "@update/CONT_REQUEST",
    payload: {
      id,
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipo_conta,
    },
  };
}

export function CliCompRequest(
  ClienteId,
  rz_social,
  cond_pgmto,
  nome_abv,
  cep,
  rua,
  numero,
  bairro,
  cidade,
  uf,
  insc_mun,
  insc_uf
) {
  return {
    type: "@cadastro/CADASTRO_COMP_REQUEST",
    payload: {
      ClienteId,
      rz_social,
      cond_pgmto,
      nome_abv,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      insc_mun,
      insc_uf,
    },
  };
}

export function CliCompUpdate(
  id,
  ClienteId,
  rz_social,
  cond_pgmto,
  nome_abv,
  cep,
  rua,
  numero,
  bairro,
  cidade,
  uf,
  insc_mun,
  insc_uf
) {
  return {
    type: "@update/COMP_REQUEST",
    payload: {
      id,
      ClienteId,
      rz_social,
      cond_pgmto,
      nome_abv,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      insc_mun,
      insc_uf,
    },
  };
}

//------------------------------------------
//------------------------------------------

export function CliRecDespRequest(ClienteId, tipo_rec_desp, nome_rec_desp) {
  return {
    type: "@cadastro/CADASTRO_REC_DESP_REQUEST",
    payload: { ClienteId, tipo_rec_desp, nome_rec_desp },
  };
}
