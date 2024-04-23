import { Request, Response } from 'express'
import path from 'path'
import { updateChatFromFile } from '../file/update'
import { IChat, IChatEdit } from 'data_lib'
import { appendChatToFile } from '../file/append'
import { loadchatFromFile } from '../file/load'

const baseDirectory = 'C:/atari-monk/code/notes_app/page/data'

export const appendChat = async (req: Request, res: Response) => {
  const { category, filename } = req.params
  const { indexTitle, question, answer, section } = req.body
  const filePath = path.join(baseDirectory, category, filename)

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

  const filePath = path.join(baseDirectory, category, filename)

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

  const filePath = path.join(baseDirectory, category, filename)

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
