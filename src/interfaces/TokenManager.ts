import User from 'domain/User'
import { JsonError } from './JsonError'

export interface TokenManager {
  sign(user: User, secretKey: string): string
  decode(token: string, secretKey: string): User | JsonError
}
