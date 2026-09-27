import type { Product, StockItem } from '../types'

/**
 * Tijdelijke voorbeelddata, zodat de app te testen is voordat Supabase
 * is aangesloten. Zodra de database er is, komt deze data hiervandaan.
 */
export const mockProducts: Product[] = [
  { id: 'p1', barcode: '8710400010112', name: 'Rijst', weight: '1kg', category: 'Pasta en rijst' },
  { id: 'p2', barcode: '8710400047941', name: 'Penne', weight: '500g', category: 'Pasta en rijst' },
  { id: 'p3', name: 'Halfvolle melk', weight: '1L', category: 'Zuivel en eieren' },
  { id: 'p4', name: 'Eieren', weight: '6 stuks', category: 'Zuivel en eieren' },
  { id: 'p5', name: 'Volkorenbrood', weight: '800g', category: 'Brood en granen' },
  { id: 'p6', name: 'Havermout', weight: '500g', category: 'Brood en granen' },
  { id: 'p7', name: 'Kidneybonen', weight: '400g', category: 'Blikjes en potten' },
  { id: 'p8', name: 'Tomatenblokjes', weight: '400g', category: 'Blikjes en potten' },
  { id: 'p9', name: 'Appelmoes', weight: '350g', category: 'Blikjes en potten' },
  { id: 'p10', name: 'Pastasaus', weight: '500ml', category: 'Sauzen, kruiden en olie' },
  { id: 'p11', name: 'Olijfolie', weight: '500ml', category: 'Sauzen, kruiden en olie' },
  { id: 'p12', name: 'Chocoladerepen', weight: '3-pack', category: 'Snoep en snacks' },
  { id: 'p13', name: 'Chips paprika', weight: '200g', category: 'Snoep en snacks' },
  { id: 'p14', name: 'Cola', weight: '1.5L', category: 'Dranken' },
  { id: 'p15', name: 'Sinaasappelsap', weight: '1L', category: 'Dranken' },
  { id: 'p16', name: 'Koffiebonen', weight: '500g', category: 'Overig' },
]

export const mockStock: StockItem[] = [
  { id: 's1', productId: 'p1', quantity: 2, updatedAt: '2026-09-20T10:00:00.000Z' },
  { id: 's2', productId: 'p2', quantity: 1, updatedAt: '2026-09-18T10:00:00.000Z' },
  { id: 's3', productId: 'p3', quantity: 1, expiryDate: '2026-10-02', updatedAt: '2026-09-24T10:00:00.000Z' },
  { id: 's4', productId: 'p4', quantity: 6, expiryDate: '2026-10-15', updatedAt: '2026-09-22T10:00:00.000Z' },
  { id: 's5', productId: 'p5', quantity: 1, expiryDate: '2026-09-29', updatedAt: '2026-09-25T10:00:00.000Z' },
  { id: 's6', productId: 'p6', quantity: 2, updatedAt: '2026-09-10T10:00:00.000Z' },
  { id: 's7', productId: 'p7', quantity: 3, updatedAt: '2026-09-05T10:00:00.000Z' },
  { id: 's8', productId: 'p8', quantity: 2, updatedAt: '2026-09-05T10:00:00.000Z' },
  { id: 's9', productId: 'p9', quantity: 1, updatedAt: '2026-09-01T10:00:00.000Z' },
  { id: 's10', productId: 'p10', quantity: 1, updatedAt: '2026-09-12T10:00:00.000Z' },
  { id: 's11', productId: 'p11', quantity: 1, updatedAt: '2026-08-20T10:00:00.000Z' },
  { id: 's12', productId: 'p12', quantity: 2, updatedAt: '2026-09-20T10:00:00.000Z' },
  { id: 's13', productId: 'p13', quantity: 3, updatedAt: '2026-09-20T10:00:00.000Z' },
  { id: 's14', productId: 'p14', quantity: 1, updatedAt: '2026-09-19T10:00:00.000Z' },
  { id: 's15', productId: 'p15', quantity: 2, updatedAt: '2026-09-19T10:00:00.000Z' },
  { id: 's16', productId: 'p16', quantity: 1, updatedAt: '2026-09-08T10:00:00.000Z' },
]
