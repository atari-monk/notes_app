import 'ui_lib/css/dark_mode.css'
import 'ui_lib/css/styles.css'
import 'font-awesome/css/font-awesome.min.css'
import MarkdownIt from 'markdown-it'
import implicitFigures from 'markdown-it-implicit-figures'
import hljs from 'highlight.js'
import { MainPage } from 'ui_lib'

const markDownIt = new MarkdownIt()
markDownIt.use(implicitFigures, { dataType: false, figcaption: true })

new MainPage(markDownIt, hljs).initialize()
