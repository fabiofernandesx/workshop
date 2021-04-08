import User from './User'
import UserDefaultValues from './UserDefaultValues'

const { name, email, password } = UserDefaultValues

class UserFactory {
  private _user: User
  constructor() {
    this._user = new User()
  }

  generateUser(name: string, email: string, password: string): User {
    this._user.name = name
    this._user.email = email
    this._user.password = password
    this._user.createdAt = new Date()
    return this._user
  }
}

export default UserFactory
