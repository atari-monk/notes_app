import 'ui_lib/css/dark_mode.css'
import 'ui_lib/css/styles.css'
import 'font-awesome/css/font-awesome.min.css'
import MarkdownIt from 'markdown-it'
import implicitFigures from 'markdown-it-implicit-figures'
import hljs from 'highlight.js'
import { CategoryProvider } from 'data_lib'
import { ToggleButton, FileIndexFactory, CategoryFilter } from 'ui_lib'

const markDownIt = new MarkdownIt()
markDownIt.use(implicitFigures, { dataType: false, figcaption: true })

new ToggleButton().initialize({
  id: 'darkModeButton',
  className: 'dark-mode',
})
;(async () => {
  const category = new CategoryProvider()
  await category.loadCategories()

  new CategoryFilter(new FileIndexFactory(markDownIt, hljs)).initialize({
    id: 'filter',
    categories: category.getAllCategories(),
    defaultCategory: category.getDefaultCategory(),
    categoryFromUrl: category.getCategoryFromUrl(),
  })
})()
