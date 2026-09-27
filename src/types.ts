export const CATEGORIES = [
  'Brood en granen',
  'Pasta en rijst',
  'Blikjes en potten',
  'Sauzen, kruiden en olie',
  'Snoep en snacks',
  'Dranken',
  'Zuivel en eieren',
  'Overig',
] as const

export type Category = (typeof CATEGORIES)[number]

export interface Product {
  id: string
  barcode?: string
  name: string
  weight?: string
  category: Category
}

export interface StockItem {
  id: string
  productId: string
  quantity: number
  expiryDate?: string
  updatedAt: string
}

export interface StockWithProduct extends StockItem {
  product: Product
}

/** Vanaf welk aantal iets als "bijna op" telt (rood stipje / rode tekst). */
export const LOW_STOCK_THRESHOLD = 1
