import IUIElementData from './data_type/IUIElementData'
import Component from './Component'
import { ISectionsAndChats } from 'data_lib'
import IndexComponent from '../component/IndexComponent'
import SectionComponent from '../component/SectionComponent'
import IRenderer from '../component/IRenderer'

export default class PageContent extends Component {
  private _indexComponent!: IndexComponent
  private _data!: ISectionsAndChats

  set indexComponent(indexComponent: IndexComponent) {
    this._indexComponent = indexComponent
  }

  set data(data: ISectionsAndChats) {
    this._data = data
  }

  constructor(private readonly renderer: IRenderer) {
    super()
  }

  initialize(data: IUIElementData): void {
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
        sectionIndex,
        this.ui,
        this._indexComponent
      )
      sectionComponent.createSectionElement(section.title, section.chats)
    })
  }
}
