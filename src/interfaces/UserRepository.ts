import User from 'domain/User'

export interface UserRepository {
  createAndSave(user: User): Promise<string>
  getByEmail(email: string): Promise<User>
}
