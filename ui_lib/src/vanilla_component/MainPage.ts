import { CategoryProvider } from 'data_lib'
import FileIndexFactory from '../factory/FileIndexFactory'
import CategoryFilter from '../initialize_component/CategoryFilter'

export default class MainPage {
  private markDownIt: any
  private hljs: any

  constructor(markDownIt: any, hljs: any) {
    this.markDownIt = markDownIt
    this.hljs = hljs
  }

  async initialize() {
    const category = new CategoryProvider()
    await category.loadCategories()

    new CategoryFilter(
      new FileIndexFactory(this.markDownIt, this.hljs)
    ).initialize({
      id: 'filter',
      categories: category.getAllCategories(),
      defaultCategory: category.getDefaultCategory(),
      categoryFromUrl: category.getCategoryFromUrl(),
    })
  }
}
