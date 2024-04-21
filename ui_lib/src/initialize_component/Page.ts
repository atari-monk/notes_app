import IRenderer from '../generate_component/IRenderer'
import CopyButtonCreator from '../ui_elements/CopyButtonCreator'
import IDOMRenderer from '../ui_elements/IDOMRenderer'
import UIElements from '../ui_elements/UIElements'
import PageIndex from './PageIndex'
import UIPageContent from './PageContent'
import Component from '../component/Component'
import IJsonComponentData from './type/IJsonComponentData'

export default class Page extends Component {
  constructor(
    private readonly markdown: IRenderer,
    private readonly codeHighlight: IDOMRenderer<HTMLElement>
  ) {
    super()
  }

  initialize(data: IJsonComponentData) {
    const index = new PageIndex()
    index.initialize({ id: 'index' })

    const content = new UIPageContent(this.markdown)
    content.indexComponent = index.indexComponent
    if (data.jsonData) {
      content.data = data.jsonData
    } else {
      throw new Error('No json data for Page')
    }
    content.initialize({ id: 'jsonContainer' })

    new UIElements(this.codeHighlight).initialize({ selector: 'code' })
    new UIElements(new CopyButtonCreator()).initialize({
      selector: 'pre code[class*="language-"]',
    })
  }
}
