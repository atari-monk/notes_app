import IUIInnerTextData from './IUIInnerTextData'
import UIElement from './UIElement'

export default class SetInnerText extends UIElement {
  initialize(data: IUIInnerTextData) {
    try {
      super.initialize(data)
      this.ui.innerText = data.innerText
    } catch (error: any) {
      console.error(error.message)
    }
  }
}
