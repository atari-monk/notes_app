import IInnerTextData from './data_type/IInnerTextData'
import Component from './Component'

export default class SetInnerText extends Component {
  initialize(data: IInnerTextData) {
    try {
      super.initialize(data)
      this.ui.innerText = data.innerText
    } catch (error: any) {
      console.error(error.message)
    }
  }
}
