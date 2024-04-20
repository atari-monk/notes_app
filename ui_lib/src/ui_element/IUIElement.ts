import IUIElementData from './IUIInnerTextData'

export type Tag = '' | 'a' | 'br'

export default interface IUIElement {
  tag: Tag
  id: string
  className: string
  ui: HTMLElement
  initialize(data: IUIElementData): void
  addClick(listener: (ev: MouseEvent) => any): void
}
