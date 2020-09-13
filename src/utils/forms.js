export const unformatDate = (date) =>{
  const split = date.slice(0, 10).split("-");
  return `${split[2]}/${split[1]}/${split[0]}`;
}

export const formatDate = (date) => {
  const split = date.split("/");
  return `${split[2]}-${split[1]}-${split[0]}`;
}

export const isValidEmail = (email) => {
  let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}