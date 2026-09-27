import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const showScanButton = location.pathname !== '/toevoegen'

  return (
    <div className="relative flex min-h-dvh flex-col">
      <main className="flex-1 overflow-y-auto pb-4">
        <Outlet />
      </main>

      {showScanButton && (
        <button
          type="button"
          onClick={() => navigate('/toevoegen')}
          aria-label="Product toevoegen"
          className="absolute bottom-20 right-4 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg shadow-teal-900/30 active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </button>
      )}

      <BottomNav />
    </div>
  )
}
