import React from "react";
import { Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PieChart } from "react-minimal-pie-chart";
import { get, isEmpty, map, getOr} from "lodash/fp";
import { randomColor } from "../../utils/generic";
import { generateLabel } from "../../stateReducers/dashboard";
import { round } from "lodash";

const getByLanguage = (t, data) =>
  map(
    (dataLanguage) => ({
      title: `${round(getOr(0, "percent", dataLanguage), 2)}% ${t(
        "languages:" + getOr("noName", "languageName", dataLanguage)
      )}`,
      value: getOr(0, "percent", dataLanguage),
      label: generateLabel(t, dataLanguage, "languageName"),
      color: getOr(randomColor(), "languageColor", dataLanguage),
    }),
    getOr([], "totalContactsByLanguageContacted", data)
  );

const ByLanguage = (props) => {
  const { t } = useTranslation(["dashboard", "common", "languages"]);
  const byLanguage = getByLanguage(t, get("data", props));

  return (
    <Col
      xs={{ span: 8, offset: 2 }}
      lg={{ span: 2, offset: 0 }}
      className="mt-2"
    >
      <Card>
        <Card.Header className="text-center" style={{ minHeight: "73px" }}>
          {t("titleChartLanguage")}
        </Card.Header>
        <Card.Body>
          {!isEmpty(byLanguage) ? (
            <PieChart
              animate={true}
              data={byLanguage}
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

export default ByLanguage;
