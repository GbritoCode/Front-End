export function requestFailure() {
  return { type: "@cadastro/REQUEST_FAIL" };
}
export function ClienteUpdateSuccess(profile) {
  return {
    type: "@update/CLIENTE_REQUEST_SUCCES",
    payload: { profile },
  };
}

export function areaRequest(EmpresaId, desc_area) {
  return {
    type: "@cadastro/AREA_REQUEST",
    payload: { EmpresaId, desc_area },
  };
}
export function AreaUpdate(id, EmpresaId, desc_area) {
  return {
    type: "@update/AREA_REQUEST",
    payload: { id, EmpresaId, desc_area },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function empresaRequest(id_federal, nome, license, UserId) {
  return {
    type: "@cadastro/EMPRESA_REQUEST",
    payload: { id_federal, nome, license, UserId },
  };
}
export function EmpresaUpdate(id, Id_federal, nome, license, UserId) {
  return {
    type: "@update/EMPRESA_REQUEST",
    payload: { id, Id_federal, nome, license, UserId },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function fornecRequest(
  CNPJ,
  EmpresaId,
  nome,
  cond_pgmto,
  nome_conta,
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
    type: "@cadastro/FORNEC_REQUEST",
    payload: {
      CNPJ,
      EmpresaId,
      nome,
      cond_pgmto,
      nome_conta,
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
export function FornecUpdate(
  id,
  CNPJ,
  EmpresaId,
  nome,
  cond_pgmto,
  nome_conta,
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
      cond_pgmto,
      nome_conta,
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
  desc_item,
  tipo_item,
  conta_contabil,
  cent_custo
) {
  return {
    type: "@cadastro/ITM_CONTROLE_REQUEST",
    payload: {
      EmpresaId,
      desc_item,
      tipo_item,
      conta_contabil,
      cent_custo,
    },
  };
}
export function itmControleUpdate(
  id,
  EmpresaId,
  desc_item,
  tipo_item,
  conta_contabil,
  cent_custo
) {
  return {
    type: "@update/ITM_CONTROLE_REQUEST",
    payload: {
      id,
      EmpresaId,
      desc_item,
      tipo_item,
      conta_contabil,
      cent_custo,
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function parametrosRequest(
  EmpresaId,
  impostos,
  vlr_min_hr,
  vlr_bs_hr,
  vlr_bs_desp,
  adianta_pgmto,
  perc_adianta_pgmto
) {
  return {
    type: "@cadastro/PARAMETROS_REQUEST",
    payload: {
      EmpresaId,
      impostos,
      vlr_min_hr,
      vlr_bs_hr,
      vlr_bs_desp,
      adianta_pgmto,
      perc_adianta_pgmto,
    },
  };
}
export function ParametrosUpdate(
  id,
  EmpresaId,
  impostos,
  vlr_min_hr,
  vlr_bs_hr,
  vlr_bs_desp,
  adianta_pgmto,
  perc_adianta_pgmto
) {
  return {
    type: "@update/PARAMETROS_REQUEST",
    payload: {
      id,
      EmpresaId,
      impostos,
      vlr_min_hr,
      vlr_bs_hr,
      vlr_bs_desp,
      adianta_pgmto,
      perc_adianta_pgmto,
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function prodtRequest(EmpresaId, desc_prodt) {
  return {
    type: "@cadastro/PRODT_REQUEST",
    payload: {
      EmpresaId,
      desc_prodt,
    },
  };
}
export function ProdtUpdate(id, EmpresaId, desc_prodt) {
  return {
    type: "@update/PRODUTO_REQUEST",
    payload: {
      id,
      EmpresaId,
      desc_prodt,
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function recDespRequest(EmpresaId, nome, license) {
  return {
    type: "@cadastro/REC_DESP_REQUEST",
    payload: {
      EmpresaId,
      nome,
      license,
    },
  };
}
export function RecDespUpdate(id, EmpresaId, nome, license) {
  return {
    type: "@update/REC_DESP_REQUEST",
    payload: {
      id,
      EmpresaId,
      nome,
      license,
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function representanteRequest(
  EmpresaId,
  nome,
  percnt_comiss,
  vlr_fix_mens
) {
  return {
    type: "@cadastro/REPRESENTANTE_REQUEST",
    payload: {
      EmpresaId,
      nome,
      percnt_comiss,
      vlr_fix_mens,
    },
  };
}
export function RepresentanteUpdate(
  id,
  EmpresaId,
  nome,
  percnt_comiss,
  vlr_fix_mens
) {
  return {
    type: "@update/REPRESENTANTE_REQUEST",
    payload: {
      id,
      EmpresaId,
      nome,
      percnt_comiss,
      vlr_fix_mens,
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function undNegRequest(EmpresaId, desc_und_neg) {
  return {
    type: "@cadastro/UND_NEG_REQUEST",
    payload: {
      EmpresaId,
      desc_und_neg,
    },
  };
}
export function UndNegUpdate(id, EmpresaId, desc_und_neg) {
  return {
    type: "@update/UND_NEG_REQUEST",
    payload: {
      id,
      EmpresaId,
      desc_und_neg,
    },
  };
}
//----------------------------------------------------
//----------------------------------------------------

export function segmentoRequest(
  EmpresaId,
  Und_negId,
  ProdutoId,
  AreaId,
  desc_segmt
) {
  return {
    type: "@cadastro/SEGMENTO_REQUEST",
    payload: {
      EmpresaId,
      Und_negId,
      ProdutoId,
      AreaId,
      desc_segmt,
    },
  };
}
export function SegmentoUpdate(
  id,
  EmpresaId,
  Und_negId,
  ProdutoId,
  AreaId,
  desc_segmt
) {
  return {
    type: "@update/SEGMENTO_REQUEST",
    payload: {
      id,
      EmpresaId,
      Und_negId,
      ProdutoId,
      AreaId,
      desc_segmt,
    },
  };
}

//----------------------------------------------------
//----------------------------------------------------
