import { Switch, Redirect } from "react-router-dom";
import React from "react";
import Route from "./Route";

import signIn from "~/pages/signIn";
import singUp from "~/pages/signUp";
// import ClienteCadastro from "~/pages/Cliente";

import Dashboard from "~/pages/dashboard";

import ValidationForms from "~/views/forms/ValidationForms.jsx";
import ExtendedForms from "~/views/forms/ExtendedForms.jsx";

// -----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------
// -----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------
// -----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------
// -----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------
import ClienteUpdate from "~/views/forms/Update/Cliente/ClienteUpdate";
import CliContUpdate from "~/views/forms/Update/Cliente/CliContUpdate";
import CliCompUpdate from "~/views/forms/Update/Cliente/CliCompUpdate";
import cliRecDespUpdate from "~/views/forms//Update/Cliente/cliRecDespUpdate";

import CadastroCliente from "~/views/forms/CadastroCliente";
import CliCompCadastro from "~/views/forms/Cliente/CliCompCadastro";
import CliContCadastro from "~/views/forms/Cliente/CliContCadastro";
import CliRecDespCadastro from "~/views/forms/Cliente/CliRecDespCadastro";

import ColabUpdate from "~/views/forms/Update/Colab/ColabUpdate";
import ColabCompUpdate from "~/views/forms/Update/Colab/ColabCompUpdate";
import ColabCadastro from "~/views/forms/Colab/ColabCadastro";
import ColabCompCadastro from "~/views/forms/Colab/ColabCompCadastro";

import AreaUpdate from "~/views/forms/Update/General/AreaUpdate";
import AreaCadastro from "~/views/forms/AreaCadastro";
import EmpresaUpdate from "~/views/forms/Update/General/EmpresaUpdate";
import EmpresaCadastro from "~/views/forms/EmpresaCadastro";
import FornecUpdate from "~/views/forms/Update/General/FornecUpdate";
import FornecCadastro from "~/views/forms/FornecCadastro";
import ItmControleUpdate from "~/views/forms/Update/General/ItmControleUpdate";
import ItmControleCadastro from "~/views/forms/ItmControleCadastro";
import ParametrosUpdate from "~/views/forms/Update/General/ParametrosUpdate";
import ParametrosCadastro from "~/views/forms/ParametrosCadastro";
import ProdtUpdate from "~/views/forms/Update/General/ProdtUpdate";
import ProdtCadastro from "~/views/forms/ProdtCadastro";
import RepresentanteUpdate from "~/views/forms/Update/General/RepresentanteUpdate";
import RepresentanteCadastro from "~/views/forms/RepresentanteCadastro";
import SegmentoUpdate from "~/views/forms/Update/General/SegmentoUpdate";
import SegmentoCadastro from "~/views/forms/SegmentoCadastro";
import UndNegUpdate from "~/views/forms/Update/General/UndNegUpdate";
import UndNegCadastro from "~/views/forms/UndNegCadastro";

import RecDespUpdate from "~/views/forms/Update/General/RecDespUpdate";
import RecDespCadastro from "~/views/forms/RecDespCadastro";
import condPgmtoUpdate from "~/views/forms/Update/auxUpdate/condPgmtoUpdate";
import condPgmtoCadastro from "~/views/forms/auxForm/condPgmtoCadastro";
import tipoComissUpdate from "~/views/forms/Update/auxUpdate/tipoComissUpdate";
import tipoComissCadastro from "~/views/forms/auxForm/tipoComissCadastro";
import perfilUpdate from "~/views/forms/Update/auxUpdate/perfilUpdate";
import perfilCadastro from "~/views/forms/auxForm/perfilCadastro";
// -----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------
// -----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------
// -----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------
// -----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------

// -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
// -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
// -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
// -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------

import Tabela_Cliente from "~/views/tables/Clientes/Tabela_Cliente.jsx";
import CliCompTable from "~/views/tables/Clientes/CliCompTable";
import CliContTable from "~/views/tables/Clientes/CliContTable";
import CliRecDespTable from "~/views/tables/Clientes/CliRecDespTable";

import ColabTable from "~/views/tables/Colab/ColabTable";
import colab from "~/views/tables/Colab/ColabCompTable";

import AreaTable from "~/views/tables/General/AreaTable";
import EmpresaTable from "~/views/tables/General/EmpresaTable";
import FornecTable from "~/views/tables/General/FornecTable";
import ItmControleTable from "~/views/tables/General/ItmControleTable";
import ParametrosTable from "~/views/tables/General/ParametrosTable";
import ProdtTable from "~/views/tables/General/ProdtTable";
import RepresentanteTable from "~/views/tables/General/RepresentanteTable";
import SegmentoTable from "~/views/tables/General/SegmentoTable";
import UndNegTable from "~/views/tables/General/UndNegTable";

import RecDespTable from "~/views/tables/auxTables/RecDespTable";
import condPgmtoTable from "~/views/tables/auxTables/condPgmtoTable";
import tipoComissTable from "~/views/tables/auxTables/tipoComissTable";
import perfilTable from "~/views/tables/auxTables/perfilTable";
// -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
// -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
// -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
// -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------

