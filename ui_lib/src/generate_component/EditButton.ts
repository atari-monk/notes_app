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
    const button = this.generateButton(data)
    this.setupButton(button, data)
    div.appendChild(button)
    return div
  }

  private generateButton(data: IEditButtonData): HTMLButtonElement {
    const { sectionIndex, questionIndex } = data
    const element = document.createElement('button')
    element.className = 'edit_button'
    element.innerText = `SectionIndex: ${sectionIndex}, QuestionIndex: ${questionIndex}`
    return element
  }

  private setupButton(button: HTMLButtonElement, data: IEditButtonData): void {
    button.addEventListener('click', () => {
      this.redirectToForm(data)
    })
  }

  private redirectToForm(data: IEditButtonData) {
    const { sectionIndex, questionIndex } = data
    const url = `http://127.0.0.1:5500/editor/build/edit.html?section=${sectionIndex}&question=${questionIndex}`
    window.open(url, '_blank')
  }
}
