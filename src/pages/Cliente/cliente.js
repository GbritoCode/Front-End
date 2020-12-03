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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Row,
  Col
} from "reactstrap";

import { Form, Input } from "@rocketseat/unform";

export default function ClienteCadastro() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Stacked Form</CardTitle>
              </CardHeader>
              <CardBody>
                <Form action="#">
                  Email address</label>
                  <FormGroup>
                    <Input type="email" />
                  </FormGroup>
                  Password</label>
                  <FormGroup>
                    <Input type="password" autoComplete="off" />
                  </FormGroup>
                  <FormGroup check className="mt-3">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign" />
                      Subscribe to newsletter
                    </Label>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
