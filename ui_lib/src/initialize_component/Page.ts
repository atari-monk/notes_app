import IRenderer from '../generate_component/type/IRenderer'
import CopyButtons from '../generate_component/CopyButtons'
import ComponentGenerator from '../component/ComponentGenerator'
import PageIndex from './PageIndex'
import UIPageContent from './PageContent'
import Component from '../component/Component'
import IJsonComponentData from './type/IJsonComponentData'
import IGenerateComponent from '../component/type/IGenerateComponent'

export default class Page extends Component {
  constructor(
    private readonly markdown: IRenderer,
    private readonly codeHighlight: IGenerateComponent<HTMLElement, void>
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

    new ComponentGenerator(this.codeHighlight).generate({ selector: 'code' })
    new ComponentGenerator(new CopyButtons()).generate({
      selector: 'pre code[class*="language-"]',
    })
  }
}
