export function requestFailure() {
  return { type: "@cadastro/REQUEST_FAIL" };
}
export function ClienteUpdateSuccess(profile) {
  return {
    type: "@update/CLIENTE_REQUEST_SUCCES",
    payload: { profile }
  };
}

export function areaRequest(EmpresaId, descArea) {
  return {
    type: "@cadastro/AREA_REQUEST",
    payload: { EmpresaId, descArea }
  };
}
export function AreaUpdate(id, EmpresaId, descArea) {
  return {
    type: "@update/AREA_REQUEST",
    payload: { id, EmpresaId, descArea }
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function empresaRequest(
  idFederal,
  nome,
  license,
  UserId,
  first,
  empresa
) {
  return {
    type: "@cadastro/EMPRESA_REQUEST",
    payload: { idFederal, nome, license, UserId, first, empresa }
  };
}
export function EmpresaUpdate(id, idFederal, nome, license, UserId) {
  return {
    type: "@update/EMPRESA_REQUEST",
    payload: { id, idFederal, nome, license, UserId }
  };
}
//----------------------------------------------------
//----------------------------------------------------
// {
// id:int (onlyUpdate)
// CNPJ:str,
// EmpresaId:int,
// nome:str,
// CondPgmtoId:int,
// RecDespId:int,
// nomeConta:str,
// fone:str,
// cep:str,
// rua:str,
// numero:int,
// complemento:str,
// bairro:str,
// cidade:str,
// uf:str,
// banco:int,
// agencia:int,
// conta:str,
// first:bool (onlyStore)
// }

export function fornecRequest(data) {
  return {
    type: "@cadastro/FORNEC_REQUEST",
    payload: data
  };
}
export function FornecUpdate(data) {
  return {
    type: "@update/FORNEC_REQUEST",
    payload: data
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function parametrosRequest(
  EmpresaId,
  IRPJ,
  CSLL,
  COFINS,
  PIS,
  INSS,
  ISS,
  PSProLabor,
  IRRFProLabor,
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
      IRPJ,
      CSLL,
      COFINS,
      PIS,
      INSS,
      ISS,
      PSProLabor,
      IRRFProLabor,
      vlrMinHr,
      vlrBsHr,
      vlrBsDesp,
      adiantaPgmto,
      percAdiantaPgmto
    }
  };
}

// id: int,
// EmpresaId: int,
// IRPJ: float,
// CSLL: float,
// COFINS: float,
// PIS: float,
// INSS: float,
// ISS: float,
// PSProLabor: float,
// IRRFProLabor: float,
// vlrMinHr: int,
// vlrBsHr: int,
// vlrBsDesp: int,
// adiantaPgmto: bool,
// percAdiantaPgmto: float,
// compHrs: int,
// compFlag: bool,
// pgmtoVenc: dateonly
export function ParametrosUpdate(data) {
  return {
    type: "@update/PARAMETROS_REQUEST",
    payload: data
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function prodtRequest(EmpresaId, descProdt) {
  return {
    type: "@cadastro/PRODT_REQUEST",
    payload: {
      EmpresaId,
      descProdt
    }
  };
}
export function ProdtUpdate(id, EmpresaId, descProdt) {
  return {
    type: "@update/PRODUTO_REQUEST",
    payload: {
      id,
      EmpresaId,
      descProdt
    }
  };
}
//----------------------------------------------------
//----------------------------------------------------
// {
//   id: int (onlyUpdate),
//   EmpresaId: int,
//   desc: str,
//   recDesp: int,
//   tipoItem: int,
//   lancFlag: bool,
//   ContaContabilId: int,
//   CentroCustoId: int
// }
export function recDespRequest(data) {
  return {
    type: "@cadastro/REC_DESP_REQUEST",
    payload: data
  };
}
export function RecDespUpdate(data) {
  return {
    type: "@update/REC_DESP_REQUEST",
    payload: data
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
    }
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
      diasPrazo
    }
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
    }
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
    }
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function perfilRequest(EmpresaId, desc, cod, string, first) {
  return {
    type: "@cadastro/PERFIL_REQUEST",
    payload: {
      EmpresaId,
      desc,
      cod,
      string,
      first
    }
  };
}
export function perfilUpdate(id, EmpresaId, desc, cod, string) {
  return {
    type: "@update/PERFIL_REQUEST",
    payload: {
      id,
      EmpresaId,
      desc,
      cod,
      string
    }
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function representanteRequest(
  EmpresaId,
  nome,
  TipoComisseId,
  vlrFixMens,
  ColabId
) {
  return {
    type: "@cadastro/REPRESENTANTE_REQUEST",
    payload: {
      EmpresaId,
      nome,
      TipoComisseId,
      vlrFixMens,
      ColabId
    }
  };
}
export function RepresentanteUpdate(data) {
  return {
    type: "@update/REPRESENTANTE_REQUEST",
    payload: data
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function undNegRequest(EmpresaId, descUndNeg) {
  return {
    type: "@cadastro/UndNeg_REQUEST",
    payload: {
      EmpresaId,
      descUndNeg
    }
  };
}
export function UndNegUpdate(id, EmpresaId, descUndNeg) {
  return {
    type: "@update/UndNeg_REQUEST",
    payload: {
      id,
      EmpresaId,
      descUndNeg
    }
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
      descSegmt
    }
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
      descSegmt
    }
  };
}

//----------------------------------------------------
//----------------------------------------------------

export function contaContabilRequest(EmpresaId, cod, desc) {
  return {
    type: "@cadastro/CONTA_CONTABIL_REQUEST",
    payload: { EmpresaId, cod, desc }
  };
}
export function ContaContabilUpdate(id, cod, desc) {
  return {
    type: "@update/CONTA_CONTABIL_REQUEST",
    payload: { id, cod, desc }
  };
}
//----------------------------------------------------
//----------------------------------------------------
export function centroCustoRequest(EmpresaId, cod, desc) {
  return {
    type: "@cadastro/CENTRO_CUSTO_REQUEST",
    payload: { EmpresaId, cod, desc }
  };
}
export function CentroCustoUpdate(id, cod, desc) {
  return {
    type: "@update/CENTRO_CUSTO_REQUEST",
    payload: { id, cod, desc }
  };
}
//----------------------------------------------------
//----------------------------------------------------
export function EmailParamsUpdate(
  id,
  EmpresaId,
  bccEmailOrc,
  bccEmailRev,
  bccEmailFat,
  bccEmailCRM,
  fromEmailOrc,
  fromEmailRev,
  fromEmailFat,
  fromEmailCRM
) {
  return {
    type: "@update/EMAIL_PARAMS_REQUEST",
    payload: {
      id,
      EmpresaId,
      bccEmailOrc,
      bccEmailRev,
      bccEmailFat,
      bccEmailCRM,
      fromEmailOrc,
      fromEmailRev,
      fromEmailFat,
      fromEmailCRM
    }
  };
}
//----------------------------------------------------
//----------------------------------------------------
