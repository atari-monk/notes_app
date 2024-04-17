import ErrorUtil from '../util/ErrorUtil'
import IFile from './IFile'
import IHandleLinkClick from './IHandleLinkClick'
import PasswordProvider from './PasswordProvider'
import UIIndex from './UIIndex'
import UIPageContent from './UIPageContent'

export default class LinkClickHandler implements IHandleLinkClick {
  constructor(
    private readonly passwordProvider: PasswordProvider,
    private readonly index: UIIndex,
    private readonly content: UIPageContent
  ) {}

  async handleLinkClick(file: IFile) {
    if (this.isProtectedFile(file)) return
    const jsonData = await this.fetchData(file)
    this.createPage(jsonData)
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
    } catch (error) {
      ErrorUtil.handleError(error, 'Error loading or parsing JSON file')
    }
  }

  private createPage(jsonData: any) {
    this.index.initialize({ id: 'index' })
    this.content.indexComponent = this.index.indexComponent
    this.content.data = jsonData
    this.content.initialize({ id: 'jsonContainer' })
  }
}
