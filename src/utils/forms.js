export const unformatDate = (date) => {
  const split = date.slice(0, 10).split("-");
  return `${split[2]}/${split[1]}/${split[0]}`;
};

export const formatDate = (date) => {
  const split = date.split("/");
  return `${split[2]}-${split[1]}-${split[0]}`;
};

export const getLocale = (props) => props.i18n.language === "en-US" ? "en" : props.i18n.language

export const handleInputChangeGeneric = (event, componentReact) => {
  const {
    target: { name, value },
  } = event;
  const { form } = componentReact.state;

  componentReact.setState({
    form: {
      ...form,
      [name]: value,
    },
  });
}
