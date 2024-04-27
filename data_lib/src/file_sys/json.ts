export default async function loadJSONFile<T>(filePath: string): Promise<T> {
  const response = await fetch(filePath)
  if (!response.ok) {
    throw new Error('Failed to fetch JSON file')
  }
  const jsonData = (await response.json()) as T
  if (!jsonData) {
    throw new Error('Failed to parse JSON data')
  }
  return jsonData
}
