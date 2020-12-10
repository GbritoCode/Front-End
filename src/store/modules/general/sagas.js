import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history.js";
import api from "~/services/api.js";

import { requestFailure, ClienteUpdateSuccess } from "./actions.js";

export function* areaCadastro({ payload }) {
  try {
    const { EmpresaId, descArea } = payload;
    yield call(api.post, "area", {
      EmpresaId,
      descArea,
    });
    history.push("/tabelas/general/area");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateArea({ payload }) {
  try {
    const { id, EmpresaId, descArea } = payload;

    const Colab = Object.assign({
      EmpresaId,
      descArea,
    });

    const response = yield call(api.put, `area/${id}`, Colab);

    history.push("/tabelas/general/area");
    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* empresaCadastro({ payload }) {
  try {
    const { idFederal, nome, license, UserId, first } = payload;
    yield call(api.post, "empresa", {
      idFederal,
      nome,
      license,
      UserId,
    });
    if (first === true) {
      history.push("/cadastro/wizard/fornec");
    } else {
      if (first === false) {
        history.push("/tabelas/general/empresa");
      }
    }
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateEmpresa({ payload }) {
  try {
    const { id, idFederal, nome, license, UserId } = payload;

    const Colab = Object.assign({
      idFederal,
      nome,
      license,
      UserId,
    });

    const response = yield call(api.put, `empresa/${id}`, Colab);

    history.push("/tabelas/general/empresa");
    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* fornecCadastro({ payload }) {
  try {
    const {
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
    } = payload;
    yield call(api.post, "fornec", {
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
    });
    if (first === false) {
      history.push("/tabelas/general/fornec");
    } else {
      if (first === true) {
        history.push("/cadastro/wizard/colab");
      }
    }
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateFornec({ payload }) {
  try {
    const {
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
    } = payload;

    const Colab = Object.assign({
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
    });

    const response = yield call(api.put, `fornec/${id}`, Colab);

    history.push("/tabelas/general/fornec");
    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* itmControleCadastro({ payload }) {
  try {
    const { EmpresaId, descItem, tipoItem, contaContabil, centCusto } = payload;
    yield call(api.post, "itm_controle", {
      EmpresaId,
      descItem,
      tipoItem,
      contaContabil,
      centCusto,
    });
    history.push("/tabelas/general/itm_controle");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateItmControle({ payload }) {
  try {
    const {
      id,
      EmpresaId,
      descItem,
      tipoItem,
      contaContabil,
      centCusto,
    } = payload;

    const Colab = Object.assign({
      EmpresaId,
      descItem,
      tipoItem,
      contaContabil,
      centCusto,
    });

    const response = yield call(api.put, `itm_controle/${id}`, Colab);

    history.push("/tabelas/general/itm_controle");
    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* parametrosCadastro({ payload }) {
  try {
    const {
      EmpresaId,
      impostos,
      vlrMinHr,
      vlrBsHr,
      vlrBsDesp,
      adiantaPgmto,
      percAdiantaPgmto,
    } = payload;
    yield call(api.post, "parametros", {
      EmpresaId,
      impostos,
      vlrMinHr,
      vlrBsHr,
      vlrBsDesp,
      adiantaPgmto,
      percAdiantaPgmto,
    });
    history.push("/tabelas/general/parametros");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateParametros({ payload }) {
  try {
    const {
      id,
      EmpresaId,
      impostos,
      vlrMinHr,
      vlrBsHr,
      vlrBsDesp,
      adiantaPgmto,
      percAdiantaPgmto,
    } = payload;

    const Colab = Object.assign({
      EmpresaId,
      impostos,
      vlrMinHr,
      vlrBsHr,
      vlrBsDesp,
      adiantaPgmto,
      percAdiantaPgmto,
    });

    const response = yield call(api.put, `parametros/${id}`, Colab);

    history.push("/tabelas/general/parametros");
    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* prodtCadastro({ payload }) {
  try {
    const { EmpresaId, descProdt } = payload;
    yield call(api.post, "prodt", {
      EmpresaId,
      descProdt,
    });
    history.push("/tabelas/general/prodt");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateProdt({ payload }) {
  try {
    const { id, EmpresaId, descProdt } = payload;

    const Colab = Object.assign({
      EmpresaId,
      descProdt,
    });

    const response = yield call(api.put, `prodt/${id}`, Colab);

    history.push("/tabelas/general/prodt");
    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* recDespCadastro({ payload }) {
  try {
    const { EmpresaId, ItmControleId, desc, recDesp } = payload;
    yield call(api.post, "rec_desp", {
      EmpresaId,
      ItmControleId,
      desc,
      recDesp
    });
    history.push("/tabelas/aux/rec_desp");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateRecDesp({ payload }) {
  try {
    const { id, EmpresaId, ItmControleId, desc, recDesp } = payload;

    const Colab = Object.assign({
      EmpresaId,
      ItmControleId,
      desc,
      recDesp
    });

    const response = yield call(api.put, `rec_desp/${id}`, Colab);

    history.push("/tabelas/aux/rec_desp");
    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* condPgmtoCadastro({ payload }) {
  try {
    const { EmpresaId, cod, desc, diasPrazo, first } = payload;
    yield call(api.post, "condPgmto", {
      EmpresaId,
      cod,
      desc,
      diasPrazo,
      first,
    });
    if (first === false) {
      history.push("/tabelas/aux/condPgmto");
    }
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateCondPgmto({ payload }) {
  try {
    const { id, EmpresaId, cod, desc, diasPrazo } = payload;

    const Colab = Object.assign({
      EmpresaId,
      cod,
      desc,
      diasPrazo,
    });

    const response = yield call(api.put, `condPgmto/${id}`, Colab);

    history.push("/tabelas/aux/condPgmto");
    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* tipoComissCadastro({ payload }) {
  try {
    const { EmpresaId, desc, prcnt, bsComiss } = payload;
    yield call(api.post, "tipoComiss", {
      EmpresaId,
      desc,
      prcnt,
      bsComiss
    });
    history.push("/tabelas/aux/tipoComiss");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateTipoComiss({ payload }) {
  try {
    const { id, EmpresaId, desc, prcnt, bsComiss } = payload;

    const Colab = Object.assign({
      EmpresaId,
      desc,
      prcnt,
      bsComiss
    });

    const response = yield call(api.put, `tipoComiss/${id}`, Colab);

    history.push("/tabelas/aux/tipoComiss");
    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* perfilCadastro({ payload }) {
  try {
    const { EmpresaId, desc, first } = payload;
    yield call(api.post, "perfil", {
      EmpresaId,
      desc,
    });
    if (first === false) {
      history.push("/tabelas/aux/perfil");
    }
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updatePerfil({ payload }) {
  try {
    const { id, EmpresaId, desc } = payload;

    const Colab = Object.assign({
      EmpresaId,

      desc,
    });

    const response = yield call(api.put, `perfil/${id}`, Colab);

    history.push("/tabelas/aux/perfil");
    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export function* representanteCadastro({ payload }) {
  try {
    const { EmpresaId, nome, TipoComisseId, vlrFixMens } = payload;
    yield call(api.post, "representante", {
      EmpresaId,
      nome,
      TipoComisseId,
      vlrFixMens,
    });
    history.push("/tabelas/general/representante");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateRepresentante({ payload }) {
  try {
    const { id, EmpresaId, nome, TipoComisseId, vlrFixMens } = payload;

    const Colab = Object.assign({
      EmpresaId,
      nome,
      TipoComisseId,
      vlrFixMens,
    });

    const response = yield call(api.put, `representante/${id}`, Colab);

    history.push("/tabelas/general/representante");
    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export function* segmentoCadastro({ payload }) {
  try {
    const { EmpresaId, UndNegId, ProdutoId, AreaId, descSegmt } = payload;
    yield call(api.post, "segmento", {
      EmpresaId,
      UndNegId,
      ProdutoId,
      AreaId,
      descSegmt,
    });
    history.push("/tabelas/general/segmento");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateSegmento({ payload }) {
  try {
    const { id, EmpresaId, UndNegId, ProdutoId, AreaId, descSegmt } = payload;

    const Colab = Object.assign({
      EmpresaId,
      UndNegId,
      ProdutoId,
      AreaId,
      descSegmt,
    });

    const response = yield call(api.put, `segmento/${id}`, Colab);

    history.push("/tabelas/general/segmento");
    toast.success("Atualizado com Sucesso");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export function* undNegCadastro({ payload }) {
  try {
    const { EmpresaId, descUndNeg } = payload;
    yield call(api.post, "und_neg", {
      EmpresaId,
      descUndNeg,
    });
    history.push("/tabelas/general/und_neg");
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
export function* updateUndNeg({ payload }) {
  try {
    const { id, EmpresaId, descUndNeg } = payload;

    const Colab = Object.assign({
      EmpresaId,
      descUndNeg,
    });

    const response = yield call(api.put, `und_neg/${id}`, Colab);

    toast.success("Atualizado com Sucesso");
    history.push("/tabelas/general/Und_neg");
    yield put(ClienteUpdateSuccess(response.data));
  } catch (err) {
    toast.error("Ops! Algo deu errado");
    yield put(requestFailure());
  }
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

export default all([
  takeLatest("@cadastro/AREA_REQUEST", areaCadastro),
  takeLatest("@update/AREA_REQUEST", updateArea),
  takeLatest("@cadastro/EMPRESA_REQUEST", empresaCadastro),
  takeLatest("@update/EMPRESA_REQUEST", updateEmpresa),
  takeLatest("@cadastro/FORNEC_REQUEST", fornecCadastro),
  takeLatest("@update/FORNEC_REQUEST", updateFornec),
  takeLatest("@cadastro/ITM_CONTROLE_REQUEST", itmControleCadastro),
  takeLatest("@update/ITM_CONTROLE_REQUEST", updateItmControle),
  takeLatest("@cadastro/PARAMETROS_REQUEST", parametrosCadastro),
  takeLatest("@update/PARAMETROS_REQUEST", updateParametros),
  takeLatest("@cadastro/PRODT_REQUEST", prodtCadastro),
  takeLatest("@update/PRODUTO_REQUEST", updateProdt),
  takeLatest("@cadastro/REC_DESP_REQUEST", recDespCadastro),
  takeLatest("@update/REC_DESP_REQUEST", updateRecDesp),
  takeLatest("@cadastro/REPRESENTANTE_REQUEST", representanteCadastro),
  takeLatest("@update/REPRESENTANTE_REQUEST", updateRepresentante),
  takeLatest("@cadastro/UndNeg_REQUEST", undNegCadastro),
  takeLatest("@update/UndNeg_REQUEST", updateUndNeg),
  takeLatest("@cadastro/SEGMENTO_REQUEST", segmentoCadastro),
  takeLatest("@update/SEGMENTO_REQUEST", updateSegmento),
  takeLatest("@cadastro/COND_PGMTO_REQUEST", condPgmtoCadastro),
  takeLatest("@update/COND_PGMTO_REQUEST", updateCondPgmto),
  takeLatest("@cadastro/TIPO_COMISS_REQUEST", tipoComissCadastro),
  takeLatest("@update/TIPO_COMISS_REQUEST", updateTipoComiss),
  takeLatest("@cadastro/PERFIL_REQUEST", perfilCadastro),
  takeLatest("@update/PERFIL_REQUEST", updatePerfil),
]);
