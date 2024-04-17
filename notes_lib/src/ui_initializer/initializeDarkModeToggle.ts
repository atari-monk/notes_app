export default function initializeDarkModeToggle(
  buttonId: string,
  darkModeClass: string
): void {
  const darkModeButton = document.getElementById(buttonId) as HTMLElement

  if (!darkModeButton) {
    console.error(`Element with ID '${buttonId}' not found.`)
    return
  }

  darkModeButton.addEventListener('click', toggleDarkMode)

  function toggleDarkMode(): void {
    const body = document.body
    body.classList.toggle(darkModeClass)
  }
}
