export default class InitializationGuard {
  private initialized = false

  constructor(private readonly errorMessage: string) {}

  checkInitialized() {
    if (this.initialized) {
      throw new Error(this.errorMessage)
    }
  }

  setInitialized() {
    this.initialized = true
  }
}
