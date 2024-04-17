export default class PasswordProvider {
  validatePassword() {
    const encodedPassword = 'NkN6bG9uZWs2'
    const password = prompt('Enter password:')
    const decodedPassword = atob(encodedPassword)

    if (password !== decodedPassword) {
      alert('Incorrect password. Access denied.')
      return false
    }
    return true
  }
}
