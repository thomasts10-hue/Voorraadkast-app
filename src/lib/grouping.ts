import { CATEGORIES, LOW_STOCK_THRESHOLD, type Category, type StockWithProduct } from '../types'

export function groupByCategory(items: StockWithProduct[]): Array<{
  category: Category
  items: StockWithProduct[]
}> {
  return CATEGORIES.map((category) => ({
    category,
    items: items.filter((item) => item.product.category === category),
  })).filter((group) => group.items.length > 0)
}

export function hasLowStock(items: StockWithProduct[]): boolean {
  return items.some((item) => item.quantity <= LOW_STOCK_THRESHOLD)
}
