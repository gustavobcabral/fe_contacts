import React from "react";
import { Link } from "react-router-dom";
import { get, map } from "lodash/fp";
import { useTranslation } from "react-i18next";
import "./styles.css";

const setSelected = (props, to) => {
  const { location } = props;
  return get("pathname", location) === to ? "selected" : "noSelected";
};

const pages = [
  { label: "Home", to: "/" },
  { label: "Contacts", to: "/contacts" },
  { label: "Publishers", to: "/publishers" },
];

const SideMenu = (props) => {
  const { t } = useTranslation(["sideMenu"]);

  return (
    <div className="side-menu">
      {map(
        (page) => (
          <Link
            key={page.to}
            className={setSelected(props, page.to)}
            to={page.to}
          >
            {t(page.label)}
          </Link>
        ),
        pages
      )}
    </div>
  );
};

export default SideMenu;
