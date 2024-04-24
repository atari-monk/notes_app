import MarkdownIt from 'markdown-it'
import CodeHighlight from './CodeHighlight'
import { ISectionsAndChats } from 'data_lib'
import { Page } from 'ui_lib'

export default class FileOpener {
  private fileInput: HTMLInputElement
  private jsonContainer: HTMLElement
  private currentPage: HTMLElement
  private markDownIt: MarkdownIt
  private previousFileName: string

  constructor(
    fileInputId: string,
    jsonContainerId: string,
    currentPageId: string,
    markDownIt: MarkdownIt
  ) {
    this.fileInput = document.getElementById(fileInputId) as HTMLInputElement
    this.jsonContainer = document.getElementById(jsonContainerId) as HTMLElement
    this.currentPage = document.getElementById(currentPageId) as HTMLElement
    this.markDownIt = markDownIt
    this.previousFileName = ''

    this.setupListeners()
  }

  private setupListeners() {
    this.fileInput.addEventListener('click', () => {
      if (this.previousFileName) {
        this.copyFileNameToClipboard(this.previousFileName)
      }
    })

    this.fileInput.addEventListener('change', () => this.openFile())
  }

  private openFile() {
    const files = this.fileInput.files

    if (files && files.length > 0) {
      const file = files[0]
      this.previousFileName = file.name
      this.currentPage.innerText = file.name

      const reader = new FileReader()

      reader.onload = (event) => {
        try {
          const jsonData: ISectionsAndChats = JSON.parse(
            event.target?.result as string
          )
          new Page(this.markDownIt, new CodeHighlight()).generate({
            fileData: jsonData,
            editFileData: {
              isEditable: true,
              category: jsonData.category,
              name: file.name.replace('.json', ''),
            },
          })
        } catch (error) {
          console.error('Error parsing JSON:', error)
          this.jsonContainer.textContent =
            'Error parsing JSON. Please check the file format.'
        }
      }

      reader.onerror = (event) => {
        console.error('File reading error:', event.target?.error)
        this.jsonContainer.textContent = 'Error reading file.'
      }

      reader.readAsText(file)
      this.fileInput.value = ''
    } else {
      this.jsonContainer.textContent = 'No file selected.'
    }
  }

  private copyFileNameToClipboard(fileName: string) {
    try {
      navigator.clipboard.writeText(fileName)
    } catch (err) {
      console.error('Failed to copy file name to clipboard: ', err)
    }
  }
}
