export default class ErrorUtil {
  static handleError(error: any, customMessage: string = '') {
    if (error instanceof Error) {
      console.error(
        customMessage === ''
          ? error.message
          : `${customMessage}: ${error.message}`
      )
    } else {
      console.error('An unknown error occurred.')
    }
  }
}
