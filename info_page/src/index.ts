import './css/styles.css'
import './css/dark_mode.css'
import 'font-awesome/css/font-awesome.min.css'
import { ToggleButton, FileIndex, LinkClick, PasswordProvider } from 'ui_lib'
import MarkdownIt from 'markdown-it'
import implicitFigures from 'markdown-it-implicit-figures'
import CodeHighlight from './CodeHighlight'

new ToggleButton().initialize({
  id: 'darkModeButton',
  className: 'dark-mode',
})

const markDownIt: MarkdownIt = new MarkdownIt()
markDownIt.use(implicitFigures, { dataType: false, figcaption: true })

new FileIndex(
  new LinkClick(new PasswordProvider(), markDownIt, new CodeHighlight())
).initialize({
  id: 'fileListContainer',
  filePath: 'data/files.json',
})
