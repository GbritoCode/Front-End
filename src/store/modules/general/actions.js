export function requestFailure() {
  return { type: "@cadastro/REQUEST_FAIL" };
}
export function ClienteUpdateSuccess(profile) {
  return {
    type: "@update/CLIENTE_REQUEST_SUCCES",
    payload: { profile },
  };
}

export function areaRequest(EmpresaId, descArea) {
  return {
    type: "@cadastro/AREA_REQUEST",
    payload: { EmpresaId, descArea },
  };
}
export function AreaUpdate(id, EmpresaId, descArea) {
  return {
    type: "@update/AREA_REQUEST",
    payload: { id, EmpresaId, descArea },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function empresaRequest(idFederal, nome, license, UserId, first) {
  return {
    type: "@cadastro/EMPRESA_REQUEST",
    payload: { idFederal, nome, license, UserId, first },
  };
}
export function EmpresaUpdate(id, idFederal, nome, license, UserId) {
  return {
    type: "@update/EMPRESA_REQUEST",
    payload: { id, idFederal, nome, license, UserId },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function fornecRequest(
  CNPJ,
  EmpresaId,
  nome,
  CondPgmtoId,
  nomeConta,
  fone,
  cep,
  rua,
  numero,
  complemento,
  bairro,
  cidade,
  uf,
  banco,
  agencia,
  conta,
  first
) {
  return {
    type: "@cadastro/FORNEC_REQUEST",
    payload: {
      CNPJ,
      EmpresaId,
      nome,
      CondPgmtoId,
      nomeConta,
      fone,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      banco,
      agencia,
      conta,
      first
    },
  };
}
export function FornecUpdate(
  id,
  CNPJ,
  EmpresaId,
  nome,
  CondPgmtoId,
  nomeConta,
  fone,
  cep,
  rua,
  numero,
  complemento,
  bairro,
  cidade,
  uf,
  banco,
  agencia,
  conta
) {
  return {
    type: "@update/FORNEC_REQUEST",
    payload: {
      id,
      CNPJ,
      EmpresaId,
      nome,
      CondPgmtoId,
      nomeConta,
      fone,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      banco,
      agencia,
      conta,
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function itmControleRequest(
  EmpresaId,
  descItem,
  tipoItem,
  contaContabil,
  centCusto
) {
  return {
    type: "@cadastro/ITM_CONTROLE_REQUEST",
    payload: {
      EmpresaId,
      descItem,
      tipoItem,
      contaContabil,
      centCusto,
    },
  };
}
export function itmControleUpdate(
  id,
  EmpresaId,
  descItem,
  tipoItem,
  contaContabil,
  centCusto
) {
  return {
    type: "@update/ITM_CONTROLE_REQUEST",
    payload: {
      id,
      EmpresaId,
      descItem,
      tipoItem,
      contaContabil,
      centCusto,
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function parametrosRequest(
  EmpresaId,
  impostos,
  vlrMinHr,
  vlrBsHr,
  vlrBsDesp,
  adiantaPgmto,
  percAdiantaPgmto
) {
  return {
    type: "@cadastro/PARAMETROS_REQUEST",
    payload: {
      EmpresaId,
      impostos,
      vlrMinHr,
      vlrBsHr,
      vlrBsDesp,
      adiantaPgmto,
      percAdiantaPgmto,
    },
  };
}
export function ParametrosUpdate(
  id,
  EmpresaId,
  impostos,
  vlrMinHr,
  vlrBsHr,
  vlrBsDesp,
  adiantaPgmto,
  percAdiantaPgmto
) {
  return {
    type: "@update/PARAMETROS_REQUEST",
    payload: {
      id,
      EmpresaId,
      impostos,
      vlrMinHr,
      vlrBsHr,
      vlrBsDesp,
      adiantaPgmto,
      percAdiantaPgmto,
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function prodtRequest(EmpresaId, descProdt) {
  return {
    type: "@cadastro/PRODT_REQUEST",
    payload: {
      EmpresaId,
      descProdt,
    },
  };
}
export function ProdtUpdate(id, EmpresaId, descProdt) {
  return {
    type: "@update/PRODUTO_REQUEST",
    payload: {
      id,
      EmpresaId,
      descProdt,
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function recDespRequest(EmpresaId, itmControleId, desc, recDesp) {
  return {
    type: "@cadastro/REC_DESP_REQUEST",
    payload: {
      EmpresaId,
      itmControleId,
      desc,
      recDesp
    },
  };
}
export function RecDespUpdate(id, EmpresaId, itmControleId, desc, recDesp) {
  return {
    type: "@update/REC_DESP_REQUEST",
    payload: {
      id,
      EmpresaId,
      itmControleId,
      desc,
      recDesp
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function condPgmtoRequest(EmpresaId, cod, desc, diasPrazo, first) {
  return {
    type: "@cadastro/COND_PGMTO_REQUEST",
    payload: {
      EmpresaId,
      cod,
      desc,
      diasPrazo,
      first
    },
  };
}
export function condPgmtoUpdate(id, EmpresaId, cod, desc, diasPrazo) {
  return {
    type: "@update/COND_PGMTO_REQUEST",
    payload: {
      id,
      EmpresaId,
      cod,
      desc,
      diasPrazo,
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function tipoComissRequest(EmpresaId, desc, prcnt, bsComiss) {
  return {
    type: "@cadastro/TIPO_COMISS_REQUEST",
    payload: {
      EmpresaId,
      desc,
      prcnt,
      bsComiss
    },
  };
}
export function tipoComissUpdate(id, EmpresaId, desc, prcnt, bsComiss) {
  return {
    type: "@update/TIPO_COMISS_REQUEST",
    payload: {
      id,
      EmpresaId,
      desc,
      prcnt,
      bsComiss
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function perfilRequest(EmpresaId, desc, first) {
  return {
    type: "@cadastro/PERFIL_REQUEST",
    payload: {
      EmpresaId,
      desc,
      first
    },
  };
}
export function perfilUpdate(id, EmpresaId, desc) {
  return {
    type: "@update/PERFIL_REQUEST",
    payload: {
      id,
      EmpresaId,

      desc,
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function representanteRequest(
  EmpresaId,
  nome,
  TipoComisseId,
  vlrFixMens
) {
  return {
    type: "@cadastro/REPRESENTANTE_REQUEST",
    payload: {
      EmpresaId,
      nome,
      TipoComisseId,
      vlrFixMens,
    },
  };
}
export function RepresentanteUpdate(
  id,
  EmpresaId,
  nome,
  TipoComisseId,
  vlrFixMens
) {
  return {
    type: "@update/REPRESENTANTE_REQUEST",
    payload: {
      id,
      EmpresaId,
      nome,
      TipoComisseId,
      vlrFixMens,
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function undNegRequest(EmpresaId, descUndNeg) {
  return {
    type: "@cadastro/UndNeg_REQUEST",
    payload: {
      EmpresaId,
      descUndNeg,
    },
  };
}
export function UndNegUpdate(id, EmpresaId, descUndNeg) {
  return {
    type: "@update/UndNeg_REQUEST",
    payload: {
      id,
      EmpresaId,
      descUndNeg,
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function segmentoRequest(
  EmpresaId,
  UndNegId,
  ProdutoId,
  AreaId,
  descSegmt
) {
  return {
    type: "@cadastro/SEGMENTO_REQUEST",
    payload: {
      EmpresaId,
      UndNegId,
      ProdutoId,
      AreaId,
      descSegmt,
    },
  };
}
export function SegmentoUpdate(
  id,
  EmpresaId,
  UndNegId,
  ProdutoId,
  AreaId,
  descSegmt
) {
  return {
    type: "@update/SEGMENTO_REQUEST",
    payload: {
      id,
      EmpresaId,
      UndNegId,
      ProdutoId,
      AreaId,
      descSegmt,
    },
  };
}

//----------------------------------------------------
//----------------------------------------------------
