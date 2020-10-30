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
import React from "react";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// reactstrap components
import { Col } from "reactstrap";

// wizard steps
import Step1 from "./WizardSteps/Step1.jsx";
import Step2 from "./WizardSteps/Step2.jsx";
import Step3 from "./WizardSteps/Step3.jsx";

import axios from "axios";

var steps = [
  {
    stepName: "About",
    stepIcon: "tim-icons icon-single-02",
    component: Step1,
  },
  {
    stepName: "Account",
    stepIcon: "tim-icons icon-settings-gear-63",
    component: Step2,
  },
  {
    stepName: "Address",
    stepIcon: "tim-icons icon-delivery-fast",
    component: Step3,
  },
];

class Wizard extends React.Component {
  componentDidMount() {
    //--------- colocando no modo claro do template
    document.body.classList.add("white-content");
  }
  finishButtonClick(allStates) {
    console.log(allStates);
    const {
      NOME_ABV,
      CNPJ,
      REPRESENTANTE,
      TIPO_COMISS,
      CODIGO_EMP,
    } = allStates.About;
    console.log({
      NOME_ABV,
      CNPJ,
      REPRESENTANTE,
      TIPO_COMISS,
      CODIGO_EMP,
    });
    axios
      .post("http://localhost:51314/cliente", {
        NOME_ABV,
        CNPJ,
        REPRESENTANTE,
        TIPO_COMISS,
        CODIGO_EMP,
      })
      .then((result) => {
        //access the results here....
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  render() {
    return (
      <>
        <div className="content">
          <Col className="mr-auto ml-auto" md="10">
            <ReactWizard
              steps={steps}
              navSteps
              validate
              title="Build Your Profile"
              description="This information will let us know more about you."
              headerTextCenter
              finishButtonClasses="btn-wd btn-info"
              nextButtonClasses="btn-wd btn-info"
              previousButtonClasses="btn-wd"
              progressbar
              color="blue"
              finishButtonClick={this.finishButtonClick}
            />
          </Col>
        </div>
      </>
    );
  }
}

export default Wizard;
