import IGenerateComponent from '../component/type/IGenerateComponent'
import IRenderer from './IRenderer'
import IAnswerCardData from './type/IAnswerCardData'

export default class AnswerCard
  implements IGenerateComponent<IAnswerCardData, HTMLDivElement>
{
  constructor(private readonly renderer: IRenderer) {}

  generate(data: IAnswerCardData) {
    const { sectionIndex, questionIndex, question, answer } = data
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML += `<p>${this.renderer.render(question)}</p><hr />`

    card.appendChild(this.createDiv(answer))

    card.id = `section-${sectionIndex}-question-${questionIndex}`

    card.innerHTML += `<a href="#index_title" class="index">&#9650;</a>`
    return card
  }

  private createDiv(answer: string): Node {
    const div = document.createElement('div')
    div.innerHTML = this.renderer.render(answer)
    return div
  }
}
