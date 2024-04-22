export default function getById(id: string) {
  const element = document.getElementById(id)
  if (!element) throw new Error(`No element with id ${id}`)
  return element
}
