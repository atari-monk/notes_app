import 'ui_lib/css/dark_mode.css'
import 'ui_lib/css/styles.css'
import 'font-awesome/css/font-awesome.min.css'
import { ToggleButton, FileIndex, LinkClick, PasswordProvider, MarkdownWrapper } from 'ui_lib'
import MarkdownIt from 'markdown-it'
import implicitFigures from 'markdown-it-implicit-figures'
import CodeHighlight from './CodeHighlight'
import { CategoryProvider, ICategory } from 'data_lib'
import Component from 'ui_lib/component/Component'
import IComponentData from 'ui_lib/component/type/IComponentData'

new ToggleButton().initialize({
  id: 'darkModeButton',
  className: 'dark-mode',
})

const markDownIt = new MarkdownIt()
markDownIt.use(implicitFigures, { dataType: false, figcaption: true })

interface ICategoryFilterData extends IComponentData {
  categories: ICategory[]
  defaultCategory: string
  categoryFromUrl: string | undefined
}

class CategoryFilter extends Component<HTMLSelectElement> {
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
        new FileIndex(
          new LinkClick(
            new PasswordProvider(),
            new MarkdownWrapper(markDownIt),
            new CodeHighlight()
          )
        ).initialize({
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

;(async () => {
  const category = new CategoryProvider()
  await category.loadCategories()

  new CategoryFilter().initialize({
    id: 'filter',
    categories: category.getAllCategories(),
    defaultCategory: category.getDefaultCategory(),
    categoryFromUrl: category.getCategoryFromUrl(),
  })
})()
