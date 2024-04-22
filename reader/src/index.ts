import './css/styles.css'
import './css/dark_mode.css'
import 'font-awesome/css/font-awesome.min.css'
import MarkdownIt from 'markdown-it'
import implicitFigures from 'markdown-it-implicit-figures'
import { ISectionsAndChats } from 'data_lib'
import { Page, ToggleButton } from 'ui_lib'
import CodeHighlight from './CodeHighlight'

new ToggleButton().initialize({
  id: 'darkModeButton',
  className: 'dark-mode',
})

const markDownIt: MarkdownIt = new MarkdownIt()
markDownIt.use(implicitFigures, { dataType: false, figcaption: true })

const fileInput = document.getElementById('fileInput') as HTMLInputElement
const jsonContainer = document.getElementById('jsonContainer') as HTMLElement

const currentPage = document.getElementById('currentPage_value')
let previousFileName: string = ''

fileInput.addEventListener('click', () => {
  if (previousFileName) {
    copyFileNameToClipboard(previousFileName)
  }
})

fileInput.addEventListener('change', openFile)

function openFile() {
  const file = fileInput.files?.[0]

  if (file) {
    previousFileName = file.name
    currentPage!.innerText = file.name
    const reader = new FileReader()

    reader.onload = function (event) {
      try {
        const jsonData: ISectionsAndChats = JSON.parse(
          event.target?.result as string
        )
        new Page(markDownIt, new CodeHighlight()).generate(jsonData)
      } catch (error) {
        console.error('Error parsing JSON:', error)
        jsonContainer.textContent =
          'Error parsing JSON. Please check the file format.'
      }
    }

    reader.onerror = function (event) {
      console.error('File reading error:', event.target?.error)
      jsonContainer.textContent = 'Error reading file.'
    }

    reader.readAsText(file)
    fileInput.value = ''
  } else {
    jsonContainer.textContent = 'No file selected.'
  }
}

function copyFileNameToClipboard(fileName: string) {
  try {
    navigator.clipboard.writeText(fileName)
  } catch (err) {
    console.error('Failed to copy file name to clipboard: ', err)
  }
}
