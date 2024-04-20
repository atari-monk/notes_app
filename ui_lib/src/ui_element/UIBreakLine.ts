import UIElement from './UIElement'

export default class UIBreakLine extends UIElement {
  constructor() {
    super()
    this.tag = 'br'
  }

  create(parentUI: HTMLElement) {
    const element = document.createElement(this.tag) as HTMLBRElement
    parentUI.appendChild(element)
  }
}
