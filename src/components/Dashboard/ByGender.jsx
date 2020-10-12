import React from "react";
import { Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PieChart } from "react-minimal-pie-chart";
import { get, isEmpty, find, getOr, pipe, curry, filter } from "lodash/fp";

const getByGender = (t, data) => {
  const parseObject = (label, color, data) => ({
    title: `${getOr(0, "percent", data)}% ${t(`contacts:${label}`)}`,
    value: getOr(0, "percent", data),
    label: `${getOr(0, "percent", data)}% ${t(`contacts:${label}`)}`,
    color,
  });

  const objectGenderUndefined = pipe(
    find((object) => object.gender === null),
    curry(parseObject)("undefinedGender", "#6c757d")
  )(getOr({}, "totalContactsByGenderContacted", data));

  const objectGenderFemale = pipe(
    find((object) => object.gender === "female"),
    curry(parseObject)("female", "#f008d2")
  )(getOr({}, "totalContactsByGenderContacted", data));

  const objectGenderMale = pipe(
    find((object) => object.gender === "male"),
    curry(parseObject)("male", "#007bff")
  )(getOr({}, "totalContactsByGenderContacted", data));

  return filter((gender) => gender.value > 0, [
    objectGenderUndefined,
    objectGenderMale,
    objectGenderFemale,
  ]);
};

const ByGender = (props) => {
  const { t } = useTranslation(["dashboard", "common", "contacts"]);
  const byGender = getByGender(t, get('data', props));

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
