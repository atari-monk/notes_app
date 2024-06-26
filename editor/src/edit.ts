import 'ui_lib/css/editor/dark_mode.css'
import 'ui_lib/css/editor/styles.css'
import {
  IChatEdit,
  IChat,
  IFileSectionChatData,
  ISectionAndChatNr,
} from 'data_lib'
import { DarkModeToggler, getById } from 'ui_lib'

let noteIndex: ISectionAndChatNr = {
  sectionNr: 0,
  chatNr: 0,
}

function getQueryVariable(variable: string) {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1])
    }
  }
  console.error('Nie znaleziono parametru w adresie URL: ' + variable)
}

const categoryInput = getById('category') as HTMLInputElement
const categoryValue = getQueryVariable('category')
if (categoryInput && categoryValue !== undefined) {
  categoryInput.value = categoryValue
}

const fileTitleInput = getById('fileTitle') as HTMLInputElement
const fileTitleValue = getQueryVariable('file')
if (fileTitleInput && fileTitleValue !== undefined) {
  fileTitleInput.value = fileTitleValue
}

const sectionNumberInput = getById('sectionNumber') as HTMLInputElement
const sectionValue = getQueryVariable('section')
if (sectionNumberInput && sectionValue !== undefined) {
  sectionNumberInput.value = sectionValue
}

const questionNumberInput = getById('questionNumber') as HTMLInputElement
const questionValue = getQueryVariable('question')
if (questionNumberInput && questionValue !== undefined) {
  questionNumberInput.value = questionValue
}

async function handleLoad(event: Event) {
  event.preventDefault()

  const categoryInput = document.getElementById('category') as HTMLInputElement
  const fileTitleInput = getById('fileTitle') as HTMLInputElement
  const sectionNumber = getById('sectionNumber') as HTMLInputElement
  const questionNumber = getById('questionNumber') as HTMLInputElement

  const category = categoryInput.value
  const fileTitle = fileTitleInput.value
  const sectionNr = sectionNumber.value
  const questionNr = questionNumber.value

  noteIndex = {
    sectionNr: Number(sectionNr),
    chatNr: Number(questionNr),
  }

  const actionUrl = `http://localhost:3000/notes/getQuestion/${category}/${fileTitle}.json`

  try {
    const response = await fetch(actionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteIndex),
    })

    if (response.ok) {
      const questionData = (await response.json()) as IChat
      //   const sectionInput = document.getElementById(
      //     'section'
      //   ) as HTMLInputElement
      const indexTitleInput = document.getElementById(
        'indexTitle'
      ) as HTMLInputElement
      const questionInput = document.getElementById(
        'question'
      ) as HTMLInputElement
      const answerInput = document.getElementById(
        'answer'
      ) as HTMLTextAreaElement
      //sectionInput.value =
      indexTitleInput.value = questionData.indexTitle
      questionInput.value = questionData.question
      answerInput.value = questionData.answer
    } else {
      console.error('Failed to fetch question from the server')
    }
  } catch (error) {
    console.error('An error occurred while fetching the question:', error)
  }
}

async function handleEdit(event: Event) {
  event.preventDefault()
  const form = (event.currentTarget as HTMLButtonElement).form
  const categoryInput = document.getElementById('category') as HTMLInputElement
  const fileTitleInput = document.getElementById(
    'fileTitle'
  ) as HTMLInputElement
  const sectionInput = document.getElementById('section') as HTMLInputElement
  const indexTitleInput = document.getElementById(
    'indexTitle'
  ) as HTMLInputElement
  const questionInput = document.getElementById('question') as HTMLInputElement
  const answerInput = document.getElementById('answer') as HTMLTextAreaElement

  const category = categoryInput.value
  const fileTitle = fileTitleInput.value
  const section = sectionInput.value
  const indexTitle = indexTitleInput.value
  const question = questionInput.value
  const answer = answerInput.value

  const note: IFileSectionChatData = {
    fileTitle,
    section,
    indexTitle,
    question,
    answer,
  }

  const noteEdit: IChatEdit = {
    chatNr: noteIndex,
    chat: note,
  }

  const actionUrl = `http://localhost:3000/notes/edit/${category}/${fileTitle}.json`

  try {
    const response = await fetch(actionUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteEdit),
    })

    if (response.status === 200) {
      alert('Note submitted successfully!')
      if (form) {
        form.reset()
      }
    } else {
      alert('Error submitting note. No response from server.')
    }
  } catch (error: any) {
    console.log('Error submitting note: ' + error.message)
    alert('Error submitting note: ' + error.message)
  }
}

new DarkModeToggler()
const loadBtn = getById('loadButton')
loadBtn.addEventListener('click', handleLoad)
const editBtn = getById('editButton')
editBtn.addEventListener('click', handleEdit)
