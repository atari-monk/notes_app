import { ICategory } from 'data_lib'
import IComponentData from '../../component/type/IComponentData'
import IFileIndexData from './IFileIndexData'

export default interface ICategoryFilterData extends IComponentData {
  categories: ICategory[]
  defaultCategory: string
  categoryFromUrl: string | undefined
  fileIndexData: IFileIndexData
}
