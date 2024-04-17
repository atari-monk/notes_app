import ErrorUtils from '../util/ErrorUtil'
import IUIElementData from './IUIElementData'
import UIElement from './UIElement'

export default class ToggleButton extends UIElement {
  initialize(data: IUIElementData): void {
    try {
      super.initialize(data)
      this.addClick((_event) => {
        this.toggle(this.className)
      })
    } catch (error) {
      ErrorUtils.handleError(error)
    }
  }

  toggle(className: string): void {
    const body = document.body
    body.classList.toggle(className)
  }
}
