import React from "react";
import { withTranslation } from "react-i18next";
import ContainerCRUD from "../../../components/ContainerCRUD/ContainerCRUD";
import SimpleReactValidator from "simple-react-validator";
import { getOr, map, pick, get } from "lodash/fp";
import FormDetails from "./FormDetails";
import { getLocale, handleInputChangeGeneric } from "../../../utils/forms";
import { details, publishers, status } from "../../../services";
import Swal from "sweetalert2";

const fields = {
  information: "",
  idPublisher: "",
  idStatus: "",
  gender: "",
};

class NewDetailsContact extends React.Component {
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

  reduceStatus = (status) =>
    map(
      (status) => ({ value: status.id, label: status.description }),
      getOr([], "data.data", status)
    );

  async componentDidMount() {
    this.setState({ loading: true });
    const publishersOptions = this.reducePublishers(await publishers.getAll());
    const statusOptions = this.reduceStatus(await status.getAll());
    

    this.setState({
      publishersOptions,
      statusOptions,
      loading: false,
    });
  }

  setFormData = (name, value) => {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        [name]: value,
      },
    });
  };

  handleInputChange(obj) {
    const {
      target: { name, value },
    } = obj;
    this.setFormData(name, value);
  }

  async handleSubmit() {
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      return true;
    }
    this.setState({ submitting: true });

    const { form } = this.state;
    const { history } = this.props;
    const { t } = this.props;
    const id = getOr(0, "props.match.params.id", this);

    const data = {
      detailsContact: {
        ...pick(["idPublisher", "information"], form),
        phoneContact : getOr(0, "props.match.params.phone", this)
      },
      contact: {
        idStatus: get("idStatus", form),
        phone: getOr(0, "props.match.params.phone", this),
        gender: get("gender", form),
        name: get("name", form),
      },
    };
    try {
      const eoq = await details.create(data);
      console.log(eoq, "EOQ MERDA")
      this.setState({ submitting: false });
      Swal.fire({
        title: t("common:dataSuccessfullySaved"),
        icon: "success",
      }).then(() => {
        history.goBack();
      });
    } catch (error) {
       this.setState({ submitting: false });
      Swal.fire({
        icon: "error",
        title: t("common:dataFailedSaved"),
      });
    }
  }

  render() {
    const { t } = this.props;
    // const { data } = this.state;
    const phone = getOr(0, "props.match.params.phone", this);
    return (
      <ContainerCRUD title={t("title")} {...this.props}>
        <h1>CREATE TODOS OS DETALHES</h1>
        phone:{phone}
        <FormDetails onSubmit={(e) => this.handleSubmit(e)} {...this} />
      </ContainerCRUD>
    );
  }
}

export default withTranslation(["contacts", "common"])(NewDetailsContact);
