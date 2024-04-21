import { loadJSONFile } from 'data_lib'
import IFileMetadata from './data_type/IFileMetadata'
import ILinkClick from '../handler/ILinkClick'
import IFileIndexData from './data_type/IFileIndexData'
import Component from './Component'
import FirstLinkClick from './FirstLinkClick'
import Link from './Link'
import BreakLine from './BreakLine'

export default class FileIndex extends Component {
  private readonly fileList: IFileMetadata[] = []
  private filePath = ''

  constructor(private readonly handler: ILinkClick) {
    super()
  }

  async initialize(data: IFileIndexData): Promise<void> {
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

  private createItem(file: IFileMetadata) {
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
