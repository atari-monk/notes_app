import IDOMRenderer from './IDOMRenderer'
import IUIElementsData from './IUIElementsData'

export default class UIElements {
  selector: string = ''

  constructor(private readonly renderer: IDOMRenderer<HTMLElement>) {}

  initialize(data: IUIElementsData) {
    const { selector } = data
    this.selector = selector
    document.querySelectorAll<HTMLElement>(this.selector).forEach((item) => {
      this.renderer.render(item)
    })
  }
}
