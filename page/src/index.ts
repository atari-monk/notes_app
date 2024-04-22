import './css/styles.css'
import './css/dark_mode.css'
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

new ToggleButton().initialize({
  id: 'darkModeButton',
  className: 'dark-mode',
})

const markDownIt: MarkdownIt = new MarkdownIt()
markDownIt.use(implicitFigures, { dataType: false, figcaption: true })

const categories = ['Info', 'Code', 'DIY']

const select = getById('filter') as HTMLSelectElement

categories.forEach(function (category) {
  const option = document.createElement('option')
  option.text = category
  select.add(option)
})

select.addEventListener('change', function () {
  const selectedCategory = select.value.toLowerCase()
  console.log('Category selected:', selectedCategory)
  new FileIndex(
    new LinkClick(new PasswordProvider(), markDownIt, new CodeHighlight())
  ).initialize({
    id: 'fileListContainer',
    filePath: 'data/files.json',
    category: selectedCategory,
  })
})

select.value = 'Info'

var event = new Event('change')
select.dispatchEvent(event)
