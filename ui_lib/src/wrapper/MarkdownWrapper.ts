import IRenderer from '../generate_component/type/IRenderer'

export default class MarkdownWrapper implements IRenderer {
  constructor(private readonly markDownIt: any) {}
  render(text: string): string {
    return this.markDownIt.render(text)
  }
}
