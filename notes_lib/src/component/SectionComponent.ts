import IndexComponent from './IndexComponent'
import AnswerCard from './AnswerCard'
import IRenderer from './IRenderer'

export default class SectionComponent {
  constructor(
    private readonly renderer: IRenderer,
    private readonly sectionIndex: number,
    private readonly jsonContainer: HTMLElement,
    private readonly indexComponent: IndexComponent
  ) {}

  createSectionElement(
    sectionTitle: string,
    questions: { indexTitle: string; question: string; answer: string }[]
  ) {
    const sectionDiv = document.createElement('div')
    sectionDiv.id = `section-${this.sectionIndex}`
    sectionDiv.innerHTML = this.renderer.render(sectionTitle)

    questions.forEach((item, questionIndex) => {
      const answerCard = new AnswerCard(
        this.renderer,
        this.sectionIndex,
        questionIndex
      )
      const card = answerCard.createCard(item.question, item.answer)

      sectionDiv.appendChild(card)
    })

    this.indexComponent.addSectionEntry(
      this.sectionIndex,
      sectionTitle,
      questions
    )
    this.jsonContainer.appendChild(sectionDiv)
  }
}
