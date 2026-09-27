import { useStock } from '../store/StockContext'
import { groupByCategory } from '../lib/grouping'
import { LOW_STOCK_THRESHOLD } from '../types'

export function Products() {
  const { items, adjustQuantity, markAsFinished } = useStock()
  const groups = groupByCategory(items)

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Producten</h1>

      {groups.length === 0 && (
        <p className="mt-6 text-center text-sm text-zinc-400">
          Nog niets toegevoegd. Tik op + om te beginnen.
        </p>
      )}

      <div className="mt-4 space-y-6">
        {groups.map(({ category, items: categoryItems }) => (
          <section key={category}>
            <h2 className="mb-2 text-sm font-semibold text-zinc-500">{category}</h2>
            <ul className="divide-y divide-zinc-100 rounded-2xl border border-zinc-100">
              {categoryItems.map((item) => {
                const isLow = item.quantity <= LOW_STOCK_THRESHOLD
                return (
                  <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-medium text-zinc-800">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-zinc-400">
                        {item.product.weight ?? '—'}
                        {item.expiryDate && ` · THT ${formatDate(item.expiryDate)}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => adjustQuantity(item.id, -1)}
                        aria-label="Aantal verlagen"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 active:bg-zinc-100"
                      >
                        −
                      </button>
                      <span
                        className={`w-5 text-center text-sm font-semibold ${
                          isLow ? 'text-red-600' : 'text-zinc-700'
                        }`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => adjustQuantity(item.id, 1)}
                        aria-label="Aantal verhogen"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 active:bg-zinc-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => markAsFinished(item.id)}
                      className="ml-1 shrink-0 rounded-full border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-500 active:bg-zinc-100"
                    >
                      Op
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })
}
