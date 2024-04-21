import Component from './Component'
import IUIElementData from './data_type/IUIElementData'

export default class ScrollIntoView extends Component {
  initialize(data: IUIElementData) {
    try {
      super.initialize(data)
      this.ui.scrollIntoView({ behavior: 'smooth' })
    } catch (error: any) {
      console.error(error.message)
    }
  }
}
