import loadJSONFile from '../file_sys/json'
import ErrorUtils from '../util/ErrorUtil'
import IUIElementData from './IUIElementData'
import UIElement from './UIElement'

export default interface IFile {
  path: string
  name: string
  protected: boolean
}

export default class UIFileList extends UIElement {
  fileList: IFile[] = []
  filePath = 'data/files.json'

  async initialize(data: IUIElementData): Promise<void> {
    try {
      super.initialize(data)
      await this.loadFiles()
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
}
