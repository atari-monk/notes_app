import IDOMRenderer from './IDOMRenderer'

export default class CopyButtonCreator implements IDOMRenderer<HTMLElement> {
  render(item: HTMLElement): void {
    const pre = item.parentNode
    const container = document.createElement('div')
    container.className = 'code-container'

    const copyButton = document.createElement('button')
    copyButton.className = 'copy-button'

    const copyIcon = document.createElement('i')
    copyIcon.className = 'fa fa-copy'

    copyButton.appendChild(copyIcon)

    copyButton.addEventListener('click', async () => {
      await this.handleCopyButtonClick(item)
    })

    container.appendChild(item)
    container.appendChild(copyButton)
    pre?.appendChild(container)
  }

  async handleCopyButtonClick(codeBlock: HTMLElement) {
    const text = codeBlock.textContent || ''

    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }
}
