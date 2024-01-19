import { type Hasher } from '../../../data/protocols/criptography/hasher.protocol'
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'
import { type HashComparer } from '../../../data/protocols/criptography/hash-comparer.protocol'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hash')
  },
  async compare (value: string, hash: string): Promise<boolean> {
    return await Promise.resolve(true)
  }
}))

interface SutTypes {
  sut: Hasher & HashComparer
  salt: number
}

const makeSut = (salt: number = 12): SutTypes => {
  const sut = new BcryptAdapter(salt)
  return { sut, salt }
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('Should call bcrypt with correct values', async () => {
      const { sut, salt } = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('Should return a hash on success', async () => {
      const { sut } = makeSut()
      const hash = await sut.hash('any_value')
      expect(hash).toBe('hash')
    })

    test('Should throw if bcrypt throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()) as any)
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    test('Should call compare with correct values', async () => {
      const { sut } = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    test('Should return true when compare succeeds', async () => {
      const { sut } = makeSut()
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(true)
    })
  })
})
