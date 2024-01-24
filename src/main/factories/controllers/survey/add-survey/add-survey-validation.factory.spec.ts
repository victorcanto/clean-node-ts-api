import { RequiredFieldValidation } from '../../../../../validation/validators/required-field-validation'
import { type Validation } from '../../../../../presentation/protocols/validation.protocol'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'
import { makeAddSurveyValidation } from './add-survey-validaton.factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
