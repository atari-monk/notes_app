export default class ErrorUtils {
  static handleError(error: any) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
  }
}
