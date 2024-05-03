import { CategoryProvider } from 'data_lib'
import FileIndexFactory from '../factory/FileIndexFactory'
import CategoryFilter from '../initialize_component/CategoryFilter'

export default class MainPage {
  constructor(
    private readonly markDownIt: any,
    private readonly hljs: any,
    private readonly categoryFilePath: string
  ) {}

  async initialize(filePath: string) {
    const category = new CategoryProvider()
    await category.loadCategories(this.categoryFilePath)

    new CategoryFilter(
      new FileIndexFactory(this.markDownIt, this.hljs)
    ).initialize({
      id: 'filter',
      categories: category.getAllCategories(),
      defaultCategory: category.getDefaultCategory(),
      categoryFromUrl: category.getCategoryFromUrl(),
      fileIndexData: {
        id: 'fileListContainer',
        category: '',
        filePath: filePath,
      },
    })
  }
}
