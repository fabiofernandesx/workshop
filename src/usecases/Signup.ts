import User from 'domain/User'
import UserFactory from 'domain/UserFactory'
import { Hasher } from 'interfaces/Hasher'
import { TokenManager } from 'interfaces/TokenManager'
import { UserRepository } from 'interfaces/UserRepository'
import UserRequestValidator from './UserRequestValidator'

class Signup {
  private _hasher: Hasher
  private _userRepository: UserRepository
  private _tokenManager: TokenManager
  private _secretKey: string
  private _userFactory: UserFactory

  constructor(hasher: Hasher, userRepository: UserRepository, tokenManager: TokenManager, secretKey: string) {
    this._hasher = hasher
    this._userRepository = userRepository
    this._tokenManager = tokenManager
    this._secretKey = secretKey
    this._userFactory = new UserFactory()
  }
  async Execute(userFromRequest: User): Promise<string> {
    // validate
    const validator = new UserRequestValidator(this._userRepository)
    await validator.validateUserRegisterRequest(userFromRequest)
    const finalUser = await this.HashPassword(userFromRequest)
    const token = await this._userRepository.createAndSave(finalUser)
    return token
  }
  private async HashPassword(userFromRequest: User): Promise<User> {
    const hashedPassword = await this._hasher.hash(userFromRequest.password)
    return this._userFactory.generateUser(userFromRequest.name, userFromRequest.email, hashedPassword)
  }
}
export default Signup
