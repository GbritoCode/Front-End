import { useState, useRef } from "react";

export const Aux = () => {
  const notifyElment = useRef(null);
  return notifyElment
}

export const useInput = (initialValue, type) => {
  const [value, setValue] = useState(initialValue);
  const [valueerror, setValueError] = useState();

  const verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  
  // function that verifies if value contains only numbers
  const verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const change = (event, type, stateNameEqualTo) => {
    switch (type) {
      case "email":
        if (verifyEmail(event.target.value)) {
          setValueError("has-success");
        } else {
          setValueError("has-danger");
        }
        break;
      case "number":
        if (verifyNumber(event.target.value)) {
          setValueError("has-success");
        } else {
          setValueError("has-danger");
        }
        break;
      default:
        break;
    }
    setValue(event.target.value);
  };
  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      valueerror,
      onChange: (e) => {
        change(e, type, value);
      },
    },
  };
};
