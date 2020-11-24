import React from "react";
import { withTranslation } from "react-i18next";
import { details, publishers } from "../../../services";
import ContainerCRUD from "../../../components/common/ContainerCRUD/ContainerCRUD";
import { getOr, map, pick, get } from "lodash/fp";
import FormDetails from "./FormDetails";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import { getLocale, handleInputChangeGeneric } from "../../../utils/forms";
import { parseErrorMessage } from "../../../utils/generic"
import { WAITING_FEEDBACK } from "../../../constants/contacts";

const fields = {
  information: "",
  idPublisher: "",
  idStatus: "",
  idLanguage: null,
  gender: "",
  name: "",
};

class EditDetailsContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: fields,
      loading: false,
      validated: false,
      publishersOptions: [],
      phone: getOr(0, "match.params.phone", props),
    };
    this.handleGetOne = this.handleGetOne.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: getLocale(this.props),
      element: (message) => <div className="text-danger">{message}</div>,
    });
  }

  reducePublishers = (publishers) =>
    map(
      (publisher) => ({ value: publisher.id, label: publisher.name }),
      getOr([], "data.data", publishers)
    );

  async handleGetOne() {
    const id = getOr(0, "props.match.params.id", this);
    this.setState({ loading: true });
    const response = await details.getOne(id);
    const data = getOr(fields, "data.data", response);
    const form = {
      ...data,
      information:
        getOr("", "information", data) === WAITING_FEEDBACK
          ? ""
          : getOr("", "information", data),
    };
  const publishersOptions = this.reducePublishers(await publishers.getAll());

    this.setState({
      form,
      publishersOptions,
      loading: false,
    });
  }

  handleInputChange(event) {
    handleInputChangeGeneric(event, this);
  }

  async handleSubmit() {
    this.setState({ validated: true });
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      return true;
    }
    this.setState({ loading: true });

    const { form, phone } = this.state;
    const { history } = this.props;
    const { t } = this.props;
    const id = getOr(0, "props.match.params.id", this);

    const data = {
      detailsContact: {
        ...pick(["idPublisher", "information"], form),
        phoneContact: phone,
      },
      contact: {
        idStatus: get("idStatus", form),
        idLanguage: get("idLanguage", form),
        phone,
        gender: get("gender", form),
        name: get("name", form),
        typeCompany: get("typeCompany", form),

      },
    };

    try {
      await details.updateOneContactDetail(id, data);
      this.setState({ loading: false });
      history.goBack();
      Swal.fire({
        title: t("common:dataSuccessfullySaved"),
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      this.setState({ loading: false });
      Swal.fire({
        icon: 'error',
        title: t(
          `common:${getOr('errorTextUndefined', 'response.data.cod', error)}`
        ),
        text: t(
          `detailsContacts:${parseErrorMessage(error)}`,
          t(`common:${parseErrorMessage(error)}`)
        ),
      })
    }
  }

  componentDidMount() {
    this.handleGetOne();
  }

  render() {
    const { t } = this.props;

    return (
      <>
        <ContainerCRUD title={t("title")} {...this.props}>
          <h1>{`${t("common:edit")} ${t("detailsContacts:title")}`}</h1>
          <FormDetails {...this} onSubmit={this.handleSubmit}  />
        </ContainerCRUD>
      </>
    );
  }
}

export default withTranslation(["contacts", "common"])(EditDetailsContact);
