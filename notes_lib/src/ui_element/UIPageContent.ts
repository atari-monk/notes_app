import IUIElementData from './IUIElementData'
import UIElement from './UIElement'
import ErrorUtils from '../util/ErrorUtil'
import IndexComponent from '../component/IndexComponent'
import ISectionsAndChats from '../data_type/ISectionsAndChats'
import SectionComponent from '../component/SectionComponent'
import IRenderer from '../component/IRenderer'

export default class UIPageContent extends UIElement {
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
    } catch (error) {
      ErrorUtils.handleError(error)
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
