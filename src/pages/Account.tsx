export function Account() {
  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Account</h1>

      <div className="mt-5 rounded-2xl border border-zinc-100 p-4">
        <p className="text-sm font-medium text-zinc-700">Huishouden</p>
        <p className="mt-1 text-sm text-zinc-500">
          Ons huishouden (voorbeeld)
        </p>
      </div>

      <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
        Dit scherm is nu een placeholder. Zodra de database is aangesloten, kun je
        hier inloggen en zie je wie er toegang heeft tot jullie gedeelde voorraad.
      </div>
    </div>
  )
}
