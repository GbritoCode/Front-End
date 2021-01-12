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
  RecDespId,
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
      RecDespId,
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
  RecDespId,
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
      RecDespId,
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
  OportunidadeId,
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
      OportunidadeId,
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
  OportunidadeId,
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
      OportunidadeId,
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
  OportunidadeId,
  ColabId,
  tipoValor,
  tipoAtend,
  custoPrev,
  dataInclusao,
  hrsPrevst,
  colabVlrHr
) {
  return {
    type: "@cadastro/RECURSO_REQUEST",
    payload: {
      OportunidadeId,
      ColabId,
      tipoValor,
      tipoAtend,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr
    }
  };
}

export function recursoUpdate(
  id,
  OportunidadeId,
  ColabId,
  tipoValor,
  tipoAtend,
  custoPrev,
  dataInclusao,
  hrsPrevst,
  colabVlrHr
) {
  return {
    type: "@update/RECURSO_REQUEST",
    payload: {
      id,
      OportunidadeId,
      ColabId,
      tipoValor,
      tipoAtend,
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
  OportunidadeId,
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
      OportunidadeId,
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
  OportunidadeId,
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
      OportunidadeId,
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

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

export function horaRequest(
  OportunidadeId,
  ColabId,
  dataAtivd,
  horaInic,
  horaIntrv,
  horaFim,
  dataLancamento,
  totalApont,
  solicitante,
  AreaId,
  desc
) {
  return {
    type: "@cadastro/HORA_REQUEST",
    payload: {
      OportunidadeId,
      ColabId,
      dataAtivd,
      horaInic,
      horaIntrv,
      horaFim,
      dataLancamento,
      totalApont,
      solicitante,
      AreaId,
      desc
    }
  };
}

export function horaUpdate(
  id,
  OportunidadeId,
  ColabId,
  dataAtivd,
  horaInic,
  horaIntrv,
  horaFim,
  dataLancamento,
  totalApont,
  solicitante,
  AreaId,
  desc,
  apontDiff
) {
  return {
    type: "@update/HORA_REQUEST",
    payload: {
      id,
      OportunidadeId,
      ColabId,
      dataAtivd,
      horaInic,
      horaIntrv,
      horaFim,
      dataLancamento,
      totalApont,
      solicitante,
      AreaId,
      desc,
      apontDiff
    }
  };
}

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

export function despesaRequest(
  OportunidadeId,
  ColabId,
  dataDespesa,
  tipoDespesa,
  valorDespesa,
  desc
) {
  return {
    type: "@cadastro/DESPESA_REQUEST",
    payload: {
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc
    }
  };
}

export function despesaUpdate(
  id,
  OportunidadeId,
  ColabId,
  dataDespesa,
  tipoDespesa,
  valorDespesa,
  desc
) {
  return {
    type: "@update/DESPESA_REQUEST",
    payload: {
      id,
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc
    }
  };
}
