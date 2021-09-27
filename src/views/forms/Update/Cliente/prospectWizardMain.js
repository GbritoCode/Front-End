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
import api from "~/services/api";
import history from "~/services/history";

// wizard steps
import Step1 from "./ProspectWizardSteps/step1_Prospect";
import Step2 from "./ProspectWizardSteps/step2_ProspectAddress";
import Step3 from "./ProspectWizardSteps/step3_ProspectContato";
import Step4 from "./ProspectWizardSteps/step4_optionalInfo";

var steps = [
  {
    stepName: "Informações básicas",
    stepIcon: "tim-icons icon-settings-gear-63",
    component: Step1
  },
  {
    stepName: "Complemento Prospect",
    stepIcon: "tim-icons icon-delivery-fast",
    component: Step2
  },
  {
    stepName: "Contato Prospect",
    stepIcon: "tim-icons icon-single-02",
    component: Step3
  },
  {
    stepName: "Informações Opcionais",
    stepIcon: "tim-icons icon-link-72",
    component: Step4
  }
];

export default function ProspectWizard() {
  const finishButtonClick = async allStates => {
    await api
      .post("/prospect", allStates)
      .then(() => history.push("/tabelas/cliente/prospect"));
  };
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
            description="Novo Prospect"
            // headerTextCenter
            finishButtonClasses="btn-wd btn-info"
            nextButtonClasses="btn-wd btn-info"
            previousButtonClasses="btn-wd"
            progressbar
            color="blue"
            finishButtonClick={finishButtonClick}
          />
        </Col>
      </div>
    </>
  );
}
