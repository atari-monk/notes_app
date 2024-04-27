import Component from '../component/Component'
import IFactory from '../factory/IFactory'
import FileIndex from './FileIndex'
import ICategoryFilterData from './type/ICategoryFilterData'

export default class CategoryFilter extends Component<HTMLSelectElement> {
  constructor(private readonly fileIndexFactory: IFactory<FileIndex>) {
    super()
  }

  initialize(data: ICategoryFilterData): void {
    try {
      super.initialize(data)
      const { categories, defaultCategory, categoryFromUrl } = data

      for (const category of categories) {
        const { key, value } = category
        const option = document.createElement('option')
        option.value = key
        option.text = value
        this.ui.add(option)
      }

      this.ui.addEventListener('change', async () => {
        this.fileIndexFactory.getNewInstance().initialize({
          id: 'fileListContainer',
          filePath: 'public_note/files.json',
          category: this.ui.value.toLowerCase(),
        })
      })

      if (
        categoryFromUrl &&
        categories.find((c) => c.key === categoryFromUrl)
      ) {
        this.ui.value = categoryFromUrl
      } else {
        this.ui.value = defaultCategory
      }

      var event = new Event('change')
      this.ui.dispatchEvent(event)
    } catch (error: any) {
      console.error(error.message)
    }
  }
}
