import { type Hasher } from '../../data/protocols/criptography/hasher.protocol'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  constructor (private readonly saltOrRounds: number = 12) {}

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.saltOrRounds)
  };
}
