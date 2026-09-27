import { Link } from 'react-router-dom'
import { useStock } from '../store/StockContext'
import { groupByCategory, hasLowStock } from '../lib/grouping'

export function Home() {
  const { items } = useStock()
  const groups = groupByCategory(items)
  const totalLowStock = items.filter((i) => i.quantity <= 1).length

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Voorraadkast</h1>
      <p className="mt-1 text-sm text-zinc-500">Wat hebben we nog in huis?</p>

      <div className="mt-5 rounded-2xl bg-teal-700 px-5 py-4 text-white">
        <p className="text-sm text-teal-100">Totaal aantal producten</p>
        <p className="text-3xl font-semibold">{items.length}</p>
        {totalLowStock > 0 && (
          <p className="mt-1 text-sm text-teal-100">
            {totalLowStock} {totalLowStock === 1 ? 'product is' : 'producten zijn'} bijna op
          </p>
        )}
      </div>

      <h2 className="mt-6 text-sm font-medium text-zinc-500">Per categorie</h2>
      <ul className="mt-2 divide-y divide-zinc-100 rounded-2xl border border-zinc-100">
        {groups.map(({ category, items: categoryItems }) => (
          <li key={category}>
            <Link
              to="/producten"
              className="flex items-center justify-between px-4 py-3.5 active:bg-zinc-50"
            >
              <span className="flex items-center gap-2 text-[15px] text-zinc-800">
                {hasLowStock(categoryItems) && (
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-red-500"
                    aria-label="Bijna op"
                  />
                )}
                {category}
              </span>
              <span className="text-sm font-medium text-zinc-400">{categoryItems.length}</span>
            </Link>
          </li>
        ))}
        {groups.length === 0 && (
          <li className="px-4 py-6 text-center text-sm text-zinc-400">
            Nog niets toegevoegd. Tik op + om te beginnen.
          </li>
        )}
      </ul>
    </div>
  )
}
