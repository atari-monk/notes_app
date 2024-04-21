import IUIElementData from '../data_type/IInnerTextData'
import { Tag } from './Tag'

export default interface IComponent {
  tag: Tag
  id: string
  className: string
  ui: HTMLElement
  initialize(data: IUIElementData): void
  addClick(listener: (ev: MouseEvent) => any): void
}
