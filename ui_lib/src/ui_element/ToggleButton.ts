import IUIElementData from './data_type/IUIElementData'
import Component from './Component'

export default class ToggleButton extends Component {
  initialize(data: IUIElementData): void {
    try {
      super.initialize(data)
      this.addClick((_event) => {
        this.toggle(this.className)
      })
    } catch (error: any) {
      console.error(error.message)
    }
  }

  toggle(className: string): void {
    const body = document.body
    body.classList.toggle(className)
  }
}
