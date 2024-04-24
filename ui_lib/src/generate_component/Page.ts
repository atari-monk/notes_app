import IRenderer from './type/IRenderer'
import CopyButtons from './CopyButtons'
import ComponentGenerator from '../component/ComponentGenerator'
import PageIndex from '../initialize_component/PageIndex'
import PageContent from '../initialize_component/PageContent'
import IGenerateComponent from '../component/type/IGenerateComponent'
import IPageData from './type/IPageData'

export default class Page implements IGenerateComponent<IPageData, void> {
  constructor(
    private readonly markdown: IRenderer,
    private readonly codeHighlight: IGenerateComponent<HTMLElement, void>
  ) {}

  generate(data: IPageData) {
    const index = new PageIndex()
    index.initialize({ id: 'index' })

    const content = new PageContent(this.markdown)
    content.indexComponent = index.indexComponent
    content.data = data.fileData
    content.editFileData = data.editFileData
    content.initialize({ id: 'jsonContainer' })

    new ComponentGenerator(this.codeHighlight).generate({ selector: 'code' })
    new ComponentGenerator(new CopyButtons()).generate({
      selector: 'pre code[class*="language-"]',
    })
  }
}
