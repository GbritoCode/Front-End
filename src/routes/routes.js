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

import VectorMap from "~/views/maps/VectorMap.jsx";
import GoogleMaps from "~/views/maps/GoogleMaps.jsx";
import FullScreenMap from "~/views/maps/FullScreenMap.jsx";
import RegularTables from "~/views/tables/RegularTables.jsx";
import ExtendedTables from "~/views/tables/ExtendedTables.jsx";
import Wizard from "~/views/forms/Wizard.jsx";
import ValidationForms from "~/views/forms/ValidationForms.jsx";
import ExtendedForms from "~/views/forms/ExtendedForms.jsx";

//--------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
//--------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
//--------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
//--------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------

import ClienteUpdate from "~/views/forms/Update/Cliente/ClienteUpdate.js";
import CliContUpdate from "~/views/forms/Update/Cliente/CliContUpdate.js";
import CliCompUpdate from "~/views/forms/Update/Cliente/CliCompUpdate.js";
import CliRecDespUpdate from "~/views/forms/Update/Cliente/cliRecDespUpdate.js";

import CadastroCliente from "~/views/forms/CadastroCliente.js";
import CliCompCadastro from "~/views/forms/Cliente/CliCompCadastro.js";
import CliContCadastro from "~/views/forms/Cliente/CliContCadastro.js";
import CliRecDespCadastro from "~/views/forms/Cliente/CliRecDespCadastro.js";

import ColabUpdate from "~/views/forms/Update/Colab/ColabUpdate.js";
import ColabCadastro from "~/views/forms/Colab/ColabCadastro.js";
import ColabCompUpdate from "~/views/forms/Update/Colab/ColabCompUpdate.js";
import ColabCompCadastro from "~/views/forms/Colab/ColabCompCadastro.js";

import AreaUpdate from "~/views/forms/Update/General/AreaUpdate.js";
import AreaCadastro from "~/views/forms/AreaCadastro.js";

import EmpresaUpdate from "~/views/forms/Update/General/EmpresaUpdate.js";
import EmpresaCadastro from "~/views/forms/EmpresaCadastro.js";

import FornecUpdate from "~/views/forms/Update/General/FornecUpdate.js";
import FornecCadastro from "~/views/forms/FornecCadastro.js";

import ItmControleUpdate from "~/views/forms/Update/General/ItmControleUpdate.js";
import ItmControleCadastro from "~/views/forms/ItmControleCadastro.js";

import ParametrosUpdate from "~/views/forms/Update/General/ParametrosUpdate.js";
import ParametrosCadastro from "~/views/forms/ParametrosCadastro.js";

import ProdtUpdate from "~/views/forms/Update/General/ProdtUpdate.js";
import ProdtCadastro from "~/views/forms/ProdtCadastro.js";

import RepresentanteUpdate from "~/views/forms/Update/General/RepresentanteUpdate.js";
import RepresentanteCadastro from "~/views/forms/RepresentanteCadastro.js";

import SegmentoUpdate from "~/views/forms/Update/General/SegmentoUpdate.js";
import SegmentoCadastro from "~/views/forms/SegmentoCadastro.js";

import UndNegUpdate from "~/views/forms/Update/General/UndNegUpdate.js";
import UndNegCadastro from "~/views/forms/UndNegCadastro.js";

import RecDespUpdate from "~/views/forms/Update/General/RecDespUpdate.js";
import RecDespCadastro from "~/views/forms/RecDespCadastro.js";

import condPgmtoUpdate from "~/views/forms/Update/auxUpdate/condPgmtoUpdate.js";
import condPgmtoCadastro from "~/views/forms/auxForm/condPgmtoCadastro.js";

import tipoComissUpdate from "~/views/forms/Update/auxUpdate/tipoComissUpdate.js";
import tipoComissCadastro from "~/views/forms/auxForm/tipoComissCadastro.js";

import perfilUpdate from "~/views/forms/Update/auxUpdate/perfilUpdate.js";
import perfilCadastro from "~/views/forms/auxForm/perfilCadastro.js";

import CadastroOport from "~/views/forms/oportunidade/oportunidadeCadastro";

