import IComponentData from '../../component/type/IComponentData'

export default interface ILinkData extends IComponentData {
  href: string
  textContent: string
}
