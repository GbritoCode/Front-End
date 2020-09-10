import { Switch, Redirect } from "react-router-dom";
import Route from "./Route";
import React from "react";

import signIn from "~/pages/signIn";
import singUp from "~/pages/signUp";
//import ClienteCadastro from "~/pages/Cliente";

import Dashboard from "~/pages/dashboard";

import VectorMap from "~/views/maps/VectorMap.jsx";
import GoogleMaps from "~/views/maps/GoogleMaps.jsx";
import FullScreenMap from "~/views/maps/FullScreenMap.jsx";
import RegularTables from "~/views/tables/RegularTables.jsx";
import ExtendedTables from "~/views/tables/ExtendedTables.jsx";
import Wizard from "~/views/forms/Wizard.jsx";
import ValidationForms from "~/views/forms/ValidationForms.jsx";
import ExtendedForms from "~/views/forms/ExtendedForms.jsx";

//-----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------
//-----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------
//-----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------
//-----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------
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

//-----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------
//-----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------
//-----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------
//-----------cadastros linha xxx/linhaxxx------------------------------------------------------------------------------------------------------------------------------------

//-------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
//-------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
//-------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------
//-------------TABELAS LINHA482/ LINHA 652 ------------------------------------------------------------------------------------------------

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

import Lock from "~/views/pages/Lock.jsx";

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" exact component={signIn} />
      <Route path="/register" component={singUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/vector-map" component={VectorMap} isPrivate />
      <Route path="/google-maps" component={GoogleMaps} isPrivate />
      <Route path="/full-screen-map" component={FullScreenMap} isPrivate />
      {/*//---------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------*/}
      {/**CLIENTE */}
      <Route path="/regular-tables" component={RegularTables} isPrivate />
      <Route path="/extended-tables" component={ExtendedTables} isPrivate />
      <Route path="/tabela_cliente" component={Tabela_Cliente} isPrivate />
      <Route
        path="/tabelas/cliente/comp/:id"
        component={CliCompTable}
        isPrivate
      />
      <Route
        path="/tabelas/cliente/cont/:id"
        component={CliContTable}
        isPrivate
      />
      <Route
        path="/tabelas/cliente/rec_desp/:id"
        component={CliRecDespTable}
        isPrivate
      />
      <Route path="/tabelas/colab" component={ColabTable} isPrivate />
      <Route path="/tabelas/colab/comp" component={ColabCompTable} isPrivate />
      <Route path="/tabelas/general/area" component={AreaTable} isPrivate />
      <Route
        path="/tabelas/general/empresa"
        component={EmpresaTable}
        isPrivate
      />
      <Route path="/tabelas/general/fornec" component={FornecTable} isPrivate />
      <Route
        path="/tabelas/general/itm_controle"
        component={ItmControleTable}
        isPrivate
      />
      <Route
        path="/tabelas/general/parametros"
        component={ParametrosTable}
        isPrivate
      />
      <Route path="/tabelas/general/prodt" component={ProdtTable} isPrivate />
      <Route
        path="/tabelas/general/rec_desp"
        component={RecDespTable}
        isPrivate
      />
      <Route
        path="/tabelas/general/representante"
        component={RepresentanteTable}
        isPrivate
      />
      <Route
        path="/tabelas/general/segmento"
        component={SegmentoTable}
        isPrivate
      />
      <Route
        path="/tabelas/general/und_neg"
        component={UndNegTable}
        isPrivate
      />
      {/*//---------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------*/}
      {/**CLIENTE */}
      <Route path="/wizard" component={Wizard} isPrivate />
      <Route path="/validation-forms" component={ValidationForms} isPrivate />
      <Route path="/extended-forms" component={ExtendedForms} isPrivate />
      {/*//---------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------*/}
      {/**CLIENTE */}
      <Route path="/cliente_cadastro" component={CadastroCliente} isPrivate />
      <Route
        path="/cliente_update/:id/:prct?"
        component={ClienteUpdate}
        isPrivate
      />
      <Route
        path="/cadastro/cliente/comp"
        component={CliCompCadastro}
        isPrivate
      />
      <Route
        path="/cliente/comp_update/:id"
        component={CliCompUpdate}
        isPrivate
      />
      <Route
        path="/cadastro/cliente/cont"
        component={CliContCadastro}
        isPrivate
      />
      <Route
        path="/cliente/cont_update/:id"
        component={CliContUpdate}
        isPrivate
      />
      <Route
        path="/cadastro/cliente/rec_desp"
        component={CliRecDespCadastro}
        isPrivate
      />
      {/**CLIENTE FIM */}
      {/*COLAB */}
      <Route
        path="/cadastro/colab/colab"
        component={ColabCadastro}
        isPrivate
      />{" "}
      <Route
        path="/cadastro/colab/comp"
        component={ColabCompCadastro}
        isPrivate
      />
      {/**COLAB FIM */}
      <Route path="/cadastro/geral/area" component={AreaCadastro} isPrivate />
      <Route
        path="/cadastro/geral/empresa"
        component={EmpresaCadastro}
        isPrivate
      />
      <Route
        path="/cadastro/geral/fornec"
        component={FornecCadastro}
        isPrivate
      />
      <Route
        path="/cadastro/geral/itm_controle"
        component={ItmControleCadastro}
        isPrivate
      />
      <Route
        path="/cadastro/geral/parametros"
        component={ParametrosCadastro}
        isPrivate
      />
      <Route path="/cadastro/geral/prodt" component={ProdtCadastro} isPrivate />
      <Route
        path="/cadastro/geral/rec_desp"
        component={RecDespCadastro}
        isPrivate
      />
      <Route
        path="/cadastro/geral/represent"
        component={RepresentanteCadastro}
        isPrivate
      />
      <Route
        path="/cadastro/geral/sgmet"
        component={SegmentoCadastro}
        isPrivate
      />
      <Route
        path="/cadastro/geral/und_neg"
        component={UndNegCadastro}
        isPrivate
      />
      {/*//---------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------}
      {//-----------cadastros Linha 89/linha 155------------------------------------------------------------------------------------------------------------------------------------*/}
      <Route path="/widgets" component={Widgets} isPrivate />
      <Route path="/calendar" component={Calendar} isPrivate />
      <Route path="/charts" component={Charts} isPrivate />
      <Route path="/buttons" component={Buttons} isPrivate />
      <Route path="/notifications" component={Notifications} isPrivate />
      <Route path="/grid-system" component={Grid} isPrivate />
      <Route path="/typography" component={Typography} isPrivate />
      <Route path="/panels" component={Panels} isPrivate />
      <Route path="/icons" component={Icons} isPrivate />
      <Route path="/pricing" component={Pricing} />
      <Route path="/timeline" component={Timeline} isPrivate />
      <Route path="/user-profile" component={User} isPrivate />
      <Route path="/sweet-alert" component={SweetAlert} isPrivate />
      <Route path="/lock-screen" component={Lock} />
      <Redirect from="/" to="/login" />
    </Switch>
  );
}

/*{
  path: "/dashboard",
  name: "Dashboard",
  rtlName: "لوحة القيادة",
  icon: "tim-icons icon-chart-pie-36",
  component: Dashboard,
  layout: "/admin"
},
name={dashboard} icon={} layout={"/admin"}*/
