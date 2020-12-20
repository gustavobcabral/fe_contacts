import React from "react";
import { withTranslation } from "react-i18next";
import OurModal from "../common/OurModal/OurModal";
import SimpleReactValidator from "simple-react-validator";
import { getLocale, handleInputChangeGeneric } from "../../utils/forms";
import { contacts, publishers } from "../../services";
import FormContacts from "./FormContacts";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showError, showSuccessful, ifEmptySetNull } from "../../utils/generic";
import { getOr } from "lodash/fp";
import { GENDER_UNKNOWN } from "../../constants/contacts";
import { reducePublishers } from "../../stateReducers/publishers";
import {
  ID_LANGUAGE_DEFAULT,
  ID_GENDER_DEFAULT,
  ID_STATUS_DEFAULT,
} from "../../constants/valuesPredefined";

const fields = {
  phone: "",
  phone2: "",
  name: "",
  owner: "",
  note: "",
  location: "",
  email: null,
  typeCompany: false,
  gender: ID_GENDER_DEFAULT,
  idStatus: ID_STATUS_DEFAULT,
  idLanguage: ID_LANGUAGE_DEFAULT,
};

class NewContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: fields,
      submitting: false,
      loading: false,
      validated: false,
      publishersOptions: [],
      statusOptions: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetForm = this.resetForm.bind(this);

    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: getLocale(this.props),
      element: (message) => <div className="text-danger">{message}</div>,
    });
  }

  async onOpen() {
    this.setState({ loading: true });
    try {
      const publishersOptions = reducePublishers(await publishers.getAll());

      this.setState({
        publishersOptions,
        loading: false,
      });
    } catch (error) {
      const { t } = this.props;

      this.setState({
        loading: false,
      });

      showError(error, t, "contacts");
    }
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
    this.setState({ submitting: true });

    const { form } = this.state;
    const { t } = this.props;

    const gender =
      form.typeCompany === true || form.typeCompany === "1"
        ? GENDER_UNKNOWN
        : form.gender;
    const owner =
      form.typeCompany === true || form.typeCompany === "1" ? form.owner : null;

    const data = {
      ...form,
      name: ifEmptySetNull(getOr("", "name", form)),
      gender,
      owner,
    };

    try {
      await contacts.create(data);
      this.setState({ submitting: false });
      showSuccessful(t);

      onHide();
      this.resetForm();
    } catch (error) {
      this.setState({ submitting: false });
      showError(error, t, "contacts");
    }
  }

  resetForm() {
    this.setState({ form: fields, submitting: false, validated: false });
    this.validator.hideMessages();
  }

  render() {
    const {
      form,
      validated,
      publishersOptions,
      statusOptions,
      submitting,
    } = this.state;
    const { t, afterClose } = this.props;
    return (
      <OurModal
        body={FormContacts}
        validator={this.validator}
        submitting={submitting}
        validated={validated}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        disablePhone={false}
        form={form}
        disablePhone={false}
        onExit={afterClose}
        onEnter={this.onOpen}
        onClose={this.resetForm}
        publishersOptions={publishersOptions}
        statusOptions={statusOptions}
        buttonTitle={t("common:new")}
        title={`${t("common:new")} ${t("titleCrud")}`}
        buttonText={<FontAwesomeIcon icon={faUserPlus} />}
      />
    );
  }
}

export default withTranslation(["contacts", "common"])(NewContact);
