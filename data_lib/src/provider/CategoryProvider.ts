import ICategoriesConfig from '../data_type/ICategoriesConfig'
import ICategory from '../data_type/ICategory'
import loadJSONFile from '../file_sys/json'

export default class CategoryProvider {
  private categories: ICategory[] = []
  private defaultCategory: string = ''

  async loadCategories(
    filePath = './public_note/categories.json'
  ): Promise<void> {
    try {
      const categoriesConfig = await loadJSONFile<ICategoriesConfig>(filePath)
      if (categoriesConfig) {
        this.categories = categoriesConfig.categories
        this.defaultCategory = categoriesConfig.defaultCategory
      } else {
        console.error('Failed to load categories.')
      }
    } catch (error) {
      console.error('Error loading categories file:', error)
    }
  }

  getCategoryFromUrl(): string | undefined {
    const params = new URLSearchParams(window.location.search)
    const categoryParam = params.get('category')
    return categoryParam ? categoryParam.toLowerCase() : undefined
  }

  getDefaultCategory(): string {
    return this.defaultCategory
  }

  getAllCategories(): ICategory[] {
    return this.categories
  }
}
