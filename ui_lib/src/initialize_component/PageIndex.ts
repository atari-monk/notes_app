import IComponentData from '../component/type/IComponentData'
import Component from '../component/Component'
import IndexComponent from '../generate_component/IndexComponent'

export default class PageIndex extends Component<HTMLElement> {
  private _indexComponent!: IndexComponent

  get indexComponent(): IndexComponent {
    return this._indexComponent
  }

  initialize(data: IComponentData): void {
    try {
      super.initialize(data)
      this.ui.innerHTML = ''
      this._indexComponent = new IndexComponent(this.ui)
    } catch (error: any) {
      console.error(error.message)
    }
  }
}
