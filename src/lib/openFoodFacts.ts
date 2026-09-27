export interface OffLookupResult {
  name: string
  weight?: string
}

/**
 * Zoekt een barcode op in de gratis Open Food Facts database.
 * Geeft `null` terug als het product niet gevonden is.
 */
export async function lookupBarcode(barcode: string): Promise<OffLookupResult | null> {
  const url = `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`

  const response = await fetch(url)
  if (!response.ok) return null

  const data = await response.json()
  if (data.status !== 1 || !data.product) return null

  const product = data.product
  const name: string | undefined = product.product_name_nl || product.product_name
  if (!name) return null

  const weight: string | undefined = product.quantity || undefined

  return { name, weight }
}
