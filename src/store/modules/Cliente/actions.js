export function signFailure() {
  return {
    type: "@cadastro/CADASTRO_FALHA",
  };
}

export function ClienteRequest(
  CNPJ,
  nomeAbv,
  rzSoc,
  fantasia,
  RepresentanteId,
  TipoComisseId,
  EmpresaId,
  prospect
) {
  return {
    type: "@cadastro/CADASTRO_REQUEST",
    payload: {
      CNPJ, nomeAbv, rzSoc,
      fantasia, RepresentanteId, TipoComisseId, EmpresaId, prospect
    },
  };
}

export function ClienteUpdate(
  id,
  nomeAbv,
  rzSoc,
  fantasia,
  RepresentanteId,
  TipoComisseId,
  prospect
) {
  return {
    type: "@update/CLIENTE_REQUEST",
    payload: {
      id, nomeAbv, rzSoc,
      fantasia, RepresentanteId, TipoComisseId, prospect
    },
  };
}
export function ClienteUpdateSuccess(profile) {
  return {
    type: "@update/CLIENTE_REQUEST_SUCCES",
    payload: { profile },
  };
}

export function CliContRequest(
  ClienteId,
  nome,
  cel,
  fone,
  skype,
  email,
  aniver,
  tipoConta
) {
  return {
    type: "@cadastro/CADASTRO_CONT_REQUEST",
    payload: { ClienteId, nome, cel, fone, skype, email, aniver, tipoConta },
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
  tipoConta
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
      tipoConta,
    },
  };
}

export function CliCompRequest(
  ClienteId,
  CondPgmtoId,
  nomeAbv,
  cep,
  rua,
  numero,
  bairro,
  cidade,
  uf,
  inscMun,
  inscEst
) {
  return {
    type: "@cadastro/CADASTRO_COMP_REQUEST",
    payload: {
      ClienteId,
      CondPgmtoId,
      nomeAbv,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      inscMun,
      inscEst,
    },
  };
}

export function CliCompUpdate(
  id,
  ClienteId,
  CondPgmtoId,
  nomeAbv,
  cep,
  rua,
  numero,
  bairro,
  cidade,
  uf,
  inscMun,
  inscEst
) {
  return {
    type: "@update/COMP_REQUEST",
    payload: {
      id,
      ClienteId,
      CondPgmtoId,
      nomeAbv,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      inscMun,
      inscEst,
    },
  };
}

//------------------------------------------
//------------------------------------------

export function CliRecDespRequest(ClienteId, RecDespId, tipoCobranca, valorRec, dataInic, dataFim) {
  return {
    type: "@cadastro/CADASTRO_REC_DESP_REQUEST",
    payload: { ClienteId, RecDespId, tipoCobranca, valorRec, dataInic, dataFim },
  };
}

export function cliRecDespUpdate(id, ClienteId, RecDespId, tipoCobranca, valorRec, dataInic, dataFim) {
  return {
    type: "@update/CLI_REC_DESP_REQUEST",
    payload: {
      id,
      ClienteId,
      RecDespId,
      tipoCobranca,
      valorRec,
      dataInic,
      dataFim
    },
  };
}
