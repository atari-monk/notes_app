import 'ui_lib/css/dark_mode.css'
import 'ui_lib/css/styles.css'
import 'font-awesome/css/font-awesome.min.css'
import {
  ToggleButton,
  FileIndex,
  LinkClick,
  PasswordProvider,
  getById,
} from 'ui_lib'
import MarkdownIt from 'markdown-it'
import implicitFigures from 'markdown-it-implicit-figures'
import CodeHighlight from './CodeHighlight'
import { CategoryProvider } from 'data_lib'

new ToggleButton().initialize({
  id: 'darkModeButton',
  className: 'dark-mode',
})

const markDownIt: MarkdownIt = new MarkdownIt()
markDownIt.use(implicitFigures, { dataType: false, figcaption: true })
;(async () => {
  const categoryProvider = new CategoryProvider()
  await categoryProvider.loadCategories()
  const categories = categoryProvider.getAllCategories()
  const defaultCategory = categoryProvider.getDefaultCategory()
  const categoryFromUrl = categoryProvider.getCategoryFromUrl()

  const select = getById('filter') as HTMLSelectElement

  for (const category of categories) {
    const { key, value } = category
    const option = document.createElement('option')
    option.value = key
    option.text = value
    select.add(option)
  }

  select.addEventListener('change', function () {
    new FileIndex(
      new LinkClick(new PasswordProvider(), markDownIt, new CodeHighlight())
    ).initialize({
      id: 'fileListContainer',
      filePath: 'public_note/files.json',
      category: select.value.toLowerCase(),
    })
  })

  if (categoryFromUrl && Object.keys(categories).includes(categoryFromUrl)) {
    select.value = categoryFromUrl
  } else {
    select.value = defaultCategory
  }

  var event = new Event('change')
  select.dispatchEvent(event)
})()
