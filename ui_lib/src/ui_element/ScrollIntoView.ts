import UIElement from './UIElement'
import IUIElementData from './IUIElementData'

export default class ScrollIntoView extends UIElement {
  initialize(data: IUIElementData) {
    try {
      super.initialize(data)
      this.ui.scrollIntoView({ behavior: 'smooth' })
    } catch (error: any) {
      console.error(error.message)
    }
  }
}
