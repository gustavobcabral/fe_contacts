import React from "react";
import { withTranslation } from "react-i18next";
import { languages } from "../../services";
import Swal from "sweetalert2";
import { getOr, get, pick } from "lodash/fp";
import SimpleReactValidator from "simple-react-validator";
import { getLocale, handleInputChangeGeneric } from "../../utils/forms";
import OurModal from "../common/OurModal/OurModal";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import LanguagesForm from "./LanguagesForm.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fields = {
  name: "",
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
    const { t } = this.props;

    try {
      const data = pick(["description"], form);
      const res = await languages.updateOne(get("id", form), data);
      Swal.fire({
        title: t(`common:${get("data.cod", res)}`),
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
      onHide();
      this.setState({ form: fields, submitting: false, validated: false });
      this.validator.hideMessages();
    } catch (error) {
      this.setState({ submitting: false });
      Swal.fire({
        icon: "error",
        title: t(
          `common:${getOr("errorTextUndefined", "response.data.cod", error)}`
        ),
        text: t(
          `common:${getOr(
            "errorWithoutDetails",
            "response.data.error.code",
            error
          )}`
        ),
      });
    }
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({ form: data });
  }

  render() {
    const { form, validated } = this.state;
    const { t, afterClose } = this.props;

    return (
      <OurModal
        body={StatusForm}
        validator={this.validator}
        validated={validated}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        form={form}
        onExit={afterClose}
        title={`Edit ${t("title")}`}
        buttonText={<FontAwesomeIcon icon={faEdit} />}
      />
    );
  }
}
export default withTranslation(["status", "common"])(StatusEdit);
