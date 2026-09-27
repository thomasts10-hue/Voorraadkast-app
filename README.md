# Voorraadkast

Een PWA om bij te houden wat er in de voorraadkast ligt.

## Lokaal draaien

```bash
npm install
npm run dev
```

Open daarna de getoonde `http://localhost:...`-link. Voor de barcodescanner
heb je een apparaat met camera nodig (of test op je telefoon via hetzelfde
wifi-netwerk, zie hieronder).

## Testen op je telefoon

1. Zorg dat je telefoon en computer op hetzelfde wifi-netwerk zitten.
2. Draai `npm run dev` — Vite toont dan ook een "Network"-adres (iets als
   `http://192.168.1.x:5173`).
3. Open dat adres in de browser op je telefoon.
4. Via het deel-menu van de browser kun je de site "Toevoegen aan
   beginscherm" zodat hij als app-icoon werkt (PWA).

## Status

Fase 1: schermen met tijdelijke voorbeelddata (nog geen Supabase-database).
