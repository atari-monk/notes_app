import IUIElementData from './IUIElementData'
import IUIElement from './IUIElement'

export default class UIElement implements IUIElement {
  id: string = ''
  className: string = ''
  ui!: HTMLElement

  initialize(data: IUIElementData) {
    const { id, className } = data
    this.id = id
    this.className = className ?? ''
    this.setUI()
  }

  private setUI() {
    const item = document.getElementById(this.id)
    if (!item) {
      throw new Error(`Element with ID '${this.id}' not found.`)
    }
    this.ui = item
  }

  addClick(listener: (ev: MouseEvent) => any) {
    this.ui.addEventListener('click', listener)
  }
}
