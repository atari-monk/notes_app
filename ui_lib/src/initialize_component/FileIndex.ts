import { loadJSONFile } from 'data_lib'
import IFileMetadata from './type/IFileMetadata'
import ILinkClick from '../handler/ILinkClick'
import IFileIndexData from './type/IFileIndexData'
import Component from '../component/Component'
import FirstLinkClick from './FirstLinkClick'
import Link from './Link'
import BreakLine from './BreakLine'

export default class FileIndex extends Component<HTMLElement> {
  private readonly fileList: IFileMetadata[] = []
  private filePath = ''

  constructor(private readonly handler: ILinkClick) {
    super()
  }

  async initialize(data: IFileIndexData): Promise<void> {
    try {
      super.initialize(data)
      this.filePath = data.filePath
      await this.loadFiles(data.category)
      this.ui.innerHTML = ''
      this.createList()
      new FirstLinkClick().initialize({})
    } catch (error: any) {
      console.error(error.message)
    }
  }

  private async loadFiles(category: string) {
    try {
      const data: IFileMetadata[] = await loadJSONFile(this.filePath)
      const filteredData = data.filter((item) => item.category === category)
      this.fileList.push(...filteredData)
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
