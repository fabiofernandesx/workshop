import UserDefaultValues from 'domain/UserDefaultValues'
import UserFactory from 'domain/UserFactory'
import { TokenManager } from 'interfaces/TokenManager'

const TokenManagerMock: TokenManager = {
  sign: jest.fn(() => {
    return '__test__token__'
  }),
  decode: jest.fn((token: string) => {
    const { name, existingEmail, password } = UserDefaultValues
    if (token === '__test__token__') return new UserFactory().generateUser(name, existingEmail, password)
    return { field: 'token', message: 'Invalid Token' }
  }),
}
export default TokenManagerMock
