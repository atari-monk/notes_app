import IGenerateComponent from '../component/type/IGenerateComponent'

export default class HighlightWrapper
  implements IGenerateComponent<HTMLElement, void>
{
  constructor(private readonly hljs: any) {}

  generate(item: HTMLElement): void {
    this.hljs.highlightElement(item)
  }
}
