import IRenderer from './type/IRenderer'
import CopyButtons from './CopyButtons'
import ComponentGenerator from '../component/ComponentGenerator'
import PageIndex from '../initialize_component/PageIndex'
import PageContent from '../initialize_component/PageContent'
import IGenerateComponent from '../component/type/IGenerateComponent'
import { ISectionsAndChats } from 'data_lib'

export default class Page
  implements IGenerateComponent<ISectionsAndChats, void>
{
  constructor(
    private readonly markdown: IRenderer,
    private readonly codeHighlight: IGenerateComponent<HTMLElement, void>,
    private readonly isEditable = false
  ) {}

  generate(data: ISectionsAndChats) {
    const index = new PageIndex()
    index.initialize({ id: 'index' })

    const content = new PageContent(this.markdown, this.isEditable)
    content.indexComponent = index.indexComponent
    content.data = data
    content.initialize({ id: 'jsonContainer' })

    new ComponentGenerator(this.codeHighlight).generate({ selector: 'code' })
    new ComponentGenerator(new CopyButtons()).generate({
      selector: 'pre code[class*="language-"]',
    })
  }
}
