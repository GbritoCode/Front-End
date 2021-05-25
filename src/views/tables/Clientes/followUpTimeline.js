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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

// reactstrap components
import { Badge, Card, CardBody, Row, Col } from "reactstrap";
import api from "~/services/api";

export default function FollowUpTimeline() {
  document.body.classList.add("white-content");
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/followUp/${id}/false/?ClienteId=${id}`);
      setData(response.data);
      setIsLoading(false);
    }
    loadData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="content">
            <div className="header text-center">
              <h3 className="title">Histórico</h3>
            </div>
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
                              <div className="timeline-badge danger">
                                <i className="tim-icons icon-planet" />
                              </div>
                              <div className="timeline-panel">
                                <div className="timeline-heading">
                                  <Badge color="info" pill>
                                    {followUp.CliCont.nome}
                                  </Badge>
                                  <Badge color="info" pill>
                                    {followUp.CliCont.cel ||
                                      followUp.CliCont.fone}
                                  </Badge>
                                </div>
                                <div className="timeline-body">
                                  <p>{followUp.detalhes}</p>
                                </div>
                                <h6 style={{ color: "grey" }}>
                                  <i className="ti-time" />
                                  {followUp.dataContato}
                                </h6>
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
