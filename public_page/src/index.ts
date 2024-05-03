import 'ui_lib/css/dark_mode.css'
import 'ui_lib/css/styles.css'
import 'font-awesome/css/font-awesome.min.css'
import MarkdownIt from 'markdown-it'
import implicitFigures from 'markdown-it-implicit-figures'
import hljs from 'highlight.js'
import { MainPage } from 'ui_lib'

const markDownIt = new MarkdownIt()
markDownIt.use(implicitFigures, { dataType: false, figcaption: true })

const dataFolder = 'public_note'
const categoryFilePath = `${dataFolder}/categories.json`
const contentFilePath = `${dataFolder}/files.json`
new MainPage(markDownIt, hljs, categoryFilePath).initialize(contentFilePath)
