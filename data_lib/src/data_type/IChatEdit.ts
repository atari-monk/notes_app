import IFileSectionChatData from './IFileSectionChatData'
import ISectionAndChatNr from './ISectionAndChatNr'

export default interface IChatEdit {
  chatNr: ISectionAndChatNr
  chat: IFileSectionChatData
}
