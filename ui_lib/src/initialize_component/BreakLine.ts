import Component from '../component/Component'

export default class BreakLine extends Component<HTMLElement> {
  constructor() {
    super()
    this.tag = 'br'
  }

  create(parentUI: HTMLElement) {
    const element = document.createElement(this.tag) as HTMLBRElement
    parentUI.appendChild(element)
  }
}
