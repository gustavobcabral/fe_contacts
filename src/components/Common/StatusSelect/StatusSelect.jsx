import React from "react";
import SuperSelect from "../SuperSelect/SuperSelect";
import { withTranslation } from "react-i18next";
import { status } from "../../../services";
import { getOr, pipe, curry } from "lodash/fp";
import { reduceStatus } from "../../../stateReducers/status";

class StatusSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { statusOptions: [], submitting: false };
    this.handleGetAll = this.handleGetAll.bind(this);
  }

  async handleGetAll() {
    this.setState({ submitting: true });
    const id = getOr(0, "props.id", this);
    const { t } = this.props;
    const statusOptions = pipe(
      getOr([], "data.data"),
      curry(reduceStatus)(t)
    )(await status.getAll(id));
    this.setState({ statusOptions, submitting: false });
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
    const { statusOptions } = this.state;

    return (
      <SuperSelect
        name={name || "idStatus"}
        label={label || t("status")}
        isClearable={true}
        validator={validator}
        validated={validated}
        value={value}
        options={statusOptions}
        onChange={onChange}
        rules={rules}
      />
    );
  }
}

export default withTranslation(["status", "common"])(StatusSelect);
