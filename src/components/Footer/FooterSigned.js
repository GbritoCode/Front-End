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
/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";
import { store } from "~/store";
import api from "~/services/api";
import { normalizeCnpj } from "~/normalize";

const FooterSigned = (props) => {
  const [data, setData] = useState({nome: '', idFederal: ''})
  useEffect(()=>{
      const { empresa } = store.getState().auth;
    async function loadData(){
      const response1 = await api.get(`/empresa/${empresa}`)
      setData(response1.data)
    }
    loadData()
  },[])
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
         { data ===null? '': <div className="copyright">
           {data.nome} | {normalizeCnpj(data.idFederal)}
        </div>}
      </Container>
    </footer>
  );
};

FooterSigned.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default FooterSigned;
