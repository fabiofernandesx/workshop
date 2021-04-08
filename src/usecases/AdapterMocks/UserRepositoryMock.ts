import User from 'domain/User'
import UserDefaultValues from 'domain/UserDefaultValues'
import UserFactory from 'domain/UserFactory'
import { UserRepository } from 'interfaces/UserRepository'

const userFactory = new UserFactory()
const { name, password, existingEmail } = UserDefaultValues

const UserRepositoryMock: UserRepository = {
  createAndSave: jest.fn(
    (): Promise<string> => {
      return Promise.resolve('__test__token__')
    }
  ),
  getByEmail: jest.fn(
    (emailParam: string): Promise<User> => {
      const user = userFactory.generateUser(name, existingEmail, password)
      if (emailParam === existingEmail) return Promise.resolve(user)
      return Promise.resolve(null)
    }
  ),
}

export default UserRepositoryMock
