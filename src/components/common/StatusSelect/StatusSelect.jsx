import React from "react";
import SuperSelect from "../SuperSelect/SuperSelect";
import { withTranslation } from "react-i18next";
import { status } from "../../../services";
import { getOr, pipe, curry } from "lodash/fp";
import { reduceStatus } from "../../../stateReducers/status";

class StatusSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { statusOptions: [], loading: false };
    this.handleGetAll = this.handleGetAll.bind(this);
  }

  async handleGetAll() {
    this.setState({ loading: true });
    const { t } = this.props;
    const statusOptions = pipe(
      getOr([], "data.data"),
      curry(reduceStatus)(t)
    )(await status.getAll());
    this.setState({ statusOptions, loading: false });
  }

  componentDidMount() {
    this.handleGetAll();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
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
    const { statusOptions, loading } = this.state;

    return (
      <SuperSelect
        name={name || "idStatus"}
        label={label || t("status")}
        isClearable={true}
        validator={validator}
        validated={validated}
        loading={loading}
        value={value}
        options={statusOptions}
        onChange={onChange}
        rules={rules}
      />
    );
  }
}

export default withTranslation(["status", "common"])(StatusSelect);
