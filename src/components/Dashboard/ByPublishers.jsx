import React from "react";
import { Col, Card, Row, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PieChart } from "react-minimal-pie-chart";
import { get, isEmpty, getOr, map } from "lodash/fp";
import { randomColor } from "../../utils/generic";
import { generateLabel } from "../../stateReducers/dashboard";

const getByPublishers = (t, data) =>
  map(
    (dataPublisher) => ({
      title: `${getOr(0, "percent", dataPublisher)}% ${getOr(
        t("noName"),
        "publisherName",
        dataPublisher
      )}`,
      value: getOr(0, "percent", dataPublisher),
      label: generateLabel(t, dataPublisher, "publisherName"),
      color: randomColor(),
    }),
    getOr([], "totalsContactsWaitingFeedbackByPublisher", data)
  );

const ByPublishers = (props) => {
  const { t } = useTranslation(["dashboard", "common"]);
  const byPublishers = getByPublishers(t, get("data", props));

  return (
    <Col xs={{ span: 8, offset: 2 }} lg={{ span: 2, offset: 0 }} className="mt-2">
      <Card>
        <Card.Header className="text-center" style={{ minHeight: "73px" }}>
          {t("titleChartWaitingFeedbackByPublishers")}
        </Card.Header>
        <Card.Body>
          {!isEmpty(byPublishers) ? (
            <>
              <Row>
                <Col>
                  <PieChart
                    animate={true}
                    data={byPublishers}
                    totalValue={100}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <ListGroup>
                    {map(
                      (dataPublisher) => (
                        <ListGroup.Item
                          key={get("color", dataPublisher)}
                          style={{
                            backgroundColor: get("color", dataPublisher),
                          }}
                        >
                          {dataPublisher.label}
                        </ListGroup.Item>
                      ),
                      byPublishers
                    )}
                  </ListGroup>
                </Col>
              </Row>
            </>
          ) : (
            <Card.Text className="text-center">{t("common:noData")}</Card.Text>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ByPublishers;
