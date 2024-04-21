import IComponentData from './data_type/IComponentData'
import IComponent from './ui_type/IComponent'
import { Tag } from './ui_type/Tag'
import InitializationGuard from '../util/InitializationGuard'

export default class Component implements IComponent {
  private readonly initializationGuard: InitializationGuard
  id: string = ''
  tag: Tag = ''
  className: string = ''
  ui!: HTMLElement

  constructor() {
    this.initializationGuard = new InitializationGuard(
      'UIElement already initialized.'
    )
  }

  initialize(data: IComponentData) {
    this.initializationGuard.checkInitialized()
    const { id, className } = data
    this.id = id ?? ''
    this.className = className ?? ''
    this.setUI()
    this.initializationGuard.setInitialized()
  }

  protected setUI() {
    const item = document.getElementById(this.id)
    if (!item) {
      throw new Error(`Element with ID '${this.id}' not found.`)
    }
    this.ui = item
  }

  addClick(listener: (event: MouseEvent) => any) {
    this.ui.addEventListener('click', listener)
  }

  addClickAsync(
    ui: HTMLElement,
    listener: (event: MouseEvent) => Promise<any>
  ) {
    ui.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault()
      try {
        await listener(event)
      } catch (error: any) {
        console.error(error.message)
      }
    })
  }
}