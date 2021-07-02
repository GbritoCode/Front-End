export function signFailure() {
  return {
    type: "@cadastro/CADASTRO_FALHA"
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
  prospect,
  CampanhaIds
) {
  return {
    type: "@cadastro/CADASTRO_REQUEST",
    payload: {
      CNPJ,
      nomeAbv,
      rzSoc,
      fantasia,
      RepresentanteId,
      TipoComisseId,
      EmpresaId,
      prospect,
      CampanhaIds
    }
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
      id,
      nomeAbv,
      rzSoc,
      fantasia,
      RepresentanteId,
      TipoComisseId,
      prospect
    }
  };
}
export function ClienteUpdateSuccess(profile) {
  return {
    type: "@update/CLIENTE_REQUEST_SUCCES",
    payload: { profile }
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
  tipoConta,
  prospect
) {
  return {
    type: "@cadastro/CADASTRO_CONT_REQUEST",
    payload: {
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipoConta,
      prospect
    }
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
  tipoConta,
  prospect
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
      prospect
    }
  };
}

export function CliCompRequest(
  ClienteId,
  CondPgmtoId,
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
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      inscMun,
      inscEst
    }
  };
}

export function CliCompUpdate(
  id,
  ClienteId,
  CondPgmtoId,
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
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      inscMun,
      inscEst
    }
  };
}

//------------------------------------------
//------------------------------------------

export function CliRecDespRequest(
  ClienteId,
  RecDespId,
  tipoCobranca,
  valorRec,
  dataInic,
  dataFim
) {
  return {
    type: "@cadastro/CADASTRO_REC_DESP_REQUEST",
    payload: { ClienteId, RecDespId, tipoCobranca, valorRec, dataInic, dataFim }
  };
}

export function cliRecDespUpdate(
  id,
  ClienteId,
  RecDespId,
  tipoCobranca,
  valorRec,
  dataInic,
  dataFim
) {
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
    }
  };
}

//--------------------------------------------------------
//--------------------------------------------------------

export function campanhaCadastro(
  EmpresaId,
  cod,
  desc,
  ClienteIds,
  dataInic,
  dataFim,
  ColabId,
  objetivo
) {
  return {
    type: "@cadastro/CAMPANHA_REQUEST",
    payload: {
      EmpresaId,
      cod,
      desc,
      ClienteIds,
      dataInic,
      dataFim,
      ColabId,
      objetivo
    }
  };
}

export function campanhaUpdate(
  id,
  cod,
  desc,
  ClienteIds,
  dataInic,
  dataFim,
  ColabId
) {
  return {
    type: "@update/CAMPANHA_REQUEST",
    payload: {
      id,
      cod,
      desc,
      ClienteIds,
      dataInic,
      dataFim,
      ColabId
    }
  };
}

//--------------------------------------
//--------------------------------------

export function camposDinamicosCadastro(EmpresaId, nome, valor) {
  return {
    type: "@cadastro/CAMPOS_DINAMICOS_REQUEST",
    payload: {
      EmpresaId,
      nome,
      valor
    }
  };
}

export function camposDinamicosUpdate(id, nome, valor) {
  return {
    type: "@update/CAMPOS_DINAMICOS_REQUEST",
    payload: {
      id,
      nome,
      valor
    }
  };
}

//-----------------------------------
//-----------------------------------

export function followUpCadastro(
  EmpresaId,
  ColabId,
  ClienteId,
  CliContId,
  dataContato,
  dataProxContato,
  detalhes,
  reacao,
  CampanhasId,
  proxPasso,
  prefContato
) {
  return {
    type: "@cadastro/FOLLOW_UP_REQUEST",
    payload: {
      EmpresaId,
      ColabId,
      ClienteId,
      CliContId,
      dataContato,
      dataProxContato,
      detalhes,
      reacao,
      CampanhasId,
      proxPasso,
      prefContato
    }
  };
}

export function followUpUpdate(
  id,
  ColabId,
  ClienteId,
  CliContId,
  dataContato,
  dataProxContato,
  detalhes,
  reacao,
  proxPasso,
  prefContato
) {
  return {
    type: "@update/FOLLOW_UP_REQUEST",
    payload: {
      id,
      ColabId,
      ClienteId,
      CliContId,
      dataContato,
      dataProxContato,
      detalhes,
      reacao,
      proxPasso,
      prefContato
    }
  };
}
