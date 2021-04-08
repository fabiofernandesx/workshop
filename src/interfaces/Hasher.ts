export interface Hasher {
  hash(value: string): Promise<string>
  compare(password: string, passwordFromDb: string): Promise<boolean>
}
