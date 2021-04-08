import User from 'domain/User'

export interface UserRepository {
  getByEmail(email: string): Promise<User>
}
