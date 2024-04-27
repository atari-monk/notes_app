import IInnerTextData from './type/IInnerTextData'
import Component from '../component/Component'

export default class SetInnerText extends Component<HTMLElement> {
  initialize(data: IInnerTextData) {
    try {
      super.initialize(data)
      this.ui.innerText = data.innerText
    } catch (error: any) {
      console.error(error.message)
    }
  }
}
