import hljs from 'highlight.js'
import IGenerateComponent from 'ui_lib/component/type/IGenerateComponent'

export default class CodeHighlight
  implements IGenerateComponent<HTMLElement, void>
{
  generate(item: HTMLElement): void {
    hljs.highlightElement(item)
  }
}
