import IEditFileData from "./IEditFileData"

export default interface IAnswerCardData {
  sectionIndex: number
  questionIndex: number
  question: string
  answer: string
  editFileData: IEditFileData
}
