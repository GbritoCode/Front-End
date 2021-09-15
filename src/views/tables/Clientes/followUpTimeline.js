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
import { Tooltip } from "@material-ui/core";
import classNames from "classnames";
import {
  ArrowBackIos,
  MoodSharp,
  SentimentDissatisfied,
  SentimentSatisfiedAltSharp,
  SentimentVeryDissatisfied,
  SentimentVeryDissatisfiedSharp
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

// reactstrap components
import {
  Badge,
  Card,
  CardBody,
  Row,
  Col,
  Button,
  CardHeader,
  CardTitle
} from "reactstrap";
import { normalizeFone } from "~/normalize";
import api from "~/services/api";
import history from "~/services/history";

export default function FollowUpTimeline() {
  document.body.classList.add("white-content");
  const { cliId, campId } = useParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get(
        `/followUp/${cliId}/false/?ClienteId=${cliId}&CampanhaId=${campId}`
      );
      setData(response.data);
      setIsLoading(false);
    }
    loadData();
  }, [cliId, campId]);

  const checkReaction = (reaction, color) => {
    switch (color) {
      case true:
        switch (reaction) {
          case "pessima":
            return "danger";
          case "ruim":
            return "warning";
          case "neutra":
            return "secundary";
          case "boa":
            return "info";
          case "otima":
            return "success";
          default:
        }
        break;
      case false:
        switch (reaction) {
          case "pessima":
            return <SentimentVeryDissatisfiedSharp />;
          case "ruim":
            return <SentimentVeryDissatisfied />;
          case "neutra":
            return <SentimentDissatisfied />;
          case "boa":
            return <SentimentSatisfiedAltSharp />;
          case "otima":
            return <MoodSharp />;
          default:
        }
        break;
      default:
    }
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="content">
            {/* <div style={{ marginBottom: "0px" }} className="header text-center">
              <h3 className="title">Timeline</h3>

            </div> */}
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="12">
                    <Tooltip title="Voltar">
                      <Button
                        style={{
                          float: "right"
                        }}
                        className={classNames("btn-icon btn-link like")}
                        onClick={() => history.goBack()}
                      >
                        <ArrowBackIos />
                      </Button>
                    </Tooltip>

                    <CardTitle style={{ marginBottom: 0 }} tag="h3">
                      Timeline{" "}
                    </CardTitle>
                    {/* <p style={{ fontSize: 14 }}>
                        </p> */}
                  </Col>
                </Row>
              </CardHeader>
            </Card>
            <Row>
              <Col md="12">
                <Card className="card-timeline card-plain">
                  <CardBody>
                    <ul className="timeline">
                      {data.map((followUp, index) => {
                        return (
                          <>
                            <li
                              className={
                                index % 2 === 0
                                  ? "timeline-inverted"
                                  : "timeline"
                              }
                              key={index}
                            >
                              <div
                                className={`timeline-badge ${checkReaction(
                                  followUp.reacao,
                                  true
                                )}`}
                              >
                                {checkReaction(followUp.reacao, false)}
                              </div>
                              <div className="timeline-panel">
                                <div className="timeline-heading">
                                  <Badge color="info" pill>
                                    {followUp.CliCont.nome}
                                  </Badge>
                                  <Badge color="info" pill>
                                    {normalizeFone(
                                      followUp.CliCont.cel ||
                                        followUp.CliCont.fone
                                    )}
                                  </Badge>
                                </div>
                                <div className="timeline-body">
                                  <p style={{ color: "#656579" }}>
                                    {followUp.detalhes}
                                  </p>
                                </div>
                                <Row>
                                  <Col md="4">
                                    <h5
                                      style={{
                                        color: "#1d8cf8",
                                        marginBottom: 0,
                                        marginTop: 10
                                      }}
                                    >
                                      Data Contato
                                    </h5>
                                    <h6 style={{ color: "grey", marginTop: 0 }}>
                                      <i className="ti-time" />
                                      {followUp.dataContato}
                                    </h6>
                                  </Col>
                                  <Col md="4">
                                    <h5
                                      style={{
                                        color: "#1d8cf8",
                                        marginBottom: 0,
                                        marginTop: 10
                                      }}
                                    >
                                      Data Retorno
                                    </h5>
                                    <h6 style={{ color: "grey", marginTop: 0 }}>
                                      <i className="ti-time" />
                                      {followUp.dataProxContato}
                                    </h6>
                                  </Col>
                                </Row>
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
}
