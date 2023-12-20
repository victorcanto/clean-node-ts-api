import { InvalidParamError } from '../../errors'
import { type EmailValidator } from '../../protocols/email-validator.protocol'
import { type Validation } from '../../protocols/validation.protocol'

export class EmailValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly emailValidator: EmailValidator) {}

  validate (input: any): Error | null | undefined {
    const isValidEmail = this.emailValidator.isValid(input[this.fieldName])
    if (!isValidEmail) {
      return new InvalidParamError(this.fieldName)
    }
  };
}
