import IUIInnerTextData from './data_type/IUIInnerTextData'
import Component from './Component'

export default class SetInnerText extends Component {
  initialize(data: IUIInnerTextData) {
    try {
      super.initialize(data)
      this.ui.innerText = data.innerText
    } catch (error: any) {
      console.error(error.message)
    }
  }
}
