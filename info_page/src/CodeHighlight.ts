import hljs from 'highlight.js'
import { IDOMRenderer } from 'ui_lib'

export default class CodeHighlight implements IDOMRenderer<HTMLElement> {
  render(item: HTMLElement): void {
    hljs.highlightElement(item)
  }
}
