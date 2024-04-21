import Component from '../component/Component'
import IComponentData from '../component/type/IComponentData'

export default class FirstLinkClick extends Component {
  constructor() {
    super()
    this.tag = 'a'
  }

  initialize(data: IComponentData) {
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
