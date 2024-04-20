import UIElement from './UIElement'
import IUIElementData from './IUIElementData'

export default class FirstLinkClick extends UIElement {
  constructor() {
    super()
    this.tag = 'a'
  }

  initialize(data: IUIElementData) {
    try {
      super.initialize(data)
      this.ui.click()
    } catch (error: any) {
      console.error(error.message)
    }
  }

  protected setUI() {
    const item = document.querySelector(this.tag) as HTMLAnchorElement
    if (!item) {
      throw new Error(`Element with Tag '${this.tag}' not found.`)
    }
    this.ui = item
  }
}
