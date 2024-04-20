import IFile from './IFile'
import IHandleLinkClick from './IHandleLinkClick'
import PasswordProvider from '../provider/PasswordProvider'
import Page from './Page'
import ScrollIntoView from './ScrollIntoView'
import SetInnerText from './SetInnerText'

export default class LinkClickHandler implements IHandleLinkClick {
  constructor(
    private readonly passwordProvider: PasswordProvider,
    private readonly page: Page
  ) {}

  async handleLinkClick(file: IFile) {
    if (this.isProtectedFile(file)) return
    const jsonData = await this.fetchData(file)
    this.page.createPage(jsonData)
    new SetInnerText().initialize({
      id: 'currentPage_value',
      innerText: file.name,
    })
    new ScrollIntoView().initialize({ id: 'index_title' })
  }

  private isProtectedFile(file: IFile) {
    if (!file.protected) return false
    if (this.passwordProvider.validatePassword()) return false
    return true
  }

  private async fetchData(file: IFile) {
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
