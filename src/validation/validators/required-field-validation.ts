import { MissingParamError } from '@/presentation/errors'
import { type Validation } from '@/validation/validators'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error | null | undefined {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
