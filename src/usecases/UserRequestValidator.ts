import User from 'domain/User'
import { UserRepository } from 'interfaces/UserRepository'
import FormatErrorAsJsonError from './ErrorFormatHelper'

class UserRequestValidator {
  private _repository: UserRepository

  constructor(repository: UserRepository) {
    this._repository = repository
  }

  async validateUserRegisterRequest(user: User): Promise<boolean> {
    this.AreAllUserResigterRequiredFieldsFilled(user)
    this.IsTheEmailInCorrectFormat(user)
    const userFromDb = await this._repository.getByEmail(user.email)
    this.IsTheEmailAlreadyRegistered(userFromDb)
    return Promise.resolve(true)
  }
  async validateUserLoginRequest(user: User): Promise<boolean> {
    this.AreAllUserLoginRequiredFieldsFilled(user)
    this.IsTheEmailInCorrectFormat(user)
    return Promise.resolve(true)
  }

  private AreAllUserResigterRequiredFieldsFilled(user: User): void {
    if (!user.name) throw FormatErrorAsJsonError('name', 'Name is required')
    if (!user.password)
      throw FormatErrorAsJsonError('password', 'Password is required')
    if (!user.email) throw FormatErrorAsJsonError('email', 'Email is required')
  }
  private AreAllUserLoginRequiredFieldsFilled(user: User): void {
    if (!user.password)
      throw FormatErrorAsJsonError('password', 'Password is required')
    if (!user.email) throw FormatErrorAsJsonError('email', 'Email is required')
  }

  private IsTheEmailInCorrectFormat(user: User): void {
    const regexp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    if (!regexp.test(user.email))
      throw FormatErrorAsJsonError('email', 'Email is not correct')
  }

  private IsTheEmailAlreadyRegistered(userFromDb: User): void {
    if (userFromDb)
      throw FormatErrorAsJsonError('email', 'Email already registered')
  }
}
export default UserRequestValidator
