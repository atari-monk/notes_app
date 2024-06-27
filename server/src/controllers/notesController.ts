import { Request, Response } from 'express'
import path from 'path'
import { updateChatFromFile } from '../file/update'
import { IChat, IChatEdit } from 'data_lib'
import { appendChatToFile } from '../file/append'
import { loadchatFromFile } from '../file/load'

const public_note = 'C:/atari-monk/code/notes_app/public_page/public_note'
const personal_note = 'C:/atari-monk/code/notes_app/personal_page/personal_note'
const private_note = 'C:/atari-monk/app/notes_app/private_note'
const private_category = 'private_note'
const personal_category = ['log', 'inventory', 'crazy', 'idea']

function getBaseDirectory(category: string) {
  if (category === private_category) {
    return private_note
  }
  for (const pc of personal_category) {
    if (category === pc) return personal_note
  }
  return public_note
}

export const appendChat = async (req: Request, res: Response) => {
  const { category, filename } = req.params
  const { indexTitle, question, answer, section } = req.body

  const filePath = path.join(getBaseDirectory(category), category, filename)

  const newChat: IChat = {
    indexTitle,
    question,
    answer,
    dateTime: new Date().toISOString(),
  }

  try {
    await appendChatToFile(filePath, section, newChat)
    res.sendStatus(200)
  } catch (error) {
    console.error('Error when appending chat to file:', error)
    res.status(500).send('Error when appending chat to file')
  }
}

export const loadChat = async (req: Request, res: Response) => {
  const { category, filename } = req.params
  const { sectionNr, chatNr } = req.body

  const filePath = path.join(getBaseDirectory(category), category, filename)

  try {
    const notesData = await loadchatFromFile(filePath, sectionNr, chatNr)
    res.json(notesData)
  } catch (error) {
    res.status(500).send('Error reading the file or question not found.')
  }
}

export const updateChat = async (req: Request, res: Response) => {
  const { category, filename } = req.params

  const noteEdit: IChatEdit = req.body as IChatEdit

  const { sectionNr, chatNr } = noteEdit.chatNr

  const filePath = path.join(getBaseDirectory(category), category, filename)

  try {
    await updateChatFromFile(
      filePath,
      sectionNr,
      chatNr,
      noteEdit.chat.indexTitle,
      noteEdit.chat.question,
      noteEdit.chat.answer
    )
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send('Error editing question.')
  }
}
