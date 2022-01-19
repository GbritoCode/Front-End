export function signFailure() {
  return {
    type: "@cadastro/CADASTRO_FALHA"
  };
}
// {
//   RecDespId: DataTypes.INTEGER,
//   ColabCreate: DataTypes.INTEGER,
//   ColabLiqui: DataTypes.INTEGER,
//   FornecId: DataTypes.INTEGER,
//   ClienteId: DataTypes.INTEGER,
//   dataVenc: DataTypes.DATEONLY,
//   dataLiqui: DataTypes.DATEONLY,
//   status: DataTypes.INTEGER,
// },

export function movCaixaCadastro(data) {
  return {
    type: "@cadastro/MOV_CAIXA_REQUEST",
    payload: data
  };
}

export function movCaixaUpdate(data) {
  return {
    type: "@update/MOV_CAIXA_UPDATE",
    payload: data
  };
}
