import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation'
import { type Validation } from '../../../../../presentation/protocols/validation.protocol'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'

export const makeAddSurveyValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
