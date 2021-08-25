export function signFailure() {
  return {
    type: "@cadastro/CADASTRO_FALHA"
  };
}

export function ClienteUpdateSuccess(profile) {
  return {
    type: "@update/CLIENTE_REQUEST_SUCCES",
    payload: { profile }
  };
}

export function ClienteRequest(data) {
  return {
    type: "@cadastro/CADASTRO_REQUEST",
    payload: data
  };
}

export function ClienteUpdate(data) {
  return {
    type: "@update/CLIENTE_REQUEST",
    payload: data
  };
}

export function CliContRequest(data) {
  return {
    type: "@cadastro/CADASTRO_CONT_REQUEST",
    payload: data
  };
}

export function CliContUpdate(data) {
  return {
    type: "@update/CONT_REQUEST",
    payload: data
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
// {
//    id: int (updateOnly)
//    EmpresaId: int,
//    cod: str,
//    desc: str,
//    ClientesIds: arr(int),
//    dataInic: dateOnly,
//    dataFim: dateOnly,
//    ColabId: int,
//    Objetivo: str,
//    dashFields: str,
// }
export function campanhaCadastro(data) {
  return {
    type: "@cadastro/CAMPANHA_REQUEST",
    payload: data
  };
}

export function campanhaUpdate(data) {
  return {
    type: "@update/CAMPANHA_REQUEST",
    payload: data
  };
}

//--------------------------------------
//--------------------------------------

export function camposDinamicosCadastro(data) {
  return {
    type: "@cadastro/CAMPOS_DINAMICOS_REQUEST",
    payload: data
  };
}

export function camposDinamicosUpdate(data) {
  return {
    type: "@update/CAMPOS_DINAMICOS_REQUEST",
    payload: data
  };
}

//-----------------------------------
//-----------------------------------

export function followUpCadastro(data) {
  return {
    type: "@cadastro/FOLLOW_UP_REQUEST",
    payload: data
  };
}

export function followUpUpdate(data) {
  return {
    type: "@update/FOLLOW_UP_REQUEST",
    payload: data
  };
}
