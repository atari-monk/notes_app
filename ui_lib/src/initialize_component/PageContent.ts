import IComponentData from '../component/type/IComponentData'
import Component from '../component/Component'
import { ISectionsAndChats } from 'data_lib'
import IRenderer from '../generate_component/type/IRenderer'
import IndexComponent from '../generate_component/IndexComponent'
import SectionComponent from '../generate_component/SectionComponent'
import IEditFileData from '../generate_component/type/IEditFileData'

export default class PageContent extends Component<HTMLElement> {
  private _indexComponent!: IndexComponent
  private _data!: ISectionsAndChats
  private _editFileData!: IEditFileData

  set indexComponent(indexComponent: IndexComponent) {
    this._indexComponent = indexComponent
  }

  set data(data: ISectionsAndChats) {
    this._data = data
  }

  set editFileData(editFileData: IEditFileData) {
    this._editFileData = editFileData
  }

  constructor(private readonly renderer: IRenderer) {
    super()
  }

  initialize(data: IComponentData): void {
    try {
      super.initialize(data)
      this.ui.innerHTML = ''
      this.createPageContent()
    } catch (error: any) {
      console.error(error.message)
    }
  }

  private createPageContent() {
    this._data.sections.forEach((section, sectionIndex) => {
      const sectionComponent = new SectionComponent(this.renderer)
      sectionComponent.generate({
        sectionIndex,
        sectionTitle: section.title,
        questions: section.chats,
        jsonContainer: this.ui,
        indexComponent: this._indexComponent,
        editFileData: this._editFileData,
      })
    })
  }
}
