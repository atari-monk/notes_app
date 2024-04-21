import IRenderer from '../component/IRenderer'
import CopyButtonCreator from '../ui_elements/CopyButtonCreator'
import IDOMRenderer from '../ui_elements/IDOMRenderer'
import UIElements from '../ui_elements/UIElements'
import PageIndex from './PageIndex'
import UIPageContent from './PageContent'

export default class Page {
  constructor(
    private readonly markdown: IRenderer,
    private readonly codeHighlight: IDOMRenderer<HTMLElement>
  ) {}

  createPage(jsonData: any) {
    const index = new PageIndex()
    index.initialize({ id: 'index' })
    const content = new UIPageContent(this.markdown)
    content.data = jsonData
    content.indexComponent = index.indexComponent
    content.initialize({ id: 'jsonContainer' })
    new UIElements(this.codeHighlight).initialize({ selector: 'code' })
    new UIElements(new CopyButtonCreator()).initialize({
      selector: 'pre code[class*="language-"]',
    })
  }
}
