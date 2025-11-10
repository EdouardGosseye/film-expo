# Films App (Expo + React Navigation + FlashList)

Kleine mobiele app die Tabs + Stack, FlashList, API-calls, zoeken/sorteren en eenvoudige filter demonstreert. Gebouwd met **Expo** zonder TypeScript of UI-kits.

## Gebruikte API
- Lijst: `https://ghibliapi.vercel.app/films`
- Detail: `https://ghibliapi.vercel.app/films/{id}`

Velden: `title`, `original_title`, `release_date`, `rt_score`, `director`, `description`, `image`.

## Run
```bash
npm install
npx expo start -c
```
Open in **Expo Go**.

## Belangrijke setup (fix voor /index.tsx fout)
- Verwijder/rename **alle** `*.ts`/`*.tsx` bestanden (bv. `index.tsx`, `App.tsx`).
- Voeg **`index.js`** toe en zet `"main": "index.js"` + `expo.entryPoint: ./index.js` in `package.json`.
- Start met cache flush: `npx expo start -c`.

## Functionaliteiten
- **Navigatie**:
  - Tabs: **Home** en **Profile**.
  - **Stack** in Home: lijst → detail → terug.
- **Home** (FlashList):
  - Live **zoekbalk** op titel.
  - **Sorteren**: A–Z (default), Jaar (asc), Rating (desc).
  - **Filter**: minimum **rt_score** + optionele **director**-chips.
- **Detail**: ≥4 velden (titel, original_title, jaar, rating, director, beschrijving, afbeelding).
- **States**: loading, empty, error.
- **Hooks**: `useState`, `useEffect` met mount/unmount logging; cleanup via `AbortController`.
