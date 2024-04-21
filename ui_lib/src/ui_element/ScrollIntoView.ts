import Component from './Component'
import IComponentData from './data_type/IComponentData'

export default class ScrollIntoView extends Component {
  initialize(data: IComponentData) {
    try {
      super.initialize(data)
      this.ui.scrollIntoView({ behavior: 'smooth' })
    } catch (error: any) {
      console.error(error.message)
    }
  }
}
