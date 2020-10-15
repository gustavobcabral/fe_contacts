import React from "react";
import SuperSelect from "../SuperSelect/SuperSelect";
import { withTranslation } from "react-i18next";
import { languages } from "../../../services";
import { getOr, pipe, curry } from "lodash/fp";
import { reduceLanguages } from "../../../stateReducers/languages";

class LanguageSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { languagesOptions: [], submitting: false };
    this.handleGetAll = this.handleGetAll.bind(this);
  }

  async handleGetAll() {
    this.setState({ submitting: true });
    const { t } = this.props;
    const languagesOptions = pipe(
      getOr([], "data.data"),
      curry(reduceLanguages)(t)
    )(await languages.getAll());
    this.setState({ languagesOptions, submitting: false });
  }

  componentDidMount() {
    this.handleGetAll();
  }

  render() {
    const {
      value,
      onChange,
      validated,
      name,
      validator,
      t,
      label,
      rules,
    } = this.props;
    const { languagesOptions } = this.state;

    return (
      <SuperSelect
        name={name || "idLanguage"}
        label={label || t("labelSelect")}
        isClearable={true}
        validator={validator}
        validated={validated}
        value={value}
        options={languagesOptions}
        onChange={onChange}
        rules={rules}
      />
    );
  }
}

export default withTranslation(["languages", "common"])(LanguageSelect);
