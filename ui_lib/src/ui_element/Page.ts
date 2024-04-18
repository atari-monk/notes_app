import UIElements from '../ui_elements/UIElements'
import UIIndex from './UIIndex'
import UIPageContent from './UIPageContent'

export default class Page {
  constructor(
    private readonly index: UIIndex,
    private readonly content: UIPageContent,
    private readonly code: UIElements
  ) {}

  createPage(jsonData: any) {
    this.index.initialize({ id: 'index' })
    this.content.indexComponent = this.index.indexComponent
    this.content.data = jsonData
    this.content.initialize({ id: 'jsonContainer' })
    this.code.initialize({ selector: 'code' })
  }
}
