import { type Validation } from '@/validation/validators'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null | undefined {
      return null
    }
  }
  return new ValidationStub()
}
