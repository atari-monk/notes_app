import loadJSONFile from '../file_sys/json'
import ErrorUtils from '../util/ErrorUtil'
import IFile from './IFile'
import IUIFileListData from './IUIFileListData'
import UIElement from './UIElement'

export default class UIFileList extends UIElement {
  private readonly fileList: IFile[] = []
  private filePath = ''

  async initialize(data: IUIFileListData): Promise<void> {
    try {
      super.initialize(data)
      this.filePath = data.filePath
      await this.loadFiles()
      this.createList()
      const firstLink = this.ui.querySelector('a') as HTMLElement
      firstLink.click()
    } catch (error) {
      ErrorUtils.handleError(error)
    }
  }

  private async loadFiles() {
    try {
      this.fileList.push(...(await loadJSONFile(this.filePath)))
    } catch (error) {
      ErrorUtils.handleError(error)
    }
  }

  private createList() {
    for (const file of this.fileList) {
      this.createItem(file)
    }
  }

  private createItem(file: IFile) {
    const link = document.createElement('a')
    link.href = '#'
    link.textContent = file.name
    link.addEventListener('click', async (event) => {
      event.preventDefault()
      //await handleLinkClick(file)
      console.log('fire')
    })
    this.ui.appendChild(link)
    const br = document.createElement('br')
    this.ui.appendChild(br)
  }
}
