import React from "react";
import { withTranslation } from "react-i18next";
import OurModal from "../common/OurModal/OurModal";
import Swal from "sweetalert2";
import { getOr, isEmpty, omit } from "lodash/fp";
import SimpleReactValidator from "simple-react-validator";
import { getLocale, handleInputChangeGeneric } from "../../utils/forms";
import { publishers } from "../../services";
import FormPublisher from "./FormPublisher";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseErrorMessage } from "../../utils/generic";

const fields = {
  name: "",
  phone: "",
  password: null,
  repeatPassword: null,
  email: "",
  idResponsibility: "",
  active: 1,
  disabled: false,
  justAllowedForMe: false,
};

class EditContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: fields,
      loading: false,
      validated: false,
    };
    this.handleGetOne = this.handleGetOne.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: getLocale(this.props),
      element: (message) => <div className="text-danger">{message}</div>,
      validators: {
        mustBeEqualFieldPassword: {
          message: this.props.t("mustBeEqualFieldPassword"),
          rule: (val) =>
            val === this.state.form.password ||
            isEmpty(this.state.form.password),
          required: true,
        },
      },
    });
  }

  async handleGetOne() {
    this.setState({ loading: true });
    const id = getOr(0, "props.id", this);
    const response = await publishers.getOne(id);
    const form = { ...fields, ...getOr(fields, "data.data", response) };
    this.setState({
      form,
      loading: false,
    });
  }

  onEnter() {
    this.handleGetOne();
  }

  handleInputChange(event) {
    handleInputChangeGeneric(event, this);
  }

  async handleSubmit(onHide) {
    this.setState({ validated: true });

    if (!this.validator.allValid()) {
      this.validator.showMessages();
      return true;
    }
    this.setState({ loading: true });

    const { form } = this.state;
    const { t } = this.props;
    const id = getOr(0, "props.id", this);
    const data = omit(["justAllowedForMe", "repeatPassword", "disabled"], form);

    try {
      await publishers.updatePublishers(id, data);
      this.setState({ loading: false });
      Swal.fire({
        title: t("common:dataSuccessfullySaved"),
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
      onHide();
      this.setState({ form: fields, loading: false, validated: false });
      this.validator.hideMessages();
    } catch (error) {
      this.setState({ loading: false });
      Swal.fire({
        icon: "error",
        title: t(
          `common:${getOr("errorTextUndefined", "response.data.cod", error)}`
        ),
        text: t(
          `publishers:${parseErrorMessage(error)}`,
          t(`common:${parseErrorMessage(error)}`)
        ),
      });
    }
  }

  render() {
    const { form, validated, loading } = this.state;
    const { t, afterClose } = this.props;
    return (
      <OurModal
        body={FormPublisher}
        loading={loading}
        validator={this.validator}
        validated={validated}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        form={form}
        onEnter={this.handleGetOne}
        onExit={afterClose}
        buttonTitle={t("common:edit")}
        title={`${t("common:edit")} ${t("titleCrud")}`}
        buttonText={<FontAwesomeIcon icon={faEdit} />}
        buttonVariant="success"
      />
    );
  }
}

export default withTranslation(["publishers", "common"])(EditContact);
