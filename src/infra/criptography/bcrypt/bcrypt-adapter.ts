import { type HashComparer } from '../../../data/protocols/criptography/hash-comparer.protocol'
import { type Hasher } from '../../../data/protocols/criptography/hasher.protocol'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly saltOrRounds: number = 12) {}

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.saltOrRounds)
  };

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
