export function signFailure() {
  return {
    type: "@cadastro/CADASTRO_FALHA",
  };
}
export function UpdateSuccess(profile) {
  return {
    type: "@update/REQUEST_SUCCES",
    payload: { profile },
  };
}

export function oportRequest(
  EmpresaId,
  colabId,
  clienteId,
  UndNegId,
  itmControleId,
  segmentoId,
  representanteId,
  contato,
  data,
  fase,
  cod,
  desc,
  narrativa
) {
  return {
    type: "@cadastro/OPORT_REQUEST",
    payload: {
      EmpresaId,
      colabId,
      clienteId,
      UndNegId,
      itmControleId,
      segmentoId,
      representanteId,
      contato,
      data,
      fase,
      cod,
      desc,
      narrativa
    },
  };
}

export function oportUpdate(
  id,
  EmpresaId,
  colabId,
  clienteId,
  UndNegId,
  itmControleId,
  segmentoId,
  representanteId,
  contato,
  data,
  fase,
  cod,
  desc,
  narrativa
) {
  return {
    type: "@update/OPORT_REQUEST",
    payload: {
      id,
      EmpresaId,
      colabId,
      clienteId,
      UndNegId,
      itmControleId,
      segmentoId,
      representanteId,
      contato,
      data,
      fase,
      cod,
      desc,
      narrativa
    },
  };
}
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

export function cotacaoRequest(
  EmpresaId,
  oportunidadeId,
  probVend,
  tipoCobranca,
  hrsPrevst,
  vlrProp,
  vlrDesc,
  vlrLiq,
  recLiq,
  prevLucro,
  numParcelas,
  motivo,
  desc
) {
  return {
    type: "@cadastro/COTACAO_REQUEST",
    payload: {
      EmpresaId,
      oportunidadeId,
      probVend,
      tipoCobranca,
      hrsPrevst,
      vlrProp,
      vlrDesc,
      vlrLiq,
      recLiq,
      prevLucro,
      numParcelas,
      motivo,
      desc
    },
  };
}

export function cotacaoUpdate(
  id,
  EmpresaId,
  oportunidadeId,
  probVend,
  tipoCobranca,
  hrsPrevst,
  vlrProp,
  vlrDesc,
  vlrLiq,
  recLiq,
  prevLucro,
  numParcelas,
  motivo,
  desc
) {
  return {
    type: "@update/COTACAO_REQUEST",
    payload: {
      id,
      EmpresaId,
      oportunidadeId,
      probVend,
      tipoCobranca,
      hrsPrevst,
      vlrProp,
      vlrDesc,
      vlrLiq,
      recLiq,
      prevLucro,
      numParcelas,
      motivo,
      desc
    },
  };
}

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

export function recursoReqest(
  oportunidadeId,
  colabId,
  custoPrev,
  dataInclusao,
  hrsPrevst,
  colabVlrHr,
) {
  return {
    type: "@cadastro/RECURSO_REQUEST",
    payload: {
      oportunidadeId,
      colabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
    }
  }
}

export function recursoUpdate(
  id,
  oportunidadeId,
  colabId,
  custoPrev,
  dataInclusao,
  hrsPrevst,
  colabVlrHr,
) {
  return {
    type: "@update/RECURSO_REQUEST",
    payload: {
      id,
      oportunidadeId,
      colabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
    },
  };
}