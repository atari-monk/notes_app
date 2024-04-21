import IRenderer from './type/IRenderer'
import AnswerCard from './AnswerCard'
import IndexComponent from './IndexComponent'

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
      const answerCard = new AnswerCard(this.renderer)
      const card = answerCard.generate({
        sectionIndex: this.sectionIndex,
        questionIndex: questionIndex,
        question: item.question,
        answer: item.answer,
      })

      sectionDiv.appendChild(card)
    })

    this.indexComponent.generate({
      sectionIndex: this.sectionIndex,
      questionIndex: 0,
      sectionTitle: '',
      indexTitle: '',
      questions,
    })
    this.jsonContainer.appendChild(sectionDiv)
  }
}
