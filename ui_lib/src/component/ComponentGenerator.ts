import IGenerateComponent from './type/IGenerateComponent'
import ISelectorData from './type/ISelectorData'

export default class ComponentGenerator
  implements IGenerateComponent<ISelectorData, void>
{
  constructor(
    private readonly generator: IGenerateComponent<HTMLElement, void>
  ) {}

  generate(data: ISelectorData) {
    const { selector } = data
    for (const item of document.querySelectorAll<HTMLElement>(selector)) {
      this.generator.generate(item)
    }
  }
}
