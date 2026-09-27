import { useStock } from '../store/StockContext'
import { LOW_STOCK_THRESHOLD } from '../types'

export function ShoppingList() {
  const { items, markAsFinished } = useStock()
  const lowStockItems = items
    .filter((item) => item.quantity <= LOW_STOCK_THRESHOLD)
    .sort((a, b) => a.product.category.localeCompare(b.product.category))

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Boodschappenlijst</h1>
      <p className="mt-1 text-sm text-zinc-500">Producten die bijna op zijn.</p>

      {lowStockItems.length === 0 ? (
        <p className="mt-8 text-center text-sm text-zinc-400">
          Niets bijna op. Tijd om lekker niet te winkelen 🎉
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-zinc-100 rounded-2xl border border-zinc-100">
          {lowStockItems.map((item) => (
            <li key={item.id} className="flex items-center gap-3 px-4 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-medium text-zinc-800">
                  {item.product.name}
                </p>
                <p className="text-xs text-zinc-400">
                  {item.product.category} · nog {item.quantity}
                </p>
              </div>
              <button
                type="button"
                onClick={() => markAsFinished(item.id)}
                className="shrink-0 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-500 active:bg-zinc-100"
              >
                Gekocht / op
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
