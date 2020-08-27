import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import * as yup from "yup";

import { createEmpRequest } from "~/store/modules/auth/actions";

const Schema = yup.object().shape({
  email: yup
    .string()
    .email("Insira um email válido")
    .required("o email é obrigatório"),
  password: yup.string().required("A senha é obrigatória")
});

export default function Emp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ emp }) {
    dispatch(createEmpRequest(emp));
  }

  return (
    <>
      <img alt="GoBarber" />
      <Form onSubmit={handleSubmit}>
        <Input name="emp" type="emp" placeholder="empresa" />

        <button type="submit">{loading ? "Carregando..." : "Acessar"}</button>
      </Form>
    </>
  );
}