import CotacaoCadastro from "~/views/forms/oportunidade/cotacaoCadastro";
import cotacaoUpdate from "~/views/forms/Update/oportunidades/cotacaoUpdate";

//--------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
//--------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
//--------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
//--------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------

//------------------------------------------------

//-------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
//-------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
//-------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
//-------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------

import Tabela_Cliente from "~/views/tables/Clientes/Tabela_Cliente.jsx";
import CliCompTable from "~/views/tables/Clientes/CliCompTable.js";
import CliContTable from "~/views/tables/Clientes/CliContTable.js";
import CliRecDespTable from "~/views/tables/Clientes/CliRecDespTable.js";

import ColabTable from "~/views/tables/Colab/ColabTable.js";
import ColabCompTable from "~/views/tables/Colab/ColabCompTable.js";

import AreaTable from "~/views/tables/General/AreaTable.js";
import EmpresaTable from "~/views/tables/General/EmpresaTable.js";
import FornecTable from "~/views/tables/General/FornecTable.js";
import ItmControleTable from "~/views/tables/General/ItmControleTable.js";
import ParametrosTable from "~/views/tables/General/ParametrosTable.js";
import ProdtTable from "~/views/tables/General/ProdtTable.js";
import RepresentanteTable from "~/views/tables/General/RepresentanteTable.js";
import SegmentoTable from "~/views/tables/General/SegmentoTable.js";
import UndNegTable from "~/views/tables/General/UndNegTable.js";

import RecDespTable from "~/views/tables/auxTables/RecDespTable.js";
import condPgmtoTable from "~/views/tables/auxTables/condPgmtoTable.js";
import tipoComissTable from "~/views/tables/auxTables/tipoComissTable.js";
import perfilTable from "~/views/tables/auxTables/perfilTable.js";
//-------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
//-------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
//-------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
//-------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------

import Calendar from "~/views/Calendar.jsx";
import Widgets from "~/views/Widgets.jsx";
import Charts from "~/views/Charts.jsx";

import Buttons from "~/views/components/Buttons.jsx";
import SweetAlert from "~/views/components/SweetAlert.jsx";
import Notifications from "~/views/components/Notifications.jsx";
import Grid from "~/views/components/Grid.jsx";
import Typography from "~/views/components/Typography.jsx";
import Panels from "~/views/components/Panels.jsx";
import Icons from "~/views/components/Icons.jsx";
import Pricing from "~/views/pages/Pricing.jsx";

import Timeline from "~/views/pages/Timeline.jsx";
import User from "~/views/pages/User.jsx";

import Rtl from "~/views/pages/Rtl.jsx";
import Lock from "~/views/pages/Lock.jsx";
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
import ParcelaUpdate from "~/views/forms/Update/oportunidades/parcelaUpdate";
import ParcelaCadastro from "~/views/forms/oportunidade/parcelaCadastro";
import ParcelaTable from "~/views/tables/oportTables/parcelaTable";


