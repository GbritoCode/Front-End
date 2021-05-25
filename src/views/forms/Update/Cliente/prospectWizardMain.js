/*!

=========================================================
* Black Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// reactstrap components
import { Col } from "reactstrap";

// wizard steps
import Step1 from "./ProspectWizardSteps/step1_Prospect";
import Step2 from "./ProspectWizardSteps/step2_ProspectAddress";
import Step3 from "./ProspectWizardSteps/step3_ProspectContato";

var steps = [
  {
    stepName: "Informações básicas",
    stepIcon: "tim-icons icon-single-02",
    component: Step1
  },
  {
    stepName: "Endereço",
    stepIcon: "tim-icons icon-settings-gear-63",
    component: Step2
  },
  {
    stepName: "Contato",
    stepIcon: "tim-icons icon-delivery-fast",
    component: Step3
  }
];

export default function ProspectWizard() {
  return (
    <>
      <div className="content">
        <Col className="mr-auto ml-auto" md="10">
          <ReactWizard
            steps={steps}
            validate
            navSteps
            previousButtonText="Anterior"
            finishButtonText="Enviar"
            nextButtonText="Próximo"
            title="Criação de Prospect"
            description="Informações básicas de cadastro"
            headerTextCenter
            finishButtonClasses="btn-wd btn-info"
            nextButtonClasses="btn-wd btn-info"
            previousButtonClasses="btn-wd"
            progressbar
            color="blue"
          />
        </Col>
      </div>
    </>
  );
}
