import IFileMetadata from '../initialize_component/type/IFileMetadata'

export default interface ILinkClick {
  linkClick(file: IFileMetadata): Promise<void>
}
