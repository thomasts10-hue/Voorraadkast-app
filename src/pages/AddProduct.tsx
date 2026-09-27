import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { useStock } from '../store/StockContext'
import { lookupBarcode } from '../lib/openFoodFacts'
import { CATEGORIES, type Category } from '../types'

const READER_ELEMENT_ID = 'barcode-reader'

type Mode = 'scan' | 'form'

export function AddProduct() {
  const navigate = useNavigate()
  const { addStock, findProductByBarcode } = useStock()

  const [mode, setMode] = useState<Mode>('scan')
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [lookupStatus, setLookupStatus] = useState<string | null>(null)

  const [barcode, setBarcode] = useState<string | undefined>(undefined)
  const [name, setName] = useState('')
  const [weight, setWeight] = useState('')
  const [category, setCategory] = useState<Category>(CATEGORIES[0])
  const [quantity, setQuantity] = useState(1)
  const [expiryDate, setExpiryDate] = useState('')

  const scannerRef = useRef<Html5Qrcode | null>(null)
  const isProcessingScan = useRef(false)

  useEffect(() => {
    if (mode !== 'scan') return
    isProcessingScan.current = false
    setCameraError(null)

    const scanner = new Html5Qrcode(READER_ELEMENT_ID, {
      formatsToSupport: [
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.CODE_128,
      ],
      verbose: false,
    })
    scannerRef.current = scanner

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 260, height: 150 } },
        (decodedText) => handleScanSuccess(decodedText),
        () => {
          // Genegeerd: dit vuurt continu af zolang er nog geen barcode gevonden is.
        },
      )
      .catch(() => {
        setCameraError('Camera kon niet gestart worden. Geef toestemming of vul handmatig in.')
      })

    return () => {
      if (scanner.isScanning) {
        scanner
          .stop()
          .catch(() => {})
          .finally(() => scanner.clear())
      } else {
        scanner.clear()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  async function handleScanSuccess(decodedText: string) {
    if (isProcessingScan.current) return
    isProcessingScan.current = true

    await scannerRef.current?.stop().catch(() => {})

    setBarcode(decodedText)
    setLookupStatus('Product opzoeken…')
    setMode('form')

    const existing = findProductByBarcode(decodedText)
    if (existing) {
      setName(existing.name)
      setWeight(existing.weight ?? '')
      setCategory(existing.category)
      setLookupStatus('Dit product staat al in je lijst — pas het aantal aan.')
      return
    }

    try {
      const result = await lookupBarcode(decodedText)
      if (result) {
        setName(result.name)
        setWeight(result.weight ?? '')
        setLookupStatus(null)
      } else {
        setLookupStatus('Niet gevonden in de database. Vul de gegevens zelf aan.')
      }
    } catch {
      setLookupStatus('Opzoeken mislukt. Vul de gegevens zelf aan.')
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    addStock({
      barcode,
      name: name.trim(),
      weight: weight.trim() || undefined,
      category,
      quantity,
      expiryDate: expiryDate || undefined,
    })

    navigate('/producten')
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Toevoegen</h1>

      {mode === 'scan' && (
        <div className="mt-4">
          <div
            id={READER_ELEMENT_ID}
            className="overflow-hidden rounded-2xl bg-black [&_video]:!w-full [&_video]:!object-cover"
          />
          {cameraError && (
            <p className="mt-3 text-sm text-red-600">{cameraError}</p>
          )}
          <p className="mt-3 text-center text-sm text-zinc-500">
            Richt de camera op de barcode van het product.
          </p>
          <button
            type="button"
            onClick={() => setMode('form')}
            className="mt-4 w-full rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-700 active:bg-zinc-50"
          >
            Kan ik niet scannen? Handmatig invoeren
          </button>
        </div>
      )}

      {mode === 'form' && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 pb-6">
          {lookupStatus && (
            <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-700">
              {lookupStatus}
            </p>
          )}

          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-zinc-700">
              Naam
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bijv. Rijst"
              required
              className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-[15px] focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="weight" className="mb-1 block text-sm font-medium text-zinc-700">
              Gewicht / inhoud <span className="text-zinc-400">(optioneel)</span>
            </label>
            <input
              id="weight"
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Bijv. 1kg"
              className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-[15px] focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="category" className="mb-1 block text-sm font-medium text-zinc-700">
              Categorie
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-[15px] focus:border-teal-600 focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="mb-1 block text-sm font-medium text-zinc-700">Aantal</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-lg text-zinc-600 active:bg-zinc-100"
              >
                −
              </button>
              <span className="w-8 text-center text-lg font-semibold text-zinc-800">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-lg text-zinc-600 active:bg-zinc-100"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="expiry" className="mb-1 block text-sm font-medium text-zinc-700">
              Houdbaarheidsdatum <span className="text-zinc-400">(optioneel)</span>
            </label>
            <input
              id="expiry"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-[15px] focus:border-teal-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-teal-700 py-3 text-[15px] font-medium text-white active:bg-teal-800"
          >
            Toevoegen aan voorraad
          </button>

          <button
            type="button"
            onClick={() => {
              setBarcode(undefined)
              setLookupStatus(null)
              setMode('scan')
            }}
            className="w-full rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-600 active:bg-zinc-50"
          >
            In plaats daarvan scannen
          </button>
        </form>
      )}
    </div>
  )
}
