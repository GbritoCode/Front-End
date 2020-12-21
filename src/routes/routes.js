/*!

=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import signIn from "~/pages/signIn";

import Dashboard from "~/pages/dashboard";
import SignUp from "~/pages/signUp";

//----

// --------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
// --------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
// --------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
// --------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------

import ClienteUpdate from "~/views/forms/Update/Cliente/ClienteUpdate";
import CliContUpdate from "~/views/forms/Update/Cliente/CliContUpdate";
import CliCompUpdate from "~/views/forms/Update/Cliente/CliCompUpdate";
import CliRecDespUpdate from "~/views/forms/Update/Cliente/cliRecDespUpdate";

import CadastroCliente from "~/views/forms/CadastroCliente";
import CliCompCadastro from "~/views/forms/Cliente/CliCompCadastro";
import CliContCadastro from "~/views/forms/Cliente/CliContCadastro";
import CliRecDespCadastro from "~/views/forms/Cliente/CliRecDespCadastro";

import ColabUpdate from "~/views/forms/Update/Colab/ColabUpdate";
import ColabCadastro from "~/views/forms/Colab/ColabCadastro";
import ColabCompUpdate from "~/views/forms/Update/Colab/ColabCompUpdate";
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

import CadastroOport from "~/views/forms/oportunidade/oportunidadeCadastro";

import CotacaoCadastro from "~/views/forms/oportunidade/cotacaoCadastro";
import cotacaoUpdate from "~/views/forms/Update/oportunidades/cotacaoUpdate";

// --------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
// --------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
// --------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
// --------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------

//------------------------------------------------

// -------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
// -------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
// -------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
// -------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------

import Tabela_Cliente from "~/views/tables/Clientes/Tabela_Cliente.jsx";
import CliCompTable from "~/views/tables/Clientes/CliCompTable";
import CliContTable from "~/views/tables/Clientes/CliContTable";
import CliRecDespTable from "~/views/tables/Clientes/CliRecDespTable";

import ColabTable from "~/views/tables/Colab/ColabTable";
import ColabCompTable from "~/views/tables/Colab/ColabCompTable";

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

import UpdateOport from "~/views/forms/Update/oportunidades/oportUpdate";
import RecursoTable from "~/views/tables/oportTables/recursoTable";
import RecursoCadastro from "~/views/forms/oportunidade/recursoCadastro";
import RecursoUpdate from "~/views/forms/Update/oportunidades/recursoUpdate";
import prospectTable from "../views/tables/Clientes/prospectTable";
import WizardCadastro from "~/views/forms/wizardTeste";
import WizardFornec from "~/views/forms/wizardFornec";
import WizardColab from "~/views/forms/wizardColab";
import ParcelaCadastro from "~/views/forms/oportunidade/parcelaCadastro";
import ParcelaTable from "~/views/tables/oportTables/parcelaTable";
import parcUpdate from "~/views/forms/Update/oportunidades/parcUpdate";
import parcNotaFiscal from "~/views/forms/Update/oportunidades/parcNotaFiscal";
import HorasCadastro from "~/views/forms/apontamentos/apontamentoHoras";
import ApontTable from "~/views/tables/apontamentos/tabelaApont";
import DespesaTable from "~/views/tables/apontamentos/tabelaDespesa";
import DespesaCadastro from "~/views/forms/apontamentos/apontamentoDespesas";
import HorasTable from "~/views/tables/apontamentos/tabelaHora";
import HorasUpdate from "~/views/forms/Update/apontamentos/horasUpdate";
import DespesaUpdate from "~/views/forms/Update/apontamentos/despesasUpdate";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    mini: "L",
    component: signIn,
    layout: "/auth",
    invisible: true
  },
  {
    path: "/register",
    name: "Register",
    mini: "R",
    component: SignUp,
    layout: "/auth",
    invisible: true
  },
  // ------------Cadastros-----------------------------------------------------------------------------------------------------------------------
  // ------------Cadastros-----------------------------------------------------------------------------------------------------------------------
  // ------------Cadastros-----------------------------------------------------------------------------------------------------------------------
  // ------------Cadastros-----------------------------------------------------------------------------------------------------------------------
  // ------------Cadastros-----------------------------------------------------------------------------------------------------------------------
  {
    collapse: true,
    name: "Páginas de cadastro invisíveis",
    icon: "tim-icons icon-notes",
    state: "formsCollapse",
    invisible: true,
    views: [
      {
        path: "/cliente_cadastro/:prospect",
        name: "Cliente",
        mini: "RF",
        component: CadastroCliente,
        layout: "/admin"
      },
      {
        path: "/cliente_update/:id/:prct?",
        name: "Atualizar Cliente",
        mini: "RF",
        component: ClienteUpdate,
        layout: "/admin"
      },
      {
        path: "/cliente/cont_update/:id",
        name: "Atualizar Continuação do Cliente",
        mini: "RF",
        component: CliContUpdate,
        layout: "/admin"
      },
      {
        path: "/cliente/comp_update/:id",
        name: "Atualizar Complemento do Cliente",
        mini: "RF",
        component: CliCompUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/cliente/comp/:id",
        name: "Complemento de Cliente",
        mini: "RF",
        component: CliCompCadastro,
        layout: "/admin"
      },
      {
        path: "/cadastro/cliente/cont/:id",
        name: "Continuação do Cliente",
        mini: "RF",
        component: CliContCadastro,
        layout: "/admin"
      },
      {
        path: "/cadastro/cliente/rec_desp/:id",
        name: "Receitas/Despesas do Cliente",
        mini: "RF",
        component: CliRecDespCadastro,
        layout: "/admin"
      },
      {
        path: "/update/cliente/rec_desp/:id",
        name: "Receitas/Despesas do Cliente",
        mini: "RF",
        component: CliRecDespUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/colab/colab",
        name: "Colaborador",
        mini: "RF",
        component: ColabCadastro,
        layout: "/admin"
      },
      {
        path: "/colab/update/:id",
        name: "Editar Colaborador",
        mini: "RF",
        component: ColabUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/colab/comp/:id",
        name: "Complemento de Colaborador",
        mini: "RF",
        component: ColabCompCadastro,
        layout: "/admin"
      },
      {
        path: "/colab/comp/update/:id",
        name: "Editar Complemento do Colaborador",
        mini: "RF",
        component: ColabCompUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/area",
        name: "Área",
        mini: "RF",
        component: AreaCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/area/:id",
        name: "Editar Area",
        mini: "RF",
        component: AreaUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/empresa",
        name: "Empresa",
        mini: "RF",
        component: EmpresaCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/empresa/:id",
        name: "Editar Empresa",
        mini: "RF",
        component: EmpresaUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/Fornec",
        name: "Fornecedor",
        mini: "RF",
        component: FornecCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/fornec/:id",
        name: "Editar Fornecedor",
        mini: "RF",
        component: FornecUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/itm_controle",
        name: "Cadastro de Item Controle",
        mini: "RF",
        component: ItmControleCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/itm_controle/:id",
        name: "Editar Item Controle",
        mini: "RF",
        component: ItmControleUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/parametros",
        name: "Parametros",
        mini: "RF",
        component: ParametrosCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/parametros/:id",
        name: "Editar Parâmetros",
        mini: "RF",
        component: ParametrosUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/prodt",
        name: "Produto",
        mini: "RF",
        component: ProdtCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/prodt/:id",
        name: "Editar Produto",
        mini: "RF",
        component: ProdtUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/rec_desp",
        name: "Receitas/Despesas",
        mini: "RF",
        component: RecDespCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/rec_desp/:id",
        name: "Editar Receita/Despesa",
        mini: "RF",
        component: RecDespUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/aux/condPgmto",
        name: "Condições de pagamento",
        mini: "CPG",
        component: condPgmtoCadastro,
        layout: "/admin"
      },
      {
        path: "/update/aux/condPgmto/:id",
        name: "Condições de pagamento",
        mini: "CPG",
        component: condPgmtoUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/aux/tipoComiss",
        name: "Tipos de Comissão",
        mini: "CMS",
        component: tipoComissCadastro,
        layout: "/admin"
      },
      {
        path: "/update/aux/tipoComiss/:id",
        name: "Tipos de Comissão",
        mini: "CMS",
        component: tipoComissUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/aux/perfil",
        name: "Perfis",
        mini: "PRF",
        component: perfilCadastro,
        layout: "/admin"
      },
      {
        path: "/update/aux/perfil/:id",
        name: "Perfis",
        mini: "PRF",
        component: perfilUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/oportunidade/oport",
        name: "Oportunidades",
        mini: "OPT",
        component: CadastroOport,
        layout: "/admin"
      },
      {
        path: "/update/oportunidade/oport/:id",
        name: "Oportunidades",
        mini: "OPT",
        component: UpdateOport,
        layout: "/admin"
      },
      {
        path: "/cadastro/oportunidade/cotacao/:id",
        name: "Oportunidades",
        mini: "OPT",
        component: CotacaoCadastro,
        layout: "/admin"
      },
      {
        path: "/update/oportunidade/cotacao/:id",
        name: "Oportunidades",
        mini: "OPT",
        component: cotacaoUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/oportunidade/recurso/:id",
        name: "Oportunidades",
        mini: "OPT",
        component: RecursoCadastro,
        layout: "/admin"
      },
      {
        path: "/update/oportunidade/recurso/:id",
        name: "Oportunidades",
        mini: "OPT",
        component: RecursoUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/oportunidade/parcela/:id",
        name: "Oportunidades",
        mini: "OPT",
        component: ParcelaCadastro,
        layout: "/admin"
      },
      {
        path: "/update/oportunidade/parc/:id",
        name: "Oportunidades",
        mini: "OPT",
        component: parcUpdate,
        layout: "/admin"
      },
      {
        path: "/update/oportunidade/parcNota/:id",
        name: "Oportunidades",
        mini: "OPT",
        component: parcNotaFiscal,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/represent",
        name: "Representante",
        mini: "RF",
        component: RepresentanteCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/represent/:id",
        name: "Editar Representante",
        mini: "RF",
        component: RepresentanteUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/sgmet",
        name: "Segmento",
        mini: "RF",
        component: SegmentoCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/segmento/:id",
        name: "Editar Segmento",
        mini: "RF",
        component: SegmentoUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/und_neg",
        name: "Cadastro de Unidade de Negócio",
        mini: "RF",
        component: UndNegCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/und_neg/:id",
        name: "Editar Unidade de Negócio",
        mini: "RF",
        component: UndNegUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/apontamentos/horas/:id",
        name: "Horas",
        mini: "OPT",
        component: HorasCadastro,
        layout: "/admin"
      },
      {
        path: "/update/apontamentos/horas/:id",
        name: "Horas",
        mini: "OPT",
        component: HorasUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/apontamentos/despesas/:id",
        name: "Despesas",
        mini: "DSP",
        component: DespesaCadastro,
        layout: "/admin"
      },
      {
        path: "/update/apontamentos/despesas/:id",
        name: "Despesas",
        mini: "DSP",
        component: DespesaUpdate,
        layout: "/admin"
      }
      // Cadastros Fim---------------------------------------------------------------------------------------------------------------------
      // Cadastros Fim---------------------------------------------------------------------------------------------------------------------
      // Cadastros Fim---------------------------------------------------------------------------------------------------------------------
      // Cadastros Fim---------------------------------------------------------------------------------------------------------------------
      // Cadastros Fim---------------------------------------------------------------------------------------------------------------------
    ]
  },
  // cadastros Fim ---------------------------------------

  // -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
  // -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
  // -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
  // -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
  {
    collapse: true,
    name: "Administrador",
    icon: "tim-icons icon-molecule-40",
    state: "AdministradorCollapse",
    views: [
      {
        path: "/tabelas/aux/perfil",
        name: "Perfis",
        mini: "PRF",
        component: perfilTable,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Apontamentos",
    icon: "tim-icons icon-molecule-40",
    state: "ApontamentosCollapse",
    views: [
      {
        path: "/tabelas/apontamentos/oportunidades/",
        name: "Projetos",
        mini: "PJT",
        component: ApontTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/apontamentos/despesas/:id",
        name: "Despesas",
        mini: "DSP",
        component: DespesaTable,
        layout: "/admin",
        invisible: true
      },
      {
        path: "/tabelas/apontamentos/horas/:id",
        name: "Horas",
        mini: "HRS",
        component: HorasTable,
        layout: "/admin",
        invisible: true
      }
    ]
  },
  {
    collapse: true,
    name: "Oportunidades",
    icon: "tim-icons icon-molecule-40",
    state: "OportunidadeCollapse",
    views: [
      {
        path: "/tabelas/oportunidade/oport",
        name: "Oportunidades",
        mini: "OPT",
        component: OportTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/oportunidade/cotacao/:id",
        name: "Cotacao",
        mini: "OPT",
        component: cotacaoTable,
        layout: "/admin",
        invisible: true
      },
      {
        path: "/tabelas/oportunidade/recurso/:id",
        name: "Recursos",
        mini: "rec",
        component: RecursoTable,
        layout: "/admin",
        invisible: true
      },
      {
        path: "/tabelas/oportunidade/parcela/:id",
        name: "Recursos",
        mini: "rec",
        component: ParcelaTable,
        layout: "/admin",
        invisible: true
      }
    ]
  },
  {
    collapse: true,
    name: "Cadastros",
    icon: "tim-icons icon-puzzle-10",
    state: "tablesCollapse",
    views: [
      {
        path: "/tabelas/aux/condPgmto",
        name: "Condição de Pagamento",
        mini: "CPG",
        component: condPgmtoTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/aux/tipoComiss",
        name: "Tipos de Comissão",
        mini: "CMS",
        component: tipoComissTable,
        layout: "/admin"
      },

      {
        path: "/tabelas/aux/rec_desp",
        name: "Receita e Despesa",
        mini: "RDP",
        component: RecDespTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/cliente/cliente",
        name: "Clientes",
        mini: "RT",
        component: Tabela_Cliente,
        layout: "/admin"
      },
      {
        path: "/cadastro/wizard/empresa",
        name: "wizard",
        mini: "RT",
        component: WizardCadastro,
        layout: "/admin"
      },
      {
        path: "/cadastro/wizard/fornec",
        name: "wizardFornec",
        mini: "RT",
        component: WizardFornec,
        layout: "/admin"
      },
      {
        path: "/cadastro/wizard/colab",
        name: "wizardColab",
        mini: "RT",
        component: WizardColab,
        layout: "/admin"
      },
      {
        path: "/tabelas/cliente/prospect",
        name: "Prospects",
        mini: "RT",
        component: prospectTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/cliente/comp/:id",
        name: "Complemento de Clientes",
        mini: "RT",
        invisible: true,
        component: CliCompTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/cliente/cont/:id",
        name: "Continuação Cliente",
        mini: "RT",
        invisible: true,
        component: CliContTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/cliente/rec_desp/:id",
        name: "Receita e Despesa de Cliente",
        mini: "RT",
        invisible: true,
        component: CliRecDespTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/colab",
        name: "Colaborador",
        mini: "RT",
        component: ColabTable,
        layout: "/admin"
      },
      {
        path: "/tables/colab/comp/:id",
        name: "Complemento de Colaborador",
        mini: "RT",
        invisible: true,
        component: ColabCompTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/general/area",
        name: "Area",
        mini: "RT",
        component: AreaTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/general/empresa",
        name: "Empresa",
        mini: "RT",
        component: EmpresaTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/general/fornec",
        name: "Fornecedor",
        mini: "RT",
        component: FornecTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/general/itm_controle",
        name: "Item Controle",
        mini: "RT",
        component: ItmControleTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/general/parametros",
        name: "Parametros",
        mini: "RT",
        component: ParametrosTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/general/prodt",
        name: "Produto",
        mini: "RT",
        component: ProdtTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/general/representante",
        name: "Representante",
        mini: "RT",
        component: RepresentanteTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/general/segmento",
        name: "Segmento",
        mini: "RT",
        component: SegmentoTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/general/und_neg",
        name: "Unidade de Negócio",
        mini: "RT",
        component: UndNegTable,
        layout: "/admin"
      }
    ]
  }

  // -------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
  // -------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
  // -------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
  // -------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
];

export default routes;
