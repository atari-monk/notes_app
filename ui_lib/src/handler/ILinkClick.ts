import IFile from '../ui_element/data_type/IFile'

export default interface ILinkClick {
  linkClick(file: IFile): Promise<void>
}
