import { loadJSONFile } from 'data_lib'
import IFile from './data_type/IFile'
import ILinkClick from '../handler/ILinkClick'
import IUIFileListData from './data_type/IUIFileListData'
import Component from './Component'
import FirstLinkClick from './FirstLinkClick'
import Link from './Link'
import BreakLine from './BreakLine'

export default class FileIndex extends Component {
  private readonly fileList: IFile[] = []
  private filePath = ''

  constructor(private readonly handler: ILinkClick) {
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
    new Link().create(
      this.ui,
      { href: '#', textContent: file.name },
      async (_event: MouseEvent) => {
        this.handler.linkClick(file)
      }
    )
    new BreakLine().create(this.ui)
  }
}
