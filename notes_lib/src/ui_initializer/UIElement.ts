import IUIElement from './IUIElement'

export default class UIElement implements IUIElement {
  id: string = ''
  className: string = ''
  ui!: HTMLElement

  set(id: string, className: string) {
    this.id = id
    this.className = className
  }

  getUI() {
    const item = document.getElementById(this.id)
    if (!item) {
      throw new Error(`Element with ID '${this.id}' not found.`)
    }
    this.ui = item
  }

  addClick(listener: (ev: MouseEvent) => any) {
    this.ui.addEventListener('click', listener)
  }

  initializeToggle(): void {
    try {
      this.getUI()
      this.addClick((_event) => {
        this.toggle(this.className)
      })
    } catch (error) {
      this.handleError(error)
    }
  }

  toggle(className: string): void {
    const body = document.body
    body.classList.toggle(className)
  }

  handleError(error: any) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred.')
    }
  }
}
