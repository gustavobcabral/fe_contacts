import React from "react";
import { Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PieChart } from "react-minimal-pie-chart";
import { get, isEmpty, find, getOr, pipe, curry } from "lodash/fp";

const getByGender = (t, data) => {
  const female = find(
    (object) => object.gender === "female",
    getOr({}, "totalContactsByGenderContacted", data)
  );

  const male = find(
    (object) => object.gender === "male",
    getOr({}, "totalContactsByGenderContacted", data)
  );

  const undefinedGender = find(
    (object) => object.gender === null,
    getOr({}, "totalContactsByGenderContacted", data)
  );

  const objectGenderUndefined = {
    title: `${getOr(0, "percent", undefinedGender)}% ${t(
      "common:undefinedGender"
    )}`,
    value: getOr(0, "percent", undefinedGender),
    label: `${getOr(0, "percent", undefinedGender)}% ${t(
      "common:undefinedGender"
    )}`,
    color: "#6c757d",
  };

  const arrayGender = [
    {
      title: `${getOr(0, "percent", female)}% ${t("common:female")}`,
      value: getOr(0, "percent", female),
      label: `${getOr(0, "percent", female)}% ${t("common:female")}`,
      color: "#f008d2",
    },
    {
      title: `${getOr(0, "percent", male)}% ${t("common:male")}`,
      value: getOr(0, "percent", male),
      label: `${getOr(0, "percent", male)}% ${t("common:male")}`,
      color: "#007bff",
    },
  ];
  return getOr(0, "percent", undefinedGender) > 0
    ? [...arrayGender, objectGenderUndefined]
    : arrayGender;
};

const ByGender = (props) => {
  const { t } = useTranslation(["dashboard", "common"]);
  const byGender = pipe(get("data"), curry(getByGender)(t))(props);

  return (
    <Col xs={{ span: 8, offset: 2 }} lg={{ span: 3, offset: 0 }}>
      <Card>
        <Card.Header className="text-center" style={{ minHeight: "73px" }}>
          {t("titleChartGender")}
        </Card.Header>
        <Card.Body>
          {!isEmpty(byGender) ? (
            <PieChart
              animate={true}
              data={byGender}
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

export default ByGender;
