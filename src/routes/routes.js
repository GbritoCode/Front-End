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

// import Dashboard from "~/pages/dashboard/index";
// import AnalistaDashboard from "~/pages/dashboard/dashboardAnalista";
// import GestorDashboard from "~/pages/dashboard/dashboardGestor";
import DashboardGerencial from "~/pages/dashboard/dashboardGerencial";
import DashboardComercial from "~/pages/dashboard/dashboardComercial";
import AdminDashboard from "~/pages/dashboard/dashboardAdmin";
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

import CamposDinamicosTable from "~/views/tables/Clientes/camposDinamicosProspect";
import followUpTable from "~/views/tables/Clientes/followUpsTable";
import CampanhaTable from "~/views/tables/Clientes/campanhasTable";

import Tabela_Cliente from "~/views/tables/Clientes/Tabela_Cliente.jsx";
import CliCompTable from "~/views/tables/Clientes/CliCompTable";
import CliContTable from "~/views/tables/Clientes/CliContTable";
import CliRecDespTable from "~/views/tables/Clientes/CliRecDespTable";

import ColabTable from "~/views/tables/Colab/ColabTable";
import ColabCompTable from "~/views/tables/Colab/ColabCompTable";

import AreaTable from "~/views/tables/General/AreaTable";
import EmpresaTable from "~/views/tables/General/EmpresaTable";
import FornecTable from "~/views/tables/General/FornecTable";
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
import DataOport from "~/views/forms/oportunidade/oportunidadeData";
import ProfileUpdate from "~/views/forms/Update/User/profileUpdate";
import ContaContabilTable from "~/views/tables/auxTables/contaContabilTable";
import CadastroContaContabil from "~/views/forms/auxForm/contaContabilCadastro";
import UpdateContaContabil from "~/views/forms/Update/auxUpdate/contaContabilupdate";
import CadastroCentroCusto from "~/views/forms/auxForm/centroCustoCadastro";
import UpdateCentroCusto from "~/views/forms/Update/auxUpdate/centroCustoUpdate";
import CentroCustoTable from "~/views/tables/auxTables/centroCustoTable";
import PeriodosTable from "~/views/tables/Fechamento/periodos";
import CadastroPeriodo from "~/views/forms/fechamento/periodoCadastro";
import GerencialHorasTable from "~/views/tables/apontamentos/tabelaHoraGerencial";
import GerencialDespesaTable from "~/views/tables/apontamentos/tabelaDespesaGerencial";
import PeriodTokenTable from "~/views/tables/Fechamento/periodTokenTable";
import ParcelaPendentesTable from "~/views/tables/oportTables/parcelaPendenteTable";
import ParcelaAbertaTable from "~/views/tables/oportTables/parcelaAbertaTable";
import ParcelaAtrasadaTable from "~/views/tables/oportTables/parcelaAtrasadaTable";
import OportFinTable from "~/views/tables/oportTables/oportFinalizadaTable";
import Example from "~/views/forms/Update/General/ParametrosEmail";
import CadastroCampanha from "~/views/forms/Cliente/campanhaCadastro";
import CadastroCamposDinamicos from "~/views/forms/Cliente/camposDinamicosCadastro";
import UpdateCampanha from "~/views/forms/Update/Cliente/campanhaUpdate";
import UpdateCamposDinamicos from "~/views/forms/Update/Cliente/camposDinamicosUpdate";
import CadastroFollowUps from "~/views/forms/Cliente/followUpCadastro";
import UpdateFollowUps from "~/views/forms/Update/Cliente/followUpUpdate";
import FollowUpTimeline from "~/views/tables/Clientes/followUpTimeline";
import ProspectWizard from "~/views/forms/Update/Cliente/prospectWizardMain";
import ProspeccaoTable from "~/views/tables/comercial/prospeccaoTable";
import CampanhaClienteTable from "~/views/tables/Clientes/campanhas_clientesTables";

