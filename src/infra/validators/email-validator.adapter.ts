import { type EmailValidator } from '@/validation/protocols/email-validator.protocol'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
