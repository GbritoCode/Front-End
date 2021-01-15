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
/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link" href="https://www.aidera.com.br">
                Aidera
              </a>
            </li>{" "}
          </ul>
          <div className="copyright">
            © {new Date().getFullYear()} Feito com {" "}
            <i className="tim-icons icon-heart-2" /> by{" "}
            <a href="https://www.aidera.com.br/" target="_blank">
              Aidera
            </a>{" "}
            por uma web melhor.
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
