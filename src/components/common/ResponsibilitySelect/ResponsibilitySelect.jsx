import React from "react";
import SuperSelect from "../SuperSelect/SuperSelect";
import { withTranslation } from "react-i18next";
import { responsibility } from "../../../services";
import { reduceResponsibility } from "../../../stateReducers/responsibility";

class ResponsibilitySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { responsibilityOptions: [], loading: false };
    this.handleGetAll = this.handleGetAll.bind(this);
  }

  async handleGetAll() {
    this.setState({ loading: true });
    const { t, justAllowedForMe } = this.props;
    const responsibilityOptions = reduceResponsibility(
      t,
      justAllowedForMe,
      await responsibility.get()
    );
    this.setState({ responsibilityOptions, loading: false });
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
      disabled = false,
    } = this.props;
    const { responsibilityOptions, loading } = this.state;

    return (
      <SuperSelect
        name={name || "idResponsibility"}
        label={label || t("responsibility")}
        isClearable={true}
        validator={validator}
        validated={validated}
        loading={loading}
        value={value}
        options={responsibilityOptions}
        onChange={onChange}
        rules={rules}
        disabled={disabled}
      />
    );
  }
}

export default withTranslation(["responsibility", "common"])(
  ResponsibilitySelect
);
