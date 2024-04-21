import IFileMetadata from '../ui_element/data_type/IFileMetadata'

export default interface ILinkClick {
  linkClick(file: IFileMetadata): Promise<void>
}
