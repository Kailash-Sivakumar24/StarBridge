# StarBridge

Educational platform to help children with ASD (Autism Spectrum Disorder) to build cognitive skills such as attention, emotional awareness and memory via simple scenes and multiple-choice interactions.

This README gives you a complete tour of the codebase, the data model, routing, state flow, and how to run/build the app on Windows.

## Tech stack

- React (React 19 API usage: createRoot)
- react-router-dom v7 (Routes/Route/Link/useNavigate)
- create-react-app (react-scripts 5)
- Service worker registered for PWA behavior in production builds
- LocalStorage for progress

## Project structure

```
public/
  index.html, manifest.json, icons
src/
  index.js            # React root + service worker registration
  serviceWorker.js    # CRA service worker template
  assets/             # All images/videos + assets/index.js mapping
  components/
    App.js            # App shell + routing + global progress state
    HomePage/         # Landing (new game / continue)
    MapPage/          # World map with places
    PlacePage/        # A place with multiple interactions (mini tasks)
    InteractionPage/  # The interaction (question + answers) screen
    FourOFour/        # 404 fallback
    reusable/         # HelperAvatar, Stars, RouterLink, ProgressDebugBox
  data/
    data.js           # Game content: places, interactions, answers, hints
  utils/
    findNextLevel.js  # Next place lock logic
    findTotalStars.js # Count all interactions game-wide
    starsCounting.js  # Stars per place
```

## Data model (src/data/data.js)

- gameData.places: Array of places
  - id: number
  - text: string (place name)
  - icon: string (key for assets mapping)
  - requiredStars: number (unlock threshold)
  - image: string (place background path, currently not used directly everywhere)
  - width: string (display size on map)
  - coordinates: [top%, right%] (for MapPage positioning)
  - interactions: Array of interactions
    - id: number
    - text: title
    - question: [headline, instruction]
    - image: string (base name used to derive png/svg via assets mapping)
    - width: string (display size on place screen)
    - coordinates: [top, right] (vh/vw used in PlacePage)
    - requiredStars: number (unlock threshold within the place)
    - answers: [{ id, text, correct, response }]
    - hints: [{ id, text, answers: [answerIds] }]

Only one place (Playground) is defined at the moment, with 5 interactions.

## Routing and flow

- `/` HomePage
  - Shows logo and offers New Game (clears progress) and Continue (if there is progress)
  - HelperAvatar links to Help page
- `/help` HelpPage
  - Simple video page with play/pause
- `/map` MapPage
  - Renders all places via PlaceCircle
  - HelperAvatar explains unlock guidance based on progress
- `/place/:id` PlacePage
  - Shows place background and a grid of InteractionCircle items
  - Displays earned/total stars for the place
- `/interaction/:id` InteractionPage
  - Shows the question and answer options for a scene
  - Selecting correct answers marks the interaction complete and grants a star
- `*` FourOFour

App-level state: `completed` (array of interaction IDs) lives in `App.js` and is persisted to localStorage under the key `completed`. It is passed down to Map/Place/Interaction pages as needed.


## Assets mapping (src/assets/index.js)

The `assets` object maps data keys and place names to imported files. This keeps JSX imports simple and ensures Webpack bundles the files.

## How to run (Windows PowerShell)

Prereqs:
- Node.js 18 LTS recommended

Install deps and start the dev server:

```powershell
npm install
npm start
```

Build for production and preview locally (uses npx serve):

```powershell
npm run build
npx serve -s build
```

Note: If you prefer a script, you can run `npm run b`, but you may need to install `serve` once: `npm i -g serve`.

## PWA behavior

- The service worker is registered in `src/index.js` (via `serviceWorker.register()`).
- In production builds, assets are cached. New builds activate after open tabs are closed.