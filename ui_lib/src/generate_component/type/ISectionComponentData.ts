import IndexComponent from '../IndexComponent'
import IEditFileData from './IEditFileData'

export default interface ISectionComponentData {
  sectionIndex: number
  sectionTitle: string
  questions: { indexTitle: string; question: string; answer: string }[]
  jsonContainer: HTMLElement
  indexComponent: IndexComponent
  editFileData: IEditFileData
}
