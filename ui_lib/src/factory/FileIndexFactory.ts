import LinkClick from '../handler/LinkClick'
import FileIndex from '../initialize_component/FileIndex'
import PasswordProvider from '../provider/PasswordProvider'
import HighlightWrapper from '../wrapper/HighlightWrapper'
import MarkdownWrapper from '../wrapper/MarkdownWrapper'
import IFactory from './IFactory'

export default class FileIndexFactory implements IFactory<FileIndex> {
  constructor(private readonly markDownIt: any, private readonly hljs: any) {}

  getNewInstance(): FileIndex {
    return new FileIndex(
      new LinkClick(
        new PasswordProvider(),
        new MarkdownWrapper(this.markDownIt),
        new HighlightWrapper(this.hljs)
      )
    )
  }
}
