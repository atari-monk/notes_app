import IRenderer from './type/IRenderer'
import AnswerCard from './AnswerCard'
import IGenerateComponent from '../component/type/IGenerateComponent'
import ISectionComponentData from './type/ISectionComponentData'
import IEditFileData from './type/IEditFileData'

export default class SectionComponent
  implements IGenerateComponent<ISectionComponentData, void>
{
  constructor(
    private readonly renderer: IRenderer,
    private readonly isEditable = false,
    private readonly editFileData: IEditFileData = {} as IEditFileData
  ) {}

  generate(data: ISectionComponentData) {
    const {
      sectionIndex,
      sectionTitle,
      questions,
      jsonContainer,
      indexComponent,
    } = data
    const sectionDiv = document.createElement('div')
    sectionDiv.id = `section-${sectionIndex}`
    sectionDiv.innerHTML = this.renderer.render(sectionTitle)

    questions.forEach((item, questionIndex) => {
      const component = new AnswerCard(this.renderer, this.isEditable, this.editFileData)
      const ui = component.generate({
        sectionIndex: data.sectionIndex,
        questionIndex: questionIndex,
        question: item.question,
        answer: item.answer,
      })
      sectionDiv.appendChild(ui)
    })

    indexComponent.generate({
      sectionIndex: data.sectionIndex,
      questionIndex: 0,
      sectionTitle: data.sectionTitle,
      indexTitle: '',
      questions,
    })
    jsonContainer.appendChild(sectionDiv)
  }
}
