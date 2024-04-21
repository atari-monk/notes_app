import IUIElementData from './IUIElementData'

export default interface IUILinkData extends IUIElementData {
  href: string
  textContent: string
}
