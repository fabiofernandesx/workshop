import UserRequestValidator from './UserRequestValidator'

jest.mock('./UserRequestValidator')

export default (UserRequestValidator as jest.Mock).mockImplementation(() => {
  return {
    validateUserRegisterRequest: () => {
      return true
    },
    validateUserLoginRequest: () => {
      return true
    },
  }
})
