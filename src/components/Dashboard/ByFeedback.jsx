import React from "react";
import { Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PieChart } from "react-minimal-pie-chart";
import { get, isEmpty, getOr } from "lodash/fp";

const getByFeedback = (t, data) => {
  if (
    getOr(0, "totalPercentContactsAssignByMeWaitingFeedback", data) === 0 &&
    getOr(0, "totalPercentContactsAssignByOthersWaitingFeedback", data) === 0
  )
    return [];

  return [
    {
      title: t("totalContactsAssignByMeWaitingFeedback"),
      value: getOr(0, "totalPercentContactsAssignByMeWaitingFeedback", data),
      label: `${getOr(
        0,
        "totalPercentContactsAssignByMeWaitingFeedback",
        data
      )}% ${t("totalContactsAssignByMeWaitingFeedback")}`,
      color: "#007bff",
    },
    {
      title: t("totalContactsWaitingFeedback"),
      label: `${getOr(
        0,
        "totalPercentContactsAssignByOthersWaitingFeedback",
        data
      )}% ${t("totalContactsWaitingFeedback")}`,
      value: getOr(
        0,
        "totalPercentContactsAssignByOthersWaitingFeedback",
        data
      ),
      color: "#6610f2",
    },
  ];
};

const ByFeedback = (props) => {
  const { t } = useTranslation(["dashboard", "common"]);
  const byFeedback = getByFeedback(t, get("data", props));
  return (
    <Col xs={{ span: 8, offset: 2 }} lg={{ span: 3, offset: 0 }}>
      <Card>
        <Card.Header className="text-center" style={{ minHeight: "73px" }}>
          {t("titleChartWaitingFeedback")}
        </Card.Header>
        <Card.Body>
          {!isEmpty(byFeedback) ? (
            <PieChart
              animate={true}
              data={byFeedback}
              totalValue={100}
              label={({ dataEntry }) => get("label", dataEntry)}
              labelStyle={{
                fontSize: "5px",
              }}
            />
          ) : (
            <Card.Text className="text-center">{t("common:noData")}</Card.Text>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ByFeedback;
