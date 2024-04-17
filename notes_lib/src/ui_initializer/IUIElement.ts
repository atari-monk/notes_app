import IUIElementData from './IUIElementData'

export default interface IUIElement {
  id: string
  className: string
  ui: HTMLElement
  initialize(data: IUIElementData): void
  addClick(listener: (ev: MouseEvent) => any): void
}
