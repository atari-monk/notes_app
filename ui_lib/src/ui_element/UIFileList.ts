import { loadJSONFile } from 'data_lib'
import IFile from './IFile'
import IHandleLinkClick from './IHandleLinkClick'
import IUIFileListData from './IUIFileListData'
import UIElement from './UIElement'
import FirstLinkClick from './FirstLinkClick'
import UILink from './UILink'
import UIBreakLine from './UIBreakLine'

export default class UIFileList extends UIElement {
  private readonly fileList: IFile[] = []
  private filePath = ''

  constructor(private readonly handler: IHandleLinkClick) {
    super()
  }

  async initialize(data: IUIFileListData): Promise<void> {
    try {
      super.initialize(data)
      this.filePath = data.filePath
      await this.loadFiles()
      this.createList()
      new FirstLinkClick().initialize({})
    } catch (error: any) {
      console.error(error.message)
    }
  }

  private async loadFiles() {
    try {
      this.fileList.push(...(await loadJSONFile(this.filePath)))
    } catch (error: any) {
      console.error(error.message)
    }
  }

  private createList() {
    for (const file of this.fileList) {
      this.createItem(file)
    }
  }

  private createItem(file: IFile) {
    new UILink().create(
      this.ui,
      { href: '#', textContent: file.name },
      async (_event: MouseEvent) => {
        this.handler.handleLinkClick(file)
      }
    )
    new UIBreakLine().create(this.ui)
  }
}
