import User from 'domain/User'
import HasherMock from './AdapterMocks/HasherMock'
import TokenManagerMock from './AdapterMocks/TokenManagerMock'
import UserRepositoryMock from './AdapterMocks/UserRepositoryMock'
import UserRequestValidator from './UserRequestValidatorMock'
import Signup from './Signup'

describe('Signup Use Case Tests', () => {
  const sut = new Signup(HasherMock, UserRepositoryMock, TokenManagerMock, 'anySecretKey')
  test('should call validation', () => {
    sut.Execute(new User())
    expect(UserRequestValidator).toBeCalled()
  })
  test('should call hasher', () => {
    sut.Execute(new User())
    expect(HasherMock.hash).toBeCalled()
  })
  test('should call respository', () => {
    sut.Execute(new User())
    expect(UserRepositoryMock.createAndSave).toBeCalled()
  })
  test('should respond with token', async () => {
    const token = await sut.Execute(new User())
    expect(token).toBe('__test__token__')
  })
})
