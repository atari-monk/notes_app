import IComponentData from './data_type/IComponentData'
import Component from './Component'
import IndexComponent from '../component/IndexComponent'

export default class PageIndex extends Component {
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
