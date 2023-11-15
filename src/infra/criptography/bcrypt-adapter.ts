import { type Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  constructor (private readonly saltOrRounds: number = 12) {}

  async encrypt (value: string): Promise<string> {
    return await bcrypt.hash(value, this.saltOrRounds)
  };
}
