import React from "react";
import { Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PieChart } from "react-minimal-pie-chart";
import { get, isEmpty, getOr, compact } from "lodash/fp";
import { round } from "lodash";
const getByContacted = (t, data) => {
  if (
    getOr(0, "totalPercentContacted", data) === 0 &&
    getOr(0, "totalPercentWithoutContacted", data) === 0
  )
    return [];

  return compact([
    getOr(0, "totalPercentContacted", data) > 0
      ? {
          label: t("contacted"),
          title: `${round(getOr(0, "totalPercentContacted", data), 2)}% ${t(
            "contacted"
          )}`,
          value: getOr(0, "totalPercentContacted", data),
          color: "#28a745",
        }
      : null,
    getOr(0, "totalPercentWithoutContacted", data) > 0
      ? {
          label: t("withoutContact"),
          title: `${round(
            getOr(0, "totalPercentWithoutContacted", data),
            2
          )}% ${t("withoutContact")}`,
          value: getOr(0, "totalPercentWithoutContacted", data),
          color: "#f73939",
        }
      : null,
  ]);
};

const ByContacted = (props) => {
  const { t } = useTranslation(["dashboard", "common"]);
  const byContacted = getByContacted(t, get("data", props));

  return (
    <Col
      xs={{ span: 8, offset: 2 }}
      lg={{ span: 2, offset: 3 }}
      className="mt-2"
    >
      <Card>
        <Card.Header className="text-center" style={{ minHeight: "73px" }}>
          {t("titleChartContacts")}
        </Card.Header>
        <Card.Body>
          {!isEmpty(byContacted) ? (
            <PieChart
              animate={true}
              data={byContacted}
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

export default ByContacted;
