import IFileMetadata from '../initialize_component/type/IFileMetadata'
import ILinkClick from './ILinkClick'
import PasswordProvider from '../provider/PasswordProvider'
import Page from '../initialize_component/Page'
import ScrollIntoView from '../initialize_component/ScrollIntoView'
import SetInnerText from '../initialize_component/SetInnerText'
import IRenderer from '../generate_component/IRenderer'
import IDOMRenderer from '../ui_elements/IDOMRenderer'

export default class LinkClick implements ILinkClick {
  constructor(
    private readonly passwordProvider: PasswordProvider,
    private readonly markdown: IRenderer,
    private readonly codeHighlight: IDOMRenderer<HTMLElement>
  ) {}

  async linkClick(file: IFileMetadata) {
    if (this.isProtectedFile(file)) return
    const jsonData = await this.fetchData(file)
    const page = new Page(this.markdown, this.codeHighlight)
    page.initialize({ jsonData })
    new SetInnerText().initialize({
      id: 'currentPage_value',
      innerText: file.name,
    })
    new ScrollIntoView().initialize({ id: 'index_title' })
  }

  private isProtectedFile(file: IFileMetadata) {
    if (!file.protected) return false
    if (this.passwordProvider.validatePassword()) return false
    return true
  }

  private async fetchData(file: IFileMetadata) {
    try {
      const response = await fetch(file.path)
      if (!response.ok) {
        throw new Error(`Failed to load JSON file. Status: ${response.status}`)
      }
      return await response.json()
    } catch (error: any) {
      console.error(`Error loading or parsing JSON file: ${error.message}`)
    }
  }
}
