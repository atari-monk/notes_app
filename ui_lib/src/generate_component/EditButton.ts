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
    const button = this.generateButton()
    this.setupButton(button, data)
    div.appendChild(button)
    return div
  }

  private generateButton(): HTMLButtonElement {
    const element = document.createElement('button')
    element.className = 'edit_button'
    element.innerText = 'Edit'
    return element
  }

  private setupButton(button: HTMLButtonElement, data: IEditButtonData): void {
    button.addEventListener('click', () => {
      this.redirectToForm(data)
    })
  }

  private redirectToForm(data: IEditButtonData) {
    const { sectionIndex, questionIndex } = data
    const { category, name } = data.fileData
    const url = `file:///C:/atari-monk/code/notes_app/editor/build/edit.html?category=${category}&file=${name}&section=${sectionIndex}&question=${questionIndex}`
    window.open(url, '_blank')
  }
}
