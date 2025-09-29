## Nuvo Product Slider (React + Vite)

A responsive, SEO-friendly product slider built in React with minimal dependencies and hand-rolled SCSS. It fetches live data from `https://fakestoreapi.com/products?limit=5`, lets you select an item from the left list, and shows details on the right.

### Highlights
- Smooth, dependency‑light UI (no slider/carousel libs)
- Fully responsive (mobile, tablet, desktop)
- Material Icons for chevrons; subtle animations
- Accessibility: keyboard focus, ARIA labels, visible HTML content
- SEO: meta description, Open Graph/Twitter tags, hidden headings

### Tech
- React 19 + Vite
- SCSS (no CSS frameworks)

### Getting started
```bash
npm install
npm run dev  # open the printed URL
```

Build & preview production:
```bash
npm run build
npm run preview
```

### Scripts
- `npm run dev` – Start dev server
- `npm run build` – Production build to `dist/`
- `npm run preview` – Preview the production build

### Deploying to Netlify
1) Connect the GitHub repo in Netlify → “New site from Git”.
2) Build command: `npm run build`
3) Publish directory: `dist`
You’ll get a free `*.netlify.app` subdomain that you can rename in Site settings → Domain management.

### Project structure
```
src/
  components/
    ProductSlider.jsx   # main component
    ProductSlider.scss  # styles
  App.jsx
  main.jsx
```

### Notes on UX
- The selected product’s arrow points toward the detail panel to reinforce context.
- Long titles wrap; the chevron size is preserved.
- Images are lazy‑loaded for performance.

### License
MIT. If you make something cool with it, I’d love to see it!