const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Pages",
    rtlName: "صفحات",
    icon: "tim-icons icon-image-02",
    state: "pagesCollapse",
    views: [
      {
        path: "/pricing",
        name: "Pricing",
        rtlName: "عالتسعير",
        mini: "P",
        rtlMini: "ع",
        component: Pricing,
        layout: "/auth",
      },
      {
        path: "/rtl-support",
        name: "RTL Support",
        rtlName: "صودعم رتل",
        mini: "RS",
        rtlMini: "صو",
        component: Rtl,
        layout: "/rtl",
      },
      {
        path: "/timeline",
        name: "Timeline",
        rtlName: "تيالجدول الزمني",
        mini: "T",
        rtlMini: "تي",
        component: Timeline,
        layout: "/admin",
      },
      {
        path: "/login",
        name: "Login",
        rtlName: "هعذاتسجيل الدخول",
        mini: "L",
        rtlMini: "هعذا",
        component: signIn,
        layout: "/auth",
      },
      {
        path: "/register",
        name: "Register",
        rtlName: "تسجيل",
        mini: "R",
        rtlMini: "صع",
        component: SignUp,
        layout: "/auth",
      },
      {
        path: "/lock-screen",
        name: "Lock Screen",
        rtlName: "اقفل الشاشة",
        mini: "LS",
        rtlMini: "هذاع",
        component: Lock,
        layout: "/auth",
      },
      {
        path: "/user-profile",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        mini: "UP",
        rtlMini: "شع",
        component: User,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Components",
    rtlName: "المكونات",
    icon: "tim-icons icon-molecule-40",
    state: "componentsCollapse",
    views: [
      {
        collapse: true,
        name: "Multi Level Collapse",
        rtlName: "انهيار متعدد المستويات",
        mini: "MLT",
        rtlMini: "ر",
        state: "multiCollapse",
        views: [
          {
            path: "/buttons",
            name: "Buttons",
            rtlName: "وصفت",
            mini: "B",
            rtlMini: "ب",
            component: Buttons,
            layout: "/admin",
          },
          {
            path: "/grid-system",
            name: "Grid System",
            rtlName: "نظام الشبكة",
            mini: "GS",
            rtlMini: "زو",
            component: Grid,
            layout: "/admin",
          },
        ],
      },

      {
        path: "/panels",
        name: "Panels",
        rtlName: "لوحات",
        mini: "P",
        rtlMini: "ع",
        component: Panels,
        layout: "/admin",
      },
      {
        path: "/sweet-alert",
        name: "Sweet Alert",
        rtlName: "الحلو تنبيه",
        mini: "SA",
        rtlMini: "ومن",
        component: SweetAlert,
        layout: "/admin",
      },
      {
        path: "/notifications",
        name: "Notifications",
        rtlName: "إخطارات",
        mini: "N",
        rtlMini: "ن",
        component: Notifications,
        layout: "/admin",
      },
      {
        path: "/icons",
        name: "Icons",
        rtlName: "الرموز",
        mini: "I",
        rtlMini: "و",
        component: Icons,
        layout: "/admin",
      },
      {
        path: "/typography",
        name: "Typography",
        rtlName: "طباعة",
        mini: "T",
        rtlMini: "ر",
        component: Typography,
        layout: "/admin",
      },
    ],
  },
  //------------Cadastros-----------------------------------------------------------------------------------------------------------------------
  //------------Cadastros-----------------------------------------------------------------------------------------------------------------------
  //------------Cadastros-----------------------------------------------------------------------------------------------------------------------
  //------------Cadastros-----------------------------------------------------------------------------------------------------------------------
  //------------Cadastros-----------------------------------------------------------------------------------------------------------------------
  {
    collapse: true,
    name: "Páginas de cadastro invisíveis",
    rtlName: "إستمارات",
    icon: "tim-icons icon-notes",
    state: "formsCollapse",
    invisible: true,
    views: [
      {
        path: "/cliente_cadastro/:prospect",
        name: "Cliente",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: CadastroCliente,
        layout: "/admin",
      },
      {
        path: "/cliente_update/:id/:prct?",
        name: "Atualizar Cliente",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ClienteUpdate,
        layout: "/admin",
      },
      {
        path: "/cliente/cont_update/:id",
        name: "Atualizar Continuação do Cliente",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: CliContUpdate,
        layout: "/admin",
      },
      {
        path: "/cliente/comp_update/:id",
        name: "Atualizar Complemento do Cliente",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: CliCompUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/cliente/comp/:id",
        name: "Complemento de Cliente",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: CliCompCadastro,
        layout: "/admin",
      },
      {
        path: "/cadastro/cliente/cont/:id",
        name: "Continuação do Cliente",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: CliContCadastro,
        layout: "/admin",
      },
      {
        path: "/cadastro/cliente/rec_desp/:id",
        name: "Receitas/Despesas do Cliente",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: CliRecDespCadastro,
        layout: "/admin",
      },
      {
        path: "/update/cliente/rec_desp/:id",
        name: "Receitas/Despesas do Cliente",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: CliRecDespUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/colab/colab",
        name: "Colaborador",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ColabCadastro,
        layout: "/admin",
      },
      {
        path: "/colab/update/:id",
        name: "Editar Colaborador",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ColabUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/colab/comp/:id",
        name: "Complemento de Colaborador",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ColabCompCadastro,
        layout: "/admin",
      },
      {
        path: "/colab/comp/update/:id",
        name: "Editar Complemento do Colaborador",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ColabCompUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/area",
        name: "Área",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: AreaCadastro,
        layout: "/admin",
      },
      {
        path: "/update/general/area/:id",
        name: "Editar Area",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: AreaUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/empresa",
        name: "Empresa",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: EmpresaCadastro,
        layout: "/admin",
      },
      {
        path: "/update/general/empresa/:id",
        name: "Editar Empresa",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: EmpresaUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/Fornec",
        name: "Fornecedor",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: FornecCadastro,
        layout: "/admin",
      },
      {
        path: "/update/general/fornec/:id",
        name: "Editar Fornecedor",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: FornecUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/itm_controle",
        name: "Cadastro de Item Controle",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ItmControleCadastro,
        layout: "/admin",
      },
      {
        path: "/update/general/itm_controle/:id",
        name: "Editar Item Controle",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ItmControleUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/parametros",
        name: "Parametros",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ParametrosCadastro,
        layout: "/admin",
      },
      {
        path: "/update/general/parametros/:id",
        name: "Editar Parâmetros",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ParametrosUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/prodt",
        name: "Produto",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ProdtCadastro,
        layout: "/admin",
      },
      {
        path: "/update/general/prodt/:id",
        name: "Editar Produto",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ProdtUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/rec_desp",
        name: "Receitas/Despesas",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: RecDespCadastro,
        layout: "/admin",
      },
      {
        path: "/update/general/rec_desp/:id",
        name: "Editar Receita/Despesa",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: RecDespUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/aux/condPgmto",
        name: "Condições de pagamento",
        rtlName: "أشكال عادية",
        mini: "CPG",
        rtlMini: "صو",
        component: condPgmtoCadastro,
        layout: "/admin",
      },
      {
        path: "/update/aux/condPgmto/:id",
        name: "Condições de pagamento",
        rtlName: "أشكال عادية",
        mini: "CPG",
        rtlMini: "صو",
        component: condPgmtoUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/aux/tipoComiss",
        name: "Tipos de Comissão",
        rtlName: "أشكال عادية",
        mini: "CMS",
        rtlMini: "صو",
        component: tipoComissCadastro,
        layout: "/admin",
      },
      {
        path: "/update/aux/tipoComiss/:id",
        name: "Tipos de Comissão",
        rtlName: "أشكال عادية",
        mini: "CMS",
        rtlMini: "صو",
        component: tipoComissUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/aux/perfil",
        name: "Perfis",
        rtlName: "أشكال عادية",
        mini: "PRF",
        rtlMini: "صو",
        component: perfilCadastro,
        layout: "/admin",
      },
      {
        path: "/update/aux/perfil/:id",
        name: "Perfis",
        rtlName: "أشكال عادية",
        mini: "PRF",
        rtlMini: "صو",
        component: perfilUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/oportunidade/oport",
        name: "Oportunidades",
        rtlName: "أشكال عادية",
        mini: "OPT",
        rtlMini: "صو",
        component: CadastroOport,
        layout: "/admin",
      },
      {
        path: "/update/oportunidade/oport/:id",
        name: "Oportunidades",
        rtlName: "أشكال عادية",
        mini: "OPT",
        rtlMini: "صو",
        component: UpdateOport,
        layout: "/admin",
      },
      {
        path: "/cadastro/oportunidade/cotacao/:id",
        name: "Oportunidades",
        rtlName: "أشكال عادية",
        mini: "OPT",
        rtlMini: "صو",
        component: CotacaoCadastro,
        layout: "/admin",
      },
      {
        path: "/update/oportunidade/cotacao/:id",
        name: "Oportunidades",
        rtlName: "أشكال عادية",
        mini: "OPT",
        rtlMini: "صو",
        component: cotacaoUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/oportunidade/recurso/:id",
        name: "Oportunidades",
        rtlName: "أشكال عادية",
        mini: "OPT",
        rtlMini: "صو",
        component: RecursoCadastro,
        layout: "/admin",
      },
      {
        path: "/update/oportunidade/recurso/:id",
        name: "Oportunidades",
        rtlName: "أشكال عادية",
        mini: "OPT",
        rtlMini: "صو",
        component: RecursoUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/oportunidade/parcela/:id",
        name: "Oportunidades",
        rtlName: "أشكال عادية",
        mini: "OPT",
        rtlMini: "صو",
        component: ParcelaCadastro,
        layout: "/admin",
      },
      {
        path: "/update/oportunidade/parcela/:id",
        name: "Oportunidades",
        rtlName: "أشكال عادية",
        mini: "OPT",
        rtlMini: "صو",
        component: ParcelaUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/represent",
        name: "Representante",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: RepresentanteCadastro,
        layout: "/admin",
      },
      {
        path: "/update/general/represent/:id",
        name: "Editar Representante",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: RepresentanteUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/sgmet",
        name: "Segmento",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: SegmentoCadastro,
        layout: "/admin",
      },
      {
        path: "/update/general/segmento/:id",
        name: "Editar Segmento",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: SegmentoUpdate,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/und_neg",
        name: "Cadastro de Unidade de Negócio",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: UndNegCadastro,
        layout: "/admin",
      },
      {
        path: "/update/general/und_neg/:id",
        name: "Editar Unidade de Negócio",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: UndNegUpdate,
        layout: "/admin",
      },
      //Cadastros Fim---------------------------------------------------------------------------------------------------------------------
      //Cadastros Fim---------------------------------------------------------------------------------------------------------------------
      //Cadastros Fim---------------------------------------------------------------------------------------------------------------------
      //Cadastros Fim---------------------------------------------------------------------------------------------------------------------
      //Cadastros Fim---------------------------------------------------------------------------------------------------------------------
      {
        path: "/extended-forms",
        name: "Extended Forms",
        rtlName: "نماذج موسعة",
        mini: "EF",
        rtlMini: "هوو",
        component: ExtendedForms,
        layout: "/admin",
      },
      {
        path: "/validation-forms",
        name: "Validation Forms",
        rtlName: "نماذج التحقق من الصحة",
        mini: "VF",
        rtlMini: "تو",
        component: ValidationForms,
        layout: "/admin",
      },
      {
        path: "/wizard",
        name: "Wizard",
        rtlName: "ساحر",
        mini: "W",
        rtlMini: "ث",
        component: Wizard,
        layout: "/admin",
      },
    ],
  },
  //cadastros Fim ---------------------------------------

  //-------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
  //-------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
  //-------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
  //-------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
  {
    collapse: true,
    name: "Administrador",
    rtlName: "المكونات",
    icon: "tim-icons icon-molecule-40",
    state: "AdministradorCollapse",
    views: [
      {
        path: "/tabelas/aux/perfil",
        name: "Perfis",
        rtlName: "طاولات عادية",
        mini: "PRF",
        rtlMini: "صر",
        component: perfilTable,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Oportunidades",
    rtlName: "المكونات",
    icon: "tim-icons icon-molecule-40",
    state: "OportunidadeCollapse",
    views: [
      {
        path: "/tabelas/oportunidade/oport",
        name: "Oportunidades",
        rtlName: "طاولات عادية",
        mini: "OPT",
        rtlMini: "صر",
        component: OportTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/oportunidade/cotacao/:id",
        name: "Cotacao",
        rtlName: "طاولات عادية",
        mini: "OPT",
        rtlMini: "صر",
        component: cotacaoTable,
        layout: "/admin",
        invisible: true
      },
      {
        path: "/tabelas/oportunidade/recurso/:id",
        name: "Recursos",
        rtlName: "أشكال عادية",
        mini: "rec",
        rtlMini: "صو",
        component: RecursoTable,
        layout: "/admin",
        invisible: true
      },
      {
        path: "/tabelas/oportunidade/parcela/:id",
        name: "Recursos",
        rtlName: "أشكال عادية",
        mini: "rec",
        rtlMini: "صو",
        component: ParcelaTable,
        layout: "/admin",
        invisible: true
      },
    ],
  },
  {
    collapse: true,
    name: "Cadastros",
    rtlName: "الجداول",
    icon: "tim-icons icon-puzzle-10",
    state: "tablesCollapse",
    views: [
      {
        path: "/tabelas/aux/condPgmto",
        name: "Condição de Pagamento",
        rtlName: "طاولات عادية",
        mini: "CPG",
        rtlMini: "صر",
        component: condPgmtoTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/aux/tipoComiss",
        name: "Tipos de Comissão",
        rtlName: "طاولات عادية",
        mini: "CMS",
        rtlMini: "صر",
        component: tipoComissTable,
        layout: "/admin",
      },

      {
        path: "/tabelas/aux/rec_desp",
        name: "Receita e Despesa",
        rtlName: "رد فعل الطاولة",
        mini: "RDP",
        rtlMini: "در",
        component: RecDespTable,
        layout: "/admin",
      },

      {
        path: "/regular-tables",
        name: "Regular Tables",
        rtlName: "طاولات عادية",
        mini: "RT",
        rtlMini: "صر",
        component: RegularTables,
        layout: "/admin",
      },
      {
        path: "/extended-tables",
        name: "Extended Tables",
        rtlName: "جداول ممتدة",
        mini: "ET",
        rtlMini: "هور",
        component: ExtendedTables,
        layout: "/admin",
      },
      {
        path: "/tabelas/cliente/cliente",
        name: "Clientes",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: Tabela_Cliente,
        layout: "/admin",
      },
      {
        path: "/cadastro/wizard/empresa",
        name: "wizard",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: WizardCadastro,
        layout: "/admin",
      },
      {
        path: "/cadastro/wizard/fornec",
        name: "wizardFornec",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: WizardFornec,
        layout: "/admin",
      },
      {
        path: "/cadastro/wizard/colab",
        name: "wizardColab",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: WizardColab,
        layout: "/admin",
      },
      {
        path: "/tabelas/cliente/prospect",
        name: "Prospects",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: prospectTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/cliente/comp/:id",
        name: "Complemento de Clientes",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        invisible: true,
        component: CliCompTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/cliente/cont/:id",
        name: "Continuação Cliente",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        invisible: true,
        component: CliContTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/cliente/rec_desp/:id",
        name: "Receita e Despesa de Cliente",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        invisible: true,
        component: CliRecDespTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/colab",
        name: "Colaborador",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: ColabTable,
        layout: "/admin",
      },
      {
        path: "/tables/colab/comp/:id",
        name: "Complemento de Colaborador",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        invisible: true,
        component: ColabCompTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/general/area",
        name: "Area",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: AreaTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/general/empresa",
        name: "Empresa",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: EmpresaTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/general/fornec",
        name: "Fornecedor",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: FornecTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/general/itm_controle",
        name: "Item Controle",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: ItmControleTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/general/parametros",
        name: "Parametros",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: ParametrosTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/general/prodt",
        name: "Produto",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: ProdtTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/general/representante",
        name: "Representante",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: RepresentanteTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/general/segmento",
        name: "Segmento",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: SegmentoTable,
        layout: "/admin",
      },
      {
        path: "/tabelas/general/und_neg",
        name: "Unidade de Negócio",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: UndNegTable,
        layout: "/admin",
      },
    ],
  },

  //-------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
  //-------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
  //-------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
  //-------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------

  {
    collapse: true,
    name: "Maps",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    state: "mapsCollapse",
    views: [
      {
        path: "/google-maps",
        name: "Google Maps",
        rtlName: "خرائط جوجل",
        mini: "GM",
        rtlMini: "زم",
        component: GoogleMaps,
        layout: "/admin",
      },
      {
        path: "/full-screen-map",
        name: "Full Screen Map",
        rtlName: "خريطة كاملة الشاشة",
        mini: "FSM",
        rtlMini: "ووم",
        component: FullScreenMap,
        layout: "/admin",
      },
      {
        path: "/vector-map",
        name: "Vector Map",
        rtlName: "خريطة المتجه",
        mini: "VM",
        rtlMini: "تم",
        component: VectorMap,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/widgets",
    name: "Widgets",
    rtlName: "الحاجيات",
    icon: "tim-icons icon-settings",
    component: Widgets,
    layout: "/admin",
  },
  {
    path: "/charts",
    name: "Charts",
    rtlName: "الرسوم البيانية",
    icon: "tim-icons icon-chart-bar-32",
    component: Charts,
    layout: "/admin",
  },
  {
    path: "/calendar",
    name: "Calendar",
    rtlName: "التقويم",
    icon: "tim-icons icon-time-alarm",
    component: Calendar,
    layout: "/admin",
  },
];

export default routes;
