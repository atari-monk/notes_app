import IUIElementData from './IUIElementData'
import UIElement from './UIElement'
import ErrorUtils from '../util/ErrorUtil'
import IndexComponent from '../component/IndexComponent'

export default class UIIndex extends UIElement {
  private _indexComponent!: IndexComponent

  get indexComponent(): IndexComponent {
    return this._indexComponent
  }

  initialize(data: IUIElementData): void {
    try {
      super.initialize(data)
      this.ui.innerHTML = ''
      this._indexComponent = new IndexComponent(this.ui)
    } catch (error) {
      ErrorUtils.handleError(error)
    }
  }
}
