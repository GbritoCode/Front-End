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
import classnames from "classnames";
// reactstrap components
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NOME_ABV: "",
      REPRESENTANTE: "",
      CNPJ: "",
      NOME_ABVState: "",
      REPRESENTANTEState: "",
      CNPJState: "",
    };
  }
  // function that returns true if value is email, false otherwise
  verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  // function that verifies if value contains only numbers
  verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };
  change = (event, stateName, type, stateNameEqualTo, maxValue) => {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "number":
        if (this.verifyNumber(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  };
  isValidated = () => {
    if (
      this.state.NOME_ABVState === "has-success" &&
      this.state.REPRESENTANTEState === "has-success" &&
      this.state.CNPJState === "has-success" &&
      this.state.TIPO_COMISSState === "has-success"
    ) {
      return true;
    } else {
      if (this.state.NOME_ABVState !== "has-success") {
        this.setState({ NOME_ABVState: "has-danger" });
      }
      if (this.state.REPRESENTANTEState !== "has-success") {
        this.setState({ REPRESENTANTEState: "has-danger" });
      }
      if (this.state.CNPJState !== "has-success") {
        this.setState({ CNPJState: "has-danger" });
      }
      if (this.state.TIPO_COMISSState !== "has-success") {
        this.setState({ TIPO_COMISSState: "has-danger" });
      }
      return false;
    }
  };
  render() {
    return (
      <>
        <h5 className="info-text">
          Let's start with the basic information (with validation)
        </h5>
        <Row className="justify-content-center mt-5">
          <Col sm="5">
            <InputGroup
              className={classnames(this.state.NOME_ABVState, {
                "input-group-focus": this.state.NOME_ABVFocus,
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-single-02" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="NOME_ABV"
                placeholder="Nome"
                type="text"
                onChange={(e) => this.change(e, "NOME_ABV", "length", 1)}
                onFocus={(e) => this.setState({ NOME_ABVFocus: true })}
                onBlur={(e) => this.setState({ NOME_ABVFocus: false })}
              />
              {this.state.NOME_ABVState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
            <InputGroup
              className={classnames(this.state.CNPJState, {
                "input-group-focus": this.state.CNPJFocus,
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-email-85" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="CNPJ"
                placeholder="CNPJ"
                type="CNPJ"
                onChange={(e) => this.change(e, "CNPJ", "number")}
                onFocus={(e) => this.setState({ CNPJFocus: true })}
                onBlur={(e) => this.setState({ CNPJFocus: false })}
              />
              {this.state.CNPJState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
          </Col>
          <Col sm="5">
            <InputGroup
              className={classnames(this.state.REPRESENTANTEState, {
                "input-group-focus": this.state.REPRESENTANTEFocus,
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-caps-small" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="REPRESENTANTE"
                placeholder="REPRESENTANTE"
                type="text"
                onChange={(e) => this.change(e, "REPRESENTANTE", "length", 1)}
                onFocus={(e) => this.setState({ REPRESENTANTEFocus: true })}
                onBlur={(e) => this.setState({ REPRESENTANTEFocus: false })}
              />
              {this.state.REPRESENTANTEState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
            <InputGroup
              className={classnames(this.state.TIPO_COMISSState, {
                "input-group-focus": this.state.TIPO_COMISSFocus,
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-mobile" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="TIPO_COMISS"
                placeholder="Tipo de comissão"
                type="number"
                onChange={(e) => this.change(e, "TIPO_COMISS", "number")}
                onFocus={(e) => this.setState({ TIPO_COMISSFocus: true })}
                onBlur={(e) => this.setState({ TIPO_COMISSFocus: false })}
              />
              {this.state.TIPO_COMISSState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
          </Col>
          <Col sm="10">
            <InputGroup
              className={classnames({
                "input-group-focus": this.state.CODIGO_EMPFocus,
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="tim-icons icon-mobile" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="CODIGO_EMP"
                placeholder="Tipo de comissão"
                type="number"
                onChange={(e) => this.change(e, "CODIGO_EMP", "number")}
                onFocus={(e) => this.setState({ CODIGO_EMPFocus: true })}
                onBlur={(e) => this.setState({ CODIGO_EMPFocus: false })}
              />
              {this.state.CODIGO_EMPState === "has-danger" ? (
                <label className="error">This field is required.</label>
              ) : null}
            </InputGroup>
          </Col>
        </Row>
      </>
    );
  }
}

export default Wizard;
