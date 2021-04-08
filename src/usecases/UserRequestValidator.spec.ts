import User from 'domain/User'
import UserDefaultValues from 'domain/UserDefaultValues'
import UserFactory from 'domain/UserFactory'
import UserRepositoryMock from './AdapterMocks/UserRepositoryMock'
import FormatErrorAsJsonError from './ErrorFormatHelper'
import UserRequestValidator from './UserRequestValidator'

const { name, email, password, invalidEmail, existingEmail } = UserDefaultValues
const userFactory = new UserFactory()
const sut = new UserRequestValidator(UserRepositoryMock)

describe('User Request Validator tests', () => {
  describe('When validating User Register Request', () => {
    test('should throw error when name is missing ', async () => {
      const user = userFactory.generateUser(null, email, password)
      await expect(sut.validateUserRegisterRequest(user)).rejects.toBeTruthy()
    })
    test('should throw the correct error message when name is missing ', async () => {
      try {
        const user = userFactory.generateUser(null, email, password)
        await sut.validateUserRegisterRequest(user)
      } catch (error) {
        expect(error).toStrictEqual(
          FormatErrorAsJsonError('name', 'Name is required')
        )
      }
    })
    test('should throw error when email is missing ', async () => {
      const user = userFactory.generateUser(email, null, password)
      await expect(sut.validateUserRegisterRequest(user)).rejects.toBeTruthy()
    })
    test('should throw the correct email message when email is missing ', async () => {
      try {
        const user = userFactory.generateUser(name, null, password)
        await sut.validateUserRegisterRequest(user)
      } catch (error) {
        expect(error).toStrictEqual(
          FormatErrorAsJsonError('email', 'Email is required')
        )
      }
    })
    test('should throw the correct password message when password is missing ', async () => {
      try {
        const user = userFactory.generateUser(name, email, null)
        await sut.validateUserRegisterRequest(user)
      } catch (error) {
        expect(error).toStrictEqual(
          FormatErrorAsJsonError('password', 'Password is required')
        )
      }
    })
    test('should throw error when password is missing ', async () => {
      const user = userFactory.generateUser(name, email, null)
      await expect(sut.validateUserRegisterRequest(user)).rejects.toBeTruthy()
    })
    test('should throw error when email is invalid', async () => {
      const user = userFactory.generateUser(name, invalidEmail, password)
      await expect(sut.validateUserRegisterRequest(user)).rejects.toBeTruthy()
    })

    test('should throw an error when email already exists in the database ', async () => {
      try {
        const user = userFactory.generateUser(name, existingEmail, password)
        await sut.validateUserRegisterRequest(user)
      } catch (error) {
        expect(error).toStrictEqual(
          FormatErrorAsJsonError('email', 'Email already registered')
        )
      }
    })
    test('should throw an the correct error message when email is in an incorrect format', async () => {
      try {
        const user = userFactory.generateUser(name, invalidEmail, password)
        await sut.validateUserRegisterRequest(user)
      } catch (error) {
        expect(error).toStrictEqual(
          FormatErrorAsJsonError('email', 'Email is not correct')
        )
      }
    })
    test('should NOT throw error when all data is valid ', async () => {
      const user = userFactory.generateUser(name, email, password)
      await expect(sut.validateUserRegisterRequest(user)).resolves.toBeTruthy()
    })
  })
  describe('When validating User Login Request', () => {
    test('should throw the correct email message when name is missing ', async () => {
      try {
        const user = userFactory.generateUser(null, null, password)
        await sut.validateUserLoginRequest(user)
      } catch (error) {
        expect(error).toStrictEqual(
          FormatErrorAsJsonError('email', 'Email is required')
        )
      }
    })
    test('should throw the correct password message when password is missing ', async () => {
      try {
        const user = userFactory.generateUser(null, email, null)
        await sut.validateUserLoginRequest(user)
      } catch (error) {
        expect(error).toStrictEqual(
          FormatErrorAsJsonError('password', 'Password is required')
        )
      }
    })
    test('should throw an the correct error message when email is in an incorrect format', async () => {
      try {
        const user = userFactory.generateUser(name, invalidEmail, password)
        await sut.validateUserLoginRequest(user)
      } catch (error) {
        expect(error).toStrictEqual(
          FormatErrorAsJsonError('email', 'Email is not correct')
        )
      }
    })
    test('should NOT throw an error when email exists', async () => {
      const user = userFactory.generateUser(null, existingEmail, password)
      await expect(sut.validateUserLoginRequest(user)).resolves.toBeTruthy()
    })
  })
})
