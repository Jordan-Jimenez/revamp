import { observable, action } from "mobx";
import InputValidation from "./InputValidation";

enum EventType {
  "CREATE_ACCOUNT",
  "SIGN_IN",
}

export class LoginManager {
  @observable
  public email: InputValidation = new InputValidation({
    validators: [
      {
        validationString: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Email is Invalid",
      },
    ],
  });

  @observable
  public password: InputValidation = new InputValidation({
    validators: [
      {
        validationString: /^.{8,}/,
        message: "Needs to be at least 8 characters long",
      },
      {
        validationString: /(?=.*[A-Z])/,
        message: "Requires least one upper case letter",
      },
      {
        validationString: /(?=.*[a-z])/,
        message: "Requires least one lower case letter",
      },
      {
        validationString: /\d{1}/,
        message: "Requires at least one number",
      },
    ],
  });
}

export const LoginStore = new LoginManager();

export default LoginStore;
