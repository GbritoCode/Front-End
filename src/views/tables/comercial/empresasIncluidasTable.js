/* eslint-disable no-unused-expressions */
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

import { useParams } from "react-router-dom";
import EmpresasIncluidasCliCamp from "./_empIncluida_cli_camp";
import EmpresasIncluidasCreatedCli from "./_empIncluida_created_cli";

/* eslint-disable eqeqeq */
function ComercialEmpresasIncluidasTable() {
  const { type } = useParams();

  if (type === "created") {
    return EmpresasIncluidasCreatedCli();
  }
  if (type === "campCli") {
    return EmpresasIncluidasCliCamp();
  }
}

export default ComercialEmpresasIncluidasTable;