import OportTable from "~/views/tables/oportTables/oportTable";
import cotacaoTable from "~/views/tables/oportTables/cotacaoTable";
import CadastroOport from "~/views/forms/oportunidade/oportunidadeCadastro";
import updateOport from "~/views/forms/Update/oportunidades/oportUpdate";
import CotacaoCadastro from "~/views/forms/oportunidade/cotacaoCadastro";
import cotacaoUpdate from "~/views/forms/Update/oportunidades/cotacaoUpdate";
import RecursoTable from "~/views/tables/oportTables/recursoTable";
import RecursoCadastro from "~/views/forms/oportunidade/recursoCadastro";
import RecursoUpdate from "~/views/forms/Update/oportunidades/recursoUpdate";
import prospectTable from "~/views/tables/Clientes/prospectTable";
import WizardCadastro from "~/views/forms/wizardTeste";
import WizardFornec from "~/views/forms/wizardFornec";
import WizardColab from "~/views/forms/wizardColab";
import ParcelaTable from "~/views/tables/oportTables/parcelaTable";
import ParcelaCadastro from "~/views/forms/oportunidade/parcelaCadastro";
import parcUpdate from "~/views/forms/Update/oportunidades/parcUpdate";
import parcNotaFiscal from "~/views/forms/Update/oportunidades/parcNotaFiscal";
import ApontTable from "~/views/tables/apontamentos/tabelaApont";
import HorasCadastro from "~/views/forms/apontamentos/apontamentoHoras";
import HorasUpdate from "~/views/forms/Update/apontamentos/horasUpdate";
import HorasTable from "~/views/tables/apontamentos/tabelaHora";
import DespesaCadastro from "~/views/forms/apontamentos/apontamentoDespesas";
import DespesaTable from "~/views/tables/apontamentos/tabelaDespesa";
import DespesaUpdate from "~/views/forms/Update/apontamentos/despesasUpdate";
import DataOport from "~/views/forms/oportunidade/oportunidadeData";

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" exact component={signIn} />
      <Route path="/register" component={singUp} />
      <Route path="/dashboard" component={Dashboard} />
      {/* //---------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------*/}
      {/** CLIENTE */}
      <Route path="/tabelas/cliente/cliente" component={Tabela_Cliente} />
      <Route path="/tabelas/cliente/prospect" component={prospectTable} />
      <Route path="/cadastro/wizard/empresa" component={WizardCadastro} />
      <Route path="/cadastro/wizard/fornec" component={WizardFornec} />
      <Route path="/cadastro/wizard/colab" component={WizardColab} />
      <Route path="/tabelas/cliente/comp/:id" component={CliCompTable} />
      <Route path="/tabelas/cliente/cont/:id" component={CliContTable} />
      <Route path="/tabelas/cliente/rec_desp/:id" component={CliRecDespTable} />
      <Route path="/tabelas/colab" component={ColabTable} exact />
      <Route exact path="/tables/colab/comp/:id" component={colab} />
      <Route path="/tabelas/general/area" component={AreaTable} />
      <Route path="/tabelas/general/empresa" component={EmpresaTable} />
      <Route path="/tabelas/general/fornec" component={FornecTable} />
      <Route
        path="/tabelas/general/itm_controle"
        component={ItmControleTable}
      />
      <Route path="/tabelas/general/parametros" component={ParametrosTable} />
      <Route path="/tabelas/general/prodt" component={ProdtTable} />
      <Route
        path="/tabelas/general/representante"
        component={RepresentanteTable}
      />
      <Route path="/tabelas/general/segmento" component={SegmentoTable} />
      <Route path="/tabelas/general/und_neg" component={UndNegTable} />
      <Route path="/tabelas/aux/rec_desp" component={RecDespTable} />
      <Route path="/tabelas/aux/condPgmto" component={condPgmtoTable} />
      <Route path="/tabelas/aux/tipoComiss" component={tipoComissTable} />
      <Route path="/tabelas/aux/perfil" component={perfilTable} />
      <Route path="/tabelas/oportunidade/oport" component={OportTable} />
      <Route
        path="/tabelas/oportunidade/cotacao/:id"
        component={cotacaoTable}
      />
      <Route path="/view/oportunidade/dados/:id" component={DataOport} />
      <Route
        path="/tabelas/apontamentos/oportunidades/"
        component={ApontTable}
      />
      <Route
        path="/tabelas/apontamentos/despesas/:id"
        component={DespesaTable}
      />
      <Route path="/tabelas/apontamentos/horas/:id" component={HorasTable} />
      {/* //---------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------*/}
      {/** CLIENTE */}
      <Route path="/validation-forms" component={ValidationForms} />
      <Route path="/extended-forms" component={ExtendedForms} />
      {/* //---------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------*/}
      {/** CLIENTE */}
      <Route path="/cliente_cadastro/:prospect" component={CadastroCliente} />
      <Route path="/cliente_update/:id/:prct?" component={ClienteUpdate} />
      <Route path="/cadastro/cliente/comp/:id" component={CliCompCadastro} />
      <Route path="/cliente/comp_update/:id" component={CliCompUpdate} />
      <Route path="/cadastro/cliente/cont/:id" component={CliContCadastro} />
      <Route path="/cliente/cont_update/:id" component={CliContUpdate} />
      <Route
        path="/cadastro/cliente/rec_desp/:id"
        component={CliRecDespCadastro}
      />
      <Route path="/update/cliente/rec_desp/:id" component={cliRecDespUpdate} />
      {/** CLIENTE FIM */}
      {/* COLAB */}
      <Route path="/cadastro/colab/colab" component={ColabCadastro} />{" "}
      <Route path="/colab/update/:id" component={ColabUpdate} />
      <Route path="/cadastro/colab/comp/:id" component={ColabCompCadastro} />
      <Route path="/colab/comp/update/:id" component={ColabCompUpdate} />
      {/** COLAB FIM */}
      <Route path="/cadastro/geral/area" component={AreaCadastro} />
      <Route path="/update/general/area/:id" component={AreaUpdate} />
      <Route path="/cadastro/geral/empresa" component={EmpresaCadastro} />
      <Route path="/update/general/empresa/:id" component={EmpresaUpdate} />
      <Route path="/cadastro/geral/fornec" component={FornecCadastro} />
      <Route path="/update/general/fornec/:id" component={FornecUpdate} />
      <Route
        path="/cadastro/geral/itm_controle"
        component={ItmControleCadastro}
      />
      <Route
        path="/update/general/itm_controle/:id"
        component={ItmControleUpdate}
      />
      <Route path="/cadastro/geral/parametros" component={ParametrosCadastro} />
      <Route
        path="/update/general/parametros/:id"
        component={ParametrosUpdate}
      />
      <Route path="/cadastro/geral/prodt" component={ProdtCadastro} />
      <Route path="/update/general/prodt/:id" component={ProdtUpdate} />
      <Route path="/cadastro/geral/rec_desp" component={RecDespCadastro} />
      <Route path="/cadastro/aux/condPgmto" component={condPgmtoCadastro} />
      <Route path="/update/aux/condPgmto/:id" component={condPgmtoUpdate} />
      <Route path="/cadastro/aux/tipoComiss" component={tipoComissCadastro} />
      <Route path="/update/aux/tipoComiss/:id" component={tipoComissUpdate} />
      <Route path="/cadastro/aux/perfil" component={perfilCadastro} />
      <Route path="/update/aux/perfil/:id" component={perfilUpdate} />
      <Route path="/update/general/rec_desp/:id" component={RecDespUpdate} />
      <Route
        path="/cadastro/geral/represent"
        component={RepresentanteCadastro}
      />
      <Route
        path="/update/general/represent/:id"
        component={RepresentanteUpdate}
      />
      <Route path="/cadastro/geral/sgmet" component={SegmentoCadastro} />
      <Route path="/update/general/segmento/:id" component={SegmentoUpdate} />
      <Route path="/cadastro/geral/und_neg" component={UndNegCadastro} />
      <Route path="/update/general/und_neg/:id" component={UndNegUpdate} />
      <Route path="/cadastro/oportunidade/oport" component={CadastroOport} />
      <Route path="/update/oportunidade/oport/:id" component={updateOport} />
      <Route
        path="/cadastro/oportunidade/cotacao/:id"
        component={CotacaoCadastro}
      />
      <Route
        path="/update/oportunidade/cotacao/:id"
        component={cotacaoUpdate}
      />
      <Route
        path="/tabelas/oportunidade/recurso/:id"
        component={RecursoTable}
      />
      <Route
        path="/cadastro/oportunidade/recurso/:id"
        component={RecursoCadastro}
      />
      <Route
        path="/update/oportunidade/recurso/:id"
        component={RecursoUpdate}
      />
      <Route
        path="/tabelas/oportunidade/parcela/:id"
        component={ParcelaTable}
      />
      <Route
        path="/cadastro/oportunidade/parcela/:id"
        component={ParcelaCadastro}
      />
      <Route path="/update/oportunidade/parc/:id" component={parcUpdate} />
      <Route
        path="/update/oportunidade/parcNota/:id"
        component={parcNotaFiscal}
      />
      <Route
        path="/update/oportunidade/recurso/:id"
        component={RecursoUpdate}
      />
      <Route
        path="/cadastro/apontamentos/horas/:id"
        component={HorasCadastro}
      />
      <Route path="/update/apontamentos/horas/:id" component={HorasUpdate} />
      <Route
        path="/cadastro/apontamentos/despesas/:id"
        component={DespesaCadastro}
      />
      <Route
        path="/update/apontamentos/despesas/:id"
        component={DespesaUpdate}
      />
      {/* //---------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------*/}
      <Redirect from="/" to="/login" />
    </Switch>
  );
}

/* {
  path: "/dashboard",
  name: "Dashboard",
  rtlName: "لوحة القيادة",
  icon: "tim-icons icon-chart-pie-36",
  component: Dashboard,
  layout: "/admin"
},
name={dashboard} icon={} layout={"/admin"} */
