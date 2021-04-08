import UserDefaultValues from 'domain/UserDefaultValues'

const { password } = UserDefaultValues
const HasherMock = {
  hash: jest.fn(),
  compare: jest.fn(async (value1: string) => {
    return value1 === password
  }),
}
export default HasherMock
