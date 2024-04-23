import IComponentData from '../component/type/IComponentData'
import Component from '../component/Component'
import { ISectionsAndChats } from 'data_lib'
import IRenderer from '../generate_component/type/IRenderer'
import IndexComponent from '../generate_component/IndexComponent'
import SectionComponent from '../generate_component/SectionComponent'

export default class PageContent extends Component {
  private _indexComponent!: IndexComponent
  private _data!: ISectionsAndChats

  set indexComponent(indexComponent: IndexComponent) {
    this._indexComponent = indexComponent
  }

  set data(data: ISectionsAndChats) {
    this._data = data
  }

  constructor(
    private readonly renderer: IRenderer,
    private readonly isEditable = false
  ) {
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
      const sectionComponent = new SectionComponent(
        this.renderer,
        this.isEditable
      )
      sectionComponent.generate({
        sectionIndex,
        sectionTitle: section.title,
        questions: section.chats,
        jsonContainer: this.ui,
        indexComponent: this._indexComponent,
      })
    })
  }
}
