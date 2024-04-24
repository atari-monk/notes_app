import IFileMetadata from '../initialize_component/type/IFileMetadata'
import ILinkClick from './ILinkClick'
import PasswordProvider from '../provider/PasswordProvider'
import Page from '../generate_component/Page'
import ScrollIntoView from '../initialize_component/ScrollIntoView'
import SetInnerText from '../initialize_component/SetInnerText'
import IRenderer from '../generate_component/type/IRenderer'
import IGenerateComponent from '../component/type/IGenerateComponent'
import { ISectionsAndChats } from 'data_lib'
import IEditFileData from '../generate_component/type/IEditFileData'

export default class LinkClick implements ILinkClick {
  constructor(
    private readonly passwordProvider: PasswordProvider,
    private readonly markdown: IRenderer,
    private readonly codeHighlight: IGenerateComponent<HTMLElement, void>
  ) {}

  async linkClick(file: IFileMetadata) {
    if (this.isProtectedFile(file)) return
    const jsonData: ISectionsAndChats = await this.fetchData(file)
    const page = new Page(this.markdown, this.codeHighlight)
    page.generate({ fileData: jsonData, editFileData: {} as IEditFileData })
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
