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

//  {
//   EmpresaId: int,
//   ColabId: int,
//   ClienteId: int,
//   UndNegId: int,
//   RecDespId: int,
//   SegmentoId: int,
//   RepresentanteId: int,
//   CampanhaId: int,
//   contato: int,
//   data: dataOnly,
//   fase: int,
//   cod: str,
//   desc: str,
//   narrativa: str
//  }
export function oportRequest(data) {
  return {
    type: "@cadastro/OPORT_REQUEST",
    payload: data
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
// {
//   id: int,
//   OportunidadeId: int,
//   parcela: int,
//   vlrParcela: int,
//   dtEmissao: date,
//   dtVencimento: date,
//   notaFiscal: str,
//   pedidoCliente: str,
//   situacao: int,
//   dtLiquidacao: date,
//   vlrPago: int,
//   saldo: int
// }

export function parcelaUpdate(data) {
  return {
    type: "@update/PARCELA_REQUEST",
    payload: data
  };
}

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
// {
//   id: int,
//   OportunidadeId: int,
//   parcela: int,
//   vlrParcela: int,
//   dtEmissao: date,
//   dtVencimento: date,
//   notaFiscal: str,
//   pedidoCliente: str,
//   situacao: int,
//   dtLiquidacao: date,
//   vlrPago: int,
//   saldo: int
//   idColab: int,
//   idCliente: int,
//   idRecDesp: int,
//   idEmpresa: int
// }
export function faturaParcela(data) {
  return {
    type: "@update/PARCELA_FATURA",
    payload: data
  };
}

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

export function pagamentoParcela(data) {
  return {
    type: "@update/PARCELA_PGMTO",
    payload: data
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
  RecursoId,
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
      RecursoId,
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
  RecursoId,
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
      RecursoId,
      desc,
      apontDiff
    }
  };
}

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

// {
//   OportunidadeId: int,
//   ColabId: int,
//   RecDespId: int,
//   dataDespesa: dateonly,
//   tipoDespesa: int,
//   valorDespesa: float,
//   desc: str
// }
export function despesaRequest(data) {
  return {
    type: "@cadastro/DESPESA_REQUEST",
    payload: data
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
