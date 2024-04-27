import IComponentData from '../component/type/IComponentData'
import Component from '../component/Component'

export default class ToggleButton extends Component<HTMLButtonElement> {
  initialize(data: IComponentData): void {
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
