import { observable, action, computed, reaction } from "mobx";

interface Validator {
  validationString?: RegExp;
  message: string;
  compareValidation?: boolean;
}

interface ConstructorParams {
  validators: Validator[];
}

class InputValidation {
  @observable
  public value?: string;

  @observable
  public errorMessage?: string;

  @observable
  public errorMessageTimeout?: any;

  @observable
  public validators?: Validator[];

  @observable
  public compareValue?: string;

  @action
  public setvalue = (value: string) => {
    this.value = value;
  };

  @action
  public setCompareValue = (value: string) => {
    this.compareValue = value;
  };

  @computed
  public get isValid() {
    if (!this.validators) {
      return;
    }

    if (this.value === undefined) {
      return false;
    }

    const valid = this.validators.map((v) => {
      if (v.validationString !== undefined) {
        const passed = v.validationString.test(this.value!);
        return passed;
      }

      if (this.value === this.compareValue && this.compareValue !== undefined) {
        return true;
      }

      return false;
    });

    return !valid.includes(false);
  }

  constructor(params: ConstructorParams) {
    this.validators = params.validators;

    reaction(
      async () => [this.value],

      () => {
        if (!this.validators) {
          return;
        }

        if (this.errorMessageTimeout) {
          clearTimeout(this.errorMessageTimeout);
        }
        this.errorMessage = undefined;

        this.errorMessageTimeout = setTimeout(() => {
          if (this.value === undefined) {
            return false;
          }

          let errorMessage: string | undefined = undefined;

          this.validators?.forEach((v) => {
            if (v.validationString !== undefined) {
              const passed = v.validationString.test(this.value!);

              if (!passed && !errorMessage) {
                errorMessage = v.message;
              }

              return;
            }
            if (
              this.value === this.compareValue &&
              this.compareValue !== undefined
            ) {
              return;
            }
            if (!errorMessage) {
              errorMessage = v.message;
              return;
            }
          });

          this.errorMessage = errorMessage;
        }, 650);
      }
    );
  }
}

export default InputValidation;
