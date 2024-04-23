import IGenerateComponent from '../component/type/IGenerateComponent'
import IEditButtonData from './type/IEditButtonData'

export default class EditButton
  implements IGenerateComponent<IEditButtonData, HTMLDivElement>
{
  generate(data: IEditButtonData) {
    const element = this.generateDiv(data)
    const { sectionIndex, questionIndex } = data
    element.id = `edit_button_section_${sectionIndex}_question_${questionIndex}`
    return element
  }

  private generateDiv(data: IEditButtonData): HTMLDivElement {
    const div = document.createElement('div')
    div.classList.add('edit_button_div')
    div.appendChild(this.generateButton(data))
    return div
  }

  private generateButton(data: IEditButtonData): HTMLButtonElement {
    const { sectionIndex, questionIndex } = data
    const element = document.createElement('button')
    element.className = 'edit_button'
    element.innerText = `SectionIndex: ${sectionIndex}, QuestionIndex: ${questionIndex}`
    return element
  }
}
