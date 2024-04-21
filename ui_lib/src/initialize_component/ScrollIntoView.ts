import Component from '../component/Component'
import IComponentData from '../component/type/IComponentData'

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
