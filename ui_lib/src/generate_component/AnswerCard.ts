import IGenerateComponent from '../component/type/IGenerateComponent'
import IRenderer from './type/IRenderer'
import IAnswerCardData from './type/IAnswerCardData'

export default class AnswerCard
  implements IGenerateComponent<IAnswerCardData, HTMLDivElement>
{
  constructor(private readonly renderer: IRenderer) {}

  generate(data: IAnswerCardData) {
    const { sectionIndex, questionIndex, question, answer } = data
    const card = this.createCard(question, answer)
    card.id = `section-${sectionIndex}-question-${questionIndex}`
    return card
  }

  private createCard(question: string, answer: string): HTMLDivElement {
    const card = document.createElement('div')
    card.classList.add('card')
    card.appendChild(this.createQuestionParagraph(question))
    card.appendChild(this.createAnswerDiv(answer))
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
