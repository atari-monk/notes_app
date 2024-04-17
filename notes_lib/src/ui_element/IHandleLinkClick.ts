import IFile from './IFile'

export default interface IHandleLinkClick {
  handleLinkClick(file: IFile): Promise<void>
}
