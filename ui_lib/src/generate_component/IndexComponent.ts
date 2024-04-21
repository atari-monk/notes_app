import IGenerateComponent from '../component/type/IGenerateComponent'
import IIndexComponentData from './type/IIndexComponentData'

export default class IndexComponent
  implements IGenerateComponent<IIndexComponentData, void>
{
  private indexContainer: HTMLElement

  constructor(indexContainer: HTMLElement) {
    this.indexContainer = indexContainer
  }

  private createSectionLink(data: IIndexComponentData): HTMLElement {
    const { sectionIndex, sectionTitle } = data
    const sectionLink = document.createElement('a')
    sectionLink.textContent = sectionTitle.replace(/#/g, '')
    sectionLink.href = `#section-${sectionIndex}`
    sectionLink.classList.add('section-link')
    return sectionLink
  }

  private createQuestionLink(data: IIndexComponentData): HTMLElement {
    const { indexTitle, sectionIndex, questionIndex } = data
    const questionLink = document.createElement('a')
    questionLink.textContent = indexTitle.replace(/#/g, '')
    questionLink.href = `#section-${sectionIndex}-question-${questionIndex}`
    questionLink.classList.add('question-link')
    return questionLink
  }

  generate(data: IIndexComponentData): void {
    const { questions } = data
    const sectionLink = this.createSectionLink(data)
    const sectionEntry = document.createElement('div')
    sectionEntry.appendChild(sectionLink)
    this.indexContainer.appendChild(sectionEntry)

    questions.forEach((item, questionIndex) => {
      const updatedData = {
        ...data,
        questionIndex,
        indexTitle: item.indexTitle,
      }
      const questionLink = this.createQuestionLink(updatedData)
      sectionEntry.appendChild(questionLink)
    })
  }
}
