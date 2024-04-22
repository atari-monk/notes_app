import IComponentData from '../../component/type/IComponentData'

export default interface IFileIndexData extends IComponentData {
  filePath: string
  category: string
}
