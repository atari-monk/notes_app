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

new ToggleButton().initialize({
  id: 'darkModeButton',
  className: 'dark-mode',
})

const markDownIt: MarkdownIt = new MarkdownIt()
markDownIt.use(implicitFigures, { dataType: false, figcaption: true })

const categories = {
  info: 'Info',
  code: 'Code',
  diy: 'DIY',
  log: 'Log',
  inventory: 'Inventory',
}

const select = getById('filter') as HTMLSelectElement

Object.entries(categories).forEach(function ([key, value]) {
  const option = document.createElement('option')
  option.value = key
  option.text = value
  select.add(option)
})

select.addEventListener('change', function () {
  new FileIndex(
    new LinkClick(new PasswordProvider(), markDownIt, new CodeHighlight())
  ).initialize({
    id: 'fileListContainer',
    filePath: 'public_note/files.json',
    category: select.value.toLowerCase(),
  })
})

function getCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const categoryParam = params.get('category')
  return categoryParam ? categoryParam.toLowerCase() : undefined
}

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const categoryFromUrl = getCategoryFromUrl()
if (categoryFromUrl && Object.keys(categories).includes(categoryFromUrl)) {
  select.value = categoryFromUrl
} else {
  select.value = 'info'
}

var event = new Event('change')
select.dispatchEvent(event)
