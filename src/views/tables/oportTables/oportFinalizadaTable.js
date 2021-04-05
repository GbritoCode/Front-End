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
import React, { useEffect, useState } from "react";
import classNames from "classnames";
// react component for creating dynamic tables
import ReactTable from "react-table-v6";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Button,
  Modal,
  ModalBody,
  Input,
  Label
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import { Close, Message } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { normalizeCnpj } from "~/normalize";
import api from "~/services/api";

/* eslint-disable eqeqeq */
function OportFinTable() {
  // --------- colocando no modo claro do template
  document.body.classList.add("white-content");
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [modalMini, setModalMini] = useState(false);
  const [altering, setAltering] = useState(false);
  const history = useHistory();

  const checkFase = value => {
    if (value == 1) {
      return "Aberta";
    }
    if (value == 2) {
      return "Em Cotação";
    }
    if (value == 3) {
      return "Cotada";
    }
    if (value == 4) {
      return "Aprovada";
    }
  };
  useEffect(() => {
    async function loadData() {
      const response = await api.get("/oportunidade/?finalizadas=true");
      setData(
        response.data.map((oport, key) => {
          return {
            idd: key,
            id: oport.id,
            Empresa: normalizeCnpj(oport.Empresa.nome),
            Colab: oport.Colab.nome,
            data: oport.data,
            fase: checkFase(oport.fase),
            Cliente: oport.Cliente.nomeAbv,
            contato: oport.contato,
            cod: oport.cod,
            UndNeg: oport.UndNeg.descUndNeg,
            RecDesp: oport.RecDesp.descItem,
            segmento: oport.Segmento.descSegmt,
            representante: oport.Representante.nome,
            desc: oport.desc,
            actions: (
              // we've added some custom button actions
              <>
                <div className="actions-right">
                  <Tooltip title="Cotar">
                    <Button
                      hidden={oport.fase >= 2}
                      color="default"
                      size="sm"
                      className={classNames("btn-icon btn-link like")}
                      onClick={async () => {
                        history.push(
                          `/cadastro/oportunidade/cotacao/${oport.id}`
                        );
                      }}
                    >
                      <i className="tim-icons icon-money-coins" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Revisar">
                    <Button
                      hidden={oport.fase > 3 || oport.fase < 2}
                      color="default"
                      size="sm"
                      className={classNames("btn-icon btn-link like")}
                      onClick={() => {
                        history.push(
                          `/cadastro/oportunidade/cotacao/${oport.id}`
                        );
                      }}
                    >
                      <i className="tim-icons icon-bulb-63" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Aprovar">
                    <Button
                      hidden={oport.fase >= 4}
                      color="default"
                      size="sm"
                      className={classNames("btn-icon btn-link like")}
                      onClick={() => {
                        setAltering({
                          altering: oport.id,
                          status: "aprovar",
                          fase: 4,
                          textHidden: true
                        });
                        setModalMini(!modalMini);
                      }}
                    >
                      <i className="tim-icons icon-spaceship" />
                    </Button>
                  </Tooltip>

                  {/* use this button to add a edit kind of action */}
                  <Tooltip title="Editar">
                    <Link to={`/update/oportunidade/oport/${oport.id}`}>
                      <Button
                        color="default"
                        size="sm"
                        className={classNames("btn-icon btn-link like")}
                        onClick={() => {
                          setAltering(oport.id);
                          setModalMini(!modalMini);
                        }}
                      >
                        <i className="tim-icons icon-pencil" />
                      </Button>
                    </Link>
                  </Tooltip>

                  {/* use this button to remove the data row */}
                </div>
              </>
            )
          };
        })
      );
    }
    loadData();
  }, [dispatch, history, modalMini]);

  const toggleModalMini = () => {
    setModalMini(!modalMini);
  };

  return (
    <>
      <div className="content">
        <Modal
          modalClassName="modal-mini "
          isOpen={modalMini}
          toggle={toggleModalMini}
        >
          <div className="modal-header justify-content-center">
            <button
              aria-hidden
              className="close"
              data-dismiss="modal"
              type="button"
              color="primary"
              onClick={toggleModalMini}
            >
              <Close />
            </button>
            <div>
              <Message fontSize="large" />
            </div>
          </div>
          <ModalBody className="text-center">
            <p> Deseja {altering.status} essa oportunidade ? </p>
            <Label hidden={altering.textHidden} style={{ float: "left" }}>
              Motivo
            </Label>
            <Input
              hidden={altering.textHidden}
              name="motivo"
              type="textarea"
              onChange={e => {
                var { value } = e.target;
                setAltering(prevState => ({
                  ...prevState,
                  motivo: value
                }));
              }}
            />
          </ModalBody>
          <div className="modal-footer">
            <Button
              style={{ color: "#000" }}
              className="btn-neutral"
              type="button"
              onClick={toggleModalMini}
            >
              Não
            </Button>
            <Button
              style={{ color: "#7E7E7E" }}
              className="btn-neutral"
              type="button"
              onClick={() => {
                if (altering.fase === 5) {
                  if (altering.motivo) {
                    api
                      .put(`oportunidade/${altering.altering}`, {
                        fase: altering.fase,
                        motivo: altering.motivo
                      })
                      .then(() => toggleModalMini());
                    switch (altering.fase) {
                      case 4:
                        history.push(
                          `/cadastro/oportunidade/parcela/${altering.altering}`
                        );
                        break;
                      case 5 || 4:
                        history.go(0);
                        break;
                      default:
                        break;
                    }
                  }
                } else {
                  api
                    .put(`oportunidade/${altering.altering}`, {
                      fase: altering.fase
                    })
                    .then(() => {
                      toggleModalMini();
                    });
                  switch (altering.fase) {
                    case 4:
                      history.push(
                        `/cadastro/oportunidade/parcela/${altering.altering}`
                      );
                      break;
                    case 5 || 4:
                      history.go(0);
                      break;
                    default:
                      break;
                  }
                }
              }}
            >
              Sim
            </Button>
          </div>
        </Modal>
        <Col xs={12} md={12}>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                Oportunidades
                <Link to="/cadastro/oportunidade/oport">
                  <Tooltip title="Novo" placement="top" interactive>
                    <Button
                      style={{
                        float: "right"
                      }}
                      className={classNames("btn-icon btn-link like")}
                    >
                      <AddIcon fontSize="large" />
                    </Button>
                  </Tooltip>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={data}
                filterable
                resizable
                defaultFilterMethod={(filter, row) => {
                  const id = filter.pivotId || filter.id;
                  return row[id] !== undefined
                    ? String(row[id])
                        .toLowerCase()
                        .startsWith(filter.value.toLowerCase())
                    : true;
                }}
                previousText="Anterior"
                nextText="Próximo"
                loadingText="Carregando"
                noDataText="Dados não encontrados"
                pageText="Página"
                ofText="de"
                rowsText="Linhas"
                columns={[
                  {
                    Header: "Código",
                    accessor: "cod"
                  },
                  {
                    Header: "descrição",
                    accessor: "desc",
                    width: 301,
                    filterMethod: (filter, row) => {
                      const id = filter.pivotId || filter.id;
                      return row[id] !== undefined
                        ? String(row[id])
                            .toLowerCase()
                            .includes(filter.value.toLowerCase())
                        : true;
                    }
                  },
                  {
                    Header: "fase",
                    accessor: "fase"
                  },
                  {
                    Header: "Cliente",
                    accessor: "Cliente"
                  },
                  {
                    Header: "data",
                    accessor: "data"
                  },
                  {
                    Header: "Ações",
                    accessor: "actions",
                    sortable: false,
                    filterable: false,
                    minWidth: 212
                  }
                ]}
                defaultPageSize={10}
                showPagination
                showPageJump
                showPaginationBottom
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </Col>
      </div>
    </>
  );
}

export default OportFinTable;
