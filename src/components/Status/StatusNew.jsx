import React from "react";
import { withTranslation } from "react-i18next";
import { status } from "../../services";
import Swal from "sweetalert2";
import { getOr, get } from "lodash/fp";
import StatusModal from "./StatusModal";
import SimpleReactValidator from "simple-react-validator";
import { getLocale, handleInputChangeGeneric } from "../../utils/forms";

const fields = {
  description: "",
};

class StatusEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: fields,
      submitting: false,
      validated: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: getLocale(this.props),
      element: (message) => <div className="text-danger">{message}</div>,
    });
  }

  handleInputChange(event) {
    handleInputChangeGeneric(event, this);
  }

  async handleSubmit(onHide) {
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      return true;
    }

    this.setState({ submitting: true });

    const { form } = this.state;
    const { t, afterClose } = this.props;

    try {
      const res = await status.create(form);
      this.setState({ submitting: false });
      Swal.fire({
        title: t(`common:${get("data.cod", res)}`),
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
      onHide();
      afterClose();
    } catch (error) {
      this.setState({ submitting: false });
      Swal.fire({
        icon: "error",
        title: t(
          `common:${getOr("errorTextUndefined", "response.data.cod", error)}`
        ),
      });
    }
  }

  render() {
    const { form, validated } = this.state;

    return (
      <StatusModal
        modeEdit={false}
        validator={this.validator}
        validated={validated}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        form={form}
      />
    );
  }
}
export default withTranslation(["status", "common"])(StatusEdit);
