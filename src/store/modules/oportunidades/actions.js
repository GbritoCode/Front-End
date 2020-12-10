export function signFailure() {
  return {
    type: "@cadastro/CADASTRO_FALHA"
  };
}
export function UpdateSuccess(profile) {
  return {
    type: "@update/REQUEST_SUCCES",
    payload: { profile }
  };
}

export function oportRequest(
  EmpresaId,
  ColabId,
  ClienteId,
  UndNegId,
  ItmControleId,
  SegmentoId,
  RepresentanteId,
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
      ColabId,
      ClienteId,
      UndNegId,
      ItmControleId,
      SegmentoId,
      RepresentanteId,
      contato,
      data,
      fase,
      cod,
      desc,
      narrativa
    }
  };
}

export function oportUpdate(
  id,
  EmpresaId,
  ColabId,
  ClienteId,
  UndNegId,
  ItmControleId,
  SegmentoId,
  RepresentanteId,
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
      ColabId,
      ClienteId,
      UndNegId,
      ItmControleId,
      SegmentoId,
      RepresentanteId,
      contato,
      data,
      fase,
      cod,
      desc,
      narrativa
    }
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
    }
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
    }
  };
}

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

export function recursoReqest(
  oportunidadeId,
  ColabId,
  custoPrev,
  dataInclusao,
  hrsPrevst,
  colabVlrHr
) {
  return {
    type: "@cadastro/RECURSO_REQUEST",
    payload: {
      oportunidadeId,
      ColabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr
    }
  };
}

export function recursoUpdate(
  id,
  oportunidadeId,
  ColabId,
  custoPrev,
  dataInclusao,
  hrsPrevst,
  colabVlrHr
) {
  return {
    type: "@update/RECURSO_REQUEST",
    payload: {
      id,
      oportunidadeId,
      ColabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr
    }
  };
}

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

export function parcelaReqest(
  oportunidadeId,
  parcela,
  vlrParcela,
  dtEmissao,
  dtVencimento,
  notaFiscal,
  pedidoCliente,
  situacao,
  dtLiquidacao,
  vlrPago,
  saldo
) {
  return {
    type: "@cadastro/PARCELA_REQUEST",
    payload: {
      oportunidadeId,
      parcela,
      vlrParcela,
      dtEmissao,
      dtVencimento,
      notaFiscal,
      pedidoCliente,
      situacao,
      dtLiquidacao,
      vlrPago,
      saldo
    }
  };
}

export function parcelaUpdate(
  id,
  oportunidadeId,
  parcela,
  vlrParcela,
  dtEmissao,
  dtVencimento,
  notaFiscal,
  pedidoCliente,
  situacao,
  dtLiquidacao,
  vlrPago,
  saldo
) {
  return {
    type: "@update/PARCELA_REQUEST",
    payload: {
      id,
      oportunidadeId,
      parcela,
      vlrParcela,
      dtEmissao,
      dtVencimento,
      notaFiscal,
      pedidoCliente,
      situacao,
      dtLiquidacao,
      vlrPago,
      saldo
    }
  };
}
