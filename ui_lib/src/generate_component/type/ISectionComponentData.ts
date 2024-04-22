import IndexComponent from '../IndexComponent'

export default interface ISectionComponentData {
  sectionIndex: number
  sectionTitle: string
  questions: { indexTitle: string; question: string; answer: string }[]
  jsonContainer: HTMLElement
  indexComponent: IndexComponent
}