const routes = [
  {
    collapse: true,
    name: "Dashboards",
    namePerfil: "Dashboards",
    icon: "tim-icons icon-chart-pie-36",
    state: "dashboardCollapse",
    profile: 1,
    views: [
      {
        path: "/dashboardPessoal",
        name: "Pessoal",
        namePerfil: "Pessoal Dash",
        mini: "PES",
        component: AdminDashboard,
        layout: "/admin"
      },
      {
        path: "/dashboardGerencial",
        name: "Gerencial",
        namePerfil: "Gerencial Dash",
        mini: "GER",
        component: DashboardGerencial,
        profile: 10,
        layout: "/admin"
      },
      {
        path: "/dashboardComercial",
        name: "Comercial",
        namePerfil: "Comercial Dash",
        mini: "COM",
        component: DashboardComercial,
        profile: 10,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    namePerfil: "Login",
    mini: "L",
    component: signIn,
    layout: "/auth",
    redirect: true
  },
  {
    path: "/register",
    name: "Register",
    namePerfil: "Register",
    mini: "R",
    component: SignUp,
    layout: "/auth",
    redirect: true
  },

  // -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
  // -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
  // -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
  // -------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
  {
    collapse: true,
    name: "Administração",
    namePerfil: "Administração",
    icon: "tim-icons icon-molecule-40",
    state: "AdministradorCollapse",
    profile: 10,
    views: [
      {
        path: "/cadastro/wizard/empresa",
        name: "wizard",
        namePerfil: "wizard",
        mini: "RT",
        component: WizardCadastro,
        layout: "/admin",
        profile: 100,
        redirect: true
      },
      {
        path: "/cadastro/wizard/fornec",
        name: "wizardFornec",
        namePerfil: "wizardFornec",
        mini: "RT",
        component: WizardFornec,
        layout: "/admin",
        profile: 100,
        redirect: true
      },
      {
        path: "/cadastro/wizard/colab",
        name: "wizardColab",
        namePerfil: "wizardColab",
        mini: "RT",
        component: WizardColab,
        layout: "/admin",
        profile: 100,
        redirect: true
      },
      {
        path: `/update/general/parametros/1`,
        name: "Parametros",
        namePerfil: "Parametros Up",
        mini: "PRM",
        component: ParametrosUpdate,
        layout: "/admin",
        profile: 10
      },
      {
        path: `/update/general/parametros/email/1`,
        name: "Emails",
        namePerfil: "Emails Up",
        mini: "EML",
        component: Example,
        layout: "/admin",
        profile: 10
      },
      {
        path: "/tabelas/aux/perfil",
        name: "Perfis",
        namePerfil: "Perfis Tab",
        mini: "PRF",
        component: perfilTable,
        layout: "/admin"
      },
      {
        path: `/tabelas/fechamento/periodo`,
        name: "Períodos",
        namePerfil: "Períodos Tab",
        mini: "PER",
        component: PeriodosTable,
        layout: "/admin",
        profile: 10
      },
      {
        path: `/tabelas/fechamento/acesso`,
        name: "Liberar Períodos",
        namePerfil: "Liberar Períodos Tab",
        mini: "LPE",
        component: PeriodTokenTable,
        layout: "/admin",
        profile: 10
      }
    ]
  },
  {
    collapse: true,
    name: "Vendas",
    namePerfil: "Vendas",
    icon: "tim-icons icon-molecule-40",
    state: "VendasCollapse",
    views: [
      {
        path: "/tabelas/prospeccao/campanha/:idCampanha?",
        name: "Prospecção",
        namePerfil: "Prospecção",
        mini: "PRP",
        component: ProspeccaoTable,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Cadastros",
    namePerfil: "Cadastros",
    icon: "tim-icons icon-puzzle-10",
    state: "tablesCollapse",
    profile: 2,
    views: [
      {
        path: "/tabelas/aux/condPgmto",
        name: "Condição de Pagamento",
        namePerfil: "Condição de Pagamento Tab",
        mini: "CPG",
        component: condPgmtoTable,
        layout: "/admin",
        profile: 10
      },
      {
        path: "/tabelas/aux/tipoComiss",
        name: "Tipos de Comissão",
        namePerfil: "Tipos de Comissão Tab",
        mini: "CMS",
        component: tipoComissTable,
        layout: "/admin",
        profile: 10
      },
      {
        path: "/tabelas/general/contaContabil",
        name: "Conta Contábil",
        namePerfil: "Conta Contábil Tab",
        mini: "CTB",
        component: ContaContabilTable,
        layout: "/admin",
        profile: 10
      },
      {
        path: "/tabelas/general/centroCusto",
        name: "Centro de Custo",
        namePerfil: "Centro de Custo Tab",
        mini: "CCS",
        component: CentroCustoTable,
        layout: "/admin",
        profile: 10
      },
      {
        path: "/tabelas/aux/rec_desp",
        name: "Receita e Despesa",
        namePerfil: "Receita e Despesa Tab",
        mini: "RDP",
        component: RecDespTable,
        layout: "/admin",
        profile: 10
      },
      {
        path: "/tabelas/general/representante",
        name: "Representante",
        namePerfil: "Representante Tab",
        mini: "RPR",
        component: RepresentanteTable,
        layout: "/admin",
        profile: 10
      },
      {
        path: "/tabelas/cliente/cliente",
        name: "Clientes",
        namePerfil: "Clientes Tab",
        mini: "CLI",
        component: Tabela_Cliente,
        layout: "/admin",
        profile: 3
      },
      {
        path: "/tabelas/cliente/prospect",
        name: "Prospects",
        namePerfil: "Prospects Tab",
        mini: "CPR",
        component: prospectTable,
        layout: "/admin",
        profile: 2
      },
      {
        path: "/tabelas/cliente/campanha",
        name: "Campanhas",
        namePerfil: "Campanhas Tab",
        mini: "CMP",
        component: CampanhaTable,
        layout: "/admin",
        profile: 2
      },
      {
        path: "/tabelas/campanhas/clientes/:id",
        name: "Campanhas Clientes",
        namePerfil: "Campanhas Cliente Tab",
        mini: "CCT",
        component: CampanhaClienteTable,
        layout: "/admin",
        profile: 2,
        redirect: true
      },
      {
        path: "/tabelas/cliente/camposDinamicos",
        name: "Campos Dinâmicos",
        namePerfil: "Campos Dinâmicos Tab",
        mini: "CPD",
        component: CamposDinamicosTable,
        layout: "/admin",
        profile: 2
      },
      {
        path: "/tabelas/cliente/FollowUps/:cliId/:campId",
        name: "Follow Ups",
        namePerfil: "Follow Ups Tab",
        mini: "FUP",
        redirect: true,
        component: followUpTable,
        layout: "/admin",
        profile: 2
      },
      {
        path: "/timeline/cliente/FollowUps/:cliId/:campId",
        name: "Follow Ups",
        namePerfil: "Follow Ups Tab",
        mini: "FUP",
        redirect: true,
        component: FollowUpTimeline,
        layout: "/admin",
        profile: 2
      },
      {
        path: "/tabelas/cliente/comp/:id",
        name: "Complemento de Clientes",
        namePerfil: "Complemento de Clientes Tab",
        mini: "RT",
        redirect: true,
        component: CliCompTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/cliente/cont/:id",
        name: "Continuação Cliente",
        namePerfil: "Continuação Cliente Tab",
        mini: "RT",
        redirect: true,
        component: CliContTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/cliente/rec_desp/:id",
        name: "Receita e Despesa de Cliente",
        namePerfil: "Receita e Despesa de Cliente Tab",
        mini: "RT",
        redirect: true,
        component: CliRecDespTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/general/fornec",
        name: "Fornecedor",
        namePerfil: "Fornecedor Tab",
        mini: "FRN",
        component: FornecTable,
        layout: "/admin",
        profile: 10
      },
      {
        path: "/tabelas/colab",
        name: "Colaborador",
        namePerfil: "Colaborador Tab",
        mini: "COL",
        component: ColabTable,
        layout: "/admin",
        profile: 10
      },
      {
        path: "/tables/colab/comp/:id",
        name: "Complemento de Colaborador",
        namePerfil: "Complemento de Colaborador Tab",
        mini: "RT",
        redirect: true,
        component: ColabCompTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/general/area",
        name: "Area",
        namePerfil: "Area Tab",
        mini: "AR",
        component: AreaTable,
        layout: "/admin",
        profile: 10
      },
      {
        path: "/tabelas/general/empresa",
        name: "Empresa",
        namePerfil: "Empresa Tab",
        mini: "EMP",
        component: EmpresaTable,
        layout: "/admin",
        profile: 10
      },
      {
        path: "/tabelas/general/prodt",
        name: "Produto",
        namePerfil: "Produto Tab",
        mini: "PDT",
        component: ProdtTable,
        layout: "/admin",
        profile: 10
      },
      {
        path: "/tabelas/general/und_neg",
        name: "Unidade de Negócio",
        namePerfil: "Unidade de Negócio Tab",
        mini: "UNG",
        component: UndNegTable,
        layout: "/admin",
        profile: 10
      },
      {
        path: "/tabelas/general/segmento",
        name: "Segmento",
        namePerfil: "Segmento Tab",
        mini: "SEG",
        component: SegmentoTable,
        layout: "/admin",
        profile: 10
      }
    ]
  },
  {
    collapse: true,
    name: "Apontamentos",
    namePerfil: "Apontamentos",
    icon: "tim-icons icon-notes",
    state: "ApontamentosCollapse",
    profile: 1,
    views: [
      {
        path: "/tabelas/apontamentos/oportunidades/",
        name: "Projetos",
        namePerfil: "Projetos Tab",
        mini: "PJT",
        component: ApontTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/apontamentos/despesas/:id",
        name: "Despesas",
        namePerfil: "Despesas Tab",
        mini: "DSP",
        component: DespesaTable,
        layout: "/admin",
        redirect: true
      },
      {
        path: "/tabelas/apontamentos/gerencial/despesas",
        name: "Despesas",
        namePerfil: "Despesas Tab",
        mini: "DSP",
        component: GerencialDespesaTable,
        layout: "/admin",
        redirect: true
      },
      {
        path: "/tabelas/apontamentos/horas/:id/",
        name: "Horas",
        namePerfil: "Horas Tab",
        mini: "HRS",
        component: HorasTable,
        layout: "/admin",
        redirect: true
      },
      {
        path: "/tabelas/apontamentos/gerencial/horas",
        name: "Horas Gerencial",
        namePerfil: "Horas Gerencial Tab",
        mini: "HRS",
        component: GerencialHorasTable,
        layout: "/admin",
        redirect: true
      }
    ]
  },
  {
    collapse: true,
    name: "Oportunidades",
    namePerfil: "Oportunidades",
    icon: "tim-icons icon-pin",
    state: "OportunidadeCollapse",
    profile: 2,
    views: [
      {
        path: "/tabelas/oportunidade/oport",
        name: "Oportunidades",
        namePerfil: "Oportunidades Tab",
        mini: "OPT",
        component: OportTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/oportunidade/finOport",
        name: "Finalizadas",
        namePerfil: "Finalizadas Tab",
        mini: "OPF",
        component: OportFinTable,
        layout: "/admin"
      },
      {
        path: "/tabelas/oportunidade/cotacao/:id",
        name: "Cotacao",
        namePerfil: "Cotacao Tab",
        mini: "COT",
        component: cotacaoTable,
        layout: "/admin",
        redirect: true
      },
      {
        path: "/tabelas/oportunidade/recurso/:id",
        name: "Recursos",
        namePerfil: "Recursos Tab",
        mini: "rec",
        component: RecursoTable,
        layout: "/admin",
        redirect: true
      },
      {
        path: "/tabelas/oportunidade/parcela/:id",
        name: "Parcelas",
        namePerfil: "Parcelas Tab",
        mini: "rec",
        component: ParcelaTable,
        layout: "/admin",
        redirect: true
      },
      {
        path: "/tabelas/parcela/pendentes",
        name: "Parcelas Pendente",
        namePerfil: "Parcelas Pendente Tab",
        mini: "rec",
        component: ParcelaPendentesTable,
        layout: "/admin",
        redirect: true
      },
      {
        path: "/tabelas/parcela/abertas",
        name: "Parcelas Abertas",
        namePerfil: "Parcelas Abertas Tab",
        mini: "rec",
        component: ParcelaAbertaTable,
        layout: "/admin",
        redirect: true
      },
      {
        path: "/tabelas/parcela/atrasadas",
        name: "Parcelas Atrasadas",
        namePerfil: "Parcelas Atrasadas Tab",
        mini: "rec",
        component: ParcelaAtrasadaTable,
        layout: "/admin",
        redirect: true
      },
      {
        path: "/view/oportunidade/dados/:id",
        name: "Dados OPT",
        namePerfil: "Dados OPT",
        mini: "DOP",
        component: DataOport,
        layout: "/admin",
        redirect: true
      }
    ]
  },

  // -------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
  // -------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
  // -------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
  // -------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
  // ------------Cadastros-----------------------------------------------------------------------------------------------------------------------
  // ------------Cadastros-----------------------------------------------------------------------------------------------------------------------
  // ------------Cadastros-----------------------------------------------------------------------------------------------------------------------
  // ------------Cadastros-----------------------------------------------------------------------------------------------------------------------
  // ------------Cadastros-----------------------------------------------------------------------------------------------------------------------

  {
    collapse: true,
    name: "Páginas deastro invisíveis",
    namePerfil: "Páginas deastro invisíveis",
    icon: "tim-icons icon-notes",
    state: "formsCollapse",
    redirect: true,
    views: [
      {
        path: "/cadastro/cliente/campanha",
        name: "Campanha",
        namePerfil: "Campanha Cad",
        mini: "RF",
        component: CadastroCampanha,
        layout: "/admin"
      },
      {
        path: "/update/cliente/campanha/:id",
        name: "Atualizar Campanha",
        namePerfil: "Atualizar Campanha Cad",
        mini: "RF",
        component: UpdateCampanha,
        layout: "/admin"
      },
      {
        path: "/cadastro/cliente/camposDinamicos",
        name: "Campos Dinamicos",
        namePerfil: "Campos Dinamicos Cad",
        mini: "RF",
        component: CadastroCamposDinamicos,
        layout: "/admin"
      },
      {
        path: "/update/cliente/camposDinamicos/:id",
        name: "Atualizar Campos Dinamicos",
        namePerfil: "Atualizar Campos Dinamicos Cad",
        mini: "RF",
        component: UpdateCamposDinamicos,
        layout: "/admin"
      },
      {
        path: "/cadastro/cliente/followUps/:cliId/:campId",
        name: "Follow Ups",
        namePerfil: "Follow Ups Cad",
        mini: "RF",
        component: CadastroFollowUps,
        layout: "/admin"
      },
      {
        path: "/update/cliente/followUps/:id",
        name: "Follow Ups",
        namePerfil: "Follow Ups Up",
        mini: "RF",
        component: UpdateFollowUps,
        layout: "/admin"
      },
      {
        path: "/cliente_cadastro/:prospect",
        name: "Cliente",
        namePerfil: "Cliente Cad",
        mini: "RF",
        component: CadastroCliente,
        layout: "/admin"
      },
      {
        path: "/cadastro/cliente/prospectWiz",
        name: "Prospect Wiz",
        namePerfil: "Prospect Wiz Cad",
        mini: "RF",
        component: ProspectWizard,
        layout: "/admin"
      },
      {
        path: "/cliente_update/:id/:prospect",
        name: "Atualizar Cliente",
        namePerfil: "Atualizar Cliente Cad",
        mini: "RF",
        component: ClienteUpdate,
        layout: "/admin"
      },
      {
        path: "/cliente/cont_update/:id",
        name: "Atualizar Continuação do Cliente",
        namePerfil: "Atualizar Continuação do Cliente Cad",
        mini: "RF",
        component: CliContUpdate,
        layout: "/admin"
      },
      {
        path: "/cliente/comp_update/:id",
        name: "Atualizar Complemento do Cliente",
        namePerfil: "Atualizar Complemento do Cliente Cad",
        mini: "RF",
        component: CliCompUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/cliente/comp/:id",
        name: "Complemento de Cliente",
        namePerfil: "Complemento de Cliente Cad",
        mini: "RF",
        component: CliCompCadastro,
        layout: "/admin"
      },
      {
        path: "/cadastro/cliente/cont/:id",
        name: "Continuação do Cliente",
        namePerfil: "Continuação do Cliente Cad",
        mini: "RF",
        component: CliContCadastro,
        layout: "/admin"
      },
      {
        path: "/cadastro/cliente/rec_desp/:id",
        name: "Receitas/Despesas do Cliente",
        namePerfil: "Receitas/Despesas do Cliente Cad",
        mini: "RF",
        component: CliRecDespCadastro,
        layout: "/admin"
      },
      {
        path: "/update/cliente/rec_desp/:id",
        name: "Receitas/Despesas do Cliente",
        namePerfil: "Receitas/Despesas do Cliente Cad",
        mini: "RF",
        component: CliRecDespUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/colab/colab",
        name: "Colaborador",
        namePerfil: "Colaborador Cad",
        mini: "RF",
        component: ColabCadastro,
        layout: "/admin"
      },
      {
        path: "/colab/update/:id",
        name: "Editar Colaborador",
        namePerfil: "Editar Colaborador Cad",
        mini: "RF",
        component: ColabUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/colab/comp/:id",
        name: "Complemento de Colaborador",
        namePerfil: "Complemento de Colaborador Cad",
        mini: "RF",
        component: ColabCompCadastro,
        layout: "/admin"
      },
      {
        path: "/colab/comp/update/:id",
        name: "Editar Complemento do Colaborador",
        namePerfil: "Editar Complemento do Colaborador Cad",
        mini: "RF",
        component: ColabCompUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/area",
        name: "Área",
        namePerfil: "Área Cad",
        mini: "RF",
        component: AreaCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/area/:id",
        name: "Editar Area",
        namePerfil: "Editar Area Cad",
        mini: "RF",
        component: AreaUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/empresa",
        name: "Empresa",
        namePerfil: "Empresa Cad",
        mini: "RF",
        component: EmpresaCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/empresa/:id",
        name: "Editar Empresa",
        namePerfil: "Editar Empresa Cad",
        mini: "RF",
        component: EmpresaUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/Fornec",
        name: "Fornecedorstro",
        namePerfil: "Fornecedorstro Cad",
        mini: "RF",
        component: FornecCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/fornec/:id",
        name: "Editar Fornecedor",
        namePerfil: "Editar Fornecedor Cad",
        mini: "RF",
        component: FornecUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/parametros",
        name: "Parametros",
        namePerfil: "Parametros Cad",
        mini: "RF",
        component: ParametrosCadastro,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/prodt",
        name: "Produto",
        namePerfil: "Produto Cad",
        mini: "RF",
        component: ProdtCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/prodt/:id",
        name: "Editar Produto",
        namePerfil: "Editar Produto Cad",
        mini: "RF",
        component: ProdtUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/rec_desp",
        name: "Receitas/Despesas",
        namePerfil: "Receitas/Despesas Cad",
        mini: "RF",
        component: RecDespCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/rec_desp/:id",
        name: "Editar Receita/Despesa",
        namePerfil: "Editar Receita/Despesa Cad",
        mini: "RF",
        component: RecDespUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/aux/condPgmto",
        name: "Condições de pagamento",
        namePerfil: "Condições de pagamento Cad",
        mini: "CPG",
        component: condPgmtoCadastro,
        layout: "/admin"
      },
      {
        path: "/update/aux/condPgmto/:id",
        name: "Condições de pagamento",
        namePerfil: "Condições de pagamento Cad",
        mini: "CPG",
        component: condPgmtoUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/aux/tipoComiss",
        name: "Tipos de Comissão",
        namePerfil: "Tipos de Comissão Cad",
        mini: "CMS",
        component: tipoComissCadastro,
        layout: "/admin"
      },
      {
        path: "/update/aux/tipoComiss/:id",
        name: "Tipos de Comissão",
        namePerfil: "Tipos de Comissão Cad",
        mini: "CMS",
        component: tipoComissUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/aux/perfil",
        name: "Perfis",
        namePerfil: "Perfis Cad",
        mini: "PRF",
        component: perfilCadastro,
        layout: "/admin"
      },
      {
        path: "/update/aux/perfil/:id",
        name: "Perfis",
        namePerfil: "Perfis Cad",
        mini: "PRF",
        component: perfilUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/oportunidade/oport",
        name: "Oportunidades",
        namePerfil: "Oportunidades Cad",
        mini: "OPT",
        component: CadastroOport,
        layout: "/admin"
      },
      {
        path: "/update/oportunidade/oport/:id",
        name: "Oportunidades",
        namePerfil: "Oportunidades Cad",
        mini: "OPT",
        component: UpdateOport,
        layout: "/admin"
      },
      {
        path: "/cadastro/oportunidade/cotacao/:id",
        name: "Oportunidades",
        namePerfil: "Oportunidades Cad",
        mini: "OPT",
        component: CotacaoCadastro,
        layout: "/admin"
      },
      {
        path: "/update/oportunidade/cotacao/:id",
        name: "Oportunidades",
        namePerfil: "Oportunidades Cad",
        mini: "OPT",
        component: cotacaoUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/oportunidade/recurso/:id",
        name: "Oportunidades",
        namePerfil: "Oportunidades Cad",
        mini: "OPT",
        component: RecursoCadastro,
        layout: "/admin"
      },
      {
        path: "/update/oportunidade/recurso/:id",
        name: "Oportunidades",
        namePerfil: "Oportunidades Cad",
        mini: "OPT",
        component: RecursoUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/oportunidade/parcela/:id",
        name: "Oportunidades",
        namePerfil: "Oportunidades Cad",
        mini: "OPT",
        component: ParcelaCadastro,
        layout: "/admin"
      },
      {
        path: "/update/oportunidade/parc/:id",
        name: "Oportunidades",
        namePerfil: "Oportunidades Cad",
        mini: "OPT",
        component: parcUpdate,
        layout: "/admin"
      },
      {
        path: "/update/oportunidade/parcNota/:id",
        name: "Oportunidades",
        namePerfil: "Oportunidades Cad",
        mini: "OPT",
        component: parcNotaFiscal,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/represent",
        name: "Representante",
        namePerfil: "Representante Cad",
        mini: "RF",
        component: RepresentanteCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/represent/:id",
        name: "Editar Representante",
        namePerfil: "Editar Representante Cad",
        mini: "RF",
        component: RepresentanteUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/sgmet",
        name: "Segmento",
        namePerfil: "Segmento Cad",
        mini: "RF",
        component: SegmentoCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/segmento/:id",
        name: "Editar Segmento",
        namePerfil: "Editar Segmento Cad",
        mini: "RF",
        component: SegmentoUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/und_neg",
        name: "Cadastro de Unidade de Negócio",
        namePerfil: "Cadastro de Unidade de Negócio Cad",
        mini: "RF",
        component: UndNegCadastro,
        layout: "/admin"
      },
      {
        path: "/update/general/und_neg/:id",
        name: "Editar Unidade de Negócio",
        namePerfil: "Editar Unidade de Negócio Cad",
        mini: "RF",
        component: UndNegUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/apontamentos/horas/:id",
        name: "Horas",
        namePerfil: "Horas Cad",
        mini: "OPT",
        component: HorasCadastro,
        layout: "/admin",
        perfis: "admin, comercial, analista"
      },
      {
        path: "/update/apontamentos/horas/:id",
        name: "Horas",
        namePerfil: "Horas Cad",
        mini: "OPT",
        component: HorasUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/apontamentos/despesas/:id",
        name: "Despesas",
        namePerfil: "Despesas Cad",
        mini: "DSP",
        component: DespesaCadastro,
        layout: "/admin"
      },
      {
        path: "/update/apontamentos/despesas/:id",
        name: "Despesas",
        namePerfil: "Despesas Cad",
        mini: "DSP",
        component: DespesaUpdate,
        layout: "/admin"
      },
      {
        path: "/update/user/perfil/",
        name: "Perfil",
        namePerfil: "Perfil Cad",
        mini: "UPRF",
        component: ProfileUpdate,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/contaContabil",
        name: "Cadastro de Conta Contábil",
        namePerfil: "Cadastro de Conta Contábil Cad",
        mini: "RF",
        component: CadastroContaContabil,
        layout: "/admin"
      },
      {
        path: "/update/general/contaContabil/:id",
        name: "Editar Conta Contábil",
        namePerfil: "Editar Conta Contábil Cad",
        mini: "RF",
        component: UpdateContaContabil,
        layout: "/admin"
      },
      {
        path: "/cadastro/geral/centroCusto",
        name: "Cadastro de Centro Custo",
        namePerfil: "Cadastro de Centro Custo Cad",
        mini: "RF",
        component: CadastroCentroCusto,
        layout: "/admin"
      },
      {
        path: "/update/general/centroCusto/:id",
        name: "Editar conta Contábil",
        namePerfil: "Editar conta Contábil Cad",
        mini: "RF",
        component: UpdateCentroCusto,
        layout: "/admin"
      },
      {
        path: "/cadastro/fechamento/periodo",
        name: "Cadastro de Periodo",
        namePerfil: "Cadastro de Periodo Cad",
        mini: "RF",
        component: CadastroPeriodo,
        layout: "/admin"
      }
      // astros Fim---------------------------------------------------------------------------------------------------------------------
      // astros Fim---------------------------------------------------------------------------------------------------------------------
      // astros Fim---------------------------------------------------------------------------------------------------------------------
      // astros Fim---------------------------------------------------------------------------------------------------------------------
      // astros Fim---------------------------------------------------------------------------------------------------------------------
    ]
  }
];

export default routes;
