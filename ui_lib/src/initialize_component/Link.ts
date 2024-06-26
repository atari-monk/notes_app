import ILinkData from './type/ILinkData'
import Component from '../component/Component'

export default class Link extends Component<HTMLAnchorElement> {
  private href: string = ''
  private textContent: string = ''

  constructor() {
    super()
    this.tag = 'a'
  }

  async initialize(data: ILinkData): Promise<void> {
    try {
      super.initialize(data)
      this.href = data.href
      this.textContent = data.textContent
    } catch (error: any) {
      console.error(error.message)
    }
  }

  create(
    parentUI: HTMLElement,
    data: ILinkData,
    listener: (event: MouseEvent) => Promise<any>
  ) {
    const element = document.createElement(this.tag) as HTMLAnchorElement
    element.href = data.href
    element.textContent = data.textContent
    this.addClickAsync(element, listener)
    parentUI.appendChild(element)
  }
}
