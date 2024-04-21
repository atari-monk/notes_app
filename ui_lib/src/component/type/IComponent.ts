import IComponentData from './IComponentData'
import { Tag } from './Tag'

export default interface IComponent {
  tag: Tag
  id: string
  className: string
  ui: HTMLElement
  initialize(data: IComponentData): void
  addClick(listener: (ev: MouseEvent) => any): void
}
