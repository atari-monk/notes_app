import IGenerateComponent from '../component/type/IGenerateComponent'
import IRenderer from './type/IRenderer'
import IAnswerCardData from './type/IAnswerCardData'
import EditButton from './EditButton'
import IEditFileData from './type/IEditFileData'

export default class AnswerCard
  implements IGenerateComponent<IAnswerCardData, HTMLDivElement>
{
  constructor(
    private readonly renderer: IRenderer,
    private readonly isEditable = false,
    private readonly editFileData: IEditFileData = {} as IEditFileData
  ) {}

  generate(data: IAnswerCardData) {
    const { sectionIndex, questionIndex } = data
    const card = this.createCard(data)
    card.id = `section-${sectionIndex}-question-${questionIndex}`
    return card
  }

  private createCard(data: IAnswerCardData): HTMLDivElement {
    const { sectionIndex, questionIndex, question, answer } = data
    const card = document.createElement('div')
    card.classList.add('card')
    card.appendChild(this.createQuestionParagraph(question))
    card.appendChild(this.createAnswerDiv(answer))
    if (this.isEditable) {
      const editButton = new EditButton().generate({
        fileData: this.editFileData,
        sectionIndex,
        questionIndex,
      })
      card.appendChild(editButton)
    }
    card.appendChild(this.createIndexLink())
    return card
  }

  private createQuestionParagraph(question: string): HTMLParagraphElement {
    const paragraph = document.createElement('p')
    paragraph.innerHTML = this.renderer.render(question)
    return paragraph
  }

  private createAnswerDiv(answer: string): HTMLDivElement {
    const div = document.createElement('div')
    div.innerHTML = this.renderer.render(answer)
    return div
  }

  private createIndexLink(): HTMLAnchorElement {
    const link = document.createElement('a')
    link.href = '#index_title'
    link.classList.add('index')
    link.innerHTML = '&#9650;'
    return link
  }
}
