import { InvalidParamError } from '../../presentation/errors'
import { type Validation } from '../validators'

export class CompareFieldsValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldToCompareName: string) {}

  validate (input: any): Error | null | undefined {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
