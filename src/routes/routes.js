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

import CadastroCliente from "~/views/forms/CadastroCliente.js";
import CliCompCadastro from "~/views/forms/Cliente/CliCompCadastro.js";
import CliContCadastro from "~/views/forms/Cliente/CliContCadastro.js";
import CliRecDespCadastro from "~/views/forms/Cliente/CliRecDespCadastro.js";

import ColabCadastro from "~/views/forms/Colab/ColabCadastro.js";
import ColabCompCadastro from "~/views/forms/Colab/ColabCompCadastro.js";

import AreaCadastro from "~/views/forms/AreaCadastro.js";
import EmpresaCadastro from "~/views/forms/EmpresaCadastro.js";
import FornecCadastro from "~/views/forms/FornecCadastro.js";
import ItmControleCadastro from "~/views/forms/ItmControleCadastro.js";
import ParametrosCadastro from "~/views/forms/ParametrosCadastro.js";
import ProdtCadastro from "~/views/forms/ProdtCadastro.js";
import RecDespCadastro from "~/views/forms/RecDespCadastro.js";
import RepresentanteCadastro from "~/views/forms/RepresentanteCadastro.js";
import SegmentoCadastro from "~/views/forms/SegmentoCadastro.js";
import UndNegCadastro from "~/views/forms/UndNegCadastro.js";

//--------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
//--------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
//--------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------
//--------------------------Cadastros Linha248/Linha404 ---------------------------------------------------------------------

//------------------------------------------------

//-------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
//-------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
//-------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------
//-------------TABELAS LINHA482/LINHA 652 ------------------------------------------------------------------------------------------------

import Tabela_Cliente from "~/views/tables/Tabela_Cliente.jsx";
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
import RecDespTable from "~/views/tables/General/RecDespTable.js";
import RepresentanteTable from "~/views/tables/General/RepresentanteTable.js";
import SegmentoTable from "~/views/tables/General/SegmentoTable.js";
import UndNegTable from "~/views/tables/General/UndNegTable.js";

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
        ],
      },
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
        path: "/cliente_cadastro",
        name: "Cadastro de Clientes",
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
        path: "/cadastro/cliente/comp",
        name: "Cadastro de Cliente Complemento",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: CliCompCadastro,
        layout: "/admin",
      },
      {
        path: "/cadastro/cliente/cont",
        name: "Cadastro de Cliente Continuação",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: CliContCadastro,
        layout: "/admin",
      },
      {
        path: "/cadastro/cliente/rec_desp",
        name: "Cadastro de Receitas e Despesas do Cliente",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: CliRecDespCadastro,
        layout: "/admin",
      },
      {
        path: "/cadastro/colab/colab",
        name: "Cadastro de Colaborador",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ColabCadastro,
        layout: "/admin",
      },
      {
        path: "/cadastro/colab/comp",
        name: "Cadastro de Colaborador Complemento",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ColabCompCadastro,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/area",
        name: "Cadastro de Area",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: AreaCadastro,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/empresa",
        name: "Cadastro de Empresa",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: EmpresaCadastro,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/Fornec",
        name: "Cadastro de Fornecedor",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: FornecCadastro,
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
        path: "/cadastro/geral/parametros",
        name: "Cadastro de Parametros",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ParametrosCadastro,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/prodt",
        name: "Cadastro de Produto",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: ProdtCadastro,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/rec_desp",
        name: "Cadastro de Receitas e Despesas",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: RecDespCadastro,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/represent",
        name: "Cadastro de Representante",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: RepresentanteCadastro,
        layout: "/admin",
      },
      {
        path: "/cadastro/geral/sgmet",
        name: "Cadastro de Segmento",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: SegmentoCadastro,
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
    name: "Cadastros",
    rtlName: "الجداول",
    icon: "tim-icons icon-puzzle-10",
    state: "tablesCollapse",
    views: [
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
        path: "/tabela_cliente",
        name: "Clientes",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: Tabela_Cliente,
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
        path: "/tabelas/colab/comp",
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
        path: "/tabelas/general/rec_desp",
        name: "Receita e Despesa",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: RecDespTable,
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
