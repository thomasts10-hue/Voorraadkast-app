import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { mockProducts, mockStock } from '../data/mockData'
import type { Category, Product, StockItem, StockWithProduct } from '../types'

const STORAGE_KEY = 'voorraadkast:v1'

interface StoredData {
  products: Product[]
  stock: StockItem[]
}

function loadInitialData(): StoredData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as StoredData
  } catch {
    // localStorage kan mislukken (bv. privénavigatie) — dan starten we met de voorbeelddata.
  }
  return { products: mockProducts, stock: mockStock }
}

export interface NewStockInput {
  barcode?: string
  name: string
  weight?: string
  category: Category
  quantity: number
  expiryDate?: string
}

interface StockContextValue {
  items: StockWithProduct[]
  addStock: (input: NewStockInput) => void
  adjustQuantity: (stockId: string, delta: number) => void
  markAsFinished: (stockId: string) => void
  findProductByBarcode: (barcode: string) => Product | undefined
}

const StockContext = createContext<StockContextValue | null>(null)

export function StockProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoredData>(loadInitialData)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // Als opslaan niet lukt, werkt de app gewoon door zonder persistentie.
    }
  }, [data])

  const value = useMemo<StockContextValue>(() => {
    const items: StockWithProduct[] = data.stock
      .map((stockItem) => {
        const product = data.products.find((p) => p.id === stockItem.productId)
        return product ? { ...stockItem, product } : null
      })
      .filter((item): item is StockWithProduct => item !== null)

    function findProductByBarcode(barcode: string) {
      return data.products.find((p) => p.barcode === barcode)
    }

    function addStock(input: NewStockInput) {
      setData((prev) => {
        let product = input.barcode
          ? prev.products.find((p) => p.barcode === input.barcode)
          : prev.products.find(
              (p) => p.name.toLowerCase() === input.name.toLowerCase() && !input.barcode,
            )

        let products = prev.products
        if (!product) {
          product = {
            id: crypto.randomUUID(),
            barcode: input.barcode,
            name: input.name,
            weight: input.weight,
            category: input.category,
          }
          products = [...prev.products, product]
        }

        const existingStock = prev.stock.find((s) => s.productId === product!.id)
        let stock: StockItem[]
        if (existingStock) {
          stock = prev.stock.map((s) =>
            s.id === existingStock.id
              ? {
                  ...s,
                  quantity: s.quantity + input.quantity,
                  expiryDate: input.expiryDate ?? s.expiryDate,
                  updatedAt: new Date().toISOString(),
                }
              : s,
          )
        } else {
          const newStockItem: StockItem = {
            id: crypto.randomUUID(),
            productId: product.id,
            quantity: input.quantity,
            expiryDate: input.expiryDate,
            updatedAt: new Date().toISOString(),
          }
          stock = [...prev.stock, newStockItem]
        }

        return { products, stock }
      })
    }

    function adjustQuantity(stockId: string, delta: number) {
      setData((prev) => {
        const stock = prev.stock
          .map((s) =>
            s.id === stockId
              ? { ...s, quantity: s.quantity + delta, updatedAt: new Date().toISOString() }
              : s,
          )
          .filter((s) => s.quantity > 0)
        return { ...prev, stock }
      })
    }

    function markAsFinished(stockId: string) {
      setData((prev) => ({
        ...prev,
        stock: prev.stock.filter((s) => s.id !== stockId),
      }))
    }

    return { items, addStock, adjustQuantity, markAsFinished, findProductByBarcode }
  }, [data])

  return <StockContext.Provider value={value}>{children}</StockContext.Provider>
}

export function useStock() {
  const ctx = useContext(StockContext)
  if (!ctx) throw new Error('useStock moet binnen een StockProvider gebruikt worden')
  return ctx
}
