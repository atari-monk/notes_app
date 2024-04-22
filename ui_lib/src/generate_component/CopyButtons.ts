import IGenerateComponent from '../component/type/IGenerateComponent'

export default class CopyButtons
  implements IGenerateComponent<HTMLElement, void>
{
  generate(codeElement: HTMLElement): void {
    const container = this.generateContainer()
    const copyButton = this.generateCopyButton()
    this.setupCopyButton(copyButton, codeElement)
    this.appendElements(container, codeElement, copyButton)
  }

  private generateContainer(): HTMLDivElement {
    const container = document.createElement('div')
    container.className = 'code-container'
    return container
  }

  private generateCopyButton(): HTMLButtonElement {
    const copyButton = document.createElement('button')
    copyButton.className = 'copy-button'
    const copyIcon = this.generateCopyIcon()
    copyButton.appendChild(copyIcon)
    return copyButton
  }

  private generateCopyIcon(): HTMLElement {
    const copyIcon = document.createElement('i')
    copyIcon.className = 'fa fa-copy'
    return copyIcon
  }

  private setupCopyButton(
    copyButton: HTMLButtonElement,
    codeElement: HTMLElement
  ): void {
    copyButton.addEventListener('click', async () => {
      await this.copyClick(codeElement)
    })
  }

  private async copyClick(codeBlock: HTMLElement): Promise<void> {
    const text = codeBlock.textContent || ''
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  private appendElements(
    container: HTMLDivElement,
    codeElement: HTMLElement,
    copyButton: HTMLButtonElement
  ): void {
    const pre = codeElement.parentNode as HTMLElement | null
    if (pre) {
      container.appendChild(codeElement)
      container.appendChild(copyButton)
      pre.appendChild(container)
    }
  }
}
